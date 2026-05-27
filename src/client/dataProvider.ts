import React from 'react';
import { type AccountClientData } from '../server/account';
import { type AdventureClientData } from '../server/adventure';

export function useAccount(): { loading: boolean, loggedIn: boolean, account?: AccountClientData } {
    const [loading, setLoading] = React.useState(true);
    const [accountData, setAccountData] = React.useState<AccountClientData & { loggedIn: boolean }>(null);

    React.useEffect(() => {
        fetch("/api/userData")
            .then(response => response.json())
            .then(response => { setAccountData(response); setLoading(false); })
            .catch(e => { throw e; });
    }, []);

    return { loading, loggedIn: accountData?.loggedIn, account: accountData };
}

export function useAdventure(adventureId: string): { loading: boolean, adventure?: AdventureClientData } {
    const [loading, setLoading] = React.useState(true);
    const [adventureData, setAdventureData] = React.useState<AdventureClientData>(null);

    React.useEffect(() => {
        fetch("/api/adventureData", { body: adventureId, method: "put" })
            .then(response => response.json())
            .then(response => { setAdventureData(response); setLoading(false); })
            .catch(e => { throw e; });
    }, []);

    return { loading, adventure: adventureData };
}