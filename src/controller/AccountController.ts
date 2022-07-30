import { NextFunction, Request, Response } from "express";
import Authenticate from "../application/Authenticate";
import Account from "../domain/Account";
import AccountRepository from "../domain/AccountRepository";
import AccountDatabaseRepository from "../infra/database/AccountDatabaseRepository";
import Connection from "../infra/database/Connection";
import HttpException from "../infra/http/HttpException";

class AuthenticateDto {
    constructor(readonly username: string, readonly password: string){}
}

export default class AccountController {
    private accountRepository: AccountRepository;
    constructor(private readonly connection: Connection) {
            this.accountRepository = new AccountDatabaseRepository(connection);
    }

    public async authenticate(request: Request, response: Response, next: NextFunction): Promise<any|Error> {
        const account: AuthenticateDto = request.body as unknown as Account;
        const useCase = new Authenticate(this.accountRepository);
        const done = await useCase.execute(account);
        //console.log(done);
        if (done instanceof(Error)) {
            next(new HttpException(404, done.message))
        } else {
            response.status(200).send(done);
        }
    }
}