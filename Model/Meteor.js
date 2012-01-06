function Meteor(x, y, width, height, image, dx, dy, time){
	this.base = Rectangle;
	this.base(x, y, width, height, image, dx, dy, time);
	this.setHealth(3);
	this.bounty = 500;
	this.hitBounty = 150;
}

Meteor.prototype = new Rectangle;