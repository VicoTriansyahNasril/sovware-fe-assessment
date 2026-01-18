import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LoginForm } from '@/features/auth/components/LoginForm';
import { LoginSplashScreen } from '@/features/auth/components/LoginSplashScreen';
import illustrationPng from '@/assets/login-illustration.png';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isInitialLoad, setIsInitialLoad] = useState(true);
    const [isLoginTransition, setIsLoginTransition] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setIsInitialLoad(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const handleLoginSuccess = () => {
        setIsLoginTransition(true);
        setTimeout(() => {
            navigate('/dashboard');
        }, 2000);
    };

    return (
        <>
            <AnimatePresence>
                {(isInitialLoad || isLoginTransition) && (
                    <LoginSplashScreen />
                )}
            </AnimatePresence>

            <div className="min-h-screen w-full flex bg-[#2D68A2] overflow-hidden font-sans">
                <div className="w-full lg:w-[45%] lg:min-w-[600px] flex-shrink-0 flex flex-col justify-center items-center bg-white relative z-20 lg:rounded-tr-[42px] lg:rounded-br-[42px] shadow-2xl">
                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                </div>
                <div className="hidden lg:flex flex-1 relative flex-col items-center justify-center p-8">
                    <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

                    <div className="flex flex-col items-center w-full max-w-[800px] z-10 text-center mt-[-20px]">
                        <img
                            src={illustrationPng}
                            alt="Flow Design Illustration"
                            className="w-full h-auto object-contain mb-8 drop-shadow-2xl"
                        />

                        <h2 className="text-[28px] font-bold text-white mb-3 tracking-wide leading-snug">
                            Building Happiness, Shaping Futures
                        </h2>
                        <p className="text-blue-100/90 text-[15px] leading-relaxed max-w-lg font-light">
                            Where joy meets learning, and dreams take flight: a school of happiness and endless possibilities.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;