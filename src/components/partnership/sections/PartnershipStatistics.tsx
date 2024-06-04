import InfoCard from '@components/shared/cards/InfoCard'
import Table from '@components/shared/table/Table';
import TableBody from '@components/shared/table/TableBody';
import TableHead from '@components/shared/table/TableHead';
import TableItem from '@components/shared/table/TableItem';
import TableRowItem from '@components/shared/table/TableRow';
import { usePartnershipsStatisticsData } from '@data/hooks/useFetchPartnerships';
import { FaCompressAlt } from "react-icons/fa";

const PartnershipStatistics: React.FC = () => {
    const { currentMonthPartnerships, totalPartnerships, topArtistByPartnership} = usePartnershipsStatisticsData();
    console.log(topArtistByPartnership.value)
    return (
    <div className="grid grid-cols-4 grid-rows-1 gap-4 mb-4">
        <div className="col-span-4 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 place-items-center">
            <InfoCard data={{
                value: totalPartnerships.value as number | null,
                message: totalPartnerships.message
            }} icon={<FaCompressAlt className='h-9 w-9' />} />
                        <InfoCard data={{
                value: currentMonthPartnerships.value as number | null,
                message: currentMonthPartnerships.message
            }} icon={<FaCompressAlt className='h-9 w-9' />} />
            <div className='bg-white rounded-2xl'>
                <Table>
                    <TableHead>
                        <th colSpan={2}>{topArtistByPartnership.message}</th>
                    </TableHead>
                    <TableBody>
                        {topArtistByPartnership.value.map((e) => (
                            <TableRowItem key={e.artist.id}>
                                <TableItem>{e.artist.nickname}</TableItem>
                                <TableItem>{e.partnershipCount}</TableItem>
                            </TableRowItem>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    </div>
    )
}

export default PartnershipStatistics