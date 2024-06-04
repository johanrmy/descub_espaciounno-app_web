import CharacterCounterTextarea from "@components/shared/inputs/CounterTextArea";
import Input from "@components/shared/inputs/Input";
import CityDistrictSelector from "@components/shared/inputs/Selector";
import Map from "@components/shared/extra/Map";

interface FirstGroupFields {
    mural?: Mural | null
    muralData: MuralRequestEntry,
    clickedCoords: marker,
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void,
    handleNewMarkerCoords: (coords: marker) => void,
}


const FirstGroupFields: React.FC<FirstGroupFields> = ({
    mural,
    muralData,
    clickedCoords,
    handleInputChange,
    handleNewMarkerCoords,
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
            value={muralData.mural.name}
            required={true}
            />
        </div>
        <div className="box-border">
            <CharacterCounterTextarea
            label="description"
            labelName="Descripción"
            defaultContent={muralData.mural.description}
            onChange={handleInputChange}
            />
        </div>
        <div className="box-border mb-6">
            <Input
            label="address.name"
            labelName="Dirección"
            type="text"
            nameid="address.name"
            onChange={handleInputChange}
            value={muralData.address.name}
            required={true}
            />
        </div>
        <div className="box-border mb-6">
            <CityDistrictSelector
            nameId="address.district_id"
            defaultCity={mural?.address.district.city.id}
            defaultDistrict={muralData.address.district_id}
            onChange={handleInputChange}
            />
        </div>
        <div className="box-border">
            <Map
            markers={mural ? [
                {
                lat: mural?.location.coordinates[1] as number,
                lng: mural?.location.coordinates[0] as number,
                },
            ]: []}
            AddMarker={true}
            onNewMarkerCoords={handleNewMarkerCoords}
            />
            <div className="hidden justify-center items-center sm:flex sm:flex-row text-dark_ud-500">
            <Input
                label="lat"
                nameid="lat"
                type="text"
                value={String(clickedCoords.lat)}
                onChange={handleInputChange}
                readonly
                className="w-min mx-auto border-0 shadow-transparent text-center"
            />
            <span>-</span>
            <Input
                label="lng"
                nameid="lng"
                type="text"
                value={String(clickedCoords.lng)}
                onChange={handleInputChange}
                readonly
                className="w-min mx-auto border-0 shadow-transparent text-center"
            />
            </div>
        </div>
        </div>
    );
};

export default FirstGroupFields;