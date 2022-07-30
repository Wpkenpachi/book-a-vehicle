"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateAccount_1 = __importDefault(require("../../src/application/CreateAccount"));
const GetAccount_1 = __importDefault(require("../../src/application/GetAccount"));
const Account_1 = __importDefault(require("../../src/domain/Account"));
const AccountMemoryRepository_1 = __importDefault(require("../../src/infra/memory/AccountMemoryRepository"));
test("Must create an account that already exists", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const accountMemoryRepository = new AccountMemoryRepository_1.default();
        yield (new CreateAccount_1.default(accountMemoryRepository)).execute(new Account_1.default("wesley.paulo", "123"));
        yield expect((new CreateAccount_1.default(accountMemoryRepository)).execute(new Account_1.default("wesley.paulo", "123"))).rejects.toThrowError("This user already exists");
    });
});
test("Must get an Account", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const accountMemoryRepository = new AccountMemoryRepository_1.default();
        yield (new CreateAccount_1.default(accountMemoryRepository)).execute(new Account_1.default("wesley.paulo", "123"));
        expect((new GetAccount_1.default(accountMemoryRepository)).get(1)).toBeTruthy();
    });
});
