/* Singleton object that returns necessary plumbing functions */
var GameInfrastructure = function(){
	var Images = [];
	return {
	bind: function(object, method ){
			return(
				 function(){
				 return( method.apply( object, arguments ) );
				 }
			);
		},
	imageType: {
			Meteor: 'Images/meteor.gif',
			Explosion: 'Images/explosion.gif',
			Spaceship: 'Images/Spaceship.png',
			AlienSpaceship: 'Images/AlienSpaceship.png',
			SpaceshipLaser: 'Images/SpaceshipLaser.png',
			AlienSpaceshipLaser: 'Images/AlienSpaceshipLaser.png',
			Blank: ''
	},
	Status: {
		Running: 'Running',
		Lost: 'Lost',
		Won: 'Won',
		Resetting: 'Resetting'
	},
	loadImages: function(){
		for(var propertyName in this.imageType) {
			if(this.imageType.hasOwnProperty(propertyName)){
				Images.push(new ImageObject(this.imageType[propertyName]));
			}
		}
	},
	addImage: function(rect){
		var matchingImage;
		$.each(Images, function(index, item){
			if(item.Path === rect.Image){
				matchingImage = item.Image;
			}
		});
		if(matchingImage){
			Global.context.drawImage(matchingImage, rect.X, rect.Y);	
		}
	}
	}
}();


/* 
	Image object representing preloaded images
*/
function ImageObject(path){
	this.Path = path;
	var newImage = new Image();
	newImage.src = path;
	this.Image = newImage;
}

