/* Models for the game */
/* Represents generic rectangle model with image source if any */
// Constructor Class
function Rectangle(x, y, width, height, image, dx, dy, time){
	this.X = x;
	this.Y = y;
	this.Width = width;
	this.Height = height;
	this.Image = image;
	this.dx = dx;
	this.dy = dy;
	var interval;
	var health;
	if(!isNaN(time)){
		interval = setInterval(GameInfrastructure.bind(this, this.move), time);
	}
}

Rectangle.prototype.clearInterval = function(){
	if(this.interval){
		window.clearInterval(this.interval);
	}
}

Rectangle.prototype.move = function(){
	if(!isNaN(this.dx)){ this.X += this.dx; }
	if(!isNaN(this.dy)){ this.Y += this.dy; }
}

/* Position setter */
Rectangle.prototype.updatePosition = function(x, y){
	if(x){
		this.X = x;
	}
	if(y){
		this.Y = y;
	}
}

/* Size setter */
Rectangle.prototype.updateSize = function(width, height){
	if(!isNaN(width)){
		this.Width = width;
	}
	if(!isNaN(height)){
		this.Height = height;
	}
}
/* Setter for image */
Rectangle.prototype.setImage = function(image){
	if(image !== this.Image){
	this.Image = image;
	}
}

/* Setter for health */
Rectangle.prototype.setHealth = function(healthValue){
	if(healthValue && !isNaN(healthValue)){
	this.health = healthValue;
	}
}

/* Getter for health */
Rectangle.prototype.getHealth = function(){
	return this.health;
}

Rectangle.prototype.onHit = function(){
	if(this.health){
		this.health--;
		// Update the score with hit bounty if any
		if(!isNaN(this.hitBounty)){
			Global.setScore(Global.Score() + this.hitBounty);
		}
		if(this.health === 0){
			this.Image = GameInfrastructure.imageType.Explosion;
			this.updateSize(0, 0);
			setTimeout(GameInfrastructure.bind(this, function(){
				this.setImage(GameInfrastructure.imageType.Blank);
			}), 250);
			if(!isNaN(this.bounty)){
				Global.setScore(Global.Score() + this.bounty);
			}
		}
		this.updatePosition(this.X - 3, this.Y);
	}
}

/* Checks if the rectangle in the parameter ('rect') overlaps with 'this' rectangle object */
Rectangle.prototype.hasOverlap = function(rect){
	var returnValue = false;
	if(rect && rect.Width > 0 && rect.Height > 0){
	returnValue =	((rect.X >= this.X && rect.X < (this.X + this.Width)) && 
		(
			(rect.Y >= this.Y && rect.Y < (this.Y + this.Height)) ||
			( (rect.Y + rect.Height) >= this.Y && (rect.Y + rect.Height) < (this.Y + this.Height) )
		)) ||
		(( (rect.X + rect.Width) >= this.X && (rect.X + rect.Width) < (this.X + this.Width)) && 
		(
			(rect.Y >= this.Y && rect.Y < (this.Y + this.Height)) ||
			( (rect.Y + rect.Height) >= this.Y && (rect.Y + rect.Height) < (this.Y + this.Height) )
		));
	}
	
	return returnValue;
}

Rectangle.prototype.redraw = function(){
	GameInfrastructure.addImage(this);
}

Rectangle.prototype.clear = function(){
	this.updateSize(0, 0);
	this.updatePosition(-1000, -1000);
	this.setImage(GameInfrastructure.imageType.Blank);
}

Rectangle.prototype.hasHit = function(object){
	return false;
}
