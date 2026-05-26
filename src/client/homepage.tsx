import React from 'react';
import './homepage.css';
import useAccount from './accountProvider';
import Modal from './modal';

export default function Homepage(): React.JSX.Element {
    const [loading, loggedIn, account] = useAccount();
    if (loading) return <Modal title={"Loading..."}>Loading account...</Modal>;
    return <div className="homepage">
        {loggedIn ? account.name : "not logged in"}
    </div>;
}