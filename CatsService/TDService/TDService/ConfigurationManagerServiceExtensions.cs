
using DocsVision.Configuration.Settings;

namespace TDService;


internal static class ConfigurationManagerServiceExtensions
{
    public static ConfigurationManager AddSettingsServiceConfiguration(this ConfigurationManager manager)
    {
        var serviceId = manager.GetValue<Guid>("DocsVision:ServiceId");
        var settingsServiceConnectionString = manager.GetValue<string>("DocsVision:SettingsService:ConnectionString");
        var settingsServiceApiKey = manager.GetValue<string>("DocsVision:SettingsService:ApiKey");

        var logger = LoggerFactory.Create(c => c.AddConsole()).CreateLogger<ConfigurationManager>();

        manager.AddSettingsConfiguration(new SettingsServiceParameters { ApiKey = settingsServiceApiKey, ConnectionString = settingsServiceConnectionString }, serviceId, logger);

        return manager;
    }

}
