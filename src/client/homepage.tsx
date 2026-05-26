import React from 'react';
import './homepage.css';
import useAccount from './accountProvider';

export default function Homepage(): React.JSX.Element {
    const account = useAccount();
    return <div className="homepage">
        {account?.name}
    </div>;
}