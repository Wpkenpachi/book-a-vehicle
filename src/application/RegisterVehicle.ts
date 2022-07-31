import Vehicle from "../domain/Vehicle";
import VehicleRepository from "../domain/repository/VehicleRepostory";

export default class RegisterVehicle {
    constructor(readonly vehicleRepository: VehicleRepository) {}

    async execute(input: Vehicle): Promise<void> {
        await this.vehicleRepository.register(input);
    }
}

