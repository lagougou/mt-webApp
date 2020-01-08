(function() {
    var itemTmpl = '<div class="category-item">' +
        '<img class="item-icon" src= $url>' +
        '<p class="item-name">$name</p>' +
        '</div>';
    var $content = $(".category-content");

    function initCategory() {
        $.get('js/json/header.json', function(data) {
            var list = data.data.primary_filter.splice(0, 8);
            list.forEach(function(item, index) {
                var str = itemTmpl
                    .replace('$url', item.url)
                    .replace('$name', item.name);
                $content.append(str);
            });
        })
    }

    /*
	category-item 绑定点击事件
	param 
    */

    function addClick() {
        $content.on('click', '.category-item', function(argument) {
            // body...
            console.log('click');
        });
    }

    function init() {
        addClick();
        initCategory();
    }

    init();
})();