const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

// Try to use node-pty
let pty;
try {
  pty = require('node-pty');
} catch (e) {
  console.warn("node-pty not found. Ensure it is installed.");
}

const isDev = !app.isPackaged;
let mainWindow;
let ptyProcess = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
  });

  if (isDev) {
    mainWindow.loadURL('http://localhost:5173'); 
    mainWindow.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
    mainWindow.loadFile(indexPath);
  }
}

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

// --- HELPER: Check if tool exists ---
function checkTool(toolName) {
    try {
        // Try getting version (e.g., "gcc --version")
        execSync(`${toolName} --version`, { stdio: 'ignore' });
        return true;
    } catch (e) {
        return false;
    }
}

// --- IPC HANDLERS ---

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

// --- RUN LOGIC ---
ipcMain.on('execution:run', (event, { language, code }) => {
  // 1. Reset Terminal
  if (ptyProcess) {
    try { ptyProcess.kill(); } catch(e) {}
    ptyProcess = null;
  }
  if (mainWindow) mainWindow.webContents.send('terminal:clear');
  initPty();

  if (!ptyProcess) return;

  // 2. Prepare Files
  const tempDir = path.join(os.tmpdir(), 'zerocodes_exec');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const isWindows = os.platform() === 'win32';
  let command = '';
  let filePath = '';
  let toolMissing = false;

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
            ptyProcess.write('\r\n\x1b[31mError: GCC (C Compiler) is not installed.\r\nPlease install MinGW or w64devkit to run C code.\x1b[0m\r\n');
            return;
        }
        filePath = path.join(tempDir, 'main.c');
        const exePath = path.join(tempDir, isWindows ? 'main.exe' : 'main');
        fs.writeFileSync(filePath, code);
        
        // Windows '&&' fix
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

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});