import VehicleRepository from "../domain/repository/VehicleRepostory";
import VehicleReservation from "../domain/repository/VehicleReservation";
import VehicleReservationRepository from "../domain/repository/VehicleReservationRepostory";

export default class ReturnVehicle {
    constructor(readonly vehicleReservationRepository: VehicleReservationRepository, readonly vehicleRepository: VehicleRepository){}

    async list(): Promise<VehicleReservation[]> {
        return await this.vehicleReservationRepository.list();
    }

    async execute(account_id: number): Promise<void|Error> {
        const accountHasActivedBook = await this.vehicleReservationRepository.accountHasActivedBookedVehicle(account_id)
        if (!accountHasActivedBook) return new Error("This account has not booked vehicle actived");
        await this.vehicleReservationRepository.returnVehicle(account_id);
    }
}