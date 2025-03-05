import { Button } from "@docsvision/web/components/form/button";
import { CustomButton } from "@docsvision/webclient/Platform/CustomButton";
import { $Layout } from "@docsvision/webclient/System/$Layout";
import { BaseControlParams, BaseControlState, BaseControl } from "@docsvision/webclient/System/BaseControl";
import { ControlImpl } from "@docsvision/webclient/System/ControlImpl";
import { getBindingResult } from "@docsvision/webclient/System/GetBindingResult";
import { at, handler } from "@docsvision/webclient/System/Handler";
import { IBindingResult } from "@docsvision/webclient/System/IBindingResult";
import { InputBasedControl } from "@docsvision/webclient/System/InputBasedControl";
import { $CardId, $ControlStore } from "@docsvision/webclient/System/LayoutServices";
import { r } from "@docsvision/webclient/System/Readonly";
import { rw } from "@docsvision/webclient/System/Readwrite";
import React from "react";

/**
 * Содержит публичные свойства элемента управления [Control1]{@link Control1}.
 */
export class WhooshControlParams extends BaseControlParams {
    /** Стандартный CSS класс со стилями элемента управления. */
    @r standardCssClass?: string = "whoosh-control";

    // Объявление параметров, соответствующих параметрам в шаблоне xml-расширения 
    // для конструктора разметок "TemplateXmlDesignerExtension"
    @rw buttonName: string;
    @rw copyFrom: string;
    @rw copyTo: string;
    
    /** Сервисы, необходимые для работы контрола. */
    @rw services?: $CardId & $ControlStore;
}

export interface IWhooshControlState extends WhooshControlParams, BaseControlState {
    binding: IBindingResult<string>;
}

/** Реализация элемента управления Control1 */
export class WhooshControl extends BaseControl<WhooshControlParams, IWhooshControlState> {
    /** Вызывается после отображения контрола в DOM браузера */
    init() {
        const button = this.state.services.controlStore.tryGet<CustomButton>(this.state.buttonName);
        if (button) {
            button.params.click.subscribe(this.onClickHandler);
        }
    }

    protected createParams() {
        return new WhooshControlParams();
    }

    protected createImpl() {
        return new ControlImpl(this.props, this.state, this.renderControl.bind(this));
    }

    private onClickHandler = async (e: React.MouseEvent) => {
        const source = this.state.services.controlStore.tryGet<InputBasedControl<any, any, any>>(this.state.copyFrom);
        const target = this.state.services.controlStore.tryGet<InputBasedControl<any, any, any>>(this.state.copyTo);
        if (source && target) {
            target.params.value = source.params.value;
        }
    }

    renderControl() {
        return null;
    }
}


