class Vector2 {

    x;
    y;
    constructor(x, y) {
        this.x = x;
        this.y = y;

        if (x instanceof Number && y instanceof Number) {
            this.x = x;
            this.y = y;
        }
        else {
            console.error("vector2 only accepts numbers");
        }
    }
}
