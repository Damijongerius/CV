import { Collider } from "./Collider";
import { Vector2 } from "../physics/Vector2"
import { Transform } from "./transform/Transform"
import { Sprite } from "../sprites/Sprite";


export class Object{

    ID;
    name;
    collider;
    transform;
    Sprite;

    children;
    parent;

    Destroy(){
        //safe destroy object
    }

    setChild(){

    }

    setParent(){

    }

    removeChild(){

    }

    removeParent(){
        
    }

}