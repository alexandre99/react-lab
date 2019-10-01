import React, { Component } from 'react';
import FotoItem from './Foto';
import { TransitionGroup } from 'react-transition-group';

export default class Timeline extends Component {

    constructor(props) {
        super(props);
        this.state = { fotos: [] };
        this.login = this.props.login;
    }

    componentDidMount() {
        this.props.store.subscribe(fotos => this.setState({ fotos }));
        this.carregaFotos();
    }

    carregaFotos() {
        let urlPerfil = this.login ?
            `http://localhost:8080/api/public/fotos/${this.login}`
            : `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;
        this.props.store.lista(urlPerfil);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== undefined) {
            this.login = nextProps.login;
            this.carregaFotos();
        }
    }

    like(fotoId) {
        this.props.store.like(fotoId);
    }

    comenta(fotoId, textoComentario) {
        this.props.store.comenta(fotoId, textoComentario);
    }

    render() {
        return (
            <div className="fotos container">
                <TransitionGroup
                    transitionName="timeline"
                    transitionEnterTimeout={500}
                    transitionLeaveTimeout={300}>
                    {
                        this.state.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.like.bind(this)} comenta={this.comenta.bind(this)} />)
                    }
                </TransitionGroup>
            </div>
        );
    }
}