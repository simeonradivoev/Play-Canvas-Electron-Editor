/*let canvas = document.getElementById("application-canvas");
let app = new pc.Application(canvas,{});
app.start();

window.onresize = function(ev:UIEvent){
    app.resizeCanvas()
};

app.mouse = new pc.Mouse(canvas);
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);
app.resizeCanvas()

let camera = new pc.Entity();
camera.addComponent("camera",{
    clearColor: new pc.Color(0.8,0.8,0.8)
});

@createScript()
class FlyCameraController extends ScriptTypeBase{
    initialize?(): void {
        console.log(app);
        // Use the on() method to attach event handlers.
        // The mouse object supports events on move, button down and
        // up, and scroll wheel.
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    }

    onMouseMove(e:pc.MouseEvent): void {

        if(this.isDown)
        {
            let pos = this.entity.getPosition();
            this.entity.setPosition(pos.add(new pc.Vec3(-e.dx * 0.005,e.dy * 0.005,0)));
        }
    }

    onMouseDown(e:pc.MouseEvent): void {
        this.isDown = true;
    }

    onMouseUp(e:pc.MouseEvent): void {
        this.isDown = false;
    }

    postInitialize?(): void {
        
    }

    update?(): void {
        
    }
    
    postUpdate?(): void {
        
    }

    app: pc.Application;
    entity: pc.Entity;
    enabled: boolean;
    name = 'flyCameraController';
    isDown: boolean = false;
}

console.log(app);

camera.addComponent('script',{});
camera.script.create('flyCameraController', {
    enabled: true
});

app.root.addChild(camera);
camera.setPosition(0,0,7);

let box = new pc.Entity();
box.addComponent("model",{type: "box"});
app.root.addChild(box);
box.rotate(10,15,0);

let light = new pc.Entity();
light.addComponent('light',{});
app.root.addChild(light);
light.rotate(45,0,0);

app.scene.ambientLight = new pc.Color(0.2,0.2,0.2);

let timer = 0;
app.on("update",function(deltaTime:number){
    timer += deltaTime;
    box.rotate(deltaTime*10,deltaTime*20,deltaTime*30);
})*/