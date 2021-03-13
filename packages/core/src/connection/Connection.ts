export interface ConnectionOptions {
	/** A unique name for the connection */
	name: string;
	/** The MVIS URL */
	url: string;
	/** The database account name in MVIS */
	account: string;
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

class Connection {
	public status: ConnectionStatus = ConnectionStatus.closed;

	/** A unique name for the connection */
	private name: string;

	/** The MVIS URL */
	private url: string;

	/** The database account name in MVIS */
	private account: string;

	/** Connection timeout in milliseconds  */
	private timeout: number;

	public constructor(options: ConnectionOptions) {
		const { name, url, account, timeout = 30_000 } = options;

		this.name = name;
		this.url = url;
		this.account = account;
		this.timeout = timeout;
	}

	public connect() {
		this.status = ConnectionStatus.connecting;
		this.status = ConnectionStatus.open;
	}
}

export default Connection;
