const currentTimeEle = document.getElementById("currentTime"); // Sửa tên biến cho gọn
const hourSelect = document.getElementById("hours");
const minuteSelect = document.getElementById("minutes");
const ampmSelect = document.getElementById("ampm");
const setAlarmBtn = document.getElementById("setAlarmBtn");
const clearAlarmBtn = document.getElementById("clearAlarmBtn");
const alarmStatus = document.getElementById("alarmStatus");
const alarmSound = document.getElementById("alarmSound");

let alarmTime = null;
let isAlarmPlaying = false; // Cờ kiểm soát: Tránh kích hoạt lặp lại trong 1 phút

// Tự động tạo danh sách Giờ (1-12) và Phút (00-59)
for (let i = 12; i > 0; i--) {
    let val = i < 10 ? "0" + i : i;
    let option = `<option value="${val}">${val}</option>`;
    hourSelect.firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
    let val = i < 10 ? "0" + i : i;
    let option = `<option value="${val}">${val}</option>`;
    minuteSelect.firstElementChild.insertAdjacentHTML("afterend", option);
}

// Cập nhật đồng hồ mỗi giây
setInterval(() => {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let ampm = "AM";

    if (h >= 12) {
        h = h - 12;
        ampm = "PM";
    }
    h = h == 0 ? 12 : h;

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    let timeString = `${h}:${m}:${s} ${ampm}`;
    currentTimeEle.innerText = timeString;

    // KIỂM TRA BÁO THỨC (Thêm điều kiện !isAlarmPlaying)
    if (alarmTime === `${h}:${m} ${ampm}` && !isAlarmPlaying) {
        isAlarmPlaying = true; // Đánh dấu là đang phát, giây sau sẽ không chạy vào đây nữa
        alarmSound.play().catch(error => {
            alert("⏰ ĐẾN GIỜ BÁO THỨC! (Trình duyệt chặn âm thanh, vui lòng bấm OK để nghe)");
            alarmSound.play();
        });
        alarmStatus.innerText = "⏰ DẬY THÔI NÀO!!! ⏰";
        alarmStatus.style.color = "#e74c3c";
    }
}, 1000);

// Xử lý nút Đặt báo thức
setAlarmBtn.addEventListener("click", () => {
    if (hourSelect.value === "Hour" || minuteSelect.value === "Minute" || ampmSelect.value === "AM/PM") {
        alert("Vui lòng chọn đầy đủ Giờ, Phút và AM/PM để đặt báo thức!");
        return;
    }

    alarmTime = `${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`;
    
    // MẸO: Audio "load" trước thông qua tương tác click của người dùng để tránh lỗi Autoplay của trình duyệt
    alarmSound.load(); 

    // Ẩn/Hiện giao diện phù hợp
    hourSelect.disabled = true;
    minuteSelect.disabled = true;
    ampmSelect.disabled = true;
    setAlarmBtn.style.display = "none";
    clearAlarmBtn.style.display = "block";
    
    alarmStatus.innerText = `Đã hẹn giờ lúc: ${alarmTime}`;
    alarmStatus.style.color = "#2ecc71";
});

// Xử lý nút Tắt báo thức
clearAlarmBtn.addEventListener("click", () => {
    alarmTime = null;
    isAlarmPlaying = false; // Reset lại cờ báo thức
    alarmSound.pause();
    alarmSound.currentTime = 0; // Reset âm thanh về đầu

    // Mở khóa lại các lựa chọn
    hourSelect.disabled = false;
    minuteSelect.disabled = false;
    ampmSelect.disabled = false;
    setAlarmBtn.style.display = "block";
    clearAlarmBtn.style.display = "none";
    
    alarmStatus.innerText = "Chưa đặt báo thức";
    alarmStatus.style.color = "#7f8c8d";
    
    // Reset giá trị select về mặc định
    hourSelect.value = "Hour";
    minuteSelect.value = "Minute";
    ampmSelect.value = "AM/PM";
});