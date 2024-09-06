function search() {
    var text = document.getElementById('friend-search').value.toLowerCase();
    const tr = document.getElementsByTagName('tr');

    for (let i = 1; i < tr.length; i++) {
        let userNameCell = tr[i].getElementsByClassName('table-p')[0];
        if (userNameCell) {
            let userName = userNameCell.textContent.toLowerCase();
            if (userName.includes(text)) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}
