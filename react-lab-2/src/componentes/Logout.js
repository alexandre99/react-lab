import React, { Component } from 'react';

export default class Logout extends Component {

    constructor() {
        super();
    }

    componentDidMount() {
        localStorage.removeItem('auth-token');
        this.props.history.push('/timeline');
    }

    render() {
        return null;
    }
}