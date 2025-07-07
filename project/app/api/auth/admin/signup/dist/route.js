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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.POST = exports.runtime = void 0;
exports.runtime = "nodejs";
var server_1 = require("next/server");
var mailto_1 = require("./mailto");
var user_1 = require("@/lib/models/user");
var db_1 = require("@/lib/db");
var bcryptjs_1 = require("bcryptjs");
var uuid_1 = require("uuid");
var ADMIN_TOKEN = process.env.ADMIN_SESSION_TOKEN;
function generateOTP(length) {
    if (length === void 0) { length = 8; }
    var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    var otp = "";
    for (var i = 0; i < length; i++) {
        otp += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return otp;
}
function POST(request) {
    return __awaiter(this, void 0, void 0, function () {
        var token, body, orgName, location, contactNo, email, logo, existingUser, otp, hashedOtp, newUser, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 7, , 8]);
                    token = request.headers.get("authorization");
                    if (!token || token !== "Bearer " + ADMIN_TOKEN) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "Unauthorized" }, { status: 401 })];
                    }
                    return [4 /*yield*/, request.json()];
                case 1:
                    body = _a.sent();
                    orgName = body.orgName, location = body.location, contactNo = body.contactNo, email = body.email, logo = body.logo;
                    // Validation
                    if (!orgName || !email || !location || !contactNo || !logo) {
                        return [2 /*return*/, server_1.NextResponse.json({
                                heading: "Missing Required Fields",
                                message: "Some required information is missing. Make sure all fields are filled."
                            }, { status: 400 })];
                    }
                    return [4 /*yield*/, db_1["default"]()];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, user_1["default"].findOne({
                            $or: [
                                { email: email },
                                { $and: [{ orgName: orgName }, { location: location }] },
                            ]
                        })];
                case 3:
                    existingUser = _a.sent();
                    if (existingUser) {
                        console.log("User Exisitng");
                        return [2 /*return*/, server_1.NextResponse.json({
                                heading: "Conflict",
                                message: "A user with this email or organization/location already exists."
                            }, { status: 409 })];
                    }
                    otp = generateOTP();
                    return [4 /*yield*/, bcryptjs_1["default"].hash(otp, 10)];
                case 4:
                    hashedOtp = _a.sent();
                    newUser = new user_1["default"]({
                        id: uuid_1.v4(),
                        orgName: orgName,
                        location: location,
                        contactNo: contactNo,
                        email: email,
                        password: hashedOtp,
                        flagFirstLogin: true,
                        logo: logo
                    });
                    return [4 /*yield*/, newUser.save()];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, mailto_1.sendOTPEmail({ to: email, otp: otp })];
                case 6:
                    _a.sent();
                    return [2 /*return*/, server_1.NextResponse.json({
                            message: "Signup successful. OTP sent to email."
                        }, { status: 201 })];
                case 7:
                    error_1 = _a.sent();
                    console.error("Signup error:", error_1);
                    return [2 /*return*/, server_1.NextResponse.json({
                            heading: "Internal Server Error",
                            message: error_1 instanceof Error ? error_1.message : String(error_1)
                        }, { status: 500 })];
                case 8: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
