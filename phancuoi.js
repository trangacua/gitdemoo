setInterval(() => {
  const d = new Date();
  let h = d.getHours(),
    m = d.getMinutes(),
    s = d.getSeconds();
  const ap = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  const pad = (n) => (n < 10 ? "0" + n : n);
  currentTimeTime.innerText = `${pad(h)}:${pad(m)}:${pad(s)} ${ap}`;

  if (alarmTime === `${pad(h)}:${pad(m)} ${ap}`) {
    alarmSound
      .play()
      .catch(() => console.log("Trình duyệt chặn tự động phát âm thanh."));
    alarmStatus.innerText = "⏰ DẬY THÔI NÀO!!! ⏰";
    alarmStatus.style.color = "#e74c3c";
  }
}, 1000);

setAlarmBtn.addEventListener("click", () => {
  if (
    hourSelect.value === "Hour" ||
    minuteSelect.value === "Minute" ||
    ampmSelect.value === "AM/PM"
  )
    return alert("Vui lòng chọn đầy đủ Giờ, Phút và AM/PM để đặt báo thức!");
  alarmTime = `${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`;
  [hourSelect, minuteSelect, ampmSelect].forEach((el) => (el.disabled = true));
  setAlarmBtn.style.display = "none";
  clearAlarmBtn.style.display = "block";
  alarmStatus.innerText = `Đã hẹn giờ lúc: ${alarmTime}`;
  alarmStatus.style.color = "#2ecc71";
});

clearAlarmBtn.addEventListener("click", () => {
  alarmTime = null;
  alarmSound.pause();
  alarmSound.currentTime = 0;
  [hourSelect, minuteSelect, ampmSelect].forEach((el) => {
    el.disabled = false;
    el.selectedIndex = 0;
  });
  setAlarmBtn.style.display = "block";
  clearAlarmBtn.style.display = "none";
  alarmStatus.innerText = "Chưa đặt báo thức";
  alarmStatus.style.color = "#7f8c8d";
});
