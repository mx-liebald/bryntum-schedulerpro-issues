import '@bryntum/schedulerpro/schedulerpro.material.css';
import './App.scss';

import { useRef, useEffect, useCallback, useState } from 'react';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { SchedulerPro } from '@bryntum/schedulerpro';
import { schedulerConfig } from './AppConfig';
import { generateTestData } from './testData';
import { Toolbar } from './Toolbar';

export default function App(): JSX.Element {
  const schedulerRef = useRef<BryntumSchedulerPro>(null);
  const [includeEventsInNextData, setIncludeEventsInNextData] = useState(true);

  const loadData = useCallback(async () => {
    const scheduler: SchedulerPro = schedulerRef.current!.instance;
    const { project } = scheduler;

    const data = generateTestData(includeEventsInNextData);

    console.log('Loading inline data:', data);
    console.time('loadInlineData runtime');

    scheduler.suspendEvents(true);
    scheduler.suspendRefresh();
    try {
      await project.loadInlineData(data);
    } catch (error) {
      console.error(error);
    } finally {
      scheduler.resumeEvents();
      await scheduler.resumeRefresh(true);
    }
    console.timeEnd('loadInlineData runtime');
  }, [includeEventsInNextData]);

  useEffect(() => {
    setTimeout(loadData, 500);
  }, []);

  return (
    <div className='container'>
      <Toolbar
        schedulerRef={schedulerRef}
        refetchData={loadData}
        includeEventsInNextData={includeEventsInNextData}
        setIncludeEventsInNextData={setIncludeEventsInNextData}
      />
      <BryntumSchedulerPro ref={schedulerRef} {...schedulerConfig} />
    </div>
  );
}
