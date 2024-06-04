import InfoCard from '@components/shared/cards/InfoCard'
import CityDistrictSelector from '@components/shared/inputs/Selector'
import { useMuralsInputStatisticsData, useMuralsStatisticsData } from '@data/hooks/useFetchMurals'
import React, { useEffect, useState } from 'react'
import { FaBrush } from 'react-icons/fa'
import { FaMapMarker } from "react-icons/fa";

const MuralStatistics: React.FC = () => {
    const { currentMonthMurals, totalMurals } = useMuralsStatisticsData();
    const { handleTotalMuralsByDistrict, statusTotalMuralsByDistrict } = useMuralsInputStatisticsData();
    const [selectedDistrictId, setSelectedDistrictId] = useState<string>('dscdst000091');

    const handleChangeDistrict = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedDistrictId(event.target.value);
        if (selectedDistrictId) {
            handleTotalMuralsByDistrict(selectedDistrictId);
        }
        };
    
    useEffect(() => {
        if (selectedDistrictId) {
            handleTotalMuralsByDistrict(selectedDistrictId);
            setSelectedDistrictId('')
        }
    }, [selectedDistrictId, handleTotalMuralsByDistrict]);
    
    return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-4">
        <div className="col-span-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
            <InfoCard data={{
                value: totalMurals.value,
                message: totalMurals.message
            }} icon={<FaBrush className='h-9 w-9' />} />
                        <InfoCard data={{
                value: statusTotalMuralsByDistrict.value,
                message: statusTotalMuralsByDistrict.message
            }} icon={<FaMapMarker className='h-9 w-9' />} />
            <InfoCard data={{
                value: currentMonthMurals.value,
                message: currentMonthMurals.message
            }} icon={<FaBrush className='h-9 w-9' />} />
            <div className='xl:col-start-2'>
                <form action="" method="GET">
                    <CityDistrictSelector nameId='district_id' onChange={handleChangeDistrict} className='rounded-md bg-white p-2 transition-height lg:flex-col 2xl:flex-row shadow-sm'/>
                </form>
            </div>
            </div>
        </div>
    )
}

export default MuralStatistics