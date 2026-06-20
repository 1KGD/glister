import React from 'react';
import * as Router from 'react-router';
import Button from './button';

export default function Link({ navigate, to, disabled, children, ...navigateOptions }: { navigate: Router.NavigateFunction, to: string, disabled?: boolean } & React.PropsWithChildren & Router.NavigateOptions): React.JSX.Element {
    return <Button onClick={() => { void navigate(to, navigateOptions); }} disabled={disabled}>
        {children}
    </Button>;
}