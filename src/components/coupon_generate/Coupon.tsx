import Card from '@components/shared/cards/Card';
import ActionItems from '@components/shared/extra/ActionItems';
import Pagination from '@components/shared/extra/Pagination';
import Input from '@components/shared/inputs/Input';
import Layout from '@components/shared/Layout';
import Table from '@components/shared/table/Table';
import TableBody from '@components/shared/table/TableBody';
import TableHead from '@components/shared/table/TableHead';
import TableItem from '@components/shared/table/TableItem';
import TableRowItem from '@components/shared/table/TableRow';
import { BaseUrl } from '@data/enums/baseUrls';
import { useFetchCouponGenerateById } from '@data/hooks/useFetchCoupon';
import { useTableData } from '@data/hooks/useFetchData';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const Coupon: React.FC = () => {
    const { id } = useParams();
    const {coupons, couponGenerate, columnHeaders, loading, error} = useFetchCouponGenerateById(id || '');
    const [filteredId, setFilteredId] = useState('');
    const [filteredData, setFilteredData] = useState<Coupon[]>([]);

    useEffect(() => {
        setFilteredData(coupons);
    }, [coupons]);

    const { currentItems, pageCount, handlePageClick } = useTableData<Coupon>({
        data: filteredData,
        itemsPerPage: 2,
    });

    const handleFilterChange = (value: string) => {
        setFilteredId(value)
        const filtered = coupons.filter(coupon => !value || coupon.id.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };
    
    return (
        <Layout>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Cupones del paquete {couponGenerate?.id}</h1>
                <div className="flex items-center sm:flex-row flex-col-reverse">
                    <Input
                        type="text"
                        placeholder="Filtrar por ID"
                        value={filteredId}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="sm:mx-2 mx-0"
                    />
                </div>
            </div>
            <Card loading={loading} error={error}>
            <Table>
                    <TableHead>
                        {columnHeaders.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </TableHead>
                    <TableBody>
                        {currentItems.map((coupon) => (
                            <TableRowItem key={coupon.id}>
                                <TableItem>{coupon.id}</TableItem>
                                <TableItem>{new Date(coupon.create_datetime).toLocaleDateString()}</TableItem>
                                <TableItem>{coupon.discount}</TableItem>
                                <TableItem><span className={`font-bold ${coupon.status? 'text-green-500' : 'text-red-500'}`}>{coupon.status ? 'Active' : 'Low'}</span></TableItem>
                                <TableItem>{new Date(coupon.update_datetime).toLocaleString()}</TableItem>
                                <ActionItems nameAction={`${coupon.id}`} baseUrl={BaseUrl.coupons} activateRead={false} activateUpdate={false}/>
                            </TableRowItem>
                        ))}
                    </TableBody>
                </Table>
            </Card>
            <Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>
        </Layout>
    );
};

export default Coupon;
