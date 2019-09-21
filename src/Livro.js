import React, { Component } from 'react';
import InputCustomizado from './componentes/InputCustomizado';
import ButtonCustomizado from './componentes/ButtonCustomizado';
import $ from 'jquery';
import SelectCustomizado, { SelectItem } from './componentes/SelectCustomizado';

class FormularioLivro extends Component {

    constructor() {
        super();
        this.state = { titulo: '', preco: '', idAutor: '', selectItems: [], selectValue: '' };
        this.setTitulo = this.setTitulo.bind(this);
        this.setPreco = this.setPreco.bind(this);
        this.setIdAutor = this.setIdAutor.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: 'http://localhost:8080/api/autores',
            dataType: 'json',
            type: 'get',
            success: function (autores) {
                this.setState({ selectItems: autores.map((autor) => new SelectItem(autor.id, autor.nome, autor.id)) });
            }.bind(this),
            error: function (resposta) {
                console.log(resposta);
            }
        });
    }

    setTitulo(evento) {
        this.setState({ titulo: evento.target.value });
    }

    setPreco(evento) {
        this.setState({ preco: evento.target.value });
    }

    setIdAutor(evento) {
        this.setState({ idAutor: evento.target.value })
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="titulo" type="text" name="titulo" value={this.state.titulo} onChange={this.setTitulo} label="Título" />
                    <InputCustomizado id="preco" type="text" name="preco" value={this.state.preco} onChange={this.setPreco} label="Preço" />
                    <SelectCustomizado value={this.state.value} name="autor" onChange={this.setIdAutor} label="autor" selectItems={this.state.selectItems} />
                    <div className="pure-control-group">
                        <label></label>
                        <ButtonCustomizado type="submit" className="pure-button pure-button-primary" name="Gravar" />
                    </div>
                </form>
            </div>
        );
    }
}

class TabelaLivro extends Component {

    render() {
        return (
            <div>
                <table className="pure-table">
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Preço</th>
                            <th>Autor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.props.lista.map(function (livro) {
                                return (
                                    <tr key={livro.id}>
                                        <td>{livro.título}</td>
                                        <td>{livro.preco}</td>
                                        <td>{livro.autor}</td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default class LivroBox extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

    render() {
        return (
            <div>
                <div className="header">
                    <h1>Cadastro de livros</h1>
                </div>
                <div className="content" id="content">
                    <FormularioLivro />
                    <TabelaLivro lista={this.state.lista} />
                </div>
            </div>
        );
    }
}