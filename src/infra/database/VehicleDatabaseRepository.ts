import Vehicle from "../../domain/Vehicle";
import VehicleRepository from "../../domain/repository/VehicleRepostory";
import Connection from "./Connection";

export default class VehicleDatabaseRepository implements VehicleRepository {
    constructor(readonly connection: Connection) {
    }

    async get(plate: string): Promise<Vehicle|Error> {
        try {
            const [raw] = await this.connection.query("select * from vehicles where plate = $1", [plate]);
            return raw;
        } catch (error) {
            return error as unknown as Error;
        }
    }

    async register(vehicle: Vehicle): Promise<void|Error> {
        try {
            const [row] = await this.connection.query("insert into vehicles(model, plate) values($1, $2) returning *", [vehicle.model, vehicle.plate]);
        } catch (error) {
            return error as unknown as Error;
        }
    }

    async list(): Promise<any[]|Error> {
        try {
            const raw = await this.connection.query(`
                    select
                    vehicles.model,
                    vehicles.plate,
                    CASE
                        WHEN (
                                select count (*) from booked_vehicles
                                where
                                    vehicles.plate = booked_vehicles.plate and
                                    booked_vehicles.returned_at is null
                            ) > 0 THEN 1
                        ELSE 0
                    END 
                    AS is_available
                from vehicles;
            `, []);
            return raw;
        } catch (error) {
            return error as unknown as Error;
        }
    }
}