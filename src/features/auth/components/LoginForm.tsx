import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useAuthStore } from '@/store/useAuthStore';
import { loginApi } from '../api/authMock';
import { ErrorModal } from './ErrorModal';
import logoSvg from '@/assets/logo.svg';

import { FormInput } from '@/components/ui/FormInput';
import { PrimaryButton } from '@/components/ui/PrimaryButton';

interface LoginFormProps {
    onLoginSuccess: () => void;
}

export const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
    const login = useAuthStore((state) => state.login);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [rememberMe, setRememberMe] = useState(true);

    const [errors, setErrors] = useState({ email: '', password: '' });
    const [errorModal, setErrorModal] = useState({ isOpen: false, message: '' });

    const toggleVisibility = () => setIsVisible(!isVisible);

    const validate = () => {
        let isValid = true;
        const newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = "Email is required";
            isValid = false;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "Please enter a valid email address";
            isValid = false;
        }

        if (!password.trim()) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);

        try {
            const response = await loginApi(email, password);
            login(response.user, response.token);
            onLoginSuccess();

        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "Invalid credentials provided.";
            setErrorModal({ isOpen: true, message: errMessage });
            setIsLoading(false);
        }
    };

    const handleEmailChange = (val: string) => {
        setEmail(val);
        if (errors.email) setErrors({ ...errors, email: '' });
    };

    const handlePasswordChange = (val: string) => {
        setPassword(val);
        if (errors.password) setErrors({ ...errors, password: '' });
    };

    return (
        <>
            <div className="w-full max-w-[367px] px-0 flex flex-col items-center">
                <div className="flex flex-col items-center mb-8 text-center">
                    <div className="mb-4">
                        <img src={logoSvg} alt="S.2.R.E Logo" className="w-[42px] h-[42px]" />
                    </div>
                    <div className="flex flex-row items-center gap-1 mb-2">
                        <span className="font-inter font-semibold text-[24px] text-[#2D68A2]">Welcome to</span>
                        <span className="font-inter font-black text-[20px] text-[#2D68A2]">S.2.R.E ADMIN</span>
                    </div>
                    <p className="font-poppins font-medium text-[16px] text-[#2D68A2]">
                        Please login with your registered account.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="w-full flex flex-col gap-5">
                    <FormInput
                        placeholder="Email"
                        type="email"
                        value={email}
                        onValueChange={handleEmailChange}
                        isInvalid={!!errors.email}
                        errorMessage={errors.email}
                    />

                    <FormInput
                        placeholder="Password"
                        value={password}
                        onValueChange={handlePasswordChange}
                        type={isVisible ? "text" : "password"}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password}
                        endContent={
                            <button
                                className="focus:outline-none text-[#2D68A2] hover:text-[#1a4570] transition-colors pr-2"
                                type="button"
                                onClick={toggleVisibility}
                            >
                                {isVisible ? <FaRegEyeSlash className="text-lg" /> : <FaRegEye className="text-lg" />}
                            </button>
                        }
                    />

                    <div className="flex items-center w-full mt-[-2px] pl-1">
                        <label className="flex items-center cursor-pointer group select-none">
                            <div className="relative">
                                <input
                                    type="checkbox"
                                    className="peer sr-only"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                />
                                <div className="w-[18px] h-[18px] border-[1.5px] border-[#D1D5DB] rounded-[4px] bg-white peer-checked:bg-[#2D68A2] peer-checked:border-[#2D68A2] transition-all"></div>
                                <svg
                                    className="absolute top-[3px] left-[3px] w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M13.3334 4L6.00008 11.3333L2.66675 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <span className="ml-2 text-[14px] text-[#666666] font-normal group-hover:text-[#2D68A2] transition-colors">Remember Me</span>
                        </label>
                    </div>

                    <PrimaryButton type="submit" isLoading={isLoading} className="mt-3">
                        {isLoading ? 'Logging in...' : 'Login'}
                    </PrimaryButton>
                </form>
            </div>

            <ErrorModal
                isOpen={errorModal.isOpen}
                message={errorModal.message}
                onClose={() => setErrorModal({ ...errorModal, isOpen: false })}
            />
        </>
    );
};