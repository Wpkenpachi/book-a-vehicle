import VehicleRepository from "../domain/VehicleRepostory";

export default class GetVehicle {
    constructor(readonly vehicleRepository: VehicleRepository) {}

    async execute(): Promise<Output[]> {
        const vehicles = await this.vehicleRepository.list();
        return vehicles.map(({ plate, is_available }) => ({ plate, is_available }));
    }
}

type Output = {
    plate: string,
    is_available: number
}