using InvManagement.EntityFrameworkCore;
using Volo.Abp.Autofac;
using Volo.Abp.Modularity;

namespace InvManagement.DbMigrator;

[DependsOn(
    typeof(AbpAutofacModule),
    typeof(InvManagementEntityFrameworkCoreModule),
    typeof(InvManagementApplicationContractsModule)
    )]
public class InvManagementDbMigratorModule : AbpModule
{

}
