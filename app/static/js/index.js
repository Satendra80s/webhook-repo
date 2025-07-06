const eventContainer=document.querySelector('div.event-container')
let data=[]

async function LoadData() {
    try {
        let url=new URL(`${window.location.origin}/webhook/events`)
        let res=await fetch(url)
        res=await res.json()
        console.log("Res length",res.length)
        createEventDiv(res)
        data.push(...res)
    } catch (error) {
        console.log("Error",error.message)
    }
}
window.addEventListener('DOMContentLoaded',e=>{
    LoadData()
    setInterval(async ()=>{
        LoadData()
    },15*1000)

})

function formateMessage(event)
{
    message=""
    action=event["action"]
    if(action=='PUSH')
        message=`"${event["author"]}" pushed to "${event["to_branch"]}" on ${formatDate(event["timestamp"])}`
    else if(action=="PULL_REQUEST")
        message=`"${event["author"]}" submitted a pull request from "${event["from_branch"]}" to "${event["to_branch"]}" on ${formatDate(event["timestamp"])}`
    else if(action=='MERGED')
        message=`"${event["author"]}" merged branch "${event["from_branch"]}" to "${event["to_branch"]}" on ${formatDate(event["timestamp"])}`
    return message
}
function createEventDiv(events)
{

    for(let event of events)
    {
        let div=document.createElement('div')
        div.className='event'
        div.innerText=formateMessage(event)
        eventContainer.append(div)
        div.scrollIntoView({behavior:'smooth'})
    }
}


function formatDate(dateString) {
    const date = new Date(dateString);
    
    const options = { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: true, 
        timeZone: 'UTC' 
    };

    // Get day, month, year, hour, and minute
    const day = date.toLocaleString('en-GB', { day: 'numeric', timeZone: 'UTC' });
    const month = date.toLocaleString('en-GB', { month: 'long', timeZone: 'UTC' });
    const year = date.toLocaleString('en-GB', { year: 'numeric', timeZone: 'UTC' });
    let time = date.toLocaleString('en-GB', { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'UTC' });

    // Convert AM/PM to uppercase
    time = time.replace(/am/i, 'AM').replace(/pm/i, 'PM');

    // Add suffix to the day
    const suffix = day.endsWith('1') && day !== '11' ? 'st' :
                   day.endsWith('2') && day !== '12' ? 'nd' :
                   day.endsWith('3') && day !== '13' ? 'rd' : 'th';
    
    return `${day}${suffix} ${month} ${year} - ${time} UTC`;
}