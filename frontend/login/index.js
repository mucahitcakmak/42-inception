
///
/// BU KOD GEÇİCİDİR
///

// Session ID oluşturmak için rastgele bir ID üretici fonksiyon
function generateSessionId() {
	return 'sess_' + Math.random().toString(36).substr(2, 16);
}

// Cookie ayarlamak için fonksiyon
function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + value + expires + "; path=/";
}

// Butona tıklanınca session_id oluşturulup cookie'ye kaydedilir ve sayfa yenilenir
document.getElementById('loginButton').addEventListener('click', function() {
	const sessionId = generateSessionId();
	setCookie('session_id', sessionId, 1);  // Cookie 1 gün geçerli olacak şekilde ayarlandı
	location.reload();  // Sayfayı yenile
});
