import { SignInForm } from "@/components/reuseable-compoment/signIn-form";
import { SignupForm } from "@/components/reuseable-compoment/signUp-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

const AuthNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  const openLogin = () => {
    setAuthMode("login");
    setIsOpen(true);
  };

  const openRegister = () => {
    setAuthMode("register");
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex flex-row gap-2">
      <Button variant="secondary" className="capitalize" onClick={openLogin}>
        Login
      </Button>
      <Button variant="default" className="capitalize" onClick={openRegister}>
        Register
      </Button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            {/* <DialogTitle>
              {authMode === "login"
                ? "Login to your account"
                : "Create an account"}
            </DialogTitle> */}
          </DialogHeader>
          {authMode === "login" ? (
            <SignInForm onClose={closeModal} />
          ) : (
            <SignupForm onClose={closeModal} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthNavbar;
