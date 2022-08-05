const time = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const resetButton = document.getElementById('reset');

let startTime;
let stopTime = 0;
let timeoutID;

function displayTime() {
    const currentTime = new Date(Date.now() - startTime + stopTime);
    const h = String(currentTime.getHours() - 9).padStart(2, "0");
    const m = String(currentTime.getMinutes()).padStart(2, "0");
    const s = String(currentTime.getSeconds()).padStart(2, "0");
    let ms = Math.floor(currentTime.getMilliseconds() / 10);
    
    time.textContent = `${h}:${m}:${s}.${ms.toString().padStart(2,"0")}`;
    //displayTimeのオブジェクトを10ms毎に行うsetTimeout関数をtimeoutに代入
    timeoutID = setTimeout(displayTime, 10);
}

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    stopButton.disabled = false;
    resetButton.disabled = true;
    startTime = Date.now();
    displayTime();
});

stopButton.addEventListener('click', () => {
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = false;
    //timeoutIDの繰り返しを止める
    clearTimeout(timeoutID);
    stopTime += (Date.now() - startTime);
});

resetButton.addEventListener('click', () =>{
    startButton.disabled = false;
    stopButton.disabled = true;
    resetButton.disabled = true;
    time.textContent = "00:00:00.00";
    stopTime = 0;
});