import React from 'react';
import * as Router from 'react-router';
import * as THREE from 'three';
import { useAccount } from './dataProvider';
import './homepage.css';
import * as Tesseract from 'tesseract';

export default function Homepage(): React.JSX.Element {
    const navigate = Router.useNavigate();
    const { loading, loggedIn, account } = useAccount();
    const outlet = Router.useOutlet();
    if (loading) return <><Tesseract.Modal title={"Loading..."}>Loading account...</Tesseract.Modal>{outlet}</>;
    return <>
        <Tesseract.Page position={new THREE.Vector3(0, 4, -4)} focused={!outlet}>
            <div>
                {loggedIn ? account.name : "not logged in"}
            </div>
            {
                loggedIn ?
                    <>
                        {account.adventures.map(adventure => <div key={adventure.name}>
                            <Tesseract.Link navigate={navigate} to={`/adventure/${adventure.id}`} disabled={!!outlet}>
                                {adventure.name}
                            </Tesseract.Link>
                        </div>)}
                        <Tesseract.Link navigate={navigate} to="/api/logout" refresh disabled={!!outlet}>logout</Tesseract.Link><br />
                        <Tesseract.Link navigate={navigate} to="/session/create" disabled={!!outlet}>Start new game session</Tesseract.Link><br />
                        <Tesseract.Link navigate={navigate} to="/session/find" disabled={!!outlet}>Find a game session</Tesseract.Link>
                    </> :
                    <>
                        <Tesseract.Link navigate={navigate} to="/login" disabled={!!outlet}>Login</Tesseract.Link><br />
                            <Tesseract.Link navigate={navigate} to="/createAccount" disabled={!!outlet}>Create Account</Tesseract.Link>
                    </>
            }
        </Tesseract.Page>
        {outlet}
    </>;
}