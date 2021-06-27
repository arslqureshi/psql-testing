import Express from 'express';
import DriverController from '../controller/driver.controller';


let driverRouter = Express.Router();

driverRouter.get('/getDriverRequests/:lat/:lng', DriverController.getDriverRequests);
driverRouter.get('/getRequestLocations/:id', DriverController.getRequestLocations);

export default driverRouter;