import React from 'react';
import * as Router from 'react-router';
import Button from './button';

export default function Link({ navigate, to, disabled, refresh, children, ...navigateOptions }: { navigate: Router.NavigateFunction, to: string, disabled?: boolean, refresh?: boolean } & React.PropsWithChildren & Router.NavigateOptions): React.JSX.Element {
    return <Button onClick={() => { void (async (): Promise<void> => { await navigate(to, navigateOptions); if (refresh) await navigate(0); })(); }} disabled={disabled} >
        {children}
    </Button >;
}