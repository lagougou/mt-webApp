(function() {
    // 订单卡片模板
    var itemTmpl = '<div class="order-item">' +
        '<div class="order-item-inner">' +
        '<img class="order-img" src=$pic_url>' +
        '<div class="item-right">' +
        '<div class="item-top">' +
        '<p class="order-name text-ellipse">$name</p>' +
        '<div class="arrow"></div>' +
        '<div class="order-state">$status_description</div>' +
        '</div>' +
        '<div class="item-bottom"> $getProduct </div>' +
        '</div>' +
        '</div>' +
        '$getComment' +
        '</div>';


    function getTotalPrice(data) {
        var str = '<div class="product-item">' +
            '<span>...</span>' +
            '<div class="p-total-count">总计' + data.product_count +
            '个菜, 实付<span class="total-price">￥'+data.total+
            '</span></div>' +
            '</div>';
        return str;

    }

    function getProduct(data) {
        var list = data.product_list || [];
        list.push({ type: 'more' });
        var str = '';
        list.forEach(function(item, index) {
            if (item.type == 'more') {
                str += getTotalPrice(data);
            } else {
                str += '<div class="product-item">' +
                    item.product_name +
                    '<div class="p-count">x' +
                    item.product_count +
                    '</div>' +
                    '</div>'
            }
        });

        return str;
    }

    function getComment(data){
    	var statu = data.is_comment;
    	if(!statu){
    		return '<div class="comment">' + 
    					'<button class="comment-btn">评价</button>' +
    				'</div>';

    	}
    	return '';
    }

    function initContent(list) {
        list.forEach(function(item, index) {
            var str = itemTmpl.replace('$pic_url', item.poi_pic)
                .replace("$name", item.poi_name)
                .replace("$status_description", item.status_description)
                .replace("$getProduct", getProduct(item))
                .replace("$getComment", getComment(item));
            $(".order-list").append(str);
        });

    }



    function getList() {
        $.get('../js/json/orders.json', function(data) {
            console.log(data);
            var list = data.data.digestlist;
            initContent(list);
        });
    }

    function init() {
        getList();
    }

    init();

})()