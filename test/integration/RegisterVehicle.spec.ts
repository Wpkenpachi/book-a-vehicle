import RegisterVehicle from "../../src/application/RegisterVehicle";
import Vehicle from "../../src/domain/Vehicle";
import VehicleMemoryRepository from "../../src/infra/memory/VehicleMemoryRepository";

test("Must register a vehicle", async function() {
    const vehicleMemoryRepository = new VehicleMemoryRepository();
    const registerVehicle = new RegisterVehicle(vehicleMemoryRepository);
    await registerVehicle.execute(new Vehicle("AAA9999"));
    expect(await vehicleMemoryRepository.list()).toHaveLength(1);
});