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
const BookVehicle_1 = __importDefault(require("../../src/application/BookVehicle"));
const CreateAccount_1 = __importDefault(require("../../src/application/CreateAccount"));
const GetVehicle_1 = __importDefault(require("../../src/application/GetVehicle"));
const RegisterVehicle_1 = __importDefault(require("../../src/application/RegisterVehicle"));
const Account_1 = __importDefault(require("../../src/domain/Account"));
const Vehicle_1 = __importDefault(require("../../src/domain/Vehicle"));
const VehicleReservation_1 = __importDefault(require("../../src/domain/VehicleReservation"));
const AccountMemoryRepository_1 = __importDefault(require("../../src/infra/memory/AccountMemoryRepository"));
const VehicleMemoryRepository_1 = __importDefault(require("../../src/infra/memory/VehicleMemoryRepository"));
const VehicleReservationMemoryRepository_1 = __importDefault(require("../../src/infra/memory/VehicleReservationMemoryRepository"));
test("Must book a vehicle", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const vehicleMemoryRepository = new VehicleMemoryRepository_1.default();
        const accountMemoryRepository = new AccountMemoryRepository_1.default();
        const vehicleReservationMemoryRepository = new VehicleReservationMemoryRepository_1.default();
        // Register a vehicle
        yield (new RegisterVehicle_1.default(vehicleMemoryRepository)).execute(new Vehicle_1.default("AAA1111", "Hyundai Verna 1.6 SX"));
        const [vehicle] = yield (new GetVehicle_1.default(vehicleMemoryRepository)).execute();
        // Create account
        const account_id = yield (new CreateAccount_1.default(accountMemoryRepository)).execute(new Account_1.default("wesley.paulo", "123"));
        // Create Reservation
        const reservation = new VehicleReservation_1.default(vehicle.plate, new Date(), null, account_id);
        const bookedVehicle = new BookVehicle_1.default(vehicleReservationMemoryRepository, vehicleMemoryRepository);
        yield bookedVehicle.execute(reservation);
        const bookedList = yield bookedVehicle.list();
        expect(bookedList).toHaveLength(1);
    });
});
test("Must book couple of vehicles with the same account", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const vehicleMemoryRepository = new VehicleMemoryRepository_1.default();
        const accountMemoryRepository = new AccountMemoryRepository_1.default();
        const vehicleReservationMemoryRepository = new VehicleReservationMemoryRepository_1.default();
        // Register a vehicle
        yield (new RegisterVehicle_1.default(vehicleMemoryRepository)).execute(new Vehicle_1.default("AAA1111", "Hyundai Verna 1.6 SX"));
        yield (new RegisterVehicle_1.default(vehicleMemoryRepository)).execute(new Vehicle_1.default("BBB1111", "Hyundai Verna 1.6 SX"));
        const vehicles = yield (new GetVehicle_1.default(vehicleMemoryRepository)).execute();
        // Create account
        const account_id = yield (new CreateAccount_1.default(accountMemoryRepository)).execute(new Account_1.default("wesley.paulo", "123"));
        // Create Reservations
        const reservation1 = new VehicleReservation_1.default(vehicles[0].plate, new Date(), null, account_id);
        const reservation2 = new VehicleReservation_1.default(vehicles[1].plate, new Date(), null, account_id);
        const bookedVehicle = new BookVehicle_1.default(vehicleReservationMemoryRepository, vehicleMemoryRepository);
        yield bookedVehicle.execute(reservation1);
        const reservationAttempt2 = yield bookedVehicle.execute(reservation2);
        expect(reservationAttempt2).toBeInstanceOf(Error);
        expect(reservationAttempt2 === null || reservationAttempt2 === void 0 ? void 0 : reservationAttempt2.message).toEqual("This account already have an booked vehicle actived");
    });
});
test("Must book a vehicle already booked", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const vehicleMemoryRepository = new VehicleMemoryRepository_1.default();
        const accountMemoryRepository = new AccountMemoryRepository_1.default();
        const vehicleReservationMemoryRepository = new VehicleReservationMemoryRepository_1.default();
        // Register a vehicle
        yield (new RegisterVehicle_1.default(vehicleMemoryRepository)).execute(new Vehicle_1.default("AAA1111", "Hyundai Verna 1.6 SX"));
        const [vehicle] = yield (new GetVehicle_1.default(vehicleMemoryRepository)).execute();
        // Create account
        const account_id1 = yield (new CreateAccount_1.default(accountMemoryRepository)).execute(new Account_1.default("wesley.paulo", "123"));
        const account_id2 = yield (new CreateAccount_1.default(accountMemoryRepository)).execute(new Account_1.default("wp.santos", "123"));
        // Create Reservation
        const reservation1 = new VehicleReservation_1.default(vehicle.plate, new Date(), null, account_id1);
        const bookedVehicle1 = new BookVehicle_1.default(vehicleReservationMemoryRepository, vehicleMemoryRepository);
        yield bookedVehicle1.execute(reservation1);
        const reservation2 = new VehicleReservation_1.default(vehicle.plate, new Date(), null, account_id2);
        const bookedVehicle2 = new BookVehicle_1.default(vehicleReservationMemoryRepository, vehicleMemoryRepository);
        // await expect(() => bookedVehicle2.execute(reservation2)).rejects.toThrowError("Vehicle is arealdy booked");
        const reservationAttempt2 = yield bookedVehicle2.execute(reservation2);
        expect(reservationAttempt2).toBeInstanceOf(Error);
        expect(reservationAttempt2 === null || reservationAttempt2 === void 0 ? void 0 : reservationAttempt2.message).toBe("Vehicle is arealdy booked");
        //expect(reservationAttempt2).toEqual(new Error("Vehicle is arealdy booked"))
    });
});
