import CreateAccount from "../../src/application/CreateAccount";
import GetAccount from "../../src/application/GetAccount";
import Account from "../../src/domain/Account";
import AccountMemoryRepository from "../../src/infra/memory/AccountMemoryRepository";

test("Must create an account that already exists", async function() {
    const accountMemoryRepository = new AccountMemoryRepository();
    await (new CreateAccount(accountMemoryRepository)).execute(new Account("wesley.paulo", "123"));
    await expect((new CreateAccount(accountMemoryRepository)).execute(new Account("wesley.paulo", "123"))).rejects.toThrowError("This user already exists");
});

test("Must get an Account", async function() {
    const accountMemoryRepository = new AccountMemoryRepository();
    await (new CreateAccount(accountMemoryRepository)).execute(new Account("wesley.paulo", "123"));
    expect((new GetAccount(accountMemoryRepository)).get(1)).toBeTruthy();
});