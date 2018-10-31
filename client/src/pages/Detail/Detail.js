import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import Jumbotron from '../../components/Jumbotron';
import { Book } from '../../utils/httpServices';
import { Loader } from '../../components/Loader';
class Detail extends Component {
	state = {
		book: {}
	};

	componentDidMount() {
		let token = localStorage.getItem('token')
		if (!token) {
			this.props.history.push('/')
		}
		this.loadBooksDetail()
	}

	loadBooksDetail = () => {
		let { params: { id } } = this.props.match;
		Loader(true);
		Book.getBook(id)
			.then(res => {
				Loader(false);
				this.setState({ book: res.data })
			}).catch(err => {
				Loader(false);
				console.log(err)
			});
	};

	render() {
		let { book: { title, author } } = this.state;
		return (
			<Container fluid>
				{author && title && <div>
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
							<Link to="/">← Back to Authors</Link>
						</Col>
					</Row>
				</div>}
			</Container>
		);
	}
}

export default Detail;
