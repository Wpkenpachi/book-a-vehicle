import Account from "../domain/Account";
import AccountRepository from "../domain/AccountRepository";

export default class GetAccount {
    constructor(readonly accountRepository: AccountRepository){}

    async get(account_id: number): Promise<Account|undefined> {
        return this.accountRepository.get({id: account_id} as Account);
    }
}