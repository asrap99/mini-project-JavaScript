const quotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you’re halfway there.", author: "Theodore Roosevelt" },
    { text: "Act as if what you do makes a difference. It does.", author: "William James" },
    { text: "You are never too old to set another goal or to dream a new dream.", author: "C.S. Lewis" },
    { text: "Your time is limited, so don’t waste it living someone else’s life.", author: "Steve Jobs" }
];

const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteButton = document.getElementById('new-quote');
const cursor = document.getElementById('cursor');

// Variabel untuk menyimpan status animasi (agar tidak error jika tombol diklik cepat)
let typingTimeout;

function generateQuote() {
    // 1. Hentikan animasi sebelumnya (jika user mengklik tombol sebelum ketikan selesai)
    clearTimeout(typingTimeout);
    
    // 2. Pilih kutipan acak
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    // 3. Siapkan teks yang akan diketik
    const fullText = `"${randomQuote.text}"`;
    
    // 4. Kosongkan teks di layar sebelum mulai mengetik
    quoteText.textContent = "";
    quoteAuthor.textContent = ""; // Nama penulis disembunyikan dulu
    
    let charIndex = 0;
    
    // 5. Fungsi ketikan per huruf
    function typeWriter() {
        if (charIndex < fullText.length) {
            // Tambahkan huruf satu per satu
            quoteText.textContent += fullText.charAt(charIndex);
            charIndex++;
            
            // Atur kecepatan ketikan (30 milidetik per huruf)
            typingTimeout = setTimeout(typeWriter, 30);
        } else {
            // Jika ketikan selesai, munculkan nama penulis
            quoteAuthor.textContent = `- ${randomQuote.author}`;
        }
    }
    
    // Mulai mengetik
    typeWriter();
}

// Event listener saat tombol ditekan
newQuoteButton.addEventListener('click', generateQuote);

// Jalankan saat halaman pertama kali dibuka
generateQuote();