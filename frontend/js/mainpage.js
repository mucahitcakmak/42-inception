// TABBAR JS
document.addEventListener('DOMContentLoaded', () => {
  const indicator = document.querySelector('.nav-indicator');
  const items = document.querySelectorAll('.nav-item');
  const contentElement = document.getElementById('content');

  function handleIndicator(el) {
      // Sadece nav-item'lar için göstergeyi güncelle
      if (el.classList.contains('nav-item')) {
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
      const path = window.location.pathname; // URL'nin yolunu al
      let matchingItem = null;

      // Ana yol ile eşleşen tab'ı bul
      items.forEach(item => {
          const targetPath = item.getAttribute('data-target-path');
          if (path.startsWith(targetPath)) {  // startsWith, alt başlıkları da yakalar
              matchingItem = item;
          }
      });

      if (matchingItem) {
          handleIndicator(matchingItem);
      }
  }

  setActiveTabFromURL();
  
  items.forEach((item) => {
    item.addEventListener('click', e => {
          e.preventDefault(); // Sayfanın yenilenmesini önler
          const targetPath = item.getAttribute('data-target-path');
          loadPageBasedOnPath(targetPath); // İçeriği yükler ve tabbar'ı günceller

          handleIndicator(item); // Butona tıklanıldığında göstergede değişiklik yap
      });

      if (item.classList.contains('is-active')) {
          handleIndicator(item);
      }
  });

  window.onpopstate = function () {
      loadPageBasedOnPath(window.location.pathname); // URL değiştiğinde içerik ve tabbar güncellenir
  };
});



// CHAT JS
document.addEventListener("DOMContentLoaded", function() {
var chatLog = document.getElementById("chat-log");
var messageInput = document.getElementById("message-input");
var sendButton = document.getElementById("send-button");

sendButton.addEventListener("click", function() {
  sendMessage();
});

messageInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    sendMessage();
  }
});

messageInput.addEventListener("input", function() {
  adjustInputHeight();
});

messageInput.addEventListener("paste", function(event) {
  event.preventDefault();
  var clipboardData = event.clipboardData || window.clipboardData;
  var pastedContent = clipboardData.getData("text/plain");
  var formattedContent = formatMessage(pastedContent);
  document.execCommand("insertHTML", false, formattedContent);
});

function sendMessage() {
  var message = messageInput.value;
  if (message !== "") {
    appendUserMessage(message);
    messageInput.value = "";
    adjustInputHeight(); // Shrink the input box after sending
  }
}

function appendUserMessage(message) {
  var timestamp = getCurrentTimestamp();
  var userMessage = `<div><span class="timestamp">${timestamp}</span>[User]: ${formatMessage(message)}</div>`;
  chatLog.innerHTML += userMessage;
  scrollToBottom();
}

function scrollToBottom() {
  chatLog.scrollTop = chatLog.scrollHeight;
}

function getCurrentTimestamp() {
  var now = new Date();
  var hours = now.getHours().toString().padStart(2, "0");
  var minutes = now.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function adjustInputHeight() {
  messageInput.style.height = "auto";
  messageInput.style.height = messageInput.scrollHeight + "px";
}

function formatMessage(message) {
  // Check if the message starts with a code block indicator
  if (message.startsWith("```")) {
    return `<pre>${message}</pre>`;
  }

  // Escape HTML characters
  message = message.replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Format code blocks enclosed in backticks
  return message.replace(/(```[\s\S]*?```)/g, '<pre>$1</pre>');
}
});
