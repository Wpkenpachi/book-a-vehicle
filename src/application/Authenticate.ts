import Account from "../domain/Account";
import AccountRepository from "../domain/repository/AccountRepository";
import { generateToken } from "../utils/jwt.utils";

export default class Authenticate {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute(account: Account): Promise<Output | Error> {
        try {
            const done = await this.accountRepository.getByUsernameAndPassword(account as Account);
            if (!done) return new Error("Invalid Credentials");
            return {
                access_token: generateToken(done)
            }
        } catch (error) {
            return error as unknown as Error;
        }
    }
}

type Output = {
    access_token: string
}