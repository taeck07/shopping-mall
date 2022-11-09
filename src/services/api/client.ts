import axios from 'axios';

const client = axios.create({
	baseURL: 'http://localhost:8080',
});

client.interceptors.request.use(function (config) {
	return config;
});

export { client };
