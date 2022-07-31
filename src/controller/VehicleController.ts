import { NextFunction, Request, Response } from "express";
import VehicleRepository from "../domain/repository/VehicleRepostory";
import VehicleReservationRepository from "../domain/repository/VehicleReservationRepostory";
import VehicleDatabaseRepository from "../infra/database/VehicleDatabaseRepository";
import VehicleReservation from "../domain/repository/VehicleReservation";
import VehicleReservationDatabaseRepository from "../infra/database/VehicleReservationDatabaseRepository";
import Connection from "../infra/database/Connection";
import BookVehicle from "../application/BookVehicle";
import HttpException from "../infra/http/HttpException";
import GetVehicle from "../application/GetVehicle";
import ReturnVehicle from "../application/ReturnVehicle";
import GetAuthenticatedAccount from "../application/GetAuthenticatedAccount";
import AccountDatabaseRepostiry from "../infra/database/AccountDatabaseRepository";
import AccountRepository from "../domain/repository/AccountRepository";

export default class VehicleController {
    private vehicleRepository: VehicleRepository;
    private vehicleReservationRepository: VehicleReservationRepository;
    private accountRepository: AccountRepository;
    constructor(private readonly connection: Connection) {
            this.vehicleRepository = new VehicleDatabaseRepository(connection);
            this.vehicleReservationRepository = new VehicleReservationDatabaseRepository(connection);
            this.accountRepository = new AccountDatabaseRepostiry(connection);
    }

    async list(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const useCase = new GetVehicle(this.vehicleRepository);
            const vehicles = await useCase.execute();
            if (vehicles instanceof(Error)) next(new HttpException(404, vehicles.message));
            response.json(vehicles);
        } catch (error) {
            next(error);
        }
    }

    async bookVehicle(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const { plate } = request.body;
            const useCaseGetAuthenticated = new GetAuthenticatedAccount(this.accountRepository);
            const accountData = await useCaseGetAuthenticated.execute(request.header('authorization') as string);
            if (accountData instanceof(Error)) next(new HttpException(401, accountData.message));
            const { account_id } = accountData as { account_id: number };
            
            const useCase = new BookVehicle(this.vehicleReservationRepository, this.vehicleRepository);
            const done = await useCase.execute(new VehicleReservation(plate, new Date(), null, account_id));
    
            if (done instanceof(Error)) next(new HttpException(400, done.message));
            response.end();
        } catch (error) {
            next(error)
        }
    }

    async returnVehicle(request: Request, response: Response, next: NextFunction): Promise<any> {
        try {
            const useCaseGetAuthenticated = new GetAuthenticatedAccount(this.accountRepository);
            const accountData = await useCaseGetAuthenticated.execute(request.headers.authorization as string);
            if (accountData instanceof(Error)) next(new HttpException(401, accountData.message));
            const { account_id } = accountData as { account_id: number };
    
            const useCase = new ReturnVehicle(this.vehicleReservationRepository, this.vehicleRepository);
            const done = await useCase.execute(account_id);
            if (done instanceof(Error)) next(new HttpException(400, done.message));
            response.end();
        } catch (error) {
            next(error);
        }
    }
}