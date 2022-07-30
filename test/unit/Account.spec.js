"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Account_1 = __importDefault(require("../../src/domain/Account"));
test("Must creante an Account", function () {
    const account = new Account_1.default("wesley.paulo", "123");
    expect(account).toBeTruthy();
});
