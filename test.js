import * as behavior from "./Engine/behavior/DefaultBehavior.js";

class Test{
    Update(){
        console.log(update);
    }
}

let test = new Test();
behavior.Main(test);