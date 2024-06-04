import React, { useEffect, useState } from 'react';
import Table from '@components/shared/table/Table';
import TableHead from '@components/shared/table/TableHead';
import TableBody from '@components/shared/table/TableBody';
import TableItem from '@components/shared/table/TableItem';
import ActionItems from '@components/shared/extra/ActionItems';
import TableRowItem from '@components/shared/table/TableRow';
import Card from '@components/shared/cards/Card';
import Layout from '@components/shared/Layout';
import { Link } from 'react-router-dom';
import Button from '@components/shared/buttons/Button';
import { BaseUrl } from '@data/enums/baseUrls';
import Pagination from '@components/shared/extra/Pagination';
import { useFetchPartnerships } from '@data/hooks/useFetchPartnerships';
import { useTableData } from '@data/hooks/useFetchData';
import Input from '@components/shared/inputs/Input';
import PartnershipStatistics from './sections/PartnershipStatistics';

const PartnershipComponent: React.FC = () => {
    const { partnerships, columnHeaders, loading, error } = useFetchPartnerships();
    const [filteredNickname, setFilteredNickname] = useState('');
    const [filteredData, setFilteredData] = useState<Partnership[]>([]);

    useEffect(() => {
        setFilteredData(partnerships);
    }, [partnerships]);

    const { currentItems, pageCount, handlePageClick } = useTableData<Partnership>({
        data: filteredData,
        itemsPerPage: 6,
    });

    const handleFilterChange = (value: string) => {
        setFilteredNickname(value)
        const filtered = partnerships.filter(partnership => !value || partnership.artist.nickname.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };
    return (
        <Layout>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Partnership</h1>
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
            <PartnershipStatistics/>
            <Card loading={loading} error={error} className='min-h-[390px]'>
                <Table>
                    <TableHead>
                        {columnHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </TableHead>
                    <TableBody>
                        {currentItems.map((partnership) => (
                            <TableRowItem key={partnership.id}>
                                <TableItem>{partnership.id}</TableItem>
                                <TableItem>{new Date(partnership.create_datetime).toLocaleDateString()}</TableItem>
                                <TableItem className='italic'>
                                    <Link to={`/artistas/read/${partnership.artist.id}`}>{partnership.artist.id}</Link>
                                </TableItem>
                                <TableItem>{partnership.artist.nickname}</TableItem>
                                <TableItem className='italic'>
                                    <Link to={`/murales/read/${partnership.mural.id}`}>{partnership.mural.id}</Link>
                                </TableItem>
                                <TableItem>{partnership.mural.name}</TableItem>
                                <ActionItems nameAction={`${partnership.id}`} baseUrl={BaseUrl.partnerships} activateRead={false} />
                            </TableRowItem>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount} />
        </Layout>
    );
};

export default PartnershipComponent;
