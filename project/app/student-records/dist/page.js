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
var button_1 = require("@/components/ui/button");
var input_1 = require("@/components/ui/input");
var navigation_1 = require("next/navigation");
function StudentRecordsPage() {
    var _this = this;
    var router = navigation_1.useRouter();
    var _a = react_1.useState([]), degrees = _a[0], setDegrees = _a[1];
    var _b = react_1.useState([]), students = _b[0], setStudents = _b[1];
    var _c = react_1.useState(null), selectedDegree = _c[0], setSelectedDegree = _c[1];
    var _d = react_1.useState(true), loading = _d[0], setLoading = _d[1];
    var _e = react_1.useState(false), loadingStudents = _e[0], setLoadingStudents = _e[1];
    var _f = react_1.useState(""), searchTerm = _f[0], setSearchTerm = _f[1];
    var _g = react_1.useState({ x: 0, y: 0 }), mousePosition = _g[0], setMousePosition = _g[1];
    var _h = react_1.useState(false), isHovering = _h[0], setIsHovering = _h[1];
    var _j = react_1.useState({ x: 0, y: 0 }), backButtonMousePosition = _j[0], setBackButtonMousePosition = _j[1];
    var _k = react_1.useState(false), isBackButtonHovering = _k[0], setIsBackButtonHovering = _k[1];
    var _l = react_1.useState({ x: 0, y: 0 }), searchMousePosition = _l[0], setSearchMousePosition = _l[1];
    var _m = react_1.useState(false), isSearchHovering = _m[0], setIsSearchHovering = _m[1];
    var containerRef = react_1.useRef(null);
    var backButtonRef = react_1.useRef(null);
    var searchRef = react_1.useRef(null);
    react_1.useEffect(function () {
        var userId = sessionStorage.getItem('userId');
        if (!userId) {
            router.push('/');
            sessionStorage.clear();
            localStorage.clear();
        }
    }, [router]);
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
            backButton: backButtonRef.current,
            search: searchRef.current
        };
        var handlers = {
            container: {
                mousemove: function (e) { return handleMouseMove(e, setMousePosition, containerRef); },
                mouseenter: function () { return setIsHovering(true); },
                mouseleave: function () { return setIsHovering(false); }
            },
            backButton: {
                mousemove: function (e) { return handleMouseMove(e, setBackButtonMousePosition, backButtonRef); },
                mouseenter: function () { return setIsBackButtonHovering(true); },
                mouseleave: function () { return setIsBackButtonHovering(false); }
            },
            search: {
                mousemove: function (e) { return handleMouseMove(e, setSearchMousePosition, searchRef); },
                mouseenter: function () { return setIsSearchHovering(true); },
                mouseleave: function () { return setIsSearchHovering(false); }
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
    var getGlassStyle = react_1.useMemo(function () {
        return function (mousePos, isVisible) {
            if (!isVisible)
                return {};
            return {
                background: "\n          radial-gradient(ellipse 100px 60px at " + mousePos.x + "px " + mousePos.y + "px, \n            rgba(255,255,255,0.18) 0%, \n            rgba(255,255,255,0.08) 30%, \n            rgba(255,255,255,0.04) 50%, \n            transparent 70%),\n          radial-gradient(ellipse 50px 30px at " + (mousePos.x - 15) + "px " + (mousePos.y - 10) + "px, \n            rgba(255,255,255,0.22) 0%, \n            rgba(255,255,255,0.1) 40%, \n            transparent 70%)\n        ",
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
        var fetchDegrees = function () { return __awaiter(_this, void 0, void 0, function () {
            var userId, response, data, courses, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = sessionStorage.getItem('userId');
                        if (!userId)
                            return [2 /*return*/];
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, 5, 6]);
                        return [4 /*yield*/, fetch("/api/record/get-courses", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({ userId: userId })
                            })];
                    case 2:
                        response = _a.sent();
                        if (!response.ok) {
                            console.error("Failed to fetch courses");
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, response.json()];
                    case 3:
                        data = _a.sent();
                        courses = data.courses.map(function (course, index) { return ({
                            id: index + 1,
                            degreeName: course.courseName,
                            studentCount: course.studentCount
                        }); });
                        setDegrees(courses);
                        return [3 /*break*/, 6];
                    case 4:
                        error_1 = _a.sent();
                        console.error("Error fetching courses:", error_1);
                        return [3 /*break*/, 6];
                    case 5:
                        setLoading(false);
                        return [7 /*endfinally*/];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        fetchDegrees();
    }, []);
    var handleDegreeClick = function (degree) { return __awaiter(_this, void 0, void 0, function () {
        var userId, response, data, mappedStudents, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setLoadingStudents(true);
                    setSelectedDegree(degree);
                    setSearchTerm("");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    userId = sessionStorage.getItem("userId");
                    if (!userId)
                        return [2 /*return*/];
                    return [4 /*yield*/, fetch("/api/record/get-records", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                userId: userId,
                                courseId: degree.id.toString()
                            })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        console.error("Failed to fetch student records");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    data = _a.sent();
                    mappedStudents = data.candidates.map(function (candidate) { return ({
                        id: candidate._id,
                        studentName: candidate.candidateName,
                        nicNumber: candidate.nicNumber,
                        dateIssued: candidate.dateIssued,
                        hashNo: candidate.blockHash
                    }); });
                    setStudents(mappedStudents);
                    return [3 /*break*/, 6];
                case 4:
                    err_1 = _a.sent();
                    console.error("Error fetching student data:", err_1);
                    return [3 /*break*/, 6];
                case 5:
                    setLoadingStudents(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var handleBackToDegrees = function () {
        setSelectedDegree(null);
        setStudents([]);
        setSearchTerm("");
    };
    var handleBackToHome = function () {
        router.push("/home");
    };
    var filteredStudents = students.filter(function (student) {
        return student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.nicNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
            student.hashNo.toLowerCase().includes(searchTerm.toLowerCase());
    });
    if (selectedDegree) {
        return (React.createElement(React.Fragment, null,
            React.createElement("style", { jsx: true }, "\n          @keyframes textGlow {\n            0%, 100% { text-shadow: 0 0 0px rgba(255, 255, 255, 0); }\n            50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }\n          }\n          @keyframes subtlePulse {\n            0%, 100% { transform: scale(1); opacity: 0.8; }\n            50% { transform: scale(1.1); opacity: 1; }\n          }\n          @keyframes slideUp {\n            0% { opacity: 0; transform: translateY(30px) scale(0.95); }\n            100% { opacity: 1; transform: translateY(0) scale(1); }\n          }\n          @keyframes slideUpStaggered {\n            0% { opacity: 0; transform: translateY(20px); }\n            100% { opacity: 1; transform: translateY(0); }\n          }\n          @keyframes gentleBounce {\n            0%, 100% { transform: translateY(0); }\n            50% { transform: translateY(-2px); }\n          }\n          .animate-fade-in { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }\n          .animate-stagger-1 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }\n          .animate-stagger-2 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }\n          .animate-stagger-3 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }\n          .animate-stagger-4 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }\n          .hover-lift:hover { transform: translateY(-1px); transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); }\n          .gentle-bounce { animation: gentleBounce 3s ease-in-out infinite; }\n          .smooth-transition { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }\n          .no-outline:focus, .no-outline:focus-visible { outline: none !important; box-shadow: none !important; }\n          input:focus, button:focus, a:focus, input:focus-visible, button:focus-visible, a:focus-visible {\n            outline: none !important; box-shadow: none !important;\n          }\n        "),
            React.createElement("div", { className: "min-h-screen bg-black" },
                React.createElement("div", { className: "container mx-auto px-4 py-8" },
                    React.createElement("div", { className: "max-w-7xl mx-auto" },
                        React.createElement("div", { className: "mb-8 animate-stagger-1" },
                            React.createElement("div", { className: "flex gap-4 mb-6" },
                                React.createElement(button_1.Button, { onClick: handleBackToDegrees, variant: "outline", className: "bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 text-white hover:text-white smooth-transition hover-lift" },
                                    React.createElement(lucide_react_1.ArrowLeft, { className: "h-4 w-4 mr-2" }),
                                    "Back to Degrees")),
                            React.createElement("div", { className: "text-center" },
                                React.createElement("h1", { className: "text-3xl md:text-4xl text-white font-light tracking-normal mb-2", style: { animation: "textGlow 6s ease-in-out infinite" } },
                                    selectedDegree.degreeName,
                                    React.createElement("span", { className: "inline-block w-1 h-1 bg-white rounded-full ml-1", style: { animation: "subtlePulse 4s ease-in-out infinite" }, "aria-hidden": "true" })),
                                React.createElement("p", { className: "text-white/70 text-lg" }, "Student Records & Certificates"))),
                        React.createElement("main", { ref: containerRef, className: "relative rounded-xl p-8 overflow-visible border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in hover-lift" },
                            isHovering && (React.createElement("div", { className: "absolute inset-0 rounded-xl pointer-events-none smooth-transition", style: getGlassStyle(mousePosition, isHovering), "aria-hidden": "true" })),
                            React.createElement("div", { className: "relative z-10" },
                                React.createElement("div", { className: "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 animate-stagger-2" },
                                    React.createElement("div", { className: "flex items-center gap-2" },
                                        React.createElement(lucide_react_1.Users, { className: "h-5 w-5 text-white/70" }),
                                        React.createElement("span", { className: "text-white/70 font-medium" }, searchTerm
                                            ? filteredStudents.length + " of " + students.length + " students"
                                            : students.length + " students enrolled")),
                                    React.createElement("div", { className: "relative max-w-sm" },
                                        React.createElement(lucide_react_1.Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/50" }),
                                        React.createElement(input_1.Input, { ref: searchRef, type: "text", placeholder: "Search students...", value: searchTerm, onChange: function (e) { return setSearchTerm(e.target.value); }, className: "bg-transparent border border-white/20 focus:border-white/40 smooth-transition rounded-lg text-white placeholder:text-white/50 pl-10 h-12 no-outline" }),
                                        isSearchHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(searchMousePosition, isSearchHovering), "aria-hidden": "true" })))),
                                loadingStudents ? (React.createElement("div", { className: "text-center py-16 animate-stagger-3" },
                                    React.createElement("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto mb-4" }),
                                    React.createElement("p", { className: "text-white/70" }, "Loading students..."))) : (React.createElement("div", { className: "overflow-x-auto animate-stagger-3" },
                                    React.createElement("table", { className: "w-full" },
                                        React.createElement("thead", null,
                                            React.createElement("tr", { className: "border-b border-white/20" },
                                                React.createElement("th", { className: "text-left text-white font-semibold py-4 px-4" }, "Student Name"),
                                                React.createElement("th", { className: "text-left text-white font-semibold py-4 px-4" }, "NIC Number"),
                                                React.createElement("th", { className: "text-left text-white font-semibold py-4 px-4" }, "Date Issued"),
                                                React.createElement("th", { className: "text-left text-white font-semibold py-4 px-4" }, "Certificate Hash"),
                                                React.createElement("th", { className: "text-left text-white font-semibold py-4 px-4" }, "View Details"))),
                                        React.createElement("tbody", null, filteredStudents.map(function (student, index) { return (React.createElement("tr", { key: student.id, className: "hover:bg-white/5 smooth-transition " + (index !== filteredStudents.length - 1 ? "border-b border-white/10" : "") },
                                            React.createElement("td", { className: "py-4 px-4" },
                                                React.createElement("div", { className: "flex items-center gap-3" },
                                                    React.createElement("div", { className: "h-8 w-8 bg-white/10 rounded-full flex items-center justify-center" },
                                                        React.createElement(lucide_react_1.FileText, { className: "h-4 w-4 text-white/70" })),
                                                    React.createElement("span", { className: "font-medium text-white" }, student.studentName))),
                                            React.createElement("td", { className: "text-white/60 py-4 px-4" }, student.nicNumber),
                                            React.createElement("td", { className: "text-white/60 py-4 px-4" }, new Date(student.dateIssued).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "short",
                                                day: "numeric"
                                            })),
                                            React.createElement("td", { className: "text-white/60 py-4 px-4" },
                                                React.createElement("code", { className: "bg-white/10 px-2 py-1 rounded text-sm font-mono text-white/80" }, student.hashNo)),
                                            React.createElement("td", { className: "text-white/60 py-4 px-4" },
                                                React.createElement("a", { href: "/certificate/" + student.hashNo, target: "_blank", rel: "noopener noreferrer", className: "inline-flex items-center justify-center p-1 rounded hover:bg-white/10 transition-colors", title: "View Certificate" },
                                                    React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 2 },
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
                                                        React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M2.458 12C3.732 7.943 7.523 5 12 5s8.268 2.943 9.542 7c-1.274 4.057-5.065 7-9.542 7s-8.268-2.943-9.542-7z" })))))); }))),
                                    filteredStudents.length === 0 && searchTerm && (React.createElement("div", { className: "text-center py-12" },
                                        React.createElement("div", { className: "h-12 w-12 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4" },
                                            React.createElement(lucide_react_1.Search, { className: "h-6 w-6 text-white/50" })),
                                        React.createElement("p", { className: "text-white/70 text-lg mb-2" }, "No students found"),
                                        React.createElement("p", { className: "text-white/50 text-sm" },
                                            "No students match your search for \"",
                                            searchTerm,
                                            "\""))))))))))));
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { jsx: true }, "\n        @keyframes textGlow {\n          0%, 100% { text-shadow: 0 0 0px rgba(255, 255, 255, 0); }\n          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.1); }\n        }\n        @keyframes subtlePulse {\n          0%, 100% { transform: scale(1); opacity: 0.8; }\n          50% { transform: scale(1.1); opacity: 1; }\n        }\n        @keyframes slideUp {\n          0% { opacity: 0; transform: translateY(30px) scale(0.95); }\n          100% { opacity: 1; transform: translateY(0) scale(1); }\n        }\n        @keyframes slideUpStaggered {\n          0% { opacity: 0; transform: translateY(20px); }\n          100% { opacity: 1; transform: translateY(0); }\n        }\n        @keyframes gentleBounce {\n          0%, 100% { transform: translateY(0); }\n          50% { transform: translateY(-2px); }\n        }\n        .animate-fade-in { animation: slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }\n        .animate-stagger-1 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both; }\n        .animate-stagger-2 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both; }\n        .animate-stagger-3 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both; }\n        .animate-stagger-4 { animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both; }\n        .hover-lift:hover { transform: translateY(-1px); transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1); }\n        .gentle-bounce { animation: gentleBounce 3s ease-in-out infinite; }\n        .smooth-transition { transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1); }\n        .no-outline:focus, .no-outline:focus-visible { outline: none !important; box-shadow: none !important; }\n        input:focus, button:focus, a:focus, input:focus-visible, button:focus-visible, a:focus-visible {\n          outline: none !important; box-shadow: none !important;\n        }\n      "),
        React.createElement("div", { className: "min-h-screen bg-black" },
            React.createElement("div", { className: "container mx-auto px-4 py-8" },
                React.createElement("div", { className: "max-w-6xl mx-auto" },
                    React.createElement("div", { className: "mb-6" },
                        React.createElement(button_1.Button, { ref: backButtonRef, onClick: handleBackToHome, className: "overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/15 hover:backdrop-blur-lg smooth-transition rounded-lg text-white hover:text-white h-12 no-outline hover-lift" },
                            isBackButtonHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(backButtonMousePosition, isBackButtonHovering), "aria-hidden": "true" })),
                            React.createElement("span", { className: "relative z-10 flex items-center" },
                                React.createElement(lucide_react_1.ArrowLeft, { className: "h-4 w-4 mr-2" }),
                                "Back to Home"))),
                    React.createElement("header", { className: "text-center mb-12 animate-stagger-1" },
                        React.createElement("h1", { className: "text-4xl md:text-5xl text-white font-light tracking-normal mb-4", style: { animation: "textGlow 6s ease-in-out infinite" } },
                            "Student Records",
                            React.createElement("span", { className: "inline-block w-1 h-1 bg-white rounded-full ml-1", style: { animation: "subtlePulse 4s ease-in-out infinite" }, "aria-hidden": "true" })),
                        React.createElement("p", { className: "text-white/70 text-xl" }, "Select a degree program to view student records and certificates")),
                    React.createElement("main", { ref: containerRef, className: "relative rounded-xl p-8 overflow-visible border border-white/20 smooth-transition backdrop-blur-sm animate-fade-in hover-lift" },
                        isHovering && (React.createElement("div", { className: "absolute inset-0 rounded-xl pointer-events-none smooth-transition", style: getGlassStyle(mousePosition, isHovering), "aria-hidden": "true" })),
                        React.createElement("div", { className: "relative z-10" },
                            React.createElement("div", { className: "flex items-center gap-2 mb-6 animate-stagger-2" },
                                React.createElement(lucide_react_1.GraduationCap, { className: "h-5 w-5 text-white/70" }),
                                React.createElement("span", { className: "text-white/70 font-medium" },
                                    "Available Degree Programs (",
                                    degrees.length,
                                    ")")),
                            loading ? (React.createElement("div", { className: "text-center py-16 animate-stagger-3" },
                                React.createElement("div", { className: "h-8 w-8 animate-spin rounded-full border-2 border-white/30 border-t-white mx-auto mb-4" }),
                                React.createElement("p", { className: "text-white/70" }, "Loading degree programs..."))) : (React.createElement("div", { className: "grid gap-4 md:gap-6 animate-stagger-3" }, degrees.map(function (degree) { return (React.createElement("div", { key: degree.id, onClick: function () { return handleDegreeClick(degree); }, className: "cursor-pointer p-6 border border-white/20 rounded-lg hover:bg-white/5 smooth-transition hover-lift" },
                                React.createElement("div", { className: "flex justify-between items-center" },
                                    React.createElement("div", { className: "flex-1" },
                                        React.createElement("h3", { className: "text-xl font-semibold text-white mb-2" }, degree.degreeName),
                                        React.createElement("div", { className: "flex items-center gap-2 text-white/60" },
                                            React.createElement(lucide_react_1.Users, { className: "h-4 w-4" }),
                                            React.createElement("span", { className: "text-sm" },
                                                degree.studentCount,
                                                " students enrolled"))),
                                    React.createElement("div", { className: "text-white/40 hover:text-white/70 smooth-transition" },
                                        React.createElement("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24" },
                                            React.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" })))))); }))))),
                    React.createElement("footer", { className: "text-center text-xs text-white/40 space-y-2 mt-8 animate-stagger-4" },
                        React.createElement("p", null, "\u00A9 2025 Certera. All rights reserved.")))))));
}
exports["default"] = StudentRecordsPage;
