import Vehicle from "../Vehicle";
import VehicleReservation from "../VehicleReservation";

export default interface VehicleReservationRepository {
    book(vehicle: Vehicle): Promise<void>;
    accountHasActivedBookedVehicle(account_id: number): Promise<boolean>;
    vehicleHasActivedBook(plate: string): Promise<boolean>;
    list(): Promise<VehicleReservation[]>;
};