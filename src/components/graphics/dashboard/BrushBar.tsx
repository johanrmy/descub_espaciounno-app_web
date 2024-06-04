import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Brush } from 'recharts';

const BrushBarComponent: React.FC<{ data: ScanTopStatisticsResponse }> = ({ data }) => {

    return (
        <ResponsiveContainer width="100%" height={600}>
            <BarChart
                width={500}
                height={300}
                data={data.value}
                margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="brand" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                <ReferenceLine y={0} stroke="#000" />
                <Brush dataKey="brand" height={30} stroke="#8884d8" />
                <Bar dataKey="scanCount" fill="#8884d8" />
            </BarChart>
            </ResponsiveContainer>
        );
};


export default BrushBarComponent;
