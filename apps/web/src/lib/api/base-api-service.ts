import type { AxiosInstance, AxiosRequestConfig } from 'axios';
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
	}
}
