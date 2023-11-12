import { api } from "~/trpc/server";
import Chatbot from "./_components/chatbot";
import Navbar from "./_components/navbar";
import WidgetDisplayer from "./_components/widgets/widget-displayer";

export default async function Home() {
    const data = await api.widget.getAll.query();
    console.log(data);
    return (
    <>
            <Navbar />
            <Chatbot />
    <WidgetDisplayer data={data.slice(0,5)}/>
    </>
    );
}
