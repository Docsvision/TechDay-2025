import { StaffDirectoryItemsMultiple } from "@docsvision/webclient/BackOffice/StaffDirectoryItems";
import { TextBox } from "@docsvision/webclient/Platform/TextBox";
import { LayoutControl } from "@docsvision/webclient/System/BaseControl";
import { LayoutControlsAccessor, control } from "@docsvision/webclient/System/LayoutControlsAccessor";

export class DocumentLayout extends LayoutControlsAccessor {
    @control name: TextBox;  
    @control approvers: StaffDirectoryItemsMultiple;
    @control signers: StaffDirectoryItemsMultiple;
}

export function whoosh_typedHandler(sender: LayoutControl) {
    const layout = new DocumentLayout(sender.layout);
     layout.approvers.value = layout.signers.value;
}