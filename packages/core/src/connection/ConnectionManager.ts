import Connection from './Connection';
import type { ConnectionOptions } from './Connection';

/** Manage connections */
class ConnectionManager {
	private connections: Map<string, Connection> = new Map();

	/** Create a new connection within this ConnectionManager instance */
	public createConnection(options: ConnectionOptions): Connection {
		const { name } = options;

		if (this.connections.has(name)) {
			throw new Error(`A connection already exists with name ${name}`);
		}

		const connection = new Connection(options);

		this.connections.set(name, connection);

		return connection;
	}

	/** Get an existing connection within this ConnectionManager instance */
	public getConnection(name: string): Connection {
		const connection = this.connections.get(name);

		if (connection == null) {
			throw new Error(`No connection with name ${name} exists.`);
		}

		return connection;
	}
}

export default ConnectionManager;
