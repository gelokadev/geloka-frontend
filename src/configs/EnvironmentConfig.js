const dev = {
  API_ENDPOINT_URL: 'http://localhost:8080'
//   API_ENDPOINT_URL: 'https://api.geloka.com'
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return dev
		default:
			break;
	}
}

export const env = getEnv();
