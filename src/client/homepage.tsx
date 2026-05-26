import React from 'react';
import * as Router from 'react-router';
import useAccount from './accountProvider';
import Modal from './modal';
import './homepage.css';

export default function Homepage(): React.JSX.Element {
    const [loading, loggedIn, account] = useAccount();
    if (loading) return <Modal title={"Loading..."}>Loading account...</Modal>;
    return <div className="homepage">
        <div>
            {loggedIn ? account.name : "not logged in"}
        </div>
        {
            loggedIn ?
                <>
                    {account.adventures.map(adventure=><>{adventure.name}</>)}
                    <Router.Link to="/api/logout" reloadDocument>logout</Router.Link><br />
                    <Router.Link to="/session/create">Start new game session</Router.Link><br />
                    <Router.Link to="/session/find">Find a game session</Router.Link>
                </> :
                <>
                    <Router.Link to="/login">Login</Router.Link><br />
                    <Router.Link to="/createAccount">Create Account</Router.Link>
                </>
        }
    </div>;
}