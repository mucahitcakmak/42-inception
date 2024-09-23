(function() {
    // Cookie'den session_id değerini alacak fonksiyon
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    // session_id var mı kontrol et
    const sessionId = getCookie('session_id');

    // session_id yoksa login sayfasına yönlendir
    if (!sessionId) {
        window.location.href = '/login/index.html';
    }
})();
