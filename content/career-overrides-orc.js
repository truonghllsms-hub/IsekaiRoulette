// Each Orc trade's own everyday dilemma, its aftermath and its two promotion trials (ranks 2 and 4).
// Arc: [title, intro, survey step, temptation step, final step].
module.exports = {
  orc_berserker: {
    dilemma: 'Giữa trận, cơn cuồng nộ đang lên thì bạn thấy đối thủ là một Orc của bộ lạc đồng minh, mặc nhầm giáp kẻ thù. Hắn chưa nhận ra bạn.',
    safe: 'Ghìm cơn điên, hét tên bộ lạc', tempt: 'Để cơn điên quyết định',
    good: 'Hắn khựng lại, nhận ra tiếng hét. Hai người quay lưng vào nhau và đánh kẻ thù thật. Sau trận, hắn mang đến lều bạn một vò rượu.', bad: 'Bạn ghìm được, nhưng chậm một nhịp. Một mũi giáo kẻ thù lọt qua, để lại vết sẹo dài trên vai bạn.',
    temptGood: 'Cơn điên nhận ra hắn trước khi bạn kịp nghĩ. Rìu dừng giữa không trung. Bạn không biết vì sao, và cũng không ai hỏi.', temptBad: 'Khi bạn tỉnh lại, hắn nằm dưới chân bạn. Bộ lạc đồng minh đòi một món nợ máu.',
    fallout: 'Bộ lạc đồng minh gửi người đến trại. Họ muốn biết Berserker ấy có giữ được cơn điên của mình hay không, trước khi kết minh lần nữa.',
    arcs: [
      ['Đêm của Đá Thách Đấu', 'Một Berserker trẻ thách bạn trước Đá Thách Đấu, để giành chỗ đi đầu đội xung kích.', 'Bạn quan sát hắn đánh suốt ba ngày, tìm chỗ cơn điên của hắn lộ ra.', 'Một kẻ đề nghị bỏ thuốc vào rượu của hắn trước trận.', 'Bạn đấu sạch, và hạ hắn bằng một đòn mà cơn điên của hắn không kịp đỡ.'],
      ['Cơn bão trên Đồi Sọ', 'Ba bộ lạc liên minh đánh vào Đồi Sọ, nơi đội quân Human đóng trại. Họ cần một Berserker đi đầu.', 'Bạn đi dọc hàng xung kích, nhìn vào mắt từng chiến binh.', 'Warchief muốn bạn tấn công vào đêm, khi kẻ thù còn ngủ, điều mà Orc gọi là hèn.', 'Bạn thổi tù và báo trước, và vẫn lao lên đầu tiên khi trời vừa sáng.'],
    ],
  },
  orc_ranger: {
    dilemma: 'Bạn bắt gặp một Orc trẻ trong bộ lạc lén bắn tên vào lưng một chiến binh khác, để trả thù. Mũi tên trượt. Không ai thấy ngoài bạn.',
    safe: 'Đưa nó ra trước bộ lạc', tempt: 'Giữ im lặng, dạy nó riêng',
    good: 'Bộ lạc phạt nó đi săn một mình cả mùa. Nó trở về gầy rộc, nhưng không bao giờ bắn sau lưng ai nữa.', bad: 'Các chiến binh nhân dịp này chửi rủa mọi cung thủ, kể cả bạn.',
    temptGood: 'Bạn dạy nó bắn công khai. Nó học, và thù hận nguôi dần. Không ai biết chuyện năm ấy.', temptBad: 'Nó bắn lần nữa, lần này trúng. Bộ lạc biết bạn đã giữ im lặng.',
    fallout: 'Chiến binh suýt bị bắn năm ấy giờ hỏi thăm khắp trại xem ai là kẻ bắn lén, và ai đã biết mà không nói.',
    arcs: [
      ['Mũi tên trước trăm mắt', 'Bộ lạc tổ chức cuộc thi bắn đầu tiên trước toàn trại, và các chiến binh đến để chế giễu.', 'Bạn luyện tập dưới gió, dưới mưa, trong bóng tối.', 'Một người đề nghị làm cong mũi tên của đối thủ đêm trước cuộc thi.', 'Bạn bắn mười mũi trước trăm mắt chế giễu, và mười mũi trúng đích. Không ai cười nữa.'],
      ['Cuộc săn Kiểm Lâm cuối cùng', 'Kiểm Lâm Elf tấn công một trại Orc nhỏ. Bộ lạc cần thợ săn giỏi nhất đuổi theo chúng vào rừng Greatwood.', 'Bạn đọc dấu chân Elf, nhẹ như lá rơi.', 'Warchief muốn bạn đốt rừng để ép chúng ra.', 'Bạn đuổi kịp chúng ở bìa rừng, và lần đầu tiên, hai bên ngừng bắn để trao đổi tù binh.'],
    ],
  },
  orc_shaman: {
    dilemma: 'Warchief bị thương nặng, nhưng không cho ai gọi pháp sư. Gia đình ông lén mời bạn đến khi ông ngất đi.',
    safe: 'Từ chối, tôn trọng ý ông', tempt: 'Chữa cho ông khi ông ngất',
    good: 'Warchief qua khỏi bằng sức mình. Khi tỉnh dậy, ông nghe chuyện bạn từ chối, và lần đầu tiên gật đầu với bạn trước cả trại.', bad: 'Warchief không qua khỏi. Gia đình ông không bao giờ tha thứ cho bạn.',
    temptGood: 'Warchief tỉnh dậy, khỏe mạnh, và không biết vì sao. Gia đình ông giữ bí mật. Bạn cũng vậy.', temptBad: 'Warchief tỉnh dậy giữa lúc bạn đang làm phép. Ông đuổi bạn khỏi trại một mùa.',
    fallout: 'Một chiến binh đến lều bạn lúc nửa đêm, xin được chữa trong bí mật như Warchief năm ấy.',
    arcs: [
      ['Đêm gọi linh tổ', 'Bộ lạc chuẩn bị di cư, và cần pháp sư gọi linh tổ chỉ đường. Các chiến binh đứng xem, chờ bạn thất bại.', 'Bạn ngồi bên lửa ba đêm, lắng nghe gió và tiếng quạ.', 'Một trưởng lão gợi ý bạn chỉ đại về phía nam, vì đằng nào cũng không ai biết.', 'Bạn nói thật những gì linh tổ đã nói, kể cả điều không ai muốn nghe.'],
      ['Lễ của Vực Thẳm', 'Hắc Nguyệt Hội vây trại bằng lời nguyền, và chỉ một pháp sư có thể phá nó.', 'Bạn tìm hiểu lời nguyền qua giấc mơ của những người bị nó chạm vào.', 'Hắc Nguyệt Hội đề nghị dỡ lời nguyền nếu bạn theo chúng.', 'Bạn phá lời nguyền bằng máu của chính mình, và bộ lạc lần đầu tiên hát về một pháp sư.'],
    ],
  },
  orc_smith: {
    dilemma: 'Một chiến binh trả giá cao cho chiếc rìu Huyết Kim, nhưng bạn biết hắn sẽ dùng nó để thách một người bạn của bạn trước Đá Thách Đấu.',
    safe: 'Bán cho hắn rìu thường', tempt: 'Bán rìu tốt nhất, công bằng là công bằng',
    good: 'Hắn biết. Hắn giận. Nhưng trận thách công bằng hơn, và bạn của bạn thắng.', bad: 'Hắn mua rìu Huyết Kim ở lò khác, và bạn của bạn thua.',
    temptGood: 'Trận đấu hay nhất mùa. Bạn của bạn thua, nhưng sống, và ôm bạn: “Ít ra hắn thắng ta bằng thứ rìu tốt.”', temptBad: 'Bạn của bạn ngã dưới chiếc rìu do chính bạn rèn.',
    fallout: 'Chiếc rìu năm ấy trở lại lò của bạn, mẻ một góc, và chủ của nó muốn bạn sửa.',
    arcs: [
      ['Mẻ Huyết Kim đầu tiên', 'Bộ lạc mang về một khối Huyết Kim đầy tạp chất, và Warchief muốn một lưỡi rìu hoàn hảo trong một tháng.', 'Bạn đập, nung, đập, từng lớp tạp chất bong ra.', 'Một thợ rèn khác đề nghị phủ sơn đỏ lên sắt thường, không ai phân biệt được.', 'Lưỡi rìu Huyết Kim ra lò, đỏ như máu, và chém đôi một lưỡi rìu sắt thường.'],
      ['Lò rèn của mười bộ lạc', 'Mười bộ lạc kết minh, và họ cần một lò rèn chung để rèn vũ khí cho cả liên minh.', 'Bạn đi đến từng bộ lạc, học cách rèn của họ.', 'Bộ lạc mạnh nhất muốn vũ khí tốt nhất về tay mình.', 'Bạn rèn cho mọi bộ lạc như nhau, và khắc dấu của cả mười lên mỗi lưỡi rìu.'],
    ],
  },
  orc_rider: {
    dilemma: 'Con sói của một kỵ sĩ khác bị thương nặng ở chân, không thể chạy được nữa. Chủ nó muốn kết thúc cho nó. Bạn nghĩ nó có thể lành.',
    safe: 'Xin nuôi nó', tempt: 'Để chủ nó quyết định',
    good: 'Con sói lành sau ba tháng, đi khập khiễng nhưng sống. Nó trở thành con sói canh trại tốt nhất.', bad: 'Con sói không lành. Bạn phải tự tay kết thúc cho nó sau một tháng đau đớn.',
    temptGood: 'Chủ nó làm điều phải làm, nhanh và gọn. Hắn khóc sau đó, và bạn ngồi cạnh hắn.', temptBad: 'Chủ nó chần chừ, và con sói đau thêm ba ngày.',
    fallout: 'Những kỵ sĩ trẻ bắt đầu mang sói bị thương đến cho bạn, thay vì kết thúc chúng.',
    arcs: [
      ['Cuộc đua qua Thảo Nguyên Gió Hú', 'Bộ lạc tổ chức cuộc đua kỵ sói qua Thảo Nguyên Gió Hú. Kẻ thắng được dẫn đội kỵ sói.', 'Bạn chạy thử từng đoạn đường, tìm chỗ đất mềm, chỗ đá trơn.', 'Một kỵ sĩ đề nghị rải gai trên đường đua của đối thủ.', 'Bạn thắng sát nút, và con sói của bạn vẫn còn sức chạy thêm một vòng.'],
      ['Bầy Sói Trắng', 'Một bầy sói trắng khổng lồ từ phương bắc tràn xuống, và các bộ lạc muốn săn hết chúng.', 'Bạn theo dấu bầy sói trắng, học cách chúng săn.', 'Warchief muốn bạn dụ chúng vào bẫy lửa.', 'Bạn dẫn bầy sói trắng về phía núi, nơi không có trại Orc nào, và chúng ở lại đó.'],
    ],
  },
};
