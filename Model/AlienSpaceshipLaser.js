function AlienSpaceshipLaser(x, y){
	this.base = Rectangle;
	this.base(x, y, 30, 15, GameInfrastructure.imageType.AlienSpaceshipLaser, -10, 0, 75);
}

AlienSpaceshipLaser.prototype = new Rectangle;
