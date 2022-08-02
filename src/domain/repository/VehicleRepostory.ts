import Vehicle from "./../Vehicle";

export default interface VehicleRepository {
    register(vehicle: Vehicle): Promise<void|Error>;
    get(plate: string): Promise<Vehicle|undefined|Error>;
    list(): Promise<{ model: string, plate:string, is_available: number }[]|Error>;
};