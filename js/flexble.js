(function() {
    var rootEl = document.documentElement;
    var dpr = window.devicePixelRatio || 1;
    dpr = (dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1));

    var viewEl = document.querySelector('meta[name="viewport"]');
    var maxWidth = 1120,
        minWidth = 320;
    var scale = 1 / dpr,
        content = 'width=device-width, initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no';

    rootEl.setAttribute('data-dpr', dpr);
    if (maxWidth && minWidth) {
        rootEl.setAttribute('max-width', maxWidth);
        rootEl.setAttribute('min-width', minWidth);
    }


    if (viewEl) {
        viewEl.setAttribute('content', content);
    } else {
        viewEl = document.createElement('meta');
        viewEl.setAttribute('name', 'viewport');
        viewEl.setAttribute('content', content);
        document.head.appendChild(viewEl);
    }

    setRemUnit();
    window.addEventListener('resize', setRemUnit);

    function setRemUnit() {
        var ratio = 10;
        var viewWidth = rootEl.getBoundingClientRect().width || window.innerWidth;
        if (maxWidth && (viewWidth / dpr) > maxWidth) {
            viewWidth = maxWidth * dpr;
        }

        if (minWidth && (viewWidth / dpr) < minWidth) {
            viewWidth = minWidth * dpr;
        }

        rootEl.style.fontSize = viewWidth / ratio + 'px';
    }
})();