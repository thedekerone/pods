'use client'
import { LineChart as LineChartComponent, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface Props {
    data: {
        name: string;
        uv: number;
        pv: number;
        amt: number;
    }[],
}

export default function LineChart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" minHeight={"300px"} height="100%">
                 <LineChartComponent data={data}>
                    <Line type="monotone" dataKey="uv" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="pv" stroke="#82ca9d" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                </LineChartComponent>
        </ResponsiveContainer>
    );
}
