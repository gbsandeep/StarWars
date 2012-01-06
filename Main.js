/* 
	Load the dependent modules here in order.
*/
require([
	"Library/jquery", 
	"util/GameInfrastructure", 
	"Model/Global",
	"Model/Rectangle", 
	"Model/Meteor", 
	"Model/SpaceshipLaser", 
	"Model/Spaceship", 
	"Model/AlienSpaceshipLaser", 
	"Model/AlienSpaceship", 
	"Model/Scoreboard", 
	"GameEngine"], function() {
    //This function is called when above listed js files are loaded
	$(function(){
		var width = 900, height = window.innerHeight - 140;
		GameEngine.initialize($('#mainCanvas')[0], width, height);
		GameEngine.start();
		
		// Magic numbers are ASCII key values. Associate with GameEngine functions
		var commands = {
			'37': GameEngine.left,
			'38': GameEngine.up,
			'39': GameEngine.right,
			'40': GameEngine.down,
			'32': GameEngine.spacebar
		};
		
		// Invoke matching function
		$(document).keydown(function(event) {
			if(commands[event.which]){
				commands[event.which]();
				}
			// No default action to occur on key press
			return false;
			});
	});
	
	$('#Restart').bind('click',	function (){
		GameEngine.reset();
	});
});
	
