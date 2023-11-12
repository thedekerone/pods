"use client";
import { useState } from "react";
import {  type ChartType, type Widget } from "@prisma/client";
import { Button } from "../ui/button";
import WidgetWrapper from "./widget-wrapper";
import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "../modal";
import { api } from "~/trpc/react";

interface Props {
  addWidget: (widget: Widget ) => void;
}
export default function AddWidget({ addWidget }: Props) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [selected, setSelected] = useState<ChartType>("NEWS");
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [clicked, setClicked] = useState(false);

  const ai = api.ai.getNews.useMutation();
  const createWidget = api.widget.create.useMutation({
    onMutate: () => {
      setLoading(true);
    },
    onSuccess: (data) => {
      addWidget(data);
      setLoading(false);
    },
    onError: () => {
      setLoading(false);
    },
  });
  async function handleClick() {
    if (selected === "NEWS") {
        setLoading(true)
        const today = new Date()
        const result = await ai.mutateAsync({question:input});
        createWidget.mutate({name: `News ${today.toDateString()}`, chartType: selected, description: result.summary, sources:result.sources})
        setModalOpen(false)
        setLoading(false)
        setInput("")
    }
  }


  return (
    <>
      <Button
        className="flex h-full w-full flex-col "
        variant={"ghost"}
        onClick={() => {
          setClicked(true);
        }}
      >
        <WidgetWrapper className="flex h-full w-full cursor-pointer flex-col items-center justify-center gap-4">
          {clicked ? (
            <>
              <Button disabled onClick={() => setModalOpen(true)}>
                Create chart widget
              </Button>

              <Button onClick={() => setModalOpen(true)}>
                Create news widget
              </Button>
            </>
          ) : (
            <>
              <IoAddCircleOutline size={30} color="#333" />
            </>
          )}
        </WidgetWrapper>
      </Button>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-6">
          <p className="mb-4 text-lg text-gray-700">Your modal content here</p>

          <div className="py-2">
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <Button
            disabled={loading}
            onClick={handleClick}
            className={`mt-4 w-full rounded-lg p-3 font-bold text-white ${
              loading ? "bg-gray-400" : "bg-primary hover:bg-primary/70"
            }`}
          >
            Create chart
          </Button>
        </div>
      </Modal>
    </>
  );
}
