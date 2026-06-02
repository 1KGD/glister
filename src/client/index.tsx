import React from 'react';
import { createRoot } from 'react-dom/client';
import * as Colyseus from '@colyseus/sdk';
import config from '../../config';
if (config.dev) await import("@colyseus/sdk/debug");
import './colors.css';
import './index.css';
import * as Router from 'react-router';
import Homepage from './homepage';
import type server from '../server/index';
import * as Tesseract from 'tesseract';
import { type AccountClientData } from '../server/account';

const client = new Colyseus.Client<typeof server>("/api");

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
    return <Tesseract.Wrapper>
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
    </Tesseract.Wrapper>;
}

createRoot(document.getElementById("root")).render(<App />);