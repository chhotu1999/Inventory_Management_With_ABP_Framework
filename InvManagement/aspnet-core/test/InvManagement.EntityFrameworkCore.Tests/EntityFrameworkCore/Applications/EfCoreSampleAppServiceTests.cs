using InvManagement.Samples;
using Xunit;

namespace InvManagement.EntityFrameworkCore.Applications;

[Collection(InvManagementTestConsts.CollectionDefinitionName)]
public class EfCoreSampleAppServiceTests : SampleAppServiceTests<InvManagementEntityFrameworkCoreTestModule>
{

}
