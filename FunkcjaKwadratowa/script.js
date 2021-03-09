const 
    canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext('2d'),
    graphUnit = 25;
    
    
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

let a,b,c,p,q,x1,x2,Wx,Wy,_ax2,_bx,_c,_il1,_il2,variab,vID,i = -237.5;
const wh = 1.5,hwh = wh / 2;
const graphColor = document.querySelector("#graphColor");

class Graph{
    generateAxis(){
        let 
            i = -9,
            startUnit = -250;
        const   
            rowNum = document.querySelector(".row"),
            colNum = document.querySelector(".col");

        ctx.translate(-startUnit,-startUnit);
        ctx.moveTo(startUnit,0);ctx.lineTo(-startUnit,0);
        ctx.moveTo(0,startUnit);ctx.lineTo(0,-startUnit);

        while(startUnit < 225){
            startUnit += graphUnit;
            if(startUnit === 0) continue;
            ctx.moveTo(-5,startUnit);ctx.lineTo(5,startUnit);
            ctx.moveTo(startUnit,-5);ctx.lineTo(startUnit,5);
        }
    
        ctx.stroke();

        for(i;i < 10;++i){
            if(i < 0){
                colNum.innerHTML += `<span>${-i}</span>`;
                rowNum.innerHTML += `<span class="minus">${i}</span>`;
            }else if(i === 0){
                colNum.innerHTML += `<span class="zero">&nbsp</span>`;
                rowNum.innerHTML += `<span class="zero">&nbsp</span>`;
            }else{
                colNum.innerHTML += `<span class="minus">${i}</span>`;
                rowNum.innerHTML += `<span>${i}</span>`;;
            }
        }
    }
    
    generateGraph(){
        let licz, mian,
            zm1,zm2,zm3,
            w1,w2,w3;
            
        ctx.fillStyle = graphColor.value;

        function slashHandle(wyr){
            if(!wyr.includes("/")) return wyr;
            [licz, mian] = wyr.split("/");
            return Number(licz / mian);
        }
        function drawing(Wx, Wy){
            if(((Wx % 25) !== 0) && ((Wy %  25) !== 0)){
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
        switch(choice){
            case "ogolna":
                zm1 = setVar('oA');
                zm2 = setVar('oB');
                zm3 = setVar('oC');   
                while(i <= 237.5){
                    w1 = zm1 * Math.pow((i / graphUnit), 2) * -graphUnit;
                    w2 = zm2 * (i / graphUnit) * -graphUnit;
                    w3 = zm3 * -graphUnit;
                    Wy = w1 + w2 + w3;
                    drawing(i,Wy);
                }
            break;
            case "kanon":
                zm1 = setVar('kA');
                zm2 = setVar('kP');
                zm3 = setVar('kQ');
                while(i <= 237.5){      
                    w1 = zm1 * -graphUnit;     
                    w2 = Math.pow(((i / graphUnit) - zm2), 2);
                    w3 = zm3 * -graphUnit;
                    Wy = w1 * w2 + w3;
                    drawing(i,Wy);
                }
            break;
            case "iloczyn":
                zm1 = setVar('iA');
                zm2 = setVar('iX1');
                zm3 = setVar('iX2');
                while(i <= 237.5){
                    w1 = zm1 * -graphUnit;
                    w2 = (i / graphUnit) - zm2;
                    w3 = (i / graphUnit) - zm3;
                    Wy = w1 * w2 * w3;
                    drawing(i,Wy)
                }
            break;
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const generate = document.querySelector("#generate");
    const graph = new Graph();

    graph.generateAxis();

    generate.addEventListener("click", graph.generateGraph);
});

