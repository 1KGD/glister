import React from 'react';
import * as Arwes from '@arwes/react';
import * as Emotion from '@emotion/react';
import { createRoot } from 'react-dom/client';
import config from '../../config';
if (config.dev) await import("@colyseus/sdk/debug");
import './colors.css';
import './index.css';
import * as Router from 'react-router';
import Homepage from './homepage';
import * as Tesseract from 'tesseract';
import { type AccountClientData } from '../server/account';

export type OutletContext = { loading: boolean, loggedIn: boolean, account: AccountClientData };

function LoginPage(): React.JSX.Element {
    return <Tesseract.Modal title="Login">
        <form method="post" action="/api/login">
            <input type="text" name="username" autoComplete="username" />
            <input type="password" name="password" autoComplete="current-password" />
            <input type="submit" />
        </form>
    </Tesseract.Modal>;
}

function CreateAccountPage(): React.JSX.Element {
    return <Tesseract.Modal title="Create account">
        <form method="post" action="/api/createAccount">
            <input type="text" name="username" />
            <input type="password" name="password" />
            <input type="submit" />
        </form>
    </Tesseract.Modal>;
}

function App(): React.JSX.Element {
    return <>
        <Arwes.AnimatorGeneralProvider>
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
                <Arwes.Animator combine manager="stagger" active>
                    <Tesseract.Wrapper>
                        <Router.BrowserRouter>
                            <Router.Routes>
                                <Router.Route path="/" element={<Homepage />}>
                                    <Router.Route path="login">
                                        <Router.Route index element={<LoginPage />} />
                                        <Router.Route path="error" element={<>Login Error</>} />
                                    </Router.Route>
                                    <Router.Route path="createAccount" element={<CreateAccountPage />} />
                                </Router.Route>
                            </Router.Routes>
                        </Router.BrowserRouter>
                    </Tesseract.Wrapper>
                </Arwes.Animator>
            </Arwes.BleepsProvider>
        </Arwes.AnimatorGeneralProvider>
    </>;
}

createRoot(document.getElementById("root")).render(<App />);