import Layout from "@components/shared/Layout";
import Button from "@components/shared/buttons/Button";
import Card from "@components/shared/cards/Card";
import Input from "@components/shared/inputs/Input";
import { useClaimCouponById, useVerifyCouponById } from "@data/hooks/useFetchCoupon";
import { initalCouponCUResponse } from "@data/initial/initials";
import { useEffect, useRef, useState } from "react";
import Barcode from "react-barcode";
import { GrPowerReset } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Lector: React.FC = () => {
    const navigate = useNavigate();
    const { handleVerifyCoupon, statusVerifyCoupon } = useVerifyCouponById();
    const {handleClaimCoupon, statusClaimCoupon} = useClaimCouponById();
    const [inputValue, setInputValue] = useState<string>('');
    const [barCodeValue, setBarCodeValue] = useState<string>('vldscb000xx');
    const [status, setStatus] = useState<CouponCUResponse>(initalCouponCUResponse);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (hasSubmitted) {
            Swal.fire({
                title: statusClaimCoupon.success && statusClaimCoupon.message !== null ? '¡Reclamo exitoso!' : '¡Error!',
                icon: statusClaimCoupon.success && statusClaimCoupon.message !== null ? 'success' : 'error',
                text: statusClaimCoupon.success && statusClaimCoupon.message !== null ? statusClaimCoupon.message : statusClaimCoupon.message,
                confirmButtonText: 'Aceptar',
                allowOutsideClick: false,
                allowEscapeKey: false,
                confirmButtonColor: '#004A40',
            }).then((result) => {
                if (result.isConfirmed && statusClaimCoupon.success) {
                    navigate(0);
                }
                setHasSubmitted(false);
            });
        }
    }, [hasSubmitted, statusClaimCoupon, navigate]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInputValue(value);
        setBarCodeValue(value || 'vldscb000xx');
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const buttonName = (e.nativeEvent as any).submitter.name;
        if (buttonName === "verify") {
            await handleVerifyCoupon(inputValue);
        } else if (buttonName === "claim") {
            Swal.fire({
                title: '¿Estás seguro?',
                icon: 'warning',
                text: 'Vas a reclamar un cupón',
                showCancelButton: true,
                confirmButtonColor: '#004A40',
                confirmButtonText: 'Sí, hazlo',
                cancelButtonText: 'Cancelar'
            }).then(async (result)  => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'Cargando...',
                        allowOutsideClick: false,
                        didOpen: () => {
                            Swal.showLoading();
                        }
                    });
    
                    const formData = new FormData();
                    formData.append('code',inputValue.replace(/\s/g, ""))
                    await handleClaimCoupon(formData);

                    setHasSubmitted(true);
                }
            });
        }
    };

    const handleFormReset = () => {
        setInputValue('');
        setBarCodeValue('vldscb000xx');
        setStatus(initalCouponCUResponse);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    useEffect(() => {
        setStatus(statusVerifyCoupon);
    }, [statusVerifyCoupon]);

    return (
        <Layout>
            <Card className='w-[100%] lg:w-[70%] xl:w-[50%] mx-auto border-2'>
                <div className="flex flex-row justify-between items-center">
                    <div className="flex flex-row justify-center w-full">
                        <h2 className="text-center font-nsans text-unno_pr-500 text-4xl">Escanear código de barras</h2>
                    </div>
                    <Button
                        className="self-end"
                        type="button"
                        iconBtn={<GrPowerReset/>}
                        color={false}
                        onClick={handleFormReset}
                    >
                        Resetear Formulario
                    </Button>
                </div>
                <div className="flex flex-row justify-center items-center">
                    <div className="flex flex-col w-[100%] md:w-[80%] 2xl:w-[50%]">
                    <form method="POST" onSubmit={handleSubmit}>
                        <div className="my-10">
                                <div className="box-border mb-2">
                                    <Input 
                                        type="text" 
                                        placeholder="Inserte código" 
                                        nameid="code"
                                        value={inputValue} 
                                        onChange={handleInputChange} 
                                        ref={inputRef}
                                    />
                                </div>
                                <div className="box-border mb-2">
                                    <div className="flex justify-center">
                                        <Button
                                            type="submit"
                                            className="w-full"
                                            bg="bg-unno_pr-500"
                                            hoverBgClass='hover:bg-unno_pr-400'
                                            color={false}
                                            name="verify"
                                        >
                                            Verificar
                                        </Button>
                                    </div>
                                </div>
                        </div>
                        <div className="box-border mb-2">
                            <p className={`text-center font-nsans text-3xl ${status.success ? 'text-green-500' : 'text-red-500'}`}>{status.message}</p>
                        </div>
                        <div className="box-border mb-2">
                            <div className="flex justify-center">
                                <Barcode value={barCodeValue} height={60} width={2} />
                            </div>
                        </div>
                        <div className="box-border mb-2">
                            <div className="flex justify-center">
                                <Button
                                    type="submit"
                                    className={`w-full ${status.success ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-300 cursor-not-allowed'}`}
                                    hoverBgClass={status.success ? 'hover:bg-green-600' : ''}
                                    color={false}
                                    disabled={!status.success}
                                    name="claim"
                                >
                                    Reclamar Cupón
                                </Button>
                            </div>
                        </div>
                    </form>
                    </div>
                </div>
            </Card>
        </Layout>
    );
};

export default Lector;