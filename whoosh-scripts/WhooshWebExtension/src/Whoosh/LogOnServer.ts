import { app } from "@docsvision/webclient/App";
import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { toServerDateString } from "@docsvision/webclient/System/DateTimeUtils";

export function logOnServer(message: string, level: GenModels.ClientLogMessageLevel = GenModels.ClientLogMessageLevel.Info) {
    app.clientLogController.logMessage({
        message,
        time: toServerDateString(new Date(), app),
        currentRoute: location.href,
        employeeId: app.currentEmployeeId,
        level,
        stackTrace: ''
    });
}