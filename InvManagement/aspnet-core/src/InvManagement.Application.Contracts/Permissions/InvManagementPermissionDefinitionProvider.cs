using InvManagement.Localization;
using Volo.Abp.Authorization.Permissions;
using Volo.Abp.Localization;

namespace InvManagement.Permissions;

public class InvManagementPermissionDefinitionProvider : PermissionDefinitionProvider
{
    public override void Define(IPermissionDefinitionContext context)
    {
        var myGroup = context.AddGroup(InvManagementPermissions.GroupName);
        //Define your own permissions here. Example:
        //myGroup.AddPermission(InvManagementPermissions.MyPermission1, L("Permission:MyPermission1"));
    }

    private static LocalizableString L(string name)
    {
        return LocalizableString.Create<InvManagementResource>(name);
    }
}
