import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import Jumbotron from '../../components/Jumbotron';
import { Book } from '../../utils/httpServices';
import { Loader } from '../../components/Loader';
import { noRecordFound } from '../../components/MessageShow';
import { NO_DATA_AVAILABLE, REQUEST_FAILED, SOMETHING_WRONG } from '../../constant';
import { errorToaster, successToaster } from '../../utils/toaster';
class Detail extends Component {
	state = {
		book: {},
		isSuccess: null,
		isFailed: null
	};

	componentDidMount() {
		this.loadBooksDetail()
	}

	loadBooksDetail = () => {
		let { params: { id } } = this.props.match;
		Loader(true);
		Book.getBook(id)
			.then(res => {
				Loader(false);
				this.setState({ book: res && res.data ? res.data: {}, isSuccess: true, isFailed: null })
			}).catch(err => {
				Loader(false);
				this.setState({ isSuccess: false, isFailed: true })
				err && err.data && err.data.message ? errorToaster(err.data.message) : errorToaster(SOMETHING_WRONG);
				console.log(err)
			});
	};

	render() {
		let { book: { title, author }, isSuccess, isFailed } = this.state;
		return (
			<Container fluid>
				{isSuccess === true && author && title && <div>
					<Row>
						<Col size="md-12">
							<Jumbotron>
								<h1>
									{title} by {author}
								</h1>
							</Jumbotron>
						</Col>
					</Row>
					<Row>
						<Col size="md-2">
							<Link to="/books">← Back to Authors</Link>
						</Col>
					</Row>
				</div>}
				{isSuccess === false && isFailed === true && noRecordFound(NO_DATA_AVAILABLE)}
			</Container>
		);
	}
}

export default Detail;
