using AutoMapper;
using AutoMapper.Internal.Mappers;
using InvManagement.InvSales;
using InvManagement.Products;
using InvManagement.SharedModel;
using InvManagement.Stock_Summary;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;
using Volo.Abp.ObjectMapping;

namespace InvManagement.Sales
{
    public class InvSalesService : ApplicationService,IInvSalesService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Product, int> _productRepository;
        private readonly IRepository<MvSales, int> _salesRepository;
        private readonly IRepository<StockTransSummary, int> _stockTransSummaryRepository;

        public InvSalesService(IMapper mapper,
                            IRepository<Product, int> productRepository,
                            IRepository<MvSales, int> salesRepository,
                            IRepository<StockTransSummary, int> stockTransSummaryRepository)
        {
            _mapper = mapper;
            _productRepository = productRepository;
            _salesRepository = salesRepository;
            _stockTransSummaryRepository = stockTransSummaryRepository;
        }

        public async Task<SalesDto> CreateSaleAsync(CreateSaleDto input)
        {
            await StockValidationAsync(input.SalesDetails);

            decimal totalAmount = input.SalesDetails.Sum(d => d.UnitPrice * d.Quantity);
            decimal netAmount = totalAmount - input.Discount;

            // Create the Sales entity with details
            var sales = new MvSales
            {
                CustomerId = input.CustomerId,
                NetAmount = netAmount,
                Discount = input.Discount,
                TotalAmount = totalAmount,
                SalesDetails = input.SalesDetails.Select(detail => new MvSalesDetail
                {
                    ProductId = detail.ProductId,
                    Quantity = detail.Quantity,
                    UnitPrice = detail.UnitPrice,
                    TotalPrice = detail.UnitPrice * detail.Quantity
                }).ToList()
            };

            // Insert sales with details
            await _salesRepository.InsertAsync(sales);

            // Update stock levels and add stock transactions
            foreach (var detail in sales.SalesDetails)
            {
                var product = await _productRepository.GetAsync(detail.ProductId);
                product.StockLevel -= detail.Quantity;
                await _productRepository.UpdateAsync(product);

                var stockTrans = new StockTransSummary
                {
                    ProductId = detail.ProductId,
                    StockMode = StockType.Outward,
                    StockQuantity = detail.Quantity,
                    BalanceQuantity = product.StockLevel
                };
                await _stockTransSummaryRepository.InsertAsync(stockTrans);
            }
            var salesDto = _mapper.Map<SalesDto>(sales);
            return salesDto;
        }

        private async Task StockValidationAsync(List<SalesDetailDto> salesDetails)
        {
            foreach (var detail in salesDetails)
            {
                var product = await _productRepository.GetAsync(detail.ProductId);
                if (product.StockLevel < detail.Quantity)
                {
                    throw new Exception($"Insufficient stock for product {product.Name}.");
                }
            }
        }



        public async Task<ResponseResult<SalesDto>> GetSalesSummaryPagedAsync(int pageNumber, int pageSize)
        {
            // Validate pagination parameters
            if (pageNumber <= 0) pageNumber = 1;
            if (pageSize <= 0) pageSize = 10;

            // Calculate the skip value (where to start fetching records)
            var skip = (pageNumber - 1) * pageSize;

            // Get the total number of records in the sales repository
            var totalRecords = await _salesRepository.CountAsync();

            // Retrieve paginated sales data with related details
            var salesList = await _salesRepository
                .WithDetails(s => s.Customer, s => s.SalesDetails)
                .Skip(skip)  // Skip the number of records based on the current page
                .Take(pageSize)  // Take only the records for the current page
                .ToListAsync();

            // Map the sales list to SalesDto
            var items = salesList.Select(s => new SalesDto
            {
                SalesId = s.Id,
                CustomerName = s.Customer.Name,
                NetAmount = s.NetAmount,
                Discount = s.Discount,
                TotalAmount = s.TotalAmount,
                Details = s.SalesDetails.Select(d => new SalesDetailDto
                {
                    ProductName = d.Product.Name,
                    Quantity = d.Quantity,
                    UnitPrice = d.UnitPrice,
                    TotalPrice = d.TotalPrice
                }).ToList()
            }).ToList();

            // Return paginated result wrapped in ResponseResult
            return new ResponseResult<SalesDto>
            {
                Items = items,
                TotalCount = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

    }
}

