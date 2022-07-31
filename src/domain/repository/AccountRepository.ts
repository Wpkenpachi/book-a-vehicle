import Account from "../Account";

export default interface AccountRepository {
    create(account: Account): Promise<number|Error>;
    get(acount: Account): Promise<Account|undefined|Error>;
    getByUsernameAndPassword(account: Account): Promise<Account|undefined>;
    getByUsernameAndHashedPassword(account: Account): Promise<Account|undefined>;
}