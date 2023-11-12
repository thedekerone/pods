import React, { type ReactNode } from "react";
import clsx from "clsx";
import { Badge } from "../ui/badge";

interface WrapperProps {
    children: ReactNode;
    className?: string;
    name?: string;
}

const WidgetWrapper: React.FC<WrapperProps> = ({
    children,
    className,
    name,
}) => {
    return (
        <div className={clsx("bg-white shadow-lg p-4 rounded-lg", className)}>
            {name && <Badge className="mb-4">{name}</Badge>}
            {children}
        </div>
    );
};

export default WidgetWrapper;
