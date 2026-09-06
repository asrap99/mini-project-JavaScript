const countdownElement = document.getElementById('countdown')
const daysElement = document.getElementById('days')
const hoursElement = document.getElementById('hours')
const minutesElement = document.getElementById('minutes')
const secondsElement = document.getElementById('seconds')
const inputHours = document.getElementById('inputHours')
const inputMinutes = document.getElementById('inputMinutes')
const inputSeconds = document.getElementById('inputSeconds')
const startButton = document.getElementById('startButton')
const resetButton = document.getElementById('resetButton')
const terminalWindow = document.getElementById('terminalWindow')

let countdownInterval;
let isAlarmPlaying = false; // Saklar untuk mematikan/menyalakan suara

// Fungsi pembuat suara Beep
function playAlarmSound() {
    // Jika alarm sudah dimatikan, hentikan perulangan suara
    if (!isAlarmPlaying) return;

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'square'; 
    oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); 
    
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime); 
    
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    
    oscillator.start();
    
    setTimeout(() => oscillator.stop(), 200);
    
    // Suara akan terus diulang HANYA JIKA isAlarmPlaying masih true
    setTimeout(() => {
        if (isAlarmPlaying) playAlarmSound();
    }, 400); 
}

function startTimer() {
    let hours = parseInt(inputHours.value) || 0
    let minutes = parseInt(inputMinutes.value) || 0
    let seconds = parseInt(inputSeconds.value) || 0

    let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds

    if (totalTimeInSeconds <= 0) {
        alert('> ERROR: Please enter a valid time!')
        return
    }
    
    inputHours.value = ''
    inputMinutes.value = ''
    inputSeconds.value = ''
    
    // Pastikan alarm mati saat memulai timer baru
    isAlarmPlaying = false;
    terminalWindow.classList.remove('alarm-active')

    countdownInterval = setInterval(() => {
        const days = Math.floor(totalTimeInSeconds / 86400)
        const hours = Math.floor((totalTimeInSeconds % 86400) / 3600)
        const minutes = Math.floor((totalTimeInSeconds % 3600) / 60)
        const seconds = Math.floor((totalTimeInSeconds % 60))

        daysElement.textContent = days.toString().padStart(2, '0')
        hoursElement.textContent = hours.toString().padStart(2, '0')
        minutesElement.textContent = minutes.toString().padStart(2, '0')
        secondsElement.textContent = seconds.toString().padStart(2, '0')

        if(totalTimeInSeconds <= 0) {
            clearInterval(countdownInterval)
            
            // Nyalakan efek merah dan suara
            terminalWindow.classList.add('alarm-active')
            isAlarmPlaying = true;
            playAlarmSound();
            
            setTimeout(() => {
                // Saat pop-up muncul, sistem akan berhenti di sini sampai user klik OK
                alert("> SYSTEM HALTED: Time's up!");
                
                // Kode di bawah ini akan berjalan SETELAH tombol OK ditekan
                isAlarmPlaying = false; // Matikan suara
                terminalWindow.classList.remove('alarm-active'); // Matikan layar merah
            }, 100);
        } else {
             totalTimeInSeconds--
        }
            
    }, 1000) 
}

startButton.addEventListener('click', () => {
    isAlarmPlaying = false;
    terminalWindow.classList.remove('alarm-active');
    clearInterval(countdownInterval)
    startTimer()
})

resetButton.addEventListener('click', () => {
    clearInterval(countdownInterval)
    
    daysElement.textContent = '00'
    hoursElement.textContent = '00'
    minutesElement.textContent = '00'
    secondsElement.textContent = '00'
    
    inputHours.value = ''
    inputMinutes.value = ''
    inputSeconds.value = ''
    
    // Matikan alarm juga jika tombol reset ditekan
    isAlarmPlaying = false;
    terminalWindow.classList.remove('alarm-active')
})