const ctx = canvas.getContext('2d');
(function gettingStarted(){
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

const generate = document.querySelector("#generate");

let a,b,p,g,z,x1,x2,Wx,Wy;
let _ax2,_bx,_c;
const wh = 1.5;
let  i = -237.5;

generate.addEventListener("click", generateGraph);

function generateGraph(){
    if(choice === "ogolna"){
        a = document.querySelector("#oA").value;
        b = document.querySelector("#oB").value;
        c = document.querySelector("#oC").value; 
        
        while(i <= 237.5){
            _ax2 = a * Math.pow((i / 25),2) * -25;
            _bx = (b * (i / 25)) * -25;
            _c = c * -25;
            Wy = _ax2 + _bx + _c; Wx = i;
            ctx.fillRect(Wx -.75, Wy - .75, wh, wh)
            i += .25;
        }
    }else if(choice === "kanon"){
        a = document.querySelector("#kA").value;
        p = document.querySelector("#kP").value;
        q = document.querySelector("#kQ").value; 
        
        while(i <= 237.5){
            Wx = i;
            Wy = (a * Math.pow(((i / 25) - p),2) * -25)+ q * -25
            ctx.fillRect(Wx -.75, Wy - .75, wh, wh)
            i += .2;
        }
    }else if(choice === "iloczyn"){
        a = document.querySelector("#iA").value;
        x1 = document.querySelector("#iX1").value;
        x2 = document.querySelector("#iX2").value; 

        while(i <= 237.5){
            Wx = i;
            Wy = a * ((i / 25) - x1) * ((i / 25) - x2) * -25;
            ctx.fillRect(Wx -.75, Wy - .75, wh, wh)
            i += .2;
        }
    }else{
        alert("Something gone wrong!");
    }

}

