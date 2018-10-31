import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Books from './pages/Books';
import Detail from './pages/Detail';
import { Login, Register } from './pages/Auth';
import NoMatch from './pages/NoMatch';
import Nav from './components/Nav';
import './App.css';

const App = () => (
	<Router>
		<div>
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
