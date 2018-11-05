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
						<Redirect from='*' to='/404' component={NoMatch} />
					</Switch>
				</div>
			</Router>
		)
	}
};

export default App;