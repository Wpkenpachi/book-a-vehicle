import Account from "../domain/Account";
import VehicleReservation from "../domain/VehicleReservation";
import VehicleReservationRepository from "../domain/VehicleReservationRepostory";

export default class BookVehicle {
    constructor(readonly vehicleReservationRepository: VehicleReservationRepository){}

    async list(): Promise<VehicleReservation[]> {
        return await this.vehicleReservationRepository.list();
    }

    async execute(vehicleReservation: VehicleReservation): Promise<void> {
        const accountAlreadyHasActivedBook = await this.vehicleReservationRepository.accountHasActivedBookedVehicle(vehicleReservation.account_id)
        if (accountAlreadyHasActivedBook)
            throw new Error("This account already have an booked vehicle actived");
        const vehicleAlreadyBooked = await this.vehicleReservationRepository.vehicleHasActivedBook(vehicleReservation.plate);
        if (vehicleAlreadyBooked)
            throw new Error("Vehicle is arealdy booked");
        this.vehicleReservationRepository.book(vehicleReservation);
    }
}