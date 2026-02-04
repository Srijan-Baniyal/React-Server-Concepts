import axios from "axios";

// Base configuration
const baseConfig = {
	baseURL: "https://pokeapi.co/api/v2",
	headers: {
		"Content-Type": "application/json",
	},
};

// Server-side API instance
export const PokemonAPI = axios.create({
	...baseConfig,
	headers: {
		...baseConfig.headers,
		"X-Request-Source": "server-component",
		"X-Component-Type": "RSC",
	},
});

// Add request interceptor for server logging
PokemonAPI.interceptors.request.use(
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

PokemonAPI.interceptors.response.use(
	(response) => {
		console.log("✅ [SERVER RESPONSE]", response.config.url, response.status);
		return response;
	},
	(error) => {
		console.error("❌ [SERVER ERROR]", error.config?.url, error.message);
		return Promise.reject(error);
	}
);

// Client-side API instance (for React Query)
export const PokemonAPIClient = axios.create({
	...baseConfig,
	headers: {
		...baseConfig.headers,
		"X-Request-Source": "client-component",
		"X-Component-Type": "React-Query",
	},
});

// Add request interceptor for client - visible in Network tab
PokemonAPIClient.interceptors.request.use(
	(config) => {
		// Add timestamp for tracking
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

PokemonAPIClient.interceptors.response.use(
	(response) => {
		console.log("✅ [CLIENT RESPONSE]", response.config.url, response.status);
		return response;
	},
	(error) => {
		console.error("❌ [CLIENT ERROR]", error.config?.url, error.message);
		return Promise.reject(error);
	}
);
