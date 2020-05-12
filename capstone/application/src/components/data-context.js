import React, { createContext, useEffect, useState } from 'react';
import { mergeData } from '../data-services'

export const DataContext = createContext({});

export const DataConsumer = DataContext.Consumer;

const ContextProvider = DataContext.Provider;

export const DataProvider = ({ children }) => {

    const [data, setData] = useState({});

    useEffect(() => {

        Promise.all([
            fetch('/post-codes.json').then(response => response.json()),
            fetch('/cases.json').then(response => response.json()),
            fetch('/population.json').then(response => response.json()),
            fetch('/tests.json').then(response => response.json())
        ])
        .then(([postCodes, cases, population, tests]) => {
            const data = mergeData({ postCodes, cases, population, tests });
            setData(data);
        });
    }, [])

    return (
        <ContextProvider value={data}>
            {children}
        </ContextProvider>
    );
}
