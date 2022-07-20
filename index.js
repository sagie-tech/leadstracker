let myLeads=[];
const inputBtn= document.querySelector('#input-btn');
const tabBtn= document.querySelector('#tab-btn');
const delBtn= document.querySelector('#del-btn');
const inputEl=document.querySelector('#input-el');
const ulEl= document.querySelector('#ul-el');

const getMyLeads = JSON.parse(localStorage.getItem("myLeads"));

if(getMyLeads!=null)
{
    myLeads=getMyLeads;
    render(myLeads);
}

inputBtn.addEventListener('click', ()=>{

    myLeads.push(inputEl.value);
    
    localStorage.setItem("myLeads",JSON.stringify(myLeads));
    render(myLeads);
    inputEl.value="";
});

tabBtn.addEventListener("click", ()=>{

    chrome.tabs.query({active:true , currentWindow:true}, (tabs)=>{
     myLeads.push(tabs[0].url);
     localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);

    });
});

delBtn.addEventListener("dblclick",()=>{
    localStorage.clear();
    myLeads=[];
    render(myLeads);
});



 function render(leads)
 {
    let ListItems="";
    leads.forEach(element => {

     ListItems +=`
     <li>
     <a target='_blank' href=${element}>${element}</a>
     </li>`;
        
    });
    
     ulEl.innerHTML=ListItems;
 }
