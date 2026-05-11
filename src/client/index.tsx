import React from 'react';
import { createRoot } from 'react-dom/client';
import config from '../../config';
if (config.dev) import("@colyseus/sdk/debug");


function App(): React.JSX.Element {
    return <>Hello, World!</>;
}

createRoot(document.getElementById("root")).render(<App />);