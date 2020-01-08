(function(){

	// 顶部
	var itemTopTmpl =  '<div class="choose-content d-none">' +
						   '<div class="content-top">' +
						   		'<div class="clear-car">清空购物车</div>' +
						   	'</div>' +
						'</div>';   

		//

	var itemBottomTmpl = '<div class="bottom-content">' +
							'<div class="shop-icon">' + 
								'<div class="dot-num d-none"></div>' +
							'</div>' +
							'<div class="price-content">'+
                                '<p class="total-price">¥<span class="total-price-span">0</span></p>'+
                                '<p class="other-price">另需配送&nbsp;¥<span class="shipping-fee">0</span></p>'+
                            '</div>'+
                            '<div class="submit-btn">去结算</div>' +
						  '</div>';

	var $strTop = $(itemTopTmpl);
	var $strBottom = $(itemBottomTmpl);



	function changeNum(str){
		if(str ==0 ){
			$(".bottom-content").find('.dot-num').hide();
		}else{
			$(".bottom-content").find('.dot-num').show().text(str);
		}
		
	}

	 function addclick(){
	 	$strBottom.on('click', '.shop-icon', function(){
	 		$(".mask").toggle();
			$strTop.toggle();
	 	});

    	$strTop.on('click', '.plus', function(e){
    		// event.preventDefault();
    		console.log("ok");
    		var obj = $(this).parent().parent().data('itemData');
    		if (obj.chooseCount === undefined){
    			obj.chooseCount = 1;
    		}else{
    			obj.chooseCount +=1;
    		}

    		
    		$(this).parent().find(".count").text(obj.chooseCount);
    		renderItems();
    		$(".left-item.active").click();
    	}).on('click', '.minus', function(e){
    		var obj = $(this).parents().find(".choose-item").data('itemData');
    		if (obj.chooseCount > 0 ){
    			obj.chooseCount -= 1;
    		}else{
    			return;
    		}

    		$(this).parent().find(".count").text(obj.chooseCount);
    		renderItems();
    		$(".left-item.active").click();
    		return false;
    	});


    }

	function changeTotalPrice(str){
		$(".bottom-content").find('.total-price-span').text(str)
	}

	function changeShippingPrice(str){
		$(".bottom-content").find(".shipping-fee").text(str);
	}

	function renderItems(){

		// 渲染前清空
		$(".choose-content").find(".choose-item").remove();
		var list = window.food_spu_tags || [];
		var tmpl =  '<div class="choose-item">' +
						'<div class="item-name">$name</div>' +
						'<div class="price">￥<span class="total">$price</span></div>'+
						 '<div class="select-content">' +
					        '<div class="minus">-</div>' +
					        '<div class="count">$chooseCount</div>' +
    						'<div class="plus">+</div>' +
    					'</div>' +
					'</div>';
		var totalPrice = 0;
		var totalNum = 0;
		list.forEach(function(item){
			item.spus.forEach(function(_item){
				if(_item.chooseCount > 0){
					var price = _item.min_price * _item.chooseCount;
					var row = tmpl.replace("$name", _item.name)
								  .replace("$price", price)
								  .replace('$chooseCount', _item.chooseCount);

					totalPrice += price;
					totalNum += _item.chooseCount;
					var $row = $(row);
					$row.data('itemData', _item);

					$strTop.append($row);
				}
				
			})
		});

		changeNum(totalNum);
		changeTotalPrice(totalPrice);
		
	}

	function init(){
		$(".shop-bar").append($strTop).append($strBottom);
		addclick();
	}

	init();

	window.ShopBar = {
		renderItems: renderItems,
		changeShippingPrice: changeShippingPrice
	}
})()