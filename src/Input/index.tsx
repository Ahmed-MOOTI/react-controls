import * as React from 'react';
import { TextInputComponent, EmailInputComponent } from './styles';
import { Size, InputType } from './types';
import { BaseControl } from '../BaseControl/BaseControl';
import TypeStringControl from '../BaseControl/errorCentral/TypeStringControl';


export interface Props extends React.HTMLProps<HTMLInputElement> {
    color?: string;
    backgroundColor?: string;
    fontSize?: Size;
    borderColor?: string;
    type?: InputType;
}


export default class Input extends BaseControl<Props> {
    public static defaultProps: Props = {
        color: '#fefefe',
        backgroundColor: '#c05b4d',
        borderColor: '#732419',
        fontSize: 'medium',
    };

    constructor(p, c) {
        super(p, c);

        var pattern = null;
        var patternErrorMessage = null;

        if (this.props.pattern != null) {
            pattern = new RegExp(this.props.pattern);
            patternErrorMessage = "test";
        }
        else {

            switch (this.props.type) {
                case "email":
                    pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    patternErrorMessage = "Doit �tre un mail";
                    break;
                case "number":
                    pattern = /^[0-9]*(|\.[0-9]*)*$/
                    patternErrorMessage = "Doit �tre un nombre";
                    break;
                case "integer":
                    pattern = /^[0-9]*$/
                    patternErrorMessage = "Doit �tre un nombre entier";
                    break;
                case "phone":
                    pattern = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/
                    patternErrorMessage = "Doit �tre un t�l�phone";
                    break;
                default:

            }
        }

        this._ControlErrorCentral.addControl(new TypeStringControl(pattern, patternErrorMessage));

    }

    handleChangeJsEvent(event: any) {
        return event.target.value;
    }

    public renderControl() {
        if (this.props.type == "email") {
            return (
                <EmailInputComponent
                    type="email"
                    style={this.props.style}
                    borderColor={this.props.borderColor}
                    onClick={this.props.onClick}
                    color={this.props.color}
                    backgroundColor={this.props.backgroundColor}
                    fontSize={this.props.fontSize}
                    onChange={this.handleChangeJsEventGlobal}
                >

                    {this.props.children}
                </EmailInputComponent>
            );
        }
        return (
            <TextInputComponent
                type="text"
                onClick={this.props.onClick}
                color={this.props.color}
                backgroundColor={this.props.backgroundColor}
                fontSize={this.props.fontSize}
                onChange={this.handleChangeJsEventGlobal}

            >
                {this.props.children}
            </TextInputComponent>
        );
    }
}
