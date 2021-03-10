const 
    canvas = document.querySelector("#canvas"),
    ctx = canvas.getContext("2d"),
    generate = document.querySelector("#generate");
    choice = document.querySelector("#selectChoice");
    options = [...document.querySelectorAll("h2")];

class GraphAppearance{
    graphComponentHandle(){
        ctx.translate(250,250);

        this.generateAxis();
        this.generateDashes();
        this.generateUnits();
    }
    generateAxis(){
        ctx.moveTo(-250,0);ctx.lineTo(250,0);
        ctx.moveTo(0,-250);ctx.lineTo(0,250);
        ctx.stroke();
    }
    generateDashes(){
        for(let fdash = -225;fdash < 250;fdash += 25){
            if(fdash === 0) continue;
            ctx.moveTo(-5,fdash);ctx.lineTo(5,fdash);
            ctx.moveTo(fdash,-5);ctx.lineTo(fdash,5);         
        } 
        ctx.stroke();
    }
    generateUnits(){
        const 
            rowNum = document.querySelector(".row"),
            colNum = document.querySelector(".col");

        for(let i = -9;i < 10;++i){
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
}
class Graph{
    constructor(){
        this.color = document.querySelector("#graphColor").value;
        this.choice = document.querySelector("#selectChoice").value;
    }
    generateGraph(){
        const unit = 25;
        let zm1, zm2, zm3, w1, w2, w3, Wy,
            i = -237.5;
        
        ctx.fillStyle = this.color;

        switch(this.choice){
            case "ogolna":
                zm1 = this.setVar('oA');
                zm2 = this.setVar('oB');
                zm3 = this.setVar('oC');   
                while(i <= 237.5){
                    w1 = zm1 * Math.pow((i / unit), 2) * -unit;
                    w2 = zm2 * (i / unit) * -unit;
                    w3 = zm3 * -unit;
                    Wy = w1 + w2 + w3;
                    this.drawing(i,Wy); i += .25;
                }
            break;
            case "kanon":
                zm1 = this.setVar('kA');
                zm2 = this.setVar('kP');
                zm3 = this.setVar('kQ');
                while(i <= 237.5){      
                    w1 = zm1 * -unit;     
                    w2 = Math.pow(((i / unit) - zm2), 2);
                    w3 = zm3 * -unit;
                    Wy = w1 * w2 + w3;
                    this.drawing(i,Wy); i += .25;
                }
            break;
            case "iloczyn":
                zm1 = this.setVar('iA');
                zm2 = this.setVar('iX1');
                zm3 = this.setVar('iX2');
                while(i <= 237.5){
                    w1 = zm1 * -unit;
                    w2 = (i / unit) - zm2;
                    w3 = (i / unit) - zm3;
                    Wy = w1 * w2 * w3;
                    this.drawing(i,Wy); i += .25;
                }
            break;
        }
    }
    setVar(vID){
        return this.slashHandle(document.querySelector(`#${vID}`).value);
    }
    slashHandle(wyr){
        let licz, mian;

        if(!wyr.includes("/")) return wyr;
        [licz, mian] = wyr.split("/");
        return Number(licz / mian);
    }
    drawing(i, Wy){
        const 
            wh = 1.5,
            hwh = wh / 2;
    
        if(((i % 25) !== 0) || ((Wy %  25) !== 0)){
            setTimeout(fill, 800);
            function fill(){
                ctx.fillRect(i - hwh, Wy - hwh, wh, wh);
            }
        }else{
            ctx.fillRect(i - 2, Wy - 2, 4, 4); 
        }
    }
}
class FormHandling{
    pattern(){
        options.forEach((item) => {
            item.style.display = "none";
            const choiceV = choice.value;
            const suitable = options.find((item) => {
                return item.classList.contains(choiceV);
            })
            suitable.style.display = "block";
        })
    }
}
let tab = [];
window,addEventListener("DOMContentLoaded", () => {
    const graphAp = new GraphAppearance();
    graphAp.graphComponentHandle();

    const formHd = new FormHandling();
    choice.addEventListener("change", () => {
        formHd.pattern();    
    })

    generate.addEventListener("click", () => {
        const graph = new Graph();
        tab.push(graph);
        console.table(tab);
        graph.generateGraph();
    })
})
