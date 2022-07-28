import VehicleRepository from "../domain/repositories/VehicleRepostory"

export default class GetVehicle {
    constructor(readonly vehicleRepository: VehicleRepository) {}

    async execute(): Promise<Output[]> {
        const vehicles = await this.vehicleRepository.list();
        return vehicles.map(({ plate }) => ({ plate }));
    }
}

type Output = {
    plate: string
}