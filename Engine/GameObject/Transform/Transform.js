import { Rotation } from "./extends/rotation";
import { position } from "./extends/position";

export class Transform{

    rotation;
    position;

    constructor(rotation,position){

        if(rotation instanceof Rotation){
            if(rotation != null){
                this.rotation = rotation;
            }
        }
        if(position instanceof position){
            if(position != null){
                this.position = position;
            }
        }
    }
}