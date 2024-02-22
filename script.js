let form = document.querySelector(".form")
let formInput = document.querySelector("#input")
let redBtn = document.querySelector("#red-btn");
let greyBtn = document.querySelector("#grey-btn");
main = document.querySelector(".list")
const list = document.querySelector(".list");
let deleteBtns = document.querySelector(".list__delete-btns")
let count = 0;  // счетчик созданнных эл. списка.


let changeCheckbox = document.createElement("input");
changeCheckbox.setAttribute("type", "text");

let firstUpperLetter = (str) => str.split('')[0].toUpperCase()+str.slice(1);

let LS = window.localStorage;
let arr = [];

function createList(str, check){
    count++
    const blockLabel = document.createElement("div");
    blockLabel.classList.add("field");
    

    const label = document.createElement("label");
    label.setAttribute("for", `checkbox${count}`)
    label.classList.add("list__label");
    // label.innerText = formInput.value;

    const input = document.createElement("input");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", `checkbox${count}`);
    input.setAttribute("name", `checkbox${count}`);
    input.classList.add("list_checkbox");

    let listText = document.createElement("input");
    listText.setAttribute("type", "text");
    listText.classList.add("list_input")
    listText.classList.add("out-line")
    
    
    let blockCheckDel = document.createElement("div");
    blockCheckDel.classList.add("block-check-del")
    var span1 = document.createElement("input");
    // span1.classList.add("change-item");
   
    span1.setAttribute("type", "checkbox");
    // span1.classList.add("checkbox");
    span1.classList.add("check_box")
 
    let span2 = document.createElement("span");
    span2.classList.add("delete-item");
    span2.innerText = "🗑";

   list.append(blockLabel);
   blockLabel.append(label,blockCheckDel);
   label.prepend(input,listText);

   listText.value = firstUpperLetter(str.toLowerCase());
   blockCheckDel.append(span1,span2);

   list.addEventListener("click", changeListItem);


}
form.addEventListener("submit", function(e){
    e.preventDefault();

    if(formInput.value){
        let objLS = {
            text:`${formInput.value.toLowerCase()}`,
            check:false,
        }
    deleteBtns.classList.remove("d-none")
    arr.push(objLS);
    LS.setItem("task", JSON.stringify(arr));      
    createList(formInput.value);         
    formInput.value='' ;
    }
    else{
        formInput.value=""; 
    }
})


function changeListItem(e){
    target = e.target;
    // let label =  target.closest(".field").querySelector("label");
    if(target.classList.contains("check_box")){ 
    
    target.classList.toggle("change_box");
     let textinput = target.closest(".field").querySelector(".list_input");
    //  console.log(textinput.value);
    let x = textinput.value;
     let str = arr.findIndex(item => item.text === x.toLowerCase());
     textinput.classList.toggle("out-line");
     textinput.addEventListener("change", function(e){
        arr[str].text=textinput.value;
        // console.log(x);
        // console.log(str);  
        // console.log(arr[arr.findIndex(item => item.text == x.toLowerCase())]);
        //  arr[arr.findIndex(item => item.text == x.value)] = textinput.value;
     
        LS.setItem("task",JSON.stringify(arr));
        // arr[arr.findIndex(item => item.text === textinput.value)].text = text.value;
     })
 
    //  console.log(arr[arr.findIndex(item => item.text === textinput.value)].text);
  
    }

}
 list.addEventListener("click", changeListItem);
redBtn.addEventListener("click", function(e){   
    LS.clear()
    arr=[];
    deleteBtns.classList.add("d-none")
    main.innerText = ''; 
    formInput.value = '';
})

list.addEventListener("click", function(e){
    // console.log(e.target);
    if(e.target.classList.contains("delete-item"))
 {

    let label = e.target.closest(".list").querySelector("div");
    let delItem = e.target.closest(".field").querySelector(".list_input")
     console.log(delItem.value);
     arr.splice(arr.findIndex(item => item.text === delItem.value.toLowerCase()),1)// находим нужный объект по ключу и извлекаем из массива 
     console.log(arr);
     LS.setItem("task",JSON.stringify(arr)) // запись хранилище  уже без этого эл-а
//     console.log(delItem);
    label.remove() ;
}
//    del();// удаляет  кнопки и пустой массив 

})

if(LS.getItem("task")){ 
    arr =  JSON.parse( LS.getItem("task")) 
    for(let el of arr){
        createList(el.text,el.check);       
        deleteBtns.classList.remove("d-none")  
    }
  
}




