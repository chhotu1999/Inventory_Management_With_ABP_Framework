using InvManagement.Localization;
using Volo.Abp.AspNetCore.Mvc;

namespace InvManagement.Controllers;

/* Inherit your controllers from this class.
 */
public abstract class InvManagementController : AbpControllerBase
{
    protected InvManagementController()
    {
        LocalizationResource = typeof(InvManagementResource);
    }
}
