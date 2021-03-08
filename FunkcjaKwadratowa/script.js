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

generate.addEventListener("click", generateGraph);

function generateGraph(){
    let a,b,c,p,q,x1,x2,Wx,Wy,_ax2,_bx,_c,_il1,_il2,i = -237.5;
    const wh = 1.5,hwh = wh / 2, graphUnit = 25;
    switch(choice){
        case "ogolna":
            a = document.querySelector("#oA").value;
            b = document.querySelector("#oB").value;
            c = document.querySelector("#oC").value; 

            while(i <= 237.5){
                _ax2 = a * Math.pow((i / graphUnit), 2) * - graphUnit;
                _bx = (b * (i / graphUnit)) * -graphUnit;
                _c = c * -graphUnit;
                Wy = _ax2 + _bx + _c; Wx = i;

                ctx.fillRect(Wx - hwh, Wy - hwh, wh, wh)
                i += graphUnit / 100;
            }
        break;
        case "kanon":
            a = document.querySelector("#kA").value;
            p = document.querySelector("#kP").value;
            q = document.querySelector("#kQ").value; 

            while(i <= 237.5){           
                _il1 = Math.pow(((i / graphUnit) - p),2)
                Wy = (a * _il1 * -graphUnit) + q * -graphUnit; Wx = i;

                ctx.fillRect(Wx - hwh, Wy - hwh, wh, wh)
                i += graphUnit / 100;
            }
        break;
        case "iloczyn":
            a = document.querySelector("#iA").value;
            x1 = document.querySelector("#iX1").value;
            x2 = document.querySelector("#iX2").value;

            while(i <= 237.5){
                _il1 = (i / graphUnit) - x1;
                _il2 = (i / graphUnit) - x2;
                Wy = a * _il1 * _il2 * -graphUnit; Wx = i;

                ctx.fillRect(Wx - hwh, Wy - hwh, wh, wh)
                i += graphUnit / 100;
            }
        break;
    }
}

