import{ createScript } from './create-script-decorator'
import{ FlyCameraController } from './flyCameraController'

let viewport = document.getElementById("viewport");
let canvas = document.getElementById("application-canvas");
let app = new pc.Application(canvas,{});
app.start();

var meter = new FPSMeter(viewport,{graph:true});

window.onresize = function(ev:UIEvent){
    console.log(viewport.clientWidth)
    app.setCanvasResolution(pc.RESOLUTION_FIXED,viewport.clientWidth,viewport.clientHeight);
    app.resizeCanvas()
};

app.mouse = new pc.Mouse(viewport);
app.keyboard = new pc.Keyboard(viewport,{ preventDefault: true, stopPropagation: true});

app.setCanvasFillMode(pc.FILLMODE_NONE);
app.setCanvasResolution(pc.RESOLUTION_FIXED,viewport.clientWidth,viewport.clientHeight);
app.resizeCanvas();

let camera = new pc.Entity();
camera.addComponent("camera",{
    clearColor: new pc.Color(0.8,0.8,0.8),
    fov: 60
});

createScript(app)(FlyCameraController);
camera.addComponent('script',{});
camera.script.create(FlyCameraController.name, {
    enabled: true,
    attributes: {
        lookSensitivity: 10
    }
});

app.root.addChild(camera);
camera.setPosition(0,0,7);

let box = new pc.Entity();
box.addComponent("model",{type: "box"});
app.root.addChild(box);
box.rotate(10,15,0);

let plane = new pc.Entity();
plane.addComponent("model",{type: "box"});
plane.setLocalScale(10,0.1,10);
app.root.addChild(plane);

let light = new pc.Entity();
light.addComponent('light',{});
app.root.addChild(light);
light.rotate(45,0,0);

app.scene.ambientLight = new pc.Color(0.2,0.2,0.2);

let timer = 0;
app.on("update",function(deltaTime:number){
    meter.tick();
    timer += deltaTime;
    box.rotate(deltaTime*10,deltaTime*20,deltaTime*30);
})