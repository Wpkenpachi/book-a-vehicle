import Account from "./Account";
import Vehicle from "./Vehicle";
import VehicleReservation from "./VehicleReservation";

export default interface VehicleReservationRepository {
    book(vehicleReservation: VehicleReservation): Promise<void>;
    returnVehicle(account_id: number, plate: string): Promise<void>;
    accountHasActivedBookedVehicle(account_id: number): Promise<boolean>;
    vehicleHasActivedBook(plate: string): Promise<boolean>;
    list(): Promise<VehicleReservation[]>;
};