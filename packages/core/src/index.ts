import { ConnectionManager } from './connection';

(async () => {
	const connectionManager = new ConnectionManager({
		mvisAdminUsername: process.env.MVIS_ADMIN_USERNAME,
		mvisAdminPassword: process.env.MVIS_ADMIN_PASSWORD,
		mvisUrl: 'https://internal.api.storis.io/v1/connection_manager',
		mvisAdminUrl: 'https://cm-admin.storis.io',
		timeout: 30_000,
	});

	const connection = connectionManager.create('dev-103', 'dev-103');
	try {
		await connection.connect();
	} catch (err) {
		console.log(err);
	}
})();
