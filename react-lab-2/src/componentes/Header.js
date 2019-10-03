import React, { Component } from 'react';
import TimelineApi from '../logicas/TimelineApi';
import { connect } from 'react-redux';

class Header extends Component {

    pesquisa(event) {
        event.preventDefault();
        this.props.pesquisa(this.loginPesquisado.value);
    }

    render() {
        return (
            <header className="header container">
                <h1 className="header-logo">
                    Instalura
                    </h1>

                <form className="header-busca" onSubmit={this.pesquisa.bind(this)}>
                    <input type="text" name="search" placeholder="Pesquisa" className="header-busca-campo" ref={input => this.loginPesquisado = input} />
                    <input type="submit" value="Buscar" className="header-busca-submit" />
                </form>


                <nav>
                    <ul className="header-nav">
                        <li className="header-nav-item">
                            <span>{this.props.msg}</span>
                            <a href="#">
                                ♡
            {/*                 ♥ */}
                                {/* Quem deu like nas minhas fotos */}
                            </a>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }

}

const mapStateToProps = state => {
    return { msg: state.notificacao }
}

const mapDispatchToProps = dispatch => {
    return {
        pesquisa: (login) => dispatch(TimelineApi.pesquisa(login))
    }
}

const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderContainer;