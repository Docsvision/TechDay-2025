using DocsVision.Platform.WebClient;
using DocsVision.Platform.WebClient.Models;
using DocsVision.Platform.WebClient.Models.Generic;
using Microsoft.AspNetCore.Mvc;

namespace WhooshServerExtension
{
    public class WhooshController : ControllerBase
    {
        public WhooshController()
        {
        }

        [HttpPost]
        public CommonResponse Whoosh()
        {
            CustomTrace.Trace("Whoosh!");

            return CommonResponse.CreateSuccess();
        }
    }
}
