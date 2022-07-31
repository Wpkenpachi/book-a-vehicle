import VehicleRepository from "../domain/repository/VehicleRepostory";
import VehicleReservation from "../domain/repository/VehicleReservation";
import VehicleReservationRepository from "../domain/repository/VehicleReservationRepostory";

export default class BookVehicle {
    constructor(readonly vehicleReservationRepository: VehicleReservationRepository, readonly vehicleRepository: VehicleRepository){}

    async list(): Promise<VehicleReservation[]> {
        return await this.vehicleReservationRepository.list();
    }

    async execute(vehicleReservation: VehicleReservation): Promise<void|Error> {
        const vehicleExists = await this.vehicleRepository.get(vehicleReservation.plate);
        if (!vehicleExists) return new Error("Vehicle does not exist in database");
        const accountAlreadyHasActivedBook = await this.vehicleReservationRepository.accountHasActivedBookedVehicle(vehicleReservation.account_id)
        if (accountAlreadyHasActivedBook) return new Error("This account already have an booked vehicle actived");
        const vehicleAlreadyBooked = await this.vehicleReservationRepository.vehicleHasActivedBook(vehicleReservation.plate);
        if (vehicleAlreadyBooked) return new Error("Vehicle is arealdy booked");
        await this.vehicleReservationRepository.book(vehicleReservation);
    }
}