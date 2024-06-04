import BarChartComponent from '@components/graphics/coupon_generate/DataTable';
import Button from '@components/shared/buttons/Button';
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
import { useCouponsGenerateStatisticsData, useCouponsStatisticsData, useFetchCouponsGenerate } from '@data/hooks/useFetchCoupon';
import { useTableData } from '@data/hooks/useFetchData';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RiCoupon2Line } from "react-icons/ri";
import InfoCard from '@components/shared/cards/InfoCard';


const CouponGenerate: React.FC = () => {
    const {couponsGenerate, columnHeaders, loading, error} = useFetchCouponsGenerate();
    const [filteredId, setFilteredId] = useState('');
    const [filteredData, setFilteredData] = useState<CouponGenerate[]>([]);
    const {totalCoupons, currentMonthCoupons} = useCouponsStatisticsData();
    const {couponsGenerateByPeriod} = useCouponsGenerateStatisticsData();

    useEffect(() => {
        setFilteredData(couponsGenerate);
    }, [couponsGenerate]);

    const { currentItems, pageCount, handlePageClick } = useTableData<CouponGenerate>({
        data: filteredData,
        itemsPerPage: 6,
    });

    const handleFilterChange = (value: string) => {
        setFilteredId(value)
        const filtered = couponsGenerate.filter(couponGenerate => !value || couponGenerate.valid_from.toLowerCase().includes(value.toLowerCase()));
        setFilteredData(filtered);
    };
    
    return (
        <Layout>
            <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
                <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Paquetes</h1>
                <div className="flex items-center sm:flex-row flex-col-reverse">
                    <Input
                        type="text"
                        placeholder="Filtrar por valid from"
                        value={filteredId}
                        onChange={(e) => handleFilterChange(e.target.value)}
                        className="sm:mx-2 mx-0"
                    />
                    <Link to={`/generar-cupon`} className='w-full sm:w-auto sm:my-0 my-2'>
                        <Button bg='bg-green-500' hoverBgClass='hover:bg-green-600' color={false} className='sm:mr-10 py-2 w-full sm:w-auto'><span className='mx-5'>Registrar</span></Button>
                    </Link>
                </div>
            </div>
            <div className="grid grid-rows-1 grid-cols-1 2xl:grid-cols-[1020px_1fr]">
                <div className="flex flex-col justify-between px-0 md:px-6">
                    <div className='flex flex-col lg:flex-row justify-around items-center'>
                        <InfoCard data={{
                            value: totalCoupons.value,
                            message: totalCoupons.message,
                        }} icon={<RiCoupon2Line className='h-9 w-9'/>}/>
                        <InfoCard data={{
                            value: currentMonthCoupons.value,
                            message: currentMonthCoupons.message
                        }} icon={<RiCoupon2Line className='h-9 w-9'/>}/>
                    </div>
                    <div className='flex flex-col justify-around'>
                        <Card loading={loading} error={error} className='min-h-[390px]'>
                            <Table>
                                    <TableHead>
                                        {columnHeaders.map((header, index) => (
                                            <th key={index}>{header}</th>
                                        ))}
                                    </TableHead>
                                    <TableBody>
                                        {currentItems.map((couponGenerate) => (
                                            <TableRowItem key={couponGenerate.id}>
                                                <TableItem>{couponGenerate.id}</TableItem>
                                                <TableItem>{`[${new Date(couponGenerate.valid_from).toLocaleDateString()} | ${new Date(couponGenerate.valid_until).toLocaleDateString()}]`}</TableItem>
                                                <TableItem>{couponGenerate.amount}</TableItem>
                                                <TableItem><span className={`font-bold ${couponGenerate.status? 'text-green-500' : 'text-red-500'}`}>{couponGenerate.status ? 'Active' : 'Low'}</span></TableItem>
                                                <TableItem>{new Date(couponGenerate.update_datetime).toLocaleString()}</TableItem>
                                                <ActionItems nameAction={`${couponGenerate.id}`} baseUrl={BaseUrl.couponsGenerate}/>
                                            </TableRowItem>
                                        ))}
                                    </TableBody>
                                </Table>
                        </Card>
                        <Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>
                    </div>
                </div>
                <div className="flex flex-col justify-start px-0 md:px-6 xl:flex-grow">
                    <BarChartComponent data={couponsGenerateByPeriod}/>
                </div>
            </div>
        </Layout>
    );
};

export default CouponGenerate;
