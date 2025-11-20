const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const isDev = !app.isPackaged;
  
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#1e1e1e',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      devTools: true
    }
  });

  // In dev, load localhost. In prod, load the built index.html
  if (isDev) {
    win.loadURL('http://localhost:5173');
    // Open DevTools explicitly if you want to see console errors
    // win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
    win.setMenu(null); // Hide default menu in prod
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});