import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { Layout } from "@docsvision/webclient/System/Layout";
import { $ControlStore } from "@docsvision/webclient/System/LayoutServices";
import { whoosh_copyValue } from "./WhooshParametrizedHandler";
import { whoosh_typedHandler } from "./WhooshTypedLayout";

export function whoosh_autoSubscribe(sender: Layout) {
    const args = JSON.parse(sender.params.tag);
    const controlStore = sender.getService($ControlStore);

    const button1 = controlStore.tryGet<CustomButton>(args.button1);
    button1.params.click.subscribe(whoosh_copyValue);
    const button2 = controlStore.tryGet<CustomButton>(args.button2);
    button2.params.click.subscribe(whoosh_typedHandler);
}