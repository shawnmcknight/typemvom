import type { AxiosInstance } from 'axios';
import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';

class ServerFeatureManager {
	private account: string;

	private mvisAdmin: AxiosInstance;

	public constructor(
		url: string,
		account: string,
		username: string,
		password: string,
		timeout: number,
	) {
		this.account = account;

		this.mvisAdmin = axiosCookieJarSupport(
			axios.create({
				baseURL: url,
				jar: new tough.CookieJar(),
				auth: {
					username,
					password,
				},
				withCredentials: true,
				timeout,
			}),
		);
	}

	public checkFeatureStatus = async (): Promise<void> => {
		const features = await this.getDeployedFeatures();
		console.log(features);
	};

	private authenticateMvisAdmin = async (): Promise<void> => {
		await this.mvisAdmin.get('api/user');
	};

	private getDeployedFeatures = async (): Promise<Map<string, string>> => {
		await this.authenticateMvisAdmin();

		const subroutineUrl = `api/manager/rest/${this.account}/subroutines`;
		console.log(subroutineUrl);

		const { data: subroutines } = await this.mvisAdmin.get(subroutineUrl);

		return Object.keys(subroutines).reduce((acc, subroutineName) => {
			if (!subroutineName.match(/^typemvom_.+?@\d+\.\d+\.\d+$/)) {
				return acc;
			}

			const [programId, version] = subroutineName.split('@');
			const [, featureName] = programId.split('_');

			return acc.set(featureName, version);
		}, new Map<string, string>());
	};
}

export default ServerFeatureManager;
