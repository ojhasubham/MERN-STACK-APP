import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import { Auth } from '../../utils/httpServices';
import { errorToaster, successToaster } from '../../utils/toaster';
import { Col, Row, Container } from '../../components/Grid';
import { Input, FormBtn, ErrorElement } from '../../components/Form';
import { Loader } from '../../components/Loader';
import './Login.css';
import { SOMETHING_WRONG, REQUEST_FAILED, EMAIL_NOT_BLANK, INCLUDE_VALID_EMAIL, INPUT_DOMAIN_EMAIL, INVALID_EMAIL, PASSWORD_NOT_BLANK } from '../../constant';
class Login extends Component {
	state = {
		email: '',
		password: '',
		errorEmail: '',
		errorPassword: '',
		errorResponse: ''
	};

	componentDidMount = () => { }
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		const { email, password } = this.state;
		let isValid = true;
		this.setState({ errorResponse: '' })

		if (!email) {
			isValid = false;
			this.setState({ errorEmail: EMAIL_NOT_BLANK })
		} else if (email) {
			let lastAtPos = email.lastIndexOf('@');
			let lastDotPos = email.lastIndexOf('.');
			if (email.search("@") === -1) {
				isValid = false;
				this.setState({ errorEmail: INCLUDE_VALID_EMAIL })
			} else if (!(lastAtPos < lastDotPos && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
				isValid = false;
				this.setState({ errorEmail: INPUT_DOMAIN_EMAIL })
			} else if (!(lastAtPos < lastDotPos && lastAtPos > 0 && email.indexOf('@@') === -1 && lastDotPos > 2 && (email.length - lastDotPos) > 2)) {
				isValid = false;
				this.setState({ errorEmail: INVALID_EMAIL })
			} else {
				this.setState({ errorEmail: '' })
			}
		}

		if (!password) {
			isValid = false;
			this.setState({ errorPassword: PASSWORD_NOT_BLANK })
		} else {
			this.setState({ errorPassword: '' })
		}
		if (isValid) {
			this.setState({ errorPassword: '', errorEmail: '' });
			this.callLoginApi(email, password);
		}

	};

	callLoginApi = (email, password) => {
		Loader(true);
		Auth.login({
			email: email,
			password: password
		}).then(res => {
			Loader(false);
			let { data: { successStatus = false, token = null, email = null, message = null } = {}, data } = res;
			if (successStatus) {
				localStorage.setItem('token', token);
				localStorage.setItem('email', email);
				localStorage.setItem('user', JSON.stringify(data));
				this.setState({ email: '', password: '' });
				this.props.history.push('/books');
				message && successToaster(message);
			} else {
				errorToaster(REQUEST_FAILED)
			}
		}).catch(err => {
			Loader(false);
			err && err.data && err.data.successStatus == false ? this.setState({ errorResponse: err.data.message ? err.data.message : SOMETHING_WRONG }) : errorToaster(SOMETHING_WRONG);
			console.log("Error", err)
		});
	}

	render() {
		const { errorEmail, errorPassword, errorResponse } = this.state;
		return (
			<Container fluid>
				<Row>
					<Col size="md-3"></Col>
					<Col size="md-6">
						<Jumbotron height="200">
							<h1>Login</h1>
						</Jumbotron>
						<form>
							<Input
								value={this.state.email}
								type="text"
								onChange={this.handleInputChange}
								name="email"
								placeholder="Email (required)"
							/>
							{errorEmail && <ErrorElement>{errorEmail}</ErrorElement>}
							<Input
								value={this.state.password}
								type="password"
								onChange={this.handleInputChange}
								name="password"
								placeholder="Password (required)"
							/>
							{errorPassword && <ErrorElement>{errorPassword}</ErrorElement>}
							{errorResponse && <ErrorElement>{errorResponse}</ErrorElement>}

							<FormBtn onClick={(e) => { this.handleFormSubmit(e) }}>
								Login
							</FormBtn>
							<Row>
								<Col size="md-2" tagClass="pull-right set-margim-regierlink">
									<Link to="/register">← Go to Register</Link>
								</Col>
							</Row>
						</form>
					</Col>
					<Col size="md-3"></Col>
				</Row>
			</Container>
		);
	}
}

export default Login;
