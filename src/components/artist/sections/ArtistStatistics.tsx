import InfoCard from '@components/shared/cards/InfoCard'
import { useArtistsStatisticsData } from '@data/hooks/useFetchArtists'
import { FaCheck } from "react-icons/fa";
import { FaMale } from "react-icons/fa";

const ArtistStatistics: React.FC = () => {
    const { totalArtists, currentMonthArtists, totalPartnerArtists } = useArtistsStatisticsData();

    return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-4">
        <div className="col-span-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
            <InfoCard data={{
                value: totalArtists.value,
                message: totalArtists.message
            }} icon={<FaMale className='h-9 w-9' />} />
                        <InfoCard data={{
                value: currentMonthArtists.value,
                message: currentMonthArtists.message
            }} icon={<FaMale className='h-9 w-9' />} />
            <InfoCard data={{
                value: totalPartnerArtists.value,
                message: totalPartnerArtists.message
            }} icon={<FaCheck className='h-9 w-9' />} />
            </div>
        </div>
    )
}

export default ArtistStatistics