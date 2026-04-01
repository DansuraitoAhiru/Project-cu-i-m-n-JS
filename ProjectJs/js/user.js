const logoutBtn = document.querySelector("#logout");

logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Xác nhận đăng xuất?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ff3b3b",
      cancelButtonColor: "#331a1a",
      confirmButtonText: "Đăng xuất ngay",
      cancelButtonText: "Hủy bỏ",
      background: "#1a1111",
      color: "#ffffff"
    }).then((result) => {
      if (result.isConfirmed) {
        // Chuyển hướng khi người dùng đồng ý
        window.location.href = "login.html";
      }
    });
})