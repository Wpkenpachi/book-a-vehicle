import Account from "../domain/Account";
import AccountRepository from "../domain/repository/AccountRepository";
import { generateToken, validateToken } from "../utils/jwt.utils";

export default class GetAuthenticatedAccount {
    constructor(readonly accountRepository: AccountRepository) {}

    async execute(access_token: string): Promise<AccountOutput|Error> {
        const { username, password } = await validateToken(access_token);
        const account = await this.accountRepository.getByUsernameAndHashedPassword({ username, password } as Account);
        if (!account) return new Error("Invalid Credentials");
        return {
            account_id: account.id as number,
            username: account.username,
            password: account.password
        };
    }
}

export type AccountOutput = {
    account_id: number;
    username: string;
    password: string;
}