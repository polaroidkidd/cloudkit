import type { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';

export abstract class ApiServiceBase {
	public context: string;

	protected readonly http: AxiosInstance;

	constructor(
		context: string,
		commonRequestConfig: AxiosRequestConfig = {
			transformRequest: [
				(data) => {
					return JSON.stringify(data);
				}
			]
		}
	) {
		this.context = context;

		let { headers = {} } = commonRequestConfig;
		if (headers['Content-Type'] == null) {
			headers = {
				...headers,
				'Content-Type': 'application/json'
			};
		}

		this.http = axios.create({
			...commonRequestConfig,
			headers,
			baseURL: context,
			paramsSerializer: { indexes: null }
		});
		// /**
		//  * Use this to log out all requests during a test run.
		//  */
		// if (process.env.NODE_ENV === 'test') {
		//     this.http.interceptors.request.use(
		//         (config) => {
		//             console.log(`${config.method.toUpperCase()} ${config.baseURL}${config.url}`);
		//
		//             return config;
		//         }
		//     );
		// }

		this.http.interceptors.response.use(null, (error: AxiosError) => {
			if (error.response && typeof error.response.data === 'string') {
				// Use the verify middleware here verifySessionTimeout(error.response);
				// verifyMaintenanceMode(error.response as AxiosResponse<string>);
			}

			return Promise.reject(error);
		});
	}
}
