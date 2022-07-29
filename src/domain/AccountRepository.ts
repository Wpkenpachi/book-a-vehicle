import Account from "./Account";

export default interface AccountRepository {
    create(account: Account): Promise<number>;
    get(account_id: number): Promise<Account|undefined>;
}