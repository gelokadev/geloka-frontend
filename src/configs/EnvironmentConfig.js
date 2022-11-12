const dev = {
  API_ENDPOINT_URL: 'http://localhost:8080'
};

const prod = {
  API_ENDPOINT_URL: 'https://connect.immersively.care/api'
};

const getEnv = () => {
	switch (process.env.NODE_ENV) {
		case 'development':
			return dev
		case 'production':
			return prod
		default:
			break;
	}
}

export const env = getEnv()
