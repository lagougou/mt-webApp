(function(){
	var itemTmpl = '<div class="left-item">' +
						'<div class="item-text">$getItemContent</div>' +
					'</div>'
	var $ele = $('.left-bar-inner');
	/*
	获取数据
	param
	*/				
	function getList(){
		$.get("../js/json/food.json", function(data){
			window.food_spu_tags = data.data.food_spu_tags || [];
			window.ShopBar.changeShippingPrice(data.data.poi_info.shipping_fee || 0);
			initContentList(window.food_spu_tags);

		})
	}

	/*
		渲染数据内容
	*/
	function getItemContent(data){
		var str = '';
		if(data.icon){
			return '<img class="item-icon" src=' + data.icon + ' />' + data.name; 
		}
		return data.name;
	}

	//**/
	function initContentList(list){
		list.forEach(function(item, index){
			var str = itemTmpl.replace("$getItemContent", getItemContent(item));
			var $target = $(str);
			$target.data('itemData', item);
			$ele.append($target);
			
		})
		$($ele.find(".left-item").first()).click();
	} 

/*触发鼠标事件
*/
	function addEvent(){
		$ele.on('click', ".left-item", function(e){
			$(this).addClass('active').siblings().removeClass('active');
			var data = $(this).data('itemData');
			// console.log(window.Right);
			window.Right.refresh(data);
			// var $target = $(e.currentTarget);

   //          $target.addClass('active');
   //          $target.siblings().removeClass('active');

   //          // 将数据传给右侧详情列表进行渲染
   //          window.Right.refresh($target.data('itemData'));
		})
	}

	function init(){
		
		getList();
		addEvent();
	}

	init();
})();