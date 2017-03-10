board = (function(){

    var _teamJson;

    function renderHeader() {
        var boardDiv = $('<div>').attr('id', 'board').addClass('container').appendTo('body');
        boardDiv[0].innerHTML = '<div class="row">' +
                            '<div class="col-xs-2">Story</div>' +
                            '<div class="col-xs-4">Not started</div>' +
                            '<div class="col-xs-2">In Progress</div>' +
                            '<div class="col-xs-2">To Be Verified</div>' +
                            '<div class="col-xs-2">Done</div>' +
                        '</div>';
    }

    function renderStories() {
    	var storyList = getListOfStoryJson();
    	for(var i = 0; i < storyList.length; i++) {
    		var story = story.initialize(storyList[i]);
    	}

    }

    function getListOfStoryJson() {
    	return [];
    }

    return {
        render: function(teamjson) {
        	_teamJson = teamjson;
            renderHeader();
        	renderStories();
        },

        testFunctionality: function() {
            renderHeader();
            story().initialize();
            task().initialize({statusCode: 2}, $('.story'));
        }
    }

})();