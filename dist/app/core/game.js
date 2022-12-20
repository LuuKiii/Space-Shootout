import { Player } from "../models/player/player.js";
import { Canvas } from "../ui/canvas.js";
export class GameGlobalObject {
    constructor() {
        const canvas = Canvas.getInstance();
        this.core = {
            player: [new Player(canvas.WIDTH / 2, canvas.HEIGHT / 2)],
            enemies: [],
            misc: [],
        };
    }
    updateAndDrawAllObjects() {
        for (const property in this.core) {
            this.core[property].forEach(element => {
                element.update();
                element.draw();
            });
        }
    }
    static getInstance() {
        if (!GameGlobalObject.instance) {
            GameGlobalObject.instance = new GameGlobalObject();
        }
        return GameGlobalObject.instance;
    }
}
//# sourceMappingURL=game.js.map