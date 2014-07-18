var GameEngine = function(){
	var objects = [];
	var interval, meteorInterval, alienInterval;
	var width, height;
	var spaceship;
	// meteor movement
	var dx = -5, dy = 0;
	var dSpaceship = 10, adjSpaceshipPosition = 20;
	var gameStatus;
	function redraw(){
				// Clear older shapes
				clear();
				if(spaceship){
					spaceship.redraw();
				}
				// Redraw all the objects
				$.each(objects, function(index, item){
					if(item && gameStatus !== GameInfrastructure.Status.Resetting){
						var numberOfHits = 0;
						// User spaceship was hit by meteor/alienspaceship/laser
						if(spaceship && spaceship.hasOverlap(item)){ numberOfHits = 5;}
						else if(item.hasHit(spaceship)){ numberOfHits = 1; }
						
						if(numberOfHits > 0){
							spaceship.onHit(numberOfHits);
						}
						
						if(spaceship.getHealth() <= 0){
							spaceship.setImage(GameInfrastructure.imageType.Explosion);
							spaceship.updatePosition(spaceship.X - 40, spaceship.Y - 60);
							spaceship.redraw();
							gameStatus = GameInfrastructure.Status.Resetting;
							Global.setLifelines(Global.Lifelines() - 1);
							if(Global.Lifelines() <= 0){
								setTimeout(function(){
									gameStatus = GameInfrastructure.Status.Lost;
									Scoreboard.displayFinalScore();
									GameEngine.stop(); 
								}, 200);
							}
							else{
								setTimeout(function(){
									newLife();  
									gameStatus = GameInfrastructure.Status.Running;
								}, 200);
							}
						}
						
						if(spaceship && spaceship.hasHit(item)){
							item.onHit();
						}
						
						item.redraw();
						if(item.X + item.Width < 0){
							delete(objects[index]);
						}
					}
				});
				Scoreboard.redraw();
		}
	
	function clear(){
			Global.context.clearRect(0, 0, Global.canvas.width, Global.canvas.height);
		}
	
	/* Function to add the meteros periodically */
	function addMeteor(){
			var newHeight = Math.floor(Math.random() * Global.canvas.height);
			var newMeteor = new Meteor(width, newHeight, 20, 20, GameInfrastructure.imageType.Meteor, -5, 0, 100);
			objects.push(newMeteor);
		}

	/* Function to add alien spaceships periodically */
	function addAlienSpaceship(){
			var newHeight = Math.floor(Math.random() * Global.canvas.height);
			var newAlienSpaceship = new AlienSpaceship(width, newHeight, 45, 30, GameInfrastructure.imageType.AlienSpaceship, -5, 0, 75);
			objects.push(newAlienSpaceship);
		}

	function addSpaceship(){
			spaceship = new Spaceship(10, Global.canvas.height/2, 45, 30, GameInfrastructure.imageType.Spaceship);
		}	
		
	function addListeners(){
		addSpaceship();
		
		//Add new meteor every 3 seconds
		meteorInterval = setInterval(addMeteor, 2000);
		
		//Add new alien space ship every 10 seconds
		alienInterval = setInterval(addAlienSpaceship, 5000);
		interval = setInterval(redraw, 100);
	}		

	function removeListeners(){
		window.clearInterval(meteorInterval);
		window.clearInterval(alienInterval);
		window.clearInterval(interval);
	}
	
	function newLife(){
		clear();
		removeListeners();
		objects = [];
		addListeners();
	}
	
	return{
			/* Perform basic setup and start the game */
			initialize: function(c, w, h){
			GameInfrastructure.loadImages();
			Global.canvas = c;
			Global.canvas.width = w;
			Global.canvas.height = h;
			Global.context = Global.canvas.getContext('2d');
			width = w;
			height = h;
		},
	
		/* Perform basic setup and start the game */
			start: function(){
				this.reset();
		},
			stop: function stop(){
				removeListeners();
		},

		
			up: function(){
				if((spaceship.Y + 40) > spaceship.Height){
					spaceship.Y -= dSpaceship;
				}
		},
		
			down: function(){
				if((spaceship.Y + spaceship.Height) < Global.canvas.height){
					spaceship.Y += dSpaceship;
				}
		},
		
			left: function(){
				if((spaceship.X + 20) > spaceship.Width){
					spaceship.X -= dSpaceship;
			}
		},
		
			right: function(){
				if(( spaceship.X + spaceship.Width + 100) < Global.canvas.width){
					spaceship.X += dSpaceship;
			}
		},
			move: function(x, y){
				spaceship.X = x;
				spaceship.Y = y;
		},
		//Emit laser from the spaceship
		spacebar: function(){
			if(spaceship){
					spaceship.fireLaser();
				}
			},
		reset: function(){
			Global.reset();
			newLife();
		}
	}
}();
