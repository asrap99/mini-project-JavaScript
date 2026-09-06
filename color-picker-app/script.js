// Mengambil elemen dari HTML
const colorInput = document.getElementById('colorInput');
const colorCode = document.getElementById('colorCode');
const colorDisplay = document.getElementById('colorDisplay');
const copyBtn = document.getElementById('copyBtn');

// Logika mengubah warna
colorInput.addEventListener('input', function(event) {
    // get selected color from input
    let selectedColor = event.target.value; 
    
    // update the color text (dibuat kapital agar lebih rapi)
    colorCode.textContent = selectedColor.toUpperCase(); 
    
    // Update the background color of the display box
    colorDisplay.style.backgroundColor = selectedColor; 
    
    // Tambahan efek: Memberikan cahaya (glow) sesuai warna yang dipilih
    colorDisplay.style.boxShadow = `0 0 25px ${selectedColor}66`;
});

// Logika Fitur Tombol Copy
copyBtn.addEventListener('click', function() {
    navigator.clipboard.writeText(colorCode.textContent).then(() => {
        // Ubah teks tombol sementara saat berhasil disalin
        const originalText = copyBtn.innerText;
        copyBtn.innerText = "[ COPIED! ]";
        copyBtn.style.color = "#27c93f"; // Warna hijau sukses
        
        // Kembalikan ke teks asal setelah 1.5 detik
        setTimeout(() => {
            copyBtn.innerText = originalText;
            copyBtn.style.color = "";
        }, 1500);
    });
});