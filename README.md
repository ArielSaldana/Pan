# 🚀 Pan.js

PanJS is a light JS framework used at Unreal to quickly develop web applications.

Code functionality includes
* Event Emitters
* Animation Queue using RequestAnimationFrame with Auto cleanup
* Mouse Events
* Viewport Events

## Running tests locally

We have removed selenium and selenium browser dependencies and now use puppeteer + jest as our test suite. Just run `npm run test` to view test results.

## Tools

### Viewport
When the page is viewport is updated, returns an object with the width and height of the viewport.

#### usage
```javascript
const viewport = Pan.Viewport.getInstance({
    fireViewportInformationOnListen: true
});

viewport.on("resize", (viewportEvent) => {
    console.log(viewportEvent.width, viewportEvent.height);
})
```

#### settings `ViewportSettings`
```typescript
export interface ViewportSettings {
    fireViewportInformationOnListen: boolean // when listener is set, should viewport information be sent immediately to callback.
}
```
