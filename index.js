const { app, BrowserWindow, screen } = require('electron')
const path = require('node:path')

const createWindow = (x, y, width, height) => {
    const win = new BrowserWindow({
        x, y,           // Position on the screen
        width, height,   // Random width and height
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

// This function handles creating windows across all screens
const createWindowsOnAllScreens = () => {
    // Get all available displays (screens)
    const displays = screen.getAllDisplays()

    // Create a window on each display
    displays.forEach((display, index) => {
        const { x, y, width, height } = display.bounds
        const randomWidth = Math.floor(Math.random() * 1000) + 200 // Random width
        const randomHeight = Math.floor(Math.random() * 1000) + 200 // Random height

        // Create a window with random dimensions at a position based on display's bounds
        createWindow(x + (index * 20), y + (index * 20), randomWidth, randomHeight)
    })
}

app.whenReady().then(() => {
  for (let step = 0; step < 200; step++) {
    
    createWindowsOnAllScreens()
  }

    // Re-create windows if the app is activated (e.g., after minimizing or closing all windows)
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindowsOnAllScreens()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})