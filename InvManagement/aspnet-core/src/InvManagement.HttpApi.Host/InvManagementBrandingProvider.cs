using Microsoft.Extensions.Localization;
using InvManagement.Localization;
using Volo.Abp.DependencyInjection;
using Volo.Abp.Ui.Branding;

namespace InvManagement;

[Dependency(ReplaceServices = true)]
public class InvManagementBrandingProvider : DefaultBrandingProvider
{
    private IStringLocalizer<InvManagementResource> _localizer;

    public InvManagementBrandingProvider(IStringLocalizer<InvManagementResource> localizer)
    {
        _localizer = localizer;
    }

    public override string AppName => _localizer["AppName"];
}
