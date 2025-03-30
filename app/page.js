"use client";
import { useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import './globals.css'

export default function Home() {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    const sendTokenToBackend = async () => {
      if (user) {
        try {
          const res = await fetch("/api/auth/token");
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const data = await res.json();
          console.log("✅ Token received:", data.token);

          if (!data.token) {
            throw new Error("No token received from /api/auth/token");
          }

          // ✅ Backend ke URL ko sahi tarike se use karein
          const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL ;

          // ✅ Token ko backend par send karein
          const response = await fetch(`${backendURL}/auth/callback`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: data.token }),
          });

          if (!response.ok) {
            throw new Error(`Failed to send token. Status: ${response.status}`);
          }

          console.log("✅ Token successfully sent to backend & email triggered!");
        } catch (error) {
          console.error("❌ Error sending token to backend:", error);
        }
      }
    };

    sendTokenToBackend();
  }, [user]); // ✅ Runs only when user logs in

  // const handleLogout = async () => {
  //   try {
  //     await fetch("/api/auth/logout", { credentials: "include" });
  //     document.cookie = "auth0.is.authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  //     router.push("/api/auth/login");
  //   } catch (error) {
  //     console.error("❌ Logout failed:", error);
  //   }
  // };

  const handleLogout = async () => {
    try {
      // ✅ Ensure returnTo URL is properly encoded
      const returnTo = encodeURIComponent(window.location.origin);
  
      // ✅ Call Auth0 logout API
      await fetch(`/api/auth/logout?returnTo=${returnTo}`, {
        method: "GET",
        credentials: "include",
      });
  
      // ✅ Clear cookies and local storage
      document.cookie = "auth0.is.authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.clear();
      sessionStorage.clear();
  
      // ✅ Force logout from Auth0 by redirecting to Auth0 logout endpoint
      window.location.href = `/`;
      // router.push("/api/auth/login");
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };
  

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
      <div className="bg-white shadow-lg rounded-2xl p-8 text-center max-w-md w-full">
        {!user ? (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome to Our App!</h2>
            <p className="text-gray-600 mb-6">Sign in to access your account.</p>
            <Link
              href="/api/auth/login"
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Login
            </Link>
          </div>
        ) : (
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Welcome, {user.name}!</h2>
            <p className="text-gray-600 mb-6">You are successfully logged in.</p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
