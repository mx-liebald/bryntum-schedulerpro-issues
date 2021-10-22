/**
 * The React App file
 */

// React libraries
import React, { useState } from 'react';

// Stylings
import './App.scss';

// Application components
import {
    BryntumDemoHeader,
    BryntumSchedulerPro,
    BryntumTimeline,
    BryntumButtonGroup,
    BryntumThemeCombo
} from '@bryntum/schedulerpro-react';
import { schedulerConfig } from './AppConfig';

const hourAndDayConfig = {
    base: 'hourAndDay',
    tickWidth: 70,
    tickHeight: 40,
    displayDateFormat: 'll LT',
    shiftIncrement: 1,
    shiftUnit: 'day',
    defaultSpan: 24,
    timeResolution: {
        increment: 30,
        unit: 'MINUTE',
    },
};

const weekAndDayConfig = {
    base: 'weekAndDay',
    tickWidth: 100,
    tickHeight: 80,
    displayDateFormat: 'll hh:mm A',
    shiftUnit: 'week',
    shiftIncrement: 1,
    defaultSpan: 1,
    mainHeaderLevel: 0,
    timeResolution: {
        increment: 1,
        unit: 'HOUR',
    },
};

export const presetData = (lang) => [
    {
        ...weekAndDayConfig,
        id: 'weekAndDay',
        name: 'week and day',
        tickWidth: 50,

        timeResolution: {
            unit: 'hour',
            increment: 1,
        },
        shiftIncrement: 1,
        shiftUnit: 'day',
        headers: [
            {
                unit: 'week',
                increment: 1,
                dateFormat: lang === 'de' ? '{KW} W' : '{CW} W',
            },
            {
                unit: 'day',
                increment: 1,
                dateFormat: 'D MMM',
            },
        ],
    },
    {
        ...hourAndDayConfig,
        id: 'oneDay',
        name: 'oneDay',
        tickWidth: 65,
        headers: [
            {
                unit: 'day',
                increment: 1,
                dateFormat: 'dddd, DD MMMM YYYY',
            },
            {
                unit: 'hour',
                increment: 1,
                dateFormat: 'HH:mm A',
            },
        ],
    },
];


const newLocal = [
    {
        text: 'de',
        pressed: true,
    },
    {
        text: 'en',
    },
];
const App = () => {
    const [lang, updateLang] = useState('de');

    const handler = (button) => {
        updateLang(button.source.text);
    };
    return <>
        <div className="demo-toolbar">
            <label>Language: </label>
            <BryntumButtonGroup
                toggleGroup={true}
                items={newLocal}
                onAction={handler}
            />
        </div>
        <BryntumSchedulerPro {...schedulerConfig} presets={presetData(lang)} />
    </>;
};

export default App;
