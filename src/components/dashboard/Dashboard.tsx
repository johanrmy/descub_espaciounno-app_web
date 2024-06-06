import BrushBarComponent from '@components/graphics/dashboard/BrushBar';
import Layout from '@components/shared/Layout';
import Card from '@components/shared/cards/Card';
import InfoCard from '@components/shared/cards/InfoCard';
import Pagination from '@components/shared/extra/Pagination';
import Table from '@components/shared/table/Table';
import TableBody from '@components/shared/table/TableBody';
import TableHead from '@components/shared/table/TableHead';
import TableItem from '@components/shared/table/TableItem';
import TableRowItem from '@components/shared/table/TableRow';
import { useTableData } from '@data/hooks/useFetchData';
import { useFetchScans, useScansStatisticsData } from '@data/hooks/useFetchScans';
import { RiCoupon2Fill } from "react-icons/ri";

const Dashboard: React.FC = () => {
  const {currentMonthScans, totalScans, totalScansByBrand} = useScansStatisticsData();
  const {scans,columnHeaders,error,loading} = useFetchScans();

const { currentItems, pageCount, handlePageClick } = useTableData<Scan>({
    data: scans,
    itemsPerPage: 6,
});

  return (
    <Layout>
    <div className='flex flex-col sm:flex-row justify-between items-center mb-6'>
        <h1 className="text-2xl font-bold inline-block text-unno_pr-500 font-roboto">Dashboard</h1>
    </div>
    <div className="grid grid-rows-1 grid-cols-1 2xl:grid-cols-[800px_1fr]">
        <div className="flex flex-col justify-between px-0 md:px-6">
            <div className='flex flex-col lg:flex-row justify-around items-center'>
                <InfoCard data={{
                    value: totalScans.value,
                    message: totalScans.message,
                }} icon={<RiCoupon2Fill className='h-9 w-9'/>}/>
                <InfoCard data={{
                    value: currentMonthScans.value,
                    message: currentMonthScans.message
                }} icon={<RiCoupon2Fill className='h-9 w-9'/>}/>
            </div>
            <div className='flex flex-col justify-around'>
              <BrushBarComponent data={totalScansByBrand}/>
            </div>
        </div>
        <div className="flex flex-col justify-start px-0 md:px-6 xl:flex-grow">
          <Card loading={loading} error={error} className='min-h-[750px]'>
            <Table>
              <TableHead>
                {columnHeaders.map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </TableHead>
              <TableBody>
                {currentItems.map((scan) => (
                  <TableRowItem key={scan.id}>
                      <TableItem>{scan.id}</TableItem>
                      <TableItem>{scan.partnership_id}</TableItem>
                      <TableItem>{new Date(scan.create_datetime).toLocaleString()}</TableItem>
                      <TableItem>{scan.model}</TableItem>
                  </TableRowItem>
                ))}
              </TableBody>
            </Table>
          </Card>
          <Pagination handlePageClick={handlePageClick} pageCount={pageCount}/>
        </div>
    </div>
</Layout>
  );
};

export default Dashboard;
