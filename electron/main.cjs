const { app, BrowserWindow, ipcMain, Menu, shell: electronShell } = require('electron');
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

// Register Custom Protocol (Deep Linking)
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('zekodes', process.execPath, [path.resolve(process.argv[1])]);
  }
} else {
  app.setAsDefaultProtocolClient('zekodes');
}

// Ensure Single Instance Lock
const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
    const url = commandLine.find(arg => arg.startsWith('zekodes://'));
    if (url) handleDeepLink(url);
  });
}

// Handle macOS Deep Link URL
app.on('open-url', (event, url) => {
  event.preventDefault();
  handleDeepLink(url);
});

function handleDeepLink(url) {
  if (!mainWindow) return;
  try {
    mainWindow.webContents.send('auth:session', url);
  } catch (e) {
    console.error('Deep link parse error:', e);
  }
}

// --- 2. CREATE WINDOW FUNCTION ---
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

  mainWindow.webContents.on('before-input-event', (event, input) => {
    const isCmdOrCtrl = input.control || input.meta;
    if (isCmdOrCtrl) {
      const key = input.key.toLowerCase();
      if (key === 'v') mainWindow.webContents.paste();
      if (key === 'c') mainWindow.webContents.copy();
      if (key === 'x') mainWindow.webContents.cut();
      if (key === 'a') mainWindow.webContents.selectAll();
      if (key === '+' || key === '=') mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() + 0.5);
      if (key === '-') mainWindow.webContents.setZoomLevel(mainWindow.webContents.getZoomLevel() - 0.5);
      if (key === '0') mainWindow.webContents.setZoomLevel(0);
    }
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); 
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(indexPath);
  }

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    electronShell.openExternal(url);
    return { action: 'deny' };
  });
}

// --- 3. MENU TEMPLATE ---
const template = [
  {
    label: 'Edit',
    submenu: [
      { role: 'undo' }, { role: 'redo' }, { type: 'separator' },
      { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'delete' },
      { type: 'separator' }, { role: 'selectAll' }
    ]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' }, { role: 'forceReload' }, { role: 'toggleDevTools' },
      { type: 'separator' }, { role: 'resetZoom' }, { role: 'zoomIn' }, { role: 'zoomOut' },
      { type: 'separator' }, { role: 'togglefullscreen' }
    ]
  },
  { role: 'window', submenu: [{ role: 'minimize' }, { role: 'close' }] }
];
const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);

// --- 4. TERMINAL HELPER FUNCTIONS & RUNTIME STRATEGY ---

function getEmbeddedToolPath(tool) {
  const basePath = isDev 
    ? path.join(process.cwd(), 'resources') 
    : path.join(process.resourcesPath, 'resources');

  const isWindows = os.platform() === 'win32';
  
  if (tool === 'python') {
    const bin = isWindows ? 'python.exe' : 'python3';
    let p = path.join(basePath, 'python', bin);
    if (fs.existsSync(p)) return p;
    try {
        const subdirs = fs.readdirSync(path.join(basePath, 'python'), { withFileTypes: true })
            .filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);
        for (const dir of subdirs) {
            p = path.join(basePath, 'python', dir, bin);
            if (fs.existsSync(p)) return p;
        }
    } catch(e) {}
    return null;
  }
  
  if (tool === 'gcc') {
    const bin = isWindows ? 'gcc.exe' : 'gcc';
    const potentialPaths = [
        path.join(basePath, 'gcc', 'bin', bin),
        path.join(basePath, 'gcc', 'w64devkit', 'bin', bin),
        path.join(basePath, 'gcc', 'mingw64', 'bin', bin)
    ];
    for (const p of potentialPaths) {
        if (fs.existsSync(p)) return p;
    }
    return null;
  }
  return null;
}

function initPty() {
  if (!pty) return;
  // If a process already exists, we use it (unless we manually killed it)
  if (ptyProcess) return;

  const isWindows = os.platform() === 'win32';
  const shell = isWindows ? 'powershell.exe' : 'bash';
  
  // Clean prompt startup args
  const args = isWindows 
    ? ['-NoLogo', '-NoExit', '-Command', 'function prompt { "" }; Clear-Host'] 
    : [];

  try {
    const env = Object.assign({}, process.env);
    const pathSeparator = isWindows ? ';' : ':';
    let extraPath = '';

    const pythonExe = getEmbeddedToolPath('python');
    if (pythonExe) {
        extraPath += path.dirname(pythonExe) + pathSeparator;
        extraPath += path.join(path.dirname(pythonExe), 'Scripts') + pathSeparator;
    }

    const gccExe = getEmbeddedToolPath('gcc');
    if (gccExe) {
        extraPath += path.dirname(gccExe) + pathSeparator;
    }

    if (extraPath) {
        env.PATH = extraPath + env.PATH;
    }

    delete env.GCC_EXEC_PREFIX; 

    ptyProcess = pty.spawn(shell, args, {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME || os.homedir(),
      env: env
    });

    ptyProcess.onData((data) => {
      if (mainWindow) mainWindow.webContents.send('terminal:incoming', data);
    });
    
    ptyProcess.onExit(() => {
        ptyProcess = null;
    });

  } catch (err) {
    console.error("Failed to spawn PTY:", err);
  }
}

// --- 5. IPC HANDLERS ---
ipcMain.on('terminal:input', (event, data) => {
  if (!ptyProcess) initPty();
  if (ptyProcess) ptyProcess.write(data);
});
ipcMain.on('terminal:resize', (event, { cols, rows }) => {
  if (ptyProcess) ptyProcess.resize(cols, rows);
});
ipcMain.on('terminal:clear-request', () => {
  // Manual clear button logic
  if (mainWindow) mainWindow.webContents.send('terminal:clear');
  if (ptyProcess) {
      const clearCmd = os.platform() === 'win32' ? 'Clear-Host\r' : 'clear\r';
      ptyProcess.write(clearCmd);
  }
});
ipcMain.on('terminal:kill', () => {
  if (ptyProcess) {
    try { ptyProcess.kill(); } catch (e) {}
    ptyProcess = null;
  }
});

// --- 6. EXECUTION LOGIC (FIXED: KILL & RESTART) ---
ipcMain.on('execution:run', (event, { language, code }) => {
  // Step 1: Force kill the previous terminal session
  // This ensures NO history, NO scrolling, NO ghost text.
  if (ptyProcess) {
      try {
          ptyProcess.kill();
      } catch (e) {
          console.error("Error killing PTY:", e);
      }
      ptyProcess = null;
  }

  // Step 2: Signal Frontend to wipe the visual buffer
  if (mainWindow) mainWindow.webContents.send('terminal:clear');

  // Step 3: Start a fresh terminal (Starts at TOP line)
  initPty();

  // Step 4: Run the code after a short delay (to let shell boot)
  setTimeout(() => {
      runCode(language, code);
  }, 400);
});

function runCode(language, code) {
  if (!ptyProcess) return;

  const tempDir = path.join(os.tmpdir(), 'zerocodes_exec');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const isWindows = os.platform() === 'win32';
  let command = '';
  let filePath = '';

  const pythonPath = getEmbeddedToolPath('python') || 'python';
  const gccPath = getEmbeddedToolPath('gcc') || 'gcc';

  const q = (s) => isWindows ? `"${s}"` : `'${s}'`;

  // Note: We removed "Clear-Host" here because the terminal is already fresh.
  
  try {
    switch (language.toLowerCase()) {
      case 'python':
      case 'python 3':
        filePath = path.join(tempDir, 'script.py');
        fs.writeFileSync(filePath, code);
        
        if (isWindows) {
            command = `& ${q(pythonPath)} ${q(filePath)}`;
        } else {
            command = `${q(pythonPath)} ${q(filePath)}`;
        }
        break;

      case 'javascript':
      case 'nodejs':
        filePath = path.join(tempDir, 'script.js');
        fs.writeFileSync(filePath, code);
        command = `node ${q(filePath)}`;
        break;

      case 'c':
      case 'cpp':
      case 'c++':
        filePath = path.join(tempDir, 'main.c');
        const exePath = path.join(tempDir, isWindows ? 'main.exe' : 'main');
        fs.writeFileSync(filePath, code);
        
        const gccDir = (gccPath !== 'gcc') ? path.dirname(gccPath) : '';
        const bFlag = (gccDir && isWindows) ? ` -B ${q(gccDir + path.sep)} ` : ' ';

        if (isWindows) {
           command = `& ${q(gccPath)}${bFlag}${q(filePath)} -o ${q(exePath)}; if ($?) { & ${q(exePath)} }`;
        } else {
           command = `${q(gccPath)}${bFlag}${q(filePath)} -o ${q(exePath)} && ${q(exePath)}`;
        }
        break;
    }

    if (command) {
        ptyProcess.write(command + '\r');
    }

  } catch (err) {
    ptyProcess.write(`\r\nError preparing execution: ${err.message}\r\n`);
  }
}

// --- 7. APP LIFECYCLE ---
app.whenReady().then(() => {
    createWindow();
    initPty(); 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});