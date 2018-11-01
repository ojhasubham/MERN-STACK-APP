import axios from 'axios';
import { PROD_URL, DEV_URL, EXPIRE_TOKEN } from '../constant';
import { errorToaster } from './toaster';
import { history } from '../App.js';

axios.defaults.baseURL = process.env && process.env.NODE_ENV == 'development' ? DEV_URL : PROD_URL;

// Add a request interceptor
axios.interceptors.request.use(function (config) {
	config.headers.token = localStorage.getItem('token') ? localStorage.getItem('token') : null;
	return config;
}, function (error) {
	return Promise.reject(error);
});

const checkExpireToken = function (errorResponse) {
	if (errorResponse && errorResponse.response && errorResponse.response.data && errorResponse.response.data === 'Unauthorized') {
		errorToaster(EXPIRE_TOKEN)
		localStorage.clear();
		history.push('/')
		return false
	} else {
		return true
	}
}

// Add a response interceptor
axios.interceptors.response.use(function (response) {
	return response;
}, function (error) {
	let errorResponse = JSON.parse(JSON.stringify(error));
	if (checkExpireToken(errorResponse))
		return Promise.reject(errorResponse.response);
});

const Book = {
	// Gets all books
	getBooks: function () {
		return axios.get(`/api/books`);
	},
	// Gets the book with the given id
	getBook: function (id) {
		return axios.get(`/api/books/${id}`);
	},
	// Deletes the book with the given id
	deleteBook: function (id) {
		return axios.delete(`/api/books/${id}`);
	},
	// Saves a book to the database
	saveBook: function (bookData) {
		return axios.post(`/api/books/`, bookData);
	}
};

const Auth = {
	// User login
	login: function (data) {
		return axios.post(`/auth/login`, data);
	},
	// User registration
	register: function (data) {
		return axios.post(`/auth/register`, data);
	}
};

export { Book, Auth }