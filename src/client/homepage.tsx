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
        {loggedIn ? <Router.Link to={"/api/logout"} reloadDocument>logout</Router.Link> : <Router.Link to={"/login"}>Login</Router.Link>}
    </div>;
}