import { motion } from "framer-motion";
import logoSvg from "@/assets/logo.svg";

export const LoginSplashScreen = () => {
    return (
        <motion.div
            className="fixed inset-0 bg-white z-[9999] flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="flex items-center gap-4 mb-12">
                <motion.img
                    src={logoSvg}
                    alt="Logo"
                    className="w-[64px] h-[64px]"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                />
                <div className="flex flex-col justify-center">
                    <motion.span
                        className="font-inter font-black text-[32px] text-[#1E1E1E] leading-none tracking-tight mb-1"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        SOVWARE
                    </motion.span>
                    <motion.span
                        className="font-inter font-medium text-[20px] text-[#1E1E1E] tracking-[0.05em]"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        EDGE SYSTEM
                    </motion.span>
                </div>
            </div>
            <motion.div
                className="w-10 h-10 border-[3px] border-[#F3F4F6] border-t-[#2D68A2] rounded-full"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
        </motion.div>
    );
};