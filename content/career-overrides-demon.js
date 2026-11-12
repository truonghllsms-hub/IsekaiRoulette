// Each Demon trade's own everyday dilemma, its aftermath and its two promotion trials (ranks 2 and 4).
// These replace the shared long-lived "heritage" text for Demon trades; progression stays from long-lives.js.
// Arc: [title, intro, survey step, temptation step, final step].
module.exports = {
  demon_dk: {
    dilemma: 'Một tân binh Ma tộc trong đơn vị bạn bỏ chạy giữa trận. Luật quân đoàn: kẻ bỏ chạy bị chém đầu trước hàng quân.',
    safe: 'Nhận trách nhiệm thay cậu ta', tempt: 'Thi hành luật',
    good: 'Bạn bị giáng một bậc. Tân binh được tha. Trận sau, cậu ta đứng hàng đầu, và không lùi một bước.', bad: 'Cấp trên không chấp nhận. Cả bạn lẫn tân binh bị phạt roi trước hàng quân.',
    temptGood: 'Hàng quân im lặng. Không ai bỏ chạy nữa. Bạn không ngủ được nhiều đêm.', temptBad: 'Hàng quân nhìn bạn khác đi. Trận sau, ba kỵ sĩ xin đổi đơn vị.',
    fallout: 'Gia đình của tân binh năm ấy gửi đến doanh trại một lá thư, gửi đích danh bạn.',
    arcs: [
      ['Cổng thành Đồng Bằng', 'Quân đoàn được lệnh chiếm một cổng thành ở Đồng Bằng Thánh Quang.', 'Bạn trinh sát tường thành ba đêm, đếm lính gác.', 'Đại tướng muốn bạn dùng tù binh làm khiên người khi xông lên.', 'Bạn chiếm cổng thành bằng một cuộc tấn công đêm, không cần khiên người.'],
      ['Hiệp sĩ của Vực Thẳm', 'Ma Vương tổ chức đại hội kỵ sĩ, chọn ra Abyss Knight của thế kỷ.', 'Bạn đấu với từng kỵ sĩ mạnh nhất, học từng đòn.', 'Một đối thủ đề nghị nhường trận, đổi lấy một chức vụ.', 'Bạn thắng trận chung kết bằng đòn cuối cùng, sạch sẽ, trước mặt Ma Vương.'],
    ],
  },
  demon_wl: {
    dilemma: 'Một Warlock trẻ xin bạn dạy câu thần chú triệu hồi Huyết Thú. Bạn biết nó chưa đủ sức giữ sợi xích.',
    safe: 'Từ chối, dạy phong ấn trước', tempt: 'Dạy, nó sẽ tự học được',
    good: 'Nó giận, nhưng học phong ấn. Một năm sau, nó tự triệu hồi Huyết Thú, và giữ được.', bad: 'Nó tìm thầy khác dạy. Bạn nghe tin nó mất tích trong một nghi lễ.',
    temptGood: 'Nó học nhanh, triệu hồi thành công lần đầu. Bạn vẫn lo cho lần thứ hai.', temptBad: 'Huyết Thú thoát khỏi xích. Tháp pháp sư mất một tầng.',
    fallout: 'Thầy của Warlock trẻ năm ấy đến tìm bạn, hỏi bạn đã dạy nó những gì.',
    arcs: [
      ['Vạc của Ngàn Linh Hồn', 'Một thí nghiệm dung hợp linh hồn của các pháp sư khác vượt khỏi kiểm soát.', 'Bạn đọc những ghi chép bị bỏ lại, tìm ra lỗi trong vòng tròn.', 'Hội đồng muốn bạn hoàn thành thí nghiệm thay vì dừng nó.', 'Bạn đóng vạc, và thả những linh hồn bị kẹt bên trong.'],
      ['Cổng Vực Thẳm Thứ Bảy', 'Cổng Vực Thẳm thứ bảy mở ra, và không pháp sư nào đóng được.', 'Bạn ngồi bên cổng bảy ngày, nghe nó thở.', 'Cổ Thần đề nghị cho bạn quyền năng vô hạn nếu bạn bước qua.', 'Bạn đóng cổng bằng vòng phong ấn cổ nhất, và từ chối lời đề nghị.'],
    ],
  },
  demon_bu: {
    dilemma: 'Bạn phát hiện một Đại thần biển thủ ngân khố. Nếu báo cáo, bạn sẽ có kẻ thù quyền lực nhất triều đình.',
    safe: 'Báo cáo, kèm bằng chứng', tempt: 'Im lặng, giữ bằng chứng làm con bài',
    good: 'Ma Vương đọc báo cáo. Đại thần bị xử. Triều đình sợ bạn từ đó.', bad: 'Báo cáo bị chặn. Đại thần biết bạn đã cố.',
    temptGood: 'Đại thần không biết bạn biết. Nhưng bạn có một con bài, khi cần.', temptBad: 'Đại thần phát hiện bạn giữ bằng chứng. Hắn bắt đầu tìm cách loại bạn.',
    fallout: 'Một chấp sự khác tìm đến bạn, mang theo bằng chứng về cùng một Đại thần.',
    arcs: [
      ['Kiểm toán quân đoàn', 'Ma Vương ra lệnh kiểm toán quân đoàn tuyến đầu, nơi khẩu phần cứ biến mất.', 'Bạn đối chiếu sổ kho, sổ quân, và sổ chợ đen.', 'Tướng quân đề nghị chia cho bạn một phần, nếu bạn ghi sổ là đủ.', 'Bạn trình sổ hai cột lên Ma Vương, và khẩu phần trở về đúng chỗ.'],
      ['Ngân khố của Ma Giới', 'Ngân khố cạn kiệt sau chiến tranh, và Ma Vương cần một người làm đầy nó.', 'Bạn đi khắp Ma Giới, đếm từng nguồn thu.', 'Hội đồng muốn tăng thuế dân thường gấp đôi.', 'Bạn làm đầy ngân khố bằng thuế quý tộc, và dân thường sống qua mùa đông.'],
    ],
  },
  demon_me: {
    dilemma: 'Một khách hàng muốn mua một lọ thuốc độc không dấu vết. Hắn trả gấp mười, và không nói dùng vào đâu.',
    safe: 'Từ chối', tempt: 'Bán, không hỏi',
    good: 'Hắn bỏ đi. Ba tháng sau, bạn nghe tin hắn bị bắt vì mua độc ở chỗ khác, trước khi kịp dùng.', bad: 'Hắn mua ở chỗ khác. Bạn nghe tin một quý tộc chết bất thường.',
    temptGood: 'Bạn giàu thêm. Bạn không bao giờ biết lọ thuốc đã đi đâu.', temptBad: 'Lọ thuốc giết một người bạn quen. Bạn nhận ra nhãn hàng của mình.',
    fallout: 'Một Kẻ Thẩm Vấn đến chợ đen, hỏi ai đã bán một lọ độc không dấu vết.',
    arcs: [
      ['Đường buôn qua núi lửa', 'Tuyến đường buôn chính bị chặn, và bạn cần một con đường mới qua núi lửa.', 'Bạn khảo sát từng hẻm núi, từng dòng dung nham.', 'Một băng cướp đề nghị bảo kê, đổi lấy một nửa hàng.', 'Bạn mở đường mới qua núi lửa, và không trả cho băng cướp một đồng.'],
      ['Phiên chợ của hai cõi', 'Lần đầu tiên, Ma tộc và Human cùng mở một phiên chợ ở biên giới.', 'Bạn chuẩn bị hàng hóa mà cả hai bên đều muốn.', 'Một Đại thần muốn bạn bán vũ khí cho cả hai bên.', 'Phiên chợ diễn ra suôn sẻ, và không ai mang vũ khí về nhà.'],
    ],
  },
  demon_bs: {
    dilemma: 'Ma Vương đặt một thanh ma kiếm, và gửi kèm linh hồn của một đứa trẻ Human làm lõi.',
    safe: 'Từ chối, đề nghị lõi khác', tempt: 'Làm theo lệnh',
    good: 'Ma Vương giận, nhưng chấp nhận lõi từ linh hồn một tử tù. Bạn thả linh hồn đứa trẻ trong đêm.', bad: 'Ma Vương không chấp nhận. Bạn bị phạt mười năm làm thợ rèn thường.',
    temptGood: 'Thanh kiếm mạnh nhất bạn từng rèn. Nó khóc mỗi đêm.', temptBad: 'Linh hồn đứa trẻ quá yếu. Thanh kiếm vỡ ngay lần đầu dùng.',
    fallout: 'Thanh kiếm năm ấy, hoặc mảnh vỡ của nó, được mang trở lại lò của bạn.',
    arcs: [
      ['Lò lửa Vực Thẳm', 'Lò lửa chính của Ma Đô sắp tắt, và cả quân đoàn sẽ không có vũ khí.', 'Bạn xuống đáy lò, đọc những vòng rune cổ.', 'Một pháp sư đề nghị dùng linh hồn tù binh làm nhiên liệu.', 'Bạn nhóm lại lò bằng thiên thạch, không cần linh hồn nào.'],
      ['Thanh kiếm của Ma Vương', 'Ma Vương muốn một thanh kiếm có thể chém đứt ánh sáng Thánh Quang.', 'Bạn nghiên cứu ánh sáng ấy suốt một năm.', 'Hắc Nguyệt Hội đề nghị cung cấp linh hồn một Thánh Nữ.', 'Bạn rèn thanh kiếm từ sắt và bóng tối thuần, không linh hồn, và nó vẫn chém được ánh sáng.'],
    ],
  },
  demon_bh: {
    dilemma: 'Con mồi của bạn đang trốn trong nhà một gia đình Human tốt bụng, những người không biết hắn là ai.',
    safe: 'Chờ hắn ra khỏi nhà', tempt: 'Xông vào bắt ngay',
    good: 'Bạn chờ ba ngày. Hắn ra ngoài, và bạn bắt hắn ở bìa rừng. Gia đình kia không bao giờ biết.', bad: 'Hắn phát hiện bạn trong lúc chờ, và trốn thoát.',
    temptGood: 'Bắt gọn. Gia đình kia sợ hãi, nhưng không ai bị thương.', temptBad: 'Hắn bắt đứa con của gia đình làm con tin.',
    fallout: 'Gia đình Human năm ấy kể chuyện về một thợ săn Ma tộc. Họ kể rất khác nhau, tùy bạn đã chọn gì.',
    arcs: [
      ['Con mồi trong sương mù', 'Một sát thủ Vực Thẳm đang săn các quan chức Ma Giới, và Hội đồng treo thưởng gấp mười.', 'Bạn lần theo dấu hắn qua ba thành phố.', 'Hắn đề nghị chia đôi số vàng hắn đã cướp, nếu bạn để hắn đi.', 'Bạn bắt hắn ở bến cảng, và mang về cả số vàng lẫn danh sách những kẻ thuê hắn.'],
      ['Con mồi cuối cùng', 'Một lệnh truy nã không có tên, không có tiền thưởng, chỉ có một câu: “Kẻ săn giỏi nhất Ma Giới.” Đó là bạn.', 'Bạn lần theo chính những dấu vết mình để lại.', 'Kẻ ra lệnh đề nghị hủy lệnh nếu bạn làm cho hắn một việc.', 'Bạn tìm ra kẻ ra lệnh trước khi hắn tìm ra bạn, và kết thúc cuộc săn.'],
    ],
  },
  demon_spy: {
    dilemma: 'Ma Vương ra lệnh bạn đổ tội cho một gia đình Human vô tội, để chia rẽ triều đình Sanctus.',
    safe: 'Tìm một mục tiêu có tội thật', tempt: 'Làm theo lệnh',
    good: 'Bạn tìm ra một quan chức tham nhũng thật, và đổ tội cho hắn. Triều đình Sanctus vẫn chia rẽ. Không ai vô tội phải chết.', bad: 'Không tìm được ai. Ma Vương nghi ngờ lòng trung thành của bạn.',
    temptGood: 'Triều đình Sanctus chia rẽ. Gia đình kia bị đày đi xa. Bạn tự nhủ ít ra họ còn sống.', temptBad: 'Gia đình kia bị xử. Bạn đứng trong đám đông, trong vỏ bọc Human, và xem.',
    fallout: 'Một người sống sót của gia đình năm ấy đang điều tra, và manh mối dẫn về bạn.',
    arcs: [
      ['Vũ hội ở Sanctus', 'Bạn được lệnh trà trộn vào vũ hội của hoàng gia Sanctus để lấy một bức thư mật.', 'Bạn học từng điệu nhảy, từng cái cúi chào.', 'Một quý tộc Human nhận ra bạn, và đề nghị im lặng đổi lấy bức thư.', 'Bạn lấy được bức thư, và rời vũ hội mà không ai nhận ra.'],
      ['Mặt nạ cuối cùng', 'Ma Vương và Sanctus sắp ký hòa ước, và cả hai bên đều cần một người hiểu bên kia.', 'Bạn đọc lại mọi báo cáo của mình suốt trăm năm.', 'Một phe trong Ma Giới muốn bạn phá hòa ước.', 'Bạn tháo mặt nạ trước cả hai phái đoàn, và hòa ước được ký vì có một người đứng giữa.'],
    ],
  },
};
