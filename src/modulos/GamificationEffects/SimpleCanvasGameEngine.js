class GameObject {
    constructor(img, positionX, positionY, width, height, component) {
        this.img = img;
        this.transform = {
            position: {
                x: positionX,
                y: positionY
            },
            scale: {
                y: height,
                x: width
            }
        }
        this.renderer = {
            opacity: 1
        }
        this.component = component;
        this.component._transform = this.transform;
        this.rigidbody = new Rigidbody();
        this.rigidbody.transform = this.transform;
        this.component.rigidbody = this.rigidbody;
        console.log(this.component);
    }

}

export class MonoBehaviour {

    Start() {
        console.log("Opa fui instanciado");
    }

    Update() {

    }
}

class Rigidbody {

    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }
        this.deceleration = 0.5;
    }


    Update() {
        // console.log(window.deltaTime);
        this.transform.position.x += this.velocity.x;
        this.transform.position.y += this.velocity.y;
        this.velocity.x = this.lerp(this.velocity.x, 0, 0.1);
        this.velocity.y = this.lerp(this.velocity.y, 0, 0.1);



        //   this.transform.position.y+=this._velocity.y;
    }

    lerp(start, end, amt) {
        var value = (1 - amt) * start + amt * end;
        if (Number.isNaN(value)) {
            value = 0;
        }
        return value;
    }
}

export class SimpleCanvasGameEngine {


    constructor(canvasElementName, framerate = 60) {
        console.log('Criando Canvas:' + canvasElementName);
        this.canvas = document.getElementById(canvasElementName);
        this.context = this.canvas.getContext("2d");
        this.gameObjects = [];
        this.GameObject = GameObject;
        this.targetFrameTime = 1000 / framerate;
        window.deltaTime = 0.016;
        this._lastUpdateTime = Date.now();
        this.coroutine = null;
        setInterval(this.updateAllGameObjects.bind(this), this.targetFrameTime)
        // this.updateAllGameObjects();

    }


    Instantiate(img, positionX, positionY, width, height, component) {

        var gameObject = new GameObject(img, positionX, positionY, width, height, component);

        this.gameObjects.push(gameObject);

        if (gameObject.component != null)
            gameObject.component.Start();

        return gameObject;
    }


    updateAllGameObjects() {
        var now = Date.now();
        window.deltaTime = (now - this._lastUpdateTime) / 1000;
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        var gameObjects = this.gameObjects;
        for (var i = 0; i < gameObjects.length; i++) {
            var obj = gameObjects[i];
            if (obj.component != null)
                obj.component.Update();

            if (obj.coroutine != null)
                obj.coroutine();

            obj.rigidbody.Update();
            this.context.globalAlpha = obj.renderer.opacity;
            this.context.drawImage(obj.img, obj.transform.position.x, obj.transform.position.y, obj.transform.scale.x, obj.transform.scale.y);
            this.context.globalAlpha = 1;
        }
        this._lastUpdateTime = now;
    }
}






