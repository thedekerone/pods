"use client";
import { useState } from "react";
import { type Widget } from "@prisma/client";
import { Button } from "../ui/button";
import WidgetWrapper from "./widget-wrapper";
import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "../modal";
import { api } from "~/trpc/react";

interface Props {
    addWidget: (widget: Widget) => void;
}
export default function AddWidget({ addWidget }: Props) {
    const [loading, setLoading] = useState(false);
    const createWidget = api.widget.create.useMutation({
        onMutate: () => {
            setLoading(true);
        },
        onSuccess: (data) => {
            addWidget(data);
            setLoading(false);
        },
        onError: () => {
            setLoading(true);
        },
    });
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [clicked, setClicked] = useState(false);
    return (
        <>
            <Button
                className="flex w-full h-full flex-col "
                variant={"ghost"}
                onClick={() => {
                    setClicked(true);
                }}
            >
                <WidgetWrapper className="flex gap-4 w-full h-full cursor-pointer items-center justify-center flex-col">
                    {clicked ? (
                        <>
                            <Button onClick={() => setModalOpen(true)}>
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
                <p className="text-gray-700">Your modal content here</p>
                <Button disabled={loading} onClick={() => createWidget.mutate()}>
                    Create chart
                </Button>
            </Modal>
        </>
    );
}
