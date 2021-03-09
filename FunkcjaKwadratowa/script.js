const 
    canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d'), 
    graphUnit = 25;
    
(function gettingstartUnited(){

    let startUnit = 250;

    ctx.translate(startUnit,startUnit);
    ctx.moveTo(-startUnit,0);ctx.lineTo(startUnit,0);
    ctx.moveTo(0,-startUnit);ctx.lineTo(0,startUnit);
    
    ctx.strokeStyle = "black";
    ctx.stroke();

    while(startUnit < 225){
        startUnit += graphUnit;
        if(startUnit === 0) continue;
        ctx.moveTo(-5,startUnit);ctx.lineTo(5,startUnit);
        ctx.moveTo(startUnit,-5);ctx.lineTo(startUnit,5);
    }
    
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

let a,b,c,p,q,x1,x2,Wx,Wy,_ax2,_bx,_c,_il1,_il2,variab,vID,i = -237.5;
const wh = 1.5,hwh = wh / 2;
const graphColor = document.querySelector("#graphColor");

function generateGraph(){
    function slashHandle(wyr){
        if(!wyr.includes("/")) return wyr;
        [licz, mian] = wyr.split("/");
        return Number(licz / mian);
    }
    function drawing(Wx, Wy){
        if(((Wx %  25) !== 0) && ((Wy %  25) !== 0)){
            setTimeout(fill, 800);
            function fill(){
                ctx.fillRect(Wx - hwh, Wy - hwh, wh, wh);
            }
        }else{
            ctx.fillRect(Wx - 2, Wy - 2, 4, 4); 
        }
        i += graphUnit / 100;
    }
    function setVar(vID){
        return slashHandle(document.querySelector(`#${vID}`).value);
    }
    function getDataGraph(){

    }

    ctx.fillStyle = graphColor.value;

    switch(choice){
        case "ogolna":
            a = setVar('oA');b = setVar('oB');c = setVar('oC'); 

            while(i <= 237.5){
                _ax2 = a * Math.pow((i / graphUnit), 2) * -graphUnit;
                _bx = (b * (i / graphUnit)) * -graphUnit;
                _c = c * -graphUnit;
                Wy = _ax2 + _bx + _c; Wx = i;
                drawing(Wx,Wy);
            }
        break;
        case "kanon":
            a = setVar('kA');p = setVar('kP');q = setVar('kQ');

            while(i <= 237.5){           
                _il1 = Math.pow(((i / graphUnit) - p),2)
                Wy = (a * _il1 * -graphUnit) + q * -graphUnit; Wx = i;
                drawing(Wx,Wy);
            }
        break;
        case "iloczyn":
            a = setVar('iA');x1 = setVar('iX1');x2 = setVar('iX2');

            while(i <= 237.5){
                _il1 = (i / graphUnit) - x1;
                _il2 = (i / graphUnit) - x2;
                Wy = a * _il1 * _il2 * -graphUnit; Wx = i;
                drawing(Wx,Wy);
            }
        break;
    }
    getDataGraph();
}

