import React, { Component } from 'react';
import FotoItem from './Foto';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.login = this.props.login;
    }

    componentDidMount() {
        this.carregaFotos();
    }

    carregaFotos() {
        let urlPerfil = this.login ?
                    `http://localhost:8080/api/public/fotos/${this.login}`
                    : `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        fetch(urlPerfil)
            .then(response => response.json())
            .then(fotos => this.setState({ fotos: fotos }));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    render() {
        return (
            <div className="fotos container">
                {
                    this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} />)
                }
            </div>
        );
    }
}