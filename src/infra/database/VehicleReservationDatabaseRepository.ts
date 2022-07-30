import Vehicle from "../../domain/Vehicle";
import VehicleReservation from "../../domain/VehicleReservation";
import VehicleReservationRepository from "../../domain/VehicleReservationRepostory";
import Connection from "./Connection";
import PgPromiseConnectionAdapter from "./PgPromiseConnectionAdapter";

export default class VehicleReservationDatabaseRepository implements VehicleReservationRepository {
    constructor(readonly connection: Connection) {
    }

    async book(vehicleReservation: VehicleReservation): Promise<void> {
        const { account_id, plate, reserved_at, returned_at } = vehicleReservation;
        const solved_returnd_at = returned_at ? returned_at : null;
        try {
            if (await this.accountHasActivedBookedVehicle(account_id)) throw new Error("This account already have an booked vehicle actived");
            if (await this.vehicleHasActivedBook(plate)) throw new Error("Vehicle is arealdy booked");
            const [raw] = await this.connection.query("insert into booked_vehicles(account_id, plate, reserved_at, returned_at) values($1, $2, $3, $4)", [account_id, plate, reserved_at, solved_returnd_at]);
        } catch (error) {
            throw error;
        }
    }
    
    async returnVehicle(account_id: number): Promise<void> {
        try {
            if (!await this.accountHasActivedBookedVehicle(account_id)) throw new Error("Has no booked vehicles in this account");
            const [raw] = await this.connection.query("update booked_vehicles set returned_at = $1 where account_id = $2 and returned_at is null", [new Date(), account_id]);
        } catch (error) {
            throw error;
        }
    }

    async accountHasActivedBookedVehicle(account_id: number): Promise<boolean> {
        try {
            const [raw] = await this.connection.query("select * from booked_vehicles where account_id = $1 and returned_at is null", [account_id]);
            return !!raw;
        } catch (error) {
            throw error;
        }
    }

    async vehicleHasActivedBook(plate: string): Promise<boolean> {
        try {
            const [raw] = await this.connection.query("select * from booked_vehicles where plate = $1 and returned_at is null", [plate]);
            return !!raw;
        } catch (error) {
            throw error;
        }
    }

    async list(): Promise<VehicleReservation[]> {
        const raw = await this.connection.query("select * from vehicles", []);
        return raw as VehicleReservation[];
    }

}