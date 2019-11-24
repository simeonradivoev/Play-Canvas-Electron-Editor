export function attribute<T extends any>(defaultValue:T) : any
{
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){
        console.log(propertyKey);
        if(!target.constructor.prototype.typeAttributes){
            target.constructor.prototype.typeAttributes = new Object();
        }
        target.constructor.prototype.typeAttributes[propertyKey] = {
            type: defaultValue.constructor.name,
            default: defaultValue
        };
    }
}

/**
 * Class decorator allowing the use of ES6 classes  
 * to define and create PlayCanvas script types. 
 * @param {pc.Application} [app]
 */
export const createScript = function(app?: pc.Application) {
    return function (obj: any) {
        
        const instance = new obj();
        const script:any = pc.createScript(instance.constructor.name, app);
        const attributes = [];
    
        // Add public attributes accessible in the editor
        if (obj.prototype.typeAttributes) {
            for (let attr in obj.prototype.typeAttributes) {
                attributes.push(attr)
                script.attributes.add(attr, obj.prototype.typeAttributes[attr])
                console.log(attr);
            }
        }

        // Add intance properties and methods to prototype
        for (let prop in instance) {
            if (prop === 'attributes' || prop === 'name' || attributes.includes(prop)) {
                // do nothing
            } else {
                script.prototype[prop] = instance[prop];
            }
        }
    
        // Add static properties
        for (let prop in obj) {
            script[prop] = obj[prop];
        }
    }
}


/**
 * Base class to be extended when defining  
 * ScriptType classes
 * @export
 * @class ScriptTypeBase
 */
export class ScriptTypeBase {
    /**
     * The pc.Application that the instance of this type belongs to.
     * @type {pc.Application}
     * @memberof ScriptType
     */
    app: pc.Application;

    /**
     * 	The pc.Entity that the instance of this type belongs to.
     * @type {pc.Entity}
     * @memberof ScriptType
     */
    entity: pc.Entity;

    /**
     * True if the instance of this type is in running state.
     * @type {boolean}
     * @memberof ScriptType
     */
    enabled: boolean;

    static attributes: pc.ScriptAttributes;
}