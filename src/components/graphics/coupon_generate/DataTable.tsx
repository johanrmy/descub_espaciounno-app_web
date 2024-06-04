import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label } from 'recharts';


interface Coupon {
  coupon_generate_id: string;
  total_coupons: number;
}

interface CouponGenerateStatisticsResponse {
  success: boolean;
  message: string;
  value: { [key: string]: Coupon[] };
}

const transformData = (data: { [key: string]: Coupon[] }) => {
  const transformedData: Array<{ period: string; [key: string]: number | string }> = [];

  for (const [period, coupons] of Object.entries(data)) {
    const entry: { period: string; [key: string]: number | string } = { period };
    coupons.forEach((coupon) => {
      entry[coupon.coupon_generate_id] = coupon.total_coupons;
    });
    transformedData.push(entry);
  }

  return transformedData;
};

const CustomYAxisTick: React.FC<any> = ({ x, y, payload }) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={45} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">
        {payload.value}
      </text>
    </g>
  );
};

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const totalCoupons = payload.reduce((total: number, entry: any) => total + entry.value, 0);

    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#fff', padding: '10px', border: '1px solid #ccc' }}>
        <p className="label">{`${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="intro">{`${entry.dataKey}, Total: ${entry.value}`}</p>
        ))}
        <p className="total">Total de cupones: {totalCoupons}</p>
      </div>
    );
  }

  return null;
};

const BarChartComponent: React.FC<{ data: CouponGenerateStatisticsResponse }> = ({ data }) => {
  const dataArray = transformData(data.value);

  const couponIds = [...new Set(dataArray.flatMap(entry => Object.keys(entry).filter(key => key !== 'period')))];
  const colors = ['#BDBDBD', '#FECA80'];
  return (
    <>
      <h2 className='mb-5 text-center mr-10 text-xl text-unno_pr-500 font-bold font-roboto'>Cupones por periodo</h2>
      <ResponsiveContainer width="100%" height={650} className="p-0 sm:p-0 xl:p-20 2xl:p-0">
      <BarChart
        data={dataArray}
        layout="vertical"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="4 4" />
        <XAxis type="number" reversed>
        <Label value="Cupones" offset={0} position="insideBottom" />
        </XAxis>
        <YAxis type="category" dataKey="period" tick={<CustomYAxisTick/>} orientation='right' />
        <Tooltip content={<CustomTooltip />} />
        {couponIds.map((id, index) => (
          <Bar key={index} dataKey={id} stackId="a" fill={colors[index % colors.length]} />
        ))}
      </BarChart>
    </ResponsiveContainer>
    </>
  );
};


export default BarChartComponent;
