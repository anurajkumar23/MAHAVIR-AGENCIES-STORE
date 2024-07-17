"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const typingTexts = ["Mechanical", "Electrical", "Instrumentation", "Safety equipment"];

const AnimatedTextUnderline = () => {
    const [currentText, setCurrentText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isErasing, setIsErasing] = useState(false);

    useEffect(() => {
        const typingInterval = setInterval(() => {
            if (isErasing) {
                setCurrentCharIndex((prev) => {
                    if (prev === 0) {
                        setIsErasing(false);
                        setCurrentIndex((prevIndex) => (prevIndex + 1) % typingTexts.length);
                        return 0;
                    }
                    return prev - 1;
                });
            } else {
                setCurrentCharIndex((prev) => {
                    const nextCharIndex = prev + 1;
                    if (nextCharIndex === typingTexts[currentIndex].length) {
                        setTimeout(() => setIsErasing(true), 1000); // Wait 1 second before erasing
                        return typingTexts[currentIndex].length;
                    }
                    return nextCharIndex;
                });
            }
        }, isErasing ? 50 : 100); // Adjust speed for typing and erasing

        return () => clearInterval(typingInterval);
    }, [isErasing, currentCharIndex, currentIndex]);

    useEffect(() => {
        setCurrentText(typingTexts[currentIndex].slice(0, currentCharIndex));
    }, [currentCharIndex, currentIndex]);

    const draw = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: {
            pathLength: 1,
            opacity: 1,
            transition: {
                pathLength: { delay: 0.5, type: "spring", duration: 2, bounce: 0 },
                opacity: { delay: 0.5, duration: 1 },
            },
        },
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
                <span>We have a wide range of</span>
                <br />
                <span className="relative whitespace-nowrap text-teal-800 font-alliance ml-2">
                    <motion.svg
                        aria-hidden="true"
                        viewBox="0 0 418 42"
                        className="absolute left-0 top-1/3"
                        preserveAspectRatio="xMidYMid meet"
                        width="100%"
                        height="100%"
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.path
                            d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203"
                            variants={draw}
                            strokeWidth="6"
                            fill="none"
                            stroke="#F47D20"
                        />
                    </motion.svg>
                    <span className="relative text-teal-800 font-alliance animate-typing overflow-hidden whitespace-nowrap border-r-2 border-r-teal-800">
                        {currentText}
                    </span>
                </span>{" "}

                Products
            </h1>
        </div>
    );
};

function App() {
    return (
        <div className="h-screen flex items-center justify-center ">
            <div className="absolute inset-x-0 m-auto h-80 max-w-lg bg-gradient-to-tr from-pink-400 via-white to-blue-400 blur-[118px]"></div>
            <div className="text-center z-10">
                <AnimatedTextUnderline />
            </div>
            <div className='absolute xs:bottom-10 bottom-16 w-full flex justify-center items-center'>
                <a href='#about'>
                    <div className='w-[35px] h-[64px] rounded-3xl border-4 border-[#9d99b4] flex justify-center items-start p-2'>
                        <motion.div
                            animate={{
                                y: [0, 24, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop",
                            }}
                            className='w-3 h-3 rounded-full bg-[#F47D20] mb-1'
                        />
                    </div>
                </a>
            </div>
        </div>
    );
}

export default App;
