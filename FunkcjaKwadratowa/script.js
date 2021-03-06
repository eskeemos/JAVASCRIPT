(function gettingStarted(){
    const canvas = document.querySelector('#canvas');
    const ctx = canvas.getContext('2d');
    ctx.translate(250,250);
    
    ctx.strokeStyle = "#000";
    ctx.moveTo(-250,0);ctx.lineTo(250,0);
    ctx.moveTo(0,-250);ctx.lineTo(0,250);
    
    let step = 25;
    let start = -250;
    let grille = 250;
    
    while(start < 225){
        start += step;
        if(start === 0) continue;
        ctx.moveTo(-5,start);ctx.lineTo(5,start);
        ctx.moveTo(start,-5);ctx.lineTo(start,5);
    }
    
    ctx.stroke();
    
    const rowNum = document.querySelector(".row");
    const colNum = document.querySelector(".col");
    
    for(let i = 9;i > 0;i--){
        colNum.innerHTML += `<span>${i}</span>`;
        rowNum.innerHTML += `<span class="minus">${i}</span>`;
    }
    for(let i = 0;i < 10;i++){
        if(i !== 0){
            colNum.innerHTML += `<span class="minus">${i}</span>`;
            rowNum.innerHTML += `<span>${i}</span>`;
        }else{
            colNum.innerHTML += `<span class="zero">&nbsp</span>`;
            rowNum.innerHTML += `<span class="zero">&nbsp</span>`;
        }
    }  
})();


let selectChoice = document.querySelector("#selectChoice");
let choice = selectChoice.value;
let suitable;
let h2_n = [...document.querySelectorAll("h2")];

selectChoice.addEventListener("change", () => {
    h2_n.forEach((item) => item.style.display = "none");
    choice = selectChoice.value;
    suitable = h2_n.find((item) => {
        return item.classList.contains(choice);
    })
    suitable.style.display = "block";
})

let a,b,p,g,x1,x2;