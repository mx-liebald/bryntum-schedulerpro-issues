import { SchedulerPro } from '@bryntum/schedulerpro';
import { BryntumSchedulerPro } from '@bryntum/schedulerpro-react';
import { RefObject, useCallback, useEffect, useState } from 'react';
import { oneDayInMs, getToday } from './util';

const visibleDays = 7;

interface ToolbarProps {
  schedulerRef: RefObject<BryntumSchedulerPro>;
  refetchData: () => void;

  includeEventsInNextData: boolean;
  setIncludeEventsInNextData: (includeEventsInNextData: boolean) => void;
}

export function Toolbar({
  schedulerRef,
  refetchData,
  includeEventsInNextData,
  setIncludeEventsInNextData,
}: ToolbarProps): JSX.Element {
  const [scheduler, setScheduler] = useState<SchedulerPro>();
  const [refetchOnTimeSpanChange, setRefetchOnTimeSpanChange] = useState(false);

  const shiftByDays = useCallback(
    async (days: number) => {
      const instance = schedulerRef.current?.instance;
      if (instance == null) return;

      const newStart = new Date(
        instance.startDate.getTime() + days * oneDayInMs
      );
      const newEnd = new Date(instance.endDate.getTime() + days * oneDayInMs);
      await instance.setTimeSpan(newStart, newEnd);

      if (refetchOnTimeSpanChange) {
        refetchData();
      }
    },
    [refetchOnTimeSpanChange]
  );

  const onShiftPrevious = useCallback(
    () => shiftByDays(-visibleDays),
    [shiftByDays]
  );
  const onShiftNext = useCallback(
    () => shiftByDays(visibleDays),
    [shiftByDays]
  );

  const onClickToday = useCallback(() => {
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
      onClickToday();
    }
  }, []);

  return (
    <div style={{ display: 'flex', gap: '0.5rem', padding: '1rem' }}>
      <button disabled={scheduler == null} onClick={onShiftPrevious}>
        Prev
      </button>
      <button disabled={scheduler == null} onClick={onClickToday}>
        Today
      </button>
      <button disabled={scheduler == null} onClick={onShiftNext}>
        Next
      </button>
      <div className='vertical-separator'></div>
      <button onClick={onLogJsonData}>Log Data</button>
      <button onClick={refetchData}>Refetch Data</button>
      <div className='stack'>
        <label>
          <input
            type='checkbox'
            checked={includeEventsInNextData}
            onChange={() =>
              setIncludeEventsInNextData(!includeEventsInNextData)
            }
          />
          Include events in next data request
        </label>
        <label>
          <input
            type='checkbox'
            checked={refetchOnTimeSpanChange}
            onChange={() =>
              setRefetchOnTimeSpanChange(!refetchOnTimeSpanChange)
            }
          />
          Automatically refetch data when changing time span
        </label>
      </div>
    </div>
  );
}
