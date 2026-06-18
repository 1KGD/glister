import React from "react";
import DebugStructure from "./debugStructure";
import Teapot from "./teapot";

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
            name: "Teapot Engine",
            render: Teapot
        }
    ]
} as { [key in keyof typeof ComponentGroup]: readonly IComponentDefinition[] };