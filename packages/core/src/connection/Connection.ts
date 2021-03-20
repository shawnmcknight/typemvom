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
	}

	public connect() {
		this.status = ConnectionStatus.connecting;
		this.status = ConnectionStatus.open;
	}
}

export default Connection;
