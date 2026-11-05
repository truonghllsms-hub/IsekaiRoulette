# Xếp hạng cuộc đời

Các ngưỡng hiện tại: S ≥ 90, A ≥ 72, B ≥ 40; dưới 40 là C.
Điểm vẫn tính từ tuổi thọ, danh vọng, hạnh phúc trung bình, nghề nghiệp,
tiến hóa, tổ chức và gia đình.

- A cần thêm ít nhất một điều kiện: bậc nghề ≥ 2 (đếm từ 0), có hình thái
  tiến hóa, hoàn thành ≥ 2 nhiệm vụ hoặc danh vọng ≥ 60.
- S cần thêm danh vọng ≥ 80, có hình thái tiến hóa hoặc hoàn thành ≥ 4 nhiệm vụ.
- Theo công thức được áp dụng, mọi hình thái tiến hóa đều được tính;
  chưa có phân biệt riêng giữa tiến hóa thường và hình thái tối thượng.

## Mẫu kiểm tra cân bằng

Chạy `npm run simulate:ratings -- 300 12345` để tái hiện mẫu 300 vòng đời.
Chủng tộc được quay theo trọng số thật; bot chọn ngẫu nhiên trong các phương án mở,
với xác suất 5% đổi hướng hoạt động trước mỗi lượt tiến thời gian.
Việc tổng kết không tiêu thụ bộ sinh số ngẫu nhiên của phần chơi.

So sánh hai công thức trên **cùng 300 cuộc đời**, sau các bản sửa kịch bản, **trước thay đổi độ khắc nghiệt/hồi máu**:

| Hạng | Công thức cũ | Công thức mới |
|---|---:|---:|
| S | 14 (4,7%) | 0 (0%) |
| A | 95 (31,7%) | 57 (19%) |
| B | 86 (28,7%) | 130 (43,3%) |
| C | 105 (35%) | 113 (37,7%) |

Đây là mẫu lịch sử; chạy lại lệnh trên để đo bản cân bằng mới.
Mẫu này xác nhận việc tăng độ khó đạt A/S, nhưng **chưa đạt** phân phối mong muốn
khoảng 25% A và 3–5% S. Đây là số liệu mô phỏng với một seed và một chiến thuật;
không phải thống kê người chơi, cũng không phải tỉ lệ được đảm bảo bởi công thức.

Để đối chiếu với một bản engine cũ mà vẫn giữ nguyên các cuộc đời được mô phỏng:
`node tools/simulate-ratings.js 300 12345 /duong/dan/engine-cu.js`.
