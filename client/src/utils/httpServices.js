import axios from 'axios';
import { PROD_URL, DEV_URL } from '../constant';
const BASIC_URL = process.env && process.env.NODE_ENV == 'development' ? DEV_URL : PROD_URL;
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjViZDcwYzY5NWExZTdjMzNmNDQ2NWFmNyIsImVtYWlsIjoib2poYS5zdWJoYW1AZ21haWwuY29tMDEiLCJwYXNzd29yZCI6IiQyYiQxMCRpQTJQUG5FdFFqeXlWS20zNVdCSG4uNHl3YUtpL3lxc3JPeGtFajJBS2RQUHBxZUZ5VzZKdSIsIl9fdiI6MH0sImV4cCI6MTU0MDkxMjcyNCwiaWF0IjoxNTQwOTA5MTI0fQ.EE_PHcCgJDSsP_iYjuAzaWP52XhzZPZQzyR2Wq2SllE'

const Book = {
	// Gets all books
	getBooks: function () {
		return axios.get(`${BASIC_URL}/api/books`, { headers: { "token": `${token}` } });
	},
	// Gets the book with the given id
	getBook: function (id) {
		return axios.get(`${BASIC_URL}/api/books/${id}`);
	},
	// Deletes the book with the given id
	deleteBook: function (id) {
		return axios.delete(`${BASIC_URL}/api/books/${id}`);
	},
	// Saves a book to the database
	saveBook: function (bookData) {
		return axios.post(`${BASIC_URL}/api/books/`, bookData);
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