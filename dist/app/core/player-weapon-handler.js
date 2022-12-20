import { SingleFire } from "../models/interactions/single-fire.js";
import { CanvasEvents } from "../ui/canvas.js";
import { Helper } from "../utils/helper.js";
import { GameGlobalObject } from "./game-global-object.js";
export class PlayerWeaponHandler {
    constructor() {
        this.core = GameGlobalObject.getInstance().core;
        this.player = this.core.player[0];
        this.canvasEvents = CanvasEvents.getInstance();
        this.canvasEvents.register(this);
    }
    fire() {
        const angle = Helper.calculateAngle(this.player, this.canvasEvents.mouse);
        const { dx, dy } = Helper.calculateVelocity(angle, 0);
        const newProjectile = new SingleFire(this.player.x, this.player.y, dx, dy);
        this.core.projectiles.push(newProjectile);
    }
    updateFromSubject() {
        const mouse = this.canvasEvents.mouse.button;
        if (mouse.LPM) {
            this.fire();
        }
    }
    static getInstance() {
        if (!PlayerWeaponHandler.instance) {
            PlayerWeaponHandler.instance = new PlayerWeaponHandler();
        }
        return PlayerWeaponHandler.instance;
    }
}
//# sourceMappingURL=player-weapon-handler.js.map