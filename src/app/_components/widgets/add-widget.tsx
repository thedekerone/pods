import WidgetWrapper from "./widget-wrapper";
import { IoAddCircleOutline } from "react-icons/io5"
export default function AddWidget() {
    return <WidgetWrapper className="flex cursor-pointer items-center justify-center">
        <IoAddCircleOutline size={30} color="#333" />
    </WidgetWrapper>
}
