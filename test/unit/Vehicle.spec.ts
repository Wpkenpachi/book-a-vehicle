import Vehicle from "../../src/domain/Vehicle";

test("Must create a vehicle", function() {
    const vehicle = new Vehicle("ABC1234", "Hyundai Verna 1.6 SX");
    expect(vehicle).toBeTruthy();
});