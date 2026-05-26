import React from 'react';

export default function useAccount(): { name: string } {
    const [accountData, setAccountData] = React.useState(null);

    React.useEffect(() => {
        fetch("/api/userData")
            .then((response) => response.json())
            .then((response) => setAccountData(response))
            .catch((error) => console.error(error));
    }, []);

    return accountData;
}