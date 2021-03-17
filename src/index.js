import { InstantiateScoreThatFlowsUp } from './modulos/GamificationEffects/scoreThatFlowsUp';

import { puff } from './modulos/GamificationEffects/puff';

import { SimpleCanvasGameEngine, MonoBehaviour } from './modulos/GamificationEffects/SimpleCanvasGameEngine';

import { StartCoroutine } from './modulos/CoroutineUtilities';

window.startEngine = function () {
    var engine = new SimpleCanvasGameEngine("puffCanvas", 60);

    var img2 = new Image();
    img2.src = 'http://localhost:8080/imgs/cloud.png';
    //  context.drawImage(img2, 100, 100, 100, 100);

    engine.Instantiate(img2, 100, 100, 100, 100, new Nuvem());
}



class Nuvem {
    Start() {
        console.log("Opa fui instanciado");
        console.log(this.rigidbody);
        this.rigidbody.velocity.x = 5;
        this.transform.scale.x=0;
        function* test() {            
            var time = 0;       

            while (time < 1) {
                time+=0.016;
                this.transform.scale.x=Mathf.lerp(0, 100, time);
                this.transform.scale.y=Mathf.lerp(0, 100, time);
                console.log('Hello!' + time);
               yield time;
            }
        }

        StartCoroutine(test.bind(this));

    }

    Update() {
        //   this.rigidbody.velocity.y=-10;  
    }


}


