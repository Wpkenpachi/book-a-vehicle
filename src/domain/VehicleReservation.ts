export default class VehicleReservation {
    constructor(
        readonly plate: string,
        readonly reserved_at: Date = new Date(),
        readonly returned_at: Date | null = null
    ){
        this.isValidReservation();
    }

    private isValidReservation(): void {
        if (!this.reserved_at || !this.returned_at) return;
        if (this.reserved_at.getTime() < this.returned_at.getTime()) return;
        throw new Error("Invalid Reservation");
    }

    public isReserved(): boolean {
        return !this.returned_at;
    }
}