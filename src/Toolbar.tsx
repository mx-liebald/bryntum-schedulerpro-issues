import { SchedulerPro } from '@bryntum/schedulerpro';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { oneDayInMs, getToday } from './util';

const visibleDays = 7;

interface ToolbarProps {
  schedulerRef: RefObject<BryntumSchedulerPro>;
  refetchData: () => void;
}

export function Toolbar({
  schedulerRef,
  refetchData,
}: ToolbarProps): JSX.Element {
  const [scheduler, setScheduler] = useState<SchedulerPro>();

  const goToToday = useCallback(() => {
    const startOfDay = getToday();
    scheduler?.setTimeSpan(
      startOfDay,
      new Date(startOfDay.getTime() + visibleDays * oneDayInMs)
    );
  }, [scheduler]);

  const onLogJsonData = useCallback(() => {
    console.log(
      'project.toJSON()',
      schedulerRef.current?.instance.project.toJSON()
    );
  }, []);

  useEffect(() => {
    if (schedulerRef.current) {
      const newScheduler = schedulerRef.current.instance;
      console.log(newScheduler);
      setScheduler(newScheduler);
      goToToday();
    }
  }, []);

  return (
    <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem' }}>
      <button onClick={onLogJsonData}>Log Data</button>
      <button onClick={refetchData}>Refetch Data</button>
    </div>
  );
}
