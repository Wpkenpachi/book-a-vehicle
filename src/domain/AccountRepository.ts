import Account from "./Account";

export default interface AccountRepository {
    create(account: Account): Promise<number>;
    get(acount: Account): Promise<Account|undefined>;
    getByUsernameAndPassword(account: Account): Promise<Account|undefined>;
    getByUsernameAndHashedPassword(account: Account): Promise<Account|undefined>;
}