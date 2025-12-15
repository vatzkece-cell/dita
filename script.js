// --- Fungsionalitas Login ---

const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const loginMessage = document.getElementById('loginMessage');

        // Simulasi Validasi Login (Ganti dengan AJAX/Fetch ke server nyata)
        const validUser = 'admin';
        const validPass = 'password123'; 

        if (username === validUser && password === validPass) {
            // Jika berhasil, simpan status login (misalnya di localStorage)
            localStorage.setItem('isLoggedIn', 'true');
            // Arahkan ke halaman utama
            window.location.href = 'index.html'; 
        } else {
            loginMessage.textContent = 'Nama pengguna atau kata sandi salah!';
            loginMessage.style.display = 'block';
            setTimeout(() => {
                loginMessage.style.display = 'none';
            }, 3000);
        }
    });
}

// --- Fungsionalitas Dashboard (Halaman Utama) ---

const uploadForm = document.getElementById('uploadForm');
const productGallery = document.getElementById('productGallery');
const logoutButton = document.getElementById('logoutButton');

// Cek status login saat halaman utama dimuat
if (document.body.classList.contains('dashboard') || uploadForm) {
    if (localStorage.getItem('isLoggedIn') !== 'true') {
        // Jika belum login, kembalikan ke halaman login
        window.location.href = 'login.html';
    }

    // Fungsionalitas Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            window.location.href = 'login.html';
        });
    }

    // Fungsionalitas Unggah Gambar (Hanya Preview Lokal)
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const productName = document.getElementById('productName').value;
            const productImageInput = document.getElementById('productImage');
            const file = productImageInput.files[0];

            if (file) {
                // Menggunakan FileReader untuk membuat URL sementara (blob URL)
                const reader = new FileReader();
                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                    displayProduct(productName, imageUrl);
                    uploadForm.reset(); // Reset form setelah unggah
                };
                reader.readAsDataURL(file); // Membaca file sebagai Data URL
            } else {
                alert('Silakan pilih gambar produk.');
            }
        });
    }
}


// Fungsi untuk menampilkan produk di galeri
function displayProduct(name, imageUrl) {
    if (!productGallery) return;

    const card = document.createElement('div');
    card.className = 'product-card';

    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = name;

    const p = document.createElement('p');
    p.textContent = name;

    card.appendChild(img);
    card.appendChild(p);

    productGallery.appendChild(card);
}
