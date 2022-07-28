import VehicleReservation from "../../src/domain/VehicleReservation";

test("Must create a Vehicle Reservation", function() {
    const vehicleReservation = new VehicleReservation("ABC1234", new Date("2022-07-28T10:00:00"));
    expect(vehicleReservation).toBeTruthy();
});

test("Must create an invalid Vehicle Reservation", function() {
    expect(() => (new VehicleReservation("ABC1234", new Date("2022-07-28T12:00:00"), new Date("2022-07-28T10:00:00")))).toThrow(new Error("Invalid Reservation"));
});

test("Must create a Vehicle Reservation released", function() {
    const vehicleReservation = new VehicleReservation("ABC1234", new Date("2022-07-28T10:00:00"), new Date("2022-07-28T12:00:00"));
    expect(vehicleReservation.isReserved()).toBeFalsy();
});