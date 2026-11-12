// Each Lizardman, Minotaur and Troll trade's own everyday dilemma, its aftermath and its two
// promotion trials (ranks 2 and 4). Arc: [title, intro, survey step, temptation step, final step].
module.exports = {
  lizard_warrior: {
    dilemma: 'Một đứa trẻ Beastman lạc vào bãi săn, đuổi theo con vịt trời. Luật bộ lạc: kẻ ngoài vào đầm, kẻ ngoài không ra.',
    safe: 'Dọa nó chạy khỏi đầm', tempt: 'Theo luật bộ lạc',
    good: 'Bạn trồi lên, rít một tiếng. Nó chạy mất, bỏ lại con vịt. Bạn mang con vịt về, không ai hỏi.', bad: 'Nó chạy sâu hơn vào đầm thay vì ra ngoài. Bạn phải lén dẫn nó ra, và bị một chiến binh khác thấy.',
    temptGood: 'Bộ lạc giữ nó làm con tin, đổi lấy muối. Nó về nhà sau một tháng, không bị thương.', temptBad: 'Bộ lạc của nó kéo đến bìa đầm đòi người. Hai bên đổ máu.',
    fallout: 'Bộ lạc Beastman bên kia đầm cử người đến, hỏi về đứa trẻ năm ấy.',
    arcs: [
      ['Mùa nước cạn', 'Nước đầm rút xuống thấp nhất trong mười năm, và các bộ lạc xung quanh nhìn vào bãi săn của Lizardman.', 'Bạn bơi dọc ranh giới, đánh dấu những chỗ nước còn sâu.', 'Một chiến binh đề nghị đầu độc giếng của bộ lạc láng giềng.', 'Bạn giữ ranh giới bằng những trận phục kích không đổ máu, cho đến khi mưa về.'],
      ['Vua của đầm lầy', 'Một con cá sấu khổng lồ, lớn nhất trong ký ức bộ lạc, chiếm bãi đẻ trứng.', 'Bạn theo dõi nó suốt một mùa, học nhịp thở của nó.', 'Tộc trưởng muốn đốt cả bãi lau để đuổi nó.', 'Bạn kéo nó ra khỏi bãi trứng bằng một trận vật lộn dưới nước dài ba trăm nhịp tim.'],
    ],
  },
  lizard_hunter: {
    dilemma: 'Bạn bắt gặp một Kiểm Lâm Elf bị thương, nằm trên rễ cây. Hắn nhìn bạn, và không với lấy cung.',
    safe: 'Để hắn lại, đi tiếp', tempt: 'Kết thúc hắn, như con mồi',
    good: 'Bạn đi tiếp. Ba tháng sau, một mũi tên Elf cắm vào gốc cây trước hang bạn, buộc theo một túi muối.', bad: 'Hắn chết vì vết thương. Bạn biết mình không giết hắn, nhưng cũng không cứu.',
    temptGood: 'Gọn, nhanh. Bạn mang về cây cung Elf. Bộ lạc hò reo.', temptBad: 'Tộc Elf tìm thấy xác hắn. Chúng đốt bìa đầm.',
    fallout: 'Kiểm Lâm Elf bắt đầu tuần tra gần bìa đầm, và họ đang tìm một thợ săn Lizardman cụ thể.',
    arcs: [
      ['Đêm của Nhện Sáu Mắt', 'Một con Nhện Đầm Lầy khổng lồ làm tổ gần bãi săn.', 'Bạn nếm gió, tìm hướng tổ của nó.', 'Một thợ săn đề nghị dùng trứng của bộ lạc làm mồi.', 'Bạn dụ nó xuống nước bằng một con nai, và dìm nó.'],
      ['Cuộc săn trăm ngày', 'Một con quái thú không ai từng thấy đang ăn thịt cả bầy cá sấu.', 'Bạn lần theo dấu nó trăm ngày, từ đầm đến sông.', 'Một đội mạo hiểm giả Human đề nghị hợp sức, đổi lấy xác con thú.', 'Bạn hạ nó một mình ở cửa sông, và để xác nó cho đầm lầy.'],
    ],
  },
  lizard_priest: {
    dilemma: 'Tộc trưởng muốn một lễ hiến tế để cầu mưa. Bạn biết mây đang đến, dù không có lễ.',
    safe: 'Nói thật: mưa sẽ đến', tempt: 'Làm lễ, để bộ lạc tin',
    good: 'Mưa đến hai ngày sau, không cần lễ. Bộ lạc bắt đầu tin vào lời dự báo của bạn hơn đá tế.', bad: 'Mưa đến muộn ba ngày. Tộc trưởng nói bạn đã làm Thần Rắn giận.',
    temptGood: 'Mưa đến ngay sau lễ. Bộ lạc tin Thần Rắn hài lòng. Bạn biết sự thật.', temptBad: 'Mưa không đến. Lễ vật đã chết vô ích.',
    fallout: 'Một tư tế trẻ hỏi bạn: lần trước, mưa đến vì lễ, hay vì mây?',
    arcs: [
      ['Đêm trăng máu', 'Trăng chuyển màu đỏ, và cả bộ lạc chờ đại tư tế giải điềm.', 'Bạn đọc sách cổ, hỏi những tư tế già nhất.', 'Một phe muốn bạn tuyên bố đó là điềm chiến tranh, để đánh bộ lạc láng giềng.', 'Bạn tuyên bố đó là điềm của mùa trứng tốt, và mùa ấy trứng nở đầy bãi.'],
      ['Giấc mơ của Thần Rắn', 'Thần Rắn gọi bạn trong giấc mơ, ba đêm liền.', 'Bạn nhịn ăn, nằm trong đền, chờ giấc mơ thứ tư.', 'Giọng nói trong mơ đòi một lễ vật lớn chưa từng có.', 'Bạn hỏi lại giọng nói ấy một câu chỉ Thần Rắn thật mới trả lời được, và nó im lặng.'],
    ],
  },
  lizard_venom: {
    dilemma: 'Một tộc trưởng láng giềng xin bạn thuốc giải cho con trai bị rắn cắn. Hai bộ lạc đang thù nhau.',
    safe: 'Cho thuốc giải', tempt: 'Đòi giá: một bãi săn',
    good: 'Con trai hắn sống. Hắn không cảm ơn, nhưng mùa sau, chiến binh của hắn không vượt ranh giới nữa.', bad: 'Con trai hắn sống, nhưng bộ lạc bạn gọi bạn là kẻ phản bội.',
    temptGood: 'Hắn nhượng bãi săn. Con trai hắn sống. Bộ lạc bạn giàu thêm.', temptBad: 'Hắn mặc cả quá lâu. Con trai hắn chết.',
    fallout: 'Tộc trưởng láng giềng gửi đến một sứ giả, mang theo một lọ độc lạ, xin bạn xem nó là gì.',
    arcs: [
      ['Mùa dịch nấm', 'Một dịch nấm lạ lan khắp đầm, và không ai biết thuốc giải.', 'Bạn thử từng loại nọc trên những mẫu nấm.', 'Một thương nhân đề nghị bán thuốc giải giả với giá cao.', 'Bạn tìm ra thuốc giải từ chính nọc của loài rắn ăn nấm.'],
      ['Độc của Vực Thẳm', 'Hắc Nguyệt Hội đầu độc nguồn nước bằng thứ độc không thuộc về đầm lầy.', 'Bạn nếm, ghi chép, và suýt chết ba lần.', 'Hắc Nguyệt Hội đề nghị trao thuốc giải, đổi lấy công thức độc của bạn.', 'Bạn tự pha thuốc giải, và trả độc ngược về cho chúng.'],
    ],
  },
  lizard_egg: {
    dilemma: 'Một quả trứng có vỏ dị dạng. Tục lệ: đập bỏ trước khi nở, vì có thể là điềm xấu.',
    safe: 'Giữ lại cho nó nở', tempt: 'Theo tục lệ',
    good: 'Nó nở ra một con non bình thường, chỉ có vảy hơi lệch. Không có điềm xấu nào.', bad: 'Nó nở ra yếu ớt. Bạn nuôi nó, và tư tế nhìn bạn ngờ vực.',
    temptGood: 'Bộ lạc yên tâm. Bạn không biết bên trong có gì, và tự nhủ không cần biết.', temptBad: 'Bên trong là một con non khỏe mạnh. Bạn không bao giờ quên.',
    fallout: 'Một bà mẹ đến bãi trứng, hỏi quả trứng dị dạng năm ấy là của ai.',
    arcs: [
      ['Mùa lũ', 'Lũ từ núi đổ về, và bãi trứng nằm ở chỗ thấp nhất.', 'Bạn đo mực nước, tìm chỗ cao.', 'Tộc trưởng muốn chỉ cứu trứng của các gia tộc lớn.', 'Bạn cứu mọi quả trứng, không phân biệt, và mất ba đêm không ngủ.'],
      ['Lứa trứng vàng', 'Mười quả trứng vàng xuất hiện cùng một mùa, điều chưa từng có.', 'Bạn canh chúng ngày đêm, nghe từng tiếng gõ.', 'Tháp Ngà đề nghị một rương vàng cho mỗi quả.', 'Mười con non vảy vàng nở ra, và bạn nuôi chúng như mọi con non khác.'],
    ],
  },
  minotaur_guardian: {
    dilemma: 'Một cô bé Human lạc vào mê cung, khóc trong ngõ cụt. Luật mê cung: kẻ vào thì không ra.',
    safe: 'Dẫn cô ra cửa', tempt: 'Theo luật mê cung',
    good: 'Cô nắm sừng bạn suốt đường ra. Ở cửa, cô vẫy tay. Mẹ cô đứng chờ, run rẩy, rồi cúi đầu với bạn.', bad: 'Một người giữ mê cung khác thấy. Bạn bị phạt canh hầm sâu một mùa.',
    temptGood: 'Bạn để mê cung quyết định. Cô tự tìm được đường ra, như phép màu.', temptBad: 'Tiếng khóc tắt dần. Bạn đi tuần qua ngõ cụt ấy mỗi ngày, và không bao giờ quên.',
    fallout: 'Một đội lính Human đến cổng mê cung, hỏi về cô bé năm ấy.',
    arcs: [
      ['Đêm mê cung đổi hình', 'Mê cung tự đổi hình trong một đêm, và ba người giữ mê cung bị lạc.', 'Bạn bịt mắt, lần tay theo vách, tìm mùi rêu.', 'Một người đề nghị phá tường để đi thẳng.', 'Bạn tìm ra cả ba người trước bình minh, không phá một viên đá.'],
      ['Vết nứt ở trái tim', 'Một vết nứt Vực Thẳm mở ra ở trung tâm mê cung.', 'Bạn dẫn mọi người ra khỏi những hành lang gần vết nứt.', 'Một quý tộc đề nghị trả vàng để được vào xem vết nứt.', 'Bạn giữ trung tâm mê cung cho đến khi các pháp sư kịp đóng vết nứt.'],
    ],
  },
  minotaur_gladiator: {
    dilemma: 'Đối thủ của bạn hôm nay là một Minotaur trẻ, mới bị bán vào đấu trường. Ông chủ muốn trận đấu đến chết.',
    safe: 'Đánh để cả hai sống', tempt: 'Làm theo ông chủ',
    good: 'Bạn húc nó ngã, đè lên, và gầm. Khán đài tưởng nó đã chết. Nó sống, và từ đó ngủ cạnh chuồng bạn.', bad: 'Ông chủ biết bạn đã tha. Bạn bị xích một tháng.',
    temptGood: 'Khán đài phát cuồng. Bạn được thưởng gấp đôi. Đêm ấy bạn không ngủ.', temptBad: 'Nó mạnh hơn bạn tưởng. Cả hai cùng ngã.',
    fallout: 'Mẹ của Minotaur trẻ năm ấy đến đấu trường, tìm bạn.',
    arcs: [
      ['Trận đấu mùa xuân', 'Đấu trường mở mùa mới, và bạn được xếp đấu trận khai mạc.', 'Bạn quan sát đối thủ trong chuồng ba ngày.', 'Ông chủ đề nghị tẩm độc vào vũ khí của bạn để trận đấu ngắn hơn.', 'Bạn đấu sạch, thắng, và khán đài gào tên bạn.'],
      ['Trận đấu tự do', 'Ông chủ hứa: thắng trận lớn nhất năm, bạn được tự do.', 'Bạn luyện tập mỗi đêm, đếm từng hơi thở.', 'Đối thủ đề nghị dàn xếp, chia đôi phần thưởng.', 'Bạn thắng, và bước ra khỏi cổng Huyết Sa lần đầu tiên.'],
    ],
  },
  minotaur_shaman: {
    dilemma: 'Tượng Cổ Thần hứa sẽ chữa bệnh cho đàn bò của tộc, nếu bạn nới lỏng một mắt xích.',
    safe: 'Từ chối, tự chữa đàn bò', tempt: 'Nới một mắt xích, chỉ một',
    good: 'Bạn chữa được một nửa đàn bằng lời ru và thảo dược. Cổ Thần vẫn ngủ.', bad: 'Bạn không chữa được. Đàn bò chết gần hết. Tộc trách bạn.',
    temptGood: 'Đàn bò đứng dậy, khỏe mạnh. Bạn siết lại mắt xích ngay đêm ấy. Tiếng thở dưới tượng lớn hơn một chút.', temptBad: 'Mắt xích không siết lại được. Tiếng thở dưới tượng giờ nghe rõ cả ngoài đền.',
    fallout: 'Những Minotaur khác bắt đầu nghe thấy tiếng thì thầm từ đền.',
    arcs: [
      ['Đêm tượng rỉ máu', 'Tượng Cổ Thần rỉ máu ba đêm liền, và tộc sợ hãi.', 'Bạn hát lời ru, nghe tiếng thở, đếm nhịp.', 'Một tư tế trẻ muốn đập vỡ tượng.', 'Bạn ru được Cổ Thần ngủ lại, và tượng ngừng rỉ máu.'],
      ['Lời ru của cả tộc', 'Phong ấn yếu đi, và một giọng ru không còn đủ.', 'Bạn đi khắp tộc, tìm những giọng hát hay nhất.', 'Cổ Thần đề nghị cho tộc hết mù màu, nếu bạn ngừng hát.', 'Cả tộc cùng hát lời ru trong một đêm, và phong ấn mạnh hơn bao giờ hết.'],
    ],
  },
  troll_bridge: {
    dilemma: 'Một bà già nghèo muốn qua cầu, nhưng không có gì để trả. Luật cầu: ai qua thì trả.',
    safe: 'Cho qua miễn phí', tempt: 'Bắt bà trả một thứ gì đó',
    good: 'Bà qua cầu, quay lại, và đặt một chiếc khăn len lên lan can. Bạn quàng nó suốt mùa đông.', bad: 'Những người khác nghe chuyện, và bắt đầu nói mình nghèo.',
    temptGood: 'Bà trả bằng một bài hát. Bài hát hay đến mức bạn hát lại cả tuần.', temptBad: 'Bà không có gì. Bà đi vòng mười dặm. Bạn thấy mình như một con Troll xấu.',
    fallout: 'Con trai bà già năm ấy đến cầu, mang theo một giỏ bánh.',
    arcs: [
      ['Cây cầu sau cơn bão', 'Bão làm sập một nửa cây cầu, và cả làng hai bờ bị chia cắt.', 'Bạn lặn xuống sông tìm những tảng đá rơi.', 'Một thương nhân đề nghị xây cầu gỗ tạm, thu phí gấp ba.', 'Bạn kéo từng tảng đá lên, và cây cầu đứng lại trong một mùa.'],
      ['Ngày Vua Cầu', 'Ba cây cầu, ba Troll giữ cầu, và chỉ một sẽ được gọi là Vua Cầu.', 'Bạn đi thăm từng cây cầu, nghe người qua lại kể chuyện.', 'Một Troll đề nghị đẩy hai Troll kia xuống sông.', 'Bạn thắng bằng câu đố, và ba cây cầu giờ có chung một luật.'],
    ],
  },
  troll_merc: {
    dilemma: 'Chủ thuê ra lệnh đốt một kho lúa của làng địch. Bạn biết trong làng chỉ có người già và trẻ con.',
    safe: 'Từ chối, đòi đổi nhiệm vụ', tempt: 'Làm theo hợp đồng',
    good: 'Chủ thuê chửi bạn, nhưng bạn to quá để đuổi. Hắn đổi nhiệm vụ: canh cầu. Bạn giỏi việc đó.', bad: 'Chủ thuê đuổi bạn, không trả tiền.',
    temptGood: 'Kho lúa cháy. Làng địch đầu hàng mà không ai chết. Bạn vẫn thấy khó chịu.', temptBad: 'Lửa lan sang nhà dân. Bạn chạy, vì Troll sợ lửa, và nghe tiếng hét sau lưng.',
    fallout: 'Dân làng năm ấy treo một tấm vải vẽ hình Troll ở cổng, như một lời nguyền.',
    arcs: [
      ['Hợp đồng ở đèo hẹp', 'Một đoàn buôn cần qua đèo hẹp, nơi bọn cướp phục kích.', 'Bạn đi trước, nhìn từng mỏm đá.', 'Bọn cướp đề nghị chia đôi nếu bạn để chúng cướp.', 'Bạn đứng chắn giữa đèo, và bọn cướp quyết định tìm đoàn khác.'],
      ['Trận chiến không lửa', 'Một đạo quân đông gấp đôi tiến đến, và họ có pháp sư lửa.', 'Bạn tìm hiểu chỗ nào có sông, chỗ nào có đá ướt.', 'Chủ thuê muốn bạn lao thẳng vào, làm mồi cho lửa.', 'Bạn dẫn trận chiến xuống lòng sông, nơi lửa không cháy được.'],
    ],
  },
  troll_scholar: {
    dilemma: 'Một học giả Human trả tiền để bạn ngồi cho hắn nghiên cứu, như một con thú lạ. Hắn sẽ viết sách về Troll.',
    safe: 'Đồng ý, nhưng đòi đọc bản thảo', tempt: 'Đồng ý, lấy tiền',
    good: 'Bạn đọc bản thảo, sửa mười hai chỗ sai. Hắn ngạc nhiên, rồi ghi tên bạn là đồng tác giả.', bad: 'Hắn không cho đọc. Cuốn sách viết rằng Troll không biết chữ.',
    temptGood: 'Bạn có tiền mua mười cuốn sách. Cuốn sách của hắn viết sai về Troll, nhưng bạn đã quen.', temptBad: 'Cuốn sách viết rằng Troll ăn sách. Bạn không cãi được, vì đúng một phần.',
    fallout: 'Một học giả khác đọc cuốn sách ấy, và đến tìm bạn để hỏi thật.',
    arcs: [
      ['Kỳ thi ở thư viện', 'Thư viện làng mở kỳ thi đọc, và chưa từng có Troll nào dự.', 'Bạn đọc lại mọi cuốn sách đã học.', 'Một đứa trẻ đề nghị đọc thầm đáp án cho bạn.', 'Bạn đọc to trước cả làng, chậm, rõ, và không sai chữ nào.'],
      ['Cuốn sách của Troll', 'Bạn muốn viết cuốn sách đầu tiên về Troll do chính Troll viết.', 'Bạn đi khắp các hang Troll, nghe chuyện.', 'Một nhà in đề nghị in sách với điều kiện thêm chuyện Troll ăn thịt người cho hấp dẫn.', 'Cuốn sách ra đời, chữ to, tranh nhiều, và hoàn toàn đúng sự thật.'],
    ],
  },
};
