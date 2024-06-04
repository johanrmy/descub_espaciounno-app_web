import { useEffect, useState } from 'react';
import Table from '@components/shared/table/Table';
import TableHead from '@components/shared/table/TableHead';
import TableBody from '@components/shared/table/TableBody';
import TableItem from '@components/shared/table/TableItem';
import ActionItems from '@components/shared/extra/ActionItems';
import TableRowItem from '@components/shared/table/TableRow';
import Card from '@components/shared/cards/Card';
import {useFetchArtists} from '@data/hooks/useFetchArtists';
import Layout from '@components/shared/Layout';
import { Link } from 'react-router-dom';
import Button from '@components/shared/buttons/Button';
import { BaseUrl } from '@data/enums/baseUrls';
import { useTableData } from '@data/hooks/useFetchData'
import Pagination from '@components/shared/extra/Pagination';
import Input from '@components/shared/inputs/Input';
import ArtistStatistics from './sections/ArtistStatistics';

const ArtistComponent: React.FC = () => {
    const { artists, columnHeaders, loading, error } = useFetchArtists();
    const [filteredNickname, setFilteredNickname] = useState('');
    const [filteredData, setFilteredData] = useState<Artist[]>([]);

    useEffect(() => {
        setFilteredData(artists);
    }, [artists]);

    const { currentItems, pageCount, handlePageClick } = useTableData<Artist>({
        data: filteredData,
        itemsPerPage: 6,
    });

    const handleFilterChange = (value: string) => {
        setFilteredNickname(value)
        const filtered = artists.filter(artist => !value || artist.nickname.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };

    return (
        <Layout>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Artistas</h1>
                <div className="flex items-center sm:flex-row flex-col-reverse">
                    <Input
                        type="text"
                        placeholder="Filtrar por nickname"
                        value={filteredNickname}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="sm:mx-2 mx-0"
                    />
                    <Link to={`create`} className='w-full sm:w-auto sm:my-0 my-2'>
                        <Button bg='bg-green-500' hoverBgClass='hover:bg-green-600' color={false} className='sm:mr-10 py-2 w-full sm:w-auto'><span className='mx-5'>Registrar</span></Button>
                    </Link>
                </div>
            </div>
            <ArtistStatistics/>
            <Card loading={loading} error={error} className='min-h-[390px]'>
                <Table>
                    <TableHead>
                        {columnHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </TableHead>
                    <TableBody>
                        {currentItems.map((artist) => (
                            <TableRowItem key={artist.id}>
                                <TableItem>{artist.id}</TableItem>
                                <TableItem>{artist.nickname}</TableItem>
                                <TableItem>{artist.name} {artist.last_name}</TableItem>
                                <TableItem>{artist.email}</TableItem>
                                <TableItem><span className={`font-bold ${artist.is_partner ? 'text-green-500' : 'text-red-500'}`}>{artist.is_partner ? 'Yes' : 'No'}</span></TableItem>
                                <TableItem>{new Date(artist.update_datetime).toLocaleString()}</TableItem>
                                <ActionItems nameAction={`${artist.id}`} baseUrl={BaseUrl.artists}/>
                            </TableRowItem>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>
        </Layout>
    );
};

export default ArtistComponent;
