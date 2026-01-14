import type { AuthResponse } from "../types";

const MOCK_CREDENTIALS = {
    email: "admin@sovware.com",
    password: "admin123",
};

export const loginApi = async (email: string, password: string): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === MOCK_CREDENTIALS.email && password === MOCK_CREDENTIALS.password) {
                resolve({
                    user: {
                        id: "u-123",
                        name: "Admin Sovware",
                        email: MOCK_CREDENTIALS.email,
                        avatar: "https://i.pravatar.cc/150?u=sovware",
                    },
                    token: "mock-jwt-token-" + Math.random().toString(36).substr(2),
                });
            } else {
                reject(new Error("Invalid credentials"));
            }
        }, 1500);
    });
};