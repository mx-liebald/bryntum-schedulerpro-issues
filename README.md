# Example to reproduce Bryntum issue

[Forum post](https://forum.bryntum.com/viewtopic.php?t=31928)

## Setup

Setup:

1. Install the dependencies: `yarn install`
2. Start the dev server: `yarn run start`
3. Navigate to `http://localhost:5173/` or `http://127.0.0.1:5173/` in your browser

## Issue

When drag creating an event and, during the interaction, `loadInlineData` is called (e.g. because of polling), the scheduler breaks and logs errors. This can be reproduced as follows:

1. Open the page, reload if the page was already opened
2. Click "Refetch Data". This waits 500ms (to give you time for step 3) and then calls `loadInlineData`
3. Without waiting, drag create a new event
   - The timing seems to be so that this has to happen before `loadInlineData` finishes

[Issue recording:](./readme-resources/Bryntum-drag-create-loadinlinedata-bug-react.mp4)

<video controls>
  <source src="./readme-resources/Bryntum-drag-create-loadinlinedata-bug-react.mp4" type="video/mp4">
</video>

With Google Chrome (133.0.6943) and Bryntum Scheduler Pro 6.1.6, the following errors are logged (without duplicate errors):

```
chunk-TCFNNFZ2.js?v=87eb1a12:8818 Uncaught TypeError: Cannot read properties of undefined (reading 'target')
    at _DomHelper2.isInView (chunk-TCFNNFZ2.js?v=87eb1a12:8818:37)
    at EventDragCreate.dragStart (chunk-TCFNNFZ2.js?v=87eb1a12:159773:20)
    at EventDragCreate.startDrag (chunk-TCFNNFZ2.js?v=87eb1a12:59840:27)
    at EventDragCreate.startDrag (chunk-TCFNNFZ2.js?v=87eb1a12:152448:26)
    at DragContext.start (chunk-TCFNNFZ2.js?v=87eb1a12:59579:16)
    at DragContext.move (chunk-TCFNNFZ2.js?v=87eb1a12:59531:16)
    at EventDragCreate.onDragPointerMove (chunk-TCFNNFZ2.js?v=87eb1a12:60015:38)
    at EventDragCreate.onDragPointerMove (chunk-TCFNNFZ2.js?v=87eb1a12:151325:11)
    at HTMLBodyElement.handler (chunk-TCFNNFZ2.js?v=87eb1a12:8197:72)

Uncaught TypeError: Cannot read properties of undefined (reading 'offset')
    at EventDragCreate.moveDrag (chunk-TCFNNFZ2.js?v=87eb1a12:151647:221)
    at EventDragCreate.trackDrag (chunk-TCFNNFZ2.js?v=87eb1a12:59850:12)
    at DragContext.track (chunk-TCFNNFZ2.js?v=87eb1a12:59602:12)
    at DragContext.move (chunk-TCFNNFZ2.js?v=87eb1a12:59547:12)
    at EventDragCreate.onDragPointerMove (chunk-TCFNNFZ2.js?v=87eb1a12:60015:38)
    at EventDragCreate.onDragPointerMove (chunk-TCFNNFZ2.js?v=87eb1a12:151325:11)
    at HTMLBodyElement.handler (chunk-TCFNNFZ2.js?v=87eb1a12:8197:72)

chunk-TCFNNFZ2.js?v=87eb1a12:152497 Uncaught (in promise) TypeError: Cannot destructure property 'toSet' of 'context' as it is undefined.
    at EventDragCreate.dragDrop (chunk-TCFNNFZ2.js?v=87eb1a12:152497:32)
    at EventDragCreate.endDrag (chunk-TCFNNFZ2.js?v=87eb1a12:59790:18)
    at EventDragCreate.onDragPointerUp (chunk-TCFNNFZ2.js?v=87eb1a12:60022:14)
    at HTMLBodyElement.handler (chunk-TCFNNFZ2.js?v=87eb1a12:8197:72)
```

With Firefox (135.0) and Bryntum Scheduler Pro 6.1.6, one of the two following errors are logged:

```
Uncaught (in promise) TypeError: this.graph is null
    run Schema.js:13
    adjustRecordBeforeUpdating EventResize.js:1427
    finalizeDragCreate EditBase.js:217
    finalizeDragCreate EventEditor.js:188
    finalize EditBase.js:202
    dragDrop EditBase.js:162
    endDrag Draggable.js:90
    onDragPointerUp Droppable.js:157
    handler DomHelper.js:21
    addElementListener EventHelper.js:733
    on EventHelper.js:689
    updateDragging Draggable.js:184
    set Config.js:786
    begin Draggable.js:286
    onDragPointerDown Droppable.js:117
    onDragMouseDown Droppable.js:88
    handler DomHelper.js:21
    addElementListener EventHelper.js:733
    on EventHelper.js:689
    updateDragRootElement Droppable.js:52
    set Config.js:786
    render EditBase.js:40
    functionChainRunner En.js:80
    intoName En.js:56
    finalizeInit Widget.js:2199
    finalizeInit State.js:151
    finalizeInit SubGridScroller.js:25
    finalizeInit GridBase.js:1208
    construct Widget.js:2168
    construct GridSelection.js:525
    construct TimelineZoomable.js:499
    construct TimelineEventRendering.js:199
    construct TimelineBase.js:894
    construct HorizontalRendering.js:119
    construct TransactionalFeatureMixin.js:40
    construct LazyLoadView.js:11
    _Base Base.js:765
    _a5 Localizable.js:375
    _a5 Events.js:694
    _a5 Delayable.js:512
    _a5 TreeNode.js:37
    _b2 DataField.js:50
    _a5 RTL.js:15
    _a5 Widget.js:595
    _Widget2 Widget.js:772
    Container Container.js:362
    _a5 State.js:134
```

or:

```
Uncaught TypeError: target is undefined
    isInView ObjectHelper.js:517
    dragStart BaseEventDispatcher.js:28
    startDrag PickerField.js:416
    startDrag TimelineHistogramRendering.js:60
    start PickerField.js:97
    move PickerField.js:49
    onDragPointerMove List.js:402
    onDragPointerMove TimeSelection.js:52
    handler DateHelper.js:2741
    addElementListener DateHelper.js:2574
    on DateHelper.js:2552
    updateDragging List.js:75
    set ArrayHelper.js:241
    begin Field.js:1
    onDragPointerDown List.js:386
    onDragMouseDown List.js:366
    handler DateHelper.js:2741
    addElementListener DateHelper.js:2574
    on DateHelper.js:2552
    updateDragRootElement List.js:306
    set ArrayHelper.js:241
    render DelayedRecordsRendering.js:96
    functionChainRunner DomHelper.js:1653
    intoName DomHelper.js:1628
    finalizeInit Container.js:168
    finalizeInit TreeNode.js:780
    finalizeInit TimelineBase.js:883
    finalizeInit CoreResourceStoreMixin.js:21
    construct Container.js:148
    construct RecurringEvents.js:141
    construct AbstractCrudManagerMixin.js:935
    construct AbstractCrudManagerMixin.js:2013
    construct ProjectModelTimeZoneMixin.js:13
    construct EventDragCreate.js:191
    construct EventDrag.js:1062
    construct EventDrag.js:1480
    _Base Events.js:427
    _a5 DomHelper.js:1003
    _a5 Localizable.js:32
    _a5 Identifiable.js:30
    _a5 ModelLink.js:46
    _b2 Model.js:975
    _a5 Widget.js:4622
    _a5 Widget.js:4957
    _Widget2 Widget.js:5159
    Container Panel.js:422
    _a5 TreeNode.js:772

Uncaught TypeError: context is undefined
    moveDrag SchedulerExporterMixin.js:259
    trackDrag PickerField.js:432
    track PickerField.js:127
    move PickerField.js:64
    onDragPointerMove List.js:402
    onDragPointerMove TimeSelection.js:52
    handler DateHelper.js:2741
    addElementListener DateHelper.js:2574
    on DateHelper.js:2552
    updateDragging List.js:75
    set ArrayHelper.js:241
    begin Field.js:1
    onDragPointerDown List.js:386
    onDragMouseDown List.js:366
    handler DateHelper.js:2741
    addElementListener DateHelper.js:2574
    on DateHelper.js:2552
    updateDragRootElement List.js:306
    set ArrayHelper.js:241
    render DelayedRecordsRendering.js:96
    functionChainRunner DomHelper.js:1653
    intoName DomHelper.js:1628
    finalizeInit Container.js:168
    finalizeInit TreeNode.js:780
    finalizeInit TimelineBase.js:883
    finalizeInit CoreResourceStoreMixin.js:21
    construct Container.js:148
    construct RecurringEvents.js:141
    construct AbstractCrudManagerMixin.js:935
    construct AbstractCrudManagerMixin.js:2013
    construct ProjectModelTimeZoneMixin.js:13
    construct EventDragCreate.js:191
    construct EventDrag.js:1062
    construct EventDrag.js:1480
    _Base Events.js:427
    _a5 DomHelper.js:1003
    _a5 Localizable.js:32
    _a5 Identifiable.js:30
    _a5 ModelLink.js:46
    _b2 Model.js:975
    _a5 Widget.js:4622
    _a5 Widget.js:4957
    _Widget2 Widget.js:5159
    Container Panel.js:422
    _a5 TreeNode.js:772
```

I also tested the previous major version to check for a regression. This did not solve the issue, but the logged error changed in Google Chrome. I could not observe a change in Firefox.

When downgrading to Bryntum Scheduler Pro 5.6.13, the following error is logged in Google Chrome (133.0.6943):

```
Uncaught (in promise) TypeError: Cannot read properties of null (reading 'activeTransaction')
    at ModelClass.run (chunk-B2NYHXWO.js?v=394e48aa:173761:38)
    at EventDragCreate.adjustRecordBeforeUpdating (chunk-B2NYHXWO.js?v=394e48aa:151797:39)
    at EventDragCreate.finalizeDragCreate (chunk-B2NYHXWO.js?v=394e48aa:152578:8)
    at EventDragCreate.finalizeDragCreate (chunk-B2NYHXWO.js?v=394e48aa:159827:37)
    at Object.finalize (chunk-B2NYHXWO.js?v=394e48aa:152563:16)
    at EventDragCreate.dragDrop (chunk-B2NYHXWO.js?v=394e48aa:152528:21)
    at async EventDragCreate.endDrag (chunk-B2NYHXWO.js?v=394e48aa:59790:9)
```

## Notes

- A similar issue, but with different error messages, was observed with non-react Bryntum Scheduler Pro: [forum post](https://forum.bryntum.com/viewtopic.php?t=31925) / [GitHub issue](https://github.com/bryntum/support/issues/10781)
- The error message sounds related to [this forum post](https://forum.bryntum.com/viewtopic.php?t=31863) / [GitHub issue](https://github.com/bryntum/support/issues/10748). But this is merely a vague suspicion

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
