import React, { useState, useEffect } from 'react';
import { useShinobiPro } from '../hooks/useShinobiPro';
import { db } from '../data/db';
import { ProSharinganIcon, RinneganIcon, UchihaFanIcon, AkatsukiCloudIcon } from './ThematicIcons';
import { useNavigate } from 'react-router-dom';

const GenjutsuFailureAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 100),   // Start glitch
            setTimeout(() => setStage(2), 500),  // Start eye crack
            setTimeout(() => setStage(3), 1300), // Start screen crack
            setTimeout(() => setStage(4), 2200), // Show final text
            setTimeout(onComplete, 4500)         // Finish
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);

    const CrackleSVG = () => (
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
            <filter id="crackle-filter">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="1" result="warp"/>
                <feDisplacementMap in="SourceGraphic" in2="warp" scale="30" xChannelSelector="R" yChannelSelector="B"/>
            </filter>
            <rect width="100%" height="100%" filter="url(#crackle-filter)" className={stage >= 2 ? "opacity-100" : "opacity-0"} fill="rgba(255,0,0,0.3)"/>
        </svg>
    );

    const ScreenCrackOverlay = () => (
        <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='white' stroke-width='4' stroke-dasharray='15%2c 10' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e")`,
                maskImage: `radial-gradient(circle, black 0%, black 50%, transparent 100%)`,
                animation: stage >= 3 ? 'crack-spread 1.2s cubic-bezier(0.785, 0.135, 0.15, 0.86) forwards' : 'none',
                opacity: 0,
            }}
        />
    );


    return (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden animate-fade-out-slow" style={{ animationDelay: '4s' }} onAnimationEnd={onComplete}>
            <div className={`absolute inset-0 transition-all duration-300 ${stage >= 1 ? 'animate-glitch' : ''}`}>
                 <div className="absolute inset-0 bg-red-900 animate-pulse" />
                 <CrackleSVG />
            </div>

            <div className={`relative transition-opacity duration-500 ${stage >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                <ProSharinganIcon className="w-64 h-64" />
                 <div className={`absolute inset-0 rounded-full border-4 border-white transition-all duration-500 ${stage >= 2 ? 'scale-150 opacity-0' : 'scale-100 opacity-70'}`} />
            </div>

            <div className={`absolute inset-0 transition-all duration-500 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <ScreenCrackOverlay />
            </div>

            <div className={`absolute text-center transition-opacity duration-1000 ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
                <h1 className="text-5xl font-black text-white [text-shadow:0_0_15px_white] animate-text-reveal-blur" style={{animationDelay: '0s'}}>
                    الوهم قد تحطم
                </h1>
                <p className="text-2xl text-red-400 mt-4 animate-text-reveal-blur" style={{animationDelay: '0.5s'}}>
                    ...لكن الواقع يبقى. حاول مجدداً.
                </p>
            </div>
        </div>
    );
};

const MangekyouAwakeningAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [stage, setStage] = useState(0);
    const flashbackIcons = [UchihaFanIcon, AkatsukiCloudIcon, RinneganIcon];
    const [currentIconIndex, setCurrentIconIndex] = useState(0);

    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), 100),   // Start shatter
            setTimeout(() => setStage(2), 600),   // Start flashbacks
            setTimeout(() => setStage(3), 2200),  // Start Mangekyou reveal
            setTimeout(() => setStage(4), 3300),  // Show final text & shockwave
            setTimeout(onComplete, 5000)          // Finish
        ];
        return () => timers.forEach(clearTimeout);
    }, [onComplete]);
    
    useEffect(() => {
        if (stage === 2) {
            const interval = setInterval(() => {
                setCurrentIconIndex(prev => (prev + 1) % flashbackIcons.length);
            }, 100);
            return () => clearInterval(interval);
        }
    }, [stage]);
    
    const CurrentIcon = flashbackIcons[currentIconIndex];

    return (
        <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center overflow-hidden">
            {/* Stage 1: Screen Shatter */}
            <div className={`absolute inset-0 bg-black transition-opacity duration-500 ${stage >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                <svg className="w-full h-full absolute" preserveAspectRatio="xMidYMid slice">
                    <defs>
                        <filter id="reality-warp">
                            <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="warp" />
                            <feDisplacementMap in="SourceGraphic" in2="warp" scale="30" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                    </defs>
                    <rect width="100%" height="100%" fill="#991B1B" className={`${stage >= 3 ? 'animate-screen-shatter' : ''}`} style={{ filter: 'url(#reality-warp)' }}/>
                </svg>
                 <div className={`absolute inset-0 bg-radial-gradient from-transparent to-black transition-opacity duration-1000 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {/* Stage 2: Flashbacks */}
            {stage === 2 && (
                 <div className="absolute inset-0 animate-flashback-flicker flex items-center justify-center">
                    <CurrentIcon className="w-48 h-48 text-white" />
                </div>
            )}

            {/* Stage 3: Mangekyou Reveal & Shockwave */}
            <div className={`absolute flex items-center justify-center transition-opacity duration-300 ${stage >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                <ProSharinganIcon className="w-64 h-64 animate-mangekyou-reveal" />
                {stage >= 4 && (
                    <div className="absolute w-64 h-64 rounded-full border-4 border-red-400 animate-chakra-shockwave" />
                )}
            </div>
            
            {/* Stage 4: Confirmation Text */}
            <h1 className={`text-5xl font-black text-white absolute transition-opacity duration-300 ${stage >= 4 ? 'opacity-100 animate-chakra-text-reveal' : 'opacity-0'}`} style={{ textShadow: '0 0 20px #ef4444' }}>
                تم تفعيل شينوبي برو
            </h1>
        </div>
    );
};


const ShinobiProPage: React.FC = () => {
    const { isPro, activatePro } = useShinobiPro();
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [quizStatus, setQuizStatus] = useState<'ongoing' | 'success' | 'failed'>('ongoing');
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    
    // Redirect if already pro
    useEffect(() => {
        if (isPro) {
            navigate('/shinobi-pro/features', { replace: true });
        }
    }, [isPro, navigate]);

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;
        setIsAnswered(true);
        setSelectedAnswer(answer);
        const isCorrect = answer === db.quizQuestions[currentQuestionIndex].correctAnswer;
        setTimeout(() => {
            if (isCorrect) {
                if (currentQuestionIndex < db.quizQuestions.length - 1) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1);
                    setIsAnswered(false);
                    setSelectedAnswer(null);
                } else {
                    setQuizStatus('success');
                }
            } else {
                setQuizStatus('failed');
            }
        }, 2000);
    };

    const resetQuiz = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setQuizStatus('ongoing');
    };

    if (quizStatus === 'success') {
        return <MangekyouAwakeningAnimation onComplete={() => {
            activatePro();
            // The useEffect will handle the redirect
        }} />;
    }

    if (quizStatus === 'failed') {
        return <GenjutsuFailureAnimation onComplete={resetQuiz} />;
    }

    if (isPro) { // This will be handled by useEffect, but as a fallback
        return null;
    }
    
    const currentQuestion = db.quizQuestions[currentQuestionIndex];

    return (
        <div className="min-h-[calc(100vh-84px)] relative isolate overflow-hidden bg-black flex items-center justify-center p-4">
             {/* Background Genjutsu */}
            <div className="absolute inset-0 -z-10 bg-black opacity-70">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(127,29,29,0.4)_0,_rgba(0,0,0,0)_60%)] animate-swirl-chakra"></div>
                <ProSharinganIcon className="absolute top-[5%] left-[5%] w-96 h-96 animate-eye-glow" />
                <RinneganIcon className="absolute bottom-[10%] right-[8%] w-80 h-80 animate-eye-glow" style={{animationDelay: '5s'}}/>
                <ProSharinganIcon className="absolute bottom-[20%] left-[15%] w-64 h-64 animate-eye-glow" style={{animationDelay: '3s'}}/>
                <RinneganIcon className="absolute top-[15%] right-[12%] w-72 h-72 animate-eye-glow" style={{animationDelay: '8s'}}/>
            </div>
            
            <div className="w-full max-w-4xl bg-black/60 backdrop-blur-md p-8 rounded-2xl shadow-2xl border-2 border-seal-red-dark animate-page-transition">
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-black text-white mb-2 [text-shadow:0_0_15px_theme(colors.seal-red.light)]">غرفة الغينجتسو</h1>
                    <p className="text-lg text-gray-300">تجاوز الوهم لتثبت جدارتك.</p>
                </div>
                
                <div className="text-center mb-4">
                    <p className="text-gray-400">السؤال {currentQuestionIndex + 1} من {db.quizQuestions.length}</p>
                    <div className="w-full bg-gray-700/50 rounded-full h-2.5 mt-2">
                        <div className="bg-seal-red h-2.5 rounded-full transition-all duration-500 [box-shadow:0_0_8px_theme(colors.seal-red.DEFAULT)]" style={{ width: `${((currentQuestionIndex + 1) / db.quizQuestions.length) * 100}%` }}></div>
                    </div>
                </div>

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-center text-white min-h-[100px] flex items-center justify-center">{currentQuestion.question}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                        {currentQuestion.options.map((option, index) => {
                            let buttonClass = "w-full text-right p-4 border-2 rounded-lg text-lg font-semibold transition-all duration-300 bg-scroll-gold/10 border-scroll-gold/50 text-scroll-gold transform hover:-translate-y-1 hover:shadow-glow-gold ";
                            if (isAnswered) {
                                if (option === currentQuestion.correctAnswer) {
                                    buttonClass = "w-full text-right p-4 border-2 rounded-lg text-lg font-semibold bg-green-700/80 text-white border-green-500 shadow-glow-green";
                                } else if (option === selectedAnswer) {
                                    buttonClass = "w-full text-right p-4 border-2 rounded-lg text-lg font-semibold bg-red-800/80 text-white border-red-600 shadow-glow-red";
                                } else {
                                    buttonClass += "opacity-50 pointer-events-none";
                                }
                            }
                            
                            return (
                                <button
                                    key={index}
                                    onClick={() => handleAnswer(option)}
                                    disabled={isAnswered}
                                    className={buttonClass}
                                >
                                    <span className="bg-scroll-gold/80 text-white rounded-md px-3 py-1 me-3">{['أ', 'ب', 'ج', 'د'][index]}</span>
                                    {option}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShinobiProPage;