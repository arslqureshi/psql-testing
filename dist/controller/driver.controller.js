"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../src/db"));
const DriverController = {
    getDriverRequests(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { lat, lng } = req.params;
                var data = [];
                const query = yield db_1.default.query(`select * from driver_request`);
                yield query.rows.forEach(request => {
                    var ky = 40000 / 360;
                    var kx = Math.cos(Math.PI * request.lat / 180.0) * ky;
                    var dx = Math.abs(parseFloat(request.lng) - parseFloat(lng)) * kx;
                    var dy = Math.abs(parseFloat(request.lat) - parseFloat(lat)) * ky;
                    if (Math.sqrt(dx * dx + dy * dy) <= 5) {
                        data.push(request);
                    }
                });
                res.send(data);
            }
            catch (error) {
                console.log(error.message);
            }
        });
    }
};
exports.default = DriverController;
//# sourceMappingURL=driver.controller.js.map