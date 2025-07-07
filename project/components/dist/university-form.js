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
exports.UniversitySetupForm = void 0;
var react_1 = require("react");
var utils_1 = require("@/lib/utils");
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var label_1 = require("@/components/ui/label");
var select_1 = require("@/components/ui/select");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
function UniversitySetupForm(_a) {
    var _this = this;
    var className = _a.className, props = __rest(_a, ["className"]);
    var _b = react_1.useState(1), currentStep = _b[0], setCurrentStep = _b[1];
    var _c = react_1.useState(false), showUsers = _c[0], setShowUsers = _c[1];
    var _d = react_1.useState(false), isLoading = _d[0], setIsLoading = _d[1];
    var _e = react_1.useState([]), universities = _e[0], setUniversities = _e[1];
    var _f = react_1.useState(false), loadingUniversities = _f[0], setLoadingUniversities = _f[1];
    var _g = react_1.useState([]), cities = _g[0], setCities = _g[1];
    var _h = react_1.useState(false), loadingCities = _h[0], setLoadingCities = _h[1];
    var _j = react_1.useState({
        universityName: "",
        location: "",
        email: "",
        contactNumber: ""
    }), formData = _j[0], setFormData = _j[1];
    var _k = react_1.useState(null), logoFile = _k[0], setLogoFile = _k[1];
    var _l = react_1.useState(""), logoBase64 = _l[0], setLogoBase64 = _l[1];
    var _m = react_1.useState(false), dragActive = _m[0], setDragActive = _m[1];
    var _o = react_1.useState({ x: 0, y: 0 }), mousePosition = _o[0], setMousePosition = _o[1];
    var _p = react_1.useState(false), isHovering = _p[0], setIsHovering = _p[1];
    var _q = react_1.useState({ x: 0, y: 0 }), uniNameMousePosition = _q[0], setUniNameMousePosition = _q[1];
    var _r = react_1.useState(false), isUniNameHovering = _r[0], setIsUniNameHovering = _r[1];
    var _s = react_1.useState({ x: 0, y: 0 }), locationMousePosition = _s[0], setLocationMousePosition = _s[1];
    var _t = react_1.useState(false), isLocationHovering = _t[0], setIsLocationHovering = _t[1];
    var _u = react_1.useState({ x: 0, y: 0 }), emailMousePosition = _u[0], setEmailMousePosition = _u[1];
    var _v = react_1.useState(false), isEmailHovering = _v[0], setIsEmailHovering = _v[1];
    var _w = react_1.useState({ x: 0, y: 0 }), contactMousePosition = _w[0], setContactMousePosition = _w[1];
    var _x = react_1.useState(false), isContactHovering = _x[0], setIsContactHovering = _x[1];
    var _y = react_1.useState({ x: 0, y: 0 }), tableMousePosition = _y[0], setTableMousePosition = _y[1];
    var _z = react_1.useState(false), isTableHovering = _z[0], setIsTableHovering = _z[1];
    var _0 = react_1.useState({ x: 0, y: 0 }), viewButtonMousePosition = _0[0], setViewButtonMousePosition = _0[1];
    var _1 = react_1.useState(false), isViewButtonHovering = _1[0], setIsViewButtonHovering = _1[1];
    var _2 = react_1.useState({ x: 0, y: 0 }), continueButtonMousePosition = _2[0], setContinueButtonMousePosition = _2[1];
    var _3 = react_1.useState(false), isContinueButtonHovering = _3[0], setIsContinueButtonHovering = _3[1];
    var _4 = react_1.useState({ x: 0, y: 0 }), backButtonMousePosition = _4[0], setBackButtonMousePosition = _4[1];
    var _5 = react_1.useState(false), isBackButtonHovering = _5[0], setIsBackButtonHovering = _5[1];
    var _6 = react_1.useState({ x: 0, y: 0 }), submitButtonMousePosition = _6[0], setSubmitButtonMousePosition = _6[1];
    var _7 = react_1.useState(false), isSubmitButtonHovering = _7[0], setIsSubmitButtonHovering = _7[1];
    var _8 = react_1.useState(false), isCancelHovering = _8[0], setIsCancelHovering = _8[1];
    var _9 = react_1.useState({ x: 0, y: 0 }), cancelMousePosition = _9[0], setCancelMousePosition = _9[1];
    var fileInputRef = react_1.useRef(null);
    var containerRef = react_1.useRef(null);
    var uniNameRef = react_1.useRef(null);
    var locationRef = react_1.useRef(null);
    var emailRef = react_1.useRef(null);
    var contactRef = react_1.useRef(null);
    var tableRef = react_1.useRef(null);
    var viewButtonRef = react_1.useRef(null);
    var continueButtonRef = react_1.useRef(null);
    var backButtonRef = react_1.useRef(null);
    var submitButtonRef = react_1.useRef(null);
    var cancelRef = react_1.useRef(null);
    var fetchUniversities = react_1.useCallback(function () { return __awaiter(_this, void 0, void 0, function () {
        var response, data, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoadingUniversities(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/auth/admin/universities")];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    setUniversities(data.universities);
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error("Failed to fetch universities:", error_1);
                    sonner_1.toast.error("Failed to load universities", {
                        description: "Could not load the list of universities. Please try again.",
                        duration: 4000
                    });
                    return [3 /*break*/, 6];
                case 5:
                    setLoadingUniversities(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, []);
    react_1.useEffect(function () {
        var fetchCities = function () { return __awaiter(_this, void 0, void 0, function () {
            var response, data, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setLoadingCities(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/auth/admin/cities")];
                    case 2:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        setCities(data.cities);
                        return [3 /*break*/, 6];
                    case 4:
                        error_2 = _a.sent();
                        console.error("Failed to fetch cities:", error_2);
                        sonner_1.toast.error("Failed to load cities", {
                            description: "Could not load the list of cities. Please try again.",
                            duration: 4000
                        });
                        return [3 /*break*/, 6];
                    case 5:
                        setLoadingCities(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchCities();
    }, []);
    var validateStep1 = react_1.useCallback(function () {
        var _a;
        var errors = [];
        if (!((_a = formData.universityName) === null || _a === void 0 ? void 0 : _a.trim())) {
            errors.push({ field: "universityName", message: "University name is required" });
        }
        if (!formData.location) {
            errors.push({ field: "location", message: "Location is required" });
        }
        return errors;
    }, [formData.universityName, formData.location]);
    var validateStep2 = react_1.useCallback(function () {
        var _a, _b;
        var errors = [];
        if (!((_a = formData.email) === null || _a === void 0 ? void 0 : _a.trim())) {
            errors.push({ field: "email", message: "Email address is required" });
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            errors.push({ field: "email", message: "Invalid email address format" });
        }
        if (!((_b = formData.contactNumber) === null || _b === void 0 ? void 0 : _b.trim())) {
            errors.push({ field: "contactNumber", message: "Contact number is required" });
        }
        else if (!/^\+?[\d\s\-$$$$]{10,}$/.test(formData.contactNumber)) {
            errors.push({ field: "contactNumber", message: "Invalid contact number format" });
        }
        return errors;
    }, [formData.email, formData.contactNumber]);
    var showErrorToast = react_1.useCallback(function (errors) {
        var firstError = errors[0];
        var remainingCount = errors.length - 1;
        var heading = "Validation Error";
        var subtext = firstError.message;
        if (remainingCount > 0) {
            subtext = firstError.message + " (" + remainingCount + " more issue" + (remainingCount > 1 ? "s" : "") + " found)";
        }
        sonner_1.toast.error(heading, {
            description: subtext,
            duration: 6000
        });
    }, []);
    var showSuccessToast = react_1.useCallback(function () {
        sonner_1.toast.success("University Setup Complete", {
            description: "Your university has been successfully configured.",
            duration: 4000
        });
    }, []);
    var convertToBase64 = react_1.useCallback(function (file) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () { return resolve(reader.result); };
            reader.onerror = function (error) { return reject(error); };
        });
    }, []);
    var handleFileSelect = react_1.useCallback(function (file) { return __awaiter(_this, void 0, void 0, function () {
        var base64, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!file.type.startsWith("image/")) {
                        sonner_1.toast.error("Invalid File Type", {
                            description: "Please select an image file (PNG, JPG, GIF, etc.)",
                            duration: 4000
                        });
                        return [2 /*return*/];
                    }
                    if (file.size > 5 * 1024 * 1024) {
                        sonner_1.toast.error("File Too Large", {
                            description: "Please select an image smaller than 5MB",
                            duration: 4000
                        });
                        return [2 /*return*/];
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, convertToBase64(file)];
                case 2:
                    base64 = _a.sent();
                    setLogoFile(file);
                    setLogoBase64(base64);
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _a.sent();
                    sonner_1.toast.error("File Processing Error", {
                        description: "Failed to process the selected file",
                        duration: 4000
                    });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); }, [convertToBase64]);
    var handleFileInputChange = react_1.useCallback(function (e) {
        var _a;
        var file = (_a = e.target.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            handleFileSelect(file);
        }
    }, [handleFileSelect]);
    var handleDrag = react_1.useCallback(function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        }
        else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);
    var handleDrop = react_1.useCallback(function (e) {
        var _a;
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        var file = (_a = e.dataTransfer.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            handleFileSelect(file);
        }
    }, [handleFileSelect]);
    var removeLogo = react_1.useCallback(function () {
        setLogoFile(null);
        setLogoBase64("");
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }, []);
    var handleNextStep = react_1.useCallback(function () {
        var errors = validateStep1();
        if (errors.length > 0) {
            showErrorToast(errors);
            return;
        }
        setCurrentStep(2);
    }, [validateStep1, showErrorToast]);
    var handlePrevStep = react_1.useCallback(function () {
        setCurrentStep(1);
    }, []);
    var handleViewUsers = react_1.useCallback(function () {
        setShowUsers(true);
        fetchUniversities();
    }, []);
    var handleBackToForm = react_1.useCallback(function () {
        setShowUsers(false);
        setTimeout(function () {
        }, 50);
    }, []);
    var handleSubmit = react_1.useCallback(function (e) { return __awaiter(_this, void 0, void 0, function () {
        var errors, adminToken, universityData, response, result, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    errors = validateStep2();
                    if (errors.length > 0) {
                        showErrorToast(errors);
                        return [2 /*return*/];
                    }
                    setIsLoading(true);
                    adminToken = sessionStorage.getItem('accessToken');
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    universityData = {
                        orgName: formData.universityName,
                        location: formData.location,
                        email: formData.email,
                        contactNo: formData.contactNumber,
                        logo: logoBase64 || null
                    };
                    return [4 /*yield*/, fetch("/api/auth/admin/signup", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": "Bearer " + adminToken
                            },
                            body: JSON.stringify(universityData)
                        })];
                case 2:
                    response = _a.sent();
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    if (result.ok) {
                        console.log("Organization Added Successfully.");
                        showSuccessToast();
                        setFormData({
                            universityName: "",
                            location: "",
                            email: "",
                            contactNumber: ""
                        });
                        setLogoFile(null);
                        setLogoBase64("");
                        setCurrentStep(1);
                        setTimeout(function () {
                        }, 1500);
                    }
                    else {
                        sonner_1.toast.error(result.heading, {
                            description: result.message,
                            duration: 6000
                        });
                    }
                    return [3 /*break*/, 6];
                case 4:
                    error_4 = _a.sent();
                    sonner_1.toast.error("Setup Failed", {
                        description: "Failed to setup university. Please try again.",
                        duration: 6000
                    });
                    console.error("University setup failed:", error_4);
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); }, [validateStep2, showErrorToast, showSuccessToast, formData, logoBase64]);
    var updateFormData = react_1.useCallback(function (field, value) {
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[field] = value, _a)));
        });
    }, []);
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
                background: "\n        radial-gradient(ellipse 100px 60px at " + mousePos.x + "px " + mousePos.y + "px, \n          rgba(255,255,255,0.18) 0%, \n          rgba(255,255,255,0.08) 30%, \n          rgba(255,255,255,0.04) 50%,\n          transparent 70%),\n        radial-gradient(ellipse 50px 30px at " + (mousePos.x - 15) + "px " + (mousePos.y - 10) + "px, \n          rgba(255,255,255,0.22) 0%, \n          rgba(255,255,255,0.1) 40%, \n          transparent 70%)\n      ",
                mask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                maskComposite: "xor",
                WebkitMask: "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                WebkitMaskComposite: "xor",
                padding: "1px",
                filter: "blur(0.8px) contrast(1.1)"
            };
        };
    }, []);
    react_1.useEffect(function () {
        var elements = {
            container: containerRef.current,
            uniName: uniNameRef.current,
            location: locationRef.current,
            email: emailRef.current,
            contact: contactRef.current,
            table: tableRef.current,
            viewButton: viewButtonRef.current,
            continueButton: continueButtonRef.current,
            backButton: backButtonRef.current,
            submitButton: submitButtonRef.current
        };
        var handlers = {
            container: {
                mousemove: function (e) { return handleMouseMove(e, setMousePosition, containerRef); },
                mouseenter: function () { return setIsHovering(true); },
                mouseleave: function () { return setIsHovering(false); }
            },
            uniName: {
                mousemove: function (e) { return handleMouseMove(e, setUniNameMousePosition, uniNameRef); },
                mouseenter: function () { return setIsUniNameHovering(true); },
                mouseleave: function () { return setIsUniNameHovering(false); }
            },
            location: {
                mousemove: function (e) { return handleMouseMove(e, setLocationMousePosition, locationRef); },
                mouseenter: function () { return setIsLocationHovering(true); },
                mouseleave: function () { return setIsLocationHovering(false); }
            },
            email: {
                mousemove: function (e) { return handleMouseMove(e, setEmailMousePosition, emailRef); },
                mouseenter: function () { return setIsEmailHovering(true); },
                mouseleave: function () { return setIsEmailHovering(false); }
            },
            contact: {
                mousemove: function (e) { return handleMouseMove(e, setContactMousePosition, contactRef); },
                mouseenter: function () { return setIsContactHovering(true); },
                mouseleave: function () { return setIsContactHovering(false); }
            },
            table: {
                mousemove: function (e) { return handleMouseMove(e, setTableMousePosition, tableRef); },
                mouseenter: function () { return setIsTableHovering(true); },
                mouseleave: function () { return setIsTableHovering(false); }
            },
            viewButton: {
                mousemove: function (e) { return handleMouseMove(e, setViewButtonMousePosition, viewButtonRef); },
                mouseenter: function () { return setIsViewButtonHovering(true); },
                mouseleave: function () { return setIsViewButtonHovering(false); }
            },
            continueButton: {
                mousemove: function (e) { return handleMouseMove(e, setContinueButtonMousePosition, continueButtonRef); },
                mouseenter: function () { return setIsContinueButtonHovering(true); },
                mouseleave: function () { return setIsContinueButtonHovering(false); }
            },
            backButton: {
                mousemove: function (e) { return handleMouseMove(e, setBackButtonMousePosition, backButtonRef); },
                mouseenter: function () { return setIsBackButtonHovering(true); },
                mouseleave: function () { return setIsBackButtonHovering(false); }
            },
            submitButton: {
                mousemove: function (e) { return handleMouseMove(e, setSubmitButtonMousePosition, submitButtonRef); },
                mouseenter: function () { return setIsSubmitButtonHovering(true); },
                mouseleave: function () { return setIsSubmitButtonHovering(false); }
            }
        };
        Object.entries(elements).forEach(function (_a) {
            var key = _a[0], element = _a[1];
            if (element) {
                var elementHandlers = handlers[key];
                Object.entries(elementHandlers).forEach(function (_a) {
                    var event = _a[0], handler = _a[1];
                    element.addEventListener(event, handler, { passive: true });
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
    if (showUsers) {
        return (React.createElement(React.Fragment, null,
            React.createElement("style", { jsx: true }, "\n          @keyframes textGlow {\n            0%, 100% { text-shadow: 0 0 0px rgba(255,255,255,0); }\n            50% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }\n          }\n          @keyframes subtlePulse {\n            0%, 100% { \n              transform: scale(1); \n              opacity: 0.8; \n            }\n            50% { \n              transform: scale(1.1); \n              opacity: 1; \n            }\n          }\n          @keyframes slideUp {\n            0% { \n              opacity: 0; \n              transform: translateY(30px) scale(0.95);\n            }\n            100% { \n              opacity: 1; \n              transform: translateY(0) scale(1);\n            }\n          }\n          .animate-fade-in {\n            animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n          }\n          .hover-lift:hover {\n            transform: translateY(-1px);\n            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n          }\n          .smooth-transition {\n            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n          }\n          .no-outline:focus,\n          .no-outline:focus-visible {\n            outline: none !important;\n            box-shadow: none !important;\n          }\n          input:focus,\n          button:focus,\n          a:focus,\n          select:focus,\n          input:focus-visible,\n          button:focus-visible,\n          a:focus-visible,\n          select:focus-visible {\n            outline: none !important;\n            box-shadow: none !important;\n          }\n          @media (prefers-reduced-motion: reduce) {\n            .animate-fade-in {\n              animation: none;\n              opacity: 1;\n              transform: none;\n            }\n            .smooth-transition,\n            .hover-lift:hover {\n              transition: none;\n            }\n          }\n        "),
            React.createElement("div", __assign({ className: utils_1.cn("flex flex-col gap-8 w-full max-w-6xl mx-auto", className) }, props),
                React.createElement("header", { className: "text-center" },
                    React.createElement("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-normal relative", style: {
                            animation: "textGlow 6s ease-in-out infinite"
                        } },
                        "Organizations",
                        React.createElement("span", { className: "inline-block w-1 h-1 bg-white rounded-full ml-0.5 mr-1", style: {
                                animation: "subtlePulse 4s ease-in-out infinite"
                            }, "aria-hidden": "true" }))),
                React.createElement("main", { ref: tableRef, className: "relative rounded-xl p-8 border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in" },
                    isTableHovering && (React.createElement("div", { className: "absolute inset-0 rounded-xl pointer-events-none smooth-transition", style: getGlassStyle(tableMousePosition, isTableHovering), "aria-hidden": "true" })),
                    React.createElement("div", { className: "flex justify-between items-center mb-6" },
                        React.createElement("div", { className: "flex items-center gap-2" },
                            React.createElement(lucide_react_1.Users, { className: "h-5 w-5 text-white/70" }),
                            React.createElement("span", { className: "text-white/70 text-sm" },
                                "Total Organizations: ",
                                universities.length)),
                        React.createElement(button_1.Button, { ref: backButtonRef, onClick: handleBackToForm, variant: "outline", className: "relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-10 px-4 no-outline hover-lift" },
                            isBackButtonHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(backButtonMousePosition, isBackButtonHovering), "aria-hidden": "true" })),
                            React.createElement("span", { className: "relative z-10 flex items-center" },
                                React.createElement(lucide_react_1.ArrowLeft, { className: "h-4 w-4 mr-2" }),
                                "Back to Setup"))),
                    loadingUniversities ? (React.createElement("div", { className: "text-center py-12" },
                        React.createElement("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto mb-4" }),
                        React.createElement("p", { className: "text-white/70 text-sm" }, "Loading Organizations..."))) : (React.createElement("div", { className: "overflow-x-auto" },
                        React.createElement("table", { className: "w-full" },
                            React.createElement("thead", null,
                                React.createElement("tr", { className: "border-b border-white/20" },
                                    React.createElement("th", { className: "text-left text-white/80 text-sm font-medium py-3 px-4" }, "Organisation Name"),
                                    React.createElement("th", { className: "text-left text-white/80 text-sm font-medium py-3 px-4" }, "Location"),
                                    React.createElement("th", { className: "text-left text-white/80 text-sm font-medium py-3 px-4" }, "Email Address"),
                                    React.createElement("th", { className: "text-left text-white/80 text-sm font-medium py-3 px-4" }, "Contact No"),
                                    React.createElement("th", { className: "text-left text-white/80 text-sm font-medium py-3 px-4" }, "Logo"))),
                            React.createElement("tbody", null, universities.map(function (uni) { return (React.createElement("tr", { key: uni.id, className: "border-b border-white/10 hover:bg-white/5 smooth-transition" },
                                React.createElement("td", { className: "text-white text-sm py-3 px-4 font-medium" }, uni.universityName),
                                React.createElement("td", { className: "text-white/70 text-sm py-3 px-4" }, uni.location),
                                React.createElement("td", { className: "text-white/70 text-sm py-3 px-4" }, uni.email),
                                React.createElement("td", { className: "text-white/70 text-sm py-3 px-4" }, uni.contactNumber),
                                React.createElement("td", { className: "text-sm py-3 px-4" }, uni.logo ? (React.createElement("div", { className: "w-8 h-8 rounded-lg overflow-hidden bg-white/10 flex items-center justify-center" },
                                    React.createElement("img", { src: uni.logo || "/placeholder.svg", alt: uni.universityName + " logo", className: "w-full h-full object-cover" }))) : (React.createElement("div", { className: "w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center" },
                                    React.createElement("span", { className: "text-white/40 text-xs" }, "No Logo")))))); })))))))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { jsx: true }, "\n        @keyframes textGlow {\n          0%, 100% { text-shadow: 0 0 0px rgba(255,255,255,0); }\n          50% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }\n        }\n        @keyframes subtlePulse {\n          0%, 100% { \n            transform: scale(1); \n            opacity: 0.8; \n          }\n          50% { \n            transform: scale(1.1); \n            opacity: 1; \n          }\n        }\n        @keyframes slideUp {\n          0% { \n            opacity: 0; \n            transform: translateY(30px) scale(0.95);\n          }\n          100% { \n            opacity: 1; \n            transform: translateY(0) scale(1);\n          }\n        }\n        @keyframes slideUpStaggered {\n          0% { \n            opacity: 0; \n            transform: translateY(20px);\n          }\n          100% { \n            opacity: 1; \n            transform: translateY(0);\n          }\n        }\n        .animate-fade-in {\n          animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n        }\n        .animate-stagger-1 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;\n        }\n        .animate-stagger-2 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;\n        }\n        .animate-stagger-3 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;\n        }\n        .animate-stagger-4 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;\n        }\n        .hover-lift:hover {\n          transform: translateY(-1px);\n          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .smooth-transition {\n          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .no-outline:focus,\n        .no-outline:focus-visible {\n          outline: none !important;\n          box-shadow: none !important;\n        }\n        input:focus,\n        button:focus,\n        a:focus,\n        select:focus,\n        input:focus-visible,\n        button:focus-visible,\n        a:focus-visible,\n        select:focus-visible {\n          outline: none !important;\n          box-shadow: none !important;\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .animate-fade-in,\n          .animate-stagger-1,\n          .animate-stagger-2,\n          .animate-stagger-3,\n          .animate-stagger-4 {\n            animation: none;\n            opacity: 1;\n            transform: none;\n          }\n          .smooth-transition,\n          .hover-lift:hover {\n            transition: none;\n          }\n        }\n      "),
        React.createElement("div", __assign({ className: utils_1.cn("flex flex-col gap-8 sm:gap-12 w-full max-w-lg mx-auto", className) }, props, { key: showUsers ? "users" : "form-" + currentStep }),
            React.createElement("header", { className: "text-center animate-stagger-1" },
                React.createElement("h1", { className: "text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white font-light tracking-normal relative", style: {
                        animation: "textGlow 6s ease-in-out infinite"
                    } },
                    "Setup Your Organization",
                    React.createElement("span", { className: "inline-block w-1 h-1 bg-white rounded-full ml-0.5 mr-1", style: {
                            animation: "subtlePulse 4s ease-in-out infinite"
                        }, "aria-hidden": "true" }))),
            React.createElement("main", { ref: containerRef, className: "relative rounded-xl p-8 sm:p-10 border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in hover-lift" },
                isHovering && (React.createElement("div", { className: "absolute inset-0 rounded-xl pointer-events-none smooth-transition", style: getGlassStyle(mousePosition, isHovering), "aria-hidden": "true" })),
                currentStep === 1 ? (React.createElement("div", { className: "relative z-10" },
                    React.createElement("div", { className: "flex flex-col gap-8" },
                        React.createElement("div", { className: "grid gap-4 animate-stagger-2" },
                            React.createElement(label_1.Label, { htmlFor: "universityName", className: "text-white text-sm font-medium smooth-transition" }, "Enter Your Organization Name"),
                            React.createElement("div", { className: "relative" },
                                React.createElement(input_1.Input, { ref: uniNameRef, id: "universityName", name: "universityName", type: "text", required: true, value: formData.universityName, onChange: function (e) { return updateFormData("universityName", e.target.value); }, className: "bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 h-12 px-4 no-outline" }),
                                isUniNameHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(uniNameMousePosition, isUniNameHovering), "aria-hidden": "true" })))),
                        React.createElement("div", { className: "grid gap-4 animate-stagger-3" },
                            React.createElement(label_1.Label, { htmlFor: "location", className: "text-white text-sm font-medium smooth-transition" }, "Enter Your Location"),
                            React.createElement("div", { ref: locationRef, className: "relative" },
                                React.createElement(select_1.Select, { value: formData.location, onValueChange: function (value) { return updateFormData("location", value); }, disabled: loadingCities },
                                    React.createElement(select_1.SelectTrigger, { className: "bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white h-20 px-5 no-outline w-full" },
                                        React.createElement(select_1.SelectValue, { placeholder: loadingCities ? "Loading cities..." : "" })),
                                    React.createElement(select_1.SelectContent, { className: "bg-black border border-white/20 rounded-lg max-h-[200px] overflow-y-auto min-w-[var(--radix-select-trigger-width)]" }, cities.map(function (city) { return (React.createElement(select_1.SelectItem, { key: city, value: city, className: "text-white hover:bg-white/20 hover:text-white focus:bg-white/20 focus:text-white cursor-pointer" }, city)); }))),
                                isLocationHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(locationMousePosition, isLocationHovering), "aria-hidden": "true" })))),
                        React.createElement("div", { className: "flex gap-4 animate-stagger-4" },
                            React.createElement(button_1.Button, { ref: cancelRef, type: "button", variant: "outline", disabled: isLoading, onClick: function () {
                                    sessionStorage.clear();
                                    window.location.href = "/sign-in";
                                }, className: "flex-1 relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 no-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 hover-lift" },
                                isCancelHovering && !isLoading && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(cancelMousePosition, isCancelHovering), "aria-hidden": "true" })),
                                React.createElement("span", { className: "relative z-10 flex-row" }, "Cancel")),
                            React.createElement(button_1.Button, { ref: continueButtonRef, type: "button", onClick: handleNextStep, className: "flex-1 bg-white text-black hover:bg-white/90 smooth-transition rounded-lg h-12 font-medium no-outline hover-lift" }, "Continue"))))) : (React.createElement("form", { onSubmit: handleSubmit, className: "relative z-10", noValidate: true },
                    React.createElement("fieldset", { disabled: isLoading, className: "flex flex-col gap-8 disabled:opacity-75 disabled:pointer-events-none" },
                        React.createElement("legend", { className: "sr-only" }, "Contact details and logo"),
                        React.createElement("div", { className: "grid gap-4 animate-stagger-2" },
                            React.createElement(label_1.Label, { htmlFor: "email", className: "text-white text-sm font-medium smooth-transition" }, "Enter Your Email Address"),
                            React.createElement("div", { className: "relative" },
                                React.createElement(input_1.Input, { ref: emailRef, id: "email", name: "email", type: "email", required: true, value: formData.email, onChange: function (e) { return updateFormData("email", e.target.value); }, className: "bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 h-12 px-4 no-outline" }),
                                isEmailHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(emailMousePosition, isEmailHovering), "aria-hidden": "true" })))),
                        React.createElement("div", { className: "grid gap-4 animate-stagger-3" },
                            React.createElement(label_1.Label, { htmlFor: "contactNumber", className: "text-white text-sm font-medium smooth-transition" }, "Enter Your Contact Number"),
                            React.createElement("div", { className: "relative" },
                                React.createElement(input_1.Input, { ref: contactRef, id: "contactNumber", name: "contactNumber", type: "tel", required: true, value: formData.contactNumber, onChange: function (e) { return updateFormData("contactNumber", e.target.value); }, className: "bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 h-12 px-4 no-outline" }),
                                isContactHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(contactMousePosition, isContactHovering), "aria-hidden": "true" })))),
                        React.createElement("div", { className: "grid gap-4 animate-stagger-4" },
                            React.createElement(label_1.Label, { className: "text-white text-sm font-medium smooth-transition" }, "Enter Your Organization Logo"),
                            !logoFile ? (React.createElement("div", { className: utils_1.cn("relative rounded-xl p-8 text-center smooth-transition cursor-pointer group", "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm", "border border-white/20 hover:border-white/30", "hover:from-white/8 hover:to-white/15", dragActive ? "border-white/50 from-white/10 to-white/20 scale-[1.02]" : ""), onDragEnter: handleDrag, onDragLeave: handleDrag, onDragOver: handleDrag, onDrop: handleDrop, onClick: function () { var _a; return (_a = fileInputRef.current) === null || _a === void 0 ? void 0 : _a.click(); } },
                                React.createElement("div", { className: "flex flex-col items-center gap-4" },
                                    React.createElement("div", { className: utils_1.cn("w-16 h-16 rounded-full flex items-center justify-center smooth-transition", "bg-gradient-to-br from-white/10 to-white/20 backdrop-blur-sm", "group-hover:from-white/15 group-hover:to-white/25", dragActive ? "scale-110 from-white/20 to-white/30" : "") },
                                        React.createElement(lucide_react_1.Upload, { className: utils_1.cn("h-8 w-8 text-white/60 smooth-transition", "group-hover:text-white/80", dragActive ? "text-white scale-110" : "") })),
                                    React.createElement("div", { className: "space-y-2" },
                                        React.createElement("p", { className: "text-white/80 text-base font-medium" }, dragActive ? "Drop your logo here" : "Upload Your Organization Logo"),
                                        React.createElement("div", { className: "flex items-center justify-center gap-2 text-white/40 text-xs" }))),
                                React.createElement("input", { ref: fileInputRef, type: "file", accept: "image/*", onChange: handleFileInputChange, className: "hidden" }))) : (React.createElement("div", { className: "relative border border-white/20 rounded-xl p-6 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm" },
                                React.createElement("div", { className: "flex items-center gap-4" },
                                    React.createElement("div", { className: "w-20 h-20 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center border border-white/20" },
                                        React.createElement("img", { src: logoBase64 || "/placeholder.svg", alt: "University logo preview", className: "w-full h-full object-cover" })),
                                    React.createElement("div", { className: "flex-1" },
                                        React.createElement("p", { className: "text-white text-base font-medium" }, logoFile.name),
                                        React.createElement("p", { className: "text-white/60 text-sm" },
                                            (logoFile.size / 1024 / 1024).toFixed(2),
                                            " MB"),
                                        React.createElement("div", { className: "mt-2" },
                                            React.createElement("div", { className: "w-full bg-white/10 rounded-full h-1.5" },
                                                React.createElement("div", { className: "bg-gradient-to-r from-green-400 to-green-500 h-1.5 rounded-full w-full" })),
                                            React.createElement("p", { className: "text-green-400 text-xs mt-1" }, "Upload complete"))),
                                    React.createElement(button_1.Button, { type: "button", variant: "ghost", size: "sm", onClick: removeLogo, className: "text-white/50 hover:text-white hover:bg-white/10 rounded-lg p-2" },
                                        React.createElement(lucide_react_1.X, { className: "h-5 w-5" })))))),
                        React.createElement("div", { className: "flex gap-4 pt-4" },
                            React.createElement(button_1.Button, { ref: cancelRef, type: "button", variant: "outline", disabled: isLoading, onClick: function () { return setCurrentStep(1); }, className: "flex-1 relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 no-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 hover-lift" },
                                isCancelHovering && !isLoading && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(cancelMousePosition, isCancelHovering), "aria-hidden": "true" })),
                                React.createElement("span", { className: "relative z-10 flex-row" }, "Cancel")),
                            React.createElement(button_1.Button, { ref: submitButtonRef, type: "submit", disabled: isLoading, className: "flex-1 bg-white text-black hover:bg-white/90 smooth-transition rounded-lg h-12 font-medium no-outline disabled:opacity-50 disabled:cursor-not-allowed hover-lift" }, isLoading ? (React.createElement(React.Fragment, null,
                                React.createElement("div", { className: "mr-2 h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" }),
                                React.createElement("span", null, "Setting up..."))) : ("Complete Setup"))))))),
            React.createElement("footer", { className: "text-center text-xs text-white/40 space-y-2 animate-stagger-4" },
                React.createElement("p", null, "\u00A9 2025 Certera. All rights reserved."),
                React.createElement("nav", { "aria-label": "Footer navigation" },
                    React.createElement("div", { className: "flex justify-center gap-4 flex-wrap" },
                        React.createElement("a", { href: "#", className: "hover:text-white/60 smooth-transition no-outline rounded hover-lift" }, "Privacy Policy"),
                        React.createElement("span", { className: "hidden sm:inline", "aria-hidden": "true" }, "\u2022"),
                        React.createElement("a", { href: "#", className: "hover:text-white/60 smooth-transition no-outline rounded hover-lift" }, "Terms of Service"),
                        React.createElement("span", { className: "hidden sm:inline", "aria-hidden": "true" }, "\u2022"),
                        React.createElement("a", { href: "#", className: "hover:text-white/60 smooth-transition no-outline rounded hover-lift" }, "Support")))),
            React.createElement("div", { className: "fixed bottom-6 right-6 z-50" },
                React.createElement(button_1.Button, { ref: viewButtonRef, type: "button", onClick: handleViewUsers, variant: "outline", className: "relative overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 px-6 no-outline disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white/10 hover-lift" },
                    isViewButtonHovering && !isLoading && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(viewButtonMousePosition, isViewButtonHovering), "aria-hidden": "true" })),
                    React.createElement("span", { className: "relative z-10 flex items-center" }, "View Organizations"))))));
}
exports.UniversitySetupForm = UniversitySetupForm;
