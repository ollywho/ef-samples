function addCursorText(text, className, dx, dy, duration, fadeDuration, event, document) {
    if (!document) {
        return;
    }
    var cursorText = document.createElement('div');
    cursorText.className = className;
    cursorText.innerHTML = text;
    cursorText.style = "position: absolute; z-index: 5000; "
        + "-webkit-transition: opacity " + fadeDuration + "ms linear; transition: opacity " + fadeDuration + "ms linear";
    cursorText.style.left = event.clientX + dx + "px";
    cursorText.style.top = event.clientY + dy + "px";
    document.body.appendChild(cursorText);

    document.body.onmousemove = (e) => {
        if (!e) {
            e = window.event;
        }
        cursorText.style.left = e.clientX + dx + "px";
        cursorText.style.top = e.clientY + dy + "px";
    }
    
    setTimeout(() => {
        cursorText.style.opacity = "0";
        setTimeout(() => {
            document.body.removeChild(cursorText)
        }, fadeDuration);
    }, duration - fadeDuration);
}

export { addCursorText };