const 
    canvas    = document.querySelector("#canvas");
    ctx       = canvas.getContext("2d"),
    patterns  = [...document.querySelectorAll(".patterns h4")],
    p         = document.querySelector("#pattern"),
    colors    = [...document.querySelectorAll("[class=color]")],
    customInp = document.querySelector("input[type=color]");
let 
    choice,color;


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
}

class FormHandling{
    constructor(){
        this.lastP = document.querySelector(".selected");
        this.lastC = document.querySelector(".chosed");
        this.ogolna = `f<sub>(x)</sub> = <input type="text" placeholder="a">x<sup>2</sup> + <input type="text" placeholder="b">x + <input type="text" placeholder="c">`;
        this.kanoniczna = `f<sub>(x)</sub> = <input type="text" placeholder="a">(x - <input type="text" placeholder="p">)<sup>2</sup> + <input type="text" placeholder="q">`;
        this.iloczynowa = `f<sub>(x)</sub> = <input type="text" placeholder="a">(x - <input type="text" placeholder="x1">)(x - <input type="text" placeholder="x2">)<sup></sup>`;
    }
    formComponentHandle(){
        this.patternC();
        this.colorC();
    }
    patternC(){
        patterns.forEach((item) => item.addEventListener("click", () => {
            this.lastP.classList.remove("selected");
            item.classList.add("selected");
            this.lastP = item;
            choice = item.id;
            this.patternE(choice);
        }))
    }
    patternE(choice){
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
    colorC(){
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

window.addEventListener("DOMContentLoaded", () => {
    const graph = new GraphAppearance();
    graph.graphComponentHandle();

    const form = new FormHandling();
    form.formComponentHandle();
})