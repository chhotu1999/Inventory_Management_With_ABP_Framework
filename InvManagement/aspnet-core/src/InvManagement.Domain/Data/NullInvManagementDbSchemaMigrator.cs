using System.Threading.Tasks;
using Volo.Abp.DependencyInjection;

namespace InvManagement.Data;

/* This is used if database provider does't define
 * IInvManagementDbSchemaMigrator implementation.
 */
public class NullInvManagementDbSchemaMigrator : IInvManagementDbSchemaMigrator, ITransientDependency
{
    public Task MigrateAsync()
    {
        return Task.CompletedTask;
    }
}
