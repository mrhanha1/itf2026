const { app, BrowserWindow } = require('electron');
function createWindow() {
  const win = new BrowserWindow({ width: 900, height: 700 });
  win.loadFile('App/index.html');
}
app.whenReady().then(createWindow);