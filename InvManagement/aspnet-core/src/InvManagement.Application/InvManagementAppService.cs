using System;
using System.Collections.Generic;
using System.Text;
using InvManagement.Localization;
using Volo.Abp.Application.Services;

namespace InvManagement;

/* Inherit your application services from this class.
 */
public abstract class InvManagementAppService : ApplicationService
{
    protected InvManagementAppService()
    {
        LocalizationResource = typeof(InvManagementResource);
    }
}
