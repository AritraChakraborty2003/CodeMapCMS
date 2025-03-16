"use client";
import React, { useRef } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";

const AuthModal = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    try {
      const res = await axios.post(
        "http://localhost:8000/login",
        { email, password },
        { withCredentials: true }
      );

      alert(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoginGoogle = async (codeResponse: { code: string }) => {
    try {
      const res = await axios.post(
        "http://localhost:8000/oAuthLogin",
        { code: codeResponse.code },
        { withCredentials: true }
      );
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: handleLoginGoogle,
    onError: () => console.log("Google Login Failed"),
    flow: "auth-code",
  });

  return (
    <div className="h-full w-full">
      <form
        className="flex flex-col gap-y-6 justify-center items-center h-full w-full"
        onSubmit={handleSubmit}
      >
        <p className="text-center text-2xl font-bold">Login</p>
        <input
          type="email"
          ref={emailRef}
          placeholder="Email"
          required
          className="w-[90%] border-gray-400 border-b-[1px] p-2"
        />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
          className="w-[90%] border-gray-400 border-b-[1px] mt-2 p-3"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-[80%] p-3 mt-3"
        >
          Login
        </button>
        <div className="google-btn w-[80%] mt-1">
          <button
            onClick={loginGoogle}
            style={{
              border: "1px solid #d5d5d5",
              padding: "1.35vmin",
              color: "black",
              fontSize: "16px",
              width: "100%",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            className="text-white p-2 text-black"
          >
            <Image
              src="https://www.pngplay.com/wp-content/uploads/13/Google-Logo-PNG-Photo-Image.png"
              alt="Google logo"
              width={20}
              height={20}
              style={{ marginRight: "10px" }}
            />
            Sign in with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuthModal;
