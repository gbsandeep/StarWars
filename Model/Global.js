/* Singleton Object holding all the global values */
var Global = function(){
	var score, lifelines;
	return {
		Score: function(){
			return this.score;
		},
		Lifelines: function(){
			return this.lifelines;
		},
		reset: function(){
			this.score = 0;
			this.lifelines = 3;
		},
		setScore: function(newScore){
			this.score = newScore;
		},
		setLifelines: function(newLifeline){
			this.lifelines = newLifeline;
		},
		// Global objects representing canvas and context(2d) objects 
		canvas: '', 
		context: ''
	}
}();
