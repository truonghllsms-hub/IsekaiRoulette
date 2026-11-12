// Each Vampire, Dragon and High Demon trade's own everyday dilemma, its aftermath and its two
// promotion trials (ranks 2 and 4). These replace the shared epoch text; progression stays from long-lives.js.
// Arc: [title, intro, survey step, temptation step, final step].
module.exports = {
  vampire_noble: {
    dilemma: 'Người hầu Human trung thành nhất của bạn, đã phục vụ bốn mươi năm, đang hấp hối. Cô xin được biến thành Huyết Tộc để tiếp tục phục vụ.',
    safe: 'Từ chối, ngồi bên cô đến cuối', tempt: 'Biến cô thành Huyết Tộc',
    good: 'Cô mất trong vòng tay bạn, thanh thản. Bạn giữ chiếc tạp dề của cô trong tủ ba trăm năm.', bad: 'Cô mất, oán trách bạn. Lời cuối của cô theo bạn rất lâu.',
    temptGood: 'Cô tỉnh dậy, bất tử, và tiếp tục phục vụ. Nhưng đôi khi bạn thấy cô đứng nhìn ánh mặt trời qua khe rèm.', temptBad: 'Cô tỉnh dậy, và không còn là cô nữa. Cơn khát đã nuốt mất người hầu trung thành.',
    fallout: 'Hậu duệ của người hầu năm ấy tìm đến lâu đài, muốn biết bà cố của họ đã đi đâu.',
    arcs: [
      ['Vũ hội của Ngàn Năm', 'Triều đình Huyết Tộc mở vũ hội ngàn năm một lần, và mỗi điệu nhảy là một liên minh.', 'Bạn học tên, dòng máu, và mối thù của mọi vị khách.', 'Một Bá tước đề nghị trao bạn ghế trong Hội đồng nếu bạn đầu độc đối thủ của hắn.', 'Bạn nhảy với mọi phe, và rời vũ hội với ba liên minh và không một vết máu.'],
      ['Ngai Bóng Đêm', 'Vị Vua Đêm cũ chọn đón bình minh, và ngai trống.', 'Bạn đi thăm từng gia tộc Huyết Tộc, nghe điều họ sợ.', 'Một phe muốn bạn lên ngai bằng cách tàn sát phe kia.', 'Bạn lên ngai bằng lời hứa với mọi gia tộc, và giữ được từng lời.'],
    ],
  },
  vampire_blade: {
    dilemma: 'Hợp đồng mới: một đứa trẻ Human, con của một vị vua. Kẻ thuê trả bằng vàng đủ mua cả một lâu đài.',
    safe: 'Từ chối, và cảnh báo nhà vua', tempt: 'Nhận hợp đồng',
    good: 'Nhà vua tăng gấp đôi lính canh. Kẻ thuê bị lộ. Đứa trẻ lớn lên, và trở thành vị vua công bằng nhất triều đại.', bad: 'Nhà vua không tin lời cảnh báo của một Huyết Tộc. Kẻ thuê tìm sát thủ khác.',
    temptGood: 'Bạn đến, nhìn đứa trẻ ngủ, và không làm gì. Bạn trả lại vàng. Kẻ thuê không bao giờ hiểu.', temptBad: 'Bạn làm xong. Vàng của bạn. Bạn không bao giờ dùng đến nó.',
    fallout: 'Một sát thủ khác bắt đầu săn bạn, và hắn mang theo một đồng vàng từ hợp đồng năm ấy.',
    arcs: [
      ['Mái nhà của Sanctus', 'Umbra giao bài thử: đi qua mọi mái nhà của Sanctus trong một đêm mà không ai thấy.', 'Bạn nghiên cứu lộ trình tuần tra của lính canh suốt một tháng.', 'Một sát thủ khác đề nghị gây hỗn loạn để đánh lạc hướng lính canh.', 'Bạn đi qua mọi mái nhà, và để lại một đóa hồng đen trên tháp chuông cao nhất.'],
      ['Mục tiêu cuối cùng', 'Mục tiêu cuối cùng của mọi Night Lord là người thầy của chính họ.', 'Bạn lần theo dấu người thầy qua ba thành phố.', 'Hội đề nghị bạn kết thúc nhanh, không đối mặt.', 'Bạn đối mặt người thầy trên mái nhà, và cả hai cùng biết: chỉ một người rời đi.'],
    ],
  },
  vampire_mage: {
    dilemma: 'Một pháp sư Human cầu xin bạn dạy Huyết thuật để cứu vợ đang hấp hối. Huyết thuật sẽ biến ông thành một nửa Huyết Tộc.',
    safe: 'Từ chối, tìm cách khác cứu vợ ông', tempt: 'Dạy ông',
    good: 'Bạn tìm ra một bài thuốc từ máu thú. Vợ ông sống. Ông vẫn là người.', bad: 'Không có cách khác. Vợ ông mất. Ông không bao giờ tha thứ cho bạn.',
    temptGood: 'Ông cứu được vợ. Ông không bao giờ ra ngoài ban ngày được nữa. Vợ ông ngồi cạnh ông mỗi đêm.', temptBad: 'Huyết thuật nuốt ông trước khi ông kịp cứu vợ.',
    fallout: 'Tháp Ngà biết có một Huyết Tộc dạy Huyết thuật cho người, và cử người đi điều tra.',
    arcs: [
      ['Đóa hồng đỏ thẫm', 'Bài thử của mọi pháp sư Huyết thuật: làm một giọt máu nở thành đóa hồng trọn vẹn.', 'Bạn luyện tập mỗi đêm suốt mười năm.', 'Một pháp sư khác đề nghị dạy bạn mẹo dùng máu người thay máu mình.', 'Đóa hồng của bạn nở trọn, từ máu của chính bạn.'],
      ['Mạch máu của thế giới', 'Một dịch bệnh lan khắp lục địa, và chỉ Huyết thuật cổ nhất mới chữa được.', 'Bạn đọc mọi sách cổ, tìm nghi thức thất truyền.', 'Hắc Nguyệt Hội đề nghị trao nghi thức, đổi lấy một nghìn sinh mạng.', 'Bạn tự tìm ra nghi thức, và trả giá bằng máu của chính mình.'],
    ],
  },
  vampire_hunter: {
    dilemma: 'Một con Griffon bị thương nằm dưới chân núi. Máu nó thơm như máu người. Bạn đã đói ba tháng.',
    safe: 'Băng bó cho nó, đi săn thứ khác', tempt: 'Uống',
    good: 'Nó bay đi sau một tuần. Một năm sau, nó thả trước hang bạn một con nai.', bad: 'Bạn đói thêm một tháng, và gần mất kiểm soát.',
    temptGood: 'Máu Griffon mạnh hơn máu người. Bạn khỏe gấp đôi suốt một năm.', temptBad: 'Bầy Griffon kéo đến, và bạn phải rời rừng.',
    fallout: 'Bầy Griffon bắt đầu bay vòng trên lãnh thổ của bạn. Bạn không chắc chúng đến để cảm ơn hay để trả thù.',
    arcs: [
      ['Con mồi của trăng máu', 'Một con quái thú khổng lồ xuất hiện mỗi kỳ trăng máu, và không ai săn được nó.', 'Bạn lần theo dấu nó qua ba kỳ trăng.', 'Một thợ săn Human đề nghị hợp sức, đổi lấy bộ da.', 'Bạn hạ nó một mình, và để bộ da cho người thợ săn.'],
      ['Vua của rừng đêm', 'Bầy sói đêm, Griffon, và mọi quái thú trong rừng đang tranh nhau lãnh thổ.', 'Bạn đi khắp rừng, học ranh giới của từng loài.', 'Một con Rồng con đề nghị liên minh để quét sạch rừng.', 'Bạn vẽ lại ranh giới cho mọi loài, và rừng yên bình một thế kỷ.'],
    ],
  },
  vampire_hidden: {
    dilemma: 'Một đứa trẻ Human nhìn thấy bạn trong lốt người, và nhận ra: bạn không có bóng dưới ánh đèn.',
    safe: 'Nói thật với nó, xin giữ bí mật', tempt: 'Xóa ký ức của nó',
    good: 'Nó giữ bí mật suốt đời. Khi già, nó viết lại trong nhật ký: “Ta từng có một người bạn không có bóng.”', bad: 'Nó kể với mẹ. Mẹ nó không tin. Nhưng Inquisitor thì tin.',
    temptGood: 'Nó quên. Bạn nhìn nó lớn lên, và không bao giờ tiến lại gần nữa.', temptBad: 'Phép xóa ký ức để lại một khoảng trống trong đầu nó. Nó lớn lên với cảm giác đã mất thứ gì đó.',
    fallout: 'Đứa trẻ năm ấy, giờ đã già, gõ cửa nhà bạn.',
    arcs: [
      ['Mặt nạ thứ mười', 'Đã đến lúc bạn đổi danh tính lần thứ mười. Mọi thứ phải hoàn hảo.', 'Bạn tạo ra một cuộc đời giả: giấy tờ, bạn bè, cả một cái tên.', 'Một quan chức đề nghị làm giấy tờ cho bạn, đổi lấy một bí mật.', 'Bạn bước vào cuộc đời mới, và không ai nghi ngờ.'],
      ['Vương triều thầm lặng', 'Một vương triều Human sắp sụp đổ vì nội chiến, và bạn đã ở bên nó mười đời vua.', 'Bạn thì thầm với cả hai phe, tìm điểm chung.', 'Một phe đề nghị bạn ngồi lên ngai, lộ mặt thật.', 'Bạn hòa giải hai phe từ bóng tối, và vương triều đứng vững thêm một thế kỷ.'],
    ],
  },
  dragon_hoard: {
    dilemma: 'Một vương quốc Human đang chết đói. Họ cầu xin bạn bán lại một phần vàng để mua lương thực.',
    safe: 'Cho họ mượn, không lấy lãi', tempt: 'Đòi họ trả gấp đôi',
    good: 'Vương quốc sống qua nạn đói. Một trăm năm sau, họ trả đủ, kèm một bức tượng Rồng bằng vàng.', bad: 'Họ không bao giờ trả. Bạn đếm thiếu mỗi đêm.',
    temptGood: 'Họ trả gấp đôi, sau ba thế hệ. Đống vàng lớn thêm. Vương quốc ghét bạn.', temptBad: 'Họ không trả nổi. Họ cử Dũng Giả đến thay.',
    fallout: 'Vương quốc năm ấy cử một sứ giả đến hang. Họ mang theo một món nợ, hoặc một món quà.',
    arcs: [
      ['Đống vàng đầu tiên', 'Mọi Rồng con phải tự tích lũy đống vàng đầu tiên, không ai cho.', 'Bạn bay khắp lục địa, tìm những kho báu bị lãng quên.', 'Một Rồng già đề nghị chia một phần đống vàng của nó, đổi lấy sự phục tùng.', 'Bạn nằm trên đống vàng đầu tiên của mình, nhỏ nhưng là của riêng bạn.'],
      ['Kho báu của Kỷ Nguyên', 'Truyền thuyết kể về kho báu của vị vua đầu tiên, chôn trong lòng núi lửa.', 'Bạn lặn vào dung nham, lần theo dấu vết cổ.', 'Một Ma Vương đề nghị chia đôi, nếu bạn giúp hắn mở cổng Vực Thẳm.', 'Bạn mang kho báu về, và để lại chiếc vương miện cho vương quốc mà nó thuộc về.'],
    ],
  },
  dragon_war: {
    dilemma: 'Một đạo quân Human cầu xin bạn giúp đánh đạo quân Ma Vương. Nhưng chính đạo quân này từng thiêu một làng của tộc Rồng.',
    safe: 'Giúp họ', tempt: 'Để họ tự lo',
    good: 'Đạo quân Ma Vương rút. Vị tướng Human quỳ trước bạn, và xin lỗi cho tổ tiên mình.', bad: 'Bạn giúp, nhưng đạo quân Human vẫn thua. Họ trách bạn đến muộn.',
    temptGood: 'Đạo quân Human tự thắng, với cái giá đắt. Họ hiểu Rồng không phải để sai khiến.', temptBad: 'Đạo quân Human bị xóa sổ. Ma Vương tiến vào vùng đất của Rồng.',
    fallout: 'Hậu duệ của vị tướng năm ấy đến núi của bạn, mang theo lá cờ của tổ tiên.',
    arcs: [
      ['Trận chiến trên mây', 'Một Rồng chiến khác thách bạn tranh quyền làm chủ bầu trời phía bắc.', 'Bạn bay khắp bầu trời phía bắc, học gió và mây.', 'Một pháp sư đề nghị nguyền rủa đối thủ trước trận.', 'Bạn thắng trận đấu trên mây, và để đối thủ bay đi với danh dự.'],
      ['Ngày tận thế', 'Một Cổ Thần thức dậy, và mọi Rồng chiến được gọi.', 'Bạn tập hợp Rồng từ mọi phương trời.', 'Cổ Thần đề nghị tha cho tộc Rồng nếu bạn để nó nuốt thế giới.', 'Mười Rồng chiến bay cùng nhau, và Cổ Thần ngủ lại thêm một Kỷ Nguyên.'],
    ],
  },
  dragon_sage: {
    dilemma: 'Một học giả Human xin bạn tiết lộ bí mật của lửa Rồng. Ông muốn dùng nó để sưởi ấm cả một vương quốc lạnh giá.',
    safe: 'Dạy ông một phần, đủ để sưởi', tempt: 'Dạy hết',
    good: 'Vương quốc lạnh giá có lửa không bao giờ tắt. Họ không biết làm vũ khí từ nó.', bad: 'Phần bạn dạy không đủ. Vương quốc vẫn lạnh. Học giả thất vọng.',
    temptGood: 'Vương quốc ấm lên, và giàu lên. Ba thế hệ sau, họ có pháo lửa Rồng.', temptBad: 'Lửa Rồng thiêu rụi phòng thí nghiệm, cùng học giả.',
    fallout: 'Vương quốc năm ấy gửi lời cảm ơn, hoặc gửi một đạo quân. Tùy những gì bạn đã dạy.',
    arcs: [
      ['Câu hỏi của Tháp Ngà', 'Tháp Ngà gửi đến một câu hỏi mà không pháp sư nào trả lời được.', 'Bạn suy nghĩ một trăm năm.', 'Một Ma Vương đề nghị trao câu trả lời, đổi lấy một bí mật của Rồng.', 'Bạn tìm ra câu trả lời, và gửi về Tháp Ngà kèm một câu hỏi mới.'],
      ['Pháp tắc thứ mười ba', 'Có mười hai pháp tắc của thế giới. Bạn tin còn một pháp tắc thứ mười ba.', 'Bạn nhìn vào sao, vào Hư Vô, vào tim của núi lửa.', 'Hư Vô đề nghị cho bạn thấy pháp tắc ấy, nếu bạn mở cửa.', 'Bạn tìm ra pháp tắc thứ mười ba, và chọn không dùng nó.'],
    ],
  },
  hd_general: {
    dilemma: 'Một tiểu đoàn High Orc dưới trướng bạn bị vây. Cứu họ nghĩa là bỏ lỡ cơ hội chiếm một thành trì quan trọng.',
    safe: 'Cứu tiểu đoàn', tempt: 'Chiếm thành trì',
    good: 'Tiểu đoàn sống sót. Thành trì vẫn đứng. Quân đoàn biết bạn không bỏ ai lại.', bad: 'Bạn đến muộn. Một nửa tiểu đoàn đã ngã.',
    temptGood: 'Thành trì thất thủ. Tiểu đoàn, may mắn, tự phá vây được.', temptBad: 'Thành trì thất thủ. Tiểu đoàn không còn ai.',
    fallout: 'Những High Orc sống sót, hoặc gia đình của những kẻ đã ngã, đến lều chỉ huy của bạn.',
    arcs: [
      ['Trận Đèo Xương', 'Quân đoàn phải giữ Đèo Xương trước một đạo quân Human đông gấp ba.', 'Bạn khảo sát từng tảng đá, từng khe núi.', 'Ma Vương ra lệnh hy sinh tiểu đoàn tiên phong làm mồi nhử.', 'Bạn giữ đèo bằng địa hình, và tiểu đoàn tiên phong trở về đủ.'],
      ['Kỷ Nguyên Lửa', 'Chiến tranh Kỷ Nguyên nổ ra, và Ma Vương trao bạn toàn bộ quân đoàn Vực Thẳm.', 'Bạn gặp từng tướng, từng tiểu đoàn trưởng.', 'Một tướng đề nghị dùng phép hủy diệt để kết thúc nhanh.', 'Bạn thắng Kỷ Nguyên Lửa bằng chiến thuật, không bằng phép hủy diệt.'],
    ],
  },
  hd_archmage: {
    dilemma: 'Một học trò xin bạn dạy phép hồi sinh người chết. Cha nó vừa mất.',
    safe: 'Từ chối, giải thích cái giá', tempt: 'Dạy nó',
    good: 'Nó khóc, giận dữ, rồi hiểu. Nó trở thành pháp sư giỏi nhất thế hệ, và không bao giờ đụng đến phép hồi sinh.', bad: 'Nó bỏ đi, tự tìm cấm thư.',
    temptGood: 'Cha nó tỉnh dậy, và không còn là cha nó. Nó tự tay trả ông về.', temptBad: 'Phép hồi sinh nuốt cả học trò.',
    fallout: 'Một học trò khác hỏi bạn câu hỏi giống hệt.',
    arcs: [
      ['Ma trận Vực Thẳm', 'Hội đồng Ma Giới yêu cầu một ma trận phòng thủ bao trùm cả tầng thứ ba.', 'Bạn khắc từng ký tự, mất một thế kỷ.', 'Một Đại Công Tước đề nghị dùng linh hồn nô lệ để cấp năng lượng.', 'Ma trận hoàn thành, chạy bằng ma lực của chính Vực Thẳm.'],
      ['Phép của các Thần', 'Một phép thuật mà chỉ Thần linh được dùng, bị lộ ra trong một cấm thư.', 'Bạn đọc nó, từng chữ, hiểu từng giá.', 'Ma Vương muốn bạn dạy nó cho ông.', 'Bạn hiểu phép ấy, và phá hủy cấm thư trước khi ai khác đọc được.'],
    ],
  },
  hd_lord: {
    dilemma: 'Imp ở lãnh địa bạn xin giảm thuế máu. Nếu giảm, các lãnh chúa khác sẽ cho rằng bạn yếu.',
    safe: 'Giảm thuế', tempt: 'Giữ nguyên',
    good: 'Imp làm việc chăm hơn. Lãnh địa giàu lên. Các lãnh chúa khác bắt đầu bắt chước.', bad: 'Một lãnh chúa láng giềng lấy cớ đó để tấn công. Bạn thắng, nhưng tốn kém.',
    temptGood: 'Lãnh địa ổn định. Imp không phản đối nữa. Họ chỉ im lặng.', temptBad: 'Imp đình công. Mỏ ngừng hoạt động một thập kỷ.',
    fallout: 'Imp từ lãnh địa láng giềng bắt đầu di cư đến lãnh địa của bạn, hoặc rời khỏi nó.',
    arcs: [
      ['Yến tiệc ba tầng', 'Ba Đại Công Tước mời bạn dự yến tiệc cùng lúc, ở ba tầng khác nhau. Chọn một là thù hai.', 'Bạn tìm hiểu điều mỗi Đại Công Tước muốn.', 'Một gián điệp đề nghị đầu độc cả ba.', 'Bạn mời cả ba đến lâu đài của mình, và họ rời đi với một hiệp ước.'],
      ['Phán xét của Thần', 'Thần linh hiện xuống, phán xét liệu bạn có quá quyền năng.', 'Bạn chuẩn bị câu trả lời suốt một Kỷ Nguyên.', 'Ma Vương đề nghị chiến đấu cùng bạn chống lại Thần.', 'Bạn đứng trước Thần một mình, và thuyết phục Thần rằng quyền năng của bạn phục vụ kẻ yếu.'],
    ],
  },
};
