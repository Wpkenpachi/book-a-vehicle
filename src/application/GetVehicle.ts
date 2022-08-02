import VehicleRepository from "../domain/repository/VehicleRepostory";

export default class GetVehicle {
    constructor(readonly vehicleRepository: VehicleRepository) {}

    async execute(): Promise<Output[]|Error> {
        const vehicles = await this.vehicleRepository.list();
        if (vehicles instanceof(Error)) return vehicles;
        return vehicles.map(({ model, plate, is_available }) => ({ model, plate, is_available }));
    }
}

type Output = {
    model: string,
    plate: string,
    is_available: number
}