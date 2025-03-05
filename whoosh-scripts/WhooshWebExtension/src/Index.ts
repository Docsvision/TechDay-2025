import * as WhooshHandlers from "./Whoosh/WhooshParametrizedHandler";
import * as WhooshAutoSubscribe from "./Whoosh/WhooshAutoSubscribe";
import * as WhooshTypedLayout from "./Whoosh/WhooshTypedLayout";
import { extensionManager } from "@docsvision/webclient/System/ExtensionManager";
import { Service } from "@docsvision/web/core/services";
import { $RequestManager } from "@docsvision/webclient/System/$RequestManager";
import { WhooshControl } from "./Whoosh/WhooshControl";


// Главная входная точка всего расширения
// Данный файл должен импортировать прямо или косвенно все остальные файлы, 
// чтобы rollup смог собрать их все в один бандл.

// Регистрация расширения позволяет корректно установить все
// обработчики событий, сервисы и прочие сущности web-приложения.
extensionManager.registerExtension({
    name: "Whoosh web extension",
    version: "1.0",
    globalEventHandlers: [ WhooshHandlers, WhooshAutoSubscribe, WhooshTypedLayout ],
    layoutServices: [
    ],
    controls: [
        { controlTypeName: "WhooshControl", constructor: WhooshControl }
    ]
})