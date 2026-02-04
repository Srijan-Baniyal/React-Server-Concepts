import axios from "axios";

// Base configuration
const baseConfig = {
	baseURL: "https://naas.isalman.dev/no",
	headers: {
		"Content-Type": "application/json",
	},
};

// Server-side API instance
export const NeinAPI = axios.create({
	...baseConfig,
	headers: {
		...baseConfig.headers,
		"X-Request-Source": "server-component",
		"X-Component-Type": "RSC",
	},
});

NeinAPI.interceptors.request.use(
	(config) => {
		console.log(
			"🟢 [SERVER REQUEST]",
			config.method?.toUpperCase(),
			config.url
		);
		return config;
	},
	(error) => Promise.reject(error)
);

NeinAPI.interceptors.response.use(
	(response) => {
		console.log("✅ [SERVER RESPONSE]", response.config.url, response.status);
		return response;
	},
	(error) => {
		console.error("❌ [SERVER ERROR]", error.config?.url, error.message);
		return Promise.reject(error);
	}
);

// Client-side API instance
export const NeinAPIClient = axios.create({
	...baseConfig,
	headers: {
		...baseConfig.headers,
		"X-Request-Source": "client-component",
		"X-Component-Type": "React-Query",
	},
});

NeinAPIClient.interceptors.request.use(
	(config) => {
		config.headers["X-Request-Time"] = new Date().toISOString();
		console.log(
			"🔵 [CLIENT REQUEST]",
			config.method?.toUpperCase(),
			config.url
		);
		return config;
	},
	(error) => Promise.reject(error)
);

NeinAPIClient.interceptors.response.use(
	(response) => {
		console.log("✅ [CLIENT RESPONSE]", response.config.url, response.status);
		return response;
	},
	(error) => {
		console.error("❌ [CLIENT ERROR]", error.config?.url, error.message);
		return Promise.reject(error);
	}
);
