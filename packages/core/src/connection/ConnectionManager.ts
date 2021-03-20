import Connection from './Connection';

// #region Types
interface ConnectionOptions {
	mvisUrl?: string;
	mvisAdminUrl?: string;
	mvisAdminUsername?: string;
	mvisAdminPassword?: string;
	timeout?: number;
}
// #endregion

/** Manage connections */
class ConnectionManager {
	private connections: Map<string, Connection> = new Map();

	private readonly connectionDefaults: ConnectionOptions;

	public constructor(connectionDefaults: ConnectionOptions = {}) {
		this.connectionDefaults = connectionDefaults;
	}

	/** Create a new connection within this ConnectionManager instance */
	public create(
		name: string,
		account: string,
		connectionOptions: ConnectionOptions = {},
	): Connection {
		if (this.connections.has(name)) {
			throw new Error(`A connection already exists with name ${name}`);
		}

		const {
			mvisUrl,
			mvisAdminUrl,
			mvisAdminUsername,
			mvisAdminPassword,
			timeout,
		} = this.buildConnectionOptions(connectionOptions);

		const connection = Connection.create(
			name,
			account,
			mvisUrl,
			mvisAdminUrl,
			mvisAdminUsername,
			mvisAdminPassword,
			{ timeout },
		);

		this.connections.set(name, connection);

		return connection;
	}

	/** Get an existing connection within this ConnectionManager instance */
	public get(name: string): Connection {
		const connection = this.connections.get(name);

		if (connection == null) {
			throw new Error(`No connection with name ${name} exists.`);
		}

		return connection;
	}

	/** Merge default and override connection options */
	private buildConnectionOptions = (options: ConnectionOptions): Required<ConnectionOptions> => {
		const connectionOptions = {
			...this.connectionDefaults,
			...options,
		};

		if (
			connectionOptions.mvisUrl == null ||
			connectionOptions.mvisAdminUrl == null ||
			connectionOptions.mvisAdminUsername == null ||
			connectionOptions.mvisAdminPassword == null
		) {
			throw new Error('Missing required connection property');
		}

		return connectionOptions as Required<ConnectionOptions>; // needed to narrow type
	};
}

export default ConnectionManager;
