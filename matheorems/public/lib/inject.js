marginPrecent = 40

viewerSettings = {
  "appName": "3d",
  "width": window.innerWidth - window.innerWidth*marginPrecent/100, 
  "height": window.innerHeight - 100,
  "showToolBar":false,
  "borderColor":null,
  "showMenuBar":false,
  "showAlgebraInput":false,
  "customToolbar":"0 || 1",
  "showResetIcon": false,
  "enableLabelDrags":false,
  "enableShiftDragZoom":true,
  "enableRightClick":false,
  "capturingThreshold":null,
  "showToolBarHelp":false,
  "errorDialogsActive":true,
  "useBrowserForJS":false,
}

window.ggbApp = new GGBApplet(viewerSettings, true);
console.log("здр кп")

let event = new Event('ggb-loaded')

addEventListener('ggb-loaded', function() {
    window.ggbApp.inject('ggb-element')
})