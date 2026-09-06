document.addEventListener("DOMContentLoaded", function () {
    const topTypingElement = document.getElementById("top-typing-text");
    const topCursor = document.getElementById("top-cursor");
    const mainContent = document.getElementById("main-content");
    const bottomCommandElement = document.getElementById("bottom-command");
    const bottomCursor = document.getElementById("bottom-cursor");
    const liveServerLogs = document.getElementById("live-server");
    const spinnerElement = document.getElementById("spinner");
    const projectButtons = document.querySelectorAll(".project-btn");

    const topText = "mini project javascript by muh abdullah asyraf";
    const bottomText = "npm run serve";

    const spinnerFrames = [
        "⠋",
        "⠙",
        "⠹",
        "⠸",
        "⠼",
        "⠴",
        "⠦",
        "⠧",
        "⠇",
        "⠏"
    ];

    let spinnerIndex = 0;
    let spinnerInterval = null;

    // ==========================================
    // SPINNER
    // ==========================================

    function startSpinner() {
        if (spinnerInterval) return;

        spinnerInterval = setInterval(() => {
            spinnerElement.innerText = spinnerFrames[spinnerIndex];

            spinnerIndex =
                (spinnerIndex + 1) % spinnerFrames.length;
        }, 100);
    }

    // ==========================================
    // SIMPAN STATUS SAAT MASUK KE PROJECT
    // ==========================================

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            sessionStorage.setItem(
                "returningFromProject",
                "true"
            );
        });
    });

    // ==========================================
    // TAMPILKAN TERMINAL TANPA ANIMASI
    // ==========================================

    function showCompletedTerminal() {

        // Tampilkan teks atas langsung
        topTypingElement.textContent = topText;

        // Hilangkan cursor
        topCursor.style.display = "none";

        // Tampilkan project
        mainContent.style.display = "block";

        // Tampilkan command bawah langsung
        bottomCommandElement.textContent = bottomText;

        // Hilangkan cursor
        bottomCursor.style.display = "none";

        // Tampilkan Live Server
        liveServerLogs.style.display = "flex";

        // Jalankan spinner
        startSpinner();
    }

    // ==========================================
    // CEK APAKAH KEMBALI DARI PROJECT
    // ==========================================

    const returningFromProject =
        sessionStorage.getItem("returningFromProject") === "true";

    const navEntries =
        performance.getEntriesByType("navigation");

    const navType =
        navEntries.length > 0
            ? navEntries[0].type
            : "";

    // Jika kembali dari project
    if (
        returningFromProject ||
        navType === "back_forward"
    ) {

        // Hapus status setelah digunakan
        sessionStorage.removeItem(
            "returningFromProject"
        );

        // Langsung tampilkan halaman tanpa animasi
        showCompletedTerminal();

        return;
    }

    // ==========================================
    // ANIMASI KETIK NORMAL
    // ==========================================

    let topIndex = 0;
    let bottomIndex = 0;

    function typeTop() {

        if (topIndex < topText.length) {

            topTypingElement.textContent +=
                topText.charAt(topIndex);

            topIndex++;

            setTimeout(
                typeTop,
                Math.floor(Math.random() * 50) + 30
            );

        } else {

            setTimeout(() => {

                topCursor.style.display = "none";

                mainContent.style.display = "block";

                setTimeout(
                    typeBottom,
                    1000
                );

            }, 500);
        }
    }

    function typeBottom() {

        if (bottomIndex < bottomText.length) {

            bottomCommandElement.textContent +=
                bottomText.charAt(bottomIndex);

            bottomIndex++;

            setTimeout(
                typeBottom,
                Math.floor(Math.random() * 80) + 40
            );

        } else {

            setTimeout(() => {

                bottomCursor.style.display = "none";

                liveServerLogs.style.display = "flex";

                startSpinner();

            }, 400);
        }
    }

    // Mulai animasi ketika pertama kali membuka
    // atau refresh halaman utama
    setTimeout(
        typeTop,
        800
    );
});