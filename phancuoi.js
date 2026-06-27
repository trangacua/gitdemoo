

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
            currentTimeTime.innerText = timeString;

            // Kiểm tra nếu đến giờ báo thức
            if (alarmTime === `${h}:${m} ${ampm}`) {
                alarmSound.play().catch(error => {
                    console.log("Trình duyệt chặn tự động phát âm thanh. Cần tương tác trước.");
                });
                alarmStatus.innerText = "⏰ DẬY THÔI NÀO!!! ⏰";
                alarmStatus.style.color = "#e74c3c";
            }
        }, 1000);

        // Xử lý nút Đặt báo thức
        setAlarmBtn.addEventListener("click", () => {
            // Kiểm tra xem người dùng đã chọn đủ thông tin chưa
            if (hourSelect.value === "Hour" || minuteSelect.value === "Minute" || ampmSelect.value === "AM/PM") {
                alert("Vui lòng chọn đầy đủ Giờ, Phút và AM/PM để đặt báo thức!");
                return;
            }

            alarmTime = `${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`;
            
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
    </script>
</body>
</html>