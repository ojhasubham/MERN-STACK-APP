import axios from 'axios';
import { PROD_URL, DEV_URL } from '../constant';
const BASIC_URL = process.env && process.env.NODE_ENV == 'development' ? DEV_URL : PROD_URL;

const getHeaderToken = function () {	
	let token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
	return { headers: { "token": `${token}` } };
}

const Book = {
	// Gets all books
	getBooks: function () {
		return axios.get(`${BASIC_URL}/api/books`, getHeaderToken());
	},
	// Gets the book with the given id
	getBook: function (id) {
		return axios.get(`${BASIC_URL}/api/books/${id}`, getHeaderToken());
	},
	// Deletes the book with the given id
	deleteBook: function (id) {
		return axios.delete(`${BASIC_URL}/api/books/${id}`, getHeaderToken());
	},
	// Saves a book to the database
	saveBook: function (bookData) {
		return axios.post(`${BASIC_URL}/api/books/`, bookData, getHeaderToken());
	}
};

const Auth = {
	// User login
	login: function (data) {
		return axios.post(`${BASIC_URL}/auth/login`, data)
			.then(res => res)
			.catch(err => JSON.parse(JSON.stringify(err)))
	},
	// User registration
	register: function (data) {
		return axios.post(`${BASIC_URL}/auth/register`, data);
	}
};

export { Book, Auth }