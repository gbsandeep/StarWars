function AlienSpaceship(x, y, width, height, image, dx, dy, time){
	this.base = Rectangle;
	this.base(x, y, width, height, image, dx, dy, time);
	this.setHealth(5);
	this.Lasers = [];
	this.bounty = 1000;
	this.hitBounty = 200;
	
	function fireLaser(){
		var newLaser = new AlienSpaceshipLaser(this.X, this.Y + (this.Height/2));
		this.Lasers.push(newLaser);
	}
	var laserInterval = setInterval(GameInfrastructure.bind(this, fireLaser), 3000);
}

AlienSpaceship.prototype = new Rectangle;

AlienSpaceship.prototype.redraw = function(){
	GameInfrastructure.addImage(this);
	$.each(this.Lasers, function(index, item){
		if(item){
			item.redraw();
		}
	});
}

AlienSpaceship.prototype.hasHit = function(object){
	var isHit = false;
	var lasers = this.Lasers;
	$.each(lasers, function(index, item){
		if(item && item.hasOverlap(object)){
			isHit = true;
			item.clear();
			delete(lasers[index]);
		}
	});
	return isHit;
}
