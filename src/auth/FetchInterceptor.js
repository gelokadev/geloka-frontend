import axios from 'axios';
import history from '../history'
import Utils from '../utils/index';
import { notification } from 'antd';
import { AUTH_TOKEN } from '../redux/constants/Auth';
import * as UserUrl from '../services/users/routes';
import { APP_PREFIX_PATH, ADMIN_PREFIX_PATH, API_BASE_URL } from '../configs/AppConfig';

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
})

// Config
const ENTRY_ROUTE = '/';
const TOKEN_PAYLOAD_KEY = 'Authorization';

// API Request interceptor
service.interceptors.request.use(config => {

	const accessToken = localStorage.getItem(AUTH_TOKEN)
	
	if (accessToken && !config.url.includes(UserUrl.LOGIN_USER_ACCOUNT)) {
		config.headers[TOKEN_PAYLOAD_KEY] = 'Bearer ' + accessToken
	}

	if (config.multipart) {
		config.headers['content-type'] = 'multipart/form-data';
	 }

	if ((config.method === 'post' || config.method === 'put')) {
		// Create an object to store file data
		const fileData = {};

		// Check if fileData is present
		if (config.fileData) {
			config.fileData.forEach(f => {
				fileData[f] = config.data[f];
				delete config.data[f];
			});
		}

		config.data = Utils.objectToFormData(config.data);

		// Append files to data to send
		if (config.fileData) {
			Object.entries(fileData).forEach(item => {
				config.data.append(item[0], item[1]);
			});
		}
	}

  return config
}, error => {
	// Do something with request error here

	notification.error({
		message: 'Error'
	})
  	Promise.reject(error)
})

// API respone interceptor
service.interceptors.response.use( (response) => {
	return response.data
}, (error) => {

	let notificationParam = {
		message: ''
	}
	
	// Remove token and redirect 
	if (error.response.status === 403 || error.response.status === 401) {
		notificationParam.message = 'Authentication Fail';
		notificationParam.description = 'Please login again';
		localStorage.removeItem(AUTH_TOKEN);
		if(window.location.pathname.startsWith(APP_PREFIX_PATH) || 
		window.location.pathname.startsWith(ADMIN_PREFIX_PATH)) {
			history.push(ENTRY_ROUTE);
			window.location.reload();
		}
	}

	if (error.response.status === 404) {
		notificationParam.message = 'Not Found';
	}

	if (error.response.status === 400) {
		notificationParam.message = 'Provided datas was not correct';
	}

	if (error.response.status === 409) {
		notificationParam.message = 'Already exists';
	}

	if (error.response.status === 500) {
		notificationParam.message = 'Internal Server Error';
	}
	
	if (error.response.status === 508) {
		notificationParam.message = 'Time Out, check your internet connection';
	}

	if(window.location.pathname.startsWith(APP_PREFIX_PATH) || 
		window.location.pathname.startsWith(ADMIN_PREFIX_PATH)) {
		notification.error(notificationParam);
	}

	return Promise.reject(error);
});

export default service