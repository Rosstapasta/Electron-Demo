const electron = require('electron')
const {app, BrowserWindow} = electron


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {
  // Function that we call when electron is finished initializing, that makes our application window.
  mainWindow = new BrowserWindow({
    width: 800, 
    height: 600
  })

  // The URL that you want the Browser Window to open when electron finishes intializing.
  mainWindow.loadURL('http://localhost:3000')

  // This is optional code that will open the dev tools automatically when the browser window opens.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    //The .on is a listener, and it takes in two arguments
    //The first is a string of what it's waiting for. In this case, it's closed. So, when it's closed, it runs the function
    //This function initializes mainWindow as null. So it closes out of the window.
    mainWindow = null
  })
}

//This is another .on connected to app which we destructured off of electron.
//This one waits for the app to be ready, when it's all loaded and done initializing, it runs the creaate window function
app.on('ready', createWindow)

//Another .on that waits for all windows to be closed. If you have your app built so that multiple windows open up, 
//It will wait for all of the windows to be closed until it quits the npm run electron
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  //This is used if your app is ready for production, and people can download it onto their computers
  //When they click on it, it's activated
  //this .on waits for it to activate, and then it runs createWindow if the mainWindow is not already running
  if (mainWindow === null) {
    createWindow()
  }
})
