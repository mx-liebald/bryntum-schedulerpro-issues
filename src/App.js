/**
 * The React App file
 */

// React libraries
import React from 'react';

// Stylings
import './App.scss';

// Application components
import {
    BryntumSchedulerPro,
} from '@bryntum/schedulerpro-react';
import { schedulerConfig } from './AppConfig';

const App = () => {
    return <BryntumSchedulerPro {...schedulerConfig} nonWorkingTimeFeature />;
};

export default App;
