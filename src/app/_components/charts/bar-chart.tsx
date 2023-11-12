
import { BarChart as BarChartComponent, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface Props {
    data: {
        name: string;
        value: number;
    }[],
}

export default function BarChart({ data }: Props) {
    return (
        <div>
            <ResponsiveContainer width="100%" minHeight={"300px"} height="100%">
                <BarChartComponent data={data}>
                    <XAxis dataKey="name" stroke="#333" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                    <Bar dataKey="value" fill="#82ca9d" barSize={30} isAnimationActive={true} />
                    <Legend verticalAlign="top" height={36}/>
                </BarChartComponent>
            </ResponsiveContainer>
        </div>
    );
}
