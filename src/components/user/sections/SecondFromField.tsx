import InputFile from "@components/shared/inputs/InputFile";
import InputRadio from "@components/shared/inputs/InputRadio";

interface SecondGroupFieldsProps {
    userData: UserRequestEntry,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
}

const SecondGroupFields: React.FC<SecondGroupFieldsProps> = ({
    userData,
    handleInputChange,
    handleFileChange
}) => {
    return (
        <div className="flex flex-col justify-start px-0 md:px-6">
            <div className="box-border mb-6">
                <InputFile
                nameid="file_a"
                label="file_a"
                labelName="Foto de perfil"
                onChange={handleFileChange}
                />
                <p className="text-dark_ud-500 italic font-nsans font-normal text-base inline-block">
                Archivos PNG, JPG y JPEG.
                </p>
            </div>
            <div className="box-border mb-6">
                <span className="text-unno_pr-500 font-roboto font-normal text-base inline-block">¿Asignar privilegios?</span>
                <div className="flex row justify-center mt-6">
                    <InputRadio checked={userData.is_admin.toString() == 'true'} name="is_admin" value='true' onChange={handleInputChange}>Si</InputRadio>
                    <InputRadio checked={userData.is_admin.toString() == 'false'} name="is_admin" value='false' onChange={handleInputChange}>No</InputRadio>
                </div>
            </div>
            <div className="box-border mb-6">
                <span className="text-unno_pr-500 font-roboto font-normal text-base inline-block">Root</span>
                <div className="flex row justify-center mt-6">
                    <InputRadio checked={userData.is_superadmin.toString() == 'true'} name="is_superadmin" value='true' onChange={handleInputChange}>Si</InputRadio>
                    <InputRadio checked={userData.is_superadmin.toString() == 'false'} name="is_superadmin" value='false' onChange={handleInputChange}>No</InputRadio>
                </div>
            </div>
            <button
            type="submit"
            className="bg-unno_pr-500 text-white font-semibold py-2 px-4 rounded shadow"
            >
                Guardar
            </button>
        </div>
    );
};

export default SecondGroupFields;