import React, { useState } from 'react';
import InputRadio from "@components/shared/inputs/InputRadio";

interface ArtistSelectFieldProps {
    partnershipData: PartnershipRequestEntry,
    artists: Artist[],
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
}

const ArtistSelectField: React.FC<ArtistSelectFieldProps> = ({
    partnershipData,
    artists,
    handleInputChange,
}) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const filteredArtists = artists.filter(artist =>
        artist.nickname.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="flex flex-col justify-start px-0 md:px-6 w-full min-h-full max-h-[740px]">
            <h2 className="text-2xl font-bold mb-4 text-unno_pr-500 font-roboto">Artista</h2>
            <input 
                type="text"
                placeholder="Buscar por nickname"
                value={searchTerm}
                onChange={handleSearchChange}
                className="mb-4 p-2 border border-gray-300 rounded-xl font-nsans focus:border-gray-400 transition focus:outline-none leading-tight"
            />
            <div className="box-border mb-6 flex justify-center items-start flex-wrap overflow-y-auto">
                {filteredArtists.map((artist) => (
                    <InputRadio 
                        key={artist.id}
                        backgroundImageUrl={artist.url_photo1} 
                        name="artist_id" 
                        value={artist.id} 
                        widthClass="w-44" 
                        heightClass="h-44" 
                        onChange={handleInputChange} 
                        checked={artist.id === partnershipData.artist_id}
                    >
                        {artist.nickname}
                    </InputRadio>
                ))}
            </div>
        </div>
    );
};

export default ArtistSelectField;
