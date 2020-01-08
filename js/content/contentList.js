(function() {
    var itemTplm = '<div class="store-item">' +
        '<img class="store-img" src="$url">' +
        '<div class="store-content">' +
        '<p class="store-name">$name</p>' +
        '<div class="store-info">' +
        '<p class="store-rating">$starImg&nbsp;月售$monthNum</p>' +
        '<p class="delivery-info"> <span>$delivery_time</span>&nbsp;|&nbsp;$distance </p>' +


        '</div>' +
        '<p class="delivery-price">$price</p>' +
        '<div class="store-discount">$discount</div>' +
        '</div>' +
        // '<div class="store-discount">$discount</div>' +

        '</div>';

    var $content = $('.list-wrapper');


    function getDiscount(data) {
        var str = "";
        if (data) {
            data.forEach(function(item, index) {
                str += '<p class="discount-info text-ellipse"><img class="discount-icon" src=' + item.icon_url + '>' + item.info + '</p>'
            });
        }

        return str;
    }

    function getStar(data){
        var total = parseFloat(data);
        var fullStar = Math.floor(total);
        var halfStar = total % 1;
        var grayStar =  Math.floor(5 - total);
        var str = '';
        for (var i=0; i< fullStar; i++ ){
            str += '<img src="image/content/fullstar.png" />'
        }
        if (halfStar > 0) {
            str += '<img src="image/content/halfstar.png" />'
        }

        for (var i = 0; i < grayStar; i++){
            str += '<img src="image/content/gray-star.png" />'
        }

        return str ;
    }

    function getMonthNum(data) {
        if (data > 999) {
            return "999+";
        }
        return data;
    }

    function initContent() {
        $.get("js/json/homelist.json", function(data) {
            var data_arr = data.data.poilist;
            data_arr.forEach(function(item, index) {
                var str = itemTplm.replace("$url", item.pic_url)
                    .replace("$name", item.name)
                    .replace("$delivery_time", item.mt_delivery_time)
                    .replace("$distance", item.distance)
                    .replace("$price", item.min_price_tip)
                    .replace("$starImg", getStar(item.wm_poi_score))
                    .replace("$monthNum", getMonthNum(item.month_sale_num))
                    .replace("$discount", getDiscount(item.discounts2));
                $content.append(str);
            });

        })
    }

    function init() {
        initContent();
    }
    init();
})();