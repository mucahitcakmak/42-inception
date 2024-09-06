// URL yapılarını ve içeriklerini yönetmek için bir nesne tanımlayalım
const routes = {
    "/home": { title: "Home", contentPath: "pages/home.html" },
    "/leaderboard": { title: "Leaderboard", contentPath: "pages/leaderboard.html" },
    
    "/statistics": { title: "Statistics", contentPath: "pages/statistics.html" },
    "/statistics/matchs-history": { title: "Matchs-History", contentPath: "pages/matchs-history.html" },
    
    "/friends": { title: "Friends", contentPath: "pages/friends.html" },
    "/profile": { title: "Profile", contentPath: "pages/profile.html" },
};

document.addEventListener('DOMContentLoaded', () => {
    const indicator = document.querySelector('.nav-indicator');
    const contentElement = document.getElementById('content');

    function handleIndicator(el) {
        if (el.classList.contains('nav-item')) {
            const items = document.querySelectorAll('.nav-item'); // Yeni nav-item'ları da dahil et
            items.forEach(item => {
                item.classList.remove('is-active');
                item.style.color = ''; // Renk sıfırlama
            });

            indicator.style.width = `${el.offsetWidth}px`;
            indicator.style.left = `${el.offsetLeft}px`;
            indicator.style.backgroundColor = el.getAttribute('active-color');

            el.classList.add('is-active');
            el.style.color = el.getAttribute('active-color');
        }
    }

    function updatePageContent(html, pageTitle, urlPath) {
        // Fade-out başlangıcı
        contentElement.classList.remove('show');
        
        // İçerik değişimini ve animasyon başlatmayı geciktirmek için timeout kullanıyoruz
        setTimeout(() => {
            contentElement.innerHTML = html;
            document.title = pageTitle;
            window.history.pushState({ "html": html, "pageTitle": pageTitle }, pageTitle, urlPath);

            // Yeni içerik yerleştirildikten sonra fade-in animasyonu başlatılıyor
            contentElement.classList.add('show');
        }, 150);  // Fade-out animasyonu tamamlandıktan sonra içeriği değiştirmek için 150ms bekleniyor
    }

    function loadPageBasedOnPath(pathname) {
        if (routes[pathname]) {
            fetch(routes[pathname].contentPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(html => {
                    contentElement.classList.remove('fade-in');  // Animasyonu sıfırla
                    contentElement.style.opacity = 0;  // Sayfa yüklendiğinde transparan yap
  
                    setTimeout(() => {
                        contentElement.innerHTML = html;
                        document.title = routes[pathname].title;
                        window.history.pushState(null, "", pathname); // URL'yi güncelle
                        setActiveTabFromURL(); // Tabbar'ı güncelle
  
                        // Animasyonu başlat
                        contentElement.classList.add('fade-in');
                        contentElement.style.opacity = 1;  // Sayfa içeriğini yavaşça göster
                    }, 100);
                })
                .catch(error => console.error('There has been a problem with your fetch operation:', error));
        } else {
            console.error("404: Page not found for", pathname);
        }
    }

    function setActiveTabFromURL() {
        const path = window.location.pathname;
        const items = document.querySelectorAll('.nav-item, [data-url-path]'); // Tüm elemanları yeniden seç
        let matchingItem = null;

        items.forEach(item => {
            const targetPath = item.getAttribute('data-target-path') || item.getAttribute('data-url-path');
            if (path.startsWith(targetPath)) {
                matchingItem = item;
            }
        });

        if (matchingItem) {
            handleIndicator(matchingItem);
        }
    }

    // MutationObserver ile dinamik olarak eklenen elemanları izleyin
    const observer = new MutationObserver(() => {
        const items = document.querySelectorAll('.nav-item, [data-url-path]');
        items.forEach((item) => {
            item.removeEventListener('click', handleItemClick); // Önceki dinleyiciyi kaldırın
            item.addEventListener('click', handleItemClick);

            if (item.classList.contains('is-active')) {
                handleIndicator(item);
            }
        });
    });

    observer.observe(document.body, { childList: true, subtree: true });

    function handleItemClick(e) {
        e.preventDefault();
        const targetPath = this.getAttribute('data-target-path') || this.getAttribute('data-url-path');
        if (targetPath) {
            loadPageBasedOnPath(targetPath);
            handleIndicator(this);
        }
    }

    setActiveTabFromURL();
    loadPageBasedOnPath(window.location.pathname);

    window.onpopstate = function (event) {
        if (event.state) {
            // Fade-out başlangıcı
            contentElement.classList.remove('show');

            // İçerik değişimini ve animasyon başlatmayı geciktirmek için timeout kullanıyoruz
            setTimeout(() => {
                contentElement.innerHTML = event.state.html;
                document.title = event.state.pageTitle;

                // Yeni içerik yerleştirildikten sonra fade-in animasyonu başlatılıyor
                contentElement.classList.add('show');
            }, 150);  // Fade-out animasyonu tamamlandıktan sonra içeriği değiştirmek için 150ms bekleniyor
        } else {
            loadPageBasedOnPath(window.location.pathname);
        }
    };
});
