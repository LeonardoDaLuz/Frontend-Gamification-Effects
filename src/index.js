import { InstantiateScoreThatFlowsUp } from './modulos/GamificationEffects/scoreThatFlowsUp';
import { puff } from './modulos/GamificationEffects/puff';
import { SimpleCanvasGameEngine, MonoBehaviour } from './modulos/GamificationEffects/SimpleCanvasGameEngine';
import { StartCoroutine } from './modulos/CoroutineUtilities';

window.startEngine = function () {
    var engine = new SimpleCanvasGameEngine("puffCanvas", 30);

    var img2 = new Image();
    img2.src = 'http://localhost:8080/imgs/cloud.png';
    //  context.drawImage(img2, 100, 100, 100, 100);

    for (var i = 0; i < 10; i++) {
        var size = Mathf.RandomRange(50, 100);
        engine.Instantiate(img2, new NuvemParticle(),
            200 + Mathf.RandomRange(100, 150),
            200 + Mathf.RandomRange(100, 150),
            size,
            size
        );
    }
}


class NuvemParticle {
    Start() {
        this.rigidbody.velocity.x = Mathf.RandomRange(-200,200);

        function* test() {

            var speed = Mathf.RandomRange(0.016, 0.032) * 3;
            this.speedY = -Mathf.RandomRange(100, 200);

            var time = 0;
            while (time < 1) {
                time += speed;
                this.transform.scale.x = Mathf.lerp(0, 1, time);
                this.transform.scale.y = Mathf.lerp(0, 1, time);
                yield time;
            }
            time = 0;
            while (time < 1) {
                time += speed*0.1;
                var opacity = Mathf.lerp(1, 0, time);
                this.transform.scale.x = Mathf.lerp(1, 0, time);
                this.transform.scale.y = Mathf.lerp(1, 0, time);
                this.gameObject.renderer.opacity = opacity;

                yield time;
            }
            this.gameObject.renderer.opacity = 0;

        }

        StartCoroutine(test.bind(this));

    }

    Update() {
        this.rigidbody.velocity.y = this.speedY;
    }


}


