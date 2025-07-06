'use client';
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
exports.__esModule = true;
var react_1 = require("react");
var react_dropzone_1 = require("react-dropzone");
var fabricjs_react_1 = require("fabricjs-react");
var fabric = require("fabric");
var lucide_react_1 = require("lucide-react");
function TemplateDesigner(_a) {
    var _this = this;
    var onBack = _a.onBack;
    var _b = react_1.useState(null), template = _b[0], setTemplate = _b[1];
    var _c = react_1.useState(''), degreeName = _c[0], setDegreeName = _c[1];
    var _d = react_1.useState(false), isDegreeSet = _d[0], setIsDegreeSet = _d[1];
    var _e = fabricjs_react_1.useFabricJSEditor(), editor = _e.editor, onReady = _e.onReady;
    // Glass effect states
    var _f = react_1.useState({ x: 0, y: 0 }), degreeInputMousePosition = _f[0], setDegreeInputMousePosition = _f[1];
    var _g = react_1.useState(false), isDegreeInputHovering = _g[0], setIsDegreeInputHovering = _g[1];
    var _h = react_1.useState({ x: 0, y: 0 }), startButtonMousePosition = _h[0], setStartButtonMousePosition = _h[1];
    var _j = react_1.useState(false), isStartButtonHovering = _j[0], setIsStartButtonHovering = _j[1];
    var _k = react_1.useState({ x: 0, y: 0 }), canvasMousePosition = _k[0], setCanvasMousePosition = _k[1];
    var _l = react_1.useState(false), isCanvasHovering = _l[0], setIsCanvasHovering = _l[1];
    var _m = react_1.useState({ x: 0, y: 0 }), uploadMousePosition = _m[0], setUploadMousePosition = _m[1];
    var _o = react_1.useState(false), isUploadHovering = _o[0], setIsUploadHovering = _o[1];
    // Refs for glass effect
    var degreeInputRef = react_1.useRef(null);
    var startButtonRef = react_1.useRef(null);
    var canvasRef = react_1.useRef(null);
    var uploadRef = react_1.useRef(null);
    var _p = react_1.useState(null), originalSize = _p[0], setOriginalSize = _p[1];
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
    var MAX_DISPLAY_WIDTH = 800;
    var MAX_DISPLAY_HEIGHT = 600;
    react_1.useEffect(function () {
        if (!template || !(editor === null || editor === void 0 ? void 0 : editor.canvas))
            return;
        var imgElement = new window.Image();
        imgElement.onload = function () {
            var _a, _b;
            var naturalWidth = imgElement.width;
            var naturalHeight = imgElement.height;
            setOriginalSize({ width: naturalWidth, height: naturalHeight });
            // Calculate scale to fit display area
            var scaleX = MAX_DISPLAY_WIDTH / naturalWidth;
            var scaleY = MAX_DISPLAY_HEIGHT / naturalHeight;
            var displayScale = Math.min(scaleX, scaleY, 1);
            var displayWidth = naturalWidth * displayScale;
            var displayHeight = naturalHeight * displayScale;
            editor.canvas.setWidth(displayWidth);
            editor.canvas.setHeight(displayHeight);
            editor.canvas.clear();
            var imgInstance = new fabric.Image(imgElement, {
                left: 0,
                top: 0,
                selectable: false,
                evented: false,
                hoverCursor: 'default'
            });
            imgInstance.scale(displayScale);
            imgInstance.set({ left: 0, top: 0 });
            editor.canvas.add(imgInstance);
            (_b = (_a = imgInstance).sendToBack) === null || _b === void 0 ? void 0 : _b.call(_a);
            editor.canvas.renderAll();
        };
        imgElement.src = template;
    }, [template, editor]);
    var onDrop = function (acceptedFiles) {
        var file = acceptedFiles[0];
        var reader = new FileReader();
        reader.onload = function () { return setTemplate(reader.result); };
        reader.readAsDataURL(file);
    };
    var addTextField = function (text) {
        if (text === void 0) { text = 'Edit me'; }
        if (!editor)
            return;
        var iText = new fabric.IText(text, {
            left: 100,
            top: 100,
            fontSize: 24,
            fill: '#000',
            backgroundColor: 'rgba(255,255,255,0.5)',
            borderColor: 'gray',
            cornerColor: 'blue',
            cornerSize: 6,
            padding: 5,
            editable: true
        });
        editor.canvas.add(iText);
        editor.canvas.setActiveObject(iText);
        editor.canvas.renderAll();
    };
    var _q = react_dropzone_1.useDropzone({
        onDrop: onDrop,
        multiple: undefined,
        onDragEnter: undefined,
        onDragOver: undefined,
        onDragLeave: undefined
    }), getRootProps = _q.getRootProps, getInputProps = _q.getInputProps;
    var saveTemplateToServer = function () { return __awaiter(_this, void 0, void 0, function () {
        var canvasObjects, elements, backgroundImage, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(editor === null || editor === void 0 ? void 0 : editor.canvas) || !originalSize)
                        return [2 /*return*/];
                    canvasObjects = editor.canvas.getObjects();
                    elements = canvasObjects.map(function (obj) {
                        return {
                            id: obj.id || crypto.randomUUID(),
                            type: obj.type,
                            content: obj.text || '',
                            left: obj.left,
                            top: obj.top,
                            fontSize: obj.fontSize,
                            fill: obj.fill,
                            editable: true,
                            selectable: false
                        };
                    });
                    backgroundImage = template;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, fetch("/api/" + sessionStorage.getItem("userId") + "/template", {
                            method: 'POST',
                            body: JSON.stringify({
                                degreeName: degreeName,
                                elements: elements,
                                backgroundImage: backgroundImage,
                                originalWidth: originalSize.width,
                                originalHeight: originalSize.height
                            }),
                            headers: { 'Content-Type': 'application/json' }
                        })];
                case 2:
                    _a.sent();
                    onBack();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error('Failed to save template:', error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    if (!isDegreeSet) {
        return (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("style", { jsx: true }, "\n          @keyframes slideUp {\n            0% {\n              opacity: 0;\n              transform: translateY(30px) scale(0.95);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0) scale(1);\n            }\n          }\n          @keyframes slideUpStaggered {\n            0% {\n              opacity: 0;\n              transform: translateY(20px);\n            }\n            100% {\n              opacity: 1;\n              transform: translateY(0);\n            }\n          }\n          @keyframes gentleBounce {\n            0%, 100% {\n              transform: translateY(0);\n            }\n            50% {\n              transform: translateY(-2px);\n            }\n          }\n          .animate-fade-in {\n            animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n          }\n          .animate-stagger-1 {\n            animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;\n          }\n          .animate-stagger-2 {\n            animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;\n          }\n          .smooth-transition {\n            transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n          }\n          .hover-lift:hover {\n            transform: translateY(-1px);\n            transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n          }\n          @media (prefers-reduced-motion: reduce) {\n            .animate-fade-in,\n            .animate-stagger-1,\n            .animate-stagger-2,\n            .gentle-bounce {\n              animation: none;\n              opacity: 1;\n              transform: none;\n            }\n            .smooth-transition,\n            .hover-lift:hover {\n              transition: none;\n            }\n          }\n        "),
            react_1["default"].createElement("div", { className: "min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-gray-800 p-4" },
                react_1["default"].createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full space-y-6 border border-white/20 animate-fade-in" },
                    react_1["default"].createElement("div", { className: "text-center animate-stagger-1" },
                        react_1["default"].createElement("div", { className: "w-16 h-16 bg-emerald-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20" },
                            react_1["default"].createElement(lucide_react_1.Sparkles, { className: "w-8 h-8 text-emerald-400" })),
                        react_1["default"].createElement("h2", { className: "text-2xl font-light text-white mb-2 tracking-normal" }, "Create Template"),
                        react_1["default"].createElement("p", { className: "text-white/70 text-sm" }, "Design a new certificate template from scratch")),
                    react_1["default"].createElement("div", { className: "space-y-4 animate-stagger-2" },
                        react_1["default"].createElement("div", { ref: degreeInputRef, onMouseMove: function (e) { return handleMouseMove(e.nativeEvent, setDegreeInputMousePosition, degreeInputRef); }, onMouseEnter: function () { return setIsDegreeInputHovering(true); }, onMouseLeave: function () { return setIsDegreeInputHovering(false); }, className: "relative overflow-hidden rounded-lg" },
                            isDegreeInputHovering && (react_1["default"].createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(degreeInputMousePosition, isDegreeInputHovering), "aria-hidden": "true" })),
                            react_1["default"].createElement("input", { type: "text", placeholder: "Enter Degree Name (e.g., Bachelor of Design)", value: degreeName, onChange: function (e) { return setDegreeName(e.target.value); }, className: "w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 smooth-transition relative z-10" })),
                        react_1["default"].createElement("button", { ref: startButtonRef, onMouseMove: function (e) { return handleMouseMove(e.nativeEvent, setStartButtonMousePosition, startButtonRef); }, onMouseEnter: function () { return setIsStartButtonHovering(true); }, onMouseLeave: function () { return setIsStartButtonHovering(false); }, onClick: function () {
                                if (degreeName.trim())
                                    setIsDegreeSet(true);
                            }, disabled: !degreeName.trim(), className: "relative overflow-hidden w-full bg-emerald-600/20 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-emerald-600/30 hover:border-white/40 smooth-transition disabled:opacity-50 disabled:cursor-not-allowed hover-lift" },
                            isStartButtonHovering && degreeName.trim() && (react_1["default"].createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(startButtonMousePosition, isStartButtonHovering), "aria-hidden": "true" })),
                            react_1["default"].createElement("div", { className: "flex items-center justify-center relative z-10" },
                                react_1["default"].createElement(lucide_react_1.Sparkles, { className: "w-5 h-5 mr-2" }),
                                "Start Designing")),
                        react_1["default"].createElement("button", { onClick: onBack, className: "w-full bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 smooth-transition hover-lift" },
                            react_1["default"].createElement("div", { className: "flex items-center justify-center" },
                                react_1["default"].createElement(lucide_react_1.ArrowLeft, { className: "w-5 h-5 mr-2" }),
                                "Back to Home")))))));
    }
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("style", { jsx: true }, "\n        @keyframes slideInLeft {\n          0% {\n            opacity: 0;\n            transform: translateX(-30px);\n          }\n          100% {\n            opacity: 1;\n            transform: translateX(0);\n          }\n        }\n        @keyframes slideInRight {\n          0% {\n            opacity: 0;\n            transform: translateX(30px);\n          }\n          100% {\n            opacity: 1;\n            transform: translateX(0);\n          }\n        }\n        .animate-slide-left {\n          animation: slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n        }\n        .animate-slide-right {\n          animation: slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;\n        }\n        .smooth-transition {\n          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .hover-lift:hover {\n          transform: translateY(-1px);\n          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .animate-slide-left,\n          .animate-slide-right {\n            animation: none;\n            opacity: 1;\n            transform: none;\n          }\n          .smooth-transition,\n          .hover-lift:hover {\n            transition: none;\n          }\n        }\n      "),
        react_1["default"].createElement("div", { className: "flex flex-col lg:flex-row gap-6 p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen" },
            react_1["default"].createElement("div", { className: "w-full lg:w-80 bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6 border border-white/20 animate-slide-left" },
                react_1["default"].createElement("div", { className: "text-center" },
                    react_1["default"].createElement("div", { className: "w-16 h-16 bg-emerald-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20" },
                        react_1["default"].createElement(lucide_react_1.Palette, { className: "w-8 h-8 text-emerald-400" })),
                    react_1["default"].createElement("h2", { className: "text-xl font-light text-white mb-2 tracking-normal" }, "Template Designer"),
                    react_1["default"].createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20" },
                        react_1["default"].createElement("p", { className: "text-sm text-white/70 mb-1" }, "Creating Template"),
                        react_1["default"].createElement("p", { className: "text-emerald-400 font-medium" }, degreeName))),
                react_1["default"].createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20" },
                    react_1["default"].createElement("h3", { className: "text-white font-medium mb-3 flex items-center" },
                        react_1["default"].createElement(lucide_react_1.Type, { className: "w-4 h-4 mr-2 text-emerald-400" }),
                        "Add Elements"),
                    react_1["default"].createElement("div", { className: "space-y-2" },
                        react_1["default"].createElement("button", { onClick: function () { return addTextField('Certificate Title'); }, className: "w-full bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 smooth-transition hover-lift text-sm" },
                            react_1["default"].createElement(lucide_react_1.Type, { className: "w-4 h-4 mr-2 inline" }),
                            " Title"),
                        react_1["default"].createElement("button", { onClick: function () { return addTextField('Text Field'); }, className: "w-full bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 smooth-transition hover-lift text-sm" },
                            react_1["default"].createElement(lucide_react_1.Type, { className: "w-4 h-4 mr-2 inline" }),
                            " Text Field"))),
                react_1["default"].createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20" },
                    react_1["default"].createElement("h3", { className: "text-white font-medium mb-3 flex items-center" },
                        react_1["default"].createElement(lucide_react_1.UploadCloud, { className: "w-4 h-4 mr-2 text-emerald-400" }),
                        "Background Image"),
                    react_1["default"].createElement("div", __assign({ ref: uploadRef, onMouseMove: function (e) { return handleMouseMove(e.nativeEvent, setUploadMousePosition, uploadRef); }, onMouseEnter: function () { return setIsUploadHovering(true); }, onMouseLeave: function () { return setIsUploadHovering(false); } }, getRootProps(), { className: "relative overflow-hidden flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-white/20 rounded-lg cursor-pointer hover:border-white/40 hover:bg-white/5 text-center smooth-transition" }),
                        isUploadHovering && (react_1["default"].createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(uploadMousePosition, isUploadHovering), "aria-hidden": "true" })),
                        react_1["default"].createElement("input", __assign({}, getInputProps())),
                        react_1["default"].createElement("div", { className: "relative z-10" },
                            react_1["default"].createElement(lucide_react_1.UploadCloud, { className: "w-6 h-6 text-white/60 mb-2 mx-auto" }),
                            react_1["default"].createElement("p", { className: "text-sm text-white/60" }, "Drop or select image")))),
                react_1["default"].createElement("div", { className: "space-y-3" },
                    react_1["default"].createElement("button", { onClick: function () {
                            setIsDegreeSet(false);
                            setTemplate(null);
                        }, className: "w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift" },
                        react_1["default"].createElement("div", { className: "flex items-center justify-center" },
                            react_1["default"].createElement(lucide_react_1.RotateCcw, { className: "w-4 h-4 mr-2" }),
                            "Change Degree")),
                    react_1["default"].createElement("button", { onClick: function () {
                            if (editor === null || editor === void 0 ? void 0 : editor.canvas) {
                                var activeObject = editor.canvas.getActiveObject();
                                if (activeObject) {
                                    editor.canvas.remove(activeObject);
                                    editor.canvas.renderAll();
                                }
                            }
                        }, className: "w-full bg-red-500/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-red-500/30 hover:border-white/40 smooth-transition hover-lift" },
                        react_1["default"].createElement(lucide_react_1.Trash2, { className: "w-4 h-4 mr-2 inline" }),
                        "Delete Selected"),
                    react_1["default"].createElement("button", { onClick: saveTemplateToServer, className: "w-full bg-emerald-600/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-emerald-600/30 hover:border-white/40 smooth-transition hover-lift" },
                        react_1["default"].createElement(lucide_react_1.Save, { className: "w-4 h-4 mr-2 inline" }),
                        "Save Template"),
                    react_1["default"].createElement("button", { onClick: onBack, className: "w-full bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 smooth-transition hover-lift" },
                        react_1["default"].createElement("div", { className: "flex items-center justify-center" },
                            react_1["default"].createElement(lucide_react_1.ArrowLeft, { className: "w-5 h-5 mr-2" }),
                            "Back to Home")))),
            react_1["default"].createElement("div", { className: "flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-slide-right" },
                react_1["default"].createElement("div", { className: "flex justify-between items-center mb-6" },
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement("h2", { className: "text-xl font-light text-white tracking-normal" }, "Design Canvas"),
                        react_1["default"].createElement("p", { className: "text-white/70 text-sm mt-1" },
                            "Template: ",
                            degreeName)),
                    react_1["default"].createElement("div", { className: "flex items-center space-x-4" },
                        react_1["default"].createElement("div", { className: "flex items-center space-x-2" },
                            react_1["default"].createElement("div", { className: "w-3 h-3 bg-emerald-400 rounded-full animate-pulse" }),
                            react_1["default"].createElement("span", { className: "text-emerald-400 text-sm font-medium" }, "Live Design")))),
                react_1["default"].createElement("div", { ref: canvasRef, onMouseMove: function (e) { return handleMouseMove(e.nativeEvent, setCanvasMousePosition, canvasRef); }, onMouseEnter: function () { return setIsCanvasHovering(true); }, onMouseLeave: function () { return setIsCanvasHovering(false); }, className: "relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 smooth-transition hover:border-white/40 hover-lift" },
                    isCanvasHovering && (react_1["default"].createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(canvasMousePosition, isCanvasHovering), "aria-hidden": "true" })),
                    react_1["default"].createElement("div", { className: "relative z-10" },
                        react_1["default"].createElement(fabricjs_react_1.FabricJSCanvas, { className: "canvas rounded-md", onReady: onReady })))))));
}
exports["default"] = TemplateDesigner;
