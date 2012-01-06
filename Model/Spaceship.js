function Spaceship(x, y, width, height, image, dx, dy, time){
	this.base = Rectangle;
	this.base(x, y, width, height, image, dx, dy, time);
	this.setHealth(5);
	this.Lasers = [];
}

Spaceship.prototype = new Rectangle;

Spaceship.prototype.fireLaser = function(){
		var newLaser = new SpaceshipLaser(this.X + this.Width, this.Y + (this.Height/2));
		this.Lasers.push(newLaser);
}

Spaceship.prototype.redraw = function(){
	GameInfrastructure.addImage(this);
	var lasers = this.Lasers;
	$.each(lasers, function(index, item){
		if(item){
			if(item.X + item.Width > Global.canvas.width){
			 delete(lasers[index]);
			}
			item.redraw();
		}
	});
}

Spaceship.prototype.hasHit = function(object){
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

Spaceship.prototype.onHit = function(numberOfHits){
	if(!isNaN(this.health)){
		this.health -= numberOfHits;
	}
}