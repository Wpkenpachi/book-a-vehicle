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
const request = require("supertest");
const Api_1 = __importDefault(require("../../src/infra/http/Api"));
describe("Must test api calls", function () {
    let access_token;
    beforeAll(() => __awaiter(this, void 0, void 0, function* () {
        const { body: body1 } = yield request(Api_1.default).post("/api/authenticate")
            .send({
            username: "wesley.paulo",
            password: "4321"
        })
            .set('Accept', 'application/json')
            .expect(200);
        access_token = body1.access_token;
        expect(body1).toHaveProperty('access_token');
    }));
    test("Must Try List Vehicles without access_token", function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield request(Api_1.default)
                .get('/api/vehicle')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .expect(401);
        });
    });
    test("Must List Vehicles", function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield request(Api_1.default)
                .get('/api/vehicle')
                .set('Accept', 'application/json')
                .set('Authorization', `Bearer ${access_token}`)
                .expect(200);
        });
    });
    test("Must Try Book Vehicles without access_token", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = yield request(Api_1.default)
                .post('/api/book/vehicle')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .send({
                plate: "BBB1111"
            })
                .expect(401);
            expect(body).toEqual({ message: "Invalid token" });
        });
    });
    test("Must Book a Vehicle", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const { body } = yield request(Api_1.default)
                .post('/api/book/vehicle')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${access_token}`)
                .send({
                plate: "BBB1111"
            })
                .expect(200);
            expect(body).toBeTruthy();
            yield request(Api_1.default)
                .put('/api/return/vehicle')
                .set('Accept', 'application/json')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${access_token}`)
                .expect(200);
        });
    });
});
