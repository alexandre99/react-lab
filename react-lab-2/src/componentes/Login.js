import React, { Component } from 'react';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = { msg: this.getMsg()};
    }

    getMsg() {
        let search = this.props.location.search;
        return search ? search.substring(5) : '';
    }

    enviaForm(event) {
        event.preventDefault();

        const requestInfo = {
            method: 'POST',
            body: JSON.stringify({ login: this.login.value, senha: this.senha.value }),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        };

        fetch('http://localhost:8080/api/public/login', requestInfo)
            .then(resposta => {
                if (resposta.ok) {
                    return resposta.text();
                } else {
                    throw new Error('Não foi possível fazer o login');
                }
            })
            .then(token => {
                localStorage.setItem('auth-token', token)
                this.props.history.push('/timeline');
            })
            .catch(error => this.setState({ msg: error.message }));
    }

    render() {
        return (
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.enviaForm.bind(this)}>
                    <input type="text" ref={(input) => this.login = input} />
                    <input type="password" ref={(input) => this.senha = input} />
                    <input type="submit" value="login" />
                </form>
            </div>
        );
    }
}