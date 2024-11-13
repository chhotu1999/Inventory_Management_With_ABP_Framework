using InvManagement.Samples;
using Xunit;

namespace InvManagement.EntityFrameworkCore.Domains;

[Collection(InvManagementTestConsts.CollectionDefinitionName)]
public class EfCoreSampleDomainTests : SampleDomainTests<InvManagementEntityFrameworkCoreTestModule>
{

}
