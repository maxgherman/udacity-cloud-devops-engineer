import React from 'react';
import { Map, DataProvider } from './components';

const App =() => (
    <DataProvider>
        <header>
            <h2>Statistical analysis while staying at home</h2>
            <h3>Australia, NSW - COVID spread</h3>
            <h5>Click particular region to check statistics</h5>
        </header>
        <section>
            <Map />
        </section>
    </DataProvider>
);

export default App;
