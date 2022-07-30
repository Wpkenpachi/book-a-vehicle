import Account from "../../domain/Account";
import AccountRepository from "../../domain/AccountRepository";

export default class AccountMemoryRepository implements AccountRepository {
    acounts: Account[];

    constructor() {
        this.acounts = [];
    }
    
    getByUsernameAndPassword(account: Account): Promise<Account | undefined> {
        throw new Error("Method not implemented.");
    }
    getByUsernameAndHashedPassword(account: Account): Promise<Account | undefined> {
        throw new Error("Method not implemented.");
    }

    async create(account: Account): Promise<number> {
        const alreadyExists = this.acounts.find(({ username }) => account.username === username);
        if (alreadyExists) throw new Error("This user already exists");
        account.id = this.acounts.length + 1;
        this.acounts.push(account);
        return account.id;
    }

    async get(account: Account): Promise<Account|undefined> {
        return this.acounts.find(({ id }) => account.id === id);
    }
}