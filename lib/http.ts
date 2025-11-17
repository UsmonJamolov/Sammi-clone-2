import axios from 'axios';

export const axiosClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	withCredentials: true,
});

axiosClient.interceptors.response.use(
	response => response,
	error => {
		let message = 'Something went wrong. Please try again.';

		if (axios.isAxiosError(error)) {
			if (error.response?.status === 400) {
				message = error.response.data?.message || message;
			}
		}

		return Promise.reject(new Error(message));
	}
);