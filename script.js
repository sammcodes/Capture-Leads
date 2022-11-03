
const saveInput = document.querySelector("#save-input")
const inputBox  = document.querySelector("input")
const leads = document.querySelector("ul")
const deleteLeads = document.querySelector("#delete-leads")
const saveTab = document.querySelector("#save-tab")

let myLeads =[]

const leadsFromStorage = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromStorage)

if(leadsFromStorage){
    myLeads = leadsFromStorage
    render()
}

saveInput.addEventListener('click', function saveBtn() {
    myLeads.push(inputBox.value)
    render()
    inputBox.value=""

    localStorage.setItem("myLeads", JSON.stringify(myLeads))
 
    
})

saveTab.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render()


    })
 
})



deleteLeads.addEventListener('dblclick', function deleteBtn(){
    leads.innerHTML = " "
    myLeads = []
    localStorage.clear()
})


function render(){

    let leadsList = ""
    for (let i= 0; i < myLeads.length; i++) {
        leadsList += `<li><a href=' ${myLeads[i]}' target='_blank'> ${myLeads[i]}  </li>`
        
    }

    leads.innerHTML = leadsList 

}




