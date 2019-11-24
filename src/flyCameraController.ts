import { attribute, ScriptTypeBase } from './create-script-decorator'

export class FlyCameraController extends ScriptTypeBase
{
    app: pc.Application;
    entity: pc.Entity;
    enabled: boolean;
    isDown: boolean = false;
    horizontal: number = 0;
    mouseDelta: pc.Vec2 = new pc.Vec2();
    pitch: number;
    yaw: number;
    @attribute(4)
    lookSensitivity: number;
    @attribute(4)
    moveSens: number;

    initialize(): void {
        let eurlarRot = this.entity.getEulerAngles();

        this.pitch = eurlarRot.y;
        this.yaw = eurlarRot.x;

        // Use the on() method to attach event handlers.
        // The mouse object supports events on move, button down and
        // up, and scroll wheel.
        this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
        this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
        this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);

        console.trace(this.lookSensitivity);
    }
  
    onMouseMove(e:pc.MouseEvent): void {
  
        if(this.isDown)
        {
            this.mouseDelta = new pc.Vec2(e.dx,e.dy);
        }
    }
  
    onMouseDown(e:pc.MouseEvent): void {
        this.isDown = true;
        //this.app.mouse.enablePointerLock();
    }
  
    onMouseUp(e:pc.MouseEvent): void {
        this.isDown = false;
        //this.app.mouse.disablePointerLock();
    }
  
    postInitialize?(): void {
        
    }
  
    update(deltaTime:number): void 
    {
        let rot = this.entity.getRotation();

        this.pitch -= this.mouseDelta.y * this.lookSensitivity * deltaTime;
        this.yaw -= this.mouseDelta.x * this.lookSensitivity * deltaTime;
        this.entity.setRotation(new pc.Quat().setFromEulerAngles(this.pitch,this.yaw,0))

        let pos = this.entity.getPosition();
        let horizontal = this.app.keyboard.isPressed(pc.KEY_D) ? 1 : this.app.keyboard.isPressed(pc.KEY_A) ? -1 : 0;
        let vertical = this.app.keyboard.isPressed(pc.KEY_S) ? 1 : this.app.keyboard.isPressed(pc.KEY_W) ? -1 : 0;
        let dir = new pc.Vec3(horizontal * deltaTime * this.moveSens,0,vertical * deltaTime * this.moveSens);
        dir = rot.transformVector(dir);
        pos = pos.add(dir);
        this.entity.setPosition(pos);
    }
    
    postUpdate(): void 
    {
        this.mouseDelta = pc.Vec2.ZERO;
    }
  }