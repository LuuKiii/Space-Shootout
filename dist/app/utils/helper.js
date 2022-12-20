export class Helper {
    constructor() { }
    static calculateRotateAngle(objA, objB) {
        return Math.atan2(objB.x - objA.x, -(objB.y - objA.y));
    }
    static calculateAngle(objA, objB) {
        return Math.atan2(objB.y - objA.y, objB.x - objA.x);
    }
    static calculateVelocity(angle, speed) {
        return {
            dx: Math.cos(angle),
            dy: Math.sin(angle),
        };
    }
}
//# sourceMappingURL=helper.js.map