import React, { Component } from 'react';
import FotoItem from './Foto';
import { TransitionGroup } from 'react-transition-group';
import TimelineApi from '../logicas/TimelineApi';
import { connect } from 'react-redux'

class Timeline extends Component {

    constructor(props) {
        super(props);
        this.login = this.props.login;
    }

    componentDidMount() {
        this.carregaFotos();
    }

    carregaFotos() {
        let urlPerfil = this.login ?
            `http://localhost:8080/api/public/fotos/${this.login}`
            : `http://localhost:8080/api/fotos?X-AUTH-TOKEN=${localStorage.getItem('auth-token')}`;

        this.props.lista(urlPerfil);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.login !== this.login) {
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
                        this.props.fotos.map(foto => <FotoItem key={foto.id} foto={foto} like={this.props.like} comenta={this.props.comenta} />)
                    }
                </TransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { fotos: state.timeline }
}

const mapDispatchToProps = dispatch => {
    return {
        like: (fotoId) => dispatch(TimelineApi.like(fotoId)),
        comenta: (fotoId, textoComentario) => dispatch(TimelineApi.comenta(fotoId, textoComentario)),
        lista: (urlPerfil) => dispatch(TimelineApi.lista(urlPerfil))
    }
}

const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(Timeline);

export default TimelineContainer;