import { app, BrowserWindow, ipcMain, Menu, powerMonitor, Tray } from 'electron'


let mainWindow: BrowserWindow | null

declare const MAIN_WINDOW_WEBPACK_ENTRY: string
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string

// const assetsPath =
//   process.env.NODE_ENV === 'production'
//     ? process.resourcesPath
//     : app.getAppPath()

function createWindow () {
  mainWindow = new BrowserWindow({
    // icon: path.join(assetsPath, 'assets', 'icon.png'),
    width: 600,
    height: 360,
    resizable: false,
    fullscreen: false,
    title: 'LogWorking',
    backgroundColor: '#FFFFFF',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })


  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWindow.webContents.openDevTools();
  
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

async function registerListeners () {
  /**
   * This comes from bridge integration, check bridge.ts
   */
  ipcMain.on('message', (_, message) => {
    console.log(message)
  })

}

async function registerHandles() {
  ipcMain.handle('getSystemIdleTime', (event, args) => {
   return powerMonitor.getSystemIdleTime();
  });
}

app.on('ready', createWindow)
  .whenReady()
  .then(registerListeners)
  .then(registerHandles)
  .then(createTray)
  .catch(e => console.error(e))

  
let tray = null
function createTray() {
  tray = new Tray('./assets/logo.png');
  const contextMenu = Menu.buildFromTemplate([
   
  ])
  tray.setToolTip('LogWorking')
  tray.setContextMenu(contextMenu)
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
