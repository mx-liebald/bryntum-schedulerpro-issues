# Example to reproduce Bryntum issue

Issue: TODO

## Setup

Setup:

1. Install the dependencies: `yarn install`
2. Start the dev server: `yarn run start`
3. Navigate to `http://localhost:5173/` or `http://127.0.0.1:5173/` in your browser

## Issue 1: Hidden Time Ranges

1. Open the page, reload if the page was already opened
   - Initially, you should see a resource time range for each resource on each day
2. Click "Refetch Data"

**Expected Behavior:** nothing changes, the resource time ranges stay visible.

**Actual behavior:** resource time ranges are hidden until you scroll sideways, which immediately renders all of them.

### Notes

- If you enable "_Include events in next data request_", the next time data is loaded will include events. This also seems to avoid the above bug.
- Downgrading `@bryntum/schedulerpro` and `@bryntum/schedulerpro-react` to v5 (tested with 5.6.13) fixes the issue
- The issue was observed on Google Chrome (v133.0.6943) and Firefox (v135.0)

<video controls>
  <source src="./readme-resources/BryntumResourceTimeRangeBug1.mp4" type="video/mp4">
</video>

If the recording is not visible above, [click here](./readme-resources/BryntumResourceTimeRangeBug1.mp4).

## Issue 2: Drag Create Events

This is likely related / a follow up bug.

1. Follow the steps in issue 1
2. Optionally side scroll to make the time ranges appear again
3. Try to drag the mouse while holding the left mouse button to drag-create an event

This leads to the following errors:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'target')
    at _DomHelper2.isInView (chunk-TCFNNFZ2.js?v=ed06ba1d:8818:37)
    at EventDragCreate.dragStart (chunk-TCFNNFZ2.js?v=ed06ba1d:159773:20)
    at EventDragCreate.startDrag (chunk-TCFNNFZ2.js?v=ed06ba1d:59840:27)
    at EventDragCreate.startDrag (chunk-TCFNNFZ2.js?v=ed06ba1d:152448:26)
    at DragContext.start (chunk-TCFNNFZ2.js?v=ed06ba1d:59579:16)
    at DragContext.move (chunk-TCFNNFZ2.js?v=ed06ba1d:59531:16)
    at EventDragCreate.onDragPointerMove (chunk-TCFNNFZ2.js?v=ed06ba1d:60015:38)
    at EventDragCreate.onDragPointerMove (chunk-TCFNNFZ2.js?v=ed06ba1d:151325:11)
    at HTMLBodyElement.handler (chunk-TCFNNFZ2.js?v=ed06ba1d:8197:72)

Uncaught TypeError: Cannot read properties of undefined (reading 'offset')
    at EventDragCreate.moveDrag (chunk-TCFNNFZ2.js?v=ed06ba1d:151647:221)
    at EventDragCreate.trackDrag (chunk-TCFNNFZ2.js?v=ed06ba1d:59850:12)
    at DragContext.track (chunk-TCFNNFZ2.js?v=ed06ba1d:59602:12)
    at DragContext.move (chunk-TCFNNFZ2.js?v=ed06ba1d:59547:12)
    at EventDragCreate.onDragPointerMove (chunk-TCFNNFZ2.js?v=ed06ba1d:60015:38)
    at EventDragCreate.onDragPointerMove (chunk-TCFNNFZ2.js?v=ed06ba1d:151325:11)
    at HTMLBodyElement.handler (chunk-TCFNNFZ2.js?v=ed06ba1d:8197:72)

Uncaught (in promise) TypeError: Cannot destructure property 'toSet' of 'context' as it is undefined.
    at EventDragCreate.dragDrop (chunk-TCFNNFZ2.js?v=ed06ba1d:152497:32)
    at EventDragCreate.endDrag (chunk-TCFNNFZ2.js?v=ed06ba1d:59790:18)
    at EventDragCreate.onDragPointerUp (chunk-TCFNNFZ2.js?v=ed06ba1d:60022:14)
    at HTMLBodyElement.handler (chunk-TCFNNFZ2.js?v=ed06ba1d:8197:72)
```

<video controls>
  <source src="./readme-resources/BryntumResourceTimeRangeBug2.mp4" type="video/mp4">
</video>

If the recording is not visible above, [click here](./readme-resources/BryntumResourceTimeRangeBug2.mp4).

<br/>
<br/>
<br/>

# Original Readme (from Bryntum example)

<br/>
<br/>
<br/>

# Pro TaskEditor demo

This example uses Bryntum Scheduler Pro wrapped in the provided `BryntumSchedulerPro` wrapper.
Scheduler Pro with task editor customizations

This application was generated with:

- [React](https://react.dev/) [~18.2.0]
- [Vite](https://vitejs.dev/guide/) [~4.2.0]

# Bryntum Repository access setup

**IMPORTANT NOTE!** These access instructions are mandatory when using the private Bryntum NPM repository.

This application uses npm packages from the Bryntum private NPM repository. You must be logged-in to this repository as
a licensed or trial user to access the packages.

Please check [Online npm repository guide](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/npm-repository) for the detailed information on the
sign-up/login process.

# React integration guide

Please check the [Bryntum React integration online guide](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/integration/react/guide) for detailed
integration information and help.

# Installation

Use the following command to install the example packages after the successful login.

Using **npm**:

```shell
npm install
```

Using **yarn**:

```shell
yarn install
```

# Running a development server

To build example and start development server run this command:

Using **npm**:

```shell
npm run start
```

Using **yarn**:

```shell
yarn run start
```

Navigate to `http://localhost:5173/` or `http://127.0.0.1:5173/` in your browser. We recommend to use latest versions of
modern browsers like Chrome, FireFox, Safari or Edge. The app will automatically reload if you change any of
the source files.

# Creating a production build

To build production code for the example run this command:

Using **npm**:

```shell
npm run build
```

Using **yarn**:

```shell
yarn run build
```

The build artifacts will be stored in the `build/` directory.

# Distribution zip references

- Bryntum API docs. Open `docs/index.html` in your browser.
- Bryntum Repository guide `docs/guides/npm-repository.md`.
- Bryntum React integration guide `docs/guides/integration/react/guide.md`.

# Online References

- [Vite](https://vitejs.dev/guide/)
- [React Framework](https://react.dev/)
- [Bryntum React integration guide](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/integration/react/guide)
- [Bryntum Scheduler Pro documentation](https://bryntum.com/products/schedulerpro/docs/)
- [Bryntum Scheduler Pro examples](https://bryntum.com/products/schedulerpro/examples/)
- [Bryntum npm repository guide](https://bryntum.com/products/schedulerpro/docs/guide/SchedulerPro/npm-repository)
- [Bryntum support Forum](https://forum.bryntum.com/)
- [Contacts us](https://bryntum.com/contact/)
