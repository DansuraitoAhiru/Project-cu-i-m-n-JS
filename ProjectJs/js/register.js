let users = [
    {
        id: 1,
        fullName: "Admin Chính",
        email: "vqviet@gmail.com",
        password: "admin123456",
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

const form = document.querySelector("#registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Lấy input elements
    const nameInput = document.querySelector("#fullname");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const confirmInput = document.querySelector("#confirm");
    const agreeInput = document.querySelector("#terms");

    // Lấy giá trị
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;
    const confirm = confirmInput.value;
    const agree = agreeInput.checked;

    // reset lỗi
    document.querySelectorAll(".error").forEach(e => e.textContent = "");

    let isValid = true;

    // VALIDATE
    if (!name) {
        document.querySelector("#error-name").textContent = "Tên không được để trống";
        nameInput.classList.add('invalid');
        isValid = false;
    }

    if (!email) {
        document.querySelector("#error-email").textContent = "Email không được để trống";
        emailInput.classList.add('invalid');
        isValid = false;
    } else {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            document.querySelector("#error-email").textContent = "Email không đúng định dạng";
            emailInput.classList.add('invalid');
            isValid = false;
        }
    }

    if (!password) {
        document.querySelector("#error-password").textContent = "Mật khẩu được để trống";
        passwordInput.classList.add('invalid');
        isValid = false;
    } else {
        const regex = /^(?=.*[!@#$%^&*]).{8,}$/;
        if (!regex.test(password)) {
            document.querySelector("#error-password").textContent = "Mật khẩu phải có ít nhất 8 ký tự + ký tự đặc biệt";
            passwordInput.classList.add('invalid');
            isValid = false;
        }
    }

    if (!confirm) {
        document.querySelector("#error-confirm").textContent = "Mật khẩu không được để trống";
        confirmInput.classList.add('invalid');
        isValid = false;
    } else if (confirm !== password) {
        document.querySelector("#error-confirm").textContent = "Mật khẩu không trùng khớp";
        confirmInput.classList.add('invalid');
        isValid = false;
    }

    if (!agree) {
        document.querySelector("#error-agree").textContent = "Bạn phải đồng ý";
        agreeInput.classList.add('invalid');
        isValid = false;
    }

    if (!isValid) return;

    // Kiểm tra email tồn tại
    const exist = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (exist) {
        document.querySelector("#error-email").textContent = "Email đã bị trùng";
        emailInput.classList.add('invalid');
        return;
    }

    // Tạo user mới
    const newUser = {
        id: Date.now(),
        fullName: name,
        email,
        password,
        role: "user",
        createdAt: new Date().toISOString(),
        isActive: true
    };

    users.push(newUser);
    saveUsers(users);

    Swal.fire({
        title: "Chúc mừng",
        text: "Đăng ký thành công rùi đóa!",
        icon: "success",
        confirmButtonText: "Đăng nhập"
    }).then(() => {
        window.location.href = "login.html";
    });
});

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