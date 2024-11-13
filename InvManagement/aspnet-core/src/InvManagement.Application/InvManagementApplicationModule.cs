using InvManagement.Customers;
using InvManagement.InvSales;
using InvManagement.Products;
using InvManagement.Sales;
using InvManagement.StockSummary;
using Microsoft.Extensions.DependencyInjection;
using Volo.Abp.Account;
using Volo.Abp.AutoMapper;
using Volo.Abp.FeatureManagement;
using Volo.Abp.Identity;
using Volo.Abp.Modularity;
using Volo.Abp.PermissionManagement;
using Volo.Abp.SettingManagement;
using Volo.Abp.TenantManagement;

namespace InvManagement;

[DependsOn(
    typeof(InvManagementDomainModule),
    typeof(AbpAccountApplicationModule),
    typeof(InvManagementApplicationContractsModule),
    typeof(AbpIdentityApplicationModule),
    typeof(AbpPermissionManagementApplicationModule),
    typeof(AbpTenantManagementApplicationModule),
    typeof(AbpFeatureManagementApplicationModule),
    typeof(AbpSettingManagementApplicationModule)
    )]
public class InvManagementApplicationModule : AbpModule
{
    public override void ConfigureServices(ServiceConfigurationContext context)
    {
        Configure<AbpAutoMapperOptions>(options =>
        {
            options.AddMaps<InvManagementApplicationModule>();
        });
        context.Services.AddTransient<ICustomerService, CustomerService>();
        context.Services.AddTransient<IProductService, ProductService>();
        context.Services.AddTransient<IStockTransSummaryService, StockTransSummaryService>();
        context.Services.AddTransient<IInvSalesService, InvSalesService>();
    }
}
