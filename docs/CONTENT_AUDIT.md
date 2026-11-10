# Điều chỉnh theo bản đánh giá nội dung

## Nghề và tốc độ tiến triển

`content/career-corrections.js` đặt nhóm chuyên môn theo ID trước khi khớp từ khóa. Hai nghề `bm_courier` và `imp_messenger` dùng giao liên: **Chuyến thư qua làn tên mũi đạn** và **Mật ước niêm phong huyết ấn**. Bí thư/giám sát dùng sổ sách và trách nhiệm điều hành; shaman dùng vật tổ/tổ tiên; Ghoul thức tỉnh dùng bản ngã/ký ức; nghề độc dùng độc tố/trung hòa; Mimic Slime dùng mô phỏng/thâm nhập. Bard và linh mục loài người giữ nhóm phù hợp. Các mốc vẫn đi qua hệ nhiệm vụ ba chặng hiện có.

Nhóm không dùng epoch đặt `nextPromo = age + tickYears * (1 + rank)`, với rank mới sau thăng bậc. Vẫn phải qua hai lượt bấm trước cơ hội tiếp theo. Epoch giữ khoảng nghỉ dài riêng. Ngưỡng XP vẫn `[4,8,14,22]`; không bảo đảm ai cũng đạt bậc cuối ở tuổi40, vì còn tùy sống sót, chuyên môn và các lựa chọn.

Lựa chọn có tăng chỉ số chuyên môn hoặc kiểm tra thành công bằng đúng chỉ số nghề cho +0,5 XP thực hành, tối đa1 XP mỗi lượt bấm. Không cộng hai lần nếu kết quả đã có `jobXp`; không cộng khi chỉ ngồi nghỉ hay đang bị giam. Phần cộng được ghi cùng kết quả. Các phần thưởng XP được biên tập sẵn vẫn áp dụng như cũ.

## An dưỡng và người đã mất

Kiểm tra cả sự kiện, nhánh lựa chọn lồng nhau, quest và lệnh tuyển mộ trước khi gia nhập/tạo nhóm. Khi đang An dưỡng, cảnh buộc lập nhóm không được chọn; lựa chọn đang mở từ trước cũng được từ chối an toàn. Các cảnh chăm sóc hoặc duy trì quan hệ với nhóm hiện tại vẫn khả dụng.

Đồng đội tử trận, chết già hoặc qua đời qua kịch bản chuyển khỏi `party` vào `fallen`, giữ hồ sơ và thời điểm mất. Đồng bộ cả Cast đã gia nhập và bạn đời là đồng đội. Tham chiếu `ctx.ally` từ bản lưu được đối chiếu lại với danh sách còn sống. Chỉ danh sách còn sống tham gia kiểm tra/chọn đồng đội; UI có mục kỷ niệm riêng. Hồ sơ tổ đội cũ vẫn có thể cho xem người đã mất với nhãn đúng trạng thái.

Các cảnh nhắc đích danh người đã mất bị loại; lựa chọn có người đó trong kết quả bị lọc. Không khớp nhầm Kael với Kaelen, không hiểu tên trùng cha mẹ còn sống thành đồng đội. Người đã mất không được tuyển lại khi gia nhập lại băng. Tên của nhân vật được sinh ngẫu nhiên cũng tránh tên đã lưu trong kỷ niệm.

## Phần cần viết thêm

Các vấn đề về độ phong phú, khác biệt giữa các tộc và toàn bộ tuyến sử thi cần viết từng nhánh và đọc lại, không thể giải quyết bằng đổi từ khóa hàng loạt. [Bộ 8 prompt Gemini](gemini-prompts/README.md) chia thành gói nhỏ, dùng ID thật và schema hiện hành. Các form Ghast/Lich, Humanoid Slime, Dragonblood Kobold và các tuyến kỷ nguyên đã tồn tại; prompt bổ sung nội dung thay vì tạo hệ thống trùng.

Hiệu ứng `setFree:true` được hỗ trợ rõ ràng để tuyến thoát thân mới không phụ thuộc việc đoán nghĩa câu văn. Bản thảo kiểm tra bằng `tools/check-content-draft.js`; chỉ tích hợp sau khi đọc và kiểm tra nhánh. Công cụ không tự sửa file game.

## Kiểm chứng bản sửa

- 186 kiểm tra hồi quy, gồm phân nhóm nghề, khoảng nghỉ/XP, hiệu ứng nhóm lồng nhau, mất đồng đội, bản lưu, giao diện ảnh và công cụ bản thảo.
- Mô phỏng bản sửa cuối với 100 đời mỗi tộc (1.700 đời): hoàn tất, không thiếu phương án mở, không placeholder thô, không ngoại lệ khi chạy.
- Chromium trên cả `index.html` và `dist/game.html`: chỉ hiện người còn sống, vẫn mở ảnh người đã mất qua hồ sơ cũ, chặn lời mời khi An dưỡng, đủ bốn thanh trạng thái, không tràn màn hình điện thoại; không lỗi JavaScript/thiếu tài nguyên trong các luồng kiểm tra.

Mô phỏng tự chọn ngẫu nhiên không chứng minh mọi nhánh văn học đều đúng hoặc bảo đảm tuổi thăng bậc cho từng lối chơi. Các gói viết mới vẫn cần kiểm tra sau khi Gemini hoàn thành.
