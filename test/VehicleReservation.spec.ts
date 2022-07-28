import VehicleReservation from "../src/VehicleReservation";

test("Must create a Vehicle Reservation", function() {
    const vehicleReservation = new VehicleReservation("ABC1234");
    expect(vehicleReservation).toBeTruthy();
});