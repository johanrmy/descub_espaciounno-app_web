import Input from "@components/shared/inputs/Input";
import { FaInstagram, FaFacebook, FaTiktok } from "react-icons/fa";


interface FirstGroupFields {
    artistData: ArtistRequestEntry,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
}


const FirstGroupFields: React.FC<FirstGroupFields> = ({
    artistData,
    handleInputChange,
}) => {
    return (
        <div className="flex flex-col justify-start px-0 md:px-6">
        <div className="box-border mb-6">
            <Input
            label="name"
            labelName="Nombre"
            type="text"
            nameid="name"
            onChange={handleInputChange}
            value={artistData.name}
            required={true}
            />
        </div>
        <div className="box-border mb-6">
            <Input
            label="last_name"
            labelName="Apellidos"
            type="text"
            nameid="last_name"
            onChange={handleInputChange}
            value={artistData.last_name}
            required={true}
            />
        </div>
        <div className="box-border mb-6">
            <Input
            label="nickname"
            labelName="Nickname"
            type="text"
            nameid="nickname"
            onChange={handleInputChange}
            value={artistData.nickname}
            required={true}
            />
        </div>
        <div className="box-border mb-6">
            <Input
            label="employment"
            labelName="Empleo"
            type="text"
            nameid="employment"
            onChange={handleInputChange}
            value={artistData.employment}
            required={true}
            />
        </div>
        <div className="box-border mb-6">
            <Input
            label="email"
            labelName="Correo Electrónico"
            type="email"
            nameid="email"
            onChange={handleInputChange}
            value={artistData.email}
            required={true}
            />
        </div>
        <div className="box-border mb-6">
            <span className="text-unno_pr-500 font-roboto font-normal text-base inline-block">Redes</span>
            <div className="my-4">
                <Input
                type="text"
                nameid="user_instagram"
                onChange={handleInputChange}
                value={artistData.user_instagram}
                required={true}
                icon={<FaInstagram className="text-[#833ab4]"/>}
                />
            </div>
            <div className="my-4">
                <Input
                type="text"
                nameid="user_tiktok"
                onChange={handleInputChange}
                value={artistData.user_tiktok}
                required={true}
                icon={<FaTiktok className="text-[#ff0050]"/>}
                />
            </div>
            <div className="my-4">
                <Input
                type="text"
                nameid="user_facebook"
                onChange={handleInputChange}
                value={artistData.user_facebook}
                required={false}
                icon={<FaFacebook className="text-[#1877f2]"/>}
                />
            </div>
        </div>
        </div>
    );
};

export default FirstGroupFields;