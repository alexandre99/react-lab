import React, { Component } from 'react';
import PubSub from 'pubsub-js';

export default class SelectCustomizado extends Component {

    constructor() {
        super()
        this.state = { msgErro: '' };
    }

    componentDidMount() {
        PubSub.subscribe("erro-validacao", function (topico, erro) {
            if (erro.field === this.props.name) {
                this.setState({ msgErro: erro.defaultMessage });
            }
        }.bind(this));
        PubSub.subscribe("limpa-erros", function (topico) {
            this.setState({ msgErro: '' });
        }.bind(this));
    };

    componentWillUnmount() {
        PubSub.clearAllSubscriptions();
    }

    render() {
        return (
            <div className="pure-control-group">
                <label htmlFor={this.props.name}>{this.props.label}</label>
                <select value={this.props.value} id={this.props.name} name={this.props.name} onChange={this.props.onChange}>
                    <option value="">Selecione</option>
                    {
                        this.props.selectItems.map(function (item) {
                            return <option key={item.key} value={item.value}>
                                {item.label}
                            </option>;
                        })
                    }
                </select>
                <span className="erro">{this.state.msgErro}</span>
            </div>
        );
    }

}

export class SelectItem {

    constructor(key, label, value) {
        this.key = key;
        this.label = label;
        this.value = value;
    }

}