"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const stripe_controller_1 = __importDefault(require("../controller/stripe.controller"));
let StripeRouter = express_1.default.Router();
StripeRouter.get('/createCustomer', stripe_controller_1.default.createCustomer);
exports.default = StripeRouter;
//# sourceMappingURL=stripe.route.js.map