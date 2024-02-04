const path = require('path')
const { app, BrowserWindow } = require('electron')

function createWindow () {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          devTools: true,
          nodeIntegration: true,
          contextIsolation: false
      },
      title: "DragonChat",
    })
  
    win.loadFile('index.html')
}

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})