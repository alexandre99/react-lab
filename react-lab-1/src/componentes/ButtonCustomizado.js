import React, { Component } from 'react';
class ButtonCustomizado extends Component {

    render() {
        return (
            <button type={this.props.type} className={this.props.className}>{this.props.name}</button>
        );
    }

}

export default ButtonCustomizado;