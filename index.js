currentItemIdx = 0;
offset = 0; 
mainImage = document.getElementById("mainimg");
captionOutput = document.getElementById("caption");
infoOutput = document.getElementById("info");
itemThumbs = document.getElementsByClassName("thumb");
shoppingList = document.getElementById("shoppingList"); 
inputContainer = document.getElementById("input"); 
add = document.getElementById("add");
del = document.getElementById("delete"); 
up = document.getElementById("up");
down = document.getElementById("down");

// backward = document.getElementById("backward");
// forward = document.getElementById("forward"); 

display();

function display()
{   
    // Displays image, caption, and info for first grocery item: bread
    mainImage.src = "images/" + itemList[currentItemIdx].itemImage; 
    captionOutput.innerHTML = itemList[currentItemIdx].itemName;
    infoOutput.innerHTML = itemList[currentItemIdx].itemInfo;

    //Displays thumbnails (initial: 1-3)
    for (let i = 0; i < itemThumbs.length; i++)
    {
        itemThumbs[i].src = "images/" + itemList[i + offset].itemImage; 
    }
}

function addGrocery()
{
    numInput = inputContainer.numSel.value; 
    orderedList = document.getElementById("orderedList");
    if (numInput > -1 && numInput < itemList.length)
    {
        list = document.createElement("li");
        list.setAttribute("class", "item")
        list.innerHTML = "<span class='grocery'>" + itemList[numInput].itemName + "</span>"; 
        // "<li class='item'>" + listNum + ". " + "<span class='grocery'>" + itemList[numInput].itemName + "</span>" + "</span>"; 
        orderedList.appendChild(list); 
    }
}

function deleteGrocery()
{
    numInput = inputContainer.numSel.value;
    items = document.querySelectorAll(".item")
    groceries = document.querySelectorAll(".grocery");
    items[numInput].parentNode.removeChild(items[numInput]);
   
    if (numInput > -1 && numInput < groceries.length && numInput < items.length)
    {
        for (let i = 0; i < items.length; i++)
        {
            items[i].innerHTML = groceries[i].innerHTML; 
        }
    }
}

function reorderList(mod)
{
    numInput = parseInt(inputContainer.numSel.value);
    items = document.querySelectorAll(".item")
    groceries = document.querySelectorAll(".grocery");
    
    if (numInput > -1 && numInput < items.length && numInput < groceries.length)
    {
        placeHolder = groceries[numInput].innerHTML;
        // console.log(placeHolder);
        sum = numInput + mod;
        items[numInput].innerHTML = "<span class='grocery'>" + groceries[sum].innerHTML + "</span>"; 
        // console.log(items[numInput].innerHTML)
        items[sum].innerHTML = "<span class='grocery'>" + placeHolder + "</span>";
        // console.log(items[sum].innerHTML)  
        // numInput = inputContainer.numSel.value
    }
}

function moveOffset(mod)
{
    offset += mod; 

    if (offset < 0)
    {
        offset = 0;
    }
    if (offset >= itemList.length - 3)
    {
        offset = itemList.length - 3; 
    }
    display(); 
}
function selectItem(idx)
{
    currentItemIdx = idx + offset;
    display();
}

add.addEventListener("click", addGrocery); 
del.addEventListener("click", deleteGrocery); 
up.addEventListener("click", reorderList(-1));
down.addEventListener("click", reorderList(1));

