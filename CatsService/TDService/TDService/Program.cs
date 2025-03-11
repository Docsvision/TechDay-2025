using DocsVision.ServiceRegister;
using DocsVision.ServiceRegister.Model;

using Microsoft.Extensions.Options;

using TDService;
using TDService.Models;
using TDService.Services;

using static TDService.Const;

var builder = WebApplication.CreateBuilder(args);
builder.Logging.SetMinimumLevel(LogLevel.Warning);
builder.Configuration.AddSettingsServiceConfiguration();
builder.Services.AddOptions<TDOptions>().BindConfiguration(string.Empty);

builder.Services.AddSingleton<CatsImagesService>();

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

app.RegisterService(
    new ServiceInfo(ServiceCode) { Description = ServiceName },
    new ConfigurationInfo { ConfigurationLayoutId = ConfigurationLayoutId }
    );


app.MapGet("/count", (IOptionsSnapshot<TDOptions> opt) =>
{
    return Results.Ok(opt.Value.Count);
});

app.MapGet("/color", (IOptionsSnapshot<TDOptions> opt) =>
{
    return Results.Ok(opt.Value.Color);
});

app.MapGet("/cats/{count}", (int count, CatsImagesService imagesService) =>
{
    return Results.Ok(imagesService.GetRandomImages(count));
});

Console.WriteLine("Ready...");

await app.RunAsync();
