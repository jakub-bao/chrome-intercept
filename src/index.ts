type ReguestList = {
    [url:string]:number
}
const delayedRequests:ReguestList = {
    'https://api.sbx.pdap.pepfar.net/erb-cache?org_unit_id=XOivy2uDpMF&mechanism_id=kcOf8nAumHQ&period_id=2022Oct&workflow=expenditure&query_filter=partner_only':1e4,
    'https://api.sbx.pdap.pepfar.net/erb-cache?org_unit_id=XOivy2uDpMF&mechanism_id=CkJcmmaMVSX&period_id=2022Oct&workflow=expenditure&query_filter=partner_only':0
}

function pause(time:number){
    return new Promise((resolve)=>{setTimeout(resolve, time)})
}

const {fetch:originalFetch} = window

window.fetch = async (input, init)=>{
    const delay = delayedRequests[input as string]
    if (delay===undefined) return originalFetch(input, init)
    console.log(`%c Delaying request (${delay}ms)`,  'color: red', input);
    await pause(delay)
    return originalFetch(input,init).then(response=>{
        console.log(`%c Delayed request arrived (${delay}ms)`, 'color: green', input);
        return response
    })
}