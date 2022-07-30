import Vehicle from "./Vehicle";

export default interface VehicleRepository {
    register(vehicle: Vehicle): Promise<void>;
    get(plate: string): Promise<Vehicle|undefined>;
    list(): Promise<{ plate:string, is_available: number }[]>;
};