# Bryntum Issue

Scrolling down a list and changing the resource grouping to a grouping with collapsed resources,
the scheduler throws the following error:

```
schedulerpro.module.js:110337 Uncaught TypeError: Cannot read properties of undefined (reading 'id')
    at RowManager.jumpToPosition (schedulerpro.module.js:110337:1)
    at RowManager.warpIfNeeded (schedulerpro.module.js:110425:1)
    at RowManager.updateRenderedRows (schedulerpro.module.js:110453:1)
    at SchedulerPro.onGridVerticalScroll [as onGridVerticalScrollNow] (schedulerpro.module.js:117947:1)
    at SchedulerPro.<anonymous> (schedulerpro.module.js:17236:1)
    at SchedulerPro.invoker (schedulerpro.module.js:16543:1)
    at schedulerpro.module.js:16915:1
```

The error is thrown after calling `loadInlineData` in `jumpToPosition` (`RowManager.js`) when trying to
access the `id` of `record`. `record` was received from store with an invalid index.

It seems like the while loop does not check if `targetIndex` is valid / if the store data is a flat 
record array or a tree record.

## Steps to reproduce

The issue can be reproduced in two, only slightly different, ways:

**Version A: switching from no group to collapsed group:**

1. Start example
2. Scroll down in resource list 
3. Change `grouping mode` from `all` to `large-group` or `small-group`
4. See console log for error

**Version B: switching from large expanded to small collapsed group:**

1. Start example
2. Set `grouping mode` to `large-group` and expand group
3. Scroll down in resource list
4. Set `grouping mode` to `small-group`
5. See console log for error
