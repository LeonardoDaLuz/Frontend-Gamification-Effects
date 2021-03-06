import './scoreThatFlowsUp.css';

window.InstantiateScoreThatFlowsUp = InstantiateScoreThatFlowsUp;

export function InstantiateScoreThatFlowsUp(event, value) {
        var rect = event.target.getBoundingClientRect();
        var div = document.createElement('div');
        div.innerHTML = (value>0?'+':'')+value;
        div.classList.add("scoreThatFlowsUp");
        div.style.left = (rect.x + rect.width / 2) + "px";
        div.style.top = (rect.y + rect.height / 2) + "px";
        document.body.appendChild(div);

        setTimeout(() => {
            div.remove();
        }, 5000);
}

//Just import in you project, and use directly on javascript or in your element ex <button onclick='InstantiateScoreThatFlowsUp(event, 150)'>Click Here</button>