{

    let startPos, winY, docY, docStart, scrolling, el, scrollable = { "auto": true, "scroll": true },

    parent = e => {
        if (((el.scrollHeight > el.clientHeight) && scrollable[(document.defaultView && document.defaultView.getComputedStyle ? document.defaultView.getComputedStyle(el, null) : el.currentStyle).overflowY]) || (el.tagName === "HTML" || el.tagName === "BODY")) {
            if (el.tagName === "BODY") el = document.querySelector('html');
            startPos = e.clientY;
            winY = el.clientHeight;
            docY = el.scrollHeight;
            docStart = el.scrollTop;
            scrolling = true;
        } else {
            el = el.parentElement;
            if (el) parent(e);
        }
    };

    document.addEventListener("mousemove", function (e) {
        if (scrolling) {
            let mouseP = ((startPos - e.clientY) / winY) * 100,
                docPos = docStart - ((docY / 100) * mouseP);
            el.scrollTop = docPos;
        }
    });

    document.addEventListener("mousedown", function (e) {
        if (e.which === 3 || e.which === 2) {
            el = e.target;
            parent(e);
        }
    });

    document.addEventListener("contextmenu", function (e) {
        if (startPos !== e.clientY) {
            e.preventDefault();
        }
        scrolling = false;
    });

    document.addEventListener("mouseup", function () {
        scrolling = false;
    });

    document.addEventListener("mouseout", function (e) {
        if (e.clientY <= 0 || e.clientX <= 0 || (e.clientX >= window.innerWidth || e.clientY >= window.innerHeight)) {
            scrolling = false;
        }
    });

}