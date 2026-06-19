import React from 'react';
import * as Arwes from '@arwes/react';

export default function Button({ children, as, ...props }: React.HTMLProps<HTMLDivElement>): React.JSX.Element {
    return <Arwes.Animated as="button" {...props}>
        {children}
    </Arwes.Animated>;
}