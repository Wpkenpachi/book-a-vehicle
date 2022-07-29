import GetVehicle from "../../src/application/GetVehicle";
import RegisterVehicle from "../../src/application/RegisterVehicle";
import Vehicle from "../../src/domain/Vehicle";
import VehicleMemoryRepository from "../../src/infra/memory/VehicleMemoryRepository";

test("Must list vehicles", async function(){
    const vehicleMemoryRepository = new VehicleMemoryRepository();
    const registerVehicle = new RegisterVehicle(vehicleMemoryRepository);
    await registerVehicle.execute(new Vehicle("AAA9999"));
    await registerVehicle.execute(new Vehicle("BBB9999"));
    const getVehicle = new GetVehicle(vehicleMemoryRepository);
    expect(await getVehicle.execute()).toHaveLength(2);
});