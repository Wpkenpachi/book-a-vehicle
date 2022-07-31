import Account from "../domain/Account";
import AccountRepository from "../domain/repository/AccountRepository";

export default class CreateAccount {
    constructor(readonly accountRepository: AccountRepository) {
    }

    async execute(account: Account): Promise<number|Error> {
        return await this.accountRepository.create(account);
    }
}