const { app, BrowserWindow, ipcMain, shell } = require('electron');
const path = require('path');
const fs = require('fs');
const os = require('os');

function createWindow() {
  const isDev = !app.isPackaged;
  
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    backgroundColor: '#1e1e1e',
    icon: path.join(__dirname, '../public/icon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false, // Note: For production, contextIsolation: true + preload is safer, but we'll stick to your current config
      devTools: true
    }
  });

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
    win.setMenu(null);
  }
}

app.whenReady().then(() => {
  createWindow();

  // --- IPC HANDLER: Create Desktop Shortcut ---
  ipcMain.handle('create-desktop-shortcut', async () => {
    if (process.platform === 'win32') {
      const desktopPath = app.getPath('desktop');
      const shortcutPath = path.join(desktopPath, 'Zerocodes.lnk');
      const exePath = app.getPath('exe');
      
      // Use electron.shell to write the shortcut
      const res = await shell.writeShortcutLink(shortcutPath, {
        target: exePath,
        cwd: path.dirname(exePath),
        description: 'Zerocodes IDE'
      });
      return res;
    }
    return false; // Not supported on Mac/Linux via this specific method easily
  });
});

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