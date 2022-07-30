"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Vehicle_1 = __importDefault(require("../../src/domain/Vehicle"));
test("Must create a vehicle", function () {
    const vehicle = new Vehicle_1.default("ABC1234", "Hyundai Verna 1.6 SX");
    expect(vehicle).toBeTruthy();
});
