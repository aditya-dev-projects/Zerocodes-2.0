const { app, BrowserWindow, ipcMain, Menu, shell: electronShell } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

// --- 1. SETUP NODE-PTY ---
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

// --- 4. TOOL PATH HELPERS ---
function getEmbeddedToolPath(tool) {
  const basePath = isDev 
    ? path.join(process.cwd(), 'resources') 
    : path.join(process.resourcesPath, 'resources');

  const isWindows = os.platform() === 'win32';
  
  if (tool === 'python') {
    const bin = isWindows ? 'python.exe' : 'python3';
    let p = path.join(basePath, 'python', bin);
    if (fs.existsSync(p)) return p;
    return null;
  }
  
  if (tool === 'gcc') {
    const bin = isWindows ? 'gcc.exe' : 'gcc';
    const potentialPaths = [
        path.join(basePath, 'gcc', 'bin', bin),
        path.join(basePath, 'gcc', 'w64devkit', 'bin', bin)
    ];
    for (const p of potentialPaths) {
        if (fs.existsSync(p)) return p;
    }
    return null;
  }
  return null;
}

// --- 5. TERMINAL LOGIC ---
function initPty() {
  if (!pty || ptyProcess) return;

  const isWindows = os.platform() === 'win32';
  const shell = isWindows ? 'powershell.exe' : 'bash';
  const args = isWindows ? ['-NoLogo'] : [];

  try {
    const env = Object.assign({}, process.env);
    const pathSeparator = isWindows ? ';' : ':';
    let extraPath = '';

    const pythonExe = getEmbeddedToolPath('python');
    if (pythonExe) extraPath += path.dirname(pythonExe) + pathSeparator;

    const gccExe = getEmbeddedToolPath('gcc');
    if (gccExe) extraPath += path.dirname(gccExe) + pathSeparator;

    if (extraPath) env.PATH = extraPath + env.PATH;

    ptyProcess = pty.spawn(shell, args, {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: os.homedir(),
      env: env
    });

    ptyProcess.onData((data) => {
      if (mainWindow) mainWindow.webContents.send('terminal:incoming', data);
    });
    
    ptyProcess.onExit(() => { ptyProcess = null; });

  } catch (err) {
    console.error("Failed to spawn PTY:", err);
  }
}

// --- 6. IPC HANDLERS ---
ipcMain.on('terminal:input', (event, data) => {
  if (!ptyProcess) initPty();
  if (ptyProcess) ptyProcess.write(data);
});

ipcMain.on('terminal:resize', (event, { cols, rows }) => {
  if (ptyProcess) ptyProcess.resize(cols, rows);
});

ipcMain.on('terminal:kill', () => {
  if (ptyProcess) {
    try { ptyProcess.kill(); } catch (e) {}
    ptyProcess = null;
  }
});

// --- 7. EXECUTION LOGIC ---
//
// WHY THE CLEAR GOES THROUGH THE PTY (not through xterm directly):
//
// A PTY and xterm each maintain their own internal cursor position.
// If you call xterm.reset() on the renderer, xterm's cursor goes to 0,0
// but the PTY still thinks it's at row 25. When the PTY prints next,
// it prints at row 25 — xterm renders that at row 25 — gap above.
//
// The fix: write "clear" INTO the PTY as a shell command.
// The shell runs it. The PTY emits \x1b[2J\x1b[H (clear screen, cursor home)
// back through its onData stream. xterm receives that same escape sequence
// and moves ITS cursor to 0,0. Both sides are now at 0,0. Synchronized.
// Then the run command flows naturally from row 0 downward.
//
ipcMain.on('execution:run', (event, { language, code }) => {
  // If PTY is dead, respawn it first
  if (!ptyProcess) {
    initPty();
    if (!ptyProcess) return; // spawn failed
    // Fresh PTY needs a moment to emit its initial prompt before we write into it
    setTimeout(() => {
      executionClearAndRun(language, code);
    }, 300);
    return;
  }

  // PTY is alive and at a prompt — run immediately
  executionClearAndRun(language, code);
});

function executionClearAndRun(language, code) {
  if (!ptyProcess) return;

  const isWindows = os.platform() === 'win32';

  // Write the clear command INTO the PTY shell.
  // The PTY executes this and emits VT100 clear+home escape sequences
  // back to the renderer through the normal onData → terminal:incoming path.
  // xterm processes those escapes and clears its own screen + homes cursor.
  // Result: PTY cursor = 0,0 and xterm cursor = 0,0. In sync.
  const clearCmd = isWindows ? 'Clear-Host\r' : 'clear\r';
  ptyProcess.write(clearCmd);

  // Wait for the clear to flush through the PTY round-trip before writing the command.
  // The clear command needs to: reach the shell → shell executes it → PTY emits escape
  // codes → IPC delivers them to renderer → xterm processes them.
  // 100ms is sufficient for this local round-trip. This is not an arbitrary guess —
  // it's the minimum time to let one command complete before sending the next.
  setTimeout(() => {
    runCode(language, code);
  }, 100);
}

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

  try {
    switch (language.toLowerCase()) {
      case 'python':
      case 'python 3':
        filePath = path.join(tempDir, 'script.py');
        fs.writeFileSync(filePath, code);
        command = `& ${q(pythonPath)} ${q(filePath)}`;
        break;

      case 'c':
      case 'cpp':
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
    if (mainWindow) mainWindow.webContents.send('terminal:incoming', `\r\nError: ${err.message}\r\n`);
  }
}

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
