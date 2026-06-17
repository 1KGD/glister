import React from "react";
import EditorReactor from "./components/reactor";

export enum ComponentGroup {
    STRUCTURE = "Structure"
}

export interface IComponentDefinition {
    name: string,
    render: () => React.JSX.Element,
}

export default {
    STRUCTURE: [
        {
            name: "Debug Structure",
            render: EditorReactor
        }
    ]
} as { [key in keyof typeof ComponentGroup]: IComponentDefinition[] };