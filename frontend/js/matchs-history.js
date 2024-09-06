function selectItem(element) {
    var items = document.getElementsByClassName('match-btn');
    console.log(items);
    for (var i = 0; i < items.length; i++) {
        items[i].classList.remove('new-cool');
    }
    element.classList.add('new-cool');
}
