import React, { useState } from 'react';
import InputRadio from "@components/shared/inputs/InputRadio";

interface MuralSelectFieldProps {
    partnershipData: PartnershipRequestEntry,
    murals: Mural[],
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
}

const MuralSelectField: React.FC<MuralSelectFieldProps> = ({
    partnershipData,
    murals,
    handleInputChange,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredMurals = murals.filter(mural =>
        mural.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col justify-start px-0 md:px-6 w-full min-h-full max-h-[740px]">
            <h2 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">Mural</h2>
            <input 
                type="text"
                placeholder="Buscar por nombre"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded-xl font-nsans focus:border-gray-400 transition focus:outline-none leading-tight"
            />
            <div className="box-border mb-6 flex justify-center items-start flex-wrap overflow-y-auto">
                {filteredMurals.map((mural) => (
                    <InputRadio 
                        key={mural.id}
                        backgroundImageUrl={mural.url_photo_1} 
                        name="mural_id" 
                        value={mural.id} 
                        widthClass="w-44" 
                        heightClass="h-44" 
                        onChange={handleInputChange} 
                        checked={mural.id === partnershipData.mural_id}
                    >
                        {mural.name}
                    </InputRadio>
                ))}
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

export default MuralSelectField;
