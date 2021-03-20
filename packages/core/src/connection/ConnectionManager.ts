import Connection from './Connection';
import type { ConnectionOptions } from './Connection';

// #region Types
type NotDefaultableConnectionOptions = 'name' | 'account';

export type ConnectionManagerDefaultable = Partial<
	Omit<ConnectionOptions, NotDefaultableConnectionOptions>
>;

export type ConnectionManagerConnectionOptions = Pick<
	ConnectionOptions,
	NotDefaultableConnectionOptions
> &
	ConnectionManagerDefaultable;
// #endregion

/** Manage connections */
class ConnectionManager {
	private connections: Map<string, Connection> = new Map();

	private readonly connectionDefaults: ConnectionManagerDefaultable;

	public constructor(connectionDefaults: ConnectionManagerDefaultable) {
		this.connectionDefaults = connectionDefaults;
	}

	/** Create a new connection within this ConnectionManager instance */
	public create(options: ConnectionManagerConnectionOptions): Connection {
		const { name } = options;

		if (this.connections.has(name)) {
			throw new Error(`A connection already exists with name ${name}`);
		}

		const connectionOptions = this.buildConnectionOptions(options);

		const connection = new Connection(connectionOptions);

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
	private buildConnectionOptions = (
		options: ConnectionManagerConnectionOptions,
	): ConnectionOptions => {
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

		return connectionOptions as ConnectionOptions; // needed to narrow type
	};
}

export default ConnectionManager;
