import * as behavior from "./Engine/behavior/DefaultBehavior.js";

class Test extends behavior.DefaultBehavior{
    Update(){
        console.log("a");
    }
}

let test = new Test();