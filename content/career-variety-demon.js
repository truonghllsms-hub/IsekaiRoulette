// Demon trades: other ways in, their own promotion trials, a second milestone, everyday scenes,
// and more quiet-year lines. See career-variety.js.
module.exports = {
  race: 'demon',
  lead: {
    teen: [
      'Cặp sừng của bạn đã cứng. Ở Ma Giới, đó là ngày người ta thôi tha thứ cho bạn vì còn nhỏ, và bắt đầu hỏi bạn có ích gì cho Vực Thẳm.',
      'Viên quan điểm danh của Ma Vương đi dọc hàng Demon trẻ, sổ trên tay. Kẻ nào chưa có nghề sẽ bị xếp vào hàng lính tốt thí. Còn ba người nữa là đến lượt bạn.',
      'Lửa trong huyết quản bạn bắt đầu đòi được dùng vào việc gì đó. Demon nào để nó cháy không thì sẽ tự thiêu, người già vẫn dọa thế, và bạn bắt đầu tin.',
      'Ở chợ Tro, một Demon vô nghề bị gọi là “thịt”. Bạn đã nghe từ ấy sau lưng mình lần thứ hai trong ngày.',
      'Đêm Huyết Nguyệt, các phường hội Ma Giới mở cổng nhận người. Đứa nào bước vào cổng nào thì mang dấu của cổng ấy suốt đời. Bạn đứng giữa quảng trường, bảy cánh cổng đỏ rực quanh mình.',
    ],
    adult: [
      'Ma Giới không có chỗ cho kẻ đứng ngoài. Hoặc bạn nắm một thứ gì đó trong tay, hoặc bạn nằm trong tay kẻ khác.',
      'Bạn đã sống sót qua đủ nhiều năm để biết may mắn không kéo dài mãi. Một cái nghề thì có thể.',
      'Một tên chủ nợ, một tên tuyển quân và một tên buôn nô lệ cùng nhìn bạn trong một buổi sáng. Đã đến lúc trở thành thứ gì đó khó nuốt hơn.',
    ],
    origins: {
      origin_abyss: 'Vực Thẳm sinh ra bạn mà không cho kèm lời chỉ dẫn nào. Bạn đã bò lên được đến tầng có ánh lửa; giờ phải quyết định sẽ làm gì ở đó.',
      origin_ash: 'Đảo Tro Tàn dạy bạn thở trong khói và ngủ trên đá nóng. Con thuyền duy nhất rời đảo mỗi năm chỉ chở những kẻ đã chọn xong một nghề.',
      origin_cult: 'Những kẻ triệu hồi bạn đã chết hoặc đã chạy. Vòng huyết trận nguội dần, và lần đầu tiên bạn không có mệnh lệnh nào để tuân theo.',
      origin_war: 'Bạn lớn lên bằng lương khô nhặt của người chết. Chiến trường đã dời đi nơi khác, và bạn phải chọn: đi theo nó, hay học lấy một nghề khác.',
      origin_forest: 'Dòng máu tạp khiến bạn không hẳn thuộc về Ma Giới, cũng chẳng thuộc về Đại Ngàn. Một cái nghề sẽ là thứ duy nhất không ai hỏi gốc gác.',
      origin_swamp: 'Chướng khí Đầm Lầy là sữa mẹ của bạn. Bước ra khỏi bùn, bạn nhận ra thế giới ngoài kia trả tiền cho những kẻ chịu được thứ người khác không chịu nổi.',
      origin_forge: 'Tuổi thơ bạn là ống bễ và xiềng chân. Tên chủ lò vừa chết, xiềng đã mở, và bạn có thể bước đi, hoặc cầm lấy cây búa cho chính mình.',
      origin_noble: 'Gia tộc đã vạch sẵn cho bạn ba con đường xứng với huyết thống. Bạn có thể chọn một trong ba, hoặc chọn làm chúng thất vọng.',
      origin_contract: 'Bạn sinh ra từ một điều khoản. Khế ước ấy vừa mãn hạn, và lần đầu tiên trong đời bạn không nợ ai một ngày nào.',
      origin_prisoner: 'Ngục Giáo hội dạy bạn đếm ngày và nhớ mặt. Bước ra ngoài, bạn cần một cái nghề để không bao giờ phải quay lại sau song sắt.',
    },
  },
  jobs: {
    demon_dk: {
      start: [
        'Bạn lột bộ giáp từ một kỵ sĩ đã chết ngoài chiến địa và mặc nó về trại. Viên sĩ quan nhìn bộ giáp quá khổ rồi nhìn bạn: “Hoặc lớn cho vừa nó, hoặc chết trong nó.”',
        'Con chiến thú không cho ai lại gần đã để yên cho bạn trèo lên lưng. Quân đoàn không hỏi vì sao, chỉ ném cho bạn một cây thương.',
      ],
      promo: [
        ['đứng trọn một đêm trong hàng quân dưới mưa tro mà không gãy đội hình.', 'thắng một trận đấu tập với lính cũ mà không dùng đòn hèn.'],
        ['dẫn mười kỵ sĩ phá một chốt gác và mang đủ mười người về.', 'giữ một cây cầu qua Sông Tro cho đến khi quân đoàn rút hết.'],
        ['thách đấu một sĩ quan cấp trên theo đúng luật Ma Giới, và sống.', 'từ chối một mệnh lệnh ngu xuẩn trước hàng quân, rồi chứng minh mình đúng bằng chiến thắng.'],
        ['chỉ huy cả một cánh quân qua trọn một chiến dịch mà không để mất quân kỳ.', 'khiến một quân đoàn nổi loạn hạ vũ khí chỉ bằng việc cưỡi ngựa một mình đến trước cổng trại.'],
      ],
      arcs: [
        ['Tù binh của bạn', 'Bạn bắt sống một kỵ sĩ loài người sau trận đánh. Theo lệ, tù binh thuộc về kẻ bắt được.', 'Hắn bị thương nặng. Bạn canh hắn qua đêm và nghe hắn nói mê về một đứa con.', 'Sĩ quan muốn mua lại tù binh để tế cờ trước trận sau. Hắn trả giá bằng một con chiến thú.', 'Trống tế nổi lên trước hàng quân, và tù binh vẫn còn nằm trong lều của bạn.'],
        ['Mệnh lệnh thiêu làng', 'Quân đoàn được lệnh thiêu rụi một ngôi làng Demon nghèo vì tội chứa chấp đào binh.', 'Bạn cưỡi ngựa qua làng trước khi trời sáng, và chỉ thấy người già với trẻ con.', 'Đào binh là một cậu lính mười sáu tuổi, cháu của bà lão đầu làng. Giao nó ra thì làng sống, nhưng nó sẽ bị lột da.', 'Hàng đuốc đã châm, và mọi kỵ sĩ quay sang chờ bạn hạ lệnh.'],
      ],
      quiet: [
        'Bạn mài lại lưỡi thương cho một cuộc chiến chưa đến. Ở Ma Giới, nó luôn đến.',
        'Một mùa đồn trú nữa. Con chiến thú của bạn béo lên, và tân binh thì ngày càng trẻ.',
        'Bạn tập cùng một bài thương mỗi sáng đã bao nhiêu năm. Vết chân bạn in thành rãnh trên sân đá.',
        'Quân đoàn đổi tướng hai lần. Bộ giáp của bạn chỉ đổi thêm vài vết xước.',
      ],
      events: [
        { r: [0, 1], t: 'Lính cũ bắt tân binh các bạn đánh bóng giáp cho chúng. Bộ giáp bạn được giao có một vết lõm ngay trên tim.', a: ['Hỏi chủ bộ giáp về vết lõm ấy', 'LUCK', 4, 'Gã lính già im một lúc rồi kể về trận đánh suýt giết gã. Kể xong, gã chỉ cho bạn thế đỡ đã cứu mạng gã hôm đó.', 'Gã đá bạn ngã lăn: “Lau đi, đừng hỏi.”', { jobXp: 1 }, { health: -3, joy: -2 }], b: ['Lặng lẽ lau cho xong', 'Bộ giáp sáng bóng. Vết lõm vẫn nhìn bạn suốt lúc làm.', { jobXp: 0.5 }] },
        { r: [0], t: 'Con chiến thú của bạn bỏ ăn, và viên quản chuồng bảo cứ quất roi là nó ăn.', a: ['Tự tay kiểm tra miệng nó', 'AGI', 4, 'Một mảnh xương cắm trong lợi nó. Bạn nhổ ra mà chỉ mất một mảng da tay, và từ đó nó không cho ai khác cưỡi.', 'Nó táp một phát vào vai giáp của bạn. Vết răng còn in đó.', { joy: 4, jobXp: 1 }, { health: -8 }], b: ['Làm theo lời quản chuồng', 'Nó ăn. Nó cũng nhìn bạn bằng con mắt khác.', { joy: -3 }] },
        { r: [1], t: 'Sau trận đánh, một kỵ sĩ dưới quyền bạn lén lột nhẫn của đồng đội đã chết.', a: ['Bắt hắn tự tay mang nhẫn về cho gia đình người chết', 'INT', 5, 'Hắn đi mười ngày đường và trở về khác hẳn. Từ đó trong đội bạn, không ai chạm vào đồ của người đã ngã.', 'Hắn bỏ trốn cùng chiếc nhẫn. Bạn phải giải thích với cấp trên vì sao đội thiếu một người.', { fame: 2, jobXp: 1 }, { fame: -2 }], b: ['Chém một ngón tay của hắn theo quân luật', 'Hắn không kêu một tiếng. Cả đội nhìn, và không ai nói gì.', { jobXp: 0.5, joy: -2 }] },
      ],
    },
    demon_wl: {
      start: [
        'Bạn đọc ngược một dòng chữ trên bia mộ để giết thời gian, và người nằm dưới mộ đáp lại. Một Warlock già đi ngang dừng bước: “Đứa nào dạy ngươi câu ấy?” Không ai cả.',
        'Bạn đổi ba năm tuổi thọ lấy một cuốn sách ở chợ đêm mà không mặc cả. Kẻ bán sách nhìn theo bạn, rồi đóng sạp, đi theo.',
      ],
      promo: [
        ['vẽ một vòng triệu hồi không hở một nét, bằng chính máu mình.', 'giữ một con tiểu quỷ trong vòng suốt đêm mà không để nó dụ mình bước ra.'],
        ['giải một lời nguyền nhỏ do chính thầy mình đặt lên mình.', 'chép lại một trang sách cấm mà không để nó chép lại mình.'],
        ['mặc cả với một thực thể Vực Thẳm và ra về mà vẫn còn đủ tên họ.', 'đặt một lời nguyền chính xác đến mức chỉ trúng đúng một người giữa đám đông.'],
        ['đóng một khe nứt Vực Thẳm do một Warlock khác mở dở.', 'viết ra một chú thuật của riêng mình và sống sót qua lần niệm đầu tiên.'],
      ],
      arcs: [
        ['Con tiểu quỷ xin tự do', 'Con tiểu quỷ đầu tiên bạn triệu hồi quỳ xuống xin được thả, và hứa một bí mật để đổi.', 'Bạn tra sách để biết thả một kẻ đã ký khế ước thì phải trả giá gì.', 'Bí mật nó nắm là tên thật của thầy bạn. Biết tên thật của ai thì nắm được mạng người ấy.', 'Thầy bạn bước vào phòng đúng lúc con tiểu quỷ mở miệng.'],
        ['Lời nguyền của cả một dòng họ', 'Một gia tộc Demon xin bạn gỡ lời nguyền khiến mọi con trưởng đều chết trước tuổi trưởng thành.', 'Bạn lần theo gia phả, tìm xem ai đã đặt nó và vì sao.', 'Lời nguyền là cái giá cho sự giàu có của họ, do chính tổ tiên họ ký. Gỡ nó thì gia tộc trắng tay; chuyển nó sang một dòng họ khác thì giữ được tất cả.', 'Đứa con trưởng năm nay mười bốn tuổi đứng trong vòng tròn của bạn, nhìn bạn đầy tin cậy.'],
      ],
      quiet: [
        'Bạn dành cả một thập kỷ cho một chữ trong sách cấm. Nó vẫn chưa chịu đứng yên trên trang giấy.',
        'Nến trong phòng bạn cháy ngọn xanh. Bạn đã thôi thấy lạ từ lâu.',
        'Một thực thể nào đó gõ vào mặt gương mỗi đêm. Bạn chưa mở, và nó vẫn kiên nhẫn.',
        'Bạn kiểm lại các khế ước đang còn hiệu lực. Có hai cái bạn không nhớ mình đã ký.',
      ],
      events: [
        { r: [0, 1], t: 'Thầy sai bạn cho con quỷ giữ thư viện ăn. Nó nhìn cái xô thịt, rồi nhìn bạn, rồi hỏi bạn có muốn biết ngày chết của mình không.', a: ['Từ chối, đặt xô xuống và lùi ra', 'INT', 4, 'Nó cười khùng khục: “Đứa đầu tiên trong trăm năm không hỏi.” Lần sau bạn xuống, có một cuốn sách hiếm đặt sẵn ở bậc thềm.', 'Bạn lỡ gật đầu trước khi kịp nghĩ. Nó thì thầm một con số, và bạn sẽ không ngủ ngon nữa.', { jobXp: 1, INT: 1 }, { joy: -6 }], b: ['Ném xô thịt vào rồi chạy', 'Nó ăn. Tiếng cười của nó đuổi theo bạn lên tận cầu thang.', { joy: -1 }] },
        { r: [0], t: 'Vòng triệu hồi tập của bạn gọi lên một thứ rất nhỏ, rất giận dữ, trông như con cóc có cánh.', a: ['Xin lỗi nó cho đúng nghi thức rồi tiễn về', 'LUCK', 4, 'Nó phồng má nghe hết bài xin lỗi, nhổ một bãi rồi biến mất. Chỗ nó nhổ mọc lên một cây nấm phát sáng, hóa ra rất được giá.', 'Nó cắn vào mũi bạn rồi mới chịu về.', { wealth: 3, jobXp: 1 }, { health: -4, joy: -2 }], b: ['Dập vòng triệu hồi ngay', 'Nó biến mất giữa một câu chửi. Bạn mong là nó không nhớ mặt.', { jobXp: 0.5 }] },
        { r: [1], t: 'Một Demon trẻ mang đến túi tiền, xin bạn nguyền cho kẻ đã bỏ rơi cô ta phải khổ suốt đời.', a: ['Nguyền cho hắn nhớ cô ta rõ mồn một, mỗi đêm', 'INT', 5, 'Không đau đớn, không bệnh tật, chỉ là trí nhớ. Một năm sau cô quay lại xin gỡ: hắn đã đến quỳ trước cửa, và cô chán rồi.', 'Lời nguyền dội ngược: chính bạn là kẻ nhớ rõ mồn một mọi lỗi lầm của mình mỗi đêm.', { wealth: 5, jobXp: 1 }, { joy: -6 }], b: ['Bảo cô ta giữ tiền mà sống cho tốt', 'Cô ta chửi bạn là Warlock hạng bét. Túi tiền theo cô ta ra cửa.', { joy: 1 }] },
      ],
    },
    demon_bu: {
      start: [
        'Bạn tìm ra chỗ sai trong sổ thuế của khu chợ khi đứng chờ nộp tiền, và nói to lên. Viên thu thuế không chém bạn. Hắn đưa bạn cây bút: “Thế thì ngồi đây mà làm.”',
        'Trong một cuộc thanh trừng, bạn sống sót nhờ là kẻ duy nhất nhớ được ai nợ ai cái gì. Kẻ thắng cuộc cần một cái đầu như thế bên cạnh.',
      ],
      promo: [
        ['thu đủ thuế của một khu chợ mà không ai dám khai gian lần thứ hai.', 'chép lại sổ sách ba năm của một kho quân nhu và tìm ra thứ đã mất.'],
        ['điều lương thực cho một đồn tiền tiêu qua trọn một mùa vây hãm.', 'sống sót qua lần đổi chủ đầu tiên của nha môn mình đang phục vụ.'],
        ['vạch mặt một quan trên ăn chặn mà không để hắn kịp biết ai đã làm.', 'soạn một sắc lệnh mà cả ba phe trong triều đều tưởng là có lợi cho mình.'],
        ['đứng ra làm trọng tài cho một cuộc tranh chấp lãnh địa giữa hai lãnh chúa và còn nguyên đầu.', 'cải tổ cả một nha môn mà không cần chém ai.'],
      ],
      arcs: [
        ['Cuốn sổ có hai bản', 'Bạn phát hiện nha môn mình giữ hai bộ sổ: một để nộp lên Ma Vương, một để dùng thật.', 'Bạn chép lén cả hai, từng đêm một, và tính ra khoản chênh.', 'Khoản chênh nuôi một trại trẻ mồ côi của chiến tranh mà triều đình không thừa nhận. Nó cũng nuôi cả túi riêng của quan trên.', 'Thanh tra của Ma Vương đến bất ngờ, và bạn là người giữ chìa khóa tủ sổ.'],
        ['Người kế vị trống', 'Lãnh chúa bạn phục vụ chết đột ngột, không người kế vị. Ba phe đang mài dao.', 'Bạn nắm con dấu, sổ sách và lòng tin của đám lính gác trong ba ngày.', 'Mỗi phe đều đến gặp bạn riêng với một lời hứa. Phe yếu nhất là phe duy nhất không định tàn sát hai phe kia.', 'Sáng ngày thứ tư, cả ba phe cùng có mặt ở đại sảnh, và con dấu nằm trong tay bạn.'],
      ],
      quiet: [
        'Một nhiệm kỳ nữa trôi qua giữa giấy tờ. Bạn đã thấy bốn đời quan trên, và vẫn ngồi ở cái bàn ấy.',
        'Bạn sắp lại kho lưu trữ. Có những sắc lệnh do các Ma Vương mà không ai còn nhớ tên ban ra.',
        'Mực đỏ dùng cho án tử, mực đen cho thuế. Năm nay bạn dùng mực đen nhiều hơn, và coi đó là một năm tốt.',
        'Triều đình yên ắng. Bạn dành thời gian học thuộc xem ai đang ghét ai.',
      ],
      events: [
        { r: [0, 1], t: 'Một bà lão Demon đến nộp thuế bằng ba quả trứng thằn lằn, vì đó là tất cả những gì bà có.', a: ['Ghi vào sổ là đã nộp đủ bằng hiện vật', 'INT', 4, 'Luật cho phép nộp hiện vật, chỉ không ai nhớ đến điều khoản ấy. Bà lão đi rồi, và quan trên không tìm ra chỗ nào để bắt bẻ bạn.', 'Quan trên soát sổ, cười khẩy, và trừ phần thiếu vào lương bạn.', { joy: 4, jobXp: 1 }, { wealth: -3 }], b: ['Tịch thu cái nồi của bà cho đủ số', 'Sổ sách khớp. Bà lão ôm ba quả trứng về, không còn nồi để luộc.', { jobXp: 0.5, joy: -4 }] },
        { r: [0], t: 'Hai tiểu quan trong nha môn cùng nhờ bạn làm chứng chống lại nhau trong một vụ mất con dấu.', a: ['Tìm cho ra con dấu trước khi phải chọn phe', 'LUCK', 4, 'Con dấu nằm trong ống tay áo của chính quan trên, kẻ đã quên béng. Cả hai tiểu quan nợ bạn một ân tình, và quan trên nợ bạn sự im lặng.', 'Bạn không tìm ra. Cả hai cùng coi bạn là kẻ thù.', { fame: 2, jobXp: 1 }, { joy: -4 }], b: ['Xin ốm, nghỉ ba ngày', 'Khi bạn quay lại, một trong hai đã bị giáng chức. Không phải lỗi của bạn, bạn tự nhủ.', { joy: -1 }] },
        { r: [1], t: 'Một lãnh chúa nhỏ gửi đến một rương vàng, kèm lời nhờ “để lạc” một tờ đơn kiện của nông nô.', a: ['Nhận vàng, và xử tờ đơn theo đúng luật', 'INT', 6, 'Tờ đơn được xử công minh. Lãnh chúa không thể tố bạn mà không tự thú đã hối lộ. Rương vàng sung vào kho, trừ một nắm.', 'Lãnh chúa không ngại tự thú. Hắn có họ với quan trên của bạn.', { wealth: 5, fame: 2 }, { wealth: -4, fame: -2 }], b: ['Trả rương vàng về', 'Người đưa rương nhìn bạn như nhìn một kẻ điên. Ở Ma Giới, có lẽ đúng thế.', { joy: 2 }] },
      ],
    },
    demon_me: {
      start: [
        'Bạn bán lại chính cái vòng xích từng trói chân mình với giá gấp đôi, cho một kẻ sưu tầm. Một tay buôn chợ đen đứng xem, vỗ tay: “Thằng này bán được cả nỗi nhục.”',
        'Bạn là đứa duy nhất ở chợ Tro biết phân biệt lõi mana thật với thủy tinh nhuộm. Chẳng mấy chốc, cả kẻ mua lẫn kẻ bán đều trả tiền để bạn đứng về phía họ.',
      ],
      promo: [
        ['bán sạch một sạp hàng ế trong một đêm chợ mà không nói dối câu nào bắt được quả tang.', 'thu hồi một món nợ từ kẻ mà không ai dám đòi.'],
        ['dựng một sạp ở chợ đen và giữ được nó qua lần càn quét đầu tiên của lính Ma Vương.', 'tìm được nguồn cung riêng cho một thứ hàng mà cả chợ đang khan.'],
        ['đưa một lô ma cụ cấm qua ba trạm gác mà không tốn một giọt máu.', 'thâu tóm sạp của đối thủ bằng cách mua hết nợ của hắn.'],
        ['đứng ra bảo lãnh cho một phiên chợ đêm, và không ai dám gây chuyện trong đêm ấy.', 'bán cùng một món hàng cho hai phe thù địch mà cả hai đều cảm ơn.'],
      ],
      arcs: [
        ['Món hàng biết nói', 'Trong lô hàng bạn mua lại có một cái lồng phủ vải, và thứ bên trong xin bạn đừng bán nó.', 'Bạn vén tấm vải: một tinh linh nhỏ bị bắt từ Đại Ngàn, đáng giá cả một gia tài.', 'Một Warlock trả giá gấp ba để mua nó làm nguyên liệu. Thả nó thì bạn mất trắng số vốn đã vay.', 'Chủ nợ đến đòi tiền đúng lúc gã Warlock đặt túi vàng lên quầy.'],
        ['Phiên chợ trong vùng dịch', 'Một thành phố Demon bị phong tỏa vì dịch. Giá thuốc bên trong đã lên gấp trăm.', 'Bạn gom được một xe thuốc và tìm ra lối cống ngầm vào thành.', 'Bán theo giá chợ, bạn giàu to trong một đêm. Bán theo giá vốn, bạn hòa. Lính gác thành thì đòi nửa số hàng để nhắm mắt.', 'Cửa cống mở, và phía bên kia là một hàng dài những kẻ ho ra tro.'],
      ],
      quiet: [
        'Giá lõi mana lên xuống như hơi thở của Vực Thẳm. Bạn mua khi nó thở ra, bán khi nó hít vào.',
        'Một mùa buôn bán yên ổn. Bạn chỉ phải đổi chỗ giấu hàng hai lần.',
        'Bạn kiểm kho, và thấy một món mình đã quên từ ba mươi năm trước. Giờ nó là đồ cổ.',
        'Khách quen chết bớt, khách mới đến thêm. Sổ nợ của bạn thì chỉ dày lên.',
      ],
      events: [
        { r: [0, 1], t: 'Một con tiểu quỷ nhỏ thó thò tay vào sạp bạn, nẫng một viên lõi mana rồi vấp ngã ngay trước mặt.', a: ['Thuê luôn nó canh sạp', 'LUCK', 4, 'Kẻ từng ăn trộm thì biết mọi mánh ăn trộm. Từ khi có nó, sạp của bạn không mất thêm thứ gì, kể cả với chính nó.', 'Nó canh sạp ba ngày rồi biến mất cùng cả hòm tiền lẻ.', { wealth: 3, jobXp: 1 }, { wealth: -4 }], b: ['Lấy lại viên đá, đá đít nó đi', 'Nó chạy mất. Chợ Tro có hàng trăm đứa như nó.', { joy: -1 }] },
        { r: [0], t: 'Một khách sộp trả giá cao cho món đồ mà bạn biết rõ là hàng giả, thứ bạn lỡ mua nhầm tuần trước.', a: ['Nói thật, rồi gạ bán món khác', 'INT', 4, 'Khách sững người vì gặp một lái buôn Ma Giới nói thật, rồi mua luôn ba món khác mà không mặc cả.', 'Khách cười nhạt, bỏ sang sạp bên, nơi người ta không nói thật.', { wealth: 5, fame: 1 }, { wealth: -2 }], b: ['Bán luôn, coi như gỡ vốn', 'Bạn gỡ được vốn. Giờ chỉ mong khách không quay lại tìm.', { wealth: 4, fame: -1 }] },
        { r: [1], t: 'Tay trùm bảo kê khu chợ tăng “phí bình an” lên gấp đôi, đúng vào tháng bạn buôn bán kém nhất.', a: ['Rủ các chủ sạp khác cùng nộp theo giá cũ', 'INT', 5, 'Ba mươi sạp cùng đặt lên bàn hắn đúng số tiền cũ, cùng một lúc. Hắn đếm đầu người, rồi đếm đám đàn em, và quyết định giá cũ cũng được.', 'Đến giờ hẹn chỉ có mình bạn đứng đó. Sạp của bạn cháy ngay trong đêm.', { fame: 3, jobXp: 1 }, { wealth: -8 }], b: ['Nộp đủ, tính sau', 'Tháng ấy bạn ăn bánh tro. Nhưng sạp vẫn còn.', { wealth: -5 }] },
      ],
    },
    demon_bs: {
      start: [
        'Bạn nhặt xỉ sắt quanh lò rèn để bán và tự nung chảy nó thành một con dao xấu xí bằng bếp than. Con dao ấy cắt được xích. Thợ cả giật lấy nó xem, rồi giật luôn bạn về lò.',
        'Lửa Hỏa Ngục không làm phỏng tay bạn như phỏng tay kẻ khác. Bọn thợ rèn nhận ra điều đó trước cả bạn.',
      ],
      promo: [
        ['kéo bễ trọn một đêm cho lò chính mà không để lửa xuống màu.', 'rèn một trăm mũi thương cho quân đoàn, không mũi nào bị trả về.'],
        ['tôi một lưỡi kiếm trong máu ma thú mà không làm nó nứt.', 'sửa bộ giáp của một sĩ quan ngay giữa doanh trại, trước giờ xuất quân.'],
        ['rèn một ma khí chịu được lời nguyền khắc lên nó.', 'đúc lại quả chuông báo động của Ma Đô sau khi nó vỡ.'],
        ['làm ra một vũ khí được đặt tên riêng, và cái tên ấy được nhắc ngoài chiến trường.', 'nhóm lại một lò rèn đã nguội từ ba đời thợ trước.'],
      ],
      arcs: [
        ['Xiềng cho kẻ vô tội', 'Lò nhận một đơn hàng lớn: năm trăm bộ xiềng chân, cỡ nhỏ.', 'Bạn đo mẫu và hiểu ra chúng dành cho trẻ con ở các mỏ nô lệ.', 'Thợ cả bảo thợ rèn không hỏi hàng mình làm ra dùng vào đâu. Bạn có thể rèn chúng thật tốt, hoặc để lại trong mỗi bộ một mắt xích yếu.', 'Viên quản mỏ đến nghiệm thu, cầm từng bộ lên giật thử.'],
        ['Thanh kiếm đòi máu', 'Một lưỡi kiếm bạn rèn bắt đầu rỉ máu mỗi đêm, và chủ nhân của nó đã chết ba người liên tiếp.', 'Bạn chuộc lại thanh kiếm và đặt nó lên đe, lắng nghe.', 'Trong thép có lẫn tro cốt của một kẻ bị oan mà bạn vô tình nung chung. Nó chỉ muốn một cái tên được nói ra, cái tên của một lãnh chúa quyền thế.', 'Lãnh chúa ấy bước vào lò của bạn, ngỏ ý mua chính thanh kiếm đó.'],
      ],
      quiet: [
        'Lò đỏ suốt năm. Bạn đã thôi đếm số lưỡi thương, chỉ còn đếm số búa đã mòn.',
        'Bạn tôi thép bằng dầu, bằng máu, bằng nước Sông Tro. Mỗi thứ cho một tiếng ngân khác.',
        'Thợ học việc đến rồi đi. Vết chai trên tay bạn thì ở lại, dày thêm mỗi mùa.',
        'Chiến sự tạm lắng, đơn hàng thưa. Bạn rèn cho mình một cái ấm đun nước, rất đẹp.',
      ],
      events: [
        { r: [0, 1], t: 'Thợ cả ném cho bạn một thỏi thép lẫn tạp chất và bảo rèn ra thứ gì dùng được, tùy bạn.', a: ['Rèn một cái móc treo thịt thật chắc', 'STR', 4, 'Không ai rèn kiếm được từ thép ấy, và bạn đủ khôn để không thử. Thợ cả treo cái móc lên giữa lò: “Đứa này biết thép của nó đến đâu.”', 'Cái móc gãy ngay khi treo nửa con ma thú lên. Cả lò cười.', { jobXp: 1 }, { joy: -3 }], b: ['Cố rèn một con dao cho ra dáng', 'Con dao trông được, và gãy ở nhát chém thứ ba. Thợ cả không buồn nhìn.', { jobXp: 0.5, joy: -2 }] },
        { r: [0], t: 'Một con tiểu quỷ lửa chui vào lò của bạn làm tổ, và mọi mẻ thép từ đó đều cháy quá.', a: ['Dụ nó ra bằng một viên than loại ngon', 'LUCK', 4, 'Nó theo viên than sang cái lò phụ và ở luôn đó. Giờ bạn có một cái lò phụ không bao giờ cần nhóm.', 'Nó ăn hết viên than rồi quay về chỗ cũ, béo hơn và nóng hơn.', { jobXp: 1, wealth: 2 }, { wealth: -2 }], b: ['Dội nước Sông Tro cho nó tắt', 'Nó rít lên rồi tắt lịm. Lò của bạn nguội hơn bình thường suốt cả tuần sau.', { joy: -2 }] },
        { r: [1], t: 'Một kỵ sĩ trẻ mang đến thanh kiếm của cha hắn, gãy làm ba. Hắn muốn nó liền lại y như cũ.', a: ['Nói thật rằng nó sẽ không bao giờ như cũ, rồi rèn lại thành thứ khác', 'INT', 5, 'Ba mảnh thép thành một con dao găm và hai cái khóa giáp. Hắn mang cả ba ra trận, và thứ nào cũng cứu hắn một lần.', 'Hắn không chịu, ôm ba mảnh gãy đi tìm lò khác.', { fame: 2, wealth: 3 }, { joy: -2 }], b: ['Hàn lại cho giống cũ', 'Trông thì giống. Bạn dặn hắn chỉ nên treo nó lên tường, và mong hắn nghe.', { wealth: 3, joy: -2 }] },
      ],
    },
    demon_bh: {
      start: [
        'Kẻ quỵt nợ gia đình bạn trốn biệt ba năm. Bạn tìm ra hắn trong mười ngày, chỉ bằng cách hỏi đúng người ở đúng quán rượu. Sở treo thưởng nghe chuyện và gửi cho bạn một cái tên khác.',
        'Bạn bị săn trước khi đi săn. Sau lần thứ ba thoát khỏi tay thợ săn tiền thưởng, chính họ đến mời bạn: kẻ khó bắt thì biết cách bắt.',
      ],
      promo: [
        ['mang về một kẻ quỵt nợ mà không làm hỏng “hàng”.', 'lần ra một đào binh chỉ từ một mẩu vải và một cái tên giả.'],
        ['bắt sống một mục tiêu có ba cận vệ mà không giết ai.', 'bám theo một dấu vết đã nguội từ nửa năm trước và vẫn tìm ra.'],
        ['mang về một kẻ mà hai đội săn trước đó không trở lại.', 'từ chối một lệnh treo thưởng oan, và chứng minh được nó oan.'],
        ['bắt một pháp sư đào tẩu ngay trong tháp của hắn.', 'săn một kẻ đã thay tên đổi mặt suốt hai mươi năm.'],
      ],
      arcs: [
        ['Con mồi vô tội', 'Lệnh treo thưởng ghi tội giết người. Kẻ bạn bắt được là một thợ gốm chưa từng cầm dao.', 'Trên đường áp giải, bạn nghe hắn kể, và câu chuyện khớp một cách khó chịu.', 'Kẻ treo thưởng là hung thủ thật, và hắn giàu. Giao người thì nhận tiền; thả thì chính bạn bị treo thưởng vì ăn gian hợp đồng.', 'Cổng nhà kẻ treo thưởng hiện ra cuối con đường, và tù nhân của bạn thôi không van xin nữa.'],
        ['Người thầy trên danh sách', 'Cái tên mới nhất trên bảng treo thưởng là của kẻ đã dạy bạn nghề.', 'Bạn tìm ra chỗ ông trốn trong một ngày, vì ông đã dạy bạn mọi chỗ trốn.', 'Ông không chạy. Ông đã giết một sĩ quan để cứu một lứa nô lệ, và chỉ nhờ bạn một điều: nếu phải có kẻ nhận thưởng, hãy là bạn.', 'Ba đội săn khác đang khép vòng quanh căn lều, và ông chìa hai cổ tay ra.'],
      ],
      quiet: [
        'Giữa hai cuộc săn là những tháng chờ. Bạn mài dao, vá lưới và nghe tin đồn.',
        'Bạn nhớ mặt mọi kẻ mình từng bắt. Vài kẻ trong số đó đã ra tù và gật đầu chào bạn ngoài phố.',
        'Bảng treo thưởng năm nay toàn tên nhỏ. Bạn nhận vài việc cho đỡ nguội tay.',
        'Bạn lần theo một cái tên suốt bốn năm. Hóa ra hắn đã chết từ năm đầu.',
      ],
      events: [
        { r: [0, 1], t: 'Con mồi đầu tiên của bạn là một kẻ trộm gà, và hắn khóc suốt đường về.', a: ['Hỏi xem hắn trộm gà cho ai', 'LUCK', 4, 'Cho năm đứa em. Bạn vẫn giao hắn, nhận thưởng, rồi dùng nửa số ấy mua gà gửi về nhà hắn. Luật là luật, nhưng không ai cấm thế.', 'Hắn bịa một câu chuyện thảm rồi chuồn mất khi bạn mải nghe.', { joy: 3, jobXp: 1 }, { wealth: -3, fame: -1 }], b: ['Bịt miệng hắn lại cho yên', 'Chuyến đi yên tĩnh. Tiền thưởng đếm đủ.', { wealth: 3, joy: -2 }] },
        { r: [0], t: 'Một thợ săn khác đến trước bạn nửa bước và đã trói xong con mồi mà bạn bám suốt một tuần.', a: ['Đề nghị chia đôi, đổi lấy tin về con mồi lớn hơn', 'INT', 4, 'Hắn nheo mắt, rồi gật. Con mồi lớn hơn là có thật, và hai người bắt được nó trong mùa đó.', 'Hắn cười vào mặt bạn rồi dắt con mồi đi.', { wealth: 4, jobXp: 1 }, { joy: -3 }], b: ['Nhường, coi như một bài học', 'Một tuần công cốc. Lần sau bạn sẽ ngủ ít hơn.', { joy: -2 }] },
        { r: [1], t: 'Mục tiêu của bạn dí vào tay bạn một túi vàng nặng gấp ba tiền thưởng, xin bạn báo về là không tìm thấy.', a: ['Nhận vàng, rồi vẫn giao hắn', 'AGI', 5, 'Hắn chửi bạn suốt đường về. Sở treo thưởng không hỏi túi vàng thứ hai từ đâu ra.', 'Hắn có đồng bọn. Bạn mất cả vàng lẫn con mồi, cùng một cái răng.', { wealth: 8, joy: -2 }, { health: -8, wealth: -2 }], b: ['Gạt túi vàng đi, trói hắn lại', 'Danh tiếng của một thợ săn không mua được là thứ đáng giá hơn một túi vàng. Về lâu dài.', { fame: 2 }] },
      ],
    },
    demon_spy: {
      start: [
        'Bạn giấu sừng dưới mũ trùm và sống ba tháng trong một ngôi làng loài người mà không ai ngờ. Khi trở về, kẻ ra đón bạn không phải gia đình, mà là một người của Ma Vương đã theo dõi từ đầu.',
        'Bạn bắt chước giọng của viên cai ngục giỏi đến mức lính gác tự mở cửa. Kẻ ngồi ở xà lim bên cạnh, một điệp viên già, bật cười: “Đứa này dùng được.”',
      ],
      promo: [
        ['sống một mùa ở chợ biên giới dưới lốt loài người mà không lộ sừng.', 'chép lại bảng phân ca gác của một đồn lính chỉ bằng cách bán bánh ở cổng.'],
        ['kết thân với một sĩ quan loài người đủ để được mời về nhà ăn tối.', 'đưa một bức thư mật ra khỏi thành đang bị lục soát.'],
        ['leo lên được một chức quan nhỏ trong triều đình loài người.', 'nhận ra và vô hiệu một điệp viên khác đang theo dõi mình.'],
        ['giữ một thân phận giả suốt hai mươi năm, qua cả một cuộc hôn nhân.', 'ngăn một cuộc chiến bằng một tin tức đưa đúng lúc cho cả hai phía.'],
      ],
      arcs: [
        ['Người hàng xóm tốt bụng', 'Bà lão loài người ở cạnh nhà coi bạn như con, và con trai bà là sĩ quan mà bạn được lệnh moi tin.', 'Bạn ăn tối ở nhà họ mỗi tuần, ghi nhớ từng lời.', 'Tin bạn moi được sẽ dẫn quân Ma tộc đến đúng đồn của người con trai. Báo sai một chi tiết thì hắn sống, và có thể bạn bị lộ.', 'Bà lão gõ cửa, mang sang một bát súp, và hỏi sao đêm nay bạn thức khuya thế.'],
        ['Hai cái tên', 'Bạn sống dưới lốt loài người đủ lâu để có vợ con ở Sanctus. Ma Vương ra lệnh rút về.', 'Bạn có ba ngày để biến mất, theo cách khiến không ai tìm kiếm.', 'Rút về thì bỏ lại gia đình không lời giải thích. Ở lại thì thành kẻ phản bội, bị cả hai phía săn.', 'Người liên lạc chờ ở cổng thành lúc nửa đêm, và trong nhà, đứa con nhỏ của bạn vừa thức giấc.'],
      ],
      quiet: [
        'Thêm một năm dưới cái tên vay mượn. Có những buổi sáng bạn phải nhắc mình tên thật là gì.',
        'Bạn gửi báo cáo về đều đặn. Chẳng có gì đáng báo, và đó cũng là tin.',
        'Bạn mài sừng cho ngắn, nhuộm da cho nhạt. Việc ấy giờ nhanh như cạo râu.',
        'Hàng xóm loài người mời bạn dự đám cưới con họ. Bạn tặng quà, và tiện thể đếm số sĩ quan đến dự.',
      ],
      events: [
        { r: [0, 1], t: 'Một con chó của nhà hàng xóm cứ sủa điên cuồng mỗi khi bạn đi ngang: nó ngửi được mùi Ma tộc.', a: ['Kiên nhẫn làm thân với nó', 'LUCK', 4, 'Sau hai tuần xương hầm, nó vẫy đuôi với bạn hơn cả với chủ. Hàng xóm bảo nó chưa từng quý ai như thế.', 'Nó cắn rách ống quần bạn, và hàng xóm bắt đầu nhìn bạn hơi lâu.', { joy: 3, jobXp: 1 }, { fame: -1, health: -3 }], b: ['Cho nó một liều thuốc ngủ', 'Nó ngủ li bì ba ngày rồi hiền hẳn. Bạn thấy hơi áy náy, theo kiểu của một Demon.', { jobXp: 0.5 }] },
        { r: [0], t: 'Trong quán rượu, một lính loài người say xỉn kể chuyện cười về Ma tộc, và cả bàn nhìn sang chờ bạn cười.', a: ['Cười to nhất bàn, và kể một câu còn tệ hơn', 'INT', 4, 'Cả quán cười lăn. Tay lính khoác vai bạn, và trong cơn say kể luôn đơn vị hắn sắp chuyển đi đâu.', 'Câu chuyện của bạn có một chi tiết mà chỉ người từng sống ở Ma Giới mới biết. Có kẻ ở góc quán thôi cười.', { jobXp: 1, fame: 1 }, { joy: -4 }], b: ['Cười nhạt cho qua', 'Không ai để ý. Đó là điều tốt nhất có thể xảy ra với một điệp viên.', { jobXp: 0.5 }] },
        { r: [1], t: 'Một tu sĩ Lumina mời bạn vào nhà nguyện uống nước thánh mừng lễ. Với Ma tộc, thứ nước ấy bỏng như lửa.', a: ['Uống, và giữ nguyên nụ cười', 'STR', 6, 'Cổ họng bạn như nuốt than hồng, nhưng mặt bạn không đổi sắc. Vị tu sĩ từ đó bảo lãnh cho bạn trước mọi lời dị nghị.', 'Bạn ho sặc ra khói. Bạn đổ tại bệnh phổi, và không chắc ông ta tin.', { fame: 3, health: -5 }, { health: -10, fame: -2 }], b: ['Xin phép về vì đang ốm', 'Ông ta chúc bạn mau khỏe và nhìn theo bạn một lúc. Có lẽ không có gì.', { joy: -1 }] },
      ],
    },
  },
};
