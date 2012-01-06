
function SpaceshipLaser(x, y){
	this.base = Rectangle;
	this.base(x, y, 30, 15, GameInfrastructure.imageType.SpaceshipLaser, 10, 0, 50);
}

SpaceshipLaser.prototype = new Rectangle;