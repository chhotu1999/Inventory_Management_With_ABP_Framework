using Xunit;

namespace InvManagement.EntityFrameworkCore;

[CollectionDefinition(InvManagementTestConsts.CollectionDefinitionName)]
public class InvManagementEntityFrameworkCoreCollection : ICollectionFixture<InvManagementEntityFrameworkCoreFixture>
{

}
