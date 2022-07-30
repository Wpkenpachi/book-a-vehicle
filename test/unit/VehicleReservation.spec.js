"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const VehicleReservation_1 = __importDefault(require("../../src/domain/VehicleReservation"));
test("Must create a Vehicle Reservation", function () {
    const vehicleReservation = new VehicleReservation_1.default("ABC1234", new Date("2022-07-28T10:00:00"), null, 1);
    expect(vehicleReservation).toBeTruthy();
});
test("Must create a default Vehicle Reservation", function () {
    const vehicleReservation = new VehicleReservation_1.default("ABC1234", undefined, undefined, 1);
    expect(vehicleReservation).toBeTruthy();
});
test("Must create an invalid Vehicle Reservation", function () {
    expect(() => (new VehicleReservation_1.default("ABC1234", new Date("2022-07-28T12:00:00"), new Date("2022-07-28T10:00:00"), 1))).toThrow(new Error("Invalid Reservation"));
});
test("Must create a Vehicle Reservation released", function () {
    const vehicleReservation = new VehicleReservation_1.default("ABC1234", new Date("2022-07-28T10:00:00"), new Date("2022-07-28T12:00:00"), 1);
    expect(vehicleReservation.isReserved()).toBeFalsy();
});
