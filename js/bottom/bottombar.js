(function() {
    var bottom = $(".bottom-bar");
    bottom.items = bottom.find(".item-link");
    var storage = {
        index: 0,
        order: 1,
        my: 2
    };

    // var page = wind
    var pathname = window.location.pathname,
        start = pathname.lastIndexOf('/') + 1,
        end = pathname.lastIndexOf('.'),
        page = pathname.slice(start, end);
    // console.log(page);

    function initContent() {

    	// bottom.on('click', '.item-link', function(){
    	// 	var url= $(this).attr('href');
    	// 	if(url.indexOf(page) > 0){
    	// 		console.log(url);
    	// 		return;
    	// 	}
    	// })

        var index = storage[page];
        $(bottom.items[index]).addClass('item-link-active');
        // bottom.curIndex = index;

    }

    function init() {
        // $(bottom.items[bottom.curIndex]).addClass('item-link-active');
        initContent();
    }

    init();
})();