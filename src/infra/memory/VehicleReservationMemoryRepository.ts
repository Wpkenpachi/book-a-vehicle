import Account from "../../domain/Account";
import VehicleReservation from "../../domain/VehicleReservation";
import VehicleReservationRepository from "../../domain/VehicleReservationRepostory";

export default class VehicleReservationMemoryRepository implements VehicleReservationRepository {
    bookedVehicles: VehicleReservation[];

    constructor() {
        this.bookedVehicles = [];
    }

    async returnVehicle(account_id: number): Promise<void> {
        this.bookedVehicles = this.bookedVehicles.map<VehicleReservation>((item): VehicleReservation => {
            if(item.account_id !== account_id) return item;
            return new VehicleReservation(item.plate, item.reserved_at, new Date(), account_id);
        });
        
    }
    
    async vehicleHasActivedBook(plate: string): Promise<boolean> {
        const bookExists = this.bookedVehicles.find((bookedVehicles) => bookedVehicles.plate === plate);
        return !!bookExists;
    }

    async accountHasActivedBookedVehicle(account_id: number): Promise<boolean> {
        const registerExists = this.bookedVehicles.find((bookedVehicles) => bookedVehicles.account_id === account_id && bookedVehicles.isReserved());
        return !!registerExists;
    }   

    async book(vehicleReservation: VehicleReservation): Promise<void> {
        this.bookedVehicles.push(vehicleReservation);
    }

    async list(): Promise<VehicleReservation[]> {
        return this.bookedVehicles;
    }
}