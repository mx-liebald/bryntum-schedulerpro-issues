import '@bryntum/schedulerpro/schedulerpro.material.css';
import './App.scss';

import { useRef, useEffect, useCallback } from 'react';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { SchedulerPro } from '@bryntum/schedulerpro';
import { schedulerConfig } from './AppConfig';
import { generateTestData } from './testData';
import { Toolbar } from './Toolbar';

export default function App(): JSX.Element {
  const schedulerRef = useRef<BryntumSchedulerPro>(null);

  const loadData = useCallback(async () => {
    const scheduler: SchedulerPro = schedulerRef.current!.instance;
    const { project } = scheduler;

    const data = generateTestData();

    await new Promise((r) => setTimeout(r, 500));

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
  }, []);

  useEffect(() => {
    setTimeout(loadData, 500);
  }, []);

  return (
    <div className='container'>
      <Toolbar schedulerRef={schedulerRef} refetchData={loadData} />
      <BryntumSchedulerPro ref={schedulerRef} {...schedulerConfig} />
    </div>
  );
}
