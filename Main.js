/* 
	Load the dependent modules here in order.
*/
require([
	"CmdQueue",
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
	"GameEngine"], function () {
	
    //This function is called when above listed js files are loaded
	$(function(){
		var Height = 140;
		var width = 900, height = window.innerHeight - Height;
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
		var executeCommand = function(){
			var command = CmdQueue.Dequeue();
			if(command !== undefined && command !== null){
				command.Cmd(command.Event);
			}
		};
		
		var processCmd = setInterval(executeCommand, 10);
		
		// Invoke matching function
		$(document).keydown(function(event) {
			if(commands[event.which]){
				CmdQueue.Enqueue(new Command(commands[event.which], event));
				}
			// No default action to occur on key press
			return false;
			});
			
		$(document).mousemove(function(event){
			GameEngine.move(event.clientX, event.clientY -Height);
		});
		
		$(document).mouseup(function(event){
			GameEngine.spacebar();
		});
	});
	
	$('#Restart').bind('click',	function (){
		CmdQueue.Clear();
		GameEngine.reset();
	});
});
	
