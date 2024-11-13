using Volo.Abp.Modularity;

namespace InvManagement;

[DependsOn(
    typeof(InvManagementDomainModule),
    typeof(InvManagementTestBaseModule)
)]
public class InvManagementDomainTestModule : AbpModule
{

}
