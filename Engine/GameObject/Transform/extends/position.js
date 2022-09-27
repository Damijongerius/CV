import { Vector2, Vector3 } from "../../../physics/Vector";

export class position{

    x;
    y;
    z;

    dimensions;

    constructor(vector)
    {
        if(vector != null)
        {
            if(vector instanceof Vector2){
                this.x = vector.x;
                this.y = vector.y;

                this.dimensions = 2;
            }
            if(vector instanceof Vector3){
                this.x = vector.x;
                this.y = vector.y;
                this.z = vector.z;

                  this.dimensions = 3;
            }
        }else{
            console.error("only accepts vectors");
        }
    }
}