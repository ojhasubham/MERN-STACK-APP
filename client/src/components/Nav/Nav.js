import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {
	let token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
	return (
		<nav className="navbar navbar-inverse navbar-top">
			<div className="container-fluid">
				<div className="navbar-header col-md-12">
					<span className="navbar-brand">Books</span>
					{token &&
						<Link to={'/'} onClick={() => { localStorage.clear() }}>
							<button className="btn btn-success pull-right nav-logut-btn">Logout</button>
						</Link>}
				</div>
			</div>
		</nav>
	);
}

export default Nav;
