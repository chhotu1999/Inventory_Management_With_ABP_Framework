using Volo.Abp.Settings;

namespace InvManagement.Settings;

public class InvManagementSettingDefinitionProvider : SettingDefinitionProvider
{
    public override void Define(ISettingDefinitionContext context)
    {
        //Define your own settings here. Example:
        //context.Add(new SettingDefinition(InvManagementSettings.MySetting1));
    }
}
