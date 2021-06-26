import Express from 'express';
import DriverController from '../controller/driver.controller';


let driverRouter = Express.Router();

driverRouter.get('/getDriverRequests/:lat/:lng', DriverController.getDriverRequests);

export default driverRouter;