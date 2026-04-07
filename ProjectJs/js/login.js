let users = [
    {
        id: 1,
        fullName: "Ahiru-kun",
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
const emailError = document.querySelector("#error-email");
const passwordError = document.querySelector("#error-password");

// Sự kiện Đăng nhập
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const remember = document.querySelector("#remember-me").checked;

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
    const users = getUsers();
    if (users.length === 0) {
        Swal.fire({
            title: "Lỗi",
            text: "Chưa có tài khoản nào! Vui lòng đăng ký",
            icon: "error",
            confirmButtonText: "Đăng ký"
        }).then(() => {
            window.location.href = "register.html";
        });
    }
    const userFound = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

    if (userFound) {
        // Kiểm tra trạng thái hoạt động
        if (!userFound.isActive) {
            showToast("Đăng nhập thất bại", "Tài khoản của bạn đã bị khóa.", "error");
            return;
        }

        if (remember) {
            localStorage.setItem("currentUser", JSON.stringify(userFound));
        }

        // Đăng nhập thành công
        showToast("Đăng nhập thành công", `Chào mừng bạn quay trở lại ${userFound.fullName}`, "success");

        // Lưu thông tin vào sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(userFound));

        setTimeout(() => {
            if (userFound.role === "admin") {
                window.location.href = "admin.html";
            } else {
                window.location.href = "user.html";
            }
        }, 1000);
    } else {
        // Sai email hoặc mật khẩu
        showToast("Đăng nhập thất bại", "Tài khoản hoặc mật khẩu không chính xác.", "error");
    }
});

// Hàm showToast chuẩn mẫu
const showToast = (title, message, type) => {
    const container = document.querySelector("#toast-container");
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

    // Tạo bộ đếm thời gian để tự động ẩn toast sau 4000 giây
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

const resetDefault = () => {
    let defaultUsers = [
        {
            id: 1,
            fullName: "Ahiru-kun",
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

    let defaultMovies = [
        {
            id: 1,
            title: "Dune: Part Two",
            titleVi: "Dune: Hành Tinh Cát - Phần 2",
            genres: "Viễn tưởng",
            duration: 166,
            releaseDate: "01/03/2024",
            status: 1,
            posterUrl: "../assets/images/dune.jpg",
            description: "Tiếp nối phần trước, Paul Atreides hợp nhất với Fremen để trả thù gia tộc Harkonnen và đối mặt với số phận của vũ trụ.",
            ticketPrice: 95000
        },
        {
            id: 2,
            title: "Kung Fu Panda 4",
            titleVi: "Gấu trúc Kung Fu 4",
            genres: "Hài",
            duration: 94,
            releaseDate: "08/03/2024",
            status: 1,
            posterUrl: "../assets/images/kungfu.jpg",
            description: "Po tiếp tục hành trình trở thành Chiến binh Rồng, đối mặt với kẻ thù mới và tìm người kế nhiệm.",
            ticketPrice: 80000
        },
        {
            id: 3,
            title: "Godzilla x Kong: The New Empire",
            titleVi: "Godzilla x Kong: Đế Chế Mới",
            genres: "Hành động",
            duration: 115,
            releaseDate: "29/03/2024",
            status: 2,
            posterUrl: "../assets/images/godzilla.jpg",
            description: "Godzilla và Kong hợp sức chống lại mối đe dọa mới từ lòng đất.",
            ticketPrice: 80000
        },
        {
            id: 4,
            title: "Kizumonogatari Part 2",
            titleVi: "Câu truyện huyền bí: Khởi nguồn của những vết sẹo phần 2",
            genres: "Tâm lý",
            duration: 69,
            releaseDate: "19/08/2016",
            status: 0,
            posterUrl: "../assets/images/mai.jpg",
            description: "Tiếp nối câu chuyện từ phần 1, sau khi Araragi cứu giúp Kisshot và trở thành vampire, giờ đã đến lúc quyết đấu, liệu kết câu truyện này sẽ có hậu.",
            ticketPrice: 80000
        },
        {
            id: 5,
            title: "Exhuma",
            titleVi: "Exhuma: Quật Mộ Trùng Ma",
            genres: "Kinh dị",
            duration: 134,
            releaseDate: "15/03/2024",
            status: 1,
            posterUrl: "../assets/images/exhua.jpg",
            description: "Một nhóm chuyên gia phong thủy khai quật mộ cổ và đối mặt với lời nguyền đáng sợ.",
            ticketPrice: 80000
        },
        {
            id: 6,
            title: "Umamusume: Beginning of a New Era",
            titleVi: "Gái ngựa: Mở đầu của thế hệ mới",
            genres: "Thể thao",
            duration: 108,
            releaseDate: "24/05/2024",
            status: 0,
            posterUrl: "https://upload.wikimedia.org/wikipedia/en/d/d9/Umamusume_Pretty_Derby_Beginning_of_a_New_Era_movie_poster.jpg",
            description: "Chú ngựa trẻ Jungle Pocket đang trên đà bắt đầu sự nghiệp, thì lỡ đụng phái canh tác vương Agnes Tachyon, liệu rốt cuộc điều gì sẽ xảy ra.",
            ticketPrice: 95000
        },
        {
            id: 7,
            title: "Kizumonogatari Part 3",
            titleVi: "Câu chuyện huyền bí: Khởi nguồn của những vết sẹo phần 3",
            genres: "Bí ẩn",
            duration: 83,
            releaseDate: "06/01/2017",
            status: 0,
            posterUrl: "../assets/images/godzilla - Copy.jpg",
            backdropUrl: "https://a.storyblok.com/f/178900/1040x585/d5f3dc6643/kizumonogatari-koyomi-vamp-teaser-kiss-shot.jpg/m/filters:quality(95)format(webp)",
            description: "Sau khi lấy lại các bộ phận cho Kisshot, điều gì sẽ xảy ra tiếp đây, liệu có phải Happy Ending đang chờ.",
            ticketPrice: 80000
        },
        {
            id: 8,
            title: "Spiderman: Brand New Day",
            titleVi: "Nhện nhọ chào ngày mới",
            genres: "Hành động",
            duration: 135,
            releaseDate: "15/07/2026",
            status: 2,
            posterUrl: "../assets/images/home - Copy.png",
            backdropUrl: "https://thecosmiccircus.com/wp-content/uploads/2025/05/spider-man-brand-new-day.jpg",
            description: "Trang phục mới, ác nhân mới, nhiều vấn đề hơn. Vẫn là gã hàng xóm thân thiện của bạn.",
            ticketPrice: 80000
        },
        {
            id: 9,
            title: "Dune",
            titleVi: "Dune: Hành Tinh Cát",
            genres: "Viễn tưởng",
            duration: 155,
            releaseDate: "01/03/2024",
            status: 1,
            posterUrl: "../assets/images/dune - Copy.jpg",
            backdropUrl: "../assets/images/home.png",
            description: "Câu chuyện về cuộc hành trình của Paul Atreides, một chàng trai trẻ tài năng và rực rỡ, sinh ra với số phận vĩ đại vượt quá sự hiểu biết của mình.",
            ticketPrice: 95000
        },
        {
            id: 10,
            title: "Kizumonogatari",
            titleVi: "Câu chuyện huyền bí: Khởi nguồn của những vết sẹo",
            genres: "Bí ẩn",
            duration: 64,
            releaseDate: "15/03/2024",
            status: 0,
            posterUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Kizumonogatari_Part_1_Tekketsu_poster.jpeg",
            description: "Koyomi Araragi , một học sinh lớp 12 trường trung học Naoetsu, kết bạn với Tsubasa Hanekawa, học sinh giỏi nhất trường. Tsubasa nhắc đến tin đồn về 1 ma cà rồng tóc vàng được nhìn thấy quanh thị trấn gần đây. Koyomi, vốn thường khá khép kín, lại có cảm tình với tính cách giản dị của Tsubasa. Tối hôm đó, Koyomi có cuộc gặp định mệnh với ma cà rồng trong tin đồn: đó là Kiss-Shot Acerola-Orion Heart-Under-Blade.",
            ticketPrice: 80000
        },
        {
            id: 11,
            title: "Webtoon Character Na Kang Lim",
            titleVi: "Nhân vật goat Na Kang Liêm",
            genres: "Tình cảm",
            duration: 6900,
            releaseDate: "31/02/2029",
            status: 2,
            posterUrl: "https://i.redd.it/j9d0k08aj2ze1.jpeg",
            description: "Đây là hành trình của Goat Liêm - một fan cứng, trở thành vị cứu tinh cho các nữ thần trong truyện bằng cách thay đổi định mệnh nghiệt ngã của họ.",
            ticketPrice: 44000
        },
        {
            id: 12,
            title: "Nisemonogatari",
            titleVi: "Câu chuyện huyền bí: Những câu chuyện giả dối",
            genres: "Bí ẩn",
            duration: 275,
            releaseDate: "08/01/2012",
            status: 0,
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMWE3OGFlNzktYzgwNy00OGEyLThmNDAtNjY5OWY5NGQzODliXkEyXkFqcGc@._V1_QL75_UX140_CR0,1,140,207_.jpg",
            description: "Câu chuyện giả tạo đơn giản xoay quanh những kẻ giả tạo hay những con quái vật giả tạo.",
            ticketPrice: 0
        },
        {
            id: 12,
            title: "Gridman Universe",
            titleVi: "Gridman Đa vũ trụ Hỗn loạn",
            genres: "Mecha",
            duration: 95,
            releaseDate: "29/03/2024",
            status: 1,
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMGI5NWYyYzAtN2U5OC00YjIwLWIyZTQtYzMwNTMyOTQyMzM4XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            description: "Yuuta muốn tỏ tình với Rikka, nhưng trước đó cậu phải giải quyết các vấn đề đa vũ trụ, cùng với sự giúp đỡ từ các nhân vật quen thuộc bên SSSS. Dynazenon.",
            ticketPrice: 73000
        },
        {
            id: 13,
            title: "SSSS. Dynazenon",
            titleVi: "4 chữ S: Đai ná zề nôn",
            genres: "Mecha",
            duration: 288,
            releaseDate: "13/02/2024",
            status: 0,
            posterUrl: "https://m.media-amazon.com/images/M/MV5BZWY5Zjk3ODYtYTg3NC00ZjE5LTljOGItMGE2OGI3OTc3MWM1XkEyXkFqcGc@._V1_.jpg",
            description: "Ngải là 1 kẻ sướng đời, vô tình bị Nụ cho leo cây, rồi vô tình dính vào các vấn đề liên quan Kaiju và đời sống cá nhân.",
            ticketPrice: 0
        },
        {
            id: 14,
            title: "Kagerou Project",
            titleVi: "Dự án dị năng",
            genres: "Tâm lý",
            duration: 204,
            releaseDate: "15/03/2026",
            status: 2,
            posterUrl: "https://static.wikia.nocookie.net/kagerouproject/images/f/fa/MCA_Poster_LC.jpg",
            description: "Những kẻ đã 1 lần đối diện với của tử, được trao quyền năng, thì liệu họ sẽ làm gì.",
            ticketPrice: 55000
        },
        {
            id: 15,
            title: "Shigatsu wa Kimi no Uso",
            titleVi: "Tháng Tư là lời nói dối của em",
            genres: "Tình cảm",
            duration: 595,
            releaseDate: "10/02/2024",
            status: 0,
            posterUrl: "../assets/images/mai - Copy.jpg",
            backdropUrl: "https://beyondthepanorama.com/wp-content/uploads/2020/10/ylia_orig.jpg",
            description: "Mùa xuân sắp đến rồi. Một mùa xuân có em... nhưng không có em.",
            ticketPrice: 80000
        },
        {
            id: 16,
            title: "Sentenced to Be a Hero",
            titleVi: "Bản án dũng sĩ",
            genres: "Fantasy",
            duration: 300,
            releaseDate: "08/03/2026",
            status: 1,
            posterUrl: "https://m.media-amazon.com/images/M/MV5BM2NlNmRlODQtMmNhOS00MDM5LTgwNzEtNzc3M2ZjYzZjNzRkXkEyXkFqcGc@._V1_.jpg",
            description: "Trở thành dũng sĩ ở nơi đây là 1 hình phạt tàn khốc, vậy rốt cuộc mọi chuyên là sao.",
            ticketPrice: 80000
        },
        {
            id: 17,
            title: "Kamen Rider Build: Be the One",
            titleVi: "Xây dựng: Trở thành 1 nào",
            genres: "Hành động",
            duration: 115,
            releaseDate: "29/03/2024",
            status: 0,
            posterUrl: "https://m.media-amazon.com/images/M/MV5BMDk4ZWZiMTQtNzAzNC00MjI5LThlNTgtNDhjMzU3OWZhNTA3XkEyXkFqcGc@._V1_.jpg",
            description: "Xoay quanh việc Sento Kiryu bị cả thế giới quay lưng do kế hoạch thao túng của ba đô đốc mới, buộc anh phải lưỡng long nhất thể cùng thằng cốt Ryuga Banjo để ngăn chặn âm mưu hủy diệt.",
            ticketPrice: 60000
        },
        {
            id: 18,
            title: "Koe no Katachi",
            titleVi: "Oscar 2017 TT",
            genres: "Tình cảm",
            duration: 131,
            releaseDate: "20/10/2017",
            status: 0,
            posterUrl: "https://m.media-amazon.com/images/M/MV5BOTFiNzRiOWEtYTQwNy00NmRiLWE0ZWYtNTE0YjExZjFmZjkwXkEyXkFqcGc@._V1_.jpg",
            description: "Một kẻ từng bắt nạt, một cô gái khiếm thính, câu chuyện về sự chuộc lỗi, những hối hận pha lẫn tình cảm tuổi trẻ.",
            ticketPrice: 80000
        },
        {
            id: 19,
            title: "Umamusume: Road to the top",
            titleVi: "Gái ngựa: Lên đỉnh",
            genres: "Crazy Animation",
            duration: 98,
            releaseDate: "15/03/2024",
            status: 1,
            posterUrl: "https://m.media-amazon.com/images/M/MV5BYzI4Njk4NDAtMDQwZS00NzFmLTk2MWItYjk3NWFhYWQyMjAxXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
            description: "xoay quanh cuộc cạnh tranh khốc liệt và đầy cảm xúc giữa ba đối thủ định mệnh là Narita Top Road, Admire Vega và T.M. Opera O trên con đường chinh phục ba giải đua cổ điển danh giá (Triple Crown)",
            ticketPrice: 70000
        },
        {
            id: 20,
            title: "Re: Zero Season 4",
            titleVi: "Tiếp tục thăm ngàn từ con số 0 mùa 4",
            genres: "Tâm lý",
            duration: 366,
            releaseDate: "08/04/2026",
            status: 2,
            posterUrl: "https://scontent.fhan14-1.fna.fbcdn.net/v/t51.82787-15/643590520_18315381043267383_2139538325390307718_n.webp?stp=dst-jpg_tt6&_nc_cat=105&ccb=1-7&_nc_sid=13d280&_nc_ohc=X40qWOkXo90Q7kNvwGByX-L&_nc_oc=AdoUux4vUenZbaondnDNlDH6Ur1HsKq6nZ63-aKfTxnyyi0OxVSdh2KuFN1I6oTwHKc&_nc_zt=23&_nc_ht=scontent.fhan14-1.fna&_nc_gid=GgKadRLdPja56Vc5V1vIXg&_nc_ss=7a389&oh=00_Af1xGJ0epWNRCN6bWS7_lk6nwXmVjymooMay2DLbvCwJYw&oe=69D5A15B",
            description: "Tiếp nối các phần trước, Natsuki Subaru lại đối diện đối thủ ngoài tầm, lại xem cậu đang khổ và tim ra cách sống sót trong thế giới nghiệt ngã này.",
            ticketPrice: 0
        },
        {
            id: 21,
            title: "Fate/Strange Fake",
            titleVi: "Định mệnh Giả Lạ",
            genres: "Hành động",
            duration: 214,
            releaseDate: "08/03/2027",
            status: 2,
            posterUrl: "https://i.pinimg.com/736x/61/d9/e9/61d9e9d32b428030a3df458106ca26d7.jpg",
            description: "Một Cuộc Chiến Chén Thánh bất thường và đầy lỗi hệ thống diễn ra tại Mỹ, nơi các anh linh huyền thoại bậc nhất đối đầu trong một kịch bản hỗn loạn vượt xa mọi quy tắc của dòng Fate.",
            ticketPrice: 80000
        },
        {
            id: 22,
            title: "Classroom of the elite",
            titleVi: "Lớp học 1 mình Kiyo canh tác",
            genres: "Học đường",
            duration: 415,
            releaseDate: "01/04/20246",
            status: 1,
            posterUrl: "https://img.tripi.vn/cdn-cgi/image/width=700,height=700/https://gcs.tripi.vn/public-tripi/tripi-feed/img/479249vuq/anh-mo-ta.png",
            description: "Ayanokouji đã sang năm 2, và vẫn tiếp tục làm hình mẫu nhân vật chính lí tưởng mọi người đều là công cụ.",
            ticketPrice: 40000
        },
        {
            id: 23,
            title: "Reincarnation no Kaben",
            titleVi: "Cánh hoa luân hồi",
            genres: "Sức mạnh siêu nhiên",
            duration: 331,
            releaseDate: "02/04/2026",
            status: 1,
            posterUrl: "https://scontent.fhan14-4.fna.fbcdn.net/v/t39.30808-6/480585422_643760721374665_3574183630836528403_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=13d280&_nc_ohc=gjS0m0utVQsQ7kNvwEgPAv8&_nc_oc=Ado29SX07wEB2cv7Vk_MG4OSXHPk6uk-9-muZdfdElyy-T3wMDPEEoYnsMLPgEdd7CDjQULmTR1X91YdqXwNkYUy&_nc_zt=23&_nc_ht=scontent.fhan14-4.fna&_nc_gid=mntSvw1E31FnHBg3KbJzNQ&_nc_ss=7a389&oh=00_Af3MAoZe5POhoTBvNf7k93Cz-ofEEvapC0HLSfVE58Rwlw&oe=69D5A7B8",
            description: "Câu chuyện về những người tự sát bằng món đồ cổ huyền bí để đánh thức sức mạnh của các vĩ nhân hoặc tội nhân trong quá khứ, cuốn họ vào một cuộc chiến sinh tử nhằm quyết định vận mệnh của chính họ.",
            ticketPrice: 0
        },
        {
            id: 24,
            title: "Solo Leveling",
            titleVi: "Tôi cằm nhọn một mình",
            genres: "Aura Farming",
            duration: 293,
            releaseDate: "02/09/2025",
            status: 0,
            posterUrl: "https://thumbnail.laftel.tv/items/portrait/58205520-e8a2-4950-8159-b2a0d01b3c34.png?w=450&f=WEBP",
            description: "Ở Hàn, có anh chàng cằm nhọn họ Sung, với biệt tài siêu canh tác hành quang",
            ticketPrice: 0
        }
    ];

    let defaultTickets = [
        {
            id: 1001,
            ticketCode: "VE-1001",
            customerName: "Nguyễn Văn A",
            customerPhone: "0987654321",
            movieId: 1,
            movieTitle: "Dune: Hành Tinh Cát - Phần 2",
            showDate: "2026-03-25",
            showTime: "19:00",
            seats: ["F12", "F13"],
            seatCount: 2,
            pricePerSeat: 80000,
            totalAmount: 160000,
            paymentMethod: 0,
            paymentStatus: true,
            createdAt: "2026-03-10T14:30:00Z",
            note: "Khách yêu cầu ghế gần lối đi",
            statusDisplay: "Đã Thanh Toán"
        },
        {
            id: 1002,
            ticketCode: "VE-1002",
            customerName: "Trần Thị B",
            customerPhone: "0912345678",
            movieId: 4,
            movieTitle: "Mai",
            showDate: "2026-03-26",
            showTime: "21:30",
            seats: ["G5"],
            seatCount: 1,
            pricePerSeat: 80000,
            totalAmount: 80000,
            paymentMethod: 1,
            paymentStatus: false,
            createdAt: "2026-03-11T09:15:00Z",
            note: "",
            statusDisplay: "Chờ xử lý"
        },
        {
            id: 1003,
            ticketCode: "VE-1003",
            customerName: "Lê Văn C",
            customerPhone: "0945667321",
            movieId: 2,
            movieTitle: "Kung Fu Panda 4",
            showDate: "2026-03-27",
            showTime: "10:00",
            seats: ["H10", "H11", "H12"],
            seatCount: 3,
            pricePerSeat: 90000,
            totalAmount: 270000,
            paymentMethod: 2,
            paymentStatus: true,
            createdAt: "2026-03-12T10:45:00Z",
            note: "Combo bắp nước tặng kèm",
            statusDisplay: "Đã Thanh Toán"
        },
        {
            id: 1004,
            ticketCode: "VE-1004",
            customerName: "Phạm Minh D",
            customerPhone: "0855345321",
            movieId: 5,
            movieTitle: "Exhuma: Quật Mộ Trùng Ma",
            showDate: "2026-03-24",
            showTime: "21:45",
            seats: ["E8"],
            seatCount: 1,
            pricePerSeat: 95000,
            totalAmount: 95000,
            paymentMethod: 0,
            paymentStatus: false,
            createdAt: "2026-03-13T11:20:00Z",
            note: "Khách hủy do bận đột xuất",
            statusDisplay: "Đã hủy"
        },
        {
            id: 1005,
            ticketCode: "VE-1005",
            customerName: "Hoàng Yến E",
            customerPhone: "0377654321",
            movieId: 3,
            movieTitle: "Godzilla x Kong: Đế Chế Mới",
            showDate: "2026-03-28",
            showTime: "08:30",
            seats: ["D4", "D5"],
            seatCount: 2,
            pricePerSeat: 80000,
            totalAmount: 160000,
            paymentMethod: 1,
            paymentStatus: false,
            createdAt: "2026-03-02T08:50:00Z",
            note: "Chờ xác nhận thanh toán chuyển khoản",
            statusDisplay: "Chờ xử lý"
        }
    ];

    localStorage.setItem("users", JSON.stringify(defaultUsers));
    localStorage.setItem("movies", JSON.stringify(defaultMovies));
    localStorage.setItem("tickets", JSON.stringify(defaultTickets));
};
// resetDefault();

window.onload = () => {
    const saveUser = localStorage.getItem("currentUser");
    const currentURL = window.location.href;

    // Nếu chưa đăng nhập → chỉ cho vào login.html
    if (!saveUser) {
        if (!currentURL.includes("login.html")) {
            window.location.href = "login.html";
        }
        return;
    }

    const user = JSON.parse(saveUser);

    // Nếu đang ở login.html mà đã login → redirect về trang đúng
    if (currentURL.includes("login.html")) {
        if (user.role === "admin") window.location.href = "admin.html";
        else window.location.href = "user.html";
        return;
    }
}

const menu = document.querySelector("#menu");
const nav = document.querySelector("#nav");
menu.addEventListener("click", () => {
    nav.classList.toggle("active");
});