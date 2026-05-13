import React from 'react';
import './modal.css';

export default function Modal({ title, blocking, children }: { title: string, blocking?: boolean } & React.PropsWithChildren): React.JSX.Element {
    return <div className={blocking ? "modal-container modal-blocking" : "modal-container"}>
        <div className="modal">
            <div className="modal-title">{title}</div>
            <div className="modal-body">{children}</div>
        </div>
    </div>;
}