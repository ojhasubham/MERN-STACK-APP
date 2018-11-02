import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from '../../components/Jumbotron';
import { Auth } from '../../utils/httpServices';
import { errorToaster, successToaster } from '../../utils/toaster';
import { Col, Row, Container } from '../../components/Grid';
import { Input, FormBtn, ErrorElement } from '../../components/Form';
import { Loader } from '../../components/Loader';
import {
	SOMETHING_WRONG, REQUEST_FAILED, EMAIL_NOT_BLANK, INCLUDE_VALID_EMAIL, INPUT_DOMAIN_EMAIL, INVALID_EMAIL,
	PASSWORD_NOT_BLANK, CONFIRM_NOT_BLANK, PASSWORD_NOT_SAME, FIRST_NAME_NOT_BLANK, LAST_NAME_NOT_BLANK, PASSWORD_LENGTH
} from '../../constant';
class Register extends Component {

	state = {
		email: '',
		password: '',
		firstName: '',
		lastName: '',
		confirmPassword: '',
		errorFirstName: '',
		errorLastName: '',
		errorEmail: '',
		errorPassword: '',
		errorResponse: '',
		errorConfirmPassword: ''
	};

	componentDidMount = () => {
		let token = localStorage.getItem('token')
		if (token) {
			this.props.history.push('/books')
		}
	}
	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		const { email, password, firstName, lastName, confirmPassword, errorPassword } = this.state;
		let isValid = true;
		this.setState({ errorResponse: '' })
		if (!firstName) {
			isValid = false;
			this.setState({ errorFirstName: FIRST_NAME_NOT_BLANK })
		} else {
			this.setState({ errorFirstName: '' })
		}

		if (!lastName) {
			isValid = false;
			this.setState({ errorLastName: LAST_NAME_NOT_BLANK })
		} else {
			this.setState({ errorLastName: '' })
		}

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
			if (password.length < 4 || password.length > 12 ) {
				this.setState({ errorPassword: PASSWORD_LENGTH })
			} else {
				this.setState({ errorPassword: '' })
			}
		}

		if (!confirmPassword) {
			isValid = false;
			this.setState({ errorConfirmPassword: CONFIRM_NOT_BLANK })
		} else {
			if (errorPassword == '' && confirmPassword != password) {
				isValid = false;
				this.setState({ errorConfirmPassword: PASSWORD_NOT_SAME })
			} else {
				this.setState({ errorConfirmPassword: '' })
			}
		}

		if (isValid) {
			this.callRegisterApi({ firstName, lastName, email, password });
		}
	};

	callRegisterApi = (userDetail) => {
		Loader(true);
		Auth.register(userDetail)
			.then(res => {
				Loader(false);
				console.log("RES", res)
				let { data: { successStatus = false, message = null } = {}, data } = res;
				if (successStatus) {
					this.props.history.push('/');
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
		const { errorEmail, errorPassword, errorResponse, firstName, lastName, email, password, errorFirstName, errorLastName, confirmPassword, errorConfirmPassword } = this.state;
		return (
			<Container fluid>
				<Row>
					<Col size="md-3"></Col>
					<Col size="md-6">
						<Jumbotron height="200">
							<h1>Register here</h1>
						</Jumbotron>
						<form>
							<Input
								value={firstName}
								type="text"
								onChange={this.handleInputChange}
								name="firstName"
								placeholder="First name (required)"
							/>
							{errorFirstName && <ErrorElement>{errorFirstName}</ErrorElement>}
							<Input
								value={lastName}
								type="text"
								onChange={this.handleInputChange}
								name="lastName"
								placeholder="Last name (required)"
							/>
							{errorLastName && <ErrorElement>{errorLastName}</ErrorElement>}
							<Input
								value={email}
								type="text"
								onChange={this.handleInputChange}
								name="email"
								placeholder="Email (required)"
							/>
							{errorEmail && <ErrorElement>{errorEmail}</ErrorElement>}
							<Input
								value={password}
								type="password"
								onChange={this.handleInputChange}
								name="password"
								placeholder="Password (required)"
							/>
							{errorPassword && <ErrorElement>{errorPassword}</ErrorElement>}

							<Input
								value={confirmPassword}
								type="password"
								onChange={this.handleInputChange}
								name="confirmPassword"
								placeholder="Confirm Password (required)"
							/>
							{errorConfirmPassword && <ErrorElement>{errorConfirmPassword}</ErrorElement>}
							{errorResponse && <ErrorElement>{errorResponse}</ErrorElement>}
							<FormBtn onClick={(e) => { this.handleFormSubmit(e) }}>
								Save
							</FormBtn>
							<Row>
								<Col size="md-2" tagClass="pull-right set-margim-regierlink">
									<Link to="/">← Go Back to Login</Link>
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

export default Register;
