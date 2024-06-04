import Input from "@components/shared/inputs/Input";
import InputFile from "@components/shared/inputs/InputFile";
import CardColor from "@components/shared/cards/CardColor";

interface SecondGroupFields {
    mural?: Mural | null;
    muralData: MuralRequestEntry;
    handleInputChange: (
        event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SecondGroupFields: React.FC<SecondGroupFields> = ({
    mural,
    muralData,
    handleInputChange,
    handleFileChange,
    }) => {
    return (
        <div className="flex flex-col justify-start px-0 md:px-6">
        <div className="box-border mb-6">
            <Input
            label="creation_date"
            labelName="Fecha de construcción"
            type="date"
            nameid="creation_date"
            onChange={handleInputChange}
            value={muralData.mural.creation_date}
            required={true}
            />
        </div>
        <div className="box-border mb-6">
            <InputFile
            nameid="file_a"
            label="file_a"
            labelName="Foto (1)"
            onChange={handleFileChange}
            />
            <InputFile
            nameid="file_b"
            label="file_b"
            labelName="Foto (2)"
            onChange={handleFileChange}
            />
            <InputFile
            nameid="file_c"
            label="file_c"
            labelName="Foto (3)"
            onChange={handleFileChange}
            />
            <p className="text-dark_ud-500 italic font-nsans font-normal text-base inline-block">
            Archivos PNG, JPG y JPEG.
            </p>
        </div>
        <div className="box-border mb-6">
            <div className="flex  flex-row justify-center">
            {mural?.colors.map((color, index) => (
                <CardColor key={index} color={color} />
            ))}
            </div>
            <p className="text-dark_ud-500 italic font-nsans font-normal text-base inline-block my-3">
            La paleta de colores se genera despúes de guardar los cambios.
            </p>
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
