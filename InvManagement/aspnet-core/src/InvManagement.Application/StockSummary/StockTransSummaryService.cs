using InvManagement.Products;
using InvManagement.SharedModel;
using InvManagement.Stock_Summary;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Volo.Abp;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace InvManagement.StockSummary
{
    public class StockTransSummaryService : ApplicationService, IStockTransSummaryService
    {
        private readonly IRepository<StockTransSummary, int> _stockSummaryRepo;  // Use entity, not DTO
        private readonly IRepository<Product, int> _productRepo;

        public StockTransSummaryService(IRepository<StockTransSummary, int> stockSummaryRepo, IRepository<Product, int> productRepo)
        {
            _stockSummaryRepo = stockSummaryRepo;
            _productRepo = productRepo;
        }

        public async Task<StockTransSummaryDto> AddStockSummaryAsync(CreateStockSummaryDto input)
        {
            var product = await _productRepo.GetAsync(input.ProductId);
            if (product == null)
            {
                throw new UserFriendlyException("Product not found.");
            }

            var stockSummary = new StockTransSummary  // Use entity, not DTO
            {
                ProductId = input.ProductId,
                StockMode = StockType.Inward,
                StockQuantity = input.StockQuantity,
                BalanceQuantity =  product.StockLevel + input.StockQuantity
            };

            // Update the Product stock level
            product.StockLevel = stockSummary.BalanceQuantity;
            await _productRepo.UpdateAsync(product);

            // Insert into stock summary table
            await _stockSummaryRepo.InsertAsync(stockSummary);

            // Map the entity to the DTO to return
            return ObjectMapper.Map<StockTransSummary, StockTransSummaryDto>(stockSummary);
        }

        public async Task<ResponseResult<StockTransSummaryDto>> GetStockSummaryPagedAsync(int pageNumber, int pageSize)
        {
            if (pageNumber <= 0) pageNumber = 1;
            if (pageSize <= 0) pageSize = 10;

            var skip = (pageNumber - 1) * pageSize;

            var totalRecords = await _stockSummaryRepo.CountAsync();

            var stockSummaries = await _stockSummaryRepo
                .WithDetails(s => s.Product)
                .Skip(skip)
                .Take(pageSize)
                .ToListAsync();

            var items = stockSummaries.Select(s => new StockTransSummaryDto
            {
                ProductId = s.ProductId,
                ProductName = s.Product.Name,
                StockMode = s.StockMode,
                StockQuantity = s.StockQuantity,
                BalanceQuantity = s.BalanceQuantity,
                Unit = s.Product.Unit
            }).ToList();

            return new ResponseResult<StockTransSummaryDto>
            {
                Items = items,
                TotalCount = totalRecords,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }
    }
}
