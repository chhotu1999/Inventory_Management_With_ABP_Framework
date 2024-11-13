using Volo.Abp.Modularity;

namespace InvManagement;

public abstract class InvManagementApplicationTestBase<TStartupModule> : InvManagementTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
