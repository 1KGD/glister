import React from 'react';
import * as Arwes from '@arwes/react';
import * as DREI from '@react-three/drei';
import { createRoot } from 'react-dom/client';
import * as THREE from 'three';
if (import.meta.env.DEV) await import("@colyseus/sdk/debug");
import './colors.css';
import './index.css';
import * as Router from 'react-router';
import Homepage from './homepage';
import * as Tesseract from 'tesseract';
import { type AccountClientData } from '../server/account';
import Editor from './editor/editor';

export type OutletContext = { loading: boolean, loggedIn: boolean, account: AccountClientData };

function LoginPage(): React.JSX.Element {
    return <Tesseract.Page focused position={new THREE.Vector3(0, 0, -1)}>
        <Arwes.Text as="h1">Login</Arwes.Text>
        <form method="post" action="/api/login">
            <input type="text" name="username" autoComplete="username" />
            <input type="password" name="password" autoComplete="current-password" />
            <input type="submit" />
        </form></Tesseract.Page>;
}

function CreateAccountPage(): React.JSX.Element {
    return <Tesseract.Page focused position={new THREE.Vector3(0, 0, -1)}>
        <Arwes.Text as="h1">Create Account</Arwes.Text>
        <form method="post" action="/api/createAccount">
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="submit" />
        </form>
    </Tesseract.Page>;
}

function App(): React.JSX.Element {
    return <>
        <Arwes.AnimatorGeneralProvider duration={{ enter: 5, exit: 5, stagger: 5, limit: 5 }} disabled={false}>
            <Arwes.BleepsProvider master={{ volume: 0.5 }} bleeps={{
                intro: {
                    sources: [
                        { src: 'https://arwes.dev/assets/sounds/intro.mp3', type: 'audio/mpeg' }
                    ]
                },
                click: {
                    sources: [
                        { src: 'https://arwes.dev/assets/sounds/click.mp3', type: 'audio/mpeg' }
                    ]
                }
            }}>
                <Tesseract.Wrapper>
                    {import.meta.env.DEV && <DREI.Stats />}
                    <Router.BrowserRouter>
                        <Router.Routes>
                            <Router.Route path="/" element={<Homepage />}>
                                <Router.Route path="login">
                                    <Router.Route index element={<LoginPage />} />
                                    <Router.Route path="error" element={<>Login Error</>} />
                                </Router.Route>
                                <Router.Route path="createAccount" element={<CreateAccountPage />} />
                            </Router.Route>
                            <Router.Route path="editor" element={<Editor />} />
                        </Router.Routes>
                    </Router.BrowserRouter>
                </Tesseract.Wrapper>
            </Arwes.BleepsProvider>
        </Arwes.AnimatorGeneralProvider>
    </>;
}

createRoot(document.getElementById("root")).render(<App />);