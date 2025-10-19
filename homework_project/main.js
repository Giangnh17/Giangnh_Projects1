// BTVN:
// - Trong Form liên hệ: Khi nhấn nút gửi thì in ra tất cả nội dung thông tin đã được nhập
// - Trong Thông tin cá nhân: Sử dụng JS để gen các thông tin trong mục "Sở thích" "Thông tin học tập" & "Kỹ năng"

// Chức năng 1: Xử lý Form liên hệ
function handleContactForm() {
    const form = document.getElementById('contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Ngăn form submit mặc định
            
            // Lấy tất cả thông tin từ form
            const formData = new FormData(form);
            const data = {};
            
            // Lấy các giá trị input text, email, textarea, select
            for (let [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            // Xử lý riêng cho radio buttons (giới tính)
            const genderRadio = form.querySelector('input[name="gender"]:checked');
            if (genderRadio) {
                data.gender = genderRadio.value;
            }
            
            // Xử lý riêng cho checkboxes (sở thích)
            const hobbiesChecked = form.querySelectorAll('.contact-hobbies input[type="checkbox"]:checked');
            const hobbies = [];
            hobbiesChecked.forEach(checkbox => {
                hobbies.push(checkbox.value);
            });
            data.hobbies = hobbies;
            
            // Lấy div để hiển thị kết quả
            let resultDiv = document.getElementById('result');
            if (resultDiv) {
                resultDiv.style.display = 'block';
            }
            
            // Hiển thị thông tin đã nhập
            let resultHTML = '<h3 style="color: #007bff; margin-bottom: 15px;">Thông tin bạn đã nhập:</h3>';
            
            if (data.name) resultHTML += `<p><strong>Họ và tên:</strong> ${data.name}</p>`;
            if (data.email) resultHTML += `<p><strong>Email:</strong> ${data.email}</p>`;
            if (data.message) resultHTML += `<p><strong>Nội dung liên hệ:</strong> ${data.message}</p>`;
            if (data.gender) {
                const genderText = data.gender === 'male' ? 'Nam' : 'Nữ';
                resultHTML += `<p><strong>Giới tính:</strong> ${genderText}</p>`;
            }
            if (data.hobbies && data.hobbies.length > 0) {
                resultHTML += `<p><strong>Sở thích:</strong> ${data.hobbies.join(', ')}</p>`;
            }
            if (data.city) {
                const cityNames = {
                    'hanoi': 'Hà Nội',
                    'hcm': 'Hồ Chí Minh', 
                    'danang': 'Đà Nẵng',
                    'other': 'Khác'
                };
                resultHTML += `<p><strong>Thành phố:</strong> ${cityNames[data.city] || data.city}</p>`;
            }
            
            resultDiv.innerHTML = resultHTML;
            
            // Scroll đến kết quả
            resultDiv.scrollIntoView({ behavior: 'smooth' });
            
            console.log('Dữ liệu form:', data);
        });
    }
}

// Chức năng 2: Generate thông tin cho trang giới thiệu
function generatePersonalInfo() {
    // Kiểm tra xem có đang ở trang introduce.html không
    if (window.location.pathname.includes('introduce.html') || document.querySelector('.hobbies')) {
        
        // 1. Generate danh sách sở thích
        const hobbiesList = document.querySelector('.hobbies');
        if (hobbiesList) {
            const hobbiesData = [
                'Xem anime và manga Nhật Bản',
                'Du lịch khám phá các địa điểm mới',
                'Đọc sách tiểu thuyết và light novel',
                'Học ngoại ngữ (Tiếng Nhật, Tiếng Anh)',
            ];
            // Xóa nội dung cũ và thêm mới
            hobbiesList.innerHTML = '';
            hobbiesData.forEach(hobby => {
                const li = document.createElement('li');
                li.textContent = hobby;
                li.style.animation = 'fadeInUp 0.5s ease forwards';
                hobbiesList.appendChild(li);
            });
        }
        
        // 2. Generate bảng thông tin học tập
        const infoTable = document.querySelector('.info-table table');
        if (infoTable) {
            const studyData = [
                { subject: 'Ngôn ngữ Nhật', score: '9.2', grade: 'Xuất sắc' },
                { subject: 'Tiếng Anh', score: '8.8', grade: 'Giỏi' },
                { subject: 'Tin học văn phòng', score: '9.0', grade: 'Xuất sắc' },
                { subject: 'Văn học Nhật Bản', score: '8.5', grade: 'Giỏi' },
                { subject: 'Kinh tế học', score: '7.8', grade: 'Khá' }
            ];
            
            // Xóa các dòng cũ (trừ header)
            const rows = infoTable.querySelectorAll('tr:not(#table-header)');
            rows.forEach(row => row.remove());
            
            // Thêm dữ liệu mới
            studyData.forEach((item, index) => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.subject}</td>
                    <td>${item.score}</td>
                    <td>${item.grade}</td>
                `;
                row.style.animation = `fadeInLeft 0.5s ease ${index * 0.1}s forwards`;
                row.style.opacity = '0';
                infoTable.appendChild(row);
            });
        }
        
        // 3. Generate danh sách kỹ năng
        const skillsList = document.querySelector('.skills');
        if (skillsList) {
            const skillsData = [
                'Giao tiếp tiếng Nhật (N2 level)',
                'Thiết kế giao diện web với HTML/CSS',
                'Lập trình JavaScript cơ bản',
                'Sử dụng thành thạo Microsoft Office',
                'Kỹ năng thuyết trình và present',
                'Quản lý thời gian và dự án hiệu quả',
                'Dịch thuật Nhật - Việt',
                'Chỉnh sửa ảnh với Photoshop'
            ];
            
            // Xóa nội dung cũ và thêm mới
            skillsList.innerHTML = '';
            skillsData.forEach((skill, index) => {
                const li = document.createElement('li');
                li.textContent = skill;
                li.style.animation = `slideInRight 0.5s ease ${index * 0.1}s forwards`;
                li.style.opacity = '0';
                skillsList.appendChild(li);
            });
        }
        
        // Thêm CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            @keyframes fadeInLeft {
                from {
                    opacity: 0;
                    transform: translateX(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
            
            @keyframes slideInRight {
                from {
                    opacity: 0;
                    transform: translateX(20px);
                }
                to {
                    opacity: 1;
                    transform: translateX(0);
                }
            }
        `;
        document.head.appendChild(style);
        
        console.log('Đã generate thông tin cá nhân thành công!');
    }
}

// Khởi tạo các chức năng khi DOM loaded
document.addEventListener('DOMContentLoaded', function() {
    handleContactForm();
    generatePersonalInfo();
});