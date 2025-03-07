using System.Reflection;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;

// General Information about an assembly is controlled through the following 
// set of attributes. Change these attribute values to modify the information
// associated with an assembly.
[assembly: AssemblyTitle("DvTechDay2025Sample")]
[assembly: AssemblyDescription("")]
[assembly: AssemblyCompany(BuildInfo.Company)]
[assembly: AssemblyProduct(BuildInfo.Product)]
[assembly: AssemblyCopyright(BuildInfo.Copyright)]
[assembly: AssemblyVersion(BuildInfo.Version)]
[assembly: AssemblyFileVersion(BuildInfo.FileVersion)]
[assembly: AssemblyInformationalVersion(BuildInfo.DisplayVersion)]
[assembly: AssemblyKeyName(BuildInfo.PublicKeyContainer)]

// Setting ComVisible to false makes the types in this assembly not visible 
// to COM components.  If you need to access a type in this assembly from 
// COM, set the ComVisible attribute to true on that type.
[assembly: ComVisible(false)]

// The following GUID is for the ID of the typelib if this project is exposed to COM
[assembly: Guid("44a30474-36c6-4288-8cb7-833a44584b94")]


internal static class BuildInfo
{
    public const string Company = "DocsVision";
    public const string Product = "Docsvision 5.5 TechDay 2025";
    public const string Copyright = "Copyright © 2001-2025 DocsVision. All rights reserved.";

    public const string Version = "5.5";
    public const string FileVersion = "5.5.8780.0";
    public const string MajorVersion = "5";
    public const string MinorVersion = "5";
    public const string InformationalVersion = "5.5.5";

    public const string DisplayVersion = InformationalVersion;


    public const string PublicKey = "00240000048000009400000006020000002400005253413100040000010001003B86F970F00C2E86A49C5A2C64C90648B4B9220B7B7759CA0116A09AD888826362A396E14706397979D2ADCAE5E3F94470F65D988896139FECBB9475627FC023E19864EF4BC151ECD8B2E93ABA3CC5CF740044FB8589A8EE538EC714EAFF80EB2F68BAC9534FD37FAF89C39A435FF07BBAB2C9A7A50B079CCCB0E47D9F0054E3";
    public const string PublicKeyToken = "7148AFE997F90519";
    public const string PublicKeyContainer = "DocsVision2007";
}