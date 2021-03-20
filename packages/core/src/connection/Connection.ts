import type { AxiosInstance } from 'axios';
import axios from 'axios';
import axiosCookieJarSupport from 'axios-cookiejar-support';
import tough from 'tough-cookie';

// #region Types
export interface ConnectionOptions {
	/** A unique name for the connection */
	name: string;
	/** The database account name in MVIS */
	account: string;
	/** The MVIS URL */
	mvisUrl: string;
	/** The MVIS Admin URL */
	mvisAdminUrl: string;
	/** The MVIS Admin Username */
	mvisAdminUsername: string;
	/** The MVIS Admin Password */
	mvisAdminPassword: string;
	/**
	 * Connection timeout in milliseconds
	 * Default 30_000 (30 seconds)
	 */
	timeout?: number;
}

export enum ConnectionStatus {
	open,
	closed,
	connecting,
}
// #endregion

class Connection {
	public status: ConnectionStatus = ConnectionStatus.closed;

	/** A unique name for the connection */
	private readonly name: string;

	/** The database account name in MVIS */
	private readonly account: string;

	/** The MVIS URL */
	private readonly mvisUrl: string;

	/** The MVIS Admin URL */
	private readonly mvisAdminUrl: string;

	/** The MVIS Admin Username */
	private readonly mvisAdminUsername: string;

	/** The MVIS Admin Password */
	private readonly mvisAdminPassword: string;

	/** Connection timeout in milliseconds  */
	private readonly timeout: number;

	private mvisAdminAxios: AxiosInstance;

	public constructor(options: ConnectionOptions) {
		const {
			name,
			account,
			mvisUrl,
			mvisAdminUrl,
			mvisAdminUsername,
			mvisAdminPassword,
			timeout = 30_000,
		} = options;

		this.name = name;
		this.account = account;
		this.mvisUrl = mvisUrl;
		this.mvisAdminUrl = mvisAdminUrl;
		this.mvisAdminUsername = mvisAdminUsername;
		this.mvisAdminPassword = mvisAdminPassword;
		this.timeout = timeout;

		this.mvisAdminAxios = axiosCookieJarSupport(
			axios.create({
				baseURL: this.mvisAdminUrl,
				jar: new tough.CookieJar(),
				auth: {
					username: this.mvisAdminUsername,
					password: this.mvisAdminPassword,
				},
				withCredentials: true,
				timeout: this.timeout,
			}),
		);
	}

	public async connect(): Promise<void> {
		this.status = ConnectionStatus.connecting;
		await this.getDeployedSubroutines;
		this.status = ConnectionStatus.open;
	}

	private authenticateMvisAdmin = async (): Promise<void> => {
		const foo = await this.mvisAdminAxios.get('api/user');
		console.log(foo.data);
	};

	private getDeployedSubroutines = async (): Promise<void> => {
		await this.authenticateMvisAdmin();

		const subroutineUrl = `api/manager/rest/${this.account}/subroutines`;

		const foo = await this.mvisAdminAxios.get(subroutineUrl);
		console.log(foo.data);
	};
}

export default Connection;
