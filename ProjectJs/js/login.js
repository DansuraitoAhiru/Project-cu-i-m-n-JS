let users = [
    {
        id: 1,
        fullName: "Admin Chính",
        email: "vqviet@gmail.com",
        password: "123456",
        role: "admin", // "admin" hoặc "user"
        createdAt: "2026-03-03T12:26:21.617Z",
        isActive: true
    },
    {
        id: 2,
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@example.com",
        password: "Matkhau123",
        role: "user",
        createdAt: "2026-03-01T12:26:21.617Z",
        isActive: true
    },
    {
        id: 3,
        fullName: "Trần Thị B",
        email: "tranthib@example.com",
        password: "12345678",
        role: "user",
        createdAt: "2026-03-03T12:26:21.617Z",
        isActive: false
    }
];

// Lưu users
const saveUsers = (users) => {
    localStorage.setItem("users", JSON.stringify(users));
};

// Lấy users từ localStorage
const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

// Truy vấn các phần tử DOM
const loginForm = document.querySelector("#loginForm"); // Lưu ý: Đảm bảo đây là thẻ <form>
const emailInput = document.querySelector("#email");
const passInput = document.querySelector("#password");
const emailError = document.getElementById('error-email');
const passwordError = document.getElementById('error-password');

// Sự kiện Đăng nhập
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // --- BƯỚC 1: RESET LỖI ---
    emailError.textContent = "";
    passwordError.textContent = "";
    emailInput.classList.remove('invalid');
    passInput.classList.remove('invalid');

    let isValid = true;
    const email = emailInput.value.trim();
    const password = passInput.value;

    // --- BƯỚC 2: VALIDATE FORM (Hiện lỗi dưới input) ---
    if (!email) {
        emailError.innerText = "Email không được để trống";
        emailInput.classList.add('invalid');
        isValid = false;
    } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            emailError.textContent = "Email không đúng định dạng";
            emailInput.classList.add('invalid');
            isValid = false;
        }
    }

    if (!password) {
        passwordError.innerText = "Mật khẩu không được để trống";
        passInput.classList.add('invalid');
        isValid = false;
    }

    if (!isValid) return; // Nếu lỗi nhập liệu thì dừng lại

    // --- BƯỚC 3: KIỂM TRA TÀI KHOẢN (Hiện Toast) ---
    const userFound = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (userFound) {
        // Kiểm tra trạng thái hoạt động
        if (!userFound.isActive) {
            showToast("Đăng nhập thất bại", "Tài khoản của bạn đã bị khóa.", "error");
            return;
        }

        // Đăng nhập thành công
        showToast("Đăng nhập thành công", "Chào mừng bạn quay trở lại Ahiru-kun!", "success");

        // Lưu thông tin vào sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(userFound));

        setTimeout(() => {
            if (userFound.role === "admin") {
                // Admin thường vào trang quản trị hoặc trang chủ
                window.location.href = "admin.html";
            }
        }, 3000);
    } else {
        // Sai email hoặc mật khẩu
        showToast("Đăng nhập thất bại", "Tài khoản hoặc mật khẩu không chính xác.", "error");
    }
});

// Hàm showToast chuẩn mẫu
const showToast=(title, message, type) => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    // THÊM CLASS SHOW NGAY TẠI ĐÂY
    toast.className = `toast ${type} show`;

    const icon = type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark';

    const MAX_TOAST = 4; // giới hạn số lượng ô

    if (container.children.length >= MAX_TOAST) {
        container.firstChild.remove(); // xóa cái cũ nhất
    }

    toast.innerHTML = `
        <div class="toast-content">
            <i class="fa-regular ${icon}"></i>
            <div>
                <h3 style="margin: 0; font-size: 16px;">${title}</h3>
                <p style="margin: 5px 0 0; font-size: 14px; opacity: 1;">${message}</p>
            </div>
            <div class="close">✖</div>
            <div class="progress" style="animation-duration: 4000ms"></div>
        </div>
    `;

    container.appendChild(toast);

    // Tạo bộ đếm thời gian để tự động ẩn toast sau 4 giây
    let timer = setTimeout(function () {
        toast.classList.add("fade-out");  // Thêm class fade-out để chạy animation biến mất
        setTimeout(function () {
            toast.remove();              // Sau 0.4s thì xóa hẳn ô đấy khỏi màn hình
        }, 400);
    }, 4000);

    // Bắt sự kiện click vào nút đóng (X)
    toast.querySelector(".close").onclick = function () {
        clearTimeout(timer);  // Xóa bộ đếm
        toast.remove();       // Xóa toast ngay lập tức
    };
}

const togglePass = (btn) => {
    const wrapper = btn.closest(".input-wrapper");   // .closest() = tìm thằng cha gần nhất có class .input-wrapper
    const input = wrapper.querySelector("input");    // Tìm input bên trong wrapper vì wrapper chứa: input password và button eye, dòng này giúp lấy đúng ô password tương ứng với button
    const icon = btn.querySelector("i");

    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye-slash", "fa-eye");   // .replace(a, b) = thay class a → b
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    }
}