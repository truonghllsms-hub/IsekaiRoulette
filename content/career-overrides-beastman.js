// Each Beastman trade's own everyday dilemma, its aftermath and its two promotion trials (ranks 2 and 4).
// Arc: [title, intro, survey step, temptation step, final step].
module.exports = {
  bm_berserker: {
    dilemma: 'Cơn cuồng nộ đang dâng lên giữa trận, và bạn thấy một chiến binh Orc trẻ đã buông rìu, quỳ xuống xin hàng. Nếu dừng lại lúc này, con thú trong bạn sẽ quay sang cắn chính bạn.',
    safe: 'Ghìm cơn cuồng nộ, tha cho hắn', tempt: 'Để con thú làm việc của nó',
    good: 'Bạn cắn răng đến bật máu, và cơn điên lắng xuống. Tên Orc trẻ bỏ chạy. Đêm ấy bạn sốt, nhưng bạn biết mình vẫn là mình.', bad: 'Bạn ghìm được, nhưng ngã quỵ giữa trận. Đồng đội phải kéo bạn ra.',
    temptGood: 'Con thú làm việc của nó, nhanh và gọn. Bạn tỉnh lại giữa chiến trường, và không nhớ khuôn mặt của kẻ đã quỳ xin.', temptBad: 'Con thú không dừng lại ở tên Orc. Khi bạn tỉnh, một đồng đội đang băng vết thương do chính bạn gây ra.',
    fallout: 'Tên Orc trẻ năm ấy giờ là tù trưởng. Hắn gửi sứ giả đến tìm bạn, mang theo chiếc rìu hắn đã buông xuống hôm đó.',
    arcs: [
      ['Vòng lửa của Trại Huyết Môn', 'Trại Huyết Môn mở nghi lễ thử thách Berserker: đứng giữa vòng lửa và chịu đựng cơn cuồng nộ mà không tấn công ai.', 'Bạn ngồi bên những Berserker già, nghe họ kể cách họ vượt qua vòng lửa.', 'Một kẻ thách đấu đề nghị cho bạn uống nước Huyết Thảo để không còn cảm thấy gì, trái với luật nghi lễ.', 'Bạn bước vào vòng lửa khi trống bắt đầu gõ.'],
      ['Tướng quân của cơn bão', 'Một đạo quân Orc lớn nhất trăm năm tiến vào Thảo Nguyên, và các bộ lạc cần một Berserker dẫn đầu hàng xung kích.', 'Bạn đi dọc phòng tuyến, chọn từng chiến binh có thể giữ lý trí trong cơn điên.', 'Hội đồng muốn bạn cho uống thuốc cuồng nộ cả hàng xung kích, để không ai biết sợ và không ai biết dừng.', 'Bạn đứng ở đầu hàng xung kích khi tiếng tù và của Orc vang lên.'],
    ],
  },
  bm_hunter: {
    dilemma: 'Bạn đã theo dấu một con nai đầu đàn suốt ba ngày. Giờ nó đứng trước mũi tên của bạn, và bạn thấy sau lưng nó là con nai mẹ cùng hai con non.',
    safe: 'Hạ cung, săn con khác', tempt: 'Bắn, đàn sẽ tự tìm đầu đàn mới',
    good: 'Bạn mất thêm hai ngày, và mang về một con nai già sắp chết. Bộ lạc vẫn có thịt. Đàn nai vẫn có đầu đàn.', bad: 'Bạn không tìm được con khác. Về tay trắng, và bộ lạc ăn khoai thêm một tuần.',
    temptGood: 'Mũi tên trúng tim. Bộ lạc ăn no. Mùa sau, đàn nai không còn đi qua thung lũng ấy nữa.', temptBad: 'Mũi tên trượt, con nai bị thương bỏ chạy. Bạn phải theo nó thêm hai ngày để kết thúc việc mình làm dở.',
    fallout: 'Đàn nai không đầu đàn năm ấy đã tản mát, và bầy sói bắt đầu xuống gần trại hơn vì thiếu con mồi.',
    arcs: [
      ['Mùa săn của bộ lạc', 'Bộ lạc giao cho bạn dẫn mùa săn đầu tiên của mình, và mùa đông năm ấy phụ thuộc vào nó.', 'Bạn đi trước đoàn săn ba ngày, đọc dấu chân, đếm phân, đoán đường đi của đàn bò rừng.', 'Một thợ săn già đề nghị lùa cả đàn xuống vực, lấy được gấp ba số thịt cần dùng.', 'Bạn giương cung khi đàn bò rừng ầm ầm tràn vào thung lũng.'],
      ['Bóng ma Thảo Nguyên', 'Một con ma thú vô hình đang giết gia súc của ba bộ lạc, và không thợ săn nào từng thấy nó.', 'Bạn ngồi bất động suốt bảy đêm, lắng nghe, chờ đợi, học nhịp thở của Thảo Nguyên.', 'Các bộ lạc muốn đốt cả đồng cỏ để lùa nó ra, dù lửa sẽ lan đến những làng xa.', 'Bạn bước vào lớp sương mù đêm cuối, khi mùi máu tươi bay đến từ phía bắc.'],
    ],
  },
  bm_gladiator: {
    dilemma: 'Ông chủ đấu trường muốn bạn mặc áo da sói, vẽ răng nanh, và gầm lên trước khán đài như một con thú. Khán đài trả tiền để xem Beastman là quái vật.',
    safe: 'Ra sân như một chiến binh', tempt: 'Đóng vai quái vật',
    good: 'Khán đài la ó một lúc, rồi im lặng xem bạn đánh. Ông chủ trừ tiền, nhưng có vài khán giả quay lại xem bạn những trận sau.', bad: 'Ông chủ phạt bạn nhịn đói ba ngày.',
    temptGood: 'Khán đài phát cuồng. Tiền thưởng gấp đôi. Đêm ấy bạn cọ mãi không sạch vết sơn răng nanh trên mặt.', temptBad: 'Bạn diễn vụng, và khán đài cười nhạo cả quái vật lẫn người diễn.',
    fallout: 'Một đứa trẻ Beastman mới bị bán vào đấu trường nhìn bạn và hỏi: “Có phải ta cũng phải giả làm thú không?”',
    arcs: [
      ['Cát đỏ của Huyết Sa', 'Đấu trường mở mùa đấu mới, và bạn được xếp vào trận khai mạc với một con thú thật.', 'Bạn quan sát con thú trong chuồng suốt ba ngày, học cách nó di chuyển.', 'Ông chủ đề nghị bỏ thuốc mê vào thức ăn của con thú để bạn thắng dễ dàng trước khán đài.', 'Bạn bước lên cát đỏ khi cổng chuồng thú mở ra.'],
      ['Chiếc xích cuối cùng', 'Bạn có cơ hội giành tự do cho cả dãy chuồng Beastman, nếu thắng trận đấu lớn nhất năm.', 'Bạn đếm từng người trong dãy chuồng, nhớ tên họ, hứa với họ.', 'Ban tổ chức đề nghị tự do cho riêng bạn, đổi lấy việc bạn thua trận và bỏ lại những người khác.', 'Bạn bước ra trước ba vạn khán giả, mang theo tên của tất cả những người trong dãy chuồng.'],
    ],
  },
  bm_scout: {
    dilemma: 'Bạn phát hiện một toán lính Human đang ngủ say trong hẻm núi, chỉ có một người gác, và người đó đang ngủ gật. Báo về trại thì họ sẽ bị tấn công trước bình minh. Họ chưa làm gì bộ lạc bạn.',
    safe: 'Báo cáo đúng những gì thấy, kể cả việc họ chưa gây hại', tempt: 'Báo cáo rằng họ đang chuẩn bị tấn công',
    good: 'Tộc trưởng nghe, và quyết định cử người đến hỏi chuyện thay vì tấn công. Hóa ra đó là một đoàn lính đào ngũ muốn đi qua Thảo Nguyên.', bad: 'Tộc trưởng vẫn quyết định tấn công. Bạn không thể làm gì hơn.',
    temptGood: 'Trại tấn công trước bình minh. Không ai bên mình bị thương. Bạn không đi xem hẻm núi sau đó.', temptBad: 'Toán lính chống trả dữ dội. Trại mất ba chiến binh vì một lời báo cáo.',
    fallout: 'Một người lính sống sót từ hẻm núi năm ấy tìm đến trại, hỏi ai là trinh sát đã đứng trên vách đá đêm đó.',
    arcs: [
      ['Đôi mắt trên vách đá', 'Bộ lạc cần biết một đạo quân lạ đang đi về đâu, và bạn là trinh sát duy nhất còn ở trại.', 'Bạn leo lên vách đá cao nhất, đếm đuốc, đếm ngựa, đếm cờ.', 'Một kẻ buôn tin đề nghị bán cho bạn thông tin về đạo quân, với giá là bán lại cho hắn vị trí của trại.', 'Bạn bò qua cỏ đến sát đạo quân khi trăng lặn.'],
      ['Bóng ma chiến trường', 'Hai đạo quân lớn sắp va vào nhau, và bạn được giao làm mắt cho cả liên minh bộ lạc.', 'Bạn đi giữa hai đạo quân suốt ba ngày, ghi lại từng tướng lĩnh, từng điểm yếu.', 'Một tướng đề nghị bạn vẽ sai bản đồ cho phe kia, khiến hàng nghìn người đi vào bẫy.', 'Bạn trở về trại liên minh khi trống trận bắt đầu gõ.'],
    ],
  },
  bm_shaman: {
    dilemma: 'Một gia đình nghèo nhờ bạn gọi hồn đứa con đã mất. Bạn nghe thấy giọng đứa trẻ, nhưng nó đang khóc vì bị cầm giữ, không muốn quay lại.',
    safe: 'Nói thật với gia đình và để đứa trẻ đi', tempt: 'Nói rằng đứa trẻ đang hạnh phúc ở bên kia',
    good: 'Người mẹ khóc, rồi gật đầu. Bạn làm lễ tiễn. Đêm ấy, gió thổi qua lều nhà họ ấm áp lạ thường.', bad: 'Người mẹ không chấp nhận. Bà đi tìm một shaman khác, và bạn nghe nói người đó đã giữ đứa trẻ lại.',
    temptGood: 'Gia đình được an ủi. Bạn nghe tiếng khóc của đứa trẻ trong gió suốt nhiều đêm sau.', temptBad: 'Người mẹ nghe thấy tiếng khóc qua bạn, và biết bạn nói dối.',
    fallout: 'Linh hồn đứa trẻ năm ấy vẫn chưa siêu thoát. Nó bắt đầu theo bạn, thì thầm bên tai mỗi khi bạn thiền định.',
    arcs: [
      ['Lời gọi của gió', 'Gió trên Thảo Nguyên ngừng thổi suốt mười ngày, và các shaman nói linh hồn gió đã bị ai đó trói lại.', 'Bạn đi theo những vệt cỏ khô lặng im, tìm nơi gió dừng thổi.', 'Một shaman của bộ lạc khác đề nghị trói luôn linh hồn gió của bộ lạc đối thủ, để Thảo Nguyên chỉ có gió cho phe mình.', 'Bạn đứng trên ngọn đồi trọc, gọi tên linh hồn gió bằng giọng của tổ tiên.'],
      ['Sứ giả Yggdrasil', 'Rễ của Cây Thế Giới đang héo ở rìa Thảo Nguyên, và chỉ shaman mới nghe được nó đang nói gì.', 'Bạn áp tai xuống đất suốt ba đêm, lắng nghe nhịp đập của rễ cây.', 'Các Elf đề nghị bạn chặt rễ héo đi, dù cây đang khóc vì đau.', 'Bạn đặt tay lên rễ cây, dâng mana của chính mình để chữa lành nó.'],
    ],
  },
  bm_merc: {
    dilemma: 'Khách hàng Human trả bạn để hộ tống đoàn xe qua lãnh thổ một bộ lạc Beastman. Bộ lạc ấy chặn đường đòi thuế, và theo luật Thảo Nguyên, họ có quyền.',
    safe: 'Thương lượng để khách hàng nộp thuế', tempt: 'Dùng giáo mở đường',
    good: 'Khách hàng càu nhàu nhưng trả thuế. Bộ lạc cho đoàn đi qua, và nhớ mặt bạn như một người hiểu luật.', bad: 'Khách hàng không chịu trả. Bạn phải đi đường vòng mất năm ngày, và bị trừ tiền công.',
    temptGood: 'Bộ lạc lùi lại trước ngọn giáo của Sói Bạc. Đoàn xe đi qua. Lần sau, không bộ lạc nào trên Thảo Nguyên chịu bán nước cho bạn.', temptBad: 'Bộ lạc không lùi. Một trận đánh nhỏ nổ ra, và có người bị thương ở cả hai phía.',
    fallout: 'Bộ lạc năm ấy gửi lời đến Hội đồng Tộc trưởng, tố cáo một lính Sói Bạc là kẻ phản bội Thảo Nguyên.',
    arcs: [
      ['Đoàn xe qua đèo Răng Cưa', 'Một đoàn xe buôn lớn cần đi qua đèo Răng Cưa vào mùa tuyết, và chỉ Sói Bạc chịu nhận hợp đồng.', 'Bạn đi trước đoàn, đánh hơi những chỗ tuyết dễ lở, những hang có thể có cướp.', 'Chủ đoàn muốn bỏ lại những phu khuân vác Beastman bị cảm lạnh để đi nhanh hơn.', 'Bạn dẫn đoàn xe qua khúc đèo hẹp nhất khi tuyết bắt đầu đổ.'],
      ['Mắt Huyết của Sói Bạc', 'Thương hội Sói Bạc mở cuộc tuyển chọn Mắt Huyết mới, danh hiệu cao nhất cho lính Beastman.', 'Bạn hoàn thành từng hợp đồng thử thách, ghi lại từng người mình đã bảo vệ.', 'Một ứng viên khác đề nghị chia đôi danh hiệu nếu bạn giúp hắn gian lận trong thử thách cuối.', 'Bạn bước vào thử thách cuối cùng: bảo vệ một đoàn xe qua lãnh thổ Ma tộc trong ba ngày.'],
    ],
  },
  bm_leather: {
    dilemma: 'Một thợ săn mang đến tấm da của một con sói trắng, loài thú thiêng của bộ lạc tộc Sói láng giềng. Hắn trả gấp năm để bạn làm áo choàng, và không ai biết nó từ đâu.',
    safe: 'Từ chối và trả tấm da về cho bộ lạc tộc Sói', tempt: 'Làm áo, giữ im lặng',
    good: 'Bộ lạc tộc Sói nhận lại tấm da, làm lễ chôn cất. Họ gửi đến xưởng bạn một chiếc vòng xương, dấu hiệu của bạn hữu.', bad: 'Thợ săn nổi giận, tố cáo bạn ăn cắp tấm da. Phải mất nhiều tháng bạn mới rửa được tên mình.',
    temptGood: 'Chiếc áo choàng đẹp nhất bạn từng làm. Nó được bán đến Sanctus. Bạn không dám nghĩ người mặc nó là ai.', temptBad: 'Bộ lạc tộc Sói phát hiện ra chiếc áo ở chợ phiên. Họ biết ai đã làm nó.',
    fallout: 'Một người tộc Sói đến xưởng bạn, mang theo bộ xương của con sói trắng, hỏi bạn đã làm gì với phần còn lại.',
    arcs: [
      ['Bộ giáp cho chiến binh trẻ', 'Bộ lạc sắp có một lứa chiến binh mới, và mỗi người cần một bộ giáp da trước mùa trận.', 'Bạn đo từng người, nghe họ kể về lần đầu săn thú, chọn da hợp với từng người.', 'Tộc trưởng muốn bạn dùng da mỏng để làm nhanh cho kịp, dù giáp sẽ không chịu nổi một nhát rìu.', 'Bạn khâu mũi kim cuối cùng của bộ giáp cuối cùng trong đêm trước khi lứa chiến binh lên đường.'],
      ['Vảy rồng của Đảo Tro Tàn', 'Một mảnh vảy Rồng lớn bằng cánh cửa trôi dạt vào bờ sông, và mọi tộc đều muốn có nó.', 'Bạn nghiên cứu mảnh vảy, thử từng loại dao, từng loại kim, xem nó chịu được gì.', 'Một thương nhân Sanctus đề nghị mua lại mảnh vảy với giá đủ nuôi cả bộ lạc mười năm.', 'Bạn bắt đầu cắt mảnh vảy Rồng, biết rằng chỉ có một cơ hội.'],
    ],
  },
  bm_herder: {
    dilemma: 'Một con bò cái trong đàn mắc bệnh lạ. Nếu giết nó ngay, đàn an toàn. Nếu chữa, có thể cứu được nó, nhưng cũng có thể cả đàn bị lây.',
    safe: 'Cách ly và chữa', tempt: 'Giết ngay',
    good: 'Bạn dựng một chuồng riêng xa đàn, ngủ cạnh nó mười đêm. Nó khỏi bệnh, và không con nào khác bị lây.', bad: 'Nó không qua khỏi. Bạn đốt chuồng và xác, và may mắn là không con nào khác bị lây.',
    temptGood: 'Đàn an toàn. Bạn chôn con bò cái dưới gốc cây, và không nói với ai rằng nó đã có thể sống.', temptBad: 'Bệnh đã lây trước khi bạn kịp ra tay. Hai con khác ngã bệnh.',
    fallout: 'Dịch bò lạ năm ấy giờ đang lan sang các bộ lạc khác, và họ hỏi bạn đã làm gì khi nó xuất hiện lần đầu.',
    arcs: [
      ['Đàn bò qua mùa tuyết', 'Mùa đông khắc nghiệt nhất mười năm ập đến, và đàn bò của bộ lạc đang ở xa đồng cỏ mùa đông.', 'Bạn đi tìm đường lùa đàn về, đánh hơi những chỗ tuyết mỏng, những chỗ có cỏ dưới tuyết.', 'Tộc trưởng muốn bạn bỏ lại những con bò già yếu để lùa phần còn lại về nhanh hơn.', 'Bạn dẫn đàn bò băng qua đồng tuyết dưới cơn bão cuối mùa.'],
      ['Chúa tể đồng cỏ', 'Ba bộ lạc tranh nhau một đồng cỏ màu mỡ, và họ nhờ bạn, người chăn thú giỏi nhất, phân xử.', 'Bạn đi khắp đồng cỏ, đếm từng con suối, từng bãi cỏ, từng lối đi của gia súc.', 'Một bộ lạc đề nghị tặng bạn một nửa đàn bò của họ nếu bạn phân xử có lợi cho họ.', 'Bạn đứng trước ba tộc trưởng, chia đồng cỏ theo cách bạn tin là công bằng.'],
    ],
  },
  bm_thief: {
    dilemma: 'Bạn lẻn vào nhà một thương gia giàu, và thấy trong két không chỉ có vàng mà còn có những giấy nợ của hàng chục gia đình nghèo khu ổ chuột.',
    safe: 'Chỉ lấy giấy nợ và đốt đi', tempt: 'Lấy vàng, để lại giấy nợ',
    good: 'Sáng hôm sau, hàng chục gia đình không còn nợ ai. Thương gia không biết ai đã làm, và không đòi được ai.', bad: 'Thương gia có bản sao giấy nợ. Bạn chỉ làm hắn tức giận thêm.',
    temptGood: 'Bạn giàu một đêm. Hàng chục gia đình vẫn nợ. Bạn đi qua khu ổ chuột và nhìn đi chỗ khác.', temptBad: 'Bạn bị phát hiện khi đang khuân vàng. Bạn chạy, và vàng rơi vãi khắp con hẻm.',
    fallout: 'Thương gia năm ấy treo thưởng cho kẻ đã vào két nhà hắn, và những người trong khu ổ chuột biết đó là ai.',
    arcs: [
      ['Đêm trăng không bóng', 'Một kho báu của nhà vua sẽ được chuyển qua Sanctus trong đêm không trăng, và cả thế giới ngầm đều đang nhắm đến nó.', 'Bạn theo dõi lộ trình của đoàn xe, đếm lính gác, ghi nhớ từng góc phố.', 'Một băng đảng đề nghị bạn hợp tác, nhưng kế hoạch của chúng có giết lính gác.', 'Bạn ra tay khi đoàn xe rẽ vào con hẻm tối nhất Sanctus.'],
      ['Ngai vàng dưới lòng đất', 'Vua thế giới ngầm Sanctus vừa chết, và năm băng đảng đang tranh ngai vàng của hắn.', 'Bạn gặp riêng từng thủ lĩnh, nghe họ nói, ghi nhớ điều họ sợ.', 'Một thủ lĩnh đề nghị liên minh để giết bốn kẻ còn lại trong một đêm.', 'Bạn bước vào hầm rượu nơi năm thủ lĩnh ngồi quanh một chiếc bàn trống.'],
    ],
  },
  bm_mage: {
    dilemma: 'Tộc trưởng muốn bạn khắc rune bảo vệ lên giáo của các chiến binh trước khi đi đánh một bộ lạc láng giềng vì tranh nước. Bạn biết rune của mình sẽ khiến trận đánh đẫm máu hơn.',
    safe: 'Khắc rune chữa lành thay vì rune chiến đấu', tempt: 'Khắc đúng như tộc trưởng muốn',
    good: 'Tộc trưởng giận dữ, nhưng sau trận, ít người chết hơn bất kỳ trận nào trước đó. Bộ lạc láng giềng gửi sứ giả đến bàn chuyện chia nước.', bad: 'Tộc trưởng tịch thu đá rune của bạn, và tìm một Hexer khác.',
    temptGood: 'Giáo của bộ lạc bạn xuyên qua mọi khiên. Bộ lạc thắng. Bạn không đi xem những nấm mồ ở bộ lạc bên kia.', temptBad: 'Rune chiến đấu dội ngược. Ba chiến binh bên mình bị thương bởi chính giáo của họ.',
    fallout: 'Bộ lạc láng giềng năm ấy đã tìm được một pháp sư Tháp Ngà, và họ đang khắc rune của riêng họ.',
    arcs: [
      ['Đá rune trên núi', 'Một tảng đá rune cổ trên núi bắt đầu nứt, và hơi lạnh từ vết nứt đang làm chết cỏ quanh đó.', 'Bạn nghiên cứu từng nét rune trên tảng đá, tìm xem nó đã bảo vệ điều gì suốt nghìn năm.', 'Một học giả Tháp Ngà đề nghị mua lại tảng đá, đưa về Sanctus nghiên cứu, dù nó sẽ không còn bảo vệ được gì.', 'Bạn khắc rune mới vào vết nứt khi đêm trăng non đến.'],
      ['Hiền giả của núi', 'Các bộ lạc mời bạn khắc rune bảo vệ cho cả Thảo Nguyên trước một mùa đông Ma tộc tràn xuống.', 'Bạn đi khắp Thảo Nguyên, chọn những ngọn đồi, những khe núi nơi đặt đá rune.', 'Tháp Ngà đề nghị gửi pháp sư giúp, đổi lấy việc bạn dạy họ mọi rune của tổ tiên.', 'Bạn đặt hòn đá rune cuối cùng khi tiếng tù và của Ma tộc vang lên từ phía bắc.'],
    ],
  },
  bm_courier: {
    dilemma: 'Bạn mang một lá thư niêm phong của một lãnh chúa Human gửi cho một tộc trưởng. Qua lớp giấy mỏng, bạn đọc được vài chữ: lãnh chúa đang lừa tộc trưởng ký một hiệp ước bán đất.',
    safe: 'Giao thư nguyên vẹn, nhưng nói với tộc trưởng hãy đọc kỹ', tempt: 'Giao thư và im lặng',
    good: 'Tộc trưởng đọc kỹ, tìm ra cái bẫy, và từ chối ký. Lãnh chúa không biết ai đã nhắc.', bad: 'Tộc trưởng không nghe một người đưa thư. Hiệp ước được ký.',
    temptGood: 'Bạn giữ đúng luật của người đưa thư. Tộc trưởng ký hiệp ước. Một năm sau, bộ lạc mất nửa đồng cỏ.', temptBad: 'Lãnh chúa biết bạn đã đọc qua lớp giấy, và không bao giờ thuê trạm thư của bạn nữa.',
    fallout: 'Bộ lạc mất đất năm ấy biết được người đưa thư đã đọc được nội dung lá thư, và họ muốn biết vì sao bạn im lặng.',
    // its promotion trials stay the audited courier ones (content/career-corrections.js)
  },
};
