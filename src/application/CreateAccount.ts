import Account from "../domain/Account";
import AccountRepository from "../domain/AccountRepository";

export default class CreateAccount {
    constructor(readonly accountRepository: AccountRepository) {
    }

    async execute(account: Account): Promise<number> {
        return await this.accountRepository.create(account);
    }
}