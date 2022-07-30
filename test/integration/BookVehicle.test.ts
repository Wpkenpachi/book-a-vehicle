import BookVehicle from "../../src/application/BookVehicle";
import CreateAccount from "../../src/application/CreateAccount";
import GetVehicle from "../../src/application/GetVehicle";
import RegisterVehicle from "../../src/application/RegisterVehicle";
import Account from "../../src/domain/Account";
import Vehicle from "../../src/domain/Vehicle";
import VehicleReservation from "../../src/domain/VehicleReservation";
import AccountMemoryRepository from "../../src/infra/memory/AccountMemoryRepository";
import VehicleMemoryRepository from "../../src/infra/memory/VehicleMemoryRepository";
import VehicleReservationMemoryRepository from "../../src/infra/memory/VehicleReservationMemoryRepository";

test("Must book a vehicle", async function(){
    const vehicleMemoryRepository = new VehicleMemoryRepository();
    const accountMemoryRepository = new AccountMemoryRepository();
    const vehicleReservationMemoryRepository = new VehicleReservationMemoryRepository();
    // Register a vehicle
    await (new RegisterVehicle(vehicleMemoryRepository)).execute(new Vehicle("AAA1111", "Hyundai Verna 1.6 SX"));
    const [vehicle] = await (new GetVehicle(vehicleMemoryRepository)).execute();
    // Create account
    const account_id = await (new CreateAccount(accountMemoryRepository)).execute(new Account("wesley.paulo", "123"));
    
    // Create Reservation
    const reservation = new VehicleReservation(vehicle.plate, new Date(), null, account_id);
    const bookedVehicle = new BookVehicle(vehicleReservationMemoryRepository, vehicleMemoryRepository);
    await bookedVehicle.execute(reservation, );
    const bookedList = await bookedVehicle.list();
    expect(bookedList).toHaveLength(1);
});

test("Must book couple of vehicles with the same account", async function(){
    const vehicleMemoryRepository = new VehicleMemoryRepository();
    const accountMemoryRepository = new AccountMemoryRepository();
    const vehicleReservationMemoryRepository = new VehicleReservationMemoryRepository();
    // Register a vehicle
    await (new RegisterVehicle(vehicleMemoryRepository)).execute(new Vehicle("AAA1111", "Hyundai Verna 1.6 SX"));
    await (new RegisterVehicle(vehicleMemoryRepository)).execute(new Vehicle("BBB1111", "Hyundai Verna 1.6 SX"));
    const vehicles = await (new GetVehicle(vehicleMemoryRepository)).execute();
    // Create account
    const account_id = await (new CreateAccount(accountMemoryRepository)).execute(new Account("wesley.paulo", "123"));
    
    // Create Reservations
    const reservation1 = new VehicleReservation(vehicles[0].plate, new Date(), null, account_id);
    const reservation2 = new VehicleReservation(vehicles[1].plate, new Date(), null, account_id);
    const bookedVehicle = new BookVehicle(vehicleReservationMemoryRepository, vehicleMemoryRepository);
    await bookedVehicle.execute(reservation1);
    const reservationAttempt2 = await bookedVehicle.execute(reservation2);
    expect(reservationAttempt2).toBeInstanceOf(Error);
    expect(reservationAttempt2?.message).toEqual("This account already have an booked vehicle actived");
});

test("Must book a vehicle already booked", async function(){
    const vehicleMemoryRepository = new VehicleMemoryRepository();
    const accountMemoryRepository = new AccountMemoryRepository();
    const vehicleReservationMemoryRepository = new VehicleReservationMemoryRepository();
    // Register a vehicle
    await (new RegisterVehicle(vehicleMemoryRepository)).execute(new Vehicle("AAA1111", "Hyundai Verna 1.6 SX"));
    const [vehicle] = await (new GetVehicle(vehicleMemoryRepository)).execute();
    // Create account
    const account_id1 = await (new CreateAccount(accountMemoryRepository)).execute(new Account("wesley.paulo", "123"));
    const account_id2 = await (new CreateAccount(accountMemoryRepository)).execute(new Account("wp.santos", "123"));

    // Create Reservation
    const reservation1 = new VehicleReservation(vehicle.plate, new Date(), null, account_id1);
    const bookedVehicle1 = new BookVehicle(vehicleReservationMemoryRepository, vehicleMemoryRepository);
    await bookedVehicle1.execute(reservation1);

    const reservation2 = new VehicleReservation(vehicle.plate, new Date(), null, account_id2);
    const bookedVehicle2 = new BookVehicle(vehicleReservationMemoryRepository, vehicleMemoryRepository);
    // await expect(() => bookedVehicle2.execute(reservation2)).rejects.toThrowError("Vehicle is arealdy booked");
    const reservationAttempt2 = await bookedVehicle2.execute(reservation2);
    expect(reservationAttempt2).toBeInstanceOf(Error);
    expect(reservationAttempt2?.message).toBe("Vehicle is arealdy booked");
    //expect(reservationAttempt2).toEqual(new Error("Vehicle is arealdy booked"))
});