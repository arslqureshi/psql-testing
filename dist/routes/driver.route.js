"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const driver_controller_1 = __importDefault(require("../controller/driver.controller"));
let driverRouter = express_1.default.Router();
driverRouter.get('/getDriverRequests/:lat/:lng', driver_controller_1.default.getDriverRequests);
driverRouter.get('/getRequestLocations/:id', driver_controller_1.default.getRequestLocations);
exports.default = driverRouter;
//# sourceMappingURL=driver.route.js.map