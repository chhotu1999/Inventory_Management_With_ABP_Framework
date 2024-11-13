using Volo.Abp.Modularity;

namespace InvManagement;

/* Inherit from this class for your domain layer tests. */
public abstract class InvManagementDomainTestBase<TStartupModule> : InvManagementTestBase<TStartupModule>
    where TStartupModule : IAbpModule
{

}
