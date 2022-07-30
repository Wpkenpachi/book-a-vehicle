import Vehicle from "../../domain/Vehicle";
import VehicleRepository from "../../domain/VehicleRepostory";
import Connection from "./Connection";
import PgPromiseConnectionAdapter from "./PgPromiseConnectionAdapter";

export default class VehicleDatabaseRepository implements VehicleRepository {
    constructor(readonly connection: Connection) {
    }

    async get(plate: string): Promise<Vehicle> {
        try {
            const [raw] = await this.connection.query("select * from vehicles where plate = $1", [plate]);
            return raw;
        } catch (error) {
            throw error;
        }
    }

    async register(vehicle: Vehicle): Promise<void> {
        try {
            const [row] = await this.connection.query("insert into vehicles(model, plate) values($1, $2) returning *", [vehicle.model, vehicle.plate]);
        } catch (error) {
            throw error;
        }
    }

    async list(): Promise<any[]> {
        try {
            const raw = await this.connection.query(`
                    select
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
            throw error;
        }
    }
}