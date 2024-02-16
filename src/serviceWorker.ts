import Tab = chrome.tabs.Tab;

type TabId = {
    index: number;
    id: number|undefined;
    active: boolean;
}

async function switchTab(direction: string){
    const allTabs:Tab[] = await chrome.tabs.query({currentWindow:true})
    const tabIds:TabId[] = allTabs.map(({id, index, active})=>({id,index, active}))
    const currentTab = tabIds.find(({active})=>active)
    if (!currentTab) return
    let newTabIndex
    switch (direction){
        case 'previous': newTabIndex = currentTab.index - 1; break
        case 'next': newTabIndex = currentTab.index + 1; break
        default: return
    }
    chrome.tabs.update(tabIds[newTabIndex].id!,{active:true})
}

chrome.commands.onCommand.addListener(function (command) {
    if (!['next','previous'].includes(command)) return
    switchTab(command)
})
