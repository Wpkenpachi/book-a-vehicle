import Account from "../../domain/Account";
import AccountRepository from "../../domain/repositories/AccountRepository";

export default class AccountMemoryRepository implements AccountRepository {
    acounts: Account[];

    constructor() {
        this.acounts = [];
    }

    async create(account: Account): Promise<number> {
        const alreadyExists = this.acounts.find(({ username }) => account.username === username);
        if (alreadyExists) throw new Error("This user already exists");
        account.id = this.acounts.length + 1;
        this.acounts.push(account);
        return account.id;
    }

    async get(account_id: number): Promise<Account|undefined> {
        return this.acounts.find(({ id }) => account_id === id);
    }
}