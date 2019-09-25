import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css'
import './css/login.css'
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router>
        <Route exact path='/' component={Login} />
        <Route path='/timeline' render={() => (
            localStorage.getItem('auth-token') == null ?
                (<Redirect to={{ pathname: '/', state: {msg : 'Você precisa estar logado para acessar o endereço'} }} />)
                : (<App />)
        )
        } />
         <Route path="/logout" component={Logout}/>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
