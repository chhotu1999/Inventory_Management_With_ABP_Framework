using System.Threading.Tasks;

namespace InvManagement.Data;

public interface IInvManagementDbSchemaMigrator
{
    Task MigrateAsync();
}
