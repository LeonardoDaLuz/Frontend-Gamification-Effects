import { InstantiateScoreThatFlowsUp } from './modulos/GamificationEffects/scoreThatFlowsUp';

import { puff } from './modulos/GamificationEffects/puff';

import { SimpleCanvasGameEngine, MonoBehaviour} from './modulos/GamificationEffects/SimpleCanvasGameEngine';


window.startEngine = function () {
    var engine = new SimpleCanvasGameEngine("puffCanvas",60);

    var img2 = new Image();
    img2.src = 'http://localhost:8080/imgs/cloud.png';
    //  context.drawImage(img2, 100, 100, 100, 100);

    engine.Instantiate(img2, 100, 100, 100, 100, new Nuvem());
}



class Nuvem {
    Start() {   
        console.log("Opa fui instanciado");
        console.log(this.rigidbody);
        this.rigidbody.velocity.x=5;
    }

    Update() {  
       this.rigidbody.velocity.y=-10;  
    }
}


function* test() {
    console.log('Hello!');
    yield* contador(2);
    console.log('First I got: ' + x);
    var y = yield;
    console.log('Then I got: ' + y);
}

class espera {
    constructor(){
        return typeof(yield);
    }
}

function* contador(tempo) {
    var expireTime = Date.now() + tempo*1000;
    while(Date.now()<expireTime){
        yield;
    }

}
var tester = test();
tester.next();
tester.next();