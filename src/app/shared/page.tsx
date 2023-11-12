import { api } from "~/trpc/server";
import Chatbot from "../_components/chatbot";
import Navbar from "../_components/navbar";
import WidgetDisplayer from "../_components/widgets/widget-displayer";

export default async function Shared() {
    const data = await api.widget.getAll.query();
    console.log(data);
    return (
        <>
            <Navbar />
            <Chatbot />
            <WidgetDisplayer hasAddButton={false} data={data} />
        </>
    );
}
