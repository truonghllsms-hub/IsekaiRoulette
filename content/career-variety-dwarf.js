// Dwarf trades: other ways in, their own promotion trials, a second milestone, everyday scenes,
// and more quiet-year lines. See career-variety.js.
module.exports = {
  race: 'dwarf',
  lead: {
    teen: [
      'Râu bạn đã đủ dài để tết bím đầu tiên. Theo lệ của Dãy Núi Răng Cưa, hôm đó cả gia tộc ngồi vào bàn đá và chờ bạn nói mình sẽ cầm búa, cầm cuốc hay cầm thứ gì khác.',
      'Ngày Chọn Nghề, các phường thợ dựng lò mẫu dọc đại sảnh. Lũ Dwarf trẻ đi từ lò này sang lò khác, và phường nào cũng hét rằng nghề của họ mới là nghề của tổ tiên.',
      'Ông chú ném cho bạn một cục đá: “Nhìn vào nó. Mày thấy quặng, thấy tượng, hay thấy tiền?” Mỗi câu trả lời dẫn đến một cái nghề khác nhau.',
      'Vại bia đầu tiên bạn được uống cùng người lớn đi kèm một câu hỏi của cả bàn: “Thế nào, thằng nhỏ, tính làm gì ăn?”',
      'Một Dwarf không có nghề thì không có chỗ ngồi ở sảnh tiệc. Ghế của bạn năm nay vẫn kê ở bàn trẻ con, và bạn bắt đầu thấy đầu gối mình thừa ra.',
    ],
    adult: [
      'Núi không nuôi kẻ rảnh tay. Bạn đã ăn bánh của gia tộc đủ lâu; đến lúc nướng lấy bánh của mình.',
      'Sau bao năm chần chừ, bạn nhận ra bộ râu mình đã dài hơn râu của vài thợ cả. Thế này thì không ổn.',
      'Một trưởng lão dừng lại trước mặt bạn trong hành lang, nhìn đôi tay không vết chai, và thở dài rất to.',
    ],
    origins: {
      bg_1: 'Mười đời nhà bạn đứng trước Lò Rèn Vĩnh Cửu. Cây búa của ông cố đã treo sẵn trên vách chờ bạn, nhưng lệ Dwarf vẫn buộc phải hỏi: con có nhận không?',
      bg_2: 'Kẻ lưu vong không có gia tộc để nối nghề. Ở Đầm Lầy, bạn học cách sống sót; giờ bạn cần học cách làm ra thứ gì đó.',
      bg_3: 'Bạn lớn lên giữa những bao hàng của Silver Wolf Company, biết cân vàng trước khi biết cầm búa. Viên quản lý bảo đã đến lúc bạn tự kiếm phần lương của mình.',
      bg_4: 'Đấu trường Huyết Sa không cần một Dwarf đã quá tuổi làm trò mua vui cho trẻ con. Cánh cổng mở ra, và bạn phải tìm một nghề ngoài kia.',
      bg_5: 'Bụi quặng đã nằm trong phổi bạn từ ngày sinh. Cha bạn đưa cho bạn cây cuốc chim nhỏ ngày xưa, giờ đã quá nhẹ: nhận cây lớn, hay tìm đường khác?',
      bg_6: 'Các tu sĩ Thánh Quang nuôi bạn bằng lòng tốt và thứ bánh mì nhạt thếch. Giờ họ tiễn bạn về núi, và núi sẽ hỏi bạn biết làm gì.',
      bg_7: 'Hắc Nguyệt Hội dạy bạn sợ, chứ không dạy bạn nghề. Thoát ra rồi, việc đầu tiên bạn muốn là có đôi tay làm được một thứ của riêng mình.',
      bg_8: 'Một Dwarf lớn lên dưới bầu trời Thảo Nguyên là chuyện lạ. Bạn trở về núi với nước da rám nắng, và phải chứng minh mình vẫn là Dwarf bằng một cái nghề.',
      bg_9: 'Lời nguyền Đá Đen khiến các phường thợ ngần ngại nhận bạn. Bạn sẽ phải chọn một nghề và làm nó giỏi đến mức họ quên cả sợ.',
      bg_10: 'Tự Nhiên Giáo dạy bạn nghe cây cỏ, thứ mà Dwarf hiếm khi bận tâm. Trở về lòng núi, bạn phải chọn xem đôi tai ấy dùng được vào nghề gì.',
    },
  },
  jobs: {
    dwarf_runesmith: {
      start: [
        'Bạn vẽ nguệch ngoạc lên tro lò một ký hiệu nhìn thấy trong mơ, và hòn than gần đó bùng cháy. Thợ rune già nhất phường bỏ dở bữa trưa để đến xem đống tro.',
        'Cây búa của bạn gõ lệch nhịp so với cả xưởng, và chỉ riêng món đồ của bạn ngân lên một tiếng lạ. Người ta bảo đó là tiếng của thép muốn mang chữ.',
      ],
      promo: [
        ['khắc một con rune giữ nhiệt lên ấm trà của thầy mà không làm nó nổ.', 'thuộc lòng một trăm lẻ tám cổ tự và viết lại chúng trong lúc đang đạp bễ.'],
        ['rèn một lưỡi rìu mang một rune duy nhất, và rune ấy còn sáng sau một trăm nhát chém.', 'sửa một rune cổ bị mòn trên cổng thành mà không đổi nghĩa của nó.'],
        ['khắc hai rune đối nghịch lên cùng một tấm khiên mà chúng không triệt tiêu nhau.', 'đọc ra tên thợ từ một món cổ vật không ký.'],
        ['tạo ra một rune chưa có trong thư khố và được Hội đồng ghi nhận.', 'rèn một món đồ đủ tốt để được đặt trong Sảnh Tổ Tiên khi bạn còn sống.'],
      ],
      arcs: [
        ['Con rune viết sai', 'Một lô khiên bạn khắc rune bảo hộ đã ra trận, và giờ bạn nhận ra mình khắc ngược một nét.', 'Bạn thử lại trên một tấm khiên mẫu: rune vẫn chạy, nhưng sẽ vỡ ở đòn thứ mười.', 'Thú nhận thì mất danh và phường mất hợp đồng. Im lặng thì ba trăm lính đang cầm chúng ở tiền tuyến.', 'Một người đưa tin sẵn sàng lên đường ngay trong đêm, nếu có ai đó đưa cho hắn một lá thư.'],
        ['Cây búa không ai nhấc nổi', 'Trong di vật của một thợ rune quá cố có một cây búa mà cả phường không ai nhấc lên được.', 'Bạn chép lại các rune trên cán: chúng không phải rune sức mạnh, mà là một câu hỏi.', 'Câu hỏi là: “Ngươi rèn cho ai?” Một trưởng lão gợi ý bạn cứ trả lời thứ nó muốn nghe.', 'Cả phường đứng quanh, và bạn đặt tay lên cán búa.'],
      ],
      quiet: [
        'Một con rune mất của bạn cả mùa đông. Nét cuối cùng bạn khắc khi tuyết bắt đầu tan.',
        'Bạn rèn, khắc, tôi, rồi nung chảy và làm lại. Lần thứ tư thì nó ngân đúng tiếng.',
        'Thư khố Rune có một kệ bạn chưa đọc hết. Năm nay bạn đọc thêm được hai phiến.',
        'Tàn lửa đã đốt thủng tạp dề của bạn thành một chòm sao. Bạn không định thay.',
      ],
      events: [
        { r: [0, 1], t: 'Thầy giao bạn khắc rune lên một trăm cái đinh móng ngựa, cùng một con rune, một trăm lần.', a: ['Khắc cái thứ một trăm kỹ như cái đầu tiên', 'STR', 4, 'Thầy bốc đại một cái trong đống, gõ thử, gật đầu. Ông không nói rằng ông cố tình bốc cái cuối cùng.', 'Đến cái thứ bảy mươi, tay bạn run. Thầy bốc đúng cái ấy.', { jobXp: 1 }, { joy: -3 }], b: ['Xin chia làm hai ngày', 'Thầy càu nhàu rằng thép không chờ ai, nhưng vẫn cho. Một trăm cái đinh đều tay.', { jobXp: 0.5 }] },
        { r: [0], t: 'Con rune giữ lạnh bạn khắc thử lên vại bia hoạt động tốt đến mức bia đông thành đá.', a: ['Khắc thêm một nét hãm, rồi đem mời cả xưởng', 'INT', 4, 'Bia lạnh vừa đúng độ, giữa xưởng rèn nóng như lò. Từ hôm đó, thợ cả gọi bạn bằng tên thay vì “thằng kia”.', 'Nét hãm làm vại bia nứt đôi. Một vại bia đổ là một tội nặng ở xứ này.', { fame: 2, joy: 4 }, { fame: -1, joy: -3 }], b: ['Lặng lẽ đập đá ra mà nhai', 'Bia đá cũng là bia. Không ai biết bạn vừa suýt phát minh ra thứ gì.', { joy: 1 }] },
        { r: [1], t: 'Một quý tộc loài người đòi bạn khắc tên ông ta bằng cổ tự lên thanh kiếm, to và lấp lánh, ngay giữa lưỡi.', a: ['Giải thích vì sao rune không phải đồ trang trí', 'INT', 5, 'Ông ta nghe, bán tín bán nghi, rồi chịu để tên mình ở chuôi. Thanh kiếm ấy không gãy, và ông ta quay lại đặt thêm ba thanh.', 'Ông ta phật ý, mang kiếm sang một xưởng chịu khắc theo ý. Nó gãy ở trận đầu.', { wealth: 5, fame: 1 }, { joy: -2 }], b: ['Khắc theo ý ông ta, lấy tiền', 'Túi tiền nặng. Thanh kiếm thì yếu đi một nửa, và mang tên một kẻ không biết điều đó.', { wealth: 6, joy: -4 }] },
      ],
    },
    dwarf_miner: {
      start: [
        'Bạn áp tai vào vách hầm để nghe trộm người lớn nói chuyện, và nghe thấy tiếng nước ở nơi không ai ngờ có. Hai ngày sau, đường hầm ấy được chống lại kịp lúc.',
        'Hòn đá bạn đá chơi trên đường về hóa ra là quặng bạc. Người thợ mỏ già cầm nó lên hỏi nhặt ở đâu, và bạn dẫn ông đến đúng chỗ, không sai một bước.',
      ],
      promo: [
        ['xúc đủ định mức quặng suốt một mùa mà không sót ngày nào.', 'tự chống lại một đoạn hầm lún trước khi đội cứu hộ đến.'],
        ['lần theo một vỉa quặng mỏng như sợi chỉ cho đến chỗ nó nở ra.', 'đưa cả tổ ra khỏi một đường hầm có khí độc mà không ai bỏ lại ai.'],
        ['mở một lối hầm mới mà không cần chống thêm một cây cột nào.', 'tìm ra túi nước ngầm trước khi nó tìm ra tổ đào.'],
        ['đào đến một tầng mà bản đồ của gia tộc chưa vẽ tới.', 'huấn luyện một lứa thợ trẻ, và không ai trong số chúng chết trong năm đầu.'],
      ],
      arcs: [
        ['Tiếng gõ từ bên kia vách', 'Giữa ca đào, tổ của bạn nghe thấy tiếng gõ đáp lại từ bên kia vách đá, ở nơi không có đường hầm nào.', 'Bạn gõ lại theo mã của thợ mỏ, và nhận được câu trả lời bằng một mã rất cũ.', 'Có thể là một tổ thợ bị vùi từ trận sập ba mươi năm trước, hoặc một thứ gì đó đã học được cách gõ. Đào qua thì yếu cả vách chính.', 'Vách đá chỉ còn dày một gang tay, và tiếng gõ bên kia chợt im.'],
        ['Vỉa vàng dưới nghĩa địa', 'Bạn tìm ra vỉa vàng lớn nhất trăm năm, chạy thẳng xuống dưới Sảnh Tổ Tiên của một gia tộc khác.', 'Bạn đo đạc trong im lặng: muốn lấy vàng thì phải đào dưới nền mộ.', 'Gia tộc của bạn đang nợ ngập đầu. Gia tộc kia thì sẽ coi việc ấy là báng bổ đến mười đời.', 'Trưởng tộc bạn đặt cây cuốc vào tay bạn, và mọi người quay mặt đi chỗ khác.'],
      ],
      quiet: [
        'Thêm một năm dưới lòng núi. Bạn đã thuộc mùi của từng loại đá.',
        'Cây cuốc chim của bạn thay cán lần thứ ba. Đầu sắt thì vẫn là cái cũ.',
        'Bạn đào, chống, đào, chống. Trên kia có chiến tranh hay hòa bình, dưới này đá vẫn thế.',
        'Vỉa quặng năm nay nghèo. Bạn dành những buổi tối để kể cho lũ thợ trẻ nghe về vỉa năm xưa.',
      ],
      events: [
        { r: [0, 1], t: 'Con chim hoàng yến báo khí của tổ bạn ngừng hót. Thợ cả bảo nó chỉ đang ngủ.', a: ['Cứ kéo cả tổ ra ngoài', 'LUCK', 4, 'Con chim tỉnh lại ngoài cửa hầm. Nửa canh giờ sau, một luồng khí đục tràn qua đúng chỗ các bạn vừa đứng. Thợ cả không nói gì, chỉ mua cho bạn một vại bia.', 'Con chim quả thật chỉ ngủ. Thợ cả trừ nửa ngày công của cả tổ, và cả tổ nhìn bạn.', { fame: 2, jobXp: 1 }, { wealth: -2, joy: -2 }], b: ['Tin lời thợ cả, đào tiếp', 'Không có gì xảy ra. Bạn vẫn liếc con chim suốt ca.', { jobXp: 0.5 }] },
        { r: [0], t: 'Bạn đào trúng một hốc đá đầy tinh thể tím lấp lánh, đẹp đến nín thở và hoàn toàn không đáng tiền.', a: ['Đục lấy một cụm mang về', 'AGI', 3, 'Cụm tinh thể nằm trên bậu cửa sổ nhà bạn, bắt ánh đèn mỗi tối. Có những thứ không cần đáng tiền.', 'Cụm tinh thể vỡ vụn dưới mũi đục. Bạn quét chỗ bụi tím ấy vào túi áo.', { joy: 5 }, { joy: -1 }], b: ['Để nguyên, đào vòng qua', 'Bạn chống thêm một cây cột để giữ cái hốc. Thợ mỏ đời sau sẽ thấy nó và tự hỏi ai đã tử tế thế.', { joy: 3 }] },
        { r: [1], t: 'Một thợ trẻ trong tổ lén nhét một cục quặng bạc vào ủng. Lương của nó tháng này vừa bị cắt vì nghỉ ốm.', a: ['Bảo nó bỏ lại, rồi góp cho nó nửa ngày công', 'LUCK', 4, 'Cả tổ lặng lẽ góp theo. Cục quặng trở về xe goòng, và thằng nhỏ có đủ tiền thuốc mà không phải thành kẻ trộm.', 'Nó chối, bỏ chạy, và bị quản mỏ khám ủng ở cửa hầm.', { joy: 4, fame: 1 }, { joy: -4 }], b: ['Báo quản mỏ', 'Luật mỏ rất rõ. Thằng nhỏ bị đuổi, và tổ của bạn im lặng suốt ca hôm đó.', { jobXp: 0.5, joy: -4 }] },
      ],
    },
    dwarf_shield: {
      start: [
        'Trong một cuộc ẩu đả ở sảnh bia, bạn là đứa duy nhất không đánh ai, chỉ đứng chắn trước bàn của các cụ già bằng một cái nắp thùng. Đội Khiên tìm đến ngay hôm sau.',
        'Một con dê núi húc bạn bay ba thước. Bạn đứng dậy, đứng lại đúng chỗ cũ, và lần này nó là kẻ lùi. Viên đội trưởng xem từ xa, gật gù.',
      ],
      promo: [
        ['giữ một ô trong hàng khiên suốt buổi tập mà không lùi nửa bước.', 'đứng dưới mưa đá cuội của máy bắn tập, khiên giơ cao, cho đến hết hồi trống.'],
        ['chặn đứng một cú húc của chiến thú mà không gãy tay.', 'gác trọn một mùa đông ở cổng ngoài, nơi gió lạnh nhất.'],
        ['dẫn một hàng khiên lùi có trật tự qua một hẻm núi dưới tên bắn.', 'đỡ đòn cho một đồng đội ngã và kéo được cả hai về hàng.'],
        ['giữ một đường hầm một mình cho đến khi cửa sập kịp hạ.', 'huấn luyện một hàng khiên chưa từng vỡ trong ba trận liền.'],
      ],
      arcs: [
        ['Người đứng cạnh bạn', 'Người lính khiên đứng bên trái bạn suốt mười năm bắt đầu chậm tay. Trong hàng khiên, kẻ chậm kéo theo cả hàng.', 'Bạn để ý ông trong các buổi tập: vai ông đã hỏng, và ông giấu.', 'Báo lên thì ông bị cho giải ngũ, mất chỗ ở sảnh lính, nơi duy nhất ông có. Im lặng thì có ngày cả hàng trả giá.', 'Tù và báo động thật vang lên, và ông vào vị trí bên trái bạn như mọi lần.'],
        ['Cánh cổng phải đóng', 'Kẻ địch tràn vào thung lũng nhanh hơn dự tính. Lệnh là đóng Cổng Sắt ngay, dù một đoàn dân tị nạn còn cách đó ba trăm bước.', 'Bạn nhìn từ đỉnh tường: đoàn người chạy, kẻ địch đuổi sát.', 'Giữ cổng mở thêm một hồi trống thì cứu được họ, hoặc mất cả thành. Đội của bạn sẵn sàng bước ra chặn nếu bạn bước trước.', 'Tay quay cổng đã có người đặt lên, và viên chỉ huy nhìn bạn.'],
      ],
      quiet: [
        'Một mùa nữa trong hàng khiên. Vết lõm trên khiên bạn khớp với vết lõm trên khiên người bên cạnh.',
        'Bạn tập đứng. Chỉ đứng thôi, đủ lâu, đủ vững. Đó là cả nghề.',
        'Tân binh phàn nàn khiên nặng. Bạn không còn nhớ nó từng nặng.',
        'Biên giới yên. Bạn sơn lại huy hiệu gia tộc trên mặt khiên, lần thứ mấy rồi không rõ.',
      ],
      events: [
        { r: [0, 1], t: 'Lính cũ có trò bắt tân binh giữ khiên trong khi họ lần lượt lấy đà tông vào. Hôm nay đến lượt bạn.', a: ['Hạ thấp trọng tâm, chịu trận', 'STR', 4, 'Người thứ sáu tông vào và chính hắn bật ngửa. Cả doanh trại gầm lên cười, và tối đó có người nhường chỗ gần lò sưởi cho bạn.', 'Người thứ ba hất bạn vào tường. Bạn thấy sao trời giữa ban ngày.', { fame: 1, jobXp: 1 }, { health: -6 }], b: ['Từ chối trò này', 'Bọn họ gọi bạn là đồ non. Nhưng vai bạn còn lành để dùng vào việc thật.', { joy: -2 }] },
        { r: [0], t: 'Quai da trên khiên của bạn đã sờn, và thợ da của doanh trại hẹn nửa tháng nữa mới làm.', a: ['Tự bện quai bằng dây gai', 'AGI', 4, 'Xấu, nhưng chắc. Thợ da trông thấy, hừ một tiếng, rồi hỏi bạn bện kiểu gì.', 'Quai tuột ngay buổi tập sau. Khiên rơi trúng ngón chân bạn.', { jobXp: 1 }, { health: -4 }], b: ['Đổi phần bia một tuần để được làm trước', 'Một tuần khát khô cổ. Nhưng quai khiên mới thì không chê vào đâu được.', { joy: -2, jobXp: 0.5 }] },
        { r: [1], t: 'Một lính trẻ trong hàng của bạn nôn mửa trước mỗi trận đánh, và những người khác bắt đầu trêu chọc.', a: ['Kể cho cả hàng nghe về trận đầu của mình', 'LUCK', 4, 'Bạn kể mình đã run đến mức đánh rơi khiên. Tiếng trêu chọc tắt dần, và cậu lính trẻ đứng thẳng hơn một chút.', 'Bọn họ quay sang trêu cả bạn. Nhưng ít ra cậu ta không còn bị trêu một mình.', { joy: 4, fame: 1 }, { joy: -1 }], b: ['Bảo cậu ta tự lo', 'Cậu ta xin chuyển khỏi hàng khiên vào mùa sau.', { joy: -3 }] },
      ],
    },
    dwarf_brew: {
      start: [
        'Thùng bia bạn ủ lén trong hầm, làm sai gần hết các bước, lại ra một vị không ai gọi được tên. Thợ nấu già nhất sảnh uống ba vại liền rồi mới chịu hỏi công thức.',
        'Bạn nếm ra ngay thùng bia nào bị chua trong hai mươi thùng, khi còn chưa đủ tuổi uống. Người ta tranh luận xem nên phạt hay nên nhận bạn. Cuối cùng họ làm cả hai.',
      ],
      promo: [
        ['ủ một mẻ bia thường mà không ai trong sảnh nhăn mặt.', 'cọ sạch một trăm thùng gỗ và ngửi ra thùng duy nhất còn mốc.'],
        ['cứu một mẻ bia sắp chua bằng thứ có sẵn trong bếp.', 'ủ ra một mẻ mà hai gia tộc đang giận nhau chịu ngồi uống chung.'],
        ['nấu một loại bia đủ mạnh để làm ấm lính gác trên đỉnh đèo.', 'tái tạo hương vị của một mẻ bia cổ chỉ từ lời kể của một cụ già.'],
        ['tạo ra một loại bia được đặt tên theo tên bạn.', 'ủ mẻ bia cho lễ đăng quang, thứ mà người ta còn nhắc ba mươi năm sau.'],
      ],
      arcs: [
        ['Mẻ bia của người chết', 'Một thợ nấu lừng danh chết giữa chừng mẻ bia cuối cùng. Gia đình ông nhờ bạn hoàn thành nó cho đám tang.', 'Bạn nếm thứ dịch còn dang dở, cố đoán ông định đi về hướng nào.', 'Công thức của ông thiếu một thứ mà chỉ ông biết. Bạn có thể đoán liều, hoặc lặng lẽ thay bằng công thức của mình và để mọi người tin đó là của ông.', 'Thùng bia được khui trước mộ, và vại đầu tiên được trao cho bà vợ góa.'],
        ['Nguồn nước bị đổi', 'Bia của cả thành trì bỗng đắng. Mạch nước ngầm đã đổi vị.', 'Bạn nếm nước ở mười hai giếng, lần ngược về đầu nguồn.', 'Một mỏ mới của gia tộc giàu nhất đang rỉ khoáng chất vào mạch. Đóng mỏ thì ba trăm thợ mất việc; để yên thì không còn bia, và sau bia là nước uống.', 'Hội đồng họp trong sảnh, và trên bàn có hai vại bia: một từ nước cũ bạn còn giữ, một từ nước mới.'],
      ],
      quiet: [
        'Bạn nếm, chờ, nếm lại. Mẻ bia này cần thêm một mùa, và nó không quan tâm bạn có sốt ruột không.',
        'Hầm ủ lạnh và tối. Bạn biết từng thùng theo tiếng nó thở.',
        'Lúa mạch năm nay ngọt hơn. Bạn chỉnh công thức một chút và không nói với ai.',
        'Một thùng bạn ủ từ hai mươi năm trước đã đến lúc khui. Bạn để thêm một năm nữa cho chắc.',
      ],
      events: [
        { r: [0, 1], t: 'Một con chuột rơi vào thùng ủ, và chỉ mình bạn trông thấy. Thùng ấy là của lễ hội tuần sau.', a: ['Báo thợ cả, chịu đổ cả thùng', 'LUCK', 4, 'Thợ cả chửi một tràng, rồi lôi ra thùng dự trữ ông giấu riêng. “Nghề này sống bằng cái mũi và cái nết,” ông bảo. Bạn có cả hai.', 'Thợ cả đổ thùng bia và trừ nó vào công của bạn, vì tội không đậy nắp.', { fame: 2, jobXp: 1 }, { wealth: -4 }], b: ['Vớt con chuột ra, im lặng', 'Không ai biết. Bạn không uống nổi một ngụm nào trong lễ hội năm đó.', { joy: -5 }] },
        { r: [0], t: 'Thợ cả đưa bạn ba vại bia và hỏi vại nào do ông nấu, vại nào của phường bên, vại nào của loài người.', a: ['Nếm chậm, trả lời', 'INT', 4, 'Đúng cả ba, và bạn còn chỉ ra vại của ông hơi quá lửa. Ông trợn mắt, nếm lại, rồi lầm bầm rằng mũi bạn hỗn thật.', 'Bạn khen nhầm vại của loài người. Ông bắt bạn rửa thùng thêm một tháng.', { jobXp: 1 }, { joy: -3 }], b: ['Uống hết cả ba rồi mới đoán', 'Bạn đoán đúng hai. Vại thứ ba thì bạn không còn nhớ nổi.', { joy: 3, jobXp: 0.5 }] },
        { r: [1], t: 'Một lái buôn loài người muốn mua công thức bia của bạn, trả bằng số vàng nặng ngang người bạn.', a: ['Bán cho hắn công thức, bỏ đi một thứ nước', 'INT', 5, 'Mọi thứ trong công thức đều đúng, trừ việc nước của hắn không phải nước núi. Bia của hắn uống được. Bia của bạn vẫn là bia của bạn.', 'Hắn thuê một thợ Dwarf khác nếm thử và lần ra chỗ thiếu. Hắn đòi lại nửa số vàng, kèm một tràng chửi.', { wealth: 10 }, { wealth: -3, fame: -2 }], b: ['Mời hắn một vại, không bán', 'Hắn uống, thở dài, và từ đó năm nào cũng đánh xe ba ngày đường đến mua.', { wealth: 3, fame: 1 }] },
      ],
    },
    dwarf_eng: {
      start: [
        'Bạn tháo tung cái đồng hồ nước của sảnh chính để xem nó chạy thế nào, và lắp lại thừa ra hai bánh răng. Nó chạy đúng giờ hơn trước. Phường kỹ sư muốn biết hai bánh răng ấy vốn để làm gì.',
        'Cái bẫy chuột bạn chế bắt được con mèo của trưởng lão, cái mũ của một lính gác và, cuối cùng, một con chuột. Một kỹ sư già xin được xem bản vẽ. Bạn không có bản vẽ.',
      ],
      promo: [
        ['tra dầu cả một cỗ máy bơm mà không để sót một khớp nào.', 'sửa cái thang máy mỏ trong lúc thợ cả đi vắng, và nó không rơi.'],
        ['vẽ lại bản thiết kế của một cỗ máy cũ chỉ bằng cách nghe nó chạy.', 'chế một cái van xả tự động cho nồi hơi của xưởng.'],
        ['dựng một cỗ máy khoan chạy bằng hơi nước đi được nửa đường hầm trước khi cần sửa.', 'tìm ra vì sao cây cầu nâng kẹt mỗi mùa đông, và sửa tận gốc.'],
        ['chế ra một cỗ máy chưa có tên trong sổ của phường.', 'hồi sinh một cơ cấu cổ mà các kỹ sư trước đã bó tay suốt trăm năm.'],
      ],
      arcs: [
        ['Cỗ máy thay người', 'Bạn chế xong một cỗ máy xúc quặng làm việc bằng hai mươi thợ. Quản mỏ muốn đặt ngay mười cỗ.', 'Bạn xuống hầm xem cỗ máy chạy thử, và xem hai mươi người thợ đứng nhìn nó.', 'Mười cỗ máy là hai trăm thợ mất việc trước mùa đông. Bạn có thể giao ngay, giao chậm lại, hoặc sửa thiết kế để máy cần người vận hành.', 'Quản mỏ đặt túi vàng lên bàn vẽ, và ngoài cửa xưởng có tiếng người tụ lại.'],
        ['Nồi hơi sắp nổ', 'Nồi hơi trung tâm của thành trì kêu một tiếng lạ. Kỹ sư trưởng bảo không sao.', 'Bạn bò vào lòng máy ban đêm, đo từng mối hàn.', 'Một mối hàn chính đã nứt. Tắt nồi để sửa thì cả thành lạnh cóng ba ngày giữa mùa đông, và kỹ sư trưởng mất mặt.', 'Kim áp suất chạm vạch đỏ, và tay bạn đặt trên cần xả khẩn cấp.'],
      ],
      quiet: [
        'Bạn siết lại cùng một con ốc mỗi năm. Nó lỏng ra vì núi thở, và núi thì không ngừng thở.',
        'Bàn vẽ của bạn phủ đầy những thứ chưa chắc sẽ được làm ra. Vài cái trong đó chưa chắc nên được làm ra.',
        'Dầu máy ngấm vào tay bạn sâu đến mức không xà phòng nào rửa hết. Bạn coi đó là hình xăm của nghề.',
        'Cỗ máy bơm chạy êm suốt năm. Không ai cảm ơn kỹ sư khi máy chạy êm.',
      ],
      events: [
        { r: [0, 1], t: 'Thợ cả sai bạn đi tìm “cái búa thuận tay trái” trong kho. Bạn ngờ rằng mình đang bị trêu.', a: ['Chế luôn một cái búa thuận tay trái', 'INT', 4, 'Cán vát lệch, đầu nghiêng một góc. Thợ cả cầm thử để cười, rồi không cười nữa: nó vừa tay thật. Ông giữ luôn.', 'Cái búa bạn chế văng đầu ngay nhát đầu tiên. Cả xưởng có chuyện cười cho cả tuần.', { fame: 1, jobXp: 1 }, { joy: -2 }], b: ['Vào kho tìm suốt buổi chiều', 'Bạn quay ra tay trắng giữa tiếng cười của cả xưởng. Năm sau, bạn sẽ sai tân binh đi tìm nó.', { joy: 1 }] },
        { r: [0], t: 'Món đồ chơi dây cót bạn làm cho đứa cháu chạy nhanh quá mức, phá tan chồng bát của cả nhà.', a: ['Lắp thêm bộ hãm', 'AGI', 4, 'Con chuột sắt giờ chạy lon ton vừa phải, còn biết rẽ khi gặp chân bàn. Phường đồ chơi đến hỏi mua mẫu.', 'Bộ hãm kẹt, con chuột sắt quay tít tại chỗ rồi bốc khói.', { wealth: 3, joy: 4 }, { joy: -1 }], b: ['Tịch thu nó, đền bát', 'Đứa cháu khóc. Bạn hứa làm cho nó thứ khác, chậm hơn.', { wealth: -2 }] },
        { r: [1], t: 'Một kỹ sư trẻ nộp bản vẽ mà bạn nhận ra là sao lại từ sổ tay cũ của chính bạn, kể cả cái lỗi bạn từng mắc.', a: ['Hỏi cậu ta cái lỗi ấy nằm ở đâu', 'INT', 5, 'Cậu ta tìm ra nó sau hai ngày vật lộn, rồi sửa theo cách bạn chưa từng nghĩ tới. Bạn ký tên bảo lãnh cho bản vẽ mới.', 'Cậu ta không tìm ra, và cũng không nhận là đã chép.', { jobXp: 1, joy: 3 }, { joy: -3 }], b: ['Tố cậu ta trước phường', 'Cậu ta bị đình chỉ một năm. Cái lỗi trong bản vẽ thì vẫn chưa ai sửa.', { joy: -2 }] },
      ],
    },
    dwarf_carver: {
      start: [
        'Bạn lấy đinh khắc mặt ông nội lên vách hang khi bị phạt đứng góc. Người ta định mắng, rồi dừng lại: giống quá. Bức khắc ấy vẫn còn ở đó.',
        'Một tảng đá bị thợ cả vứt đi vì có vết nứt. Bạn xin nó, và khắc men theo vết nứt thành một dòng sông. Thợ cả đòi lại tảng đá, và nhận luôn bạn.',
      ],
      promo: [
        ['đục một phiến đá phẳng đến mức đặt viên bi lên không lăn.', 'khắc một trăm chữ trên bia mà không mẻ một nét.'],
        ['tạc tượng bán thân một trưởng lão khó tính, và ông ta không đòi sửa.', 'phục chế một bức phù điêu sứt mẻ trong Sảnh Tổ Tiên.'],
        ['khắc một câu chuyện lên vách đá sao cho trẻ con đọc được bằng tay.', 'chọn đúng khối đá cho một cây cột chịu lực giữa hàng trăm khối.'],
        ['tạc một bức tượng mà người ta đứng xem trong im lặng.', 'khắc tên những người chết trong một trận sập mỏ, không sót ai, kể cả thợ vô danh.'],
      ],
      arcs: [
        ['Bức tượng nói dối', 'Một gia tộc quyền thế đặt bạn tạc tượng vị tổ của họ như một anh hùng. Sử sách ghi ông ta bỏ chạy.', 'Bạn đọc biên niên, rồi nghe gia tộc kể phiên bản của họ.', 'Tiền công đủ nuôi xưởng mười năm. Đá thì sẽ đứng đó một nghìn năm và nói điều bạn khắc lên nó.', 'Khối đá đã dựng giữa quảng trường, và bạn cầm đục trước khuôn mặt còn chưa có nét.'],
        ['Tấm bia cho kẻ không tên', 'Thợ mỏ tìm thấy một bộ hài cốt Dwarf rất cổ trong hầm sâu, không tên, không gia huy.', 'Bạn xem xét di vật: một cây đục, mòn y như cây của bạn.', 'Ba gia tộc cùng nhận người ấy là tổ tiên, và ai cũng muốn bạn khắc gia huy của họ lên bia.', 'Tấm bia trắng đặt trước mộ, và ba trưởng tộc đứng sau lưng bạn.'],
      ],
      quiet: [
        'Đá không vội, nên bạn cũng không. Bức phù điêu này sẽ xong khi nó xong.',
        'Bụi đá phủ trắng râu bạn. Lũ trẻ tưởng bạn già hơn tuổi thật vài trăm năm.',
        'Bạn dành cả mùa chỉ để chọn một khối đá. Chọn sai thì mười năm sau mới biết.',
        'Tiếng đục của bạn vang trong sảnh rỗng. Bức tường này bạn sẽ không kịp khắc xong trong một đời.',
      ],
      events: [
        { r: [0, 1], t: 'Nhát đục của bạn làm mẻ mũi một pho tượng nhỏ đang làm dở.', a: ['Sửa nó thành một cái mũi gãy', 'INT', 4, 'Pho tượng giờ có cái mũi của một lão võ sĩ, và cả một tính cách. Thợ cả bảo đó là thứ không dạy được.', 'Càng sửa càng mẻ. Pho tượng cuối cùng không còn mũi.', { jobXp: 1, joy: 3 }, { joy: -3 }], b: ['Bỏ khối đá ấy, làm lại', 'Bạn bắt đầu lại từ đầu. Khối đá hỏng thành cái chặn cửa xưởng.', { jobXp: 0.5 }] },
        { r: [0], t: 'Một góa phụ nghèo xin bạn khắc tên chồng bà lên một hòn đá suối, vì bà không đủ tiền mua bia.', a: ['Khắc cho thật đẹp', 'AGI', 3, 'Hòn đá suối tròn nhẵn mang một dòng tên sâu và đều. Bà đặt nó ở đầu mộ, và nó trông hợp hơn mọi tấm bia đẽo.', 'Đá suối cứng hơn bạn tưởng: mũi đục trượt, cái tên bị lệch một chữ.', { joy: 5, fame: 1 }, { joy: -4 }], b: ['Xin thợ cả một tấm bia vụn cho bà', 'Thợ cả càu nhàu rồi cũng cho. Tấm bia hơi sứt góc, nhưng là bia thật.', { joy: 3 }] },
        { r: [1], t: 'Một nhà giàu muốn bạn khắc lại bia mộ của cha ông ta, sửa năm sinh cho ông cụ “thọ thêm mười tuổi”.', a: ['Từ chối, nhưng gợi ý khắc thêm một câu về những gì cụ đã làm', 'INT', 5, 'Ông ta ngẫm nghĩ, rồi kể về cha mình suốt một buổi chiều. Dòng chữ bạn khắc thêm khiến ông ta đứng lặng trước bia rất lâu.', 'Ông ta chỉ muốn con số. Một thợ khác sẽ nhận việc ấy.', { fame: 2, wealth: 3 }, { joy: -1 }], b: ['Khắc theo ý ông ta', 'Đá giờ nói dối mười năm. Sẽ không ai biết, trừ bạn và đá.', { wealth: 5, joy: -4 }] },
      ],
    },
    dwarf_merchant: {
      start: [
        'Bạn đổi một viên sỏi đẹp lấy cái bánh, đổi bánh lấy con dao, đổi dao lấy một viên ngọc thô. Trước bữa tối, bạn có ngọc và vẫn còn nhớ viên sỏi nhặt ở đâu.',
        'Một thương gia đánh rơi túi ngọc trong sảnh. Bạn trả lại, và tiện miệng bảo viên thứ ba là thủy tinh. Ông ta soi kính, tái mặt, rồi thuê bạn ngay tại chỗ.',
      ],
      promo: [
        ['Một lái buôn loài người chìa ra nắm đá lẫn lộn thật giả. Phân loại đúng hết trước mặt hắn, bạn sẽ là {next}.', 'Phiên chợ đầu tiên bạn đứng quầy một mình. Bán hết hàng mà không bớt quá một phần mười, bạn là {next}.'],
        ['Một gia tộc muốn bán tháo bộ trang sức gia truyền. Định giá sao cho cả bên bán lẫn bên mua cùng tin, bạn xứng danh {next}.', 'Một viên ngọc lớn có vết nứt ngầm đang được rao bán. Chỉ ra nó trước khi tiền trao tay, bạn là {next}.'],
        ['Mỏ ngọc phía đông vừa sập, giá sẽ nhảy vọt. Giữ được hàng và khách qua cơn sốt, bạn sẽ là {next}.', 'Thương hội loài người muốn một đầu mối trong núi. Giành được hợp đồng ấy mà không bán rẻ đá của núi, bạn là {next}.'],
        ['Kho bạc của một vương quốc cần người thẩm định trước khi cầm cố vương miện. Kẻ đặt con dấu lên tờ thẩm định sẽ mang danh {next}.', 'Ba phường ngọc tranh nhau quyền định giá cho cả Dãy Núi. Dàn xếp được họ, bạn là {next}.'],
      ],
      arcs: [
        ['Viên ngọc có chủ', 'Một viên hồng ngọc lớn về tay bạn với giá hời. Soi kỹ, bạn thấy một gia huy cạo dở.', 'Bạn tra sổ của phường: viên ngọc bị cướp khỏi một ngôi mộ gia tộc hai mươi năm trước.', 'Trả lại thì mất trắng số vốn đã vay. Mài lại là xóa sạch dấu vết, và không ai biết.', 'Trưởng lão của gia tộc ấy bước vào quầy của bạn, hoàn toàn tình cờ, để mua quà cưới cho cháu.'],
        ['Cơn sốt đá xanh', 'Cả thành phát cuồng vì một loại đá xanh mới, giá tăng gấp đôi mỗi tuần. Bạn biết nó chỉ là đá nhuộm.', 'Bạn thử nó bằng lửa và giấm: màu phai trong một đêm.', 'Nói ra thì thị trường sụp, nhiều nhà trắng tay, và họ sẽ đổ lỗi cho kẻ đưa tin. Im lặng mà bán thì bạn giàu trước khi nó sụp.', 'Phiên chợ đông nhất năm, quầy của bạn chất đầy đá xanh, và một ông lão đang đếm tiền dành dụm cả đời.'],
      ],
      quiet: [
        'Bạn soi ngọc dưới cùng một ngọn đèn đã mấy chục năm. Mắt bạn giờ thấy cả những thứ kính lúp bỏ sót.',
        'Giá ngọc năm nay bình lặng. Bạn dành thời gian sắp lại kho và nhớ lại từng viên từ đâu đến.',
        'Khách quen mang con đến, rồi con họ mang cháu đến. Quầy của bạn vẫn kê đúng góc sảnh ấy.',
        'Bạn giữ một viên đá xấu xí trong ngăn kéo: viên đầu tiên bạn mua hớ. Thỉnh thoảng bạn lấy ra xem cho nhớ.',
      ],
      events: [
        { r: [0, 1], t: 'Một cậu bé Dwarf mang đến viên “kim cương” nhặt được, mắt sáng rực. Đó là thạch anh, đáng vài xu.', a: ['Chỉ cho nó cách phân biệt, và mua viên đá với giá thật', 'LUCK', 4, 'Nó tiu nghỉu mất một lúc, rồi mê mẩn cái kính lúp. Mười năm sau, nó là thợ thẩm định giỏi nhất bạn từng dạy.', 'Nó òa khóc, chạy về mách rằng bạn lừa trẻ con.', { joy: 4, jobXp: 1 }, { fame: -1 }], b: ['Trả nó một đồng bạc cho vui', 'Nó ôm đồng bạc chạy đi, tin rằng mình tìm được kim cương. Bạn lỗ, và không sửa lại niềm tin ấy.', { wealth: -2, joy: 3 }] },
        { r: [0], t: 'Một bà khách mặc cả ráo riết cho chiếc nhẫn, rồi bạn nhận ra bà đang đếm từng xu lẻ gói trong khăn.', a: ['Bớt đến sát giá vốn, không để bà biết', 'INT', 4, 'Bạn “thua” trong cuộc mặc cả một cách rất khéo. Bà ra về đắc thắng với chiếc nhẫn cưới cho con gái.', 'Bà nhận ra bạn thương hại, tự ái gói tiền lại và bỏ đi.', { joy: 5 }, { joy: -3 }], b: ['Giữ giá, buôn bán là buôn bán', 'Bà đếm đi đếm lại, rồi chọn chiếc nhẫn nhỏ hơn.', { wealth: 2, joy: -2 }] },
        { r: [1], t: 'Một đối thủ tung tin rằng ngọc của bạn là ngọc ép. Khách bắt đầu ngần ngại.', a: ['Mời cả phường đến thử ngọc công khai', 'INT', 5, 'Mười hai thợ thẩm định thử từng viên trước đám đông, và không tìm ra một viên giả. Kẻ tung tin thì lặng lẽ đóng quầy sớm hôm ấy.', 'Giữa buổi thử, lộ ra một viên bạn mua nhầm thật. Chỉ một viên, nhưng đúng lúc tệ nhất.', { fame: 4, jobXp: 1 }, { fame: -3 }], b: ['Mặc kệ, hàng tốt tự nó nói', 'Tin đồn sống dai hơn bạn tưởng. Phải hai mùa khách mới quay lại đủ.', { wealth: -4 }] },
      ],
    },
    dwarf_guard: {
      start: [
        'Bạn ngồi ở cổng núi đếm người qua lại cho đỡ buồn, và nhận ra một lái buôn đi vào ba lần mà chưa hề đi ra. Lính gác bắt được một ổ buôn lậu nhờ lời bạn.',
        'Trong đêm bão tuyết, bạn nghe ra tiếng kêu cứu giữa tiếng gió khi không lính gác nào nghe thấy, và dẫn họ đến tận nơi. Sáng ra, đội trưởng phát cho bạn một cái tù và.',
      ],
      promo: [
        ['gác trọn ca đêm dài nhất mùa đông mà không ngủ gật.', 'thuộc mặt và tên mọi lái buôn thường qua cổng.'],
        ['phát hiện một xe hàng hai đáy mà ba trạm trước bỏ lọt.', 'dẫn đội tuần tra về nhà qua một trận bão tuyết trắng trời.'],
        ['chặn một vụ ẩu đả giữa hai gia tộc ngay tại cổng mà không ai phải nằm cáng.', 'tìm ra một lối mòn lạ trên vách núi trước khi kẻ khác dùng nó.'],
        ['tổ chức lại toàn bộ lịch gác của một cửa ải.', 'giữ đèo một đêm trước một toán đông gấp năm, bằng tù và, lửa và mưu.'],
      ],
      arcs: [
        ['Người qua cổng lúc nửa đêm', 'Một Dwarf bị gia tộc trục xuất xuất hiện ở cổng giữa đêm tuyết, xin vào nhìn mặt mẹ đang hấp hối.', 'Luật cấm kẻ bị trục xuất bước qua cổng. Bạn nhìn hắn: tay không, râu đóng băng.', 'Cho hắn vào thì bạn phạm luật gác. Từ chối thì hắn sẽ chết cóng trước khi về đến làng gần nhất.', 'Đội trưởng sẽ đi tuần qua cổng trong một khắc nữa.'],
        ['Lửa hiệu giả', 'Ngọn lửa hiệu trên đỉnh xa báo có địch. Cả thành đóng cửa, lái buôn kẹt ngoài đèo giữa bão.', 'Bạn leo lên xem: không có quân địch nào, chỉ có dấu chân của một người.', 'Kẻ đốt lửa giả là một lính gác già, muốn chứng minh rằng thành không còn ai canh đỉnh xa. Ông đã đúng, và ông đã phạm tội.', 'Hội đồng họp để tìm kẻ đốt lửa, và bạn là người duy nhất đã thấy dấu chân.'],
      ],
      quiet: [
        'Gió trên đèo vẫn lạnh như năm đầu bạn đứng gác. Chỉ có bộ râu bạn dày thêm để chắn nó.',
        'Lái buôn qua cổng chào bạn bằng tên. Bạn biết xe nào chở gì từ tiếng bánh lăn.',
        'Một mùa không có gì đáng ghi vào sổ gác. Bạn vẫn ghi, mỗi ngày một dòng: “Yên.”',
        'Bạn dạy tân binh phân biệt tiếng tuyết lở với tiếng chân người. Mất cả mùa đông chúng mới nghe ra.',
      ],
      events: [
        { r: [0, 1], t: 'Một bà cụ loài người lên đèo bán bánh, không có giấy thông hành, và ngoài trời sắp có bão tuyết.', a: ['Cho bà trú trong chòi gác đến hết bão', 'LUCK', 4, 'Bà không qua cổng, nên không ai phạm luật. Cả đội gác được ăn bánh nóng, và bão tan thì bà xuống núi an toàn.', 'Đội trưởng bắt gặp và quát um lên, rồi cũng ăn một cái bánh.', { joy: 5, fame: 1 }, { joy: -1 }], b: ['Đúng luật: mời bà xuống núi', 'Bà lọ mọ đi xuống trong gió. Bạn nhìn theo cho đến khi khuất.', { joy: -4 }] },
        { r: [0], t: 'Lính cũ cá rằng tân binh không thể đứng gác trọn đêm trên tháp gió mà không xuống sưởi.', a: ['Nhận cược', 'STR', 4, 'Sáng ra, râu bạn đóng băng cứng như đá, nhưng bạn vẫn đứng. Bọn lính cũ góp tiền mua cho bạn một vại bia nóng và thôi gọi bạn là tân binh.', 'Quá nửa đêm, bạn mò xuống lò sưởi. Tiền cược mất, và biệt danh “Chân Ấm” theo bạn cả năm.', { fame: 2, jobXp: 1 }, { wealth: -2, joy: -2 }], b: ['Không cược, gác theo đúng ca', 'Bạn gác ca của mình, sưởi khi được sưởi. Không ai nể, không ai chê.', { jobXp: 0.5 }] },
        { r: [1], t: 'Một lái buôn quen dúi cho bạn chai rượu quý để “khỏi phải mở thùng khám” vì hắn đang vội.', a: ['Nhận chai rượu, rồi vẫn khám', 'INT', 4, 'Trong thùng chỉ có vải. Hắn vội thật. Bạn trả lại chai rượu, hắn cười ngượng, và từ đó không ai dúi gì cho bạn nữa.', 'Trong thùng có hàng lậu, và hắn kêu rằng bạn đã nhận quà. Bạn mất cả buổi giải trình.', { fame: 2 }, { fame: -2, joy: -3 }], b: ['Gạt chai rượu ra, khám', 'Thùng sạch. Hắn lầm bầm rằng Dwarf gác cổng cứng như đá. Đó là lời khen.', { jobXp: 0.5, fame: 1 }] },
      ],
    },
    dwarf_hunter: {
      start: [
        'Bạn rơi xuống một cái hố khi đuổi theo con dê lạc và đứng dậy giữa một căn phòng lát đá không ai biết đến. Bạn trèo lên với một đồng xu cổ và một cơn nghiện không dứt được.',
        'Tấm bản đồ ông chú để lại bị cả họ coi là trò đùa. Bạn đi theo nó, và ở cuối đường có một cái rương rỗng cùng mảnh giấy: “Vui không? Giờ đi tìm cái thật.”',
      ],
      promo: [
        ['mang về từ tầng một của hầm ngục thứ gì đó đáng giá hơn tiền đuốc.', 'gỡ ba cái bẫy liên tiếp mà không mất ngón tay nào.'],
        ['vẽ bản đồ trọn một tầng hầm, đủ cho người sau đi mà không lạc.', 'nhận ra một cái rương là Mimic trước khi mở nó.'],
        ['mang một cổ vật còn nguyên vẹn ra khỏi hầm ngục đang sập.', 'giải một cơ quan đá mà các đội trước phải bỏ cuộc.'],
        ['tìm ra một căn phòng mà mọi bản đồ đều ghi là tường đặc.', 'dẫn một đội xuống tầng sâu nhất từng có ai đến, và đưa đủ người trở lên.'],
      ],
      arcs: [
        ['Kho báu của người sống', 'Tấm bản đồ dẫn bạn đến một căn hầm đầy vàng, nơi một gia đình tị nạn đang ẩn náu, không hề biết mình ngủ trên gì.', 'Bạn ở lại một đêm, ăn bát cháo loãng của họ và đếm số rương dưới lớp rơm.', 'Theo luật hầm ngục, kho báu thuộc về kẻ tìm ra. Mang nó đi thì họ lộ chỗ trốn, và bọn lính đang lùng họ ngoài kia.', 'Đội thồ hàng của bạn đến cửa hầm, đuốc sáng trưng, hỏi bắt đầu khuân từ đâu.'],
        ['Cổ vật muốn ở lại', 'Bạn tìm thấy một vương miện cổ trong lăng mộ sâu. Từ lúc bạn chạm vào, các lối ra bắt đầu đóng lại.', 'Bạn đọc dòng chữ trên bệ: nó giữ yên một thứ gì đó bên dưới.', 'Một nhà sưu tầm đã trả trước nửa gia tài cho chiếc vương miện, và bạn đã tiêu một phần số đó.', 'Cánh cửa đá cuối cùng hạ xuống từng tấc, chiếc vương miện trên tay bạn, và nền lăng bắt đầu rung.'],
      ],
      quiet: [
        'Giữa hai chuyến xuống hầm là những tháng mài cuốc, vá ba lô và đọc đi đọc lại một tấm bản đồ.',
        'Bạn bán vài món nhỏ, giữ lại một món không ai mua. Nó trông đẹp trên kệ.',
        'Năm nay các hầm ngục gần đều đã bị vét sạch. Bạn nghe ngóng tin đồn ở sảnh bia.',
        'Bạn đếm lại sẹo, đếm lại ngón tay. Vẫn đủ ngón. Một năm tốt.',
      ],
      events: [
        { r: [0, 1], t: 'Cái rương đầu tiên bạn tự tìm thấy chỉ có một đôi tất len cũ và một lá thư.', a: ['Đọc lá thư', 'LUCK', 4, 'Thư của một thợ săn kho báu đời trước: “Rương thật ở sau viên gạch thứ ba bên trái. Đôi tất là để thử lòng kiên nhẫn.” Viên gạch có thật.', 'Thư chỉ viết: “Ha ha.” Chữ của một Dwarf.', { wealth: 5, jobXp: 1 }, { joy: -1 }], b: ['Lấy đôi tất, hầm lạnh', 'Đôi tất ấm bất ngờ. Bạn mang nó suốt mười năm.', { joy: 3 }] },
        { r: [0], t: 'Một con Slime nhỏ cứ lẽo đẽo theo sau bạn suốt hành lang, ăn những vụn bánh bạn làm rơi.', a: ['Rải vụn bánh để nó đi trước dò bẫy', 'INT', 4, 'Nó trườn qua ba tấm đá sập mà không hề hấn gì, và bạn cứ thế bước theo. Hết hành lang, bạn để lại cho nó nguyên một cái bánh.', 'Nó no, dừng lại giữa đường. Bạn tự bước lên tấm đá thứ tư.', { jobXp: 1 }, { health: -6 }], b: ['Xua nó đi', 'Nó chui vào một khe tường. Hành lang phía trước im ắng và đầy những tấm đá đáng ngờ.', { joy: -1 }] },
        { r: [1], t: 'Một đội mạo hiểm loài người thuê bạn dẫn đường, rồi bạn nghe lỏm được họ bàn sẽ bỏ lại bạn ở tầng dưới để khỏi chia phần.', a: ['Dẫn họ đi vòng, và “quên” vài cái bẫy ở lối họ định chạy', 'AGI', 5, 'Họ lên đến mặt đất, lấm lem, hoảng sợ và rất biết điều. Phần của bạn được đếm đủ, thêm cả tiền xin lỗi.', 'Họ ra tay trước. Bạn thoát được qua một khe hẹp, mất ba lô và một cái răng.', { wealth: 6, fame: 1 }, { health: -8, wealth: -3 }], b: ['Bỏ họ lại ngay cửa hầm, trả tiền cọc', 'Họ chửi với theo. Không có người dẫn, họ sẽ không qua nổi tầng hai, và họ biết thế.', { wealth: -2, joy: 2 }] },
      ],
    },
  },
};
