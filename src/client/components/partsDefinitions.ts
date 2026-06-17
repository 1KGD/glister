import React from "react";
import DebugStructure from "./debugStructure";

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
            render: DebugStructure
        },
        {
            name: "Not-so-cheap Frame",
            render: DebugStructure
        }
    ],
    ENGINE: [
        {
            name: "Debug Engine",
            render: DebugStructure
        }
    ]
} as { [key in keyof typeof ComponentGroup]: readonly IComponentDefinition[] };