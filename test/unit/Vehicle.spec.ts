import Vehicle from "../../src/domain/Vehicle";

test("Must create a vehicle", function() {
    const vehicle = new Vehicle("ABC1234");
    expect(vehicle).toBeTruthy();
});