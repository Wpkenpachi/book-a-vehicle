import Account from "../../src/domain/Account";

test("Must creante an Account", function() {
    const account = new Account("wesley.paulo", "123");
    expect(account).toBeTruthy();
});