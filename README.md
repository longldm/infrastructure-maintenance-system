# infrastructure-maintenance-system
Group 2's distibuted system repo

## Hướng dẫn cài đặt  

### Frontend  

1. **Cài đặt Node.js và Yarn (hoặc npm):**  
   - Truy cập [Node.js](https://nodejs.org/) và cài đặt phiên bản LTS.  
   - Sau khi cài đặt, kiểm tra bằng lệnh:  
     ```bash
     node -v
     npm -v
     ```
   - Cài đặt Yarn (nếu sử dụng):  
     ```bash
     npm install -g yarn
     ```
     Kiểm tra phiên bản Yarn:  
     ```bash
     yarn -v
     ```

2. **Clone Repository và chuyển branch:**  
   - Clone project từ GitHub:  
     ```bash
     git clone <repository_url>
     ```
   - Di chuyển vào thư mục project:  
     ```bash
     cd infrastructure-maintenance-system
     ```
   - Chuyển sang branch `fe`:  
     ```bash
     git checkout fe
     ```

4. **Di chuyển vào thư mục fe:**
   - cd /fe/

3. **Cài đặt các thư viện cần thiết:**  
   - Nếu sử dụng `npm`:  
     ```bash
     npm install
     ```
   - Nếu sử dụng `yarn`:  
     ```bash
     yarn install
     ```

4. **Khởi động ứng dụng:**  
   - Nếu sử dụng `npm`:  
     ```bash
     npm start
     ```
   - Nếu sử dụng `yarn`:  
     ```bash
     yarn start
     ```

5. **Truy cập ứng dụng:**  
   - Mở trình duyệt và truy cập:  
     ```
     http://localhost:3000
     ```

---

### Notes:
- Hãy đảm bảo rằng bạn đang sử dụng phiên bản Node.js và Yarn/npm tương thích với dự án (kiểm tra trong file `package.json` hoặc `.nvmrc` nếu có).  
- Nếu gặp lỗi khi chạy, hãy kiểm tra lại các bước hoặc liên hệ nhóm phát triển để được hỗ trợ.
