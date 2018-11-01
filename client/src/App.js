import React from 'react';
import { Router, Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import Books from './pages/Books';
import Detail from './pages/Detail';
import { Login, Register } from './pages/Auth';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserHistory } from 'history';
export const history = createBrowserHistory();

const App = () => (
	<Router history={history}>
		<div>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
			/>
			<Nav />
			<Switch>
				<Route exact path="/" component={Login} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/books" component={Books} />
				<Route exact path="/books/:id" component={Detail} />
				<Route path='/404' component={NoMatch} />
				<Redirect from='*' to='/404' component={NoMatch} />
			</Switch>
		</div>
	</Router>
);

export default App;
