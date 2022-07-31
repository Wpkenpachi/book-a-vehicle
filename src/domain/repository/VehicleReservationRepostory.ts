import VehicleReservation from "./VehicleReservation";

export default interface VehicleReservationRepository {
    book(vehicleReservation: VehicleReservation): Promise<void>;
    returnVehicle(account_id: number): Promise<void>;
    accountHasActivedBookedVehicle(account_id: number): Promise<boolean>;
    vehicleHasActivedBook(plate: string): Promise<boolean>;
    list(): Promise<VehicleReservation[]>;
};