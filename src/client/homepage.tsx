import React from 'react';
import * as Router from 'react-router';
import { useAccount } from './dataProvider';
import './homepage.css';
import * as Tesseract from 'tesseract';

export default function Homepage(): React.JSX.Element {
    const navigate = Router.useNavigate();
    const { loading, loggedIn, account } = useAccount();
    if (loading) return <Tesseract.Modal title={"Loading..."}>Loading account...</Tesseract.Modal>;
    return <Tesseract.Page>
        <div>
            {loggedIn ? account.name : "not logged in"}
        </div>
        {
            loggedIn ?
                <>
                    {account.adventures.map(adventure => <div key={adventure.name}>
                        <Tesseract.Link navigate={navigate} to={`/adventure/${adventure.id}`}>
                            {adventure.name}
                        </Tesseract.Link>
                    </div>)}
                    <Tesseract.Link navigate={navigate} to="/api/logout" refresh>logout</Tesseract.Link><br />
                    <Tesseract.Link navigate={navigate} to="/session/create">Start new game session</Tesseract.Link><br />
                    <Tesseract.Link navigate={navigate} to="/session/find">Find a game session</Tesseract.Link>
                </> :
                <>
                    <Tesseract.Link navigate={navigate} to="/login">Login</Tesseract.Link><br />
                    <Tesseract.Link navigate={navigate} to="/createAccount">Create Account</Tesseract.Link>
                </>
        }
    </Tesseract.Page>;
}