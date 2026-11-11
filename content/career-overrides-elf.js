// Each Elf trade's own everyday dilemma, its aftermath and its two promotion trials (ranks 2 and 4).
// Arc: [title, intro, survey step, temptation step, final step].
// These replace the shared long-lived "heritage" text for Elf trades; progression stays from long-lives.js.
module.exports = {
  elf_ranger: {
    dilemma: 'Một nhóm tiều phu Human đã vượt ranh giới Đại Ngàn ba bước chân để đốn một cây sồi già. Luật cổ cho phép bạn bắn cảnh cáo, rồi bắn thật nếu họ không lùi.',
    safe: 'Hiện thân và nói chuyện với họ', tempt: 'Bắn một mũi tên sượt qua tai kẻ cầm rìu',
    good: 'Họ sợ, nhưng nghe. Một người kể làng họ đang thiếu củi cho mùa đông. Bạn chỉ cho họ một khu cây đổ do bão ngoài ranh giới. Họ không quay lại nữa.', bad: 'Họ bỏ chạy ngay khi thấy bạn, để lại cây sồi bị chặt dở. Đêm ấy làng họ kể rằng rừng có ma.',
    temptGood: 'Mũi tên ghim vào thân cây cạnh tai hắn. Cả nhóm bỏ rìu chạy. Ranh giới được giữ, và tin đồn về cung thủ vô hình lan khắp các làng biên.', temptBad: 'Kẻ cầm rìu giật mình quay đầu, và mũi tên rạch má hắn. Máu Human đổ trên đất Đại Ngàn, và lãnh chúa của hắn gửi thư đòi bồi thường.',
    fallout: 'Làng tiều phu năm ấy giờ đã có một con đường mòn dẫn thẳng đến ranh giới, và những đứa trẻ trong làng được dạy rằng rừng có người canh.',
    arcs: [
      ['Lối mòn của bầy hươu bạc', 'Bầy hươu bạc, linh thú dẫn đường của Đại Ngàn, đã đổi lối di cư. Hội đồng Tuần Rừng muốn bạn tìm ra lý do trước mùa lá rụng.', 'Bạn theo vết móng qua ba thung lũng, đọc từng cành gãy và từng vũng nước cạn.', 'Một thợ săn Human đề nghị chỉ chỗ bầy hươu, đổi lại một con non. Bạn có thể tìm nhanh hơn nếu nhận lời.', 'Bạn tìm ra nguồn suối bị một tảng đá lở chặn lại, và cùng bầy hươu mở lối cũ.'],
      ['Mùa săn cuối cùng của Đại Ngàn', 'Một sinh vật từ vùng đất chết đã vượt qua rìa rừng, để lại những vệt cây khô héo dài hàng dặm. Không Kiểm Lâm nào trở về sau khi đuổi theo nó.', 'Bạn dựng bản đồ từ những vệt cây chết, tìm ra nhịp đi của nó.', 'Hội đồng đề nghị đốt cả một khu rừng để chặn đường nó. Nhanh, chắc chắn, nhưng mất một trăm năm để rừng mọc lại.', 'Bạn dụ sinh vật vào vùng đất cằn ngoài rìa rừng và hạ nó bằng mũi tên cuối cùng trong ống.'],
    ],
  },
  elf_spirit: {
    dilemma: 'Một linh hồn gió trẻ đã bám theo bạn nhiều tuần, muốn được ký khế ước. Nó còn quá non, và khế ước sẽ ràng nó vào bạn trước khi nó kịp hiểu mình là gì.',
    safe: 'Từ chối, để nó tự lớn', tempt: 'Ký khế ước, nó sẽ lớn bên cạnh bạn',
    good: 'Linh hồn gió buồn bã bỏ đi. Một trăm năm sau, nó quay lại, đã lớn, và tự nguyện ký với bạn.', bad: 'Linh hồn gió bị một Thần Triệu Hồi khác ký mất ngay tuần sau. Bạn thấy nó bị dùng để thổi thuyền buôn, lặng lẽ và mệt mỏi.',
    temptGood: 'Nó lớn nhanh bên bạn, mạnh mẽ và trung thành. Nhưng đôi khi bạn thấy nó nhìn những linh hồn gió tự do bay qua.', temptBad: 'Khế ước quá nặng với một linh hồn non. Nó tan một nửa, và bạn mất một phần sức mạnh cùng với nó.',
    fallout: 'Các linh hồn gió ở Đại Ngàn bắt đầu kể với nhau về bạn, và câu chuyện ấy quyết định ai sẽ đến gần bạn, ai sẽ tránh xa.',
    arcs: [
      ['Tiếng gọi của Suối Lặng', 'Linh hồn của Suối Lặng đã ngừng trả lời mọi Thần Triệu Hồi. Nước suối vẫn chảy, nhưng không còn ai nghe được nó.', 'Bạn ngồi bên suối bảy ngày, không gọi, chỉ nghe.', 'Một Trưởng Lão đưa cho bạn một lời chú cổ có thể ép linh hồn lên tiếng.', 'Linh hồn suối cuối cùng nói chuyện với bạn, vì bạn là người đầu tiên chờ nó tự lên tiếng.'],
      ['Hóa thân của Yggdrasil', 'Cây Thế Giới cần một Thần Triệu Hồi đủ mạnh để làm vật chứa cho ý chí của nó trong một đêm. Không ai biết người làm vật chứa sẽ còn là mình sau đó không.', 'Bạn nói chuyện với từng linh hồn đã ký khế ước với bạn, hỏi xem họ có đi cùng bạn không.', 'Hội đồng muốn bạn dùng đêm ấy để hỏi Cây Thế Giới về tương lai của chính Hội đồng.', 'Bạn mở lòng cho ý chí của Yggdrasil đi qua, và mang về một lời nhắn dành cho cả Đại Ngàn.'],
    ],
  },
  elf_herb: {
    dilemma: 'Một thương nhân Human trả giá gấp năm lần cho rễ Nguyệt Thảo, loại thảo dược chỉ mọc mười năm một lần. Bạn biết hắn sẽ dùng nó làm thuốc trường sinh giả bán cho quý tộc.',
    safe: 'Từ chối bán', tempt: 'Bán, tiền sẽ mua được thuốc cho cả làng',
    good: 'Thương nhân bỏ đi, chửi rủa. Mùa sau, Nguyệt Thảo tự gieo hạt, và đồng thảo dược có thêm mười cây mới.', bad: 'Thương nhân thuê người khác hái trộm. Bạn mất cả rễ lẫn hạt.',
    temptGood: 'Bạn mua được thuốc cho cả làng biên suốt mùa dịch. Ở Sanctus, một quý tộc chết vì uống thuốc trường sinh giả, và không ai biết rễ đến từ đâu.', temptBad: 'Thương nhân quỵt nửa tiền, và đồng Nguyệt Thảo mất mười năm để mọc lại.',
    fallout: 'Tin về rễ Nguyệt Thảo lan đến Sanctus. Giờ có ba thương nhân khác đang dò hỏi đường vào đồng thảo dược của bạn.',
    arcs: [
      ['Mùa dịch lá vàng', 'Một bệnh lạ làm lá cây ở rìa Đại Ngàn chuyển vàng, và những Elf sống gần đó bắt đầu ho ra phấn hoa.', 'Bạn thử từng loại thảo dược trên chính mình, ghi lại từng phản ứng.', 'Một Thầy Thuốc khác muốn đốt cả rìa rừng để chặn dịch.', 'Bạn tìm ra cây thuốc mọc ngay giữa vùng dịch, nơi không ai dám vào hái.'],
      ['Hạt giống Sinh Mệnh', 'Hạt giống cuối cùng của Cây Sinh Mệnh đang chết dần trong kho lưu trữ. Nếu nó chết, phương thuốc cứu mạng quý nhất của Đại Ngàn sẽ mất mãi mãi.', 'Bạn đọc mọi ghi chép về Cây Sinh Mệnh, kể cả những ghi chép bị coi là dị giáo.', 'Hội đồng muốn chia hạt giống thành nhiều phần để chiết xuất thuốc ngay bây giờ.', 'Bạn gieo hạt giống ở nơi mà ghi chép dị giáo chỉ ra, và chờ một mùa xuân.'],
    ],
  },
  elf_bard: {
    dilemma: 'Hội đồng muốn bạn sửa lời bài ca về trận chiến Rừng Tro, bỏ đoạn kể rằng Elf đã bỏ rơi đồng minh Human. Bài ca ấy sẽ được hát cho các thế hệ sau.',
    safe: 'Giữ nguyên lời bài ca', tempt: 'Sửa lời, chỉ một đoạn nhỏ',
    good: 'Hội đồng không vui, nhưng bài ca được giữ nguyên. Ba trăm năm sau, một sứ giả Human nghe nó và nói: “Ít nhất các người không quên.”', bad: 'Hội đồng cấm bạn hát bài ca ấy ở Đại Ngàn. Nó chỉ còn được hát lén ở rìa rừng.',
    temptGood: 'Bài ca mới được hát khắp Đại Ngàn. Nó hay hơn, và không ai nhớ bản cũ. Trừ bạn.', temptBad: 'Một Bard khác vẫn giữ bản cũ, và giờ người ta hát cả hai, kèm câu hỏi ai đã sửa lời.',
    fallout: 'Một nhà sử học Human tìm đến bạn, mang theo một bản chép tay cũ của bài ca Rừng Tro, và hỏi bạn đâu mới là lời thật.',
    arcs: [
      ['Bài ca chưa hoàn thành', 'Một Bard huyền thoại mất trước khi hoàn thành bài ca cuối cùng. Hội Bard muốn ai đó viết nốt khúc kết.', 'Bạn đọc mọi bài ca bà để lại, nghe giọng bà trong từng dòng.', 'Một người học trò cũ của bà đưa ra khúc kết đã viết sẵn, ca ngợi chính mình.', 'Bạn viết khúc kết bằng một khoảng lặng, đúng chỗ bà đã dừng lại.'],
      ['Khúc ca của mọi thời đại', 'Lễ hội ngàn năm của Đại Ngàn sắp đến, và bạn được chọn hát bài ca mở đầu, bài ca mà mọi tộc ở Aethelgard sẽ nghe.', 'Bạn đi qua các làng Human, Dwarf, Beastman, thu thập những bài ca của họ.', 'Hội đồng muốn bài ca chỉ kể về vinh quang của Elf.', 'Bạn hát một bài ca có giai điệu của bảy tộc, và cả quảng trường im lặng trước khi vỗ tay.'],
    ],
  },
  elf_guard: {
    dilemma: 'Một nhóm tị nạn Human chạy trốn chiến tranh, xin vào Đại Ngàn trú qua mùa đông. Luật Hộ Vệ không cho người ngoài vượt qua Cổng Rễ.',
    safe: 'Mở cổng, chịu trách nhiệm trước Hội đồng', tempt: 'Giữ cổng đóng, theo đúng luật',
    good: 'Hội đồng phạt bạn canh cổng thêm mười năm. Mùa xuân năm ấy, những người tị nạn để lại một bức tượng gỗ thô ở chân Cổng Rễ.', bad: 'Một người tị nạn bẻ cành cây thiêng làm củi. Hội đồng đuổi họ đi giữa mùa đông, và tước khiên của bạn một năm.',
    temptGood: 'Họ đi tiếp về phía nam. Cổng Rễ vẫn nguyên vẹn. Bạn không biết họ có sống qua mùa đông không.', temptBad: 'Mùa xuân, bạn tìm thấy dấu vết họ trong tuyết, không xa cổng lắm.',
    fallout: 'Những người tị nạn năm ấy, hoặc con cháu họ, trở lại Cổng Rễ, và lần này họ mang theo lời đề nghị từ vương quốc của họ.',
    arcs: [
      ['Đêm giữ Cổng Rễ', 'Một đạo quân không rõ danh tính đang tiến về Cổng Rễ trong đêm, và bạn là Hộ Vệ duy nhất ở đó.', 'Bạn đếm những bó đuốc, đọc nhịp chân của họ.', 'Bạn có thể đánh thức linh hồn cây để đẩy lùi họ, nhưng linh hồn cây sẽ không phân biệt địch với kẻ đi lạc.', 'Bạn đứng một mình trước cổng cho đến bình minh, và đạo quân rút lui khi thấy Cổng Rễ không hề sợ hãi.'],
      ['Bức tường bất diệt', 'Rễ của Yggdrasil đang bị một thứ gì đó gặm nhấm từ dưới đất. Hộ Vệ nào xuống đó sẽ phải ở lại rất lâu.', 'Bạn xuống hang rễ, lần theo vết gặm nhấm.', 'Hội đồng đề nghị phong ấn hang rễ, bỏ mặc những phần rễ đã nhiễm bệnh.', 'Bạn ở lại dưới hang rễ suốt mười năm, cho đến khi sinh vật cuối cùng bị đẩy ra.'],
    ],
  },
  elf_wood: {
    dilemma: 'Một quý tộc Human đặt làm một bức tượng từ gỗ cây thiêng đã đổ, và trả bằng số Tinh Bạc đủ xây lại xưởng của bạn. Theo tục lệ, gỗ cây thiêng không được rời khỏi Đại Ngàn.',
    safe: 'Từ chối, khắc gỗ thường cho ông ta', tempt: 'Nhận, gỗ đã chết thì đâu còn thiêng',
    good: 'Quý tộc thất vọng, nhưng bức tượng gỗ thường của bạn đẹp đến mức ông ta mua thêm hai bức nữa.', bad: 'Quý tộc bỏ đi. Xưởng của bạn dột mái thêm một mùa đông.',
    temptGood: 'Bức tượng được đặt trong sảnh lớn ở Sanctus. Người ta nói đêm đêm nó thì thầm bằng tiếng Elf.', temptBad: 'Gỗ cây thiêng nứt toác khi rời khỏi rừng. Quý tộc đòi lại tiền, và Hội đồng biết chuyện.',
    fallout: 'Một Elf trẻ đến xưởng của bạn hỏi học nghề, và cậu ta đã nghe về chuyện bức tượng năm ấy.',
    arcs: [
      ['Thớ gỗ của cây sét đánh', 'Một cây thiêng bị sét đánh đổ. Gỗ của nó chứa sức mạnh, nhưng chỉ người khắc giỏi mới không làm nó vỡ.', 'Bạn sống bên thân cây đổ một mùa, chạm tay vào từng thớ gỗ.', 'Một thương nhân muốn mua cả thân cây chưa khắc, với giá đủ nuôi xưởng của bạn trăm năm.', 'Bạn khắc nó thành một cây cung, và để thớ gỗ chọn hình dáng.'],
      ['Bàn tay của Thần Cây', 'Yggdrasil rụng một cành lớn, và Hội đồng muốn bạn khắc nó thành Ngai Lá, chiếc ghế cho người phán quyết của Đại Ngàn.', 'Bạn hỏi ý những người đã từng ngồi ghế phán quyết, và cả những người từng bị phán quyết.', 'Hội đồng muốn Ngai Lá cao hơn mọi chiếc ghế khác, để mọi người phải ngước nhìn.', 'Bạn khắc một chiếc ghế thấp, đặt ngang tầm với ghế của người bị xử. Hội đồng im lặng rất lâu, rồi chấp nhận.'],
    ],
  },
  elf_envoy: {
    dilemma: 'Một vương quốc Human muốn ký hiệp ước, nhưng một điều khoản cho họ quyền khai thác gỗ ở rìa Đại Ngàn. Nếu bạn từ chối, họ sẽ liên minh với Ma Tộc.',
    safe: 'Thương lượng lại điều khoản', tempt: 'Ký, rìa rừng sẽ mọc lại',
    good: 'Mất ba năm, nhưng điều khoản được đổi: họ khai thác cây đổ, không đốn cây sống. Cả hai bên đều không vui, nhưng cả hai đều ký.', bad: 'Họ mất kiên nhẫn và rời bàn đàm phán. Hội đồng trách bạn đã đòi quá nhiều.',
    temptGood: 'Hiệp ước được ký, và vương quốc ấy đứng về phía Đại Ngàn trong cuộc chiến sau. Rìa rừng trơ trụi suốt một trăm năm.', temptBad: 'Họ khai thác nhiều hơn điều khoản cho phép. Khi bạn phản đối, họ nói hiệp ước không ghi giới hạn.',
    fallout: 'Vương quốc năm ấy đã đổi vua. Vị vua mới muốn đàm phán lại hiệp ước, và chỉ chịu nói chuyện với bạn.',
    arcs: [
      ['Bàn tròn ở Ngã Ba Rễ', 'Ba tộc tranh chấp quyền đi qua Ngã Ba Rễ, con đường duy nhất xuyên Đại Ngàn. Hội đồng giao cho bạn hòa giải.', 'Bạn nghe từng bên kể chuyện, và nhận ra cả ba đều nói thật.', 'Một bên đề nghị chia đôi lợi ích với Elf nếu bạn nghiêng về họ.', 'Bạn đề nghị ba bên thay nhau giữ con đường, mỗi mùa một tộc, và họ chấp nhận.'],
      ['Tiếng nói của Yggdrasil', 'Cây Thế Giới cần một sứ giả nói thay nó trước liên minh các tộc, giữa lúc thế giới sắp có chiến tranh lớn.', 'Bạn ngồi dưới gốc Yggdrasil một mùa, học cách nghe những điều không thành lời.', 'Một phe trong Hội đồng muốn bạn nói những điều Cây Thế Giới không nói, để kéo các tộc về phía Elf.', 'Bạn nói đúng những gì đã nghe, kể cả những điều không ai muốn nghe, và liên minh ký hòa ước.'],
    ],
  },
  elf_merchant: {
    dilemma: 'Một gia đình Elf nghèo muốn đổi lời hứa phục vụ ba trăm năm lấy một bó ma thảo chữa bệnh cho đứa con. Theo luật chợ cổ, đó là thương vụ hợp lệ.',
    safe: 'Chỉ nhận lời hứa một mùa gặt', tempt: 'Nhận đủ ba trăm năm, luật cho phép',
    good: 'Gia đình ấy làm đủ một mùa gặt, và mang thêm một giỏ quả đến vào năm sau, không ai đòi.', bad: 'Các thương nhân khác chê bạn phá giá chợ, và từ chối buôn bán với bạn một mùa.',
    temptGood: 'Gia đình ấy phục vụ bạn đủ ba trăm năm, đúng hạn, không một lời than. Đứa con lớn lên, và không bao giờ nhìn thẳng vào mắt bạn.', temptBad: 'Chợ lời hứa xôn xao. Những người giữ chợ lâu năm nhất công khai từ chối buôn bán với bạn.',
    fallout: 'Đứa trẻ được cứu năm ấy giờ là một thương nhân, và đứng đối diện bạn trong một thương vụ lớn.',
    arcs: [
      ['Chuyến thương đoàn đầu tiên', 'Lần đầu tiên, một thương đoàn Elf mang ma thảo ra khỏi Đại Ngàn để bán ở Sanctus. Bạn là người dẫn đầu.', 'Bạn tính từng chặng đường, từng trạm nghỉ, từng giá ma thảo ở mỗi thành.', 'Một quý tộc Sanctus đề nghị mua cả chuyến hàng, với điều kiện thương đoàn chỉ bán cho ông ta từ nay về sau.', 'Bạn bán cho chợ thường, giá công bằng, và thương đoàn trở về với đủ hàng đổi cho cả làng.'],
      ['Giao ước Yggdrasil', 'Các tộc muốn một giao ước thương mại chung, và họ cần một người giữ giao ước sống đủ lâu để thấy nó được thực thi.', 'Bạn đi gặp từng tộc, ghi lại điều họ cần và điều họ sợ.', 'Một phe Elf muốn ghi vào giao ước rằng Đại Ngàn được quyền phủ quyết mọi điều khoản.', 'Bạn ký giao ước không có quyền phủ quyết, và khắc nó lên đá để không ai sửa được, kể cả bạn.'],
    ],
  },
};
