console.log('Switch Tabs loaded')

addEventListener("keydown", (event) => {
    const {key, ctrlKey} = event
    if (!ctrlKey) return
    switch (key){
        case "ArrowLeft": return sendMessage('Previous')
        case "ArrowRight": return sendMessage('Next')
    }
});

function sendMessage(tab:string){
    chrome.runtime.sendMessage(tab).then(console.log).catch(console.error)
}
