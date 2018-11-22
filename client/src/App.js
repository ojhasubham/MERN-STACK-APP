import React from 'react';
import { Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Books from './pages/Books';
import Detail from './pages/Detail';
import { Login, Register } from './pages/Auth';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import { PrivateRoute, PublicRoute } from './components/Routes';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const projectCanonnicalAddr = "https://mern-stack-app.herokuapp.com";
function cacheQueryParser(query) {
    let out = '';
    if (typeof query === 'string') {
        out = query.split(':').pop().replace(/^[^/]*/, '');
    }
    return out;
}

function intercepPath(next, replace) {
    if (next.location.pathname === '/search' 
        && next.location.query.q 
        && next.location.query.q.indexOf('cache') === 0 
        && next.location.query.q.indexOf(projectCanonnicalAddr) > -1) {
            replace(null, cacheQueryParser(next.location.query.q));
    } 
};

class App extends BrowserRouter {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<Router history={history}>
				<div>
					<ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick />
					<Nav />
					<Switch>
						<PublicRoute exact path="/" component={Login} />
						<PublicRoute exact path="/login" component={Login} />
						<PublicRoute exact path="/register" component={Register} />
						<PrivateRoute exact path="/books" component={Books} />
						<PrivateRoute exact path="/books/:id" component={Detail} />
						<PublicRoute path='/404' component={NoMatch} />
						<Route path="*" component={NoMatch} onEnter={intercepPath} />
					</Switch>
				</div>
			</Router>
		)
	}
};

export default App;