import React, { Component } from 'react';

export default class SelectCustomizado extends Component {

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