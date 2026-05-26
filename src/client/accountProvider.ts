import React from 'react';
import { type AccountClientData } from '../server/account';

export default function useAccount(): [boolean, boolean, AccountClientData] {
    const [loading, setLoading] = React.useState(true);
    const [accountData, setAccountData] = React.useState<AccountClientData & { loggedIn: boolean }>(null);

    React.useEffect(() => {
        fetch("/api/userData")
            .then(response => response.json())
            .then(response => { setAccountData(response); setLoading(false); })
            .catch(e => { throw e; });
    }, []);

    return [loading, accountData?.loggedIn, accountData];
}