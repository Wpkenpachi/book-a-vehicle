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
const GetVehicle_1 = __importDefault(require("../../src/application/GetVehicle"));
const RegisterVehicle_1 = __importDefault(require("../../src/application/RegisterVehicle"));
const Vehicle_1 = __importDefault(require("../../src/domain/Vehicle"));
const VehicleMemoryRepository_1 = __importDefault(require("../../src/infra/memory/VehicleMemoryRepository"));
test("Must list vehicles", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const vehicleMemoryRepository = new VehicleMemoryRepository_1.default();
        const registerVehicle = new RegisterVehicle_1.default(vehicleMemoryRepository);
        yield registerVehicle.execute(new Vehicle_1.default("AAA9999", "Hyundai Verna 1.6 SX"));
        yield registerVehicle.execute(new Vehicle_1.default("BBB9999", "Hyundai Verna 1.6 SX"));
        const getVehicle = new GetVehicle_1.default(vehicleMemoryRepository);
        expect(yield getVehicle.execute()).toHaveLength(2);
    });
});
