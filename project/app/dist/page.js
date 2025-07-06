"use client";
"use strict";
exports.__esModule = true;
var react_1 = require("motion/react");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var link_1 = require("next/link");
var react_2 = require("react");
function HomePage() {
    var _a = react_2.useState(false), isScrolled = _a[0], setIsScrolled = _a[1];
    react_2.useEffect(function () {
        var handleScroll = function () {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            }
            else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return function () { return window.removeEventListener("scroll", handleScroll); };
    }, []);
    return (React.createElement(React.Fragment, null,
        React.createElement("style", { jsx: true }, "\n        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');\n        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap');\n        \n        .designer-heading {\n          font-family: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n          font-weight: 300;\n          letter-spacing: -0.02em;\n        }\n        \n        .designer-text {\n          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n          font-weight: 300;\n          letter-spacing: -0.01em;\n        }\n        \n        .designer-indicators {\n          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;\n          font-weight: 400;\n          letter-spacing: 0.02em;\n        }\n\n        @keyframes textGlow {\n          0%, 100% { text-shadow: 0 0 0px rgba(255,255,255,0); }\n          50% { text-shadow: 0 0 20px rgba(255,255,255,0.1); }\n        }\n        @keyframes subtlePulse {\n          0%, 100% { \n            transform: scale(1); \n            opacity: 0.6; \n          }\n          50% { \n            transform: scale(1.2); \n            opacity: 1; \n          }\n        }\n        @keyframes gentleFloat {\n          0%, 100% { transform: translateY(0px); }\n          50% { transform: translateY(-8px); }\n        }\n        @keyframes shimmer {\n          0% { transform: translateX(-100%); opacity: 0; }\n          50% { opacity: 0.1; }\n          100% { transform: translateX(100%); opacity: 0; }\n        }\n        @keyframes slideInFromLeft {\n          0% { transform: translateX(-100px); opacity: 0; }\n          100% { transform: translateX(0); opacity: 1; }\n        }\n        @keyframes slideInFromRight {\n          0% { transform: translateX(100px); opacity: 0; }\n          100% { transform: translateX(0); opacity: 1; }\n        }\n        @keyframes fadeInScale {\n          0% { transform: scale(0.8); opacity: 0; }\n          100% { transform: scale(1); opacity: 1; }\n        }\n      "),
        React.createElement("div", { className: "min-h-screen bg-black text-white overflow-hidden relative" },
            React.createElement("div", { className: "absolute inset-0 opacity-[0.02]", style: {
                    backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)",
                    backgroundSize: "50px 50px"
                } }),
            React.createElement("div", { className: "max-w-6xl mx-auto px-8 py-20 relative z-10" },
                React.createElement("div", { className: "flex flex-col justify-center items-center min-h-[80vh] text-center" },
                    React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }, className: "mb-12" },
                        React.createElement("h1", { className: "designer-heading text-3xl sm:text-5xl md:text-6xl leading-[0.9] mb-8 tracking-tight", style: { animation: "textGlow 18s ease-in-out infinite" } },
                            "Welcome To Certara",
                            React.createElement("span", { className: "inline-block w-1.5 h-1.5 bg-white rounded-full ml-2", style: { animation: "subtlePulse 6s ease-in-out infinite" } }),
                            React.createElement("br", null)),
                        React.createElement("div", { className: "designer-text text-xl sm:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mb-10" },
                            React.createElement(react_1.motion.p, { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 1, delay: 1.5 } },
                                "Revolutionize Your Certificates With Blockchain-Backed Authenticity",
                                React.createElement("br", null))),
                        React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: 2 }, className: "designer-indicators flex justify-center items-center gap-10 text-white/40 text-sm uppercase" },
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement(lucide_react_1.Shield, { className: "w-4 h-4" }),
                                React.createElement("span", null, "Immutable")),
                            React.createElement("div", { className: "w-px h-5 bg-white/20" }),
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement(lucide_react_1.Clock, { className: "w-4 h-4" }),
                                React.createElement("span", null, "Instant Verification")),
                            React.createElement("div", { className: "w-px h-5 bg-white/20" }),
                            React.createElement("div", { className: "flex items-center gap-3" },
                                React.createElement(lucide_react_1.Globe, { className: "w-4 h-4" }),
                                React.createElement("span", null, "Global Standard")))),
                    React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: 2.5, ease: [0.25, 0.1, 0.25, 1] }, className: "flex flex-col sm:flex-row gap-10 justify-center items-center mb-10" },
                        React.createElement(link_1["default"], { href: "/sign-in" },
                            React.createElement(button_1.Button, { variant: "outline", className: "designer-text bg-transparent border border-white/20 hover:bg-white/8 hover:border-white/40 text-white hover:text-white transition-all duration-300 rounded-xl h-16 px-12 text-lg font-medium focus:ring-2 focus:ring-white/20 focus:ring-offset-0 relative overflow-hidden group" },
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-1000" }),
                                React.createElement("span", { className: "relative z-10" }, "Sign In"))),
                        React.createElement(link_1["default"], { href: "/organizations" },
                            React.createElement(button_1.Button, { className: "designer-text relative overflow-hidden bg-white text-black hover:bg-white/90 transition-all duration-300 rounded-xl h-16 px-12 text-lg font-medium group shadow-xl focus:ring-2 focus:ring-white/20 focus:ring-offset-0" },
                                React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700", style: { animation: "shimmer 3s ease-in-out infinite 2s" } }),
                                React.createElement("span", { className: "relative z-10 flex items-center gap-3" }, "View Organizations"))))),
                React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 60 }, animate: isScrolled
                        ? { opacity: 1, y: 0 }
                        : { opacity: 1, y: [0, -10, 0] }, transition: {
                        opacity: { duration: 1.2, delay: 1, ease: [0.25, 0.1, 0.25, 1] },
                        y: isScrolled
                            ? { duration: 0.4 }
                            : { duration: 6, repeat: Infinity, ease: "easeInOut" }
                    }, className: "relative max-w-4xl mx-auto mb-10", style: { marginTop: "-7rem" } },
                    React.createElement(react_1.motion.div, { initial: { opacity: 0, scale: 0.95 }, animate: { opacity: 1, scale: 1 }, transition: { duration: 1.2, delay: 1.5 }, className: "relative rounded-3xl p-16 border border-white/25 backdrop-blur-sm transition-all duration-400 hover:border-white/50 overflow-hidden bg-white/8 hover:bg-white/12 shadow-2xl" },
                        React.createElement("div", { className: "relative z-10" },
                            React.createElement("div", { className: "text-center space-y-8" },
                                React.createElement("div", { className: "flex justify-between items-start mb-8" },
                                    React.createElement(react_1.motion.div, { className: "text-left", style: { animation: "slideInFromLeft 1s ease-out 2s both" } },
                                        React.createElement("div", { className: "designer-text text-white/40 text-sm font-medium tracking-wider uppercase" }, "Certara"),
                                        React.createElement("div", { className: "w-12 h-px bg-white/30 mt-1" })),
                                    React.createElement(react_1.motion.div, { className: "text-right", style: { animation: "slideInFromRight 1s ease-out 2s both" } },
                                        React.createElement("div", { className: "designer-text text-white/40 text-sm font-medium tracking-wider uppercase" }, "Blockchain Verified"),
                                        React.createElement("div", { className: "w-12 h-px bg-white/30 mt-1 ml-auto" }))),
                                React.createElement(react_1.motion.div, { className: "w-20 h-20 mx-auto border-2 border-white/40 rounded-full flex items-center justify-center backdrop-blur-sm bg-white/15 relative", style: { animation: "fadeInScale 1s ease-out 2.5s both" } },
                                    React.createElement("div", { className: "w-8 h-8 bg-white/50 rounded-full" }),
                                    React.createElement("div", { className: "absolute inset-0 rounded-full border border-white/20 animate-ping" })),
                                React.createElement("div", { className: "space-y-8" },
                                    React.createElement(react_1.motion.h3, { className: "designer-heading text-3xl font-light text-white/90 tracking-wide", style: { animation: "fadeInScale 1s ease-out 2.7s both" } }, "CERTIFICATE OF AUTHENTICITY"),
                                    React.createElement("div", { className: "space-y-6 max-w-2xl mx-auto" },
                                        React.createElement("div", { className: "h-px bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full" }),
                                        React.createElement(react_1.motion.div, { className: "designer-text text-white/70 font-light leading-relaxed space-y-3", style: { animation: "fadeInScale 1s ease-out 3s both" } },
                                            React.createElement("p", { className: "text-lg" }, "This certifies that"),
                                            React.createElement("p", { className: "designer-heading text-2xl font-medium text-white/90" }, "\"Advanced Web Development Certificate\""),
                                            React.createElement("p", null, "is permanently secured on the blockchain")),
                                        React.createElement("div", { className: "h-px bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full" })),
                                    React.createElement(react_1.motion.div, { className: "grid grid-cols-2 gap-8 max-w-2xl mx-auto", style: { animation: "fadeInScale 1s ease-out 3.2s both" } },
                                        React.createElement("div", { className: "text-left" },
                                            React.createElement("div", { className: "designer-text text-white/40 text-xs font-medium tracking-wider mb-2 uppercase" }, "Issued To"),
                                            React.createElement("div", { className: "designer-heading text-white/80 text-lg font-medium" }, "John Smith"),
                                            React.createElement("div", { className: "designer-text text-white/50 text-sm font-mono" }, "0x742d...8f3a")),
                                        React.createElement("div", { className: "text-right" },
                                            React.createElement("div", { className: "designer-text text-white/40 text-xs font-medium tracking-wider mb-2 uppercase" }, "Issued By"),
                                            React.createElement("div", { className: "designer-heading text-white/80 text-lg font-medium" }, "TechAcademy Pro"),
                                            React.createElement("div", { className: "designer-text text-white/50 text-sm" }, "Verified Institution"))),
                                    React.createElement(react_1.motion.div, { className: "grid grid-cols-3 gap-6 max-w-2xl mx-auto text-center border-t border-white/20 pt-6", style: { animation: "fadeInScale 1s ease-out 3.4s both" } },
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "designer-text text-white/40 text-xs font-medium tracking-wider uppercase" }, "Hash"),
                                            React.createElement("div", { className: "designer-text text-white/70 text-sm font-mono mt-1" }, "0x7a9f2b8c...")),
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "designer-text text-white/40 text-xs font-medium tracking-wider uppercase" }, "Block"),
                                            React.createElement("div", { className: "designer-text text-white/70 text-sm font-mono mt-1" }, "#18,429,847")),
                                        React.createElement("div", null,
                                            React.createElement("div", { className: "designer-text text-white/40 text-xs font-medium tracking-wider uppercase" }, "Status"),
                                            React.createElement("div", { className: "designer-text text-white/60 text-sm mt-1 flex items-center justify-center gap-2" },
                                                React.createElement("div", { className: "w-2 h-2 bg-green-400 rounded-full animate-pulse" }),
                                                "Verified")))))),
                        React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent transform -skew-x-12 -translate-x-full", style: { animation: "shimmer 4s ease-in-out infinite 1s" } })),
                    React.createElement("div", { className: "absolute inset-0 rounded-3xl bg-gradient-to-r from-white/5 via-transparent to-white/5 blur-xl -z-10 opacity-50" })))),
        React.createElement(react_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 1, delay: 0.5 }, className: "text-center mt-20 mb-10" },
            React.createElement("a", { href: "mailto:contact@certara.com", className: "designer-text text-white/70 hover:text-white transition-colors duration-300 text-lg" }, "contact@certara.com"))));
}
exports["default"] = HomePage;
