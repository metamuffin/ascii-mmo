import { CharSprite } from "./CharSprite.js";
import { Entity } from "./Entity.js";
import { Vector2 } from "./shared/Vector2.js";
import { keyboard, renderer } from "./Client.js";
export class Player extends Entity {
    constructor() {
        super();
        this.sprite = new CharSprite(new Vector2(0, 0), 'P');
    }

    update() {
        if (this.world.playerId == this.id){
            this.handleMovement();
            renderer.cameraPosition = this.position.sub(
                new Vector2(
                    Math.floor(renderer.width/2),
                    Math.floor(renderer.height/2)
                )
            );
        }
    }

    private handleMovement() {
        if (keyboard.isKeyDown("d") || keyboard.isKeyDown("D")) {
            this.position.x += 1;
            this.sendNewPosition();
        }

        if (keyboard.isKeyDown("a") || keyboard.isKeyDown("A")) {
            this.position.x -= 1;
            this.sendNewPosition();
        }

        if (keyboard.isKeyDown("s") || keyboard.isKeyDown("S")) {
            this.position.y += 1;
            this.sendNewPosition();
        }

        if (keyboard.isKeyDown("w") || keyboard.isKeyDown("W")) {
            this.position.y -= 1;
            this.sendNewPosition();
        }
    }
}
