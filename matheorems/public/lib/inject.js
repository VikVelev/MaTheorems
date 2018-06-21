marginPrecent = 40

viewerSettings = {
  "appName": "3d",
  "width": window.innerWidth - window.innerWidth*marginPrecent/100, 
  "height": window.innerHeight - 100,
  "showToolBar": false,
  "borderColor": null,
  "showMenuBar": false,
  "showAlgebraInput": false,
  "customToolbar": "0 || 1",
  "showResetIcon":  false,
  "enableLabelDrags": false,
  "enableShiftDragZoom": true,
  "enableRightClick": false,
  "capturingThreshold": null,
  "showToolBarHelp": false,
  "errorDialogsActive": true,
  "useBrowserForJS": false,
}

addViewerSettings = {
  "appName" : "3d",
  "width": window.innerWidth - window.innerWidth*45/100, 
  "height": window.innerHeight - 100,
  "showToolBar": true,
  "borderColor": null,
  "showMenuBar": true,
  "showAlgebraInput": false,
  "showResetIcon":  true,
  "enableLabelDrags": true,
  "enableShiftDragZoom": true,
  "enableRightClick": true,
  "capturingThreshold": null,
  "showToolBarHelp": true,
  "errorDialogsActive": true,
  "useBrowserForJS": false,
}

add2DViewerSettings = {
  "width": window.innerWidth - window.innerWidth*45/100, 
  "height": window.innerHeight - 100,
  "showToolBar": true,
  "borderColor": null,
  "showMenuBar": true,
  "showAlgebraInput": false,
  "showResetIcon":  true,
  "enableLabelDrags": true,
  "enableShiftDragZoom": true,
  "enableRightClick": true,
  "capturingThreshold": null,
  "showToolBarHelp": true,
  "errorDialogsActive": true,
  "useBrowserForJS": false,
}

window.ggbApp = new GGBApplet(viewerSettings, true);
window.ggbAppAdd = new GGBApplet(addViewerSettings, true);
window.ggbApp2DAdd = new GGBApplet(add2DViewerSettings, true);


let event = new Event('ggb-loaded')
let addEvent = new Event('ggb-add-loaded')
let addEvent2D = new Event('ggb-add-2d-loaded')


addEventListener('ggb-loaded', function() {
    window.ggbApp.inject('ggb-element')
})

addEventListener('ggb-add-loaded', function() {
    window.ggbAppAdd.inject('ggb-add-3d-element')
})

addEventListener('ggb-add-2d-loaded', function() {
  window.ggbApp2DAdd.inject('ggb-add-2d-element')
})


