# PlayCanvas offline electron editor

![screenshot](https://i.imgur.com/8BgGpEx.png)

This is only boilerplate code for an offline editor for PlayCanvas engine.
It's setup with typescript and some decorating for integration with playcanvas.

It also has Visual Studio Code setup for debugging the electron app.

# App

The editor entry point is in `editor.ts`. It is loaded by `preload.ts` after the html document has been loaded. That means it has access to node.js.

# Installation

First you need `npm` installed. Then in the main project folder, run:

```
npm install
npm build
```

# Debugging

Use Visual Studio Code to open the root project, then hit F5 to start the debugging.

# Building

Project has electron-builder installed but is not setup yet.