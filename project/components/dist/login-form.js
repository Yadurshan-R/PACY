"use client";
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.LoginForm = void 0;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var navigation_1 = require("next/navigation");
function LoginForm(_a) {
    var _this = this;
    var className = _a.className, props = __rest(_a, ["className"]);
    var router = navigation_1.useRouter();
    var _b = react_1.useState(false), showPassword = _b[0], setShowPassword = _b[1];
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    var _d = react_1.useState({
        x: 0,
        y: 0
    }), mousePosition = _d[0], setMousePosition = _d[1];
    var _e = react_1.useState(false), isHovering = _e[0], setIsHovering = _e[1];
    var _f = react_1.useState({ x: 0, y: 0 }), cancelMousePosition = _f[0], setCancelMousePosition = _f[1];
    var _g = react_1.useState(false), isCancelHovering = _g[0], setIsCancelHovering = _g[1];
    var _h = react_1.useState({
        x: 0,
        y: 0
    }), emailMousePosition = _h[0], setEmailMousePosition = _h[1];
    var _j = react_1.useState(false), isEmailHovering = _j[0], setIsEmailHovering = _j[1];
    var _k = react_1.useState({ x: 0, y: 0 }), passwordMousePosition = _k[0], setPasswordMousePosition = _k[1];
    var _l = react_1.useState(false), isPasswordHovering = _l[0], setIsPasswordHovering = _l[1];
    var containerRef = react_1.useRef(null);
    var cancelRef = react_1.useRef(null);
    var emailRef = react_1.useRef(null);
    var passwordRef = react_1.useRef(null);
    var handleMouseMove = react_1.useCallback(function (e, setter, ref) {
        if (ref.current) {
            var rect = ref.current.getBoundingClientRect();
            setter({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            });
        }
    }, []);
    react_1.useEffect(function () {
        var elements = {
            container: containerRef.current,
            cancel: cancelRef.current,
            email: emailRef.current,
            password: passwordRef.current
        };
        var handlers = {
            container: {
                mousemove: function (e) {
                    return handleMouseMove(e, setMousePosition, containerRef);
                },
                mouseenter: function () { return setIsHovering(true); },
                mouseleave: function () { return setIsHovering(false); }
            },
            cancel: {
                mousemove: function (e) {
                    return handleMouseMove(e, setCancelMousePosition, cancelRef);
                },
                mouseenter: function () { return setIsCancelHovering(true); },
                mouseleave: function () { return setIsCancelHovering(false); }
            },
            email: {
                mousemove: function (e) {
                    return handleMouseMove(e, setEmailMousePosition, emailRef);
                },
                mouseenter: function () { return setIsEmailHovering(true); },
                mouseleave: function () { return setIsEmailHovering(false); }
            },
            password: {
                mousemove: function (e) {
                    return handleMouseMove(e, setPasswordMousePosition, passwordRef);
                },
                mouseenter: function () { return setIsPasswordHovering(true); },
                mouseleave: function () { return setIsPasswordHovering(false); }
            }
        };
        Object.entries(elements).forEach(function (_a) {
            var key = _a[0], element = _a[1];
            if (element) {
                var elementHandlers = handlers[key];
                Object.entries(elementHandlers).forEach(function (_a) {
                    var event = _a[0], handler = _a[1];
                    element.addEventListener(event, handler, {
                        passive: true
                    });
                });
            }
        });
        return function () {
            Object.entries(elements).forEach(function (_a) {
                var key = _a[0], element = _a[1];
                if (element) {
                    var elementHandlers = handlers[key];
                    Object.entries(elementHandlers).forEach(function (_a) {
                        var event = _a[0], handler = _a[1];
                        element.removeEventListener(event, handler);
                    });
                }
            });
        };
    }, [handleMouseMove]);
    var validateForm = react_1.useCallback(function (formData) {
        var email = formData.get("email");
        var password = formData.get("password");
        var errors = [];
        if (!(email === null || email === void 0 ? void 0 : email.trim())) {
            errors.push({ field: "email", message: "Email address is required" });
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.push({ field: "email", message: "Invalid email address format" });
        }
        if (!(password === null || password === void 0 ? void 0 : password.trim())) {
            errors.push({ field: "password", message: "Password is required" });
        }
        else if (password.length < 6) {
            errors.push({
                field: "password",
                message: "Password must be at least 6 characters"
            });
        }
        return errors;
    }, []);
    var showErrorToast = react_1.useCallback(function (errors) {
        var firstError = errors[0];
        var remainingCount = errors.length - 1;
        var message = firstError.message;
        if (remainingCount > 0) {
            message = firstError.message + " (" + remainingCount + " more issue" + (remainingCount > 1 ? "s" : "") + " found)";
        }
        sonner_1.toast.error("Validation Error", {
            description: message,
            duration: 6000
        });
    }, []);
    var showSuccessToast = react_1.useCallback(function () {
        sonner_1.toast.success("Login Successful", {
            description: "Welcome back! You have been authenticated successfully.",
            duration: 4000
        });
    }, []);
    var showAuthErrorToast = react_1.useCallback(function (heading, description) {
        sonner_1.toast.error(heading, {
            description: description,
            duration: 6000
        });
    }, []);
    var handleSubmit = react_1.useCallback(function (e) { return __awaiter(_this, void 0, void 0, function () {
        var formData, validationErrors, firstErrorField, email, password, res, data, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    e.preventDefault();
                    formData = new FormData(e.currentTarget);
                    validationErrors = validateForm(formData);
                    if (validationErrors.length > 0) {
                        showErrorToast(validationErrors);
                        firstErrorField = validationErrors[0].field;
                        if (firstErrorField === "email" && emailRef.current) {
                            emailRef.current.focus();
                        }
                        else if (firstErrorField === "password" && ((_a = passwordRef.current) === null || _a === void 0 ? void 0 : _a.querySelector("input"))) {
                            passwordRef.current.querySelector("input").focus();
                        }
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, 5, 6]);
                    email = formData.get("email");
                    password = formData.get("password");
                    return [4 /*yield*/, fetch("/api/auth/sign-in", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: email, password: password })
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    if (res.ok && data.isAdmin) {
                        sessionStorage.setItem("accessToken", data.token);
                        console.log("Login as Admin successful ");
                        router.push(data.redirect);
                        showSuccessToast();
                    }
                    else if (res.ok && data.flag) {
                        showSuccessToast();
                        sessionStorage.setItem("userId", data.userID);
                        console.log("Login successful ");
                        router.push("/sign-in/change-password");
                    }
                    else if (res.ok) {
                        showSuccessToast();
                        sessionStorage.setItem("userId", data.userID);
                        sessionStorage.setItem("orgName", data.orgName);
                        sessionStorage.setItem("logo", data.logo);
                        sessionStorage.setItem("email", data.email);
                        console.log("Login successful ");
                        router.push("/home");
                    }
                    else {
                        showAuthErrorToast(data.heading, data.message);
                        console.error("Login failed:", data.message);
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _b.sent();
                    showAuthErrorToast("Internal Server Error", "An unexpected error occurred. Please try again later.");
                    console.error("Login failed:", error_1);
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [router, validateForm, showErrorToast, showSuccessToast, showAuthErrorToast]);
    var handleForgotPassword = function () { return __awaiter(_this, void 0, void 0, function () {
        var emailValue, res, data, error_2;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log("Forgot Password clicked");
                    emailValue = (_a = emailRef.current) === null || _a === void 0 ? void 0 : _a.value;
                    if (!emailValue) {
                        sonner_1.toast.error("Missing Email", {
                            description: "Please enter your email so we can help you reset your password."
                        });
                        if (emailRef.current) {
                            emailRef.current.focus();
                        }
                        return [2 /*return*/];
                    }
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch("/api/auth/sign-in/forgotPassword", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ email: emailValue.trim() })
                        })];
                case 2:
                    res = _b.sent();
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _b.sent();
                    if (res.ok) {
                        sonner_1.toast.success("OTP Sent", {
                            description: "A one-time password has been sent to your email address."
                        });
                        // Store email locally to pre-fill later if you like
                        sessionStorage.setItem("resetEmail", emailValue.trim());
                        // Redirect to the forgot password page
                        router.push("/sign-in/forgot-password");
                    }
                    else {
                        sonner_1.toast.error("Request Failed", {
                            description: (data === null || data === void 0 ? void 0 : data.message) || "Unable to send reset email."
                        });
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_2 = _b.sent();
                    console.error("Error sending reset OTP:", error_2);
                    sonner_1.toast.error("Unexpected Error", {
                        description: "Please try again later."
                    });
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
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
    var togglePasswordVisibility = react_1.useCallback(function () {
        setShowPassword(function (prev) { return !prev; });
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { jsx: true }, "\n        @keyframes textGlow {\n          0%,\n          100% {\n            text-shadow: 0 0 0px rgba(255, 255, 255, 0);\n          }\n          50% {\n            text-shadow: 0 0 20px rgba(255, 255, 255, 0.1);\n          }\n        }\n        @keyframes subtlePulse {\n          0%,\n          100% {\n            transform: scale(1);\n            opacity: 0.8;\n          }\n          50% {\n            transform: scale(1.1);\n            opacity: 1;\n          }\n        }\n        @keyframes slideUp {\n          0% {\n            opacity: 0;\n            transform: translateY(30px) scale(0.95);\n          }\n          100% {\n            opacity: 1;\n            transform: translateY(0) scale(1);\n          }\n        }\n        @keyframes slideUpStaggered {\n          0% {\n            opacity: 0;\n            transform: translateY(20px);\n          }\n          100% {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n        @keyframes gentleBounce {\n          0%,\n          100% {\n            transform: translateY(0);\n          }\n          50% {\n            transform: translateY(-2px);\n          }\n        }\n        .animate-fade-in {\n          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n        }\n        .animate-stagger-1 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s\n            both;\n        }\n        .animate-stagger-2 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s\n            both;\n        }\n        .animate-stagger-3 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s\n            both;\n        }\n        .animate-stagger-4 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s\n            both;\n        }\n        .hover-lift:hover {\n          transform: translateY(-1px);\n          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .gentle-bounce {\n          animation: gentleBounce 3s ease-in-out infinite;\n        }\n        .smooth-transition {\n          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        /* Remove all focus outlines */\n        .no-outline:focus,\n        .no-outline:focus-visible {\n          outline: none !important;\n          box-shadow: none !important;\n        }\n        /* Remove browser default focus styles */\n        input:focus,\n        button:focus,\n        a:focus,\n        input:focus-visible,\n        button:focus-visible,\n        a:focus-visible {\n          outline: none !important;\n          box-shadow: none !important;\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .animate-fade-in,\n          .animate-stagger-1,\n          .animate-stagger-2,\n          .animate-stagger-3,\n          .animate-stagger-4,\n          .gentle-bounce {\n            animation: none;\n            opacity: 1;\n            transform: none;\n          }\n          .smooth-transition,\n          .hover-lift:hover {\n            transition: none;\n          }\n        }\n      "),
        React.createElement("div", __assign({ className: utils_1.cn("flex flex-col gap-8 sm:gap-12 w-full max-w-lg mx-auto", className) }, props),
            React.createElement("header", { className: "text-center animate-stagger-1" },
                React.createElement("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-normal relative", style: {
                        animation: "textGlow 6s ease-in-out infinite"
                    } },
                    "Sign in to your Certara",
                    React.createElement("span", { className: "block pl-1" },
                        "account",
                        React.createElement("span", { className: "inline-block w-1 h-1 bg-white rounded-full ml-0.5", style: {
                                animation: "subtlePulse 4s ease-in-out infinite"
                            }, "aria-hidden": "true" })))),
            React.createElement("main", { ref: containerRef, className: "relative rounded-xl p-8 sm:p-10 overflow-visible border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in hover-lift" },
                isHovering && (React.createElement("div", { className: "absolute inset-0 rounded-xl pointer-events-none smooth-transition", style: getGlassStyle(mousePosition, isHovering), "aria-hidden": "true" })),
                React.createElement("form", { onSubmit: handleSubmit, className: "relative z-10", noValidate: true },
                    React.createElement("fieldset", { disabled: isLoading, className: "flex flex-col gap-8 disabled:opacity-75 disabled:pointer-events-none" },
                        React.createElement("legend", { className: "sr-only" }, "Login credentials"),
                        React.createElement("div", { className: "grid gap-4 animate-stagger-2" },
                            React.createElement(label_1.Label, { htmlFor: "email", className: "text-white text-sm font-medium smooth-transition" }, "Enter Your Email Address"),
                            React.createElement("div", { className: "relative" },
                                React.createElement(input_1.Input, { ref: emailRef, id: "email", name: "email", type: "email", autoComplete: "email", required: true, "aria-describedby": "email-description", className: "bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 h-12 px-4 no-outline" }),
                                isEmailHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(emailMousePosition, isEmailHovering), "aria-hidden": "true" }))),
                            React.createElement("div", { id: "email-description", className: "sr-only" }, "Enter your registered email address")),
                        React.createElement("div", { className: "grid gap-4 animate-stagger-3" },
                            React.createElement(label_1.Label, { htmlFor: "password", className: "text-white text-sm font-medium smooth-transition" },
                                "Enter Your Password",
                                React.createElement("button", { type: "button", onClick: handleForgotPassword, className: "pl-40 text-gray-300 hover:text-gray-400 transition-colors duration-300 underline underline-offset-2 focus:outline-none" }, "Forgot Password?")),
                            React.createElement("div", { ref: passwordRef, className: "relative" },
                                React.createElement(input_1.Input, { id: "password", name: "password", type: showPassword ? "text" : "password", autoComplete: "current-password", required: true, "aria-describedby": "password-description", className: "bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 pr-12 h-12 px-4 no-outline" }),
                                isPasswordHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(passwordMousePosition, isPasswordHovering), "aria-hidden": "true" })),
                                React.createElement("button", { type: "button", onClick: togglePasswordVisibility, "aria-label": showPassword ? "Hide password" : "Show password", "aria-pressed": showPassword, className: "absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white hover:scale-110 z-20 no-outline rounded p-1" }, showPassword ? (React.createElement(lucide_react_1.Eye, { className: "h-5 w-5", "aria-hidden": "true" })) : (React.createElement(lucide_react_1.EyeOff, { className: "h-5 w-5", "aria-hidden": "true" })))),
                            React.createElement("div", { id: "password-description", className: "sr-only" }, "Enter your account password. Minimum 6 characters required.")),
                        React.createElement("div", { className: "flex gap-4 animate-stagger-4" },
                            React.createElement(button_1.Button, { ref: cancelRef, type: "button", variant: "outline", disabled: isLoading, onClick: function () { return (window.location.href = "/"); }, className: "flex-1 relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 no-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 hover-lift" },
                                isCancelHovering && !isLoading && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(cancelMousePosition, isCancelHovering), "aria-hidden": "true" })),
                                React.createElement("span", { className: "relative z-10 flex-row" }, "Cancel")),
                            React.createElement(button_1.Button, { type: "submit", disabled: isLoading, className: "flex-1 bg-white text-black hover:bg-white/90 smooth-transition rounded-lg h-12 font-medium no-outline disabled:opacity-50 disabled:cursor-not-allowed smooth-button-bounce hover-lift" }, isLoading ? (React.createElement(React.Fragment, null,
                                React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin", "aria-hidden": "true" }),
                                React.createElement("span", null, "Signing in..."),
                                React.createElement("span", { className: "sr-only" }, "Please wait while we authenticate your credentials"))) : ("Sign In")))),
                    React.createElement("div", { className: "pt-5" })),
                React.createElement("div", { className: "pt-4" })),
            React.createElement("footer", { className: "text-center text-xs text-white/40 space-y-2 animate-stagger-4" },
                React.createElement("p", null, "\u00A9 2025 Certera. All rights reserved."),
                React.createElement("nav", { "aria-label": "Footer navigation" },
                    React.createElement("div", { className: "flex justify-center gap-4 flex-wrap" },
                        React.createElement("a", { href: "#", className: "hover:text-white/60 smooth-transition no-outline rounded hover-lift" }, "Privacy Policy"),
                        React.createElement("span", { className: "hidden sm:inline", "aria-hidden": "true" }, "\u2022"),
                        React.createElement("a", { href: "#", className: "hover:text-white/60 smooth-transition no-outline rounded hover-lift" }, "Terms of Service"),
                        React.createElement("span", { className: "hidden sm:inline", "aria-hidden": "true" }, "\u2022"),
                        React.createElement("a", { href: "#", className: "hover:text-white/60 smooth-transition no-outline rounded hover-lift" }, "Support")))))));
}
exports.LoginForm = LoginForm;
