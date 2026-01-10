const { app, BrowserWindow, ipcMain, Menu, shell } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

// --- 1. SETUP NODE-PTY (Terminal Backend) ---
let pty;
try {
  pty = require('node-pty');
} catch (e) {
  console.warn("node-pty not found. Ensure it is installed if you want terminal features.");
}

const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
let mainWindow;
let ptyProcess = null;

// --- 2. CREATE WINDOW FUNCTION (UPDATED WITH FIX) ---
function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'Zekodes',
    backgroundColor: '#1e1e1e', 
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      devTools: true
    },
  });

  // --- 🔴 THE FIX: FORCE COPY/PASTE/ZOOM AT WINDOW LEVEL ---
  // This guarantees shortcuts work even if the Editor doesn't catch them
  mainWindow.webContents.on('before-input-event', (event, input) => {
    // Check if Control (Windows/Linux) or Command (Mac) is pressed
    const isCmdOrCtrl = input.control || input.meta;

    if (isCmdOrCtrl) {
      const key = input.key.toLowerCase();
      
      if (key === 'v') {
        mainWindow.webContents.paste();
      }
      if (key === 'c') {
        mainWindow.webContents.copy();
      }
      if (key === 'x') {
        mainWindow.webContents.cut();
      }
      if (key === 'a') {
        mainWindow.webContents.selectAll();
      }
      // Zoom In (Ctrl + +) or (Ctrl + =)
      if (key === '+' || key === '=') {
        mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() + 0.5);
      }
      // Zoom Out (Ctrl + -)
      if (key === '-') {
        mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() - 0.5);
      }
      // Reset Zoom (Ctrl + 0)
      if (key === '0') {
        mainWindow.webContents.setZoomLevel(0);
      }
    }
  });
  // ---------------------------------------------------------

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); 
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(indexPath);
  }

  // Open external links in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: 'deny' };
  });
}

// --- 3. MENU TEMPLATE (Fallback & UI) ---
const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      { role: 'delete' },
      { type: 'separator' },
      { role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
  {
    role: 'window',
    submenu: [
      { role: 'minimize' },
      { role: 'close' }
    ]
  }
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// --- 4. TERMINAL HELPER FUNCTIONS ---

function initPty() {
  if (!pty) return;
  if (ptyProcess) {
    try { ptyProcess.kill(); } catch (e) {}
  }

  const shell = os.platform() === 'win32' ? 'powershell.exe' : 'bash';
  
  try {
    ptyProcess = pty.spawn(shell, [], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME,
      env: process.env
    });

    ptyProcess.onData((data) => {
      if (mainWindow) mainWindow.webContents.send('terminal:incoming', data);
    });
  } catch (err) {
    console.error("Failed to spawn PTY:", err);
  }
}

function checkTool(toolName) {
    try {
        execSync(`${toolName} --version`, { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// --- 5. IPC HANDLERS ---

ipcMain.on('terminal:input', (event, data) => {
  if (ptyProcess) ptyProcess.write(data);
});

ipcMain.on('terminal:resize', (event, { cols, rows }) => {
  if (ptyProcess) ptyProcess.resize(cols, rows);
});

ipcMain.on('terminal:clear-request', () => {
  if (mainWindow) mainWindow.webContents.send('terminal:clear');
});

ipcMain.on('terminal:kill', () => {
  if (ptyProcess) {
    try { ptyProcess.kill(); } catch (e) {}
    ptyProcess = null;
  }
});

// --- 6. EXECUTION LOGIC (Java/Python/C) ---
ipcMain.on('execution:run', (event, { language, code }) => {
  if (ptyProcess) {
    try { ptyProcess.kill(); } catch(e) {}
    ptyProcess = null;
  }
  if (mainWindow) mainWindow.webContents.send('terminal:clear');
  initPty();

  if (!ptyProcess) return;

  const tempDir = path.join(os.tmpdir(), 'zerocodes_exec');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const isWindows = os.platform() === 'win32';
  let command = '';
  let filePath = '';

  try {
    switch (language.toLowerCase()) {
      case 'python':
      case 'python 3':
        if (!checkTool('python')) {
            ptyProcess.write('\r\n\x1b[31mError: Python is not installed or not in PATH.\x1b[0m\r\n');
            return;
        }
        filePath = path.join(tempDir, 'script.py');
        fs.writeFileSync(filePath, code);
        command = `python "${filePath}"`; 
        break;

      case 'javascript':
      case 'nodejs':
      case 'node':
        if (!checkTool('node')) {
            ptyProcess.write('\r\n\x1b[31mError: Node.js is not installed.\x1b[0m\r\n');
            return;
        }
        filePath = path.join(tempDir, 'script.js');
        fs.writeFileSync(filePath, code);
        command = `node "${filePath}"`;
        break;
      
      case 'c':
      case 'cpp':
      case 'c++':
        if (!checkTool('gcc')) {
            ptyProcess.write('\r\n\x1b[31mError: GCC is not installed.\r\nPlease install MinGW or w64devkit.\x1b[0m\r\n');
            return;
        }
        filePath = path.join(tempDir, 'main.c');
        const exePath = path.join(tempDir, isWindows ? 'main.exe' : 'main');
        fs.writeFileSync(filePath, code);
        
        if (isWindows) {
          command = `gcc "${filePath}" -o "${exePath}"; if ($?) { & "${exePath}" }`;
        } else {
          command = `gcc "${filePath}" -o "${exePath}" && "${exePath}"`;
        }
        break;

      case 'java':
        if (!checkTool('javac')) {
            ptyProcess.write('\r\n\x1b[31mError: Java (JDK) is not installed.\x1b[0m\r\n');
            return;
        }
        filePath = path.join(tempDir, 'Main.java');
        fs.writeFileSync(filePath, code);
        
        if (isWindows) {
           command = `javac "${filePath}"; if ($?) { java -cp "${tempDir}" Main }`;
        } else {
           command = `javac "${filePath}" && java -cp "${tempDir}" Main`;
        }
        break;
    }

    if (command) {
        setTimeout(() => {
            ptyProcess.write(command + '\r');
        }, 200);
    }

  } catch (err) {
    ptyProcess.write(`\r\nError: ${err.message}\r\n`);
  }
});

// --- 7. APP LIFECYCLE ---

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});