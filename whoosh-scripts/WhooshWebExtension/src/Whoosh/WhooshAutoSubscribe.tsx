import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { Layout } from "@docsvision/webclient/System/Layout";
import { $ControlStore } from "@docsvision/webclient/System/LayoutServices";
import { whoosh_copyValue } from "./WhooshParametrizedHandler";
import { whoosh_typedHandler } from "./WhooshTypedLayout";
import { Block } from "@docsvision/webclient/Platform/Block";

export function whoosh_autoSubscribe(sender: Layout) {
    const controlStore = sender.getService($ControlStore);
    const argsBlock = controlStore.tryGet<Block>("args");
    const args = JSON.parse(argsBlock.params.tag);

    const button1 = controlStore.tryGet<CustomButton>(args.button1);
    button1.params.click.subscribe(whoosh_copyValue);
    
    const button2 = controlStore.tryGet<CustomButton>(args.button2);
    button2.params.click.subscribe(whoosh_typedHandler);
}