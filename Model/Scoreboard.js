var Scoreboard = function(){
	var posX = 50, posY = 15, dY = 15, dX = 45;
	return {
		redraw: function(){
			Global.context.font = "12pt Calibri";
			Global.context.textAlign = "right";
			Global.context.fillStyle = "orange";
			Global.context.fillText('Score: ', posX, posY);
			Global.context.fillText(Global.Score(), posX + dX, posY);
			
			Global.context.fillText('Life: ', posX, posY + dY);
			Global.context.fillText(Global.Lifelines(), posX + dX, posY + dY);
		},
		displayFinalScore: function(){
			Global.context.font = "24pt Calibri";
			Global.context.textAlign = "center";
			Global.context.fillStyle = "white";
			Global.context.fillText('You Scored: ' + Global.Score() + '. Try again.', Global.canvas.width/2, Global.canvas.height/2);
		}
	}
}();
