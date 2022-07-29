import Account from "../domain/Account";
import AccountRepository from "../domain/repositories/AccountRepository";

export default class GetAccount {
    constructor(readonly accountRepository: AccountRepository){}

    async get(account_id: number): Promise<Account|undefined> {
        return this.accountRepository.get(account_id);
    }
}