"use client";
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
var react_1 = require("react");
var lucide_react_1 = require("lucide-react");
var react_2 = require("@meshsdk/react");
var sonner_1 = require("sonner");
function Header(_a) {
    var _this = this;
    var onWalletStatusChange = _a.onWalletStatusChange, walletAddress = _a.walletAddress, onBack = _a.onBack, currentView = _a.currentView;
    var _b = react_1.useState(false), isProfileDropdownOpen = _b[0], setIsProfileDropdownOpen = _b[1];
    var _c = react_1.useState({ x: 0, y: 0 }), walletMousePosition = _c[0], setWalletMousePosition = _c[1];
    var _d = react_1.useState(false), isWalletHovering = _d[0], setIsWalletHovering = _d[1];
    var _e = react_1.useState({ x: 0, y: 0 }), profileMousePosition = _e[0], setProfileMousePosition = _e[1];
    var _f = react_1.useState(false), isProfileHovering = _f[0], setIsProfileHovering = _f[1];
    var _g = react_1.useState(false), showWalletPopup = _g[0], setShowWalletPopup = _g[1];
    var _h = react_1.useState(false), isCheckingWallet = _h[0], setIsCheckingWallet = _h[1];
    var _j = react_1.useState(null), base64Image = _j[0], setBase64Image = _j[1];
    var walletRef = react_1.useRef(null);
    var profileRef = react_1.useRef(null);
    var popupRef = react_1.useRef(null);
    var dropdownRef = react_1.useRef(null);
    var _k = react_2.useWallet(), connected = _k.connected, wallet = _k.wallet, connect = _k.connect, disconnect = _k.disconnect;
    react_1.useEffect(function () {
        var imageFromSession = sessionStorage.getItem("logo");
        if (imageFromSession) {
            setBase64Image(imageFromSession);
        }
    }, []);
    react_1.useEffect(function () {
        if (onWalletStatusChange) {
            onWalletStatusChange(connected);
        }
    }, [connected, onWalletStatusChange]);
    react_1.useEffect(function () {
        var handleClickOutside = function (event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowWalletPopup(false);
            }
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return function () { return document.removeEventListener("mousedown", handleClickOutside); };
    }, []);
    react_1.useEffect(function () {
        if (showWalletPopup) {
            setIsProfileDropdownOpen(false);
        }
    }, [showWalletPopup]);
    react_1.useEffect(function () {
        if (isProfileDropdownOpen) {
            setShowWalletPopup(false);
        }
    }, [isProfileDropdownOpen]);
    var handleWalletAction = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!connected) return [3 /*break*/, 2];
                    return [4 /*yield*/, handleDisconnect()];
                case 1:
                    _b.sent();
                    return [2 /*return*/];
                case 2:
                    setIsCheckingWallet(true);
                    _b.label = 3;
                case 3:
                    _b.trys.push([3, 5, 6, 7]);
                    if (typeof window !== 'undefined' && !((_a = window.cardano) === null || _a === void 0 ? void 0 : _a.lace)) {
                        setShowWalletPopup(true);
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, handleConnect()];
                case 4:
                    _b.sent();
                    return [3 /*break*/, 7];
                case 5:
                    err_1 = _b.sent();
                    console.error("Wallet error:", err_1);
                    return [3 /*break*/, 7];
                case 6:
                    setIsCheckingWallet(false);
                    return [7 /*endfinally*/];
                case 7: return [2 /*return*/];
            }
        });
    }); };
    var handleConnect = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, connect("lace")];
                case 1:
                    _a.sent();
                    console.log("Wallet connected successfully");
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error("Failed to connect wallet:", err_2);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        function fetchAddresses() {
            return __awaiter(this, void 0, void 0, function () {
                var used, walletAddress_1, userId, response, errorData, err_3;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!wallet) return [3 /*break*/, 9];
                            _a.label = 1;
                        case 1:
                            _a.trys.push([1, 7, , 9]);
                            return [4 /*yield*/, wallet.getUsedAddresses()];
                        case 2:
                            used = _a.sent();
                            walletAddress_1 = used[0];
                            userId = sessionStorage.getItem("userId");
                            return [4 /*yield*/, fetch("/api/auth/wallet", {
                                    method: "POST",
                                    headers: { "Content-Type": "application/json" },
                                    body: JSON.stringify({ userId: userId, walletAddress: walletAddress_1 })
                                })];
                        case 3:
                            response = _a.sent();
                            if (!!response.ok) return [3 /*break*/, 6];
                            return [4 /*yield*/, response.json()];
                        case 4:
                            errorData = _a.sent();
                            console.warn("Server responded with error:", response.status, errorData);
                            return [4 /*yield*/, handleDisconnect()];
                        case 5:
                            _a.sent();
                            sonner_1.toast.error("Validation Error", {
                                description: errorData.message || "Wallet validation failed.",
                                duration: 6000
                            });
                            _a.label = 6;
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            err_3 = _a.sent();
                            console.warn("Error fetching addresses or sending request:", err_3);
                            return [4 /*yield*/, handleDisconnect()];
                        case 8:
                            _a.sent();
                            return [3 /*break*/, 9];
                        case 9: return [2 /*return*/];
                    }
                });
            });
        }
        fetchAddresses();
    }, [wallet]);
    var handleDisconnect = function () { return __awaiter(_this, void 0, void 0, function () {
        var err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, disconnect()];
                case 1:
                    _a.sent();
                    if (currentView !== "designer") {
                        onBack();
                    }
                    console.log("Wallet disconnected successfully");
                    return [3 /*break*/, 3];
                case 2:
                    err_4 = _a.sent();
                    console.error("Failed to disconnect wallet:", err_4);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var userProfile = {
        name: sessionStorage.getItem("orgName"),
        email: sessionStorage.getItem("email")
    };
    var handleMouseMove = react_1.useCallback(function (e, setter, ref) {
        if (ref.current) {
            var rect = ref.current.getBoundingClientRect();
            setter({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    }, []);
    var getGlassStyle = react_1.useMemo(function () {
        return function (mousePos, isVisible) {
            if (!isVisible)
                return {};
            return {
                background: "\n          radial-gradient(ellipse 100px 60px at " + mousePos.x + "px " + mousePos.y + "px, \n            rgba(255,255,255,0.18) 0%, \n            rgba(255,255,255,0.08) 30%, \n            rgba(255,255,255,0.04) 50%,\n            transparent 70%),\n          radial-gradient(ellipse 50px 30px at " + (mousePos.x - 15) + "px " + (mousePos.y - 10) + "px, \n            rgba(255,255,255,0.22) 0%, \n            rgba(255,255,255,0.1) 40%, \n            transparent 70%)\n        ",
                mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                maskComposite: "xor",
                WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMaskComposite: "xor",
                padding: "1px",
                filter: "blur(0.8px) contrast(1.1)"
            };
        };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { jsx: true }, "\n        @keyframes slideUp {\n          0% {\n            opacity: 0;\n            transform: translateY(30px) scale(0.95);\n          }\n          100% {\n            opacity: 1;\n            transform: translateY(0) scale(1);\n          }\n        }\n        @keyframes slideUpStaggered {\n          0% {\n            opacity: 0;\n            transform: translateY(20px);\n          }\n          100% {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n        @keyframes gentleBounce {\n          0%, 100% {\n            transform: translateY(0);\n          }\n          50% {\n            transform: translateY(-2px);\n          }\n        }\n        .animate-fade-in {\n          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n        }\n        .smooth-transition {\n          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .hover-lift:hover {\n          transform: translateY(-1px);\n          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .gentle-bounce {\n          animation: gentleBounce 3s ease-in-out infinite;\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .animate-fade-in,\n          .gentle-bounce {\n            animation: none;\n            opacity: 1;\n            transform: none;\n          }\n          .smooth-transition,\n          .hover-lift:hover {\n            transition: none;\n          }\n        }\n      "),
        React.createElement("header", { className: "fixed top-0 left-0 right-0 bg-black/20 backdrop-blur-sm border-b border-white/20 text-white z-50" },
            React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" },
                React.createElement("div", { className: "flex justify-between items-center h-16" },
                    React.createElement("div", { className: "flex items-center" },
                        React.createElement("div", { className: "w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mr-3 border border-white/20 hover-lift" },
                            React.createElement(lucide_react_1.Award, { className: "w-5 h-5 text-white" })),
                        React.createElement("span", { className: "text-xl font-light tracking-wide" }, "Certara")),
                    React.createElement("div", { className: "flex items-center space-x-4" },
                        React.createElement("div", { className: "relative" },
                            React.createElement("button", { ref: walletRef, onClick: handleWalletAction, disabled: isCheckingWallet, onMouseMove: function (e) {
                                    return handleMouseMove(e.nativeEvent, setWalletMousePosition, walletRef);
                                }, onMouseEnter: function () { return setIsWalletHovering(true); }, onMouseLeave: function () { return setIsWalletHovering(false); }, className: "relative overflow-hidden flex items-center px-4 py-2 rounded-lg font-medium smooth-transition hover-lift border " + (connected
                                    ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-white/20 hover:border-white/40 text-white'
                                    : 'bg-white/10 hover:bg-white/20 border-white/20 hover:border-white/40 text-white') + " " + (isCheckingWallet ? 'opacity-70 cursor-not-allowed' : '') },
                                isWalletHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(walletMousePosition, isWalletHovering), "aria-hidden": "true" })),
                                React.createElement(lucide_react_1.Wallet, { className: "w-4 h-4 mr-2 relative z-10" }),
                                React.createElement("span", { className: "relative z-10" }, isCheckingWallet
                                    ? "Checking..."
                                    : connected
                                        ? "Disconnect"
                                        : "Connect Wallet")),
                            showWalletPopup && (React.createElement("div", { ref: popupRef, className: "absolute right-0 mt-2 w-72 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-[1000] animate-fade-in" },
                                React.createElement("div", { className: "p-4" },
                                    React.createElement("div", { className: "flex items-start" },
                                        React.createElement("div", { className: "flex-shrink-0 pt-0.5" },
                                            React.createElement(lucide_react_1.Wallet, { className: "w-5 h-5 text-emerald-400" })),
                                        React.createElement("div", { className: "ml-3" },
                                            React.createElement("h3", { className: "text-lg font-medium text-white" }, "Lace Wallet Required"),
                                            React.createElement("div", { className: "mt-1 text-sm text-white/80" },
                                                React.createElement("p", null, "To connect your wallet, please install the Lace browser extension.")),
                                            React.createElement("div", { className: "mt-4" },
                                                React.createElement("a", { href: "https://www.lace.io/", target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-emerald-600/20 hover:bg-emerald-600/30 border border-white/20 hover:border-white/40 text-emerald-200 smooth-transition hover-lift" },
                                                    "Get Lace Wallet",
                                                    React.createElement(lucide_react_1.ExternalLink, { className: "w-4 h-4 ml-1" })),
                                                React.createElement("button", { type: "button", onClick: function () { return setShowWalletPopup(false); }, className: "ml-2 inline-flex items-center px-3 py-2 text-sm font-medium rounded-md bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 text-white smooth-transition hover-lift" }, "Close")))))))),
                        React.createElement("div", { className: "relative" },
                            React.createElement("button", { ref: profileRef, onClick: function () {
                                    return setIsProfileDropdownOpen(!isProfileDropdownOpen);
                                }, onMouseMove: function (e) {
                                    return handleMouseMove(e.nativeEvent, setProfileMousePosition, profileRef);
                                }, onMouseEnter: function () { return setIsProfileHovering(true); }, onMouseLeave: function () { return setIsProfileHovering(false); }, className: "relative overflow-hidden flex items-center p-2 rounded-full bg-white/10 hover:bg-white/20 smooth-transition hover-lift border border-white/20 hover:border-white/40" },
                                isProfileHovering && (React.createElement("div", { className: "absolute inset-0 rounded-full pointer-events-none smooth-transition", style: getGlassStyle(profileMousePosition, isProfileHovering), "aria-hidden": "true" })),
                                base64Image ? (React.createElement("img", { src: base64Image.startsWith("data:")
                                        ? base64Image
                                        : "data:image/png;base64," + base64Image, alt: "Profile", className: "w-8 h-8 rounded-full object-cover " })) : (React.createElement(lucide_react_1.User, { className: "w-8 h-8 text-emerald-400" }))),
                            isProfileDropdownOpen && (React.createElement("div", { ref: dropdownRef, className: "absolute right-0 mt-2 w-72 bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg shadow-lg z-[1000] animate-fade-in" },
                                React.createElement("div", { className: "p-4" },
                                    React.createElement("div", { className: "flex items-start" },
                                        React.createElement("div", { className: "ml-3 w-full" },
                                            React.createElement("h3", { className: "text-lg font-medium text-white" }, userProfile.name),
                                            React.createElement("p", { className: "text-sm text-white/80" }, userProfile.email),
                                            React.createElement("div", { className: "mt-4 pt-4 border-t border-white/20" },
                                                React.createElement("button", { onClick: function () {
                                                        setIsProfileDropdownOpen(false);
                                                        sessionStorage.clear();
                                                    }, className: "w-full text-left px-3 py-2 text-sm font-medium rounded-md hover:bg-white/10 text-white smooth-transition" }, "Sign Out"))))))))))))));
}
exports["default"] = Header;
