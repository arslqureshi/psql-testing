"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mailgun_js_1 = __importDefault(require("mailgun-js"));
const emailController = {
    sendmail(subject, body, to) {
        const mg = mailgun_js_1.default({ apiKey: process.env.MAILGUN_API_KEY, domain: process.env.DOMAIN });
        const data = {
            from: 'IInstant Shopping <arslq8@gmail.com>',
            to: to,
            subject: subject,
            html: body
        };
        mg.messages().send(data, function (error, body) {
            console.log(body);
        });
    }
};
exports.default = emailController;
//# sourceMappingURL=email.controller.js.map