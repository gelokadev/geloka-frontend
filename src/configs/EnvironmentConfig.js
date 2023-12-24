const dev = {
//   API_ENDPOINT_URL: 'http://localhost:8090'
  API_ENDPOINT_URL: 'http://178.238.225.128:8090'
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
