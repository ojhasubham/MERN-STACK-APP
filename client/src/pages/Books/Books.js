import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import DeleteBtn from '../../components/DeleteBtn';
import Jumbotron from '../../components/Jumbotron';
import { Book } from '../../utils/httpServices';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import { List, ListItem } from '../../components/List';
import { Input, FormBtn } from '../../components/Form';
import { Loader } from '../../components/Loader';
import { noRecordFound } from '../../components/MessageShow';
import { NO_DATA_AVAILABLE, REQUEST_FAILED, SOMETHING_WRONG, BOOK_ADDED, BOOK_DELETED } from '../../constant';
import { errorToaster, successToaster } from '../../utils/toaster';
import _ from 'lodash';
class Books extends Component {
	state = {
		books: [],
		title: '',
		author: '',
		isSuccess: null,
		isFailed: null,
		bookId: '',
		isDeleModelOpen: false
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
				this.setState({ books: res && res.data ? res.data: [], title: '', author: '', isSuccess: true, isFailed: null })
			}).catch(err => {
				Loader(false);
				this.setState({ title: '', author: '', isSuccess: false, isFailed: true })
				err && err.data && err.data.message ? errorToaster(err.data.message) : errorToaster(SOMETHING_WRONG);
				console.log("err", err)
			});
	};

	deleteBook = () => {
		let { bookId, books } = this.state;
		Loader(true);
		Book.deleteBook(bookId)
			.then(res => {
				Loader(false);
				_.remove(books, { _id: bookId });
				this.setState({ isDeleModelOpen: false, bookId: '', book: books })
				successToaster(BOOK_DELETED)
			}).catch(err => {
				Loader(false);
				err && err.data && err.data.message ? errorToaster(err.data.message) : errorToaster(SOMETHING_WRONG);
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
				let { data } = res;
				successToaster(BOOK_ADDED)
				this.setState({ title: '', author: '', books: this.state.books.concat([data]) })
			}).catch(err => {
				Loader(false);
				err && err.data && err.data.message ? errorToaster(err.data.message) : errorToaster(SOMETHING_WRONG);
				console.log("err:", err)
			});
		}
	};

	deleteModel = () => {
		let { isDeleModelOpen } = this.state;
		return (
			<Modal open={isDeleModelOpen} onClose={() => { this.setState({ isDeleModelOpen: false }) }} center>
				<div>
					<div className="modal-header">
						<h4 className="modal-title">Delete Book</h4>
					</div>
					<div className="modal-body">
						<div>
							<span>
								<h4>Are you sure, you want to delete book ?</h4>
							</span>
						</div>
					</div>
					<div className="modal-footer">
						<button type="button" className="btn small-btn btn-danger" onClick={() => {
							this.deleteBook()
						}}>Confirm</button>
						<button type="button" className="btn light-button" onClick={() => { this.setState({ isDeleModelOpen: false }) }}>Cancel</button>
					</div>
				</div>
			</Modal>)
	}

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
										<DeleteBtn onClick={() => { this.setState({ isDeleModelOpen: true, bookId: book._id }) }} />
									</ListItem>
								))}
							</List> : isSuccess && noRecordFound(NO_DATA_AVAILABLE)}
						{isSuccess === false && isFailed === true && noRecordFound(NO_DATA_AVAILABLE)}
					</Col>
				</Row>
				{this.deleteModel()}
			</Container>
		);
	}
}

export default Books;
