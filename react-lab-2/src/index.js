import React from 'react';
import ReactDOM from 'react-dom';
import './css/reset.css';
import './css/timeline.css'
import './css/login.css'
import App from './App';
import Login from './componentes/Login';
import Logout from './componentes/Logout';
import { Route, BrowserRouter as Router, Redirect } from 'react-router-dom'
import { matchPath } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

const isLoggedIn = (arg) => {
    console.log(arg);
    const urlPrivada = matchPath(arg.match.url, {
        path: '/timeline',
        exact: true,
        strict: false
    });

    if (!urlPrivada || (localStorage.getItem('auth-token') && urlPrivada)) {
        return true;
    }
    return false;
}

ReactDOM.render(
    <Router>
        <Route exact path='/' component={Login} />
        <Route path='/timeline/:login?' render={arg => (
            isLoggedIn(arg) ?
                (<App arg={arg}/>)
                : (<Redirect to={{ pathname: '/', search: '?msg=Você precisa estar logado para acessar o endereço' }} />)
        )
        } />
        <Route path="/logout" component={Logout} />
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
