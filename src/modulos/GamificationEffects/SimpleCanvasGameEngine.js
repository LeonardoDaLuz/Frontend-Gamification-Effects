import { StartCoroutine } from "../CoroutineUtilities";

class GameObject {
    constructor(img, component, positionX, positionY, width=100, height=100, scaleX=1, scaleY=1, pivotX=0.5, pivotY=0.5) {
        this.img = img;
        this.transform = {
            position: {
                x: positionX,
                y: positionY
            },
            width: width,
            height: height,
            scale: {
                x: scaleX,
                y: scaleY
            },
            pivot: {
                x: pivotX,
                y: pivotY
            }
        }
        this.renderer = {
            opacity: 1
        }

        this.component = component;
        this.component.transform = this.transform;
        this.rigidbody = new Rigidbody();
        this.rigidbody.transform = this.transform;
        this.component.gameObject = this;
        this.component.rigidbody = this.rigidbody;
  
    }

}

export class MonoBehaviour {

    Start() {

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
        this.deceleration = 2;
    }


    Update() {

        if(Number.isNaN(this.velocity.x))
            this.velocity.x=0;
        if(Number.isNaN(this.velocity.y))
            this.velocity.y=0;

        this.transform.position.x += this.velocity.x*window.deltaTime;
        this.transform.position.y += this.velocity.y*window.deltaTime;
        this.velocity.x = this.lerp(this.velocity.x, 0, window.deltaTime*this.deceleration);
        this.velocity.y = this.lerp(this.velocity.y, 0, window.deltaTime*this.deceleration);



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

        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

    }


    Instantiate(img, component, positionX, positionY, width, height, scaleX, scaleY) {

        var gameObject = new GameObject(img, component, positionX, positionY, width, height,scaleX, scaleY);

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
            var transform  =obj.transform;
            var scale = obj.transform.scale;
    
            var offsetX = transform.pivot.x*transform.width*scale.x;
            var offsetY = transform.pivot.y*transform.height*scale.y;
            this.context.drawImage(obj.img, transform.position.x-offsetX, transform.position.y-offsetY, transform.width * transform.scale.x, transform.height * transform.scale.y);
            this.context.globalAlpha = 1;
        }
        this._lastUpdateTime = now;
    }
}





