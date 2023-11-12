import { LineChart as LineChartComponent, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export interface Props {
    data: {
        name: string;
        value: number;
    }[],
}

export default function LineChart({ data }: Props) {
    return (
        <div>
            <ResponsiveContainer width="100%" minHeight={"300px"} height="100%">
                <LineChartComponent data={data}>
                    <Line type="monotone" dataKey="value" stroke="#83a6ed" strokeWidth={2} activeDot={{ r: 8 }} />
                    <CartesianGrid stroke="#dee2e6" strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={{ fontSize: 14 }} />
                    <YAxis tick={{ fontSize: 14 }} />
                    <Tooltip cursor={{ stroke: 'grey', strokeWidth: 2 }} />
                    <Legend verticalAlign="top" height={36}/>
                </LineChartComponent>
            </ResponsiveContainer>
        </div>
    );
}
