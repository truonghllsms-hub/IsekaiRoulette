// Each Dwarf trade's own everyday dilemma, its aftermath and its two promotion trials (ranks 2 and 4).
// Arc: [title, intro, survey step, temptation step, final step].
// These replace the shared long-lived "heritage" text for Dwarf trades; progression stays from long-lives.js.
module.exports = {
  dwarf_runesmith: {
    dilemma: 'Một gia tộc giàu có đặt bạn khắc rune Bất Bại lên rìu của cậu con trai út, sắp ra trận lần đầu. Bạn biết rune ấy sẽ khiến cậu ta tin mình không thể chết, và lao lên trước mọi người.',
    safe: 'Khắc rune Bền, giải thích vì sao', tempt: 'Khắc đúng thứ họ trả tiền',
    good: 'Gia tộc giận, trả nửa tiền. Cậu con trai út trở về từ trận đầu, chiếc rìu mẻ một góc, và tự tay mang nó đến lò của bạn để sửa.', bad: 'Gia tộc mang rìu sang lò khác, và một thợ rune kém tay hơn khắc rune Bất Bại cho họ.',
    temptGood: 'Rune sáng rực trên lưỡi rìu. Cậu ta sống sót, và kể với mọi người rằng chiếc rìu đã cứu mình. Bạn biết chính cậu ta mới là người may mắn.', temptBad: 'Cậu ta lao lên đầu tiên, như bạn đã sợ. Gia tộc gửi lại chiếc rìu, rune vẫn còn sáng.',
    fallout: 'Gia tộc năm ấy gửi đến lò của bạn một đứa cháu, muốn học khắc rune. Nó đã nghe kể về con rune mà bạn khắc, hoặc không chịu khắc, cho chú nó.',
    arcs: [
      ['Lò Rèn Vĩnh Cửu', 'Lửa trong Lò Rèn Vĩnh Cửu, ngọn lửa chưa tắt từ ngày Dwarf đầu tiên rèn sắt, đang yếu dần. Hội đồng cần một thợ rune khắc lại rune Lửa ở đáy lò.', 'Bạn xuống đáy lò, đọc những con rune cũ đã mòn qua hàng nghìn năm.', 'Một Trưởng Lão đề nghị khắc rune mới mạnh hơn, đủ để lửa cháy mãi, dù không ai biết nó sẽ ảnh hưởng gì đến những con rune xung quanh.', 'Bạn khắc lại đúng con rune cổ, từng nét, theo dấu đục của tổ tiên. Lửa bùng lên.'],
      ['Chiếc búa của Thần Rèn', 'Một chiếc búa cổ được tìm thấy trong hầm sâu, khắc những con rune mà không ai đọc được. Hội đồng tin rằng đó là búa của chính Thần Rèn.', 'Bạn ngồi bên chiếc búa một mùa, chép lại từng con rune.', 'Các gia tộc muốn bạn khắc lại những con rune ấy lên vũ khí của họ, trước khi hiểu chúng nghĩa là gì.', 'Bạn hiểu được con rune đầu tiên: nó không làm vũ khí mạnh hơn, nó làm người rèn khiêm tốn hơn.'],
    ],
  },
  dwarf_miner: {
    dilemma: 'Đội của bạn đào trúng một mạch Lõi Mana lớn, nhưng nó nằm ngay dưới một mạch nước ngầm cung cấp nước cho cả thành trì phía dưới. Đào tiếp có thể làm nước ngấm vào mỏ, hoặc làm cạn nguồn nước.',
    safe: 'Dừng đào, báo cho Hội đồng', tempt: 'Đào nhanh trước khi ai biết',
    good: 'Hội đồng gửi kỹ sư đến. Mất ba năm để đào vòng qua mạch nước, nhưng thành trì không mất một giọt.', bad: 'Hội đồng đóng mỏ, và đội của bạn mất việc một mùa.',
    temptGood: 'Bạn lấy được Lõi Mana trước khi nước kịp ngấm. Mùa sau, giếng của thành trì phía dưới thấp đi một chút. Không ai biết vì sao.', temptBad: 'Vách đá vỡ. Nước tràn vào mỏ. Đội của bạn thoát ra được, nhưng mỏ ngập vĩnh viễn.',
    fallout: 'Thành trì phía dưới đào thêm giếng mới, và họ tìm thấy những dấu cuốc của đội bạn ở đáy mạch nước.',
    arcs: [
      ['Mạch quặng hát', 'Thợ mỏ kể rằng ở tầng sâu có một mạch quặng biết hát. Ai nghe thấy đều đi theo tiếng hát, và không trở về.', 'Bạn xuống với dây thừng buộc quanh thắt lưng, nối với ba người bạn ở trên.', 'Tiếng hát gọi bạn sâu hơn. Bạn có thể cắt dây để đi tiếp.', 'Bạn tìm ra nguồn tiếng hát: gió thổi qua những khe đá hẹp. Bạn bịt chúng lại, và tầng sâu im lặng.'],
      ['Tầng đáy của thế giới', 'Hội đồng muốn biết đáy của Dãy Núi Răng Cưa ở đâu. Không ai từng đào đến đó.', 'Bạn chuẩn bị một năm: dây thừng, đèn đá, lương thực, và những người tin bạn.', 'Ở tầng sâu nhất, bạn tìm thấy một mạch Lõi Mana đủ nuôi cả Dãy Núi Răng Cưa một nghìn năm. Nhưng nó đang đỡ trần của một hang khổng lồ.', 'Bạn đánh dấu đáy của thế giới bằng một chiếc cuốc cắm vào đá, và mang về bản đồ, không mang về Lõi Mana.'],
    ],
  },
  dwarf_shield: {
    dilemma: 'Bạn được lệnh đứng chặn ở cổng thành khi quân địch tấn công. Phía sau bạn, một nhóm dân thường vẫn chưa kịp vào trong. Đóng cổng thì họ ở ngoài. Mở cổng thì quân địch có thể lọt vào.',
    safe: 'Giữ cổng mở, tự đứng chặn', tempt: 'Đóng cổng theo lệnh',
    good: 'Bạn đứng giữa cổng, khiên giơ cao, cho đến khi người dân cuối cùng chạy qua. Cổng đóng sau lưng bạn. Bạn bị thương, nhưng còn sống.', bad: 'Quân địch đông hơn bạn tưởng. Hàng khiên phải lùi, và cổng chỉ đóng được khi hai kẻ địch đã lọt vào.',
    temptGood: 'Cổng đóng. Thành an toàn. Sáng hôm sau, những người ở ngoài vẫn còn sống, vì quân địch không để ý đến họ. Lần này.', temptBad: 'Cổng đóng. Bạn nghe tiếng gõ cửa suốt đêm, rồi im lặng.',
    fallout: 'Những người dân năm ấy, hoặc gia đình họ, đến tìm bạn. Họ muốn biết người đứng ở cổng đêm đó là ai.',
    arcs: [
      ['Đêm dài ở Cổng Sắt', 'Một đạo quân Orc vây Cổng Sắt. Viện binh còn ba ngày đường. Hàng khiên phải đứng ba đêm.', 'Bạn chia ca, đếm khiên, đếm người.', 'Chỉ huy muốn rút khỏi tường ngoài để giữ sức. Nhưng tường ngoài là nơi một làng nhỏ đang trú ẩn.', 'Bạn đứng ở tường ngoài suốt ba đêm, và viện binh đến khi hàng khiên vẫn còn nguyên.'],
      ['Bức tường cuối cùng', 'Một thứ gì đó từ dưới đáy núi trồi lên. Mọi thành trì phải rút về Thành Trì Trung Tâm, và chỉ có một con đường hầm để rút. Ai đó phải đứng chặn ở đầu hầm.', 'Bạn chọn những người sẽ đứng cùng mình. Chỉ những người tự nguyện.', 'Hội đồng muốn phá sập đường hầm ngay khi người cuối cùng qua, kể cả khi hàng khiên vẫn còn ở trong.', 'Bạn giữ đầu hầm cho đến khi người cuối cùng qua, rồi lùi lại, khiên vẫn giơ, cho đến khi cánh cổng đá đóng.'],
    ],
  },
  dwarf_brew: {
    dilemma: 'Một gã chủ mỏ giàu có đặt mua toàn bộ mẻ bia mạnh nhất của bạn, để phát cho thợ mỏ của hắn trước mỗi ca đêm. Hắn nói nó giúp họ không sợ hầm tối.',
    safe: 'Bán một phần, kèm lời cảnh báo', tempt: 'Bán hết, tiền là tiền',
    good: 'Hắn càu nhàu, nhưng mua. Bạn đến mỏ của hắn, nói chuyện với thợ mỏ. Họ cười, nhưng mùa ấy không có ai say xỉn ngã xuống giếng mỏ.', bad: 'Hắn mua ở quán khác, rẻ hơn, mạnh hơn.',
    temptGood: 'Thợ mỏ của hắn đào nhanh gấp đôi. Họ gọi bia của bạn là “Can Đảm Lỏng”. Bạn không thích cái tên ấy.', temptBad: 'Một thợ mỏ say ngã xuống giếng mỏ trong ca đêm. Tin lan khắp phố, kèm tên quán của bạn.',
    fallout: 'Vợ của một thợ mỏ năm ấy đến quán của bạn, ngồi ở bàn trong góc, và gọi một vại bia nhẹ nhất.',
    arcs: [
      ['Mẻ bia của lễ hội', 'Lễ hội mùa thu cần một mẻ bia đủ cho cả thành trì. Bạn chỉ có hai tuần.', 'Bạn đi khắp các trang trại tìm lúa mạch tốt nhất.', 'Một thương nhân đề nghị bán cho bạn hương liệu giả, rẻ và nhanh, không ai phân biệt được.', 'Bạn ủ bằng lúa mạch thật, suốt hai tuần không ngủ, và cả thành trì nâng vại cùng lúc.'],
      ['Thùng rượu của Thần Rèn', 'Một công thức cổ được tìm thấy: rượu mà tổ tiên Dwarf dâng lên Thần Rèn trong ngày lập núi. Không ai ủ nó suốt ba nghìn năm.', 'Bạn giải mã công thức, tìm từng nguyên liệu, kể cả những thứ đã gần tuyệt chủng.', 'Tháp Ngà muốn mua công thức với giá đủ mua cả một thành trì.', 'Bạn ủ một thùng duy nhất, và cả Hội đồng nếm nó trong ngày lập núi. Không ai nói gì. Mọi người đều khóc.'],
    ],
  },
  dwarf_eng: {
    dilemma: 'Hội đồng muốn bạn thiết kế một cỗ máy đào thay cho mười thợ mỏ. Nó sẽ làm việc nhanh hơn, an toàn hơn, nhưng mười gia đình sẽ mất việc.',
    safe: 'Thiết kế máy cần thợ mỏ điều khiển', tempt: 'Thiết kế đúng như Hội đồng muốn',
    good: 'Máy chậm hơn một chút, nhưng mỗi cỗ máy cần ba thợ mỏ lái. Không ai mất việc. Thợ mỏ gọi nó là “Con Dê Sắt”.', bad: 'Hội đồng chê máy của bạn quá chậm, và thuê kỹ sư khác.',
    temptGood: 'Máy đào nhanh gấp năm. Mỏ giàu lên. Mười thợ mỏ mất việc, nhưng Hội đồng hứa sẽ tìm việc khác cho họ. Hội đồng giữ lời, phần lớn.', temptBad: 'Thợ mỏ mất việc đập phá cỗ máy đầu tiên. Hội đồng gọi họ là kẻ phá hoại.',
    fallout: 'Một trong những thợ mỏ năm ấy đến xưởng của bạn, và muốn học cách sửa máy.',
    arcs: [
      ['Cây cầu hơi nước', 'Hẻm Vực Sâu chia đôi hai thành trì. Hội đồng muốn một cây cầu có thể nâng lên hạ xuống bằng hơi nước.', 'Bạn đo hẻm vực, tính gió, tính tải trọng, suốt một mùa.', 'Hội đồng muốn cắt bớt thép để tiết kiệm, vì “cầu chỉ cần đứng được”.', 'Bạn xây cầu đúng thiết kế, và nó đứng vững qua trận động đất đầu tiên.'],
      ['Trái tim của Golem', 'Một Golem khổng lồ nằm dưới Thành Trì Trung Tâm, đã ngủ từ khi Dwarf lập núi. Hội đồng tin rằng nó có thể bảo vệ cả Dãy Núi Răng Cưa, nếu được đánh thức.', 'Bạn xuống hầm, tháo từng tấm giáp, đọc từng bánh răng.', 'Một phe trong Hội đồng muốn gắn vào trái tim của Golem một lõi điều khiển, để nó chỉ nghe lệnh của họ.', 'Bạn đánh thức Golem không có lõi điều khiển. Nó mở mắt, nhìn quanh, và hỏi: “Ai cần được bảo vệ?”'],
    ],
  },
  dwarf_carver: {
    dilemma: 'Hội đồng muốn bạn đục bỏ tên một anh hùng khỏi bức tượng ở quảng trường, vì gia tộc của ông ta vừa bị kết tội phản bội.',
    safe: 'Từ chối, tên ông ta không có tội', tempt: 'Đục bỏ, đó là lệnh',
    good: 'Hội đồng tìm thợ khác. Không ai chịu làm. Bức tượng vẫn mang tên ông ta, và người ta bắt đầu đặt hoa dưới chân nó.', bad: 'Hội đồng tước giấy phép tạc tượng công cộng của bạn một năm.',
    temptGood: 'Tên được đục bỏ, sạch sẽ. Bức tượng giờ là một người không tên. Trẻ con hỏi đó là ai, và không ai trả lời.', temptBad: 'Mũi đục trượt, làm vỡ một góc bức tượng. Người ta nói đó là điềm gở.',
    fallout: 'Gia tộc năm ấy được minh oan. Họ đến xưởng của bạn, hỏi bạn có còn nhớ cái tên đã bị đục bỏ không.',
    arcs: [
      ['Cổng thành mới', 'Thành trì mới cần một cổng đá, và các gia tộc đều muốn biểu tượng của mình ở vị trí cao nhất.', 'Bạn đi gặp từng gia tộc, nghe họ kể về tổ tiên.', 'Gia tộc giàu nhất đề nghị trả gấp ba nếu biểu tượng của họ lớn nhất.', 'Bạn tạc tất cả biểu tượng bằng nhau, xếp thành một vòng tròn. Không gia tộc nào ở trên cao nhất.'],
      ['Bức tượng của Người Lập Núi', 'Hội đồng muốn một bức tượng của Dwarf đầu tiên, người lập ra Dãy Núi Răng Cưa. Không ai biết ông ta trông thế nào.', 'Bạn đọc mọi sách cổ, mọi bài ca, tìm từng chi tiết về ông ta.', 'Hội đồng muốn ông ta trông như một vị vua, cao lớn, vương miện vàng.', 'Bạn tạc một Dwarf bình thường, cầm cuốc, mặt lấm bụi đá. Hội đồng im lặng rất lâu, rồi đặt nó ở quảng trường.'],
    ],
  },
  dwarf_merchant: {
    dilemma: 'Một quý tộc Human muốn mua một viên ngọc gia truyền mà một gia tộc Dwarf nghèo vừa bán cho bạn để trả nợ. Ông ta trả gấp mười. Gia tộc kia có thể sẽ muốn chuộc lại nó, nếu có tiền.',
    safe: 'Giữ viên ngọc một năm cho gia tộc chuộc lại', tempt: 'Bán ngay cho quý tộc',
    good: 'Gia tộc kia chuộc lại viên ngọc sau mười tháng, với số tiền dành dụm được. Họ không nói gì, nhưng mua ngọc của bạn suốt ba thế hệ.', bad: 'Gia tộc kia không bao giờ đủ tiền. Quý tộc thì đã mua ở chỗ khác.',
    temptGood: 'Bạn lời lớn. Viên ngọc giờ nằm trên vương miện của một quý tộc Sanctus. Gia tộc kia nghe tin, và không trách bạn. Họ chỉ không đến nữa.', temptBad: 'Gia tộc kia quay lại chuộc ngọc sau một tháng, và biết nó đã đi. Họ kể chuyện ấy cho mọi người.',
    fallout: 'Viên ngọc năm ấy xuất hiện lại ở một phiên đấu giá ở Sanctus, và gia tộc cũ của nó đang ngồi ở hàng ghế đầu.',
    arcs: [
      ['Phiên chợ ngọc lớn nhất', 'Phiên chợ ngọc mười năm một lần của Dãy Núi Răng Cưa. Ai giữ được quầy ở trung tâm sẽ định giá cho cả mười năm sau.', 'Bạn đi khắp các mỏ, mua những viên ngọc tốt nhất, với giá công bằng.', 'Một nhóm thương nhân rủ bạn cùng ép giá mua từ thợ mỏ, để cả nhóm cùng lời.', 'Bạn giữ quầy ở trung tâm, và định giá ngọc theo đúng công sức của người đào ra nó.'],
      ['Ngân khố của Dãy Núi', 'Các thành trì Dwarf muốn một ngân khố chung, nơi ngọc của mọi gia tộc được giữ và bảo chứng. Họ cần một người giữ chìa khóa.', 'Bạn đi gặp từng gia tộc, ghi lại từng viên ngọc họ gửi.', 'Một gia tộc lớn đề nghị chia cho bạn một phần, nếu bạn cho họ vay từ ngân khố mà không ai biết.', 'Bạn khắc sổ ngân khố lên đá, công khai cho mọi gia tộc xem, và không ai có thể vay lén nữa.'],
    ],
  },
  dwarf_guard: {
    dilemma: 'Một nhóm thợ mỏ lạc đường xin được vào thành lúc nửa đêm. Luật cấm mở cổng sau giờ giới nghiêm. Bão tuyết đang đến.',
    safe: 'Mở cổng, chịu trách nhiệm', tempt: 'Giữ cổng đóng, theo luật',
    good: 'Thợ mỏ vào trong, run rẩy nhưng còn sống. Sáng hôm sau, đội trưởng phạt bạn gác thêm một tháng, rồi lặng lẽ mua cho bạn một vại bia.', bad: 'Trong nhóm thợ mỏ có một kẻ trộm trà trộn. Hắn lẻn vào kho trước khi bị bắt.',
    temptGood: 'Bạn giữ cổng đóng, nhưng thả xuống chăn và lương thực từ trên tường. Họ sống qua đêm. Sáng ra, cổng mở theo giờ.', temptBad: 'Sáng ra, cổng mở. Hai người trong nhóm không còn đứng dậy được.',
    fallout: 'Những thợ mỏ năm ấy kể lại chuyện đêm bão tuyết. Giờ ai cũng biết tên người gác cổng đêm đó.',
    arcs: [
      ['Đêm không trăng', 'Một toán cướp định lợi dụng đêm không trăng để tấn công các làng dưới chân núi. Lính gác được lệnh giữ thành, không xuống núi.', 'Bạn đi dọc tường thành, đếm những ngọn đèn trong các làng phía dưới.', 'Bạn có thể lén xuống núi một mình để cảnh báo các làng, trái lệnh.', 'Bạn thắp lửa hiệu trên đỉnh tháp, đủ sáng để các làng thấy, và toán cướp bỏ đi khi thấy làng đã thức.'],
      ['Mùa đông dài nhất', 'Một mùa đông kéo dài gấp đôi bình thường. Đèo bị tuyết chặn, thành trì bị cô lập. Lính gác phải giữ trật tự khi lương thực cạn dần.', 'Bạn đếm từng bao lương thực, chia khẩu phần cho từng nhà.', 'Một gia tộc giàu có đề nghị trả tiền để được thêm khẩu phần.', 'Mọi nhà nhận cùng một khẩu phần, kể cả nhà của bạn, và cả thành trì sống qua mùa đông.'],
    ],
  },
  dwarf_hunter: {
    dilemma: 'Trong một hầm mộ cổ, bạn tìm thấy một chiếc rương đầy vàng và một bộ hài cốt nhỏ ôm chặt nó. Dòng chữ trên vách: “Của hồi môn cho con gái ta.”',
    safe: 'Để nguyên chiếc rương', tempt: 'Lấy vàng, người chết không cần',
    good: 'Bạn ra về tay trắng. Đêm ấy bạn mơ thấy một đứa trẻ vẫy tay chào.', bad: 'Đồng đội của bạn không đồng ý, và quay lại lấy vàng sau lưng bạn.',
    temptGood: 'Vàng thật, và không có lời nguyền. Bạn giàu lên. Dòng chữ trên vách cứ hiện ra mỗi khi bạn nhắm mắt.', temptBad: 'Khi bạn nhấc chiếc rương, cửa mộ đóng sập. Phải ba ngày sau bạn mới đào được đường ra, và để lại chiếc rương.',
    fallout: 'Một học giả tìm đến bạn: hầm mộ năm ấy là của một gia tộc Dwarf đã mất, và hậu duệ của họ vẫn còn sống.',
    arcs: [
      ['Hầm ngục của vua Troll', 'Một hầm ngục cổ được phát hiện dưới Đầm Lầy Tử Khí, nơi một vua Troll từng giấu kho báu. Các đội mạo hiểm đổ xô đến.', 'Bạn nghiên cứu bản đồ cổ, tìm lối vào mà không ai khác biết.', 'Một đội mạo hiểm Human đề nghị đi cùng, đổi lại một nửa kho báu. Bạn biết họ sẽ phản bội ở cuối đường.', 'Bạn đến kho báu trước, lấy đủ phần của mình, và để lại phần còn lại cho những ai đến sau.'],
      ['Kho báu của Người Lập Núi', 'Truyền thuyết kể rằng Dwarf đầu tiên đã giấu kho báu lớn nhất dưới đáy Dãy Núi Răng Cưa. Không ai tìm thấy suốt ba nghìn năm.', 'Bạn lần theo mọi bản đồ cổ, mọi bài hát, mọi lời đồn.', 'Hội đồng muốn bạn giao kho báu cho họ ngay khi tìm thấy, không cần biết nó là gì.', 'Bạn tìm thấy nó: một căn phòng nhỏ, một chiếc cuốc cũ, và dòng chữ “Hãy bắt đầu từ đây”. Bạn để nguyên tất cả.'],
    ],
  },
};
