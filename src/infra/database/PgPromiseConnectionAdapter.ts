import Connection from "./Connection";
import pgp from "pg-promise";

export default class PgPromiseConnectionAdapter implements Connection {
	pgp: any;

	constructor () {
		this.pgp = pgp()(`postgres://${process.env.PG_USER}:${process.env.PG_PASS}@${process.env.DB_HOST}:5432/postgres`);
	}
	
	query(statement: string, params: any): Promise<any> {
		return this.pgp.query(statement, params);
	}

	close(): Promise<void> {
		return this.pgp.$pool.end();
	}
}