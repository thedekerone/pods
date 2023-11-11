import BarChart from "./_components/charts/bar-chart";
import LineChart from "./_components/charts/line-chart";
import Chatbot from "./_components/chatbot";
import Navbar from "./_components/navbar";
import AddWidget from "./_components/widgets/add-widget";
import WidgetWrapper from "./_components/widgets/widget-wrapper";
const data = [
    { name: 'Page A', uv: 400, pv: 2400, amt: 2400 },
    { name: 'Page B', uv: 300, pv: 1398, amt: 2210 },
    { name: 'Page C', uv: 200, pv: 9800, amt: 2290 },
    { name: 'Page D', uv: 278, pv: 3908, amt: 2000 },
    { name: 'Page E', uv: 189, pv: 4800, amt: 2181 },
    { name: 'Page F', uv: 239, pv: 3800, amt: 2500 },
    { name: 'Page G', uv: 349, pv: 4300, amt: 2100 },
];
export default function Home() {
    return <>
        <Navbar/>
        <Chatbot/>
        <div className="grid gap-6 grid-cols-3 m-4">
            <AddWidget />
            <WidgetWrapper >
                <LineChart data={data} />
            </WidgetWrapper>
            <WidgetWrapper className="row-span-2">
                <LineChart data={data} />
            </WidgetWrapper>
            <WidgetWrapper className="col-span-2">
                <BarChart data={data} />
            </WidgetWrapper>
        </div>
    </>
}

