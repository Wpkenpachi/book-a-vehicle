export default class VehicleReservation {
    constructor(
        readonly plate: string,
        readonly reserved_at: Date = new Date(),
        readonly release_at: Date | null = null,
        readonly reserved: boolean = true
    ){

    }
}