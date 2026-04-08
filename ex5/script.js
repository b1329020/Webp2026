var count = 1;

// 新增按鈕的函式
function addfunction() {
    // 1. 建立一個新的按鈕元素
    var btn = document.createElement("BUTTON");
    
    btn.innerHTML = "CLICK ME (" + count + ")";
    
    btn.setAttribute("id", "btn_" + count);
    
   
    btn.setAttribute("class", "btn btn-outline-danger m-1");
    
    
    document.body.appendChild(btn);
    

    console.log(btn);
    
  
    count++;
}

// 刪除按鈕的函式 
function delfunction() {
    if (count > 1) {
        
        count--; 
      
        var btn = document.getElementById("btn_" + count);
        
    
        if (btn) {
            document.body.removeChild(btn);
            console.log("Deleted: btn_" + count);
        }
    } else {
        console.log("沒有按鈕可以刪除囉！");
    }
}

