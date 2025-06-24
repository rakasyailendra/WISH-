document.addEventListener('DOMContentLoaded', function() {
    
    // Ambil semua elemen yang dibutuhkan
    const preloader = document.getElementById('preloader');
    const initialPhotoScreen = document.getElementById('initial-photo-screen');
    const cover = document.getElementById('cover');
    const openButton = document.getElementById('open-button');
    const mainContent = document.getElementById('main-content');
    const backgroundMusic = document.getElementById('background-music');

    // Sembunyikan preloader setelah semua aset halaman dimuat
    window.addEventListener('load', () => {
        if (preloader) {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
        }
    });

    // Event listener untuk layar foto awal
    if (initialPhotoScreen) {
        initialPhotoScreen.addEventListener('click', function() {
            this.classList.add('hidden');
            if (cover) cover.classList.add('visible');
            if (backgroundMusic) backgroundMusic.play().catch(e => console.log("Autoplay dicegah."));
        }, { once: true });
    }

    // Event listener untuk tombol "Buka Undangan"
    if (openButton) {
        openButton.addEventListener('click', function() {
            if (cover) cover.classList.add('hidden');
            if (mainContent) {
                setTimeout(() => {
                    mainContent.classList.add('visible');
                    
                    // ===== PERINTAH BARU UNTUK SCROLL KE ATAS =====
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    
                    setupScrollAnimations();
                }, 500);
            }
        });
    }

    // Fungsi untuk setup animasi saat scroll
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        if (!animatedElements.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
});