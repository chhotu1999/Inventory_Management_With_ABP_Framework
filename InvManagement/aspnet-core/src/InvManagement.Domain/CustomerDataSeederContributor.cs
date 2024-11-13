/*using InvManagement.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Volo.Abp.Data;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Domain.Repositories;

namespace InvManagement
{
    public class CustomerDataSeederContributor : IDataSeedContributor, ITransientDependency
    {
        private readonly IRepository<Customer, Guid> _customerRepository;
        public CustomerDataSeederContributor(IRepository<Customer, Guid> customerRepository)
        {
            _customerRepository = customerRepository;
            
        }

       *//* public async Task SeedAsync(DataSeedContext context)
        {
            if(await _customerRepository.GetCountAsync() <= 0)
            {
                await _customerRepository.InsertAsync(
                    new Customer
                    {
                        Name = "Yawa Malik",
                        Gender = GenderType.Male,
                        Email = "malik@email.com",
                        Address = "jhapa",
                    }
                    );
            };
        }*//*
    }
}
*/