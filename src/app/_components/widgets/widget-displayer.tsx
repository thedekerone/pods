"use client";
import { ChartType, type WidgetData, type Sources, type Widget } from "@prisma/client";
import WidgetWrapper from "./widget-wrapper";
import BarChart from "../charts/bar-chart";
import LineChart from "../charts/line-chart";
import { useState } from "react";
import AddWidget from "./add-widget";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function WidgetDisplayer({
  data,
  hasAddButton = true,
}: {
  data: Widget[];
  hasAddButton?: boolean;
}) {
  const [widgets, setWidgets] = useState<Widget[]>(data || []);

  const addWidget = (widget: Widget) => {
    setWidgets([...widgets, widget]);
  };

  return (
    <>
      <div className="m-4 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {hasAddButton && <AddWidget addWidget={addWidget} />}
        {widgets.map((widget: (Widget & {sources?: Sources[]; data?: WidgetData[]})) => {
          if (widget.chartType === ChartType.BAR) {
            return (
              <WidgetWrapper name={widget.name} key={widget.id}>
                {/*@ts-expect-error json value*/}
                <BarChart name={widget.name} data={widget.data} />
              </WidgetWrapper>
            );
          } else if (widget.chartType === ChartType.LINE) {
            return (
              <WidgetWrapper name={widget.name} key={widget.id}>
                {/*@ts-expect-error json value*/}
                <LineChart data={widget.data} name={widget.name} />
              </WidgetWrapper>
            );
          } else {
            return (
              <WidgetWrapper name={widget.name} key={widget.id}>
                <div>
                  {widget.description}
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Sources</AccordionTrigger>
                      <AccordionContent>
                        <ol>
                            {widget?.sources?.map((source: Sources)=>{
                                return <li className="text-blue-500 hover:underline"  key={source.id}><a target="_blank" href={source.url}>{source.url}</a></li>
                            })}
                        </ol>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </WidgetWrapper>
            );
          }
        })}
      </div>
    </>
  );
}
