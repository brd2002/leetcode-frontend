import { useEffect, useRef, useState } from "react";
import {
    Code,
    Database,
    Globe,
    Smartphone,
    Terminal,
    Cpu,
    Layers,
    FileCode,
    Zap,
    Coffee,
    Palette,
    Settings
} from "lucide-react";

const programmingLanguages = [
    { id: 1, name: "JavaScript", icon: Code, color: "#F7DF1E", category: "frontend" },
    { id: 2, name: "Python", icon: Terminal, color: "#3776AB", category: "backend" },
    { id: 3, name: "React", icon: Globe, color: "#61DAFB", category: "frontend" },
    { id: 4, name: "Node.js", icon: Database, color: "#339933", category: "backend" },
    { id: 5, name: "TypeScript", icon: FileCode, color: "#3178C6", category: "frontend" },
    { id: 6, name: "Java", icon: Coffee, color: "#ED8B00", category: "backend" },
    { id: 7, name: "C++", icon: Cpu, color: "#00599C", category: "system" },
    { id: 8, name: "Swift", icon: Smartphone, color: "#FA7343", category: "mobile" },
    { id: 9, name: "Go", icon: Zap, color: "#00ADD8", category: "backend" },
    { id: 10, name: "Rust", icon: Settings, color: "#000000", category: "system" },
    { id: 11, name: "Vue.js", icon: Palette, color: "#4FC08D", category: "frontend" },
    { id: 12, name: "Docker", icon: Layers, color: "#2496ED", category: "devops" }
];

export default function ProgrammingLanguageClock() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [rotationAngle, setRotationAngle] = useState(0);
    const [autoRotate, setAutoRotate] = useState(true);
    const [pulseEffect, setPulseEffect] = useState({});
    const containerRef = useRef(null);

    useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date());
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let rotationTimer;

        if (autoRotate) {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => {
                    const newAngle = (prev + 0.5) % 360;
                    return Number(newAngle.toFixed(3));
                });
            }, 100);
        }

        return () => {
            if (rotationTimer) {
                clearInterval(rotationTimer);
            }
        };
    }, [autoRotate]);

    useEffect(() => {
        updateClockPositions();
    }, [currentTime]);

    const updateClockPositions = () => {
        const now = currentTime;
        const seconds = now.getSeconds();
        const minutes = now.getMinutes();
        const hours = now.getHours() % 12;

        // Create pulse effect for current time indicators
        const newPulseEffect = {};

        // Highlight languages based on time
        const secondLang = programmingLanguages[seconds % programmingLanguages.length];
        const minuteLang = programmingLanguages[minutes % programmingLanguages.length];
        const hourLang = programmingLanguages[hours % programmingLanguages.length];

        newPulseEffect[secondLang.id] = true;
        newPulseEffect[minuteLang.id] = true;
        newPulseEffect[hourLang.id] = true;

        setPulseEffect(newPulseEffect);
    };

    const calculatePosition = (index, total, radius) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radian = (angle * Math.PI) / 180;

        const x = radius * Math.cos(radian);
        const y = radius * Math.sin(radian);

        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));

        return { x, y, angle, zIndex, opacity };
    };

    const formatTime = (time) => {
        return {
            hours: time.getHours().toString().padStart(2, '0'),
            minutes: time.getMinutes().toString().padStart(2, '0'),
            seconds: time.getSeconds().toString().padStart(2, '0')
        };
    };

    const timeDisplay = formatTime(currentTime);

    return (
        <div className="w-full  h-screen flex flex-col items-center justify-center bg-black overflow-hidden relative">
            {/* Background blur effects */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute left-8 top-16 opacity-40">
                    <div className="h-[400px] w-[700px] rounded-full bg-blue-600 blur-[120px]" />
                </div>
                <div className="absolute right-8 bottom-16 opacity-40">
                    <div className="h-[400px] w-[700px] rounded-full bg-purple-600 blur-[120px]" />
                </div>
                <div className="absolute left-12 top-48 opacity-40">
                    <div className="h-[600px] w-[500px] rounded-full bg-green-600 blur-[120px]" />
                </div>
            </div>

            <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
                <div
                    className="absolute w-full h-full flex items-center justify-center"
                    ref={containerRef}
                    style={{ perspective: "1000px" }}
                >
                    {/* Central time display */}
                    <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-teal-500 flex flex-col items-center justify-center z-50 border-2 border-white/20">
                        <div className="absolute w-36 h-36 rounded-full border border-white/10 animate-ping opacity-30"></div>
                        <div className="absolute w-40 h-40 rounded-full border border-white/5 animate-ping opacity-20" style={{ animationDelay: "1s" }}></div>

                        <div className="text-white font-mono text-lg font-bold">
                            {timeDisplay.hours}
                        </div>
                        <div className="text-white/80 font-mono text-sm">
                            {timeDisplay.minutes}:{timeDisplay.seconds}
                        </div>
                    </div>

                    {/* Orbital rings */}
                    <div className="absolute w-96 h-96 rounded-full border border-white/10"></div>
                    <div className="absolute w-[500px] h-[500px] rounded-full border border-white/5"></div>
                    <div className="absolute w-[600px] h-[600px] rounded-full border border-white/5"></div>

                    {/* Hour indicators (inner ring) */}
                    {programmingLanguages.slice(0, 12).map((lang, index) => {
                        const position = calculatePosition(index, 12, 150);
                        const isPulsing = pulseEffect[lang.id];
                        const Icon = lang.icon;
                        const isHourIndicator = index === (currentTime.getHours() % 12);

                        return (
                            <div
                                key={`hour-${lang.id}`}
                                className="absolute transition-all duration-700"
                                style={{
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                    zIndex: position.zIndex,
                                    opacity: position.opacity,
                                }}
                            >
                                <div
                                    className={`
                    w-12 h-12 rounded-full flex items-center justify-center
                    ${isHourIndicator ? "bg-white text-black scale-125" : "bg-black/80 text-white"}
                    border-2 
                    ${isPulsing ? "border-white animate-pulse shadow-lg shadow-white/30" : "border-white/40"}
                    transition-all duration-300
                  `}
                                    style={{
                                        backgroundColor: isHourIndicator ? lang.color : undefined,
                                        borderColor: isPulsing ? lang.color : undefined,
                                    }}
                                >
                                    <Icon size={20} />
                                </div>
                                <div className="absolute top-14 left-1/2 -translate-x-1/2 text-xs text-white/70 font-semibold whitespace-nowrap">
                                    {lang.name}
                                </div>
                            </div>
                        );
                    })}

                    {/* Minute indicators (middle ring) */}
                    {Array.from({ length: 12 }, (_, i) => {
                        const langIndex = (i * 5) % programmingLanguages.length;
                        const lang = programmingLanguages[langIndex];
                        const position = calculatePosition(i, 12, 220);
                        const isPulsing = pulseEffect[lang.id];
                        const Icon = lang.icon;
                        const isMinuteIndicator = i === Math.floor(currentTime.getMinutes() / 5);

                        return (
                            <div
                                key={`minute-${i}`}
                                className="absolute transition-all duration-700"
                                style={{
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                    zIndex: position.zIndex,
                                    opacity: position.opacity,
                                }}
                            >
                                <div
                                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isMinuteIndicator ? "bg-white text-black scale-110" : "bg-black/60 text-white"}
                    border-2 
                    ${isPulsing ? "border-white animate-pulse" : "border-white/30"}
                    transition-all duration-300
                  `}
                                    style={{
                                        backgroundColor: isMinuteIndicator ? lang.color : undefined,
                                        borderColor: isPulsing ? lang.color : undefined,
                                    }}
                                >
                                    <Icon size={16} />
                                </div>
                            </div>
                        );
                    })}

                    {/* Second indicators (outer ring) */}
                    {Array.from({ length: 12 }, (_, i) => {
                        const langIndex = (i * 5 + 2) % programmingLanguages.length;
                        const lang = programmingLanguages[langIndex];
                        const position = calculatePosition(i, 12, 280);
                        const isPulsing = pulseEffect[lang.id];
                        const Icon = lang.icon;
                        const isSecondIndicator = i === Math.floor(currentTime.getSeconds() / 5);

                        return (
                            <div
                                key={`second-${i}`}
                                className="absolute transition-all duration-700"
                                style={{
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                    zIndex: position.zIndex,
                                    opacity: position.opacity,
                                }}
                            >
                                <div
                                    className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isSecondIndicator ? "bg-white text-black scale-125" : "bg-black/40 text-white"}
                    border-2 
                    ${isPulsing ? "border-white animate-pulse" : "border-white/20"}
                    transition-all duration-300
                  `}
                                    style={{
                                        backgroundColor: isSecondIndicator ? lang.color : undefined,
                                        borderColor: isPulsing ? lang.color : undefined,
                                    }}
                                >
                                    <Icon size={12} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
