const 
    patterns  = [...document.querySelectorAll(".patterns h4")],
    p         = document.querySelector("#pattern"),
    colors    = [...document.querySelectorAll("[class=color]")],
    customInp = document.querySelector("input[type=color]"),
    generate  = document.querySelector("#generate"),
    reset     = document.querySelector("#reset"),
    graphC    = document.querySelector(".graph");
let 
    canvas    = document.querySelector("#canvas"),
    ctx       = canvas.getContext("2d"),
    choice = "o",
    color = "black";


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
            colNum = document.querySelector("#col"),
            rowNum = document.querySelector("#row");

        for(let i = -9;i < 10;++i){
            if(i === -1){
                rowNum.innerHTML += `<span>&nbsp;</span>`;
                colNum.innerHTML += `<span class="min">${-i}</span>`;
            }else if(i < 0){
                colNum.innerHTML += `<span class="min">${-i}</span>`;
                rowNum.innerHTML += `<span>${-i}</span>`;
            }else if(i === -1){
                colNum.innerHTML += `<span>${i}</span>`;
                rowNum.innerHTML += `<span class="min">${i}</span>`;
            }else if(i > 0){
                colNum.innerHTML += `<span>${i}</span>`;
                rowNum.innerHTML += `<span class="min">${i}</span>`;
            }
        }
    }
    resetAppearance(){
        graphC.innerHTML = `<canvas id="canvas" width="500" height="500"></canvas><div class="num" id="row"></div><div class="num" id="col"></div><div class="x" class="x">x</div><div class="y" class="y">y</div><svg id="Trow" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 22h-24l12-20z"/></svg><svg id="Tcol" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 22h-24l12-20z"/></svg>`;
        canvas    = document.querySelector("#canvas"),
        ctx       = canvas.getContext("2d"),
        this.graphComponentHandle();
    }
}

class FormHandling{
    constructor(){
        this.lastP = document.querySelector(".selected");
        this.lastC = document.querySelector(".chosed");
        this.ogolna = ` f<sub>(x)</sub> = <input type="text" placeholder="a" id="oA">x<sup>2</sup> + <input type="text" placeholder="b" id="oB">x + <input type="text" placeholder="c" id="oC">`;
        this.kanoniczna = `f<sub>(x)</sub> = <input type="text" placeholder="a" id="kA">(x - <input type="text" placeholder="p" id="kP">)<sup>2</sup> + <input type="text" placeholder="q" id="kQ">`;
        this.iloczynowa = `f<sub>(x)</sub> = <input type="text" placeholder="a" id="iA">(x - <input type="text" placeholder="x1" id="iX1">)(x - <input type="text" placeholder="x2" id="iX2">)<sup></sup>`;
    }
    formComponentHandle(){
        this.patternChoose();
        this.colorChoose();
    }
    patternChoose(){
        patterns.forEach((item) => item.addEventListener("click", () => {
            this.lastP.classList.remove("selected");
            item.classList.add("selected");
            this.lastP = item;
            choice = item.id;
            this.patternEquation(choice);
        }))
    }
    patternEquation(choice){
        switch(choice){
            case "o":
                p.innerHTML = this.ogolna;break;
            case "k":
                p.innerHTML = this.kanoniczna;
                break;
            case "i":
                p.innerHTML = this.iloczynowa;
                break;
        }
    }
    colorChoose(){
        colors.forEach((item) => item.addEventListener("click", () => {
            this.lastC.classList.remove("chosed");
            item.classList.add("chosed");
            this.lastC = item;
            color = item.id;
        }))
        customInp.addEventListener("change", () => {
            color = customInp.value;
            document.querySelector("#customC").style.backgroundColor = color;
        })
    }

}

class GraphDrawing{
    generateGraph(){
        const unit = 25;
        let zm1, zm2, zm3, w1, w2, w3, Wy,
            i = -237.5;
        
        ctx.fillStyle = color;

        switch(choice){
            case "o":
                zm1 = this.setVar('oA');this.resetVar('oA');
                zm2 = this.setVar('oB');this.resetVar('oB');
                zm3 = this.setVar('oC');this.resetVar('oC');
                while(i <= 237.5){
                    w1 = zm1 * Math.pow((i / unit), 2) * -unit;
                    w2 = zm2 * (i / unit) * -unit;
                    w3 = zm3 * -unit;
                    Wy = w1 + w2 + w3;
                    this.drawing(i,Wy); i += .25;
                }
            break;
            case "k":
                zm1 = this.setVar('kA');this.resetVar('kA');
                zm2 = this.setVar('kP');this.resetVar('kP');
                zm3 = this.setVar('kQ');this.resetVar('kQ');
                while(i <= 237.5){      
                    w1 = zm1 * -unit;     
                    w2 = Math.pow(((i / unit) - zm2), 2);
                    w3 = zm3 * -unit;
                    Wy = w1 * w2 + w3;
                    this.drawing(i,Wy); i += .25;
                }
            break;
            case "i":
                zm1 = this.setVar('iA');this.resetVar('iA');
                zm2 = this.setVar('iX1');this.resetVar('iX1');
                zm3 = this.setVar('iX2');this.resetVar('iX2');
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
    resetVar(vID){
        document.querySelector(`#${vID}`).value = "";
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
            setTimeout(fill, 900);
            function fill(){
                ctx.fillRect(i - hwh, Wy - hwh, wh, wh);
            }
        }else{
            ctx.beginPath();
            ctx.arc(i, Wy, 3, 0, 2 * Math.PI);
            ctx.fill();
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const graphAP = new GraphAppearance();
    graphAP.graphComponentHandle();

    const form = new FormHandling();
    form.formComponentHandle();

    const graphDW = new GraphDrawing();
    generate.addEventListener("click", () => {
        graphDW.generateGraph();
    })
    reset.addEventListener("click", () => {
        graphAP.resetAppearance();
    })
})