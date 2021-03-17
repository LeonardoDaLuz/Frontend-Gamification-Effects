var simpleCanvasGameEngine = null;
var simpleCanvasGameEngineUpdate = null;

export class SimpleCanvasGameEngine {

    
    constructor(framerate = 30, canvasElementName="") {
        console.log('Iniciando Simple Canvas ENgine:' + canvasElementName);

        if(canvasElementName == "") {
            this.canvas = this.CreateFullCanvas();
        } else {
            this.canvas = document.getElementById(canvasElementName);
        }

        this.context = this.canvas.getContext("2d");
        this.gameObjects = [];
        this.GameObject = GameObject;
        this.targetFrameTime = 1000 / framerate;
       // this.targetFrameTime =this.targetFrameTime.toFixed();
        console.log(this.targetFrameTime);
        window.deltaTime = 0.0306;
        this._lastUpdateTime = Date.now();
        this.coroutine = null;
        simpleCanvasGameEngineUpdate = setInterval(this.updateAllGameObjects.bind(this), this.targetFrameTime)
        // this.updateAllGameObjects();

        this.context.webkitImageSmoothingEnabled = false;
        this.context.mozImageSmoothingEnabled = false;
        this.context.msImageSmoothingEnabled = false;
        this.context.imageSmoothingEnabled = false;

    }

    CreateFullCanvas() {
        console.log('CreateFullCanvas ');
        var canvas = document.createElement("canvas");
        canvas.id = "puffCanvas2";
        canvas.classList.add('puffCanvas');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        document.body.appendChild(canvas);

        return canvas;
    }

    static Instantiate(img, component, positionX, positionY, width=100, height=100, scaleX=1, scaleY=1) {
        if(simpleCanvasGameEngine == null){
            simpleCanvasGameEngine = new SimpleCanvasGameEngine(60);
        }
        return simpleCanvasGameEngine.Instantiate(img, component, positionX, positionY, width, height, scaleX, scaleY);
    }

    static KillInstance(){
        clearInterval(simpleCanvasGameEngineUpdate);
        //simpleCanvasGameEngine=null;
    }
    
    Instantiate(img, component, positionX, positionY, width, height, scaleX, scaleY) {

        var gameObject = new GameObject(img, component, positionX, positionY, width, height, scaleX=1, scaleY=1);
        gameObject.component.destroy = this.destroyGameObject.bind(this);
        this.gameObjects.push(gameObject);

        if (gameObject.component != null)
            gameObject.component.Start();

        return gameObject;
    }

    destroyGameObject(object) {
        for(var i=0; i<this.gameObjects.length; i++){
            if(this.gameObjects[i] == object){
                delete this.gameObjects[i];
                this.gameObject = this.gameObjects.splice(i,1);                
                return;
            }
        }
    }

    updateAllGameObjects() {
        var now = Date.now();
        window.deltaTime = (now - this._lastUpdateTime) / 1000;
        var gameObjects = this.gameObjects;

        if(gameObjects.length>0){
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        } else {
            return;
        }


        for (var i = 0; i < gameObjects.length; i++) {
            var obj = gameObjects[i];

            
            obj.rigidbody.Update();

            if (obj.component != null)
                obj.component.Update();

            if (obj.coroutine != null)
                obj.coroutine();

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

        var velocity = this.velocity;

        if(Number.isNaN(velocity.x)|| velocity.x === undefined)
            this.velocity.x=0;
        if(Number.isNaN(this.velocity.y)|| velocity.y === undefined)
            this.velocity.y=0;

        this.transform.position.x += velocity.x*window.deltaTime;
        this.transform.position.y += velocity.y*window.deltaTime;
        velocity.x = this.lerp(velocity.x, 0, window.deltaTime*this.deceleration);
        velocity.y = this.lerp(velocity.y, 0, window.deltaTime*this.deceleration);
    }

    lerp(start, end, amt) {
        var value = (1 - amt) * start + amt * end;
        if (Number.isNaN(value)) {
            value = 0;
        }
        return value;
    }
}




