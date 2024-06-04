import Alert from "@components/shared/cards/ErrorCard";
import Input from "@components/shared/inputs/Input";

interface FirstGroupFieldsProps {
    userData: UserRequestEntry,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    handleCloseAlert: () => void,
    infoAlert: {showAlert: boolean, messageAlert: string};
    requiredPassword?: boolean;
}

const FirstGroupFields: React.FC<FirstGroupFieldsProps> = ({
    userData,
    handleInputChange,
    handleCloseAlert,
    infoAlert,
    requiredPassword = true
}) => {
    return (
        <div className="flex flex-col justify-start px-0 md:px-6">
            <div className="box-border mb-6">
                <Input
                label="first_name"
                labelName="Nombres"
                type="text"
                nameid="first_name"
                onChange={handleInputChange}
                value={userData.first_name}
                required={true}
                placeholder=""
                />
            </div>
            <div className="box-border mb-6">
                <Input
                label="last_name"
                labelName="Apellidos"
                type="text"
                nameid="last_name"
                onChange={handleInputChange}
                value={userData.last_name}
                required={true}
                placeholder=""
                />
            </div>
            <div className="box-border mb-6">
                <Input
                label="email"
                labelName="Correo electrónico"
                type="email"
                nameid="email"
                onChange={handleInputChange}
                value={userData.email}
                required={true}
                placeholder="user@espaciounno.com"
                />
            </div>
            {infoAlert.showAlert && <Alert message={infoAlert.messageAlert} onClose={handleCloseAlert} />}
            <div className="box-border mb-6">
                <Input
                label="password"
                labelName="Contraseña"
                type="password"
                nameid="password"
                onChange={handleInputChange}
                value={userData.password}
                required={requiredPassword}
                placeholder="*********"
                />
            </div>
            <div className="box-border mb-6">
                <Input
                label="confirm_password"
                labelName="Confirmar contraseña"
                type="password"
                nameid="confirm_password"
                onChange={handleInputChange}
                value={userData.confirm_password}
                required={requiredPassword}
                placeholder="*********"
                />
            </div>
        </div>
    );
};

export default FirstGroupFields;