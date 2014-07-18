/*
	Command Queue. Singleton object
	 - Enqueue
	 - Dequeue
*/
	var Command = function(cmd, event){
		this.Cmd = cmd;
		this.Event = event;
	};

	var CmdQueue = (function () {
		var queue = [], length = 100;
		return {
			Enqueue: function(cmd){
				if(queue.length < length){
					queue.push(cmd);
				}
			},
			Dequeue: function(){
				if(queue.length > 0){
					return queue.shift();
				}
			},
			Clear: function(){
				queue = [];
			},
		};
})();
	