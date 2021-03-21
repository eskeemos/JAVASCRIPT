const 
    canvas  = document.querySelector("#canvas");
    ctx     = canvas.getContext("2d"),
    choices = [...document.querySelectorAll("[id^=choice]")],
    colors  = [...document.querySelectorAll("[class^=col]")];
    custom  = document.querySelector("#custom"),
    p       = document.querySelector("param");  
let 
    last;

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
                rowNum.innerHTML += `<span  class="min">${i}</span>`;
            }
        }
    }
}

class FormHandling{
    ComponentHandle(){
        this.choiceHandle(colors,"chosed");
        this.choiceHandle(choices,"selected");
        this.customBgHandle();
    }
    choiceHandle(tab,classN){
        tab.forEach((item) => item.addEventListener("click", () => {
            if(last !== undefined) last.classList.remove(classN);
            item.classList.add(classN);
            last = item;
        }))
    }
    customBgHandle(){
        custom.addEventListener("change", () => {
            document.querySelector(".col9").style.backgroundColor = custom.value;
        })
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const graphAP = new GraphAppearance();
    graphAP.graphComponentHandle();

    const formHd = new FormHandling();
    formHd.ComponentHandle();
})