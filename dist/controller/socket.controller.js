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
const SocketController = {
    addMessage(io, data, to) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = yield db_1.default.query('insert into message(content, seen,delivered,date) values($1,$2,$3,$4) returning *', [data.content, data.seen, data.delivered, new Date()]);
            const query1 = yield db_1.default.query('insert into messages(conversationId, messageFrom,message) values($1,$2,$3) returning *', [data.conversationId, data.messageFrom, query.rows[0].id]);
            const query2 = yield db_1.default.query('update conversations SET lastMessageDate = $1 where id = $2', [new Date(), data.conversationId]);
            console.log(query.rows[0]);
            if (to != -1) {
                io.to(to).emit('newMessage', query.rows[0]);
            }
        });
    },
    notifyDrivers(io, drivers, request) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(request);
            const locations = request.locations;
            const buyerAddress = request.buyerAddress;
            const query = yield db_1.default.query(`insert into driver_request(address, city, lat, lng, status) 
            values($1,$2,$3,$4,$5) RETURNING *`, [buyerAddress.address, buyerAddress.city, buyerAddress.lat, buyerAddress.lng, 'pending']);
            locations.forEach((location) => __awaiter(this, void 0, void 0, function* () {
                const query1 = yield db_1.default.query(`insert into request_locations(lat, lng, requestId)
              values($1, $2, $3)`, [location.lat, location.lng, query.rows[0].id]);
            }));
            yield drivers.forEach(driver => {
                var ky = 40000 / 360;
                var kx = Math.cos(Math.PI * buyerAddress.lat / 180.0) * ky;
                var dx = Math.abs(buyerAddress.lng - parseFloat(driver.lng)) * kx;
                var dy = Math.abs(buyerAddress.lat - parseFloat(driver.lat)) * ky;
                if (Math.sqrt(dx * dx + dy * dy) <= 5) {
                    io.to(driver.socketId).emit('requestDriver', query.rows[0]);
                }
            });
        });
    }
};
exports.default = SocketController;
//# sourceMappingURL=socket.controller.js.map