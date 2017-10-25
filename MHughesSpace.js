var game;
var ship;
var planet;
var missile;

function init() {
    game = new Scene();
    ship = new Ship();
    planet = new Sprite(game, "planet.png", 50, 50);
    missile = new Missile();

    planet.setSpeed(0);
    planet.setPosition(game.width / 2, game.height / 2);

    game.setBG("black");
    game.start();

};

function Ship() {
    tShip = new Sprite(game, "ship.png", 25, 25);
    tShip.setSpeed(3);
    tShip.setBoundAction(CONTINUE);
    tShip.setPosition(400, 200);

    tShip.checkKeys = function () {
        if (keysDown[K_LEFT]) {
            this.changeImgAngleBy(-5);
        }
        if (keysDown[K_RIGHT]) {
            this.changeImgAngleBy(5);
        }
        if (keysDown[K_UP]) {
            this.addVector(this.getImgAngle(), .1);
        }

        if (keysDown[K_SPACE]) {
            missile.fire();
        }
        
    } 
    return tShip;
} 

function Missile() {
    tMissile = new Sprite(game, "missile.png", 30, 20);
    tMissile.hide();

    tMissile.fire = function () {
        
        this.show();
        this.setBoundAction(DIE);
        this.setPosition(ship.x, ship.y);
        this.setAngle(ship.getImgAngle());
        this.setSpeed(15);
    }
    return tMissile;
}

function checkGravity() {
    
    PLANET_MASS = 1000;
    SHIP_MASS = 1;
    dist = ship.distanceTo(planet);
    dir = planet.angleTo(ship);
    force = (PLANET_MASS * SHIP_MASS) / (dist * dist)
    ship.addVector(dir, force);
} 

function update() {
    game.clear();
    ship.checkKeys();
    checkGravity();
    missile.update();
    planet.update();
    ship.update();
}
