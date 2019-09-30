import React, { Component } from 'react';
import FotoItem from './Foto';
import { TransitionGroup } from 'react-transition-group';
import Pubsub from 'pubsub-js';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.login = this.props.login;
    }

    componentDidMount() {
        Pubsub.subscribe('timeline', (topico, fotos) => {
            this.setState({ fotos });
        });
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
                <TransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} />)
                    }
                </TransitionGroup>
            </div>
        );
    }
}