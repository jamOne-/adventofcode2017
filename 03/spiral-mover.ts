enum Direction {
    RIGHT,
    UP,
    LEFT,
    DOWN,
}

export class SpiralMover {
    private currentDirection = Direction.RIGHT;
    private steps = 1;
    private remainingSteps = 1;

    constructor(private x = 0, private y = 0) { }
    
    move() {
        if (this.remainingSteps === 0) {
            this.currentDirection = (this.currentDirection + 1) % 4;

            if (this.currentDirection === Direction.LEFT || this.currentDirection === Direction.RIGHT) {
                this.steps += 1;
            }

            this.remainingSteps = this.steps;
        }

        switch (this.currentDirection) {
        case Direction.RIGHT:
            this.x += 1;
            break;

        case Direction.UP: 
            this.y += 1;
            break;
            
        case Direction.LEFT: 
            this.x -= 1;
            break;


        case Direction.DOWN:
            this.y -= 1;
            break;
        }

        this.remainingSteps -= 1;
        return this.getPosition();
    }

    getPosition(): [number, number] {
        return [this.x, this.y];
    }
}
