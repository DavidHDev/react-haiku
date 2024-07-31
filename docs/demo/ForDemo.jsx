import { For } from "react-haiku"
import React from 'react';
import './demo.css';

export const ForDemo = () => {
    const data = [{name: 'React'}, {name: 'Haiku'}];

    return(
        <div className="demo-container-center">
            <For each={data} render={(item, index) => 
                <b>{`${index}: ${item.name}`}</b>
            }/>
        </div>
    );
}