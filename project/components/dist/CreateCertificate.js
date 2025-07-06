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
var fabricjs_react_1 = require("fabricjs-react");
var fabric = require("fabric");
var lucide_react_1 = require("lucide-react");
var jspdf_1 = require("jspdf");
var react_dropzone_1 = require("react-dropzone");
var mintCertificate_1 = require("@/lib/mintCertificate");
var metadataBuilder_1 = require("@/utils/metadataBuilder");
var react_2 = require("@meshsdk/react");
var react_qr_code_1 = require("react-qr-code");
var client_1 = require("react-dom/client");
function CreateCertificate(_a) {
    var _this = this;
    var onBack = _a.onBack;
    var _b = react_1.useState([]), degrees = _b[0], setDegrees = _b[1];
    var _c = react_1.useState(''), selectedDegree = _c[0], setSelectedDegree = _c[1];
    var _d = react_1.useState(null), template = _d[0], setTemplate = _d[1];
    var _e = react_1.useState([]), elements = _e[0], setElements = _e[1];
    var _f = react_1.useState(false), isDegreeSet = _f[0], setIsDegreeSet = _f[1];
    var _g = react_1.useState(false), isLoading = _g[0], setIsLoading = _g[1];
    var _h = react_1.useState(null), originalSize = _h[0], setOriginalSize = _h[1];
    var _j = react_1.useState(false), showForm = _j[0], setShowForm = _j[1];
    var _k = react_1.useState({
        username: '',
        nic: '',
        degree: '',
        dateIssued: new Date().toISOString().split('T')[0]
    }), formData = _k[0], setFormData = _k[1];
    var _l = react_1.useState(null), activeTextObject = _l[0], setActiveTextObject = _l[1];
    var _m = react_1.useState(false), showInputDropdown = _m[0], setShowInputDropdown = _m[1];
    var _o = react_1.useState(''), customInputValue = _o[0], setCustomInputValue = _o[1];
    var dropdownRef = react_1.useRef(null);
    var _p = react_1.useState(null), txHash = _p[0], setTxHash = _p[1];
    var _q = react_1.useState(false), isSubmitting = _q[0], setIsSubmitting = _q[1];
    var _r = react_1.useState(false), showQRCodeModal = _r[0], setShowQRCodeModal = _r[1];
    var _s = react_1.useState(false), qrCodePlaced = _s[0], setQrCodePlaced = _s[1];
    var _t = react_2.useWallet(), wallet = _t.wallet, connected = _t.connected;
    // Glass effect states
    var _u = react_1.useState({ x: 0, y: 0 }), selectorMousePosition = _u[0], setSelectorMousePosition = _u[1];
    var _v = react_1.useState(false), isSelectorHovering = _v[0], setIsSelectorHovering = _v[1];
    var _w = react_1.useState({ x: 0, y: 0 }), loadButtonMousePosition = _w[0], setLoadButtonMousePosition = _w[1];
    var _x = react_1.useState(false), isLoadButtonHovering = _x[0], setIsLoadButtonHovering = _x[1];
    var _y = react_1.useState({ x: 0, y: 0 }), canvasMousePosition = _y[0], setCanvasMousePosition = _y[1];
    var _z = react_1.useState(false), isCanvasHovering = _z[0], setIsCanvasHovering = _z[1];
    var _0 = react_1.useState(false), exported = _0[0], setExported = _0[1];
    var selectorRef = react_1.useRef(null);
    var loadButtonRef = react_1.useRef(null);
    var canvasRef = react_1.useRef(null);
    var _1 = fabricjs_react_1.useFabricJSEditor(), editor = _1.editor, onReady = _1.onReady;
    var MAX_DISPLAY_WIDTH = 800;
    var MAX_DISPLAY_HEIGHT = 600;
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
        var handleClickOutside = function (event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowInputDropdown(false);
                if (activeTextObject) {
                    activeTextObject.exitEditing();
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return function () {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activeTextObject]);
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
    react_1.useEffect(function () {
        setIsLoading(true);
        fetch("/api/" + sessionStorage.getItem("userId") + "/template")
            .then(function (res) { return res.json(); })
            .then(function (data) {
            var names = data.map(function (t) { return t.degreeName; });
            setDegrees(names);
        })["catch"](function (err) { return console.error('Failed to load degrees:', err); })["finally"](function () { return setIsLoading(false); });
    }, []);
    var onDrop = function (acceptedFiles) {
        var file = acceptedFiles[0];
        var reader = new FileReader();
        reader.onload = function () { return setTemplate(reader.result); };
        reader.readAsDataURL(file);
    };
    var _2 = react_dropzone_1.useDropzone({
        onDrop: onDrop,
        multiple: undefined,
        onDragEnter: undefined,
        onDragOver: undefined,
        onDragLeave: undefined
    }), getRootProps = _2.getRootProps, getInputProps = _2.getInputProps;
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setFormData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    var handleLoadTemplate = function () {
        if (!selectedDegree)
            return;
        setFormData(function (prev) { return (__assign(__assign({}, prev), { degree: selectedDegree })); });
        setShowForm(true);
    };
    var loadTemplate = function () { return __awaiter(_this, void 0, void 0, function () {
        var res, data, processedElements, img_1, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setIsLoading(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, 5, 6]);
                    return [4 /*yield*/, fetch("/api/" + sessionStorage.getItem("userId") + "/template/" + encodeURIComponent(selectedDegree))];
                case 2:
                    res = _a.sent();
                    if (!res.ok) {
                        throw new Error('Template not found');
                    }
                    return [4 /*yield*/, res.json()];
                case 3:
                    data = _a.sent();
                    setTemplate(data.backgroundImage || null);
                    processedElements = data.elements.map(function (el) {
                        var isPlaceholder = false;
                        var placeholderType;
                        if (el.content.includes('{{username}}')) {
                            isPlaceholder = true;
                            placeholderType = 'username';
                            el.content = formData.username;
                        }
                        else if (el.content.includes('{{nic}}')) {
                            isPlaceholder = true;
                            placeholderType = 'nic';
                            el.content = formData.nic;
                        }
                        else if (el.content.includes('{{degree}}')) {
                            isPlaceholder = true;
                            placeholderType = 'degree';
                            el.content = formData.degree;
                        }
                        else if (el.content.includes('{{date}}')) {
                            isPlaceholder = true;
                            placeholderType = 'date';
                            el.content = formData.dateIssued;
                        }
                        else if (el.content.includes('{{')) {
                            isPlaceholder = true;
                            placeholderType = 'custom';
                        }
                        return __assign(__assign({}, el), { isPlaceholder: isPlaceholder,
                            placeholderType: placeholderType, editable: true, selectable: true });
                    });
                    setElements(processedElements || []);
                    setIsDegreeSet(true);
                    setShowForm(false);
                    img_1 = new Image();
                    img_1.onload = function () {
                        setOriginalSize({ width: img_1.width, height: img_1.height });
                    };
                    img_1.src = data.backgroundImage;
                    return [3 /*break*/, 6];
                case 4:
                    error_1 = _a.sent();
                    console.error('Error loading template:', error_1);
                    alert('Template not found');
                    return [3 /*break*/, 6];
                case 5:
                    setIsLoading(false);
                    return [7 /*endfinally*/];
                case 6: return [2 /*return*/];
            }
        });
    }); };
    var getDropdownPosition = react_1.useCallback(function () {
        if (!activeTextObject || !(editor === null || editor === void 0 ? void 0 : editor.canvas) || !canvasRef.current)
            return { top: 0, left: 0 };
        var canvasRect = canvasRef.current.getBoundingClientRect();
        var textCoords = activeTextObject.calcTransformMatrix();
        var top = textCoords[5] + activeTextObject.getScaledHeight() + 100;
        var left = textCoords[4];
        return {
            top: top + "px",
            left: left + "px"
        };
    }, [activeTextObject, editor]);
    var handleSelectInput = function (type, value) {
        if (!activeTextObject || !(editor === null || editor === void 0 ? void 0 : editor.canvas))
            return;
        var newText = '';
        switch (type) {
            case 'username':
                newText = formData.username;
                break;
            case 'nic':
                newText = formData.nic;
                break;
            case 'degree':
                newText = formData.degree;
                break;
            case 'date':
                newText = formData.dateIssued;
                break;
            case 'custom':
                newText = value || customInputValue;
                break;
        }
        activeTextObject.set('text', newText);
        editor.canvas.renderAll();
        setShowInputDropdown(false);
        activeTextObject.exitEditing();
    };
    react_1.useEffect(function () {
        if (!template || !(editor === null || editor === void 0 ? void 0 : editor.canvas) || !originalSize)
            return;
        var imgElement = new window.Image();
        imgElement.onload = function () {
            var _a, _b;
            var naturalWidth = imgElement.width;
            var naturalHeight = imgElement.height;
            var scaleX = MAX_DISPLAY_WIDTH / naturalWidth;
            var scaleY = MAX_DISPLAY_HEIGHT / naturalHeight;
            var isWidthConstrained = scaleX < scaleY;
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
            displayScale = isWidthConstrained ? 1 : 1;
            elements.forEach(function (element) {
                if (element.type === 'i-text') {
                    var scaledLeft = element.left * displayScale;
                    var scaledTop = element.top * displayScale;
                    var scaledFontSize = element.fontSize * displayScale;
                    var iText_1 = new fabric.IText(element.content, {
                        left: scaledLeft,
                        top: scaledTop,
                        fontSize: scaledFontSize,
                        fill: element.fill,
                        backgroundColor: 'rgba(255,255,255,0.5)',
                        borderColor: 'gray',
                        cornerColor: 'blue',
                        cornerSize: 6,
                        padding: 5,
                        editable: true,
                        selectable: true,
                        lockMovementX: true,
                        lockMovementY: true,
                        lockScalingX: true,
                        lockScalingY: true,
                        lockRotation: true,
                        hoverCursor: 'text',
                        hasControls: false,
                        hasBorders: false,
                        data: {
                            isPlaceholder: element.isPlaceholder,
                            placeholderType: element.placeholderType,
                            originalContent: element.content
                        }
                    });
                    iText_1.on('editing:entered', function () {
                        setActiveTextObject(iText_1);
                        setShowInputDropdown(true);
                        setCustomInputValue(iText_1.text || '');
                    });
                    iText_1.on('editing:exited', function () {
                        setShowInputDropdown(false);
                        setActiveTextObject(null);
                    });
                    editor.canvas.add(iText_1);
                }
            });
            editor.canvas.renderAll();
        };
        imgElement.src = template;
    }, [template, editor, elements, originalSize]);
    var handleSubmitToBlockchain = function () { return __awaiter(_this, void 0, void 0, function () {
        var metadata, txHash_1, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!connected || !wallet) {
                        alert('Please connect your wallet first');
                        return [2 /*return*/];
                    }
                    setIsSubmitting(true);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, 4, 5]);
                    metadata = metadataBuilder_1.buildCertificateMetadata(formData.username, formData.nic, formData.degree, formData.dateIssued);
                    return [4 /*yield*/, mintCertificate_1.mintCertificate(wallet, metadata, formData.username, formData.nic, formData.degree, formData.dateIssued)];
                case 2:
                    txHash_1 = (_a.sent()).txHash;
                    setTxHash(txHash_1);
                    setShowQRCodeModal(true);
                    return [3 /*break*/, 5];
                case 3:
                    error_2 = _a.sent();
                    console.error('Error minting certificate:', error_2);
                    alert('Failed to mint certificate: ' + (error_2 instanceof Error ? error_2.message : String(error_2)));
                    return [3 /*break*/, 5];
                case 4:
                    setIsSubmitting(false);
                    return [7 /*endfinally*/];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var placeQRCodeOnCanvas = function () { return __awaiter(_this, void 0, void 0, function () {
        var verificationUrl, tempDiv, root, svgElement, svgData, svgBlob, svgUrl, img, scaleX, scaleY, scale, centerX, centerY;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editor || !editor.canvas || !txHash || !originalSize)
                        return [2 /*return*/];
                    verificationUrl = window.location.origin + "/certificate/" + txHash;
                    tempDiv = document.createElement('div');
                    tempDiv.style.position = 'absolute';
                    tempDiv.style.left = '-9999px';
                    document.body.appendChild(tempDiv);
                    root = client_1.createRoot(tempDiv);
                    root.render(React.createElement("div", { style: { background: 'white', padding: '8px' } },
                        React.createElement(react_qr_code_1["default"], { value: verificationUrl, size: 128, level: "H", bgColor: "#ffffff", fgColor: "#000000" })));
                    return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 50); })];
                case 1:
                    _a.sent();
                    svgElement = tempDiv.querySelector('svg');
                    if (!svgElement) {
                        root.unmount();
                        document.body.removeChild(tempDiv);
                        return [2 /*return*/];
                    }
                    svgData = new XMLSerializer().serializeToString(svgElement);
                    svgBlob = new Blob([svgData], { type: 'image/svg+xml' });
                    svgUrl = URL.createObjectURL(svgBlob);
                    return [4 /*yield*/, new Promise(function (resolve, reject) {
                            var imgElement = new Image();
                            imgElement.onload = function () {
                                var imgInstance = new fabric.Image(imgElement, {
                                    crossOrigin: 'anonymous'
                                });
                                resolve(imgInstance);
                            };
                            imgElement.onerror = function (err) {
                                reject(err);
                            };
                            imgElement.src = svgUrl;
                            imgElement.crossOrigin = 'anonymous';
                        })];
                case 2:
                    img = _a.sent();
                    scaleX = editor.canvas.getWidth() / originalSize.width;
                    scaleY = editor.canvas.getHeight() / originalSize.height;
                    scale = Math.min(scaleX, scaleY);
                    centerX = (editor.canvas.getWidth() - (img.width || 0) * 1) / 2;
                    centerY = (editor.canvas.getHeight() - (img.height || 0) * 1) / 2;
                    img.set({
                        left: centerX,
                        top: centerY,
                        scaleX: scale,
                        scaleY: scale,
                        selectable: true,
                        hasControls: true,
                        lockRotation: true,
                        cornerSize: 8,
                        transparentCorners: false,
                        borderColor: 'blue',
                        cornerColor: 'blue',
                        name: 'verification-qr-code',
                        data: { isQRCode: true }
                    });
                    img.on('modified', function () {
                        setQrCodePlaced(true);
                    });
                    editor.canvas.add(img);
                    editor.canvas.renderAll();
                    setQrCodePlaced(true);
                    setShowQRCodeModal(false);
                    root.unmount();
                    document.body.removeChild(tempDiv);
                    URL.revokeObjectURL(svgUrl);
                    return [2 /*return*/];
            }
        });
    }); };
    var downloadCanvasAsPDF = function () { return __awaiter(_this, void 0, void 0, function () {
        var canvas, naturalWidth, naturalHeight, displayWidth, displayHeight, scaleX, scaleY, exportScale, dataUrl, pdf, response, result, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editor || !editor.canvas || !originalSize || !qrCodePlaced) {
                        alert('Please place the QR code on the certificate before exporting');
                        return [2 /*return*/];
                    }
                    canvas = editor.canvas;
                    naturalWidth = originalSize.width, naturalHeight = originalSize.height;
                    displayWidth = canvas.getWidth();
                    displayHeight = canvas.getHeight();
                    scaleX = naturalWidth / displayWidth;
                    scaleY = naturalHeight / displayHeight;
                    exportScale = Math.min(scaleX, scaleY);
                    canvas.getObjects().forEach(function (obj) {
                        var _a, _b, _c, _d;
                        obj.scaleX = ((_a = obj.scaleX) !== null && _a !== void 0 ? _a : 1) * exportScale;
                        obj.scaleY = ((_b = obj.scaleY) !== null && _b !== void 0 ? _b : 1) * exportScale;
                        obj.left = ((_c = obj.left) !== null && _c !== void 0 ? _c : 0) * exportScale;
                        obj.top = ((_d = obj.top) !== null && _d !== void 0 ? _d : 0) * exportScale;
                        obj.setCoords();
                    });
                    canvas.setWidth(naturalWidth);
                    canvas.setHeight(naturalHeight);
                    canvas.renderAll();
                    dataUrl = canvas.toDataURL({
                        format: 'png',
                        multiplier: 1
                    });
                    canvas.getObjects().forEach(function (obj) {
                        var _a, _b, _c, _d;
                        obj.scaleX = ((_a = obj.scaleX) !== null && _a !== void 0 ? _a : 1) / exportScale;
                        obj.scaleY = ((_b = obj.scaleY) !== null && _b !== void 0 ? _b : 1) / exportScale;
                        obj.left = ((_c = obj.left) !== null && _c !== void 0 ? _c : 0) / exportScale;
                        obj.top = ((_d = obj.top) !== null && _d !== void 0 ? _d : 0) / exportScale;
                        obj.setCoords();
                    });
                    canvas.setWidth(displayWidth);
                    canvas.setHeight(displayHeight);
                    canvas.renderAll();
                    pdf = new jspdf_1["default"]({
                        orientation: naturalWidth > naturalHeight ? 'landscape' : 'portrait',
                        unit: 'px',
                        format: [naturalWidth, naturalHeight]
                    });
                    pdf.addImage(dataUrl, 'PNG', 0, 0, naturalWidth, naturalHeight);
                    // Save the PDF first
                    pdf.save(formData.username.replace(/\s+/g, '_') + "_" + selectedDegree.replace(/\s+/g, '_') + "_certificate.pdf");
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, fetch('/api/record/add-canditate', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                userId: sessionStorage.getItem("userId"),
                                courseName: selectedDegree,
                                candidateName: formData.username,
                                nicNumber: formData.nic,
                                dateIssued: formData.dateIssued,
                                blockHash: txHash
                            })
                        })];
                case 2:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error('Failed to store certificate record');
                    }
                    return [4 /*yield*/, response.json()];
                case 3:
                    result = _a.sent();
                    console.log('Certificate record stored:', result);
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _a.sent();
                    console.error('Error storing certificate record:', error_3);
                    // You might want to show a toast notification here instead of alert
                    alert('Certificate was downloaded but record storage failed. Please contact support.');
                    return [3 /*break*/, 5];
                case 5:
                    setExported(true);
                    setTimeout(function () { return onBack(); }, 1000);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleFormSubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
        var objects;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    e.preventDefault();
                    setIsLoading(true);
                    return [4 /*yield*/, loadTemplate()];
                case 1:
                    _a.sent();
                    try {
                        if (editor === null || editor === void 0 ? void 0 : editor.canvas) {
                            objects = editor.canvas.getObjects();
                            objects.forEach(function (obj) {
                                var _a, _b, _c;
                                if (obj.type === 'i-text') {
                                    var textObj = obj;
                                    if ((_a = textObj.text) === null || _a === void 0 ? void 0 : _a.includes('Certificate Title')) {
                                        textObj.set({ text: formData.degree + " Certificate" });
                                    }
                                    if ((_b = textObj.text) === null || _b === void 0 ? void 0 : _b.includes('Recipient Name')) {
                                        textObj.set({ text: formData.username });
                                    }
                                    if ((_c = textObj.text) === null || _c === void 0 ? void 0 : _c.includes('Date Issued')) {
                                        textObj.set({ text: "Issued on: " + formData.dateIssued });
                                    }
                                }
                            });
                            editor.canvas.renderAll();
                        }
                    }
                    catch (error) {
                        console.error('Error generating certificate:', error);
                    }
                    finally {
                        setIsLoading(false);
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { jsx: true }, "\n        @keyframes slideUp {\n          0% {\n            opacity: 0;\n            transform: translateY(30px) scale(0.95);\n          }\n          100% {\n            opacity: 1;\n            transform: translateY(0) scale(1);\n          }\n        }\n        @keyframes slideUpStaggered {\n          0% {\n            opacity: 0;\n            transform: translateY(20px);\n          }\n          100% {\n            opacity: 1;\n            transform: translateY(0);\n          }\n        }\n        @keyframes gentleBounce {\n          0%, 100% {\n            transform: translateY(0);\n          }\n          50% {\n            transform: translateY(-2px);\n          }\n        }\n        .animate-fade-in {\n          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n        }\n        .animate-stagger-1 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;\n        }\n        .animate-stagger-2 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;\n        }\n        .smooth-transition {\n          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .hover-lift:hover {\n          transform: translateY(-1px);\n          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .animate-fade-in,\n          .animate-stagger-1,\n          .animate-stagger-2,\n          .gentle-bounce {\n            animation: none;\n            opacity: 1;\n            transform: none;\n          }\n          .smooth-transition,\n          .hover-lift:hover {\n            transition: none;\n          }\n        }\n      "),
        !isDegreeSet && !showForm && (React.createElement("div", { className: "min-h-screen flex items-center justify-center bg-black p-4" },
            React.createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full space-y-6 border border-white/20 animate-stagger-1" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("h2", { className: "text-2xl font-light text-white mb-2 tracking-normal" }, "Choose Degree Template"),
                    React.createElement("p", { className: "text-white/70 text-sm" }, "Select a template to begin creating your certificate")),
                React.createElement("div", { className: "space-y-4" },
                    React.createElement("div", { ref: selectorRef, onMouseMove: function (e) { return handleMouseMove(e.nativeEvent, setSelectorMousePosition, selectorRef); }, onMouseEnter: function () { return setIsSelectorHovering(true); }, onMouseLeave: function () { return setIsSelectorHovering(false); }, className: "relative overflow-hidden rounded-lg" },
                        isSelectorHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(selectorMousePosition, isSelectorHovering), "aria-hidden": "true" })),
                        React.createElement("select", { value: selectedDegree, onChange: function (e) { return setSelectedDegree(e.target.value); }, disabled: isLoading, className: "w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40 appearance-none cursor-pointer disabled:opacity-50 relative z-10" },
                            React.createElement("option", { value: "", className: "bg-gray-900 text-white" }, isLoading ? 'Loading templates...' : '-- Select Degree --'),
                            degrees.map(function (deg) { return (React.createElement("option", { key: deg, value: deg, className: "bg-gray-900 text-white" }, deg)); })),
                        React.createElement(lucide_react_1.ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 pointer-events-none z-20" })),
                    React.createElement("button", { ref: loadButtonRef, onMouseMove: function (e) { return handleMouseMove(e.nativeEvent, setLoadButtonMousePosition, loadButtonRef); }, onMouseEnter: function () { return setIsLoadButtonHovering(true); }, onMouseLeave: function () { return setIsLoadButtonHovering(false); }, onClick: handleLoadTemplate, disabled: !selectedDegree || isLoading, className: "relative overflow-hidden w-full bg-gray-400/20 text-white px-6 py-3 rounded-lg border hover:bg-gray-400 hover:border-white/40 disabled:opacity-50 disabled:cursor-not-allowed hover-lift" },
                        isLoadButtonHovering && !isLoading && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(loadButtonMousePosition, isLoadButtonHovering), "aria-hidden": "true" })),
                        React.createElement("div", { className: "flex items-center justify-center relative z-10" },
                            React.createElement(lucide_react_1.Eye, { className: "w-5 h-5 mr-2" }),
                            isLoading ? 'Loading...' : 'Load Template')),
                    React.createElement("button", { onClick: onBack, className: "w-full bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift" },
                        React.createElement("div", { className: "flex items-center justify-center" },
                            React.createElement(lucide_react_1.ArrowLeft, { className: "w-5 h-5 mr-2" }),
                            "Back to Home")))))),
        showForm && (React.createElement("div", { className: "min-h-screen flex items-center justify-center bg-black p-4" },
            React.createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md w-full space-y-6 border border-white/20 animate-stagger-1" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("h2", { className: "text-2xl font-light text-white mb-2 tracking-normal" }, "Certificate Details"),
                    React.createElement("p", { className: "text-white/70 text-sm" }, "Fill in the details for your certificate")),
                React.createElement("form", { onSubmit: handleFormSubmit, className: "space-y-4" },
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { className: "text-white/80 text-sm" }, "Full Name"),
                        React.createElement("input", { type: "text", name: "username", value: formData.username, onChange: handleInputChange, required: true, className: "w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40", placeholder: "Enter recipient name" })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { className: "text-white/80 text-sm" }, "NIC Number"),
                        React.createElement("input", { type: "text", name: "nic", value: formData.nic, onChange: handleInputChange, required: true, className: "w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40", placeholder: "Enter NIC number" })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { className: "text-white/80 text-sm" }, "Course"),
                        React.createElement("input", { type: "text", name: "degree", value: formData.degree, readOnly: true, className: "w-full bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-3 text-white focus:outline-none cursor-not-allowed" })),
                    React.createElement("div", { className: "space-y-2" },
                        React.createElement("label", { className: "text-white/80 text-sm" }, "Date Issued"),
                        React.createElement("input", { type: "date", name: "dateIssued", value: formData.dateIssued, onChange: handleInputChange, required: true, className: "w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white/40" })),
                    React.createElement("div", { className: "flex space-x-4 pt-2" },
                        React.createElement("button", { type: "button", onClick: function () { return setShowForm(false); }, className: "flex-1 bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift" }, "Back"),
                        React.createElement("button", { type: "submit", disabled: isLoading, className: "flex-1 bg-gray-400/20 text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-gray-400 hover:border-white/40 hover-lift disabled:opacity-50 disabled:cursor-not-allowed" }, isLoading ? 'Generating...' : 'Generate Certificate')))))),
        isDegreeSet && !showForm && (React.createElement("div", { className: "flex flex-col lg:flex-row gap-6 p-6 bg-gradient-to-br from-black via-gray-900 to-gray-800 min-h-screen" },
            React.createElement("div", { className: "w-full lg:w-80 bg-white/10 backdrop-blur-sm rounded-lg p-6 space-y-6 border border-white/20 animate-stagger-1" },
                React.createElement("div", { className: "text-center" },
                    React.createElement("div", { className: "w-16 h-16 bg-emerald-600/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 border border-white/20" },
                        React.createElement(lucide_react_1.Palette, { className: "w-8 h-8 text-emerald-400" })),
                    React.createElement("h2", { className: "text-xl font-light text-white mb-2 tracking-normal" }, "Certificate Designer"),
                    React.createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20" },
                        React.createElement("p", { className: "text-sm text-white/70 mb-1" }, "Active Template"),
                        React.createElement("p", { className: "text-emerald-400 font-medium" }, selectedDegree))),
                React.createElement("div", { className: "space-y-4" },
                    React.createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20" },
                        React.createElement("h3", { className: "text-white font-medium mb-2 flex items-center" },
                            React.createElement(lucide_react_1.Send, { className: "w-4 h-4 mr-2 text-emerald-400" }),
                            "Blockchain Submission"),
                        React.createElement("p", { className: "text-white/70 text-sm mb-3" }, "Submit the certificate details to the blockchain for permanent verification."),
                        !qrCodePlaced && (React.createElement("button", { onClick: handleSubmitToBlockchain, disabled: isSubmitting || !connected, className: "w-full bg-purple-600/20 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-purple-600/30 hover:border-white/40 hover-lift disabled:opacity-50 disabled:cursor-not-allowed" },
                            React.createElement("div", { className: "flex items-center justify-center" },
                                React.createElement(lucide_react_1.Send, { className: "w-4 h-4 mr-2" }),
                                isSubmitting ? 'Submitting...' : 'Submit to Blockchain'))),
                        txHash && (React.createElement("div", { className: "mt-3 p-2 bg-emerald-900/20 rounded text-xs text-emerald-200 break-all" },
                            React.createElement("p", { className: "font-medium" }, "Successfully Completed")))),
                    showQRCodeModal && (React.createElement("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in" },
                        React.createElement("div", { className: "bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-md w-full mx-4" },
                            React.createElement("h3", { className: "text-xl font-medium text-white mb-4 flex items-center" },
                                React.createElement(lucide_react_1.QrCode, { className: "w-5 h-5 mr-2 text-emerald-400" }),
                                "Place Verification QR Code"),
                            React.createElement("p", { className: "text-white/70 mb-4" }, "The QR code will be placed centered on your certificate. You can then drag it to the desired position."),
                            React.createElement("div", { className: "flex justify-center mb-6 p-4 bg-white rounded" },
                                React.createElement(react_qr_code_1["default"], { value: window.location.origin + "/certificate/" + txHash, size: 128, level: "H", bgColor: "#ffffff", fgColor: "#000000" })),
                            React.createElement("div", { className: "flex space-x-3" },
                                React.createElement("button", { onClick: placeQRCodeOnCanvas, className: "flex-1 bg-emerald-600/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg border border-white/20 hover:bg-emerald-600/30 hover:border-white/40 hover-lift" }, "Place QR Code on Certificate"))))),
                    React.createElement("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20" },
                        React.createElement("h3", { className: "text-white font-medium mb-2 flex items-center" },
                            React.createElement(lucide_react_1.Eye, { className: "w-4 h-4 mr-2 text-emerald-400" }),
                            "Canvas Controls"),
                        React.createElement("p", { className: "text-white/70 text-sm" }, "The template is automatically loaded with all elements in their correct positions.")),
                    !exported && !qrCodePlaced && (React.createElement("button", { onClick: function () {
                            if (editor === null || editor === void 0 ? void 0 : editor.canvas) {
                                editor.canvas.clear();
                            }
                            setIsDegreeSet(false);
                            setSelectedDegree('');
                            setTemplate(null);
                            setElements([]);
                            setShowForm(false);
                        }, className: "w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift" },
                        React.createElement("div", { className: "flex items-center justify-center" },
                            React.createElement(lucide_react_1.RotateCcw, { className: "w-4 h-4 mr-2" }),
                            "Change Template"))),
                    React.createElement("button", { onClick: downloadCanvasAsPDF, disabled: !qrCodePlaced || isLoading, className: "w-full " + (qrCodePlaced ? 'bg-emerald-600/20 hover:bg-emerald-600/30' : 'bg-white/10') + " backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:border-white/40 hover-lift disabled:opacity-50 disabled:cursor-not-allowed" },
                        React.createElement("div", { className: "flex items-center justify-center" },
                            React.createElement(lucide_react_1.Download, { className: "w-4 h-4 mr-2" }),
                            qrCodePlaced ? 'Export as PDF' : 'Place QR Code First')),
                    !qrCodePlaced && !exported && (React.createElement("button", { onClick: function () { return setShowForm(true); }, className: "w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift" },
                        React.createElement("div", { className: "flex items-center justify-center" },
                            React.createElement(lucide_react_1.ArrowLeft, { className: "w-4 h-4 mr-2" }),
                            "Back to Form"))),
                    !qrCodePlaced && !exported && (React.createElement("button", { onClick: onBack, className: "w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-lg border border-white/20 hover:bg-white/20 hover:border-white/40 hover-lift" },
                        React.createElement("div", { className: "flex items-center justify-center" },
                            React.createElement(lucide_react_1.ArrowLeft, { className: "w-4 h-4 mr-2" }),
                            "Back to Home"))))),
            React.createElement("div", { className: "flex-1 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 animate-stagger-2" },
                React.createElement("div", { className: "flex justify-between items-center mb-6" },
                    React.createElement("div", null,
                        React.createElement("h2", { className: "text-xl font-light text-white tracking-normal" }, "Certificate Preview"),
                        React.createElement("p", { className: "text-white/70 text-sm mt-1" },
                            "Template: ",
                            selectedDegree)),
                    React.createElement("div", { className: "flex items-center space-x-2" },
                        React.createElement("div", { className: "w-3 h-3 bg-emerald-400 rounded-full animate-pulse" }),
                        React.createElement("span", { className: "text-emerald-400 text-sm font-medium" }, "Live Preview"))),
                React.createElement("div", { ref: canvasRef, onMouseMove: function (e) { return handleMouseMove(e.nativeEvent, setCanvasMousePosition, canvasRef); }, onMouseEnter: function () { return setIsCanvasHovering(true); }, onMouseLeave: function () { return setIsCanvasHovering(false); }, className: "relative overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 smooth-transition hover:border-white/40 hover-lift" },
                    isCanvasHovering && (React.createElement("div", { className: "absolute inset-0 rounded-lg pointer-events-none smooth-transition", style: getGlassStyle(canvasMousePosition, isCanvasHovering), "aria-hidden": "true" })),
                    React.createElement("div", { className: "relative z-10" },
                        React.createElement(fabricjs_react_1.FabricJSCanvas, { className: "canvas rounded-md", onReady: onReady }))),
                showInputDropdown && activeTextObject && (React.createElement("div", { ref: dropdownRef, className: "absolute z-50 bg-gray-800 rounded-lg shadow-lg border border-white/20 mt-1", style: getDropdownPosition() },
                    React.createElement("div", { className: "px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-white/20", onClick: function () { return handleSelectInput('username'); } }, formData.username),
                    React.createElement("div", { className: "px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-white/20", onClick: function () { return handleSelectInput('nic'); } }, formData.nic),
                    React.createElement("div", { className: "px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-white/20", onClick: function () { return handleSelectInput('degree'); } }, formData.degree),
                    React.createElement("div", { className: "px-4 py-2 hover:bg-gray-700 cursor-pointer border-b border-white/20", onClick: function () { return handleSelectInput('date'); } }, formData.dateIssued))))))));
}
exports["default"] = CreateCertificate;
