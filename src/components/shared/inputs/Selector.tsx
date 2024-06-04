import React, { useState, useEffect } from 'react';
import { UseFetchCities, UseFetchDistrictByCityId } from '@data/hooks/useFetchLocation';

interface CityDistrictSelectorProps {
  defaultCity?: string;
  defaultDistrict?: string;
  nameId: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const CityDistrictSelector: React.FC<CityDistrictSelectorProps> = ({ defaultCity = '', defaultDistrict = '', nameId, className, onChange}) => {
  const [selectedCity, setSelectedCity] = useState<string>(defaultCity);
  const [selectedDistrict, setSelectedDistrict] = useState<string>(defaultDistrict);

  const cities = UseFetchCities();
  const districts = UseFetchDistrictByCityId(selectedCity);

  useEffect(() => {
    setSelectedCity(defaultCity);
  }, [defaultCity]);

  useEffect(() => {
    setSelectedDistrict(defaultDistrict);
  }, [defaultDistrict]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const cityId = event.target.value;
    setSelectedCity(cityId);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const districtId = event.target.value;
    setSelectedDistrict(districtId);
    if(onChange){
      onChange(event)
    }
  };

  return (
    <div className={`flex flex-col sm:flex-row justify-around font-roboto ${className}`}>
      <div className='mb-3 sm:mb-0 flex flex-col'>
        <label htmlFor="citySelect" className="text-unno_pr-500 font-normal text-base inline-block mr-2">Ciudad:</label>
        <select id="citySelect" onChange={handleCityChange} value={selectedCity} className='p-2 font-nsans bg-dark_ud-100 rounded-xl' required>
          <option value="">Seleccione una ciudad</option>
          {cities.map(city => (
            <option key={city.id} value={city.id}>{city.name}</option>
          ))}
        </select>
      </div>

      {selectedCity && (
        <div className='mb-3 sm:mb-0 flex flex-col'>
          <label htmlFor={nameId} className="text-unno_pr-500 font-normal text-base inline-block mr-2">Distrito:</label>
          <select id={nameId} onChange={handleDistrictChange} value={selectedDistrict} name={nameId} className='p-2 font-nsans bg-dark_ud-100 rounded-xl' required>
            <option value="">Seleccione un distrito</option>
            {districts.map(district => (
              <option key={district.id} value={district.id}>{district.name}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default CityDistrictSelector;
