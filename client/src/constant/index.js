export const PROD_URL = process.env && process.env.PROD_BASE_URL ? process.env.PROD_BASE_URL : 'https://mern-stack-app.herokuapp.com';
export const DEV_URL = process.env && process.env.DEV_BASE_URL ? process.env.DEV_BASE_URL : 'http://localhost:9000';
export const NO_DATA_AVAILABLE = 'No data available';
export const REQUEST_FAILED = 'Request failed, Please try again.';