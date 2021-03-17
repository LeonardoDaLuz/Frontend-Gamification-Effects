import { SimpleCanvasGameEngine, MonoBehaviour } from './SimpleCanvasGameEngine';
import { StartCoroutine } from '../CoroutineUtilities';
import './puff.css';
import cloud from './imgs/cloud.png';

window.puff = puff;

function puff(event, numberOfParticles=20) {

    var rect = event.target.getBoundingClientRect()
    var minPosX = rect.x;
    var minPosY = rect.y+10;
    var maxPosX = rect.x + rect.width;
    var maxPosY = rect.y + rect.height + 20;
    var img2 = new Image();
    img2.src = 'http://localhost:8080/imgs/cloud.png';

    for (var i = 0; i < numberOfParticles*0.5; i++) {
        var size = Mathf.RandomRange(50, 100);
        SimpleCanvasGameEngine.Instantiate(img2, new NuvemParticle(),
            Mathf.RandomRange(minPosX, maxPosX),
            Mathf.RandomRange(minPosY, maxPosY),
            size,
            size
        );
    }
    var size = Mathf.RandomRange(50, 100);
    SimpleCanvasGameEngine.Instantiate(img2, new NuvemParticle(),
        minPosX,
        maxPosY,
        size,
        size
    );
    size = Mathf.RandomRange(50, 100);
    SimpleCanvasGameEngine.Instantiate(img2, new NuvemParticle(),
        maxPosX,
        maxPosY,
        size,
        size
    );
    size = Mathf.RandomRange(50, 100);
    SimpleCanvasGameEngine.Instantiate(img2, new NuvemParticle(),
        (maxPosX + minPosX) * 0.5,
        maxPosY,
        size,
        size
    );
    setTimeout(() => event.target.style="opacity: 0;   pointer-events: none;", 200);
    for (var i = 0; i < numberOfParticles*0.5; i++) {
        var size = Mathf.RandomRange(50, 100);
        setTimeout(function() {
            SimpleCanvasGameEngine.Instantiate(img2, new NuvemParticle(),
            Mathf.RandomRange(minPosX, maxPosX),
            Mathf.RandomRange(minPosY, maxPosY),
            size,
            size
        );
        }, Mathf.RandomRange(0,200));
    }
}


class NuvemParticle {
    Start() {
        this.rigidbody.velocity.x = Mathf.RandomRange(-200, 200);

        function* test() {

            var speed = Mathf.RandomRange(0.016, 0.032) * 6;
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
                time += speed * 0.2;
             
                this.transform.scale.x = Mathf.lerp(1, 0.5, time);
                this.transform.scale.y = Mathf.lerp(1, 0.5, time);


                yield time;
            }
            time = 0;
            while (time < 1) {
                time += speed * 0.2;
                var opacity = Mathf.lerp(1, 0, time);
                this.transform.scale.x = Mathf.lerp(0.5, 0, time);
                this.transform.scale.y = Mathf.lerp(0.5, 0, time);
                this.gameObject.renderer.opacity = opacity;

                yield time;
            }
            this.gameObject.renderer.opacity = 0;
            this.destroy(this.gameObject);

        }

        StartCoroutine(test.bind(this));

    }

    Update() {
        this.rigidbody.velocity.y = this.speedY;
    }


}

//puff();