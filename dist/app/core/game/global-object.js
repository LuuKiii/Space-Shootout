import { DroneShip } from "../../models/enemies/drone-ship.js";
import { Player } from "../../models/player/player.js";
import { Helper } from "../../utils/helper.js";
export class GameGlobalObject {
    constructor() {
        this.testCounter = 1;
        this._core = {
            player: {},
            playerWeaponry: {},
            enemies: {},
            enemyWeaponry: {},
            misc: {},
        };
        this._coreProperties = {
            player: {
                size: 0
            },
            playerWeaponry: {
                size: 0
            },
            enemies: {
                size: 0
            },
            enemyWeaponry: {
                size: 0
            },
            misc: {
                size: 0
            },
            size: 0
        };
        this.createPlayer();
    }
    //TODO Instead of this aproach change in core object player object type to enforce it to have at most one property 
    createPlayer() {
        if (Object.keys(this._core.player).length > 0)
            throw new Error("Player Already exists");
        const player = Player.getInstance();
        this.addEntity('player', player);
    }
    getPlayer() {
        return this._core.player[Object.keys(this._core.player)[0]];
    }
    removeEntityFrom(from, id) {
        this._coreProperties[from].size--;
        this._coreProperties.size--;
        delete this._core[from][id];
    }
    addEntity(coreKey, entity) {
        const generatedID = Helper.generateID();
        entity.id = generatedID;
        this._core[coreKey][generatedID] = entity;
        this._coreProperties[coreKey].size++;
        this._coreProperties.size++;
    }
    updateAndDrawAllEntities() {
        for (const coreProp in this._core) {
            const coreObj = this._core[coreProp];
            for (const entityId in coreObj) {
                const entity = coreObj[entityId];
                entity.update();
                entity.draw();
                if (entity.isToBeRemoved) {
                    this.removeEntityFrom(coreProp, entity.id);
                }
            }
        }
    }
    static getEntitiesByCorePropertyName(corePropName) {
        if (!GameGlobalObject.instance)
            return [];
        const corePropertiesToGet = [];
        const returnArr = [];
        for (const coreProp in GameGlobalObject.instance._core) {
            if (corePropName && !corePropName.includes(coreProp)) {
                continue;
            }
            corePropertiesToGet.push(coreProp);
        }
        for (const coreProp of corePropertiesToGet) {
            const coreObj = GameGlobalObject.instance._core[coreProp];
            for (const entityId in coreObj) {
                const entity = coreObj[entityId];
                returnArr.push(entity);
            }
        }
        return returnArr;
    }
    spawner() {
        if (this.testCounter <= 0)
            return;
        this.testCounter--;
        while (this.enemySize < 5) {
            this.createRandomBasicEnemy();
        }
    }
    createRandomBasicEnemy() {
        // const point = Helper.getCoordinatesOutOfBounds(50, Side.Up);
        const point = { x: 100, y: 100 };
        const enemy = new DroneShip(point);
        this.addEntity("enemies", enemy);
    }
    get coreSize() {
        return this._coreProperties.size;
    }
    get enemySize() {
        return this._coreProperties.enemies.size;
    }
    static getInstance() {
        if (!GameGlobalObject.instance) {
            GameGlobalObject.instance = new GameGlobalObject();
        }
        return GameGlobalObject.instance;
    }
}
//# sourceMappingURL=global-object.js.map