(function() {
    var itemTmpl = '<div class="menu-item">' +
				        '<img class="menu-img" src=$pic />' +
				        '<div class="menu-item-right">' +
					        '<p class="item-title">$name</p>' +
					        '<p class="item-desc">$description</p>' +
					        '<p class="item-zan">$parise_content</p>' +
					        '<p class="item-price">￥$min_price<span class="unit"> /$unit</span></p>' +
				        '</div>' +
				        '<div class="select-content">' +

					        '<div class="minus">-</div>' +
					        '<div class="count">$chooseCount</div>' +
    						'<div class="plus">+</div>' +
    					'</div>' +
    				'</div>';



    // function initContent(){
    // 	var items = $(".left-item");
    // 	console.log($(".left-item"));
    // 	for(var i =0, len = items.length; i < len; i++){
    // 		console.log(items[i]);
    // 	}
    // }
    var $ele = $('.right-list-inner');

    function initRightList(list) {
        $ele.html('');
        list.forEach(function(item, index) {
            var img = new Image();
            img.src = item.picture;

            img.onload = function() {
                 var str = itemTmpl.replace("$pic", item.picture)
                    .replace("$name", item.name)
                    .replace("$description", item.description)
                    .replace("$parise_content", item.praise_content)
                    .replace("$min_price", item.min_price)
                    .replace("$unit", item.unit)
                    .replace("$chooseCount", item.chooseCount || 0);
                $target = $(str);
                $target.data('itemData', item)
                $ele.append($target);
            }
            
        });
 		$ele.trigger('renderImg');

    }

    function addclick(){
    	console.log($(".menu-item"));
    	$ele.off("click").on('click', '.plus', function(e){
    		// event.preventDefault();
    		var obj = $(this).parent().parent().data('itemData');
    		if (obj.chooseCount === undefined){
    			obj.chooseCount = 1;
    		}else{
    			obj.chooseCount +=1;
    		}

    		
    		$(this).parent().find(".count").text(obj.chooseCount);
    		window.ShopBar.renderItems();
    	}).on('click', '.minus', function(e){
    		event.preventDefault();
    		var obj = $(this).parent().parent().data('itemData');
    		if (obj.chooseCount > 0 ){
    			obj.chooseCount -= 1;
    		}else{
    			return;
    		}

    		$(this).parent().find(".count").text(obj.chooseCount);
    		// console.log(obj);
    		window.ShopBar.renderItems();
    		return false;
    	});


    }


    function initRightTitle(str) {
        $('.right-title').text(str)
    }


    function init(data) {
        initRightList(data.spus || []);
        initRightTitle(data.name);

      	// $ele.on('renderImg', function(event){
      	// 	console.log(event.type);
      	// })
        
        addclick();
 
    }

    // init();
    window.Right = {
        refresh: init
    }

})();