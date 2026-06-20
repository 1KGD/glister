import React from 'react';
import * as Arwes from '@arwes/react';
import './button.css';

export default function Button({ children, as, ...props }: React.HTMLProps<HTMLDivElement>): React.JSX.Element {
    const frameRef = React.useRef<SVGSVGElement>(null);
    Arwes.useFrameAssembler(frameRef);
    return <Arwes.Animated as="button" className="button" {...props}>
        <Arwes.FrameNero elementRef={frameRef} />
        {children}
    </Arwes.Animated>;
}