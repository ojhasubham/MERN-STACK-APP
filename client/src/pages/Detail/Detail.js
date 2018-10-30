import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row, Container } from '../../components/Grid';
import Jumbotron from '../../components/Jumbotron';
import { Book } from '../../utils/httpServices';

class Detail extends Component {
	state = {
		book: {}
	};

	componentDidMount() {
		Book.getBook(this.props.match.params.id)
			.then(res => this.setState({ book: res.data }))
			.catch(err => console.log(err));
	}

	render() {
		return (
			<Container fluid>
				<Row>
					<Col size="md-12">
						<Jumbotron>
							<h1>
								{this.state.book.title} by {this.state.book.author}
							</h1>
						</Jumbotron>
					</Col>
				</Row>

				<Row>
					<Col size="md-2">
						<Link to="/">← Back to Authors</Link>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Detail;
