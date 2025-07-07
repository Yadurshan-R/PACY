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
exports.POST = void 0;
var server_1 = require("next/server");
var db_1 = require("@/lib/db");
var user_1 = require("@/lib/models/user");
var bcryptjs_1 = require("bcryptjs");
var fs_1 = require("fs");
var path_1 = require("path");
var crypto_1 = require("crypto");
var ADMIN_EMAIL = process.env.ADMIN_EMAIL;
var ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
function POST(req) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, adminToken, envPath, envContent, regex, user, isMatch, err_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 5, , 6]);
                    return [4 /*yield*/, req.json()];
                case 1:
                    _a = _b.sent(), email = _a.email, password = _a.password;
                    if (!email || !password) {
                        return [2 /*return*/, server_1.NextResponse.json({ message: "Email and password required" }, { status: 400 })];
                    }
                    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
                        console.log("Logged as Admin");
                        adminToken = crypto_1["default"].randomBytes(32).toString('hex');
                        envPath = path_1["default"].resolve(process.cwd(), '.env');
                        envContent = '';
                        if (fs_1["default"].existsSync(envPath)) {
                            envContent = fs_1["default"].readFileSync(envPath, 'utf-8');
                            regex = /^ADMIN_SESSION_TOKEN=.*$/m;
                            if (regex.test(envContent)) {
                                envContent = envContent.replace(regex, "ADMIN_SESSION_TOKEN=" + adminToken);
                            }
                            else {
                                envContent += "\nADMIN_SESSION_TOKEN=" + adminToken;
                            }
                        }
                        else {
                            envContent = "ADMIN_SESSION_TOKEN=" + adminToken;
                        }
                        fs_1["default"].writeFileSync(envPath, envContent);
                        return [2 /*return*/, server_1.NextResponse.json({ isAdmin: true, token: adminToken, redirect: 'auth/admincertara/signup/' }, { status: 200 })];
                    }
                    return [4 /*yield*/, db_1["default"]()];
                case 2:
                    _b.sent();
                    return [4 /*yield*/, user_1["default"].findOne({ email: email })];
                case 3:
                    user = _b.sent();
                    if (!user) {
                        return [2 /*return*/, server_1.NextResponse.json({ heading: "Authentication Failed", message: "We couldn't find an account with that email." }, { status: 401 })];
                    }
                    return [4 /*yield*/, bcryptjs_1["default"].compare(password, user.password)];
                case 4:
                    isMatch = _b.sent();
                    if (!isMatch) {
                        return [2 /*return*/, server_1.NextResponse.json({ heading: "Authentication Failed", message: "The password you entered is incorrect." }, { status: 401 })];
                    }
                    return [2 /*return*/, server_1.NextResponse.json({ message: "Login successful", userID: user.id, flag: user.flagFirstLogin, orgName: user.orgName, logo: user.logo, email: user.email }, { status: 200 })];
                case 5:
                    err_1 = _b.sent();
                    console.error("Login error:", err_1);
                    return [2 /*return*/, server_1.NextResponse.json({ heading: "Internal Server Error", message: "An unexpected error occurred. Please try again later." }, { status: 500 })];
                case 6: return [2 /*return*/];
            }
        });
    });
}
exports.POST = POST;
