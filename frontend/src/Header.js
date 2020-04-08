//  usado para exemplificar props no caso children que vai trazer tudo que está dentro do parâmetro usado, função pura/impura, 

import React from 'react';

export default function Header({ children }){
    return (
        <header>
            <h1>{ children }</h1>
        </header>
    );
}