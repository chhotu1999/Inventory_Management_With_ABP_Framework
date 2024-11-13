using InvManagement.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Application.Dtos;
using Volo.Abp.Application.Services;
using Volo.Abp.Domain.Repositories;

namespace InvManagement.Customers
{
    public class CustomerService : CrudAppService<
        Customer,           // The entity
        CustomerDto,        // The DTO used to display
        int,               // Primary key type
        PagedAndSortedResultRequestDto, // Used for paging/sorting
        CreateUpdateCustomerDto>, // Used for update if different than create
        ICustomerService
    {
        public CustomerService(IRepository<Customer, int> repository)
            : base(repository)
        {
        }

        public async Task<List<CustomerDto>> GetAllCustomersAsync()
        {
            var customers = await Repository.GetListAsync();

            // Map entities to ProductDto if necessary
            return customers.Select(MapToGetOutputDto).ToList();
        }
    }
}
