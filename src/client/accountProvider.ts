import React from 'react';
import { type AccountClientData } from '../server/account';

export default function useAccount(): AccountClientData {
    const [accountData, setAccountData] = React.useState<AccountClientData>(null);

    React.useEffect(() => {
        fetch("/api/userData")
            .then(response => response.json())
            .then(response => setAccountData(response))
            .catch(e => { throw e; });
    }, []);

    return accountData;
}