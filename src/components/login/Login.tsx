import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@auth/AuthContext";
import Button from "@components/shared/buttons/Button";
import Input from "@components/shared/inputs/Input";
import Alert from "@components/shared/cards/ErrorCard";
import MessageSVG from "@assets/imgs/email.svg"
import PasswordSVG from "@assets/imgs/password.svg"
import DescubLogo from "@assets/imgs/descub-logo-red.svg"
import UnnoLogo from "@assets/imgs/espacio_unno_logo.png"

const Login: React.FC = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
    });

    const [showAlert, setShowAlert] = useState(false);
    const [failedAttempts, setFailedAttempts] = useState(0);
    const [blocked, setBlocked] = useState(false);

    const auth = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.token) {
            navigate("/dashboard");
        }
    }, [auth.token, navigate]);

    const emailInputRef = useRef<HTMLInputElement>(null);
    const passwordInputRef = useRef<HTMLInputElement>(null);

    const handleSubmitEvent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (blocked) {
            setShowAlert(true);
            return;
        }

        if (input.email.trim() !== "" && input.password.trim() !== "") {
            const success = await auth.loginAction(input);
            if (!success) {
                setFailedAttempts(failedAttempts => failedAttempts + 1);
                if (failedAttempts < 2) {
                    setShowAlert(true);
                } else{
                    setShowAlert(true);
                    setBlocked(true);
                    setTimeout(() => {
                        setBlocked(false);
                        setShowAlert(false);
                        setFailedAttempts(0);
                    }, 60000);
                }
                
            }
        } else {
            if (input.email.trim() === "") {
                emailInputRef.current?.focus();
            } else {
                passwordInputRef.current?.focus();
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const handleCloseAlert = () => {
        setShowAlert(false);
    };

    return (
        <section className="h-full relative min-h-[100vh] bg-dark_ud-100 flex items-center justify-center">
            <div className="container mx-auto flex flex-col items-center justify-center">
                <div className="flex flex-row items-center divide-x mb-3">
                    <img src={DescubLogo} className="w-40" />
                    <img src={UnnoLogo} className="w-28" />
                </div>
                <div className="max-w-lg min-w-fit w-full bg-white shadow-lg p-14 rounded-2xl">
                    <div className="mb-6">
                        <h1 className="text-unno_pr-500 font-roboto font-normal text-3xl text-center">Iniciar Sesión</h1>
                    </div>
                    {showAlert && !blocked && <Alert message="Correo electrónico o contraseña incorrectos" onClose={handleCloseAlert} />}
                    {showAlert && blocked && <Alert message="Cuenta bloqueada temporalmente. Inténtalo de nuevo más tarde." onClose={handleCloseAlert} />}
                    <form action="POST" onSubmit={handleSubmitEvent}>
                        <div className="box-border mb-6">
                            <label htmlFor="email" className="text-unno_pr-500 font-roboto font-normal text-base inline-block mb-3">Correo Electrónico</label>
                            <Input 
                                type="email" 
                                icon={MessageSVG} 
                                placeholder="user@espaciounno.com" 
                                nameid="email" 
                                onChange={handleInputChange} 
                                value={input.email}
                                ref={emailInputRef}
                            />
                        </div>
                        <div className="box-border mb-6">
                            <label htmlFor="password" className="text-unno_pr-500 font-roboto font-normal text-base inline-block mb-3">Contraseña</label>
                            <Input 
                                type="password" 
                                icon={PasswordSVG} 
                                placeholder="******" 
                                nameid="password" 
                                onChange={handleInputChange} 
                                value={input.password}
                                ref={passwordInputRef}
                            />
                        </div>
                        <div className="box-border text-center w-full mt-12">
                            <Button bg="bg-unno_pr-500" color={false} hoverBgClass="hover:bg-unno_pr-400" className="w-full" type="submit">Iniciar sesión</Button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Login;
