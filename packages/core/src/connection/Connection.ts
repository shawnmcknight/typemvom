import ServerFeatureManager from './ServerFeatureManager';

// #region Types
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
	private readonly url: string;

	private readonly serverFeatureManager: ServerFeatureManager;

	/** Connection timeout in milliseconds  */
	private readonly timeout: number;

	private constructor(
		name: string,
		account: string,
		url: string,
		serverFeatureManager: ServerFeatureManager,
		options: { timeout?: number } = {},
	) {
		const { timeout = 30_000 } = options;

		this.name = name;
		this.account = account;
		this.url = url;
		this.serverFeatureManager = serverFeatureManager;
		this.timeout = timeout;
	}

	public static create(
		name: string,
		account: string,
		mvisUrl: string,
		mvisAdminUrl: string,
		mvisAdminUsername: string,
		mvisAdminPassword: string,
		{ timeout }: { timeout?: number } = {},
	): Connection {
		const serverFeatureManager = new ServerFeatureManager(
			mvisAdminUrl,
			account,
			mvisAdminUsername,
			mvisAdminPassword,
			{ timeout },
		);

		return new Connection(name, account, mvisUrl, serverFeatureManager, { timeout });
	}

	public async connect(): Promise<void> {
		this.status = ConnectionStatus.connecting;
		await this.serverFeatureManager.checkFeatureStatus();
		this.status = ConnectionStatus.open;
	}
}

export default Connection;
