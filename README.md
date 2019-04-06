# Hal Chrome Extension

  

A Chrome extension to render and interact with json hal

  

## General Information

The extension was develop in Angular and is divided in several projects:

  

### hal-render-application

A application that is used to test the plugin.  By typing `ng serve`  the application became available at http:localhost:4200 and it renders a textarea that has its contents rendered as it were a json hal page.
  
 ### chrome-extension

A application that contains specific chrome plugin code. It is responsable to check if the current chrome page is a hal document and bootstraps the hal-render-component with the hal json. 

  

### hal-render-component

A library that defines a component (hrc-hal-render-component) that renders the hal content.

  

### tree-model

A library that defines the data structures that are used by hal-render-component

  

### uri-template-editor

A library that renders and allow in place editing of uri templates

## How to Install

### Install from chrome store
Get it from [chrome store](https://chrome.google.com/webstore/detail/hal-formatter/idnmkfbmiljnmfagobfbipdjiplaojjd)

### Install from sources
* Clone the repository and type `npm run build`. 
* Navigate to `chrome://chrome/extensions/` and enable "Developer mode"
* Click "Load unpacked extension" and select the  `dist/chrome-extension`.
