using AutoMapper;
using InvManagement.Customers;
using InvManagement.InvSales;
using InvManagement.Sales;

namespace InvManagement;

public class InvManagementApplicationAutoMapperProfile : Profile
{
    public InvManagementApplicationAutoMapperProfile()
    {
        /* You can configure your AutoMapper mapping configuration here.
         * Alternatively, you can split your mapping configurations
         * into multiple profile classes for a better organization. */

        CreateMap<Customer, CustomerDto>();
        CreateMap<CreateUpdateCustomerDto, Customer>();
        CreateMap<MvSales, SalesDto>();
        CreateMap<MvSalesDetail, SalesDetailDto>();
    }
}
