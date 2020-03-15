const { app, BrowserWindow } = require('electron');
const path = require('path')
const contextMenu = require('electron-context-menu');

function createWindow() {
    // Create the browser window.
    win = new BrowserWindow({
        width: 372, //372
        height: 125, //125
        //alwaysOnTop: true,
        //frame: false,
        webPreferences: {
            nodeIntegration: true
        },
        //transparent: true
    })

    // and load the index.html of the app.
    win.loadFile('src/index.html')

    // Open the DevTools.
    win.webContents.openDevTools()

    //Remove menu bar 
    win.removeMenu();

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }

})

app.on("ready", function() {

    //Creates a context menu with About and Exit options
    contextMenu({
        menu: actions => [{
                label: 'About',
                click: function() {
                    const modalPath = path.join('file://', __dirname + '/src', 'about.html')
                    win = new BrowserWindow({ height: 400, width: 400 })
                    win.on('close', function() { win = null })
                    win.loadURL(modalPath)
                    win.removeMenu()
                    win.show()
                }
            },
            {
                label: 'Exit',
                click: function() { app.quit() }
            },
            actions.inspect({ visible: false })
        ]
    })

})