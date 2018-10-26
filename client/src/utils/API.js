import axios from 'axios';
const BASIC_URL = process.env && process.env.BASIC_URL ? process.env.BASIC_URL : '';
export default {
	// Gets all books
	getBooks: function() {
		return axios.get(`${BASIC_URL}/api/books`);
	},
	// Gets the book with the given id
	getBook: function(id) {
		return axios.get(`${BASIC_URL}/api/books/${id}`);
	},
	// Deletes the book with the given id
	deleteBook: function(id) {
		return axios.delete(`${BASIC_URL}/api/books/${id}`);
	},
	// Saves a book to the database
	saveBook: function(bookData) {
		return axios.post(`${BASIC_URL}/api/books/`, bookData);
	}
};