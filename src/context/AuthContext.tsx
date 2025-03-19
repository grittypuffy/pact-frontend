"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    imageUrl?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => Promise<void>;
    signup: (
        username: string,
        fullName: string,
        email: string,
        password: string
    ) => Promise<void>;
    logout: () => Promise<void>;
    isLoading: boolean;
    error: string | null;
    checkUsernameAvailability: (username: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Helper function for API calls with proper error handling
const fetchAPI = async (url: string, options?: RequestInit) => {
    try {
        const response = await fetch(url, {
            ...options,
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                ...options?.headers,
            },
            mode: "cors",
        });
        console.log("response", response);
        if (!response.ok) {
            // Try to parse error response
            try {
                const errorData = await response.json();
                throw new Error(
                    errorData.detail || `Error: ${response.status}`
                );
            } catch (parseError) {
                throw new Error(
                    `Error: ${response.status} ${response.statusText}`
                );
            }
        }

        return await response.json();
    } catch (error) {
        console.error("API error:", error);
        throw error;
    }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is logged in from local storage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
            } catch (error) {
                console.error("Failed to parse stored user:", error);
                localStorage.removeItem("user");
            }
        }
    }, []);

    const checkUsernameAvailability = async (
        username: string
    ): Promise<boolean> => {
        try {
            // Add a timeout to prevent hanging requests
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const data = await fetchAPI(`${API_BASE_URL}/auth/${username}`, {
                signal: controller.signal,
            });

            clearTimeout(timeoutId);
            return data.available;
        } catch (error) {
            console.error("Error checking username availability:", error);
            if (error instanceof Error && error.message.includes("404")) {
                return false;
            }
            return false;
        }
    };

    const login = async (username: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchAPI(`${API_BASE_URL}/auth/sign_in`, {
                method: "POST",
                body: JSON.stringify({ username, password }),
            });

            // Extract user data from token or response
            // For now we'll use what's available from the login
            const userInfo = {
                id: username, // Using username as ID for simplicity
                name: username, // Using username for display name temporarily
                email: "", // Email might come from the token or you need a separate API call
                username: username,
            };

            setUser(userInfo);
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(userInfo));
        } catch (error) {
            console.error("Login error:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Login failed. Please check your credentials."
            );
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const signup = async (
        username: string,
        fullName: string,
        email: string,
        password: string
    ) => {
        setIsLoading(true);
        setError(null);

        try {
            await fetchAPI(`${API_BASE_URL}/auth/sign_up`, {
                method: "POST",
                body: JSON.stringify({
                    username,
                    full_name: fullName,
                    email,
                    password,
                }),
            });

            // After signup, log the user in automatically
            const userInfo = {
                id: username,
                name: fullName,
                email: email,
                username: username,
            };

            setUser(userInfo);
            setIsAuthenticated(true);
            localStorage.setItem("user", JSON.stringify(userInfo));
        } catch (error) {
            console.error("Signup error:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "Signup failed. Please try again."
            );
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);

        try {
            await fetchAPI(`${API_BASE_URL}/auth/sign_out`, {
                method: "POST",
            });
        } catch (error) {
            console.error("Logout error:", error);
            // Continue with logout even if the API call fails
        } finally {
            // Always clear local state regardless of API success
            setUser(null);
            setIsAuthenticated(false);
            localStorage.removeItem("user");
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                signup,
                logout,
                isLoading,
                error,
                checkUsernameAvailability,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
