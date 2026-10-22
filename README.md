# Klinik Beslenme Rehberi (PWA)

ESPEN kılavuzlarına dayalı erişkin klinik beslenme hesaplayıcıları ve önerileri. Çevrimdışı çalışır, telefona ve bilgisayara uygulama olarak kurulur.

## GitHub Pages ile yayınlama
1. GitHub'da yeni bir depo açın (örn. `KlinikBeslenme`).
2. Bu klasördeki tüm dosyaları (index.html, manifest.webmanifest, sw.js, icons/) deponun köküne yükleyin.
3. Settings → Pages → Branch: `main`, klasör `/ (root)` → Save.
4. Birkaç dakika sonra adres: `https://<kullanıcı-adı>.github.io/KlinikBeslenme/`

## Kurulum
- iPhone (Safari): Paylaş → Ana Ekrana Ekle
- Android (Chrome): menü → Uygulamayı yükle (veya sayfadaki “Ana ekrana ekle” düğmesi)
- Mac/PC (Chrome/Edge): adres çubuğundaki yükle simgesi

İlk açılıştan sonra internet olmadan çalışır.

## Güncelleme
index.html değiştiğinde `sw.js` içindeki `CACHE = 'kbr-v1.4'` değerini artırın (örn. `kbr-v1.1`); cihazlar bir sonraki açılışta yeni sürümü alır.

Kaynak: NotebookLM “Klinik Beslenme Rehberi” defteri (13 ESPEN kılavuzu). Klinik karar desteğidir; bireysel değerlendirmenin yerini almaz.
