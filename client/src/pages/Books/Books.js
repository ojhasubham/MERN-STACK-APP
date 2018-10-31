import React, { Component } from 'react';
import DeleteBtn from '../../components/DeleteBtn';
import Jumbotron from '../../components/Jumbotron';
import { Book } from '../../utils/httpServices';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, FormBtn } from '../../components/Form';
import { Loader } from '../../components/Loader';
import { noRecordFound } from '../../components/MessageShow';
import { NO_DATA_AVAILABLE, REQUEST_FAILED } from '../../constant';
class Books extends Component {
	state = {
		books: [],
		title: '',
		author: '',
		isSuccess: null,
		isFailed: null
	};

	componentDidMount = () => {
		let token = localStorage.getItem('token')
		if (!token) {
			this.props.history.push('/')
		}
		this.loadBooks();
	}

	loadBooks = () => {
		Loader(true);
		Book.getBooks()
			.then(res => {
				Loader(false);
				this.setState({ books: res.data, title: '', author: '', isSuccess: true, isFailed: null })
			}).catch(err => {
				Loader(false);
				this.setState({ title: '', author: '', isSuccess: false, isFailed: true })
				console.log(err)
			});
	};

	deleteBook = id => {
		Loader(true);
		Book.deleteBook(id)
			.then(res => {
				Loader(false);
				this.loadBooks()
			}).catch(err => {
				Loader(false);
				console.log(err)
			});
	};

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		});
	};

	handleFormSubmit = event => {
		event.preventDefault();
		if (this.state.title && this.state.author) {
			Loader(true);
			Book.saveBook({
				title: this.state.title,
				author: this.state.author
			}).then(res => {
				Loader(false);
				this.loadBooks()
			}).catch(err => {
				Loader(false);
				console.log(err)
			});
		}
	};

	render() {
		const { books, author, title, isSuccess, isFailed } = this.state
		return (
			<Container fluid>
				<Row>
					<Col size="md-6">
						<Jumbotron>
							<h1>What Books Should I Read?</h1>
						</Jumbotron>
						<form>
							<Input
								value={title}
								onChange={this.handleInputChange}
								name="title"
								placeholder="Title (required)"
							/>
							<Input
								value={author}
								onChange={this.handleInputChange}
								name="author"
								placeholder="Author (required)"
							/>

							<FormBtn disabled={!(author && title)} onClick={this.handleFormSubmit}							>
								Submit Book
							</FormBtn>
						</form>
					</Col>
					<Col size="md-6 sm-12">
						<Jumbotron>
							<h1>Books On My List</h1>
						</Jumbotron>
						{isSuccess && books && books.length > 0 ?
							<List>
								{books.map(book => (
									<ListItem key={book._id}>
										<Link to={'/books/' + book._id}>
											<strong>
												{book.title} by {book.author}
											</strong>
										</Link>
										<DeleteBtn onClick={() => this.deleteBook(book._id)} />
									</ListItem>
								))}
							</List> : isSuccess && noRecordFound(NO_DATA_AVAILABLE)}
						{isSuccess === false && isFailed === true && noRecordFound(REQUEST_FAILED)}
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Books;
