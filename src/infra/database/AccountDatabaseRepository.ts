import Account from "../../domain/Account";
import AccountRepository from "../../domain/AccountRepository";
import Connection from "./Connection";
import PgPromiseConnectionAdapter from "./PgPromiseConnectionAdapter";

export default class AccountDatabaseRepostiry implements AccountRepository {
    constructor(readonly connection: Connection = new PgPromiseConnectionAdapter()){}

    async create(account: Account): Promise<number> {
        try {
            const [{ id }] = await this.connection.query("insert into accounts(username, password) values($1, crypt('$2', gen_salt('bf'))) returning *", [account.username, account.password]);
            return id;
        } catch (error) {
            throw error;
        }
    }

    async getByUsernameAndHashedPassword(account: Account): Promise<any | undefined> {
        const { username, password } = account;
        try {
            const [row] = await this.connection.query("select * from accounts where username = $1 and password = $2", [username, password]);
            return row;
        } catch (error) {
            throw error;
        }
    }

    async getByUsernameAndPassword(account: Account): Promise<any | undefined> {
        const { username, password } = account;
        try {
            const [row] = await this.connection.query("select * from accounts where username = $1 and password = crypt($2, password)", [username, password]);
            return row;
        } catch (error) {
            throw error;
        }
    }

    async get(account: Account): Promise<Account | undefined> {
        const { id: account_id } = account;
        try {
            const [row] = await this.connection.query("select * from account where id = $1", [account_id]);
            return row as unknown as Account;
        } catch (error) {
            throw error;
        }
    }
}