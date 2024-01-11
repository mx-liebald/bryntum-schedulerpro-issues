import { useRef, useEffect, useCallback } from "react";

import { BryntumSchedulerPro } from "@bryntum/schedulerpro-react";
import { SchedulerPro } from "@bryntum/schedulerpro";
import { schedulerConfig } from "./AppConfig";
import { range } from "lodash";

import "@bryntum/demo-resources/scss/example-vite.scss";
import "./App.scss";

// Mock data
const resources = range(15).map((i) => ({
  id: i,
  name: `Resource ${i}`,
}));

const events = range(10_000).map((i) => ({
  id: i,
  name: `Event ${i}`,
  startDate: "2020-01-01",
  duration: 2,
}));

const assignments = events.map((event, i) => ({
  id: i,
  event: event.id,
  resources: resources[i % resources.length],
}));

export default function App(): JSX.Element {
  const schedulerRef = useRef<BryntumSchedulerPro>(null);

  const simulateDataRequest = useCallback(async () => {
    const schedulerInstance = schedulerRef.current!.instance as SchedulerPro;
    const { project } = schedulerInstance;

    // Simulate long request to backend
    console.log("Requesting event data...");
    await new Promise((r) => setTimeout(r, 1000));
    console.log("Received event data, loadInlineData...");

    console.log(
      "%cCalling loadInlineData, create new event now!",
      "background: yellow; color: black; font-size: 16px;"
    );
    console.time("loadInlineData runtime");

    schedulerInstance.suspendEvents(true);
    schedulerInstance.suspendRefresh();
    try {
      await project.loadInlineData({
        eventsData: events,
        resourcesData: resources,
        assignmentsData: assignments,
      });
    } finally {
      schedulerInstance.resumeEvents();
      await schedulerInstance.resumeRefresh(true);
    }

    console.log(
      "%cloadInlineData finished.",
      "background: red; color: white; font-size: 16px;"
    );
    console.timeEnd("loadInlineData runtime");
  }, []);

  useEffect(() => {
    simulateDataRequest();
  }, []);

  return (
    <BryntumSchedulerPro
      resources={resources}
      ref={schedulerRef}
      {...schedulerConfig}
    />
  );
}
