import Vehicle from "../src/Vehicle";

test("Must create a vehicle", function() {
    const vehicle = new Vehicle("ABC1234");
    expect(vehicle).toBeTruthy();
});