marginPrecent = 40

viewerSettings = {
  "appName": "3d",
  "width": window.outerWidth - window.outerWidth*marginPrecent/100, 
  "height": window.outerHeight - 60,
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

window.onload = function() { 
    window.ggbApp.inject('ggb-element');
}

window.loadingGGBProbablyDone = function () {
    console.log("NOW")
}

window.loadGgbFile = function(ggbFile64) {
    
}