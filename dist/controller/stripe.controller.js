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
Object.defineProperty(exports, "__esModule", { value: true });
const stripe = require('stripe')('sk_test_51IoR81L6orHLq7kW3qZ0inGnHFU6nyDbK1ZTRnY3oyuTgz7ybRJVxTihnrg1tp0j5r9VoPBqbOjKGFMPXQnR3iGu00yCsD8jQn');
const StripeController = {
    createCustomer(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const customer = yield stripe.customers.create({
                email: req.body.email
            });
            console.log(customer.id);
            res.send(customer.id);
        });
    }
};
exports.default = StripeController;
//# sourceMappingURL=stripe.controller.js.map