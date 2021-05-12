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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const email_controller_1 = __importDefault(require("./email.controller"));
const stripe_controller_1 = __importDefault(require("./stripe.controller"));
const UserController = {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userData = {};
            userData = req.body;
            const check = yield db_1.default.query("SELECT * FROM person WHERE email=$1;", [req.body.email]);
            if (check.rows.length) {
                res.status(400).send('Email Already Exists');
            }
            else {
                const salt = yield bcryptjs_1.default.genSalt(10);
                userData.password = yield bcryptjs_1.default.hash(userData.password, salt);
                const customer = yield stripe_controller_1.default.createCustomer({ email: userData.email });
                const result = yield db_1.default.query('INSERT INTO person (email, password, role, date, active, userName, phoneNumber, stripeCustomerId) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [userData.email, userData.password, userData.role, new Date(), true, userData.userName, userData.phoneNumber, customer.id]);
                const token = jsonwebtoken_1.default.sign({ _id: result.rows[0].id }, process.env.TOKEN_SECRET);
                let data = result.rows[0];
                data.token = token;
                console.log(data);
                res.send(data);
            }
        });
    },
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { email, password } = req.body;
            const userCheck = yield db_1.default.query("SELECT * FROM person WHERE email=$1;", [req.body.email]);
            if (userCheck.rows.length) {
                const passwordCheck = yield bcryptjs_1.default.compare(password, userCheck.rows[0].password);
                if (passwordCheck) {
                    const token = yield jsonwebtoken_1.default.sign({ _id: userCheck.rows[0].id }, process.env.TOKEN_SECRET);
                    let data = userCheck.rows[0];
                    data.token = token;
                    console.log(data);
                    res.send(data);
                }
                else {
                    res.status(400).send("Incorrect Password");
                }
            }
            else {
                res.status(404).send("User not found");
            }
        });
    },
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield db_1.default.query("SELECT * FROM person;");
            res.send(data.rows);
        });
    },
    resetPasswordRequest(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = yield req.body;
            const result = yield db_1.default.query('SELECT * FROM person WHERE email=$1', [email]);
            if (result.rows.length) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                const token = yield bcryptjs_1.default.hash(result.rows[0].id.toString(), salt);
                const clientUrl = "http://localhost:4200";
                email_controller_1.default.sendmail("Reset Password", '<h4><b>Reset Password</b></h4>' +
                    '<p>To reset your password, complete this form:</p>' +
                    '<a href=' + clientUrl + 'reset/' + result.rows[0].id + '/' + token + '">' + clientUrl + 'reset/' + result.rows[0].id + '/' + token + '</a>' +
                    '<br><br>' +
                    '<p>--Team</p>', result.rows[0].email);
                res.send("Email sent");
            }
            else {
                res.status(404).send("Email not found");
            }
        });
    },
    resetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { id, token, password } = req.body;
            const tokenCompareResult = yield bcryptjs_1.default.compare(id, token);
            if (tokenCompareResult) {
                const salt = yield bcryptjs_1.default.genSalt(10);
                password = yield bcryptjs_1.default.hash(password, salt);
                const query = yield db_1.default.query('UPDATE person SET password=$1 WHERE id=$2 returning *', [password, id]);
                res.send("Password Updated");
            }
            else {
                res.status(403).send("Invalid Token");
            }
        });
    },
    checkUsername(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { userName } = req.body;
            const check = yield db_1.default.query("SELECT userName FROM person WHERE userName=$1;", [userName]);
            if (check.rows.length) {
                res.status(400).send("Username not available");
            }
            else {
                res.send("Username is available");
            }
        });
    },
    createCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cardData = req.body;
                console.log(cardData);
                const card = yield stripe_controller_1.default.createCard(cardData.stripeCustomerId, cardData.source);
                console.log(card);
                const result = yield db_1.default.query('INSERT INTO credit_card (lastFourDigits, expiryMonth, expiryYear, ownerName, brand, customerId, personId, stripeCardId) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [card.last4, card.exp_month, card.exp_year, card.name, card.brand, cardData.stripeCustomerId, cardData.id, card.id]);
                res.send(result.rows[0]);
            }
            catch (e) {
                console.log(e);
            }
        });
    },
    getCards(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.personId;
                console.log(id);
                const query = yield db_1.default.query('SELECT * FROM credit_card WHERE personId = $1', [id]);
                res.send(query.rows);
            }
            catch (e) {
                console.log(e);
            }
        });
    },
    deleteCard(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const customerId = req.params.customerId;
                const cardId = req.params.cardId;
                console.log('ids', customerId, cardId);
                yield stripe_controller_1.default.deleteCard(customerId, cardId);
                const query = yield db_1.default.query('DELETE FROM credit_card WHERE stripecardid=$1', [cardId]);
                res.send(query);
            }
            catch (e) {
                console.log(e);
            }
        });
    },
    Pay(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const paymentData = req.body;
            const intent = yield stripe_controller_1.default.createPaymentIntent(paymentData.sourceId, paymentData.price);
            res.send(intent);
        });
    }
};
exports.default = UserController;
//# sourceMappingURL=user.controller.js.map