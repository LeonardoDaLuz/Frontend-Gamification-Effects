export function InstantiateScoreThatFlowsUp(event, value) {
        var rect = event.target.getBoundingClientRect();
        console.log(rect);
        var div = document.createElement('div');
        div.innerHTML = (value>0?'+':'')+value;
        div.classList.add("scoreThatFlowsUp");
        div.style.left = (rect.x + rect.width / 2) + "px";
        div.style.top = (rect.y + rect.height / 2) + "px";
        document.body.appendChild(div);
    }