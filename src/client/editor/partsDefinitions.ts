import React from "react";
import EditorReactor from "./components/reactor";

export enum ComponentGroup {
    STRUCTURE = "Structures",
    ENGINE = "Engines",
}

export interface IComponentDefinition {
    readonly name: string,
    readonly render: () => React.JSX.Element,
}

export default {
    STRUCTURE: [
        {
            name: "Cheap Frame",
            render: EditorReactor
        },
        {
            name: "Not-so-cheap Frame",
            render: EditorReactor
        }
    ],
    ENGINE: [
        {
            name: "Debug Engine",
            render: EditorReactor
        }
    ]
} as { [key in keyof typeof ComponentGroup]: readonly IComponentDefinition[] };