import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnectionAdapter implements Connection {
	pgp: any;

	constructor () {
		this.pgp = pgp()({
			"host": "localhost",
			"port": 5432,
			"database": "postgres",
			"user": "postgres",
			"password": "123456"
		});
	}
	
	query(statement: string, params: any): Promise<any> {
		return this.pgp.query(statement, params);
	}

	close(): Promise<void> {
		return this.pgp.$pool.end();
	}
}