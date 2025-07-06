'use client';
"use strict";
exports.__esModule = true;
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var Header_1 = require("@/components/Header");
var ActionButtons_1 = require("@/components/ActionButtons");
var InfoCards_1 = require("@/components/InfoCards");
var TemplateDesigner_1 = require("@/components/TemplateDesigner");
var CreateCertificate_1 = require("@/components/CreateCertificate");
function HomePage() {
    var _a = react_1.useState('home'), view = _a[0], setView = _a[1];
    var _b = react_1.useState(false), isWalletConnected = _b[0], setIsWalletConnected = _b[1];
    var _c = react_1.useState(null), walletAddress = _c[0], setWalletAddress = _c[1];
    var _d = react_1.useState(false), showWalletPrompt = _d[0], setShowWalletPrompt = _d[1];
    var router = navigation_1.useRouter();
    react_1.useEffect(function () {
        var userId = sessionStorage.getItem('userId');
        if (!userId) {
            sessionStorage.clear();
            router.push('/');
        }
    }, [router]);
    var handleBackToHome = function () {
        setView('home');
    };
    var handleWalletStatusChange = function (connected) {
        setIsWalletConnected(connected);
    };
    var handleCreateCertificate = function () {
        if (!isWalletConnected) {
            setShowWalletPrompt(true);
            return;
        }
        setView('certificate');
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { jsx: true }, "\n        @keyframes textGlow {\n          0%, 100% { text-shadow: 0 0 0px rgba(255,255,255,0); }\n          50% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }\n        }\n        @keyframes subtlePulse {\n          0%, 100% { \n            transform: scale(1); \n            opacity: 0.8; \n          }\n          50% { \n            transform: scale(1.1); \n            opacity: 1; \n          }\n        }\n        @keyframes slideUp {\n          0% { \n            opacity: 0; \n            transform: translateY(30px) scale(0.95);\n          }\n          100% { \n            opacity: 1; \n            transform: translateY(0) scale(1);\n          }\n        }\n        @keyframes slideUpStaggered {\n          0% { \n            opacity: 0; \n            transform: translateY(20px);\n          }\n          100% { \n            opacity: 1; \n            transform: translateY(0);\n          }\n        }\n        @keyframes gentleBounce {\n          0%, 100% { transform: translateY(0); }\n          50% { transform: translateY(-2px); }\n        }\n        .animate-fade-in {\n          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;\n        }\n        .animate-stagger-1 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;\n        }\n        .animate-stagger-2 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;\n        }\n        .animate-stagger-3 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both;\n        }\n        .animate-stagger-4 {\n          animation: slideUpStaggered 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;\n        }\n        .hover-lift:hover {\n          transform: translateY(-1px);\n          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .smooth-transition {\n          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);\n        }\n        .glass-background {\n          background: rgba(0, 0, 0, 0.2);\n          backdrop-filter: blur(10px);\n          -webkit-backdrop-filter: blur(10px);\n        }\n        @media (prefers-reduced-motion: reduce) {\n          .animate-fade-in,\n          .animate-stagger-1,\n          .animate-stagger-2,\n          .animate-stagger-3,\n          .animate-stagger-4 {\n            animation: none;\n            opacity: 1;\n            transform: none;\n          }\n          .smooth-transition,\n          .hover-lift:hover {\n            transition: none;\n          }\n        }\n      "),
        React.createElement("div", { className: "min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white pt-16" },
            React.createElement(Header_1["default"], { onWalletStatusChange: handleWalletStatusChange, walletAddress: walletAddress, onBack: handleBackToHome, currentView: view }),
            view === 'home' && (React.createElement("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center" },
                React.createElement("div", { className: "mb-12 animate-stagger-1" },
                    React.createElement("h1", { className: "text-3xl sm:text-4xl lg:text-5xl font-light text-white mb-6 tracking-normal", style: {
                            animation: "textGlow 6s ease-in-out infinite"
                        } },
                        "Welcome to Certara",
                        React.createElement("span", { className: "inline-block w-1 h-1 bg-white rounded-full ml-1", style: {
                                animation: "subtlePulse 4s ease-in-out infinite"
                            }, "aria-hidden": "true" })),
                    React.createElement("p", { className: "text-lg text-white/70 max-w-2xl mx-auto leading-relaxed" }, "Create, manage, and verify blockchain-based certificates with ease.")),
                React.createElement("div", { className: "animate-stagger-2" },
                    React.createElement(ActionButtons_1["default"], { onCreateTemplate: function () { return setView('designer'); }, onCreateCertificate: handleCreateCertificate })),
                showWalletPrompt && (React.createElement("div", { className: "fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center animate-fade-in" },
                    React.createElement("div", { className: "bg-black/80 backdrop-blur-sm border border-white/20 rounded-lg p-6 max-w-md mx-4" },
                        React.createElement("h3", { className: "text-xl font-medium mb-4 text-white" }, "Wallet Required"),
                        React.createElement("p", { className: "text-white/70 mb-6" }, "You need to connect your wallet to create certificates. Please connect your wallet first."),
                        React.createElement("div", { className: "flex justify-end space-x-3" },
                            React.createElement("button", { onClick: function () { return setShowWalletPrompt(false); }, className: "px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white smooth-transition hover-lift" }, "Cancel"),
                            React.createElement("button", { onClick: function () {
                                    setShowWalletPrompt(false);
                                    // You might want to automatically open the wallet connect popup here
                                }, className: "px-4 py-2 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-white/20 hover:border-white/40 text-white smooth-transition hover-lift" }, "Connect Wallet"))))),
                React.createElement("div", { className: "mt-16 animate-stagger-3" },
                    React.createElement(InfoCards_1["default"], null)))),
            view === 'designer' && React.createElement(TemplateDesigner_1["default"], { onBack: handleBackToHome }),
            view === 'certificate' && React.createElement(CreateCertificate_1["default"], { onBack: handleBackToHome }))));
}
exports["default"] = HomePage;
