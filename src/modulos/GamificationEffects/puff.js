import { SimpleCanvasGameEngine, MonoBehaviour } from './SimpleCanvasGameEngine';
import { StartCoroutine } from '../CoroutineUtilities';
import './puff.css';
import cloud from './imgs/cloud.png';


function puff() {



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
CreateFullCanvas();
function CreateFullCanvas() {
    console.log('foi');
    var canvas = document.createElement("canvas");
    canvas.id = "puffCanvas2";
    canvas.classList.add('puffCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
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

