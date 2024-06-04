import Table from '@components/shared/table/Table';
import TableHead from '@components/shared/table/TableHead';
import TableBody from '@components/shared/table/TableBody';
import TableItem from '@components/shared/table/TableItem';
import ActionItems from '@components/shared/extra/ActionItems';
import TableRowItem from '@components/shared/table/TableRow';
import Card from '@components/shared/cards/Card';
import {useFetchMurals} from '@data/hooks/useFetchMurals';
import Layout from '@components/shared/Layout';
import Button from '@components/shared/buttons/Button';
import { Link } from 'react-router-dom';
import { BaseUrl } from '@data/enums/baseUrls';
import Pagination from '@components/shared/extra/Pagination';
import { useTableData } from '@data/hooks/useFetchData';
import { useEffect, useState } from 'react';
import Input from '@components/shared/inputs/Input';
import MuralStatistics from './sections/MuralStatistics';

const MuralComponent: React.FC = () => {
    const { murals, columnHeaders, loading, error } = useFetchMurals();
    const [filteredNickname, setFilteredNickname] = useState('');
    const [filteredData, setFilteredData] = useState<Mural[]>([]);

    useEffect(() => {
        setFilteredData(murals);
    }, [murals]);

    const { currentItems, pageCount, handlePageClick } = useTableData<Mural>({
        data: filteredData,
        itemsPerPage: 6,
    });

    const handleFilterChange = (value: string) => {
        setFilteredNickname(value)
        const filtered = murals.filter(mural => !value || mural.name.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };
    return (
        <Layout>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Murales</h1>
                <div className="flex items-center sm:flex-row flex-col-reverse">
                    <Input
                        type="text"
                        placeholder="Filtrar por nombre"
                        value={filteredNickname}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="sm:mx-2 mx-0"
                    />
                    <Link to={`create`} className='w-full sm:w-auto sm:my-0 my-2'>
                        <Button bg='bg-green-500' hoverBgClass='hover:bg-green-600' color={false} className='sm:mr-10 py-2 w-full sm:w-auto'><span className='mx-5'>Registrar</span></Button>
                    </Link>
                </div>
            </div>
            <MuralStatistics/>
            <Card loading={loading} error={error} className='min-h-[390px]'>
                <Table>
                    <TableHead>
                    {columnHeaders.map((header, index) => (
                        <th key={index}>{header}</th>
                    ))}
                    </TableHead>
                    <TableBody>
                    {currentItems.map((mural) => (
                        <TableRowItem key={mural.id}>
                        <TableItem>{mural.id}</TableItem>
                        <TableItem>{mural.name}</TableItem>
                        <TableItem>{new Date(mural.creation_date).toLocaleDateString()}</TableItem>
                        <TableItem>
                            {mural.address.name}, {mural.address.district.name}, {mural.address.district.city.name}
                        </TableItem>
                        <TableItem>{new Date(mural.update_datetime).toLocaleString()}</TableItem>
                        <ActionItems nameAction={`${mural.id}`} baseUrl={BaseUrl.murals}/>
                        </TableRowItem>
                    ))}
                    </TableBody>
                </Table>
            </Card>
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>
        </Layout>
    );
};

export default MuralComponent;
