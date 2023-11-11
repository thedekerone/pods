'use client'
import { BarChart as BarChartComponent, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface Props {
    data: {
        name: string;
        uv: number;
        pv: number;
        amt: number;
    }[],
}

export default function BarChart({ data }: Props) {
    return (
        <ResponsiveContainer width="100%" minHeight={"300px"} height="100%">
            <BarChartComponent width={600} height={300} data={data}>
                <XAxis dataKey="name" stroke="#8884d8" />
                <YAxis />
                <Tooltip />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Bar dataKey="uv" fill="#8884d8" barSize={30} />
                <Bar dataKey="pv" fill="#ff0000" barSize={30} />
            </BarChartComponent>
        </ResponsiveContainer>
    );
}
