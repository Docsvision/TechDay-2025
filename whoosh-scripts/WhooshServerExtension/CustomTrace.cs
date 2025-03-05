using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WhooshServerExtension
{
    public static class CustomTrace
    {
        private static readonly NLog.Logger CustomLogger = NLog.LogManager.GetLogger("Custom", typeof(CustomTrace));
        public static void Trace(string message, LogLevel level = LogLevel.Information)
        {
            CustomLogger.Info(message, level);
        }
    }
}
