import React, { Component } from 'react';


export default class TabelaLivro extends Component {

    constructor() {
        super();
        this.state = { lista: [] };
    }

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
                            this.state.lista.map(function (livro) {
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