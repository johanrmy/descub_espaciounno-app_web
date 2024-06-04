import InputFile from "@components/shared/inputs/InputFile";
import CharacterCounterTextarea from "@components/shared/inputs/CounterTextArea";
import InputRadio from "@components/shared/inputs/InputRadio";

interface SecondGroupFields {
    artistData: ArtistRequestEntry;
    handleInputChange: (
        event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => void;
    handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SecondGroupFields: React.FC<SecondGroupFields> = ({
    artistData,
    handleInputChange,
    handleFileChange,
    }) => {
    return (
        <div className="flex flex-col justify-start px-0 md:px-6">
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
            <span className="text-unno_pr-500 font-roboto font-normal text-base inline-block">¿Es socio de espacio UNNO?</span>
            <div className="flex row justify-center mt-6">
            <InputRadio checked={artistData.is_partner.toString() == 'true'} name="is_partner" value='true' onChange={handleInputChange}>Si</InputRadio>
            <InputRadio checked={artistData.is_partner.toString() == 'false'} name="is_partner" value='false' onChange={handleInputChange}>No</InputRadio>
            </div>
        </div>
        <div className="box-border mb-6">
            <CharacterCounterTextarea
            label="description"
            labelName="Descripción"
            maxLength={255}
            heightTw='h-30'
            defaultContent={artistData.description}
            onChange={handleInputChange}
            />
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
