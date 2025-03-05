import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { IEventArgs } from "@docsvision/webclient/System/IEventArgs";;
import { InputBasedControl } from "@docsvision/webclient/System/InputBasedControl";
import { $ControlStore } from "@docsvision/webclient/System/LayoutServices";

export async function whoosh_copyValue(sender: LayoutControl, e: IEventArgs) {
    const args = JSON.parse(sender.params.tag);
    const controlStore = sender.getService($ControlStore);
    const source = controlStore.tryGet<InputBasedControl<any, any, any>>(args.copyFrom);
    const target = controlStore.tryGet<InputBasedControl<any, any, any>>(args.copyTo);
    if (source && target) {
        target.params.value = source.params.value;
    }
}

