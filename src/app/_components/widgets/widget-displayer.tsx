"use client";
import { ChartType, type Widget } from "@prisma/client";
import WidgetWrapper from "./widget-wrapper";
import BarChart from "../charts/bar-chart";
import LineChart from "../charts/line-chart";
import { useState } from "react";
import AddWidget from "./add-widget";

export default function WidgetDisplayer({
    data,
    hasAddButton = true,
}: { data: Widget[]; hasAddButton?: boolean }) {
    const [widgets, setWidgets] = useState<Widget[]>(data || []);

    const addWidget = (widget: Widget) => {
        setWidgets([...widgets, widget]);
    };

    return (
        <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 m-4">
                {hasAddButton && <AddWidget addWidget={addWidget} />}
                {widgets.map((widget) => {
                    if (widget.chartType === ChartType.BAR) {
                        return (
                            <WidgetWrapper name={widget.name} key={widget.id}>
                                {/*@ts-expect-error json value*/}
                                <BarChart name={widget.name} data={widget.data} />
                            </WidgetWrapper>
                        );
                    } else {
                        return (
                            <WidgetWrapper name={widget.name} key={widget.id}>
                            {/*@ts-expect-error json value*/}
                                <LineChart data={widget.data} name={widget.name} />
                            </WidgetWrapper>
                        );
                    }
                })}
            </div>
        </>
    );
}
