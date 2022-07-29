import VehicleReservationRepository from "../../domain/repositories/VehicleReservationRepostory";
import VehicleReservation from "../../domain/VehicleReservation";

export default class VehicleReservationMemoryRepository implements VehicleReservationRepository {
    bookedVehicles: VehicleReservation[];

    constructor() {
        this.bookedVehicles = [];
    }
    
    async vehicleHasActivedBook(plate: string): Promise<boolean> {
        const bookExists = this.bookedVehicles.find((bookedVehicles) => bookedVehicles.plate === plate);
        return !!bookExists;
    }

    async accountHasActivedBookedVehicle(account_id: number): Promise<boolean> {
        const registerExists = this.bookedVehicles.find((bookedVehicles) => bookedVehicles.account_id === account_id);
        return !!registerExists;
    }   

    async book(vehicle: VehicleReservation): Promise<void> {
        this.bookedVehicles.push(vehicle);
    }

    async list(): Promise<VehicleReservation[]> {
        return this.bookedVehicles;
    }
}