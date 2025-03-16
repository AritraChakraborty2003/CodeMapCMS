"use client";
import React, { useRef } from "react";
import axios from "axios";
import Image from "next/image";
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
      alert(res.data.message);
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
    <div className="form">
      <form
        className="flex flex-col gap-y-4 justify-center"
        onSubmit={handleSubmit}
      >
        <input type="email" ref={emailRef} placeholder="Email" required />
        <input
          type="password"
          ref={passwordRef}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
        <div className="google-btn">
          <button
            onClick={loginGoogle}
            style={{
              border: "1px solid #d5d5d5",
              padding: "1.35vmin",
              width: "100%",
              fontSize: "16px",
              borderRadius: "5px",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
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
        <button type="button" className="register-btn" onClick={handleSubmit}>
          Register
        </button>
      </form>
    </div>
  );
};

export default AuthModal;
