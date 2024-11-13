using Volo.Abp.Modularity;

namespace InvManagement;

[DependsOn(
    typeof(InvManagementApplicationModule),
    typeof(InvManagementDomainTestModule)
)]
public class InvManagementApplicationTestModule : AbpModule
{

}
