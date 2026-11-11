// Each Human trade's own everyday dilemma, its aftermath and its two promotion trials (ranks 2 and 4),
// so no two trades share the same words. Arc: [title, intro, survey step, temptation step, final step].
module.exports = {
  human_mage: {
    dilemma: 'Một học trò năm nhất xin bạn ký vào bản thí nghiệm của cậu ta. Bạn nhìn ra một lỗi trong vòng tròn mana: nếu chạy, căn phòng sẽ nổ. Nhưng nếu bạn chỉ ra, cậu ta sẽ trượt kỳ thi và bị trả về làng.',
    safe: 'Chỉ ra lỗi, chịu để cậu ta trượt', tempt: 'Lặng lẽ sửa giúp mà không nói',
    good: 'Cậu ta trượt kỳ thi, khóc, rồi xin bạn dạy lại từ đầu. Năm sau cậu ta đỗ, và vòng tròn của cậu không có lỗi nào.', bad: 'Cậu ta trượt và bị trả về làng. Bạn nhận được một lá thư trách móc, không ký tên.',
    temptGood: 'Thí nghiệm chạy hoàn hảo. Cậu ta đỗ với điểm cao nhất, và không bao giờ biết mình suýt chết.', temptBad: 'Bạn sửa vội và sai thêm một nét. Căn phòng không nổ, nhưng cả hai bị bỏng nặng.',
    fallout: 'Học trò năm ấy giờ đã thành pháp sư và phát hiện ra chuyện cũ. Cậu ta đến tìm bạn, giữa Hội đồng Tháp Ngà, và hỏi vì sao.',
    arcs: [
      ['Mảnh vỡ của ngọn tháp đổ', 'Một tháp canh ma pháp cổ ở rìa Đồng Bằng sụp đổ, và những mảnh đá phát sáng đang làm cây cỏ quanh đó héo úa.', 'Bạn đo dòng mana rò rỉ từ từng mảnh đá và vẽ bản đồ vùng đất đang chết.', 'Viện Nguyên Tố muốn bạn thu gom các mảnh đá về Tháp Ngà để nghiên cứu, mặc kệ đất đai đã nhiễm.', 'Bạn đứng giữa đống đổ nát, dệt câu chú để hút cạn mana rò rỉ trước khi nó lan tới ngôi làng gần nhất.'],
      ['Di tích Đại Ngàn', 'Một di tích ma pháp từ thời trước Elf được tìm thấy sâu trong Đại Ngàn, và Tháp Ngà muốn có người đến trước khi các Elf đóng cửa nó.', 'Bạn đọc những rune trên cửa đá và nhận ra chúng không phải lời chào mà là lời cảnh báo.', 'Các trưởng lão Elf đề nghị chia sẻ di tích, với điều kiện bạn giữ bí mật những gì thấy được với chính Tháp Ngà.', 'Bạn bước vào căn phòng cuối cùng, nơi trái tim mana của di tích vẫn còn đập.'],
    ],
  },
  human_assassin: {
    dilemma: 'Mục tiêu của bạn đêm nay đang ngồi đọc truyện cho con gái nghe bên giường. Hợp đồng ghi rõ: phải xong trước khi gà gáy.',
    safe: 'Chờ đến khi đứa trẻ ngủ say rồi mới ra tay', tempt: 'Làm ngay, xong việc sớm',
    good: 'Bạn chờ đến gần sáng. Đứa trẻ không thức dậy, và không bao giờ biết đêm ấy có ai trên mái nhà.', bad: 'Bạn chờ quá lâu. Gà gáy, mục tiêu thức dậy đi làm, và hợp đồng thất bại.',
    temptGood: 'Nhanh và gọn. Nhưng bạn nghe thấy tiếng đứa trẻ gọi cha khi bạn đã lên tới mái nhà.', temptBad: 'Đứa trẻ hét lên. Cả khu phố thức dậy, và bạn phải chạy qua mái nhà dưới mưa tên.',
    fallout: 'Mười năm sau, một sát thủ trẻ mới gia nhập Umbra. Cô ta hỏi về người đã giết cha mình năm ấy.',
    arcs: [
      ['Kẻ phản đồ của Umbra Guild', 'Có kẻ trong Umbra đang bán tên của các thành viên cho Thánh Kỵ Sĩ Đoàn, và Mẹ Quạ giao việc tìm hắn cho bạn.', 'Bạn lần theo những hợp đồng bị lộ, từng cái một, đến khi chỉ còn ba cái tên khả nghi.', 'Kẻ phản đồ đề nghị chia cho bạn một nửa số tiền, nếu bạn đổ tội cho người khác.', 'Bạn chờ hắn ở nơi hắn hẹn gặp người mua, trong bóng tối dưới cầu cảng.'],
      ['Sổ đen của triều đình', 'Một cuốn sổ ghi tên mọi quan chức từng thuê sát thủ đang được rao bán ở chợ đen, và nửa triều đình muốn bạn lấy được nó trước.', 'Bạn lần theo tay buôn sổ qua ba thành phố, đổi ba lần cải trang.', 'Một vị bá tước có tên trong sổ đề nghị trả gấp mười lần nếu bạn đốt trang có tên ông ta trước khi giao.', 'Bạn đột nhập vào hầm của tay buôn, nơi cuốn sổ nằm giữa những chiếc bẫy chưa từng có ai qua được.'],
    ],
  },
  human_priest: {
    dilemma: 'Một bà mẹ nghèo xin bạn làm lễ an táng cho đứa con chết đuối. Linh mục trưởng nói lễ an táng phải đóng tiền, và nhà bà ta không có một đồng.',
    safe: 'Làm lễ không lấy tiền, tự chịu phạt', tempt: 'Làm lễ rút gọn để không ai để ý',
    good: 'Bạn làm lễ đầy đủ dưới mưa. Linh mục trưởng phạt bạn một tháng quét sân, và bà mẹ mang đến cho bạn một rổ trứng mỗi tuần.', bad: 'Linh mục trưởng báo lên giáo phận. Bạn bị chuyển đến một giáo xứ hẻo lánh.',
    temptGood: 'Lễ rút gọn trôi qua êm ả. Bà mẹ cảm ơn, nhưng bạn biết đứa trẻ xứng đáng được nhiều hơn mấy câu kinh vội.', temptBad: 'Ai đó vẫn để ý. Bạn bị phạt, và bà mẹ biết con mình chỉ được một nửa buổi lễ.',
    fallout: 'Câu chuyện về buổi lễ năm ấy đến tai Tòa Thánh. Giờ có cả trăm người nghèo xếp hàng trước cửa giáo đường, xin bạn làm lễ miễn phí.',
    arcs: [
      ['Lời nguyện trong làng dịch', 'Một ngôi làng ven Đầm Lầy Tử Khí bị dịch, và không tu sĩ nào chịu đến vì sợ lây.', 'Bạn đến làng, đếm số người bệnh và tìm nguồn nước đã nhiễm.', 'Giáo phận chỉ gửi đủ thuốc cho một nửa số người bệnh, và giao cho bạn quyền chọn ai được chữa.', 'Bạn ở lại làng dịch qua đêm dài nhất, cầu nguyện và chữa trị cho đến khi người bệnh cuối cùng hạ sốt hoặc nhắm mắt.'],
      ['Ngọn lửa của Tòa Thánh', 'Tòa Thánh mở phiên xét xử một nhóm tu sĩ bị tố là dị giáo, và bạn được mời làm một trong ba quan tòa.', 'Bạn đọc từng trang lời khai, từng lời buộc tội, và gặp riêng từng bị cáo.', 'Hai quan tòa kia đã quyết định từ trước. Họ chỉ cần chữ ký của bạn để bản án được thi hành.', 'Bạn đứng trước Tòa Thánh và đọc phán quyết của mình, biết rằng nó có thể khiến bạn mất tất cả.'],
    ],
  },
  human_merchant: {
    dilemma: 'Một lô vải lụa đẹp nhất mùa vừa về kho, nhưng bạn phát hiện nó được dệt bởi trẻ em bị giam trong một xưởng ở vương quốc bên kia biển. Không ai ở Sanctus biết, và khách hàng đã đặt trước cả lô.',
    safe: 'Hủy đơn, chịu bồi thường', tempt: 'Bán hết, lần sau không nhập nữa',
    good: 'Bạn bồi thường cho từng khách và kể cho họ lý do. Một nửa số khách quay lại mua hàng của bạn mãi mãi.', bad: 'Bồi thường ngốn hết lãi cả năm. Thương hội cười bạn là kẻ ngốc.',
    temptGood: 'Lô vải bán hết trong một tuần. Lãi đẹp. Bạn không nhìn vào những tấm vải ấy khi chúng rời kho.', temptBad: 'Một thủy thủ kể chuyện xưởng dệt ở quán rượu. Tin lan nhanh, và tên bạn bị gắn với lô vải ấy.',
    fallout: 'Một đứa trẻ trốn thoát khỏi xưởng dệt năm ấy, giờ đã lớn, đến Sanctus và gõ cửa thương hội của bạn.',
    arcs: [
      ['Tuyến hàng đầu tiên', 'Bạn có cơ hội mở tuyến hàng riêng đầu tiên qua đèo Răng Cưa, nơi bọn cướp và tuyết lở đều nguy hiểm như nhau.', 'Bạn đi trước một chuyến không hàng, ghi chép từng trạm nghỉ, từng chỗ có thể phục kích.', 'Một băng cướp đề nghị bảo kê tuyến đường với giá một phần mười hàng hóa, và chúng sẽ cướp của mọi đoàn khác.', 'Bạn dẫn đoàn xe đầu tiên qua đèo giữa cơn bão tuyết đầu mùa.'],
      ['Thương lộ xuyên lục địa', 'Bạn có cơ hội nối thương lộ từ Sanctus đến tận bờ biển phía đông, qua lãnh thổ của bốn vương quốc và ba tộc.', 'Bạn đàm phán với từng lãnh chúa, từng tộc trưởng, ghi lại thuế quan và phong tục của mỗi nơi.', 'Một vương quốc đề nghị độc quyền thương lộ cho bạn, với điều kiện bạn cấm cửa mọi thương nhân khác.', 'Bạn đứng trước hội đồng của cả bốn vương quốc để ký hiệp ước thương lộ.'],
    ],
  },
  human_smith: {
    dilemma: 'Một gã quý tộc đặt rèn một thanh kiếm đẹp để treo tường, và trả tiền trước. Nhưng ngay sau đó, ba người lính nghèo xin bạn sửa gấp áo giáp trước khi ra Tuyến Đầu vào sáng mai. Lò chỉ đủ lửa cho một việc.',
    safe: 'Sửa giáp cho lính trước', tempt: 'Rèn kiếm cho quý tộc đúng hẹn',
    good: 'Bạn làm suốt đêm cho ba bộ giáp. Gã quý tộc chờ thêm ba ngày, càu nhàu, nhưng thanh kiếm của ông ta vẫn đẹp.', bad: 'Gã quý tộc đòi lại tiền và kể khắp Sanctus rằng bạn không giữ lời.',
    temptGood: 'Thanh kiếm đẹp đến mức gã quý tộc thưởng thêm. Ba người lính đi Tuyến Đầu với giáp cũ.', temptBad: 'Bạn rèn vội và thanh kiếm cong vênh. Gã quý tộc không nhận, và ba người lính đã đi mất.',
    fallout: 'Một trong ba người lính năm ấy trở về từ Tuyến Đầu và tìm đến lò của bạn.',
    arcs: [
      ['Lò rèn của làng mỏ', 'Một làng mỏ trên Răng Cưa mất thợ rèn, và cuốc chim của thợ mỏ đang gãy liên tục dưới lòng đất.', 'Bạn xuống mỏ, nghe tiếng đá và thử độ cứng của từng vỉa quặng.', 'Chủ mỏ muốn bạn rèn cuốc bằng thép rẻ để tiết kiệm, mặc kệ thợ mỏ sẽ phải thay cuốc mỗi tuần.', 'Bạn rèn mẻ cuốc đầu tiên bằng chính quặng của làng, giữa tiếng nhìn chằm chằm của ba mươi thợ mỏ.'],
      ['Thép không gỉ của Sanctus', 'Cổng thành Sanctus đã gỉ sét qua ba trăm năm, và hội đồng thành phố muốn rèn một cánh cổng mới, bền hơn mọi thứ từng có.', 'Bạn đo từng then cài, từng bản lề, và tìm hiểu vì sao thép cũ lại gỉ.', 'Hội đồng muốn bạn khắc tên họ lên cổng, và cắt giảm thép ở những chỗ không ai thấy để có tiền làm việc đó.', 'Bạn dựng cánh cổng mới giữa tiếng búa và tiếng reo của cả thành phố.'],
    ],
  },
  human_ranger: {
    dilemma: 'Một con nai mẹ đang bị bầy sói đuổi trong vùng bạn tuần tra. Bầy sói ấy đã đói suốt mùa đông, và có ba con sói con đang chờ trong hang.',
    safe: 'Để tự nhiên quyết định', tempt: 'Bắn đuổi bầy sói, cứu con nai',
    good: 'Bạn đứng nhìn. Bầy sói có bữa ăn đầu tiên sau nhiều tuần. Bạn ghi vào sổ tuần tra, và đi tiếp.', bad: 'Bạn đứng nhìn, và con nai con chạy lạc vào làng. Dân làng trách bạn đã không làm gì.',
    temptGood: 'Bầy sói tan. Con nai thoát. Đêm ấy, bạn nghe tiếng sói con kêu đói rất lâu từ phía hang.', temptBad: 'Một mũi tên trúng con sói đầu đàn. Không có nó, cả bầy chết đói trước mùa xuân.',
    fallout: 'Mùa xuân năm sau, vùng tuần tra của bạn có quá nhiều nai, và chúng bắt đầu ăn sạch ruộng của làng bên.',
    arcs: [
      ['Dấu chân trong rừng cấm', 'Một khu rừng cấm ở rìa Đồng Bằng có những dấu chân lạ, và ba thợ săn đã mất tích.', 'Bạn đọc dấu vết: không phải thú, không phải người, mà là thứ gì đó đi bằng hai chân và nhẹ như lá.', 'Lãnh chúa muốn bạn đốt cả khu rừng để diệt thứ ấy, và trả thưởng theo số mẫu rừng bị cháy.', 'Bạn vào sâu trong rừng cấm lúc chạng vạng, một mình, theo dấu chân cuối cùng.'],
      ['Mũi tên xuyên mây', 'Một con Wyvern đang săn gia súc của các làng trên Răng Cưa, và nó bay quá cao cho mọi cung thủ.', 'Bạn leo lên những đỉnh núi quanh tổ của nó, tính hướng gió và tầm bay.', 'Các làng muốn bạn đầu độc xác gia súc làm mồi, dù chất độc sẽ ngấm vào nguồn nước của cả vùng.', 'Bạn chờ trên đỉnh núi cao nhất, dây cung căng, khi bóng cánh của nó che khuất mặt trời.'],
    ],
  },
  human_paladin: {
    dilemma: 'Bạn bắt được một tên trộm vặt đang ăn cắp bánh mì trong lúc đi tuần. Lời thề không cho phép bạn nói dối, và luật Sanctus quy định chặt tay kẻ trộm. Người đi đường đã thấy.',
    safe: 'Đưa hắn ra tòa và đứng ra làm chứng về cái đói của hắn', tempt: 'Nói với người đi đường rằng hắn chỉ đang mua bánh',
    good: 'Tòa nghe lời làm chứng của một Thánh Kỵ Sĩ và giảm án xuống ba tháng lao động. Hắn còn giữ được hai bàn tay.', bad: 'Tòa không nghe. Bản án được thi hành, và bạn phải đứng nhìn.',
    temptGood: 'Người đi đường tin bạn. Tên trộm chạy mất. Đêm ấy, ánh sáng trên kiếm bạn yếu đi một chút.', temptBad: 'Một người đi đường nói lại với Hội đồng. Bạn bị kỷ luật vì phá lời thề, và tên trộm vẫn bị bắt.',
    fallout: 'Tên trộm năm ấy giờ là một người thợ mộc. Hắn đến nhà nguyện, tìm bạn, và kể cho cả giáo đoàn nghe về ngày hôm ấy.',
    arcs: [
      ['Lời thề trên cầu đá', 'Một Hắc Kỵ Sĩ chặn cây cầu duy nhất dẫn vào thung lũng, và mọi kỵ sĩ thách đấu đều không trở về.', 'Bạn tìm hiểu về hắn từ những người dân thung lũng, và nghe được rằng hắn từng là một Thánh Kỵ Sĩ.', 'Hội đồng đề nghị phục kích hắn từ phía sau thay vì đấu tay đôi, trái với luật của kỵ sĩ.', 'Bạn bước lên cầu đá, một mình, kiếm chưa rút.'],
      ['Ánh sáng ở Tuyến Đầu', 'Pháo đài cuối cùng ở biên giới đang bị vây, và người ta cần một Thánh Kỵ Sĩ dẫn quân tiếp viện.', 'Bạn tìm đường đi qua vùng đất bị Ma tộc chiếm, đánh dấu những làng còn người sống.', 'Viên tướng muốn bỏ qua những làng còn người sống để đến pháo đài nhanh hơn.', 'Bạn dẫn quân tiếp viện vào cổng pháo đài khi ánh bình minh cuối cùng còn kịp.'],
    ],
  },
  human_scholar: {
    dilemma: 'Bạn phát hiện một sai sót trong cuốn sách giáo khoa mà chính bạn viết, đã dạy cho cả một thế hệ học trò. Sửa nó nghĩa là thừa nhận mười năm qua bạn đã dạy sai.',
    safe: 'Công bố bản sửa và xin lỗi', tempt: 'Lặng lẽ sửa trong lần tái bản sau',
    good: 'Tháp Ngà xôn xao. Nhưng học trò cũ của bạn gửi thư cảm ơn, vì cuối cùng họ cũng hiểu vì sao phép tính của họ luôn lệch.', bad: 'Đối thủ của bạn dùng bản sửa để công kích uy tín của bạn suốt nhiều năm.',
    temptGood: 'Bản tái bản lặng lẽ thay thế bản cũ. Không ai để ý. Bạn để ý.', temptBad: 'Một học trò tinh mắt so sánh hai bản và hỏi bạn trước cả lớp.',
    fallout: 'Một cây cầu xây theo phép tính trong sách cũ của bạn bị nứt. Người ta tìm đến bạn.',
    arcs: [
      ['Văn khố bị lãng quên', 'Một văn khố ở tầng hầm Tháp Ngà bị ngập nước, và những cuộn giấy duy nhất về lịch sử một tộc đã mất đang mục nát.', 'Bạn phân loại từng cuộn giấy ướt, xác định cuộn nào còn cứu được.', 'Viện trưởng muốn bạn chỉ cứu những cuộn giấy có giá trị với Tháp Ngà, bỏ mặc những cuộn về tộc người kia.', 'Bạn thức trắng bảy đêm, chép lại từng chữ trước khi giấy tan thành bột.'],
      ['Cuộc tranh luận trước nhà vua', 'Nhà vua muốn biết sự thật về một cuộc chiến cổ, và hai phe học giả đang tranh luận gay gắt.', 'Bạn tìm lại mọi nguồn sử liệu, kể cả những nguồn mà cả hai phe đều bỏ qua.', 'Một phe đề nghị bạn đứng về phía họ, đổi lại ghế Viện trưởng.', 'Bạn đứng trước nhà vua và cả hai phe, trình bày những gì bạn tìm được.'],
    ],
  },
  human_farmer: {
    dilemma: 'Con mương tưới chung chảy qua ruộng của bạn trước rồi mới đến ruộng hàng xóm. Năm nay hạn, và nếu bạn chặn mương một ngày, lúa nhà bạn sẽ sống. Lúa nhà hàng xóm thì không.',
    safe: 'Chia nước đều, cả hai cùng thu ít', tempt: 'Chặn mương một ngày',
    good: 'Cả hai nhà thu được nửa vụ. Mùa đông năm ấy khó khăn, nhưng không nhà nào phải bỏ làng.', bad: 'Nước chia đều vẫn không đủ. Cả hai nhà mất mùa.',
    temptGood: 'Lúa nhà bạn sống. Nhà hàng xóm mất trắng, và họ không bao giờ hỏi vì sao mương cạn một ngày.', temptBad: 'Hàng xóm phát hiện ra. Làng họp, và bạn bị phạt đóng góp thóc cho cả làng.',
    fallout: 'Mùa sau, nhà hàng xóm năm ấy có con trai đến tuổi lập gia đình, và cậu ta muốn cưới con gái một nhà trong làng mà bạn rất thân.',
    arcs: [
      ['Mùa gieo sau lũ', 'Lũ lớn cuốn trôi lớp đất màu của cả cánh đồng, và làng chỉ còn đủ hạt giống cho một lần gieo.', 'Bạn đi khắp cánh đồng, đào thử từng mảnh đất để biết nơi nào còn trồng được.', 'Lãnh chúa đề nghị cho vay hạt giống với lãi gấp ba, và lấy đất làm thế chấp.', 'Bạn dẫn cả làng gieo hạt trên những mảnh đất cuối cùng còn màu.'],
      ['Con kênh của Đồng Bằng', 'Bạn có cơ hội dẫn nước từ sông lớn về cho mười hai làng khô hạn, bằng một con kênh dài ba dặm.', 'Bạn đo độ dốc của đất, từng thước một, với một sợi dây và một bát nước.', 'Một lãnh chúa muốn con kênh đi qua đất của ông ta trước, và chỉ chia nước cho những làng chịu nộp tô.', 'Bạn mở cửa cống trước mười hai làng đang đứng chờ hai bên bờ kênh.'],
    ],
  },
  human_tamer: {
    dilemma: 'Một con ngựa chiến của quân đội bị gãy chân, và quân y muốn giết nó. Bạn biết nó có thể lành nếu được nghỉ một năm, nhưng quân đội không nuôi ngựa không làm việc.',
    safe: 'Mua lại con ngựa bằng tiền túi', tempt: 'Để quân y làm việc của họ',
    good: 'Con ngựa lành sau một năm, khập khiễng nhưng khỏe. Nó kéo xe cho trạm thú của bạn đến hết đời.', bad: 'Con ngựa không lành. Bạn mất tiền, và cuối cùng vẫn phải làm điều quân y đã muốn làm.',
    temptGood: 'Quân y làm nhanh và nhẹ. Con ngựa không đau. Bạn ở lại với nó đến khi xong.', temptBad: 'Quân y làm vụng. Bạn nghe tiếng ngựa hí suốt đêm trong đầu.',
    fallout: 'Viên sĩ quan cưỡi con ngựa ấy năm xưa tìm đến bạn, hỏi về con ngựa cũ của mình.',
    arcs: [
      ['Đàn ngựa hoang của Thảo Nguyên', 'Một đàn ngựa hoang đang bị săn bắt bừa bãi trên Thảo Nguyên Gió Hú, và các bộ lạc Beastman nhờ bạn giúp.', 'Bạn theo dõi đàn ngựa suốt một mùa, ghi lại đường đi và những con đầu đàn.', 'Một thương gia đề nghị mua lại cả đàn để thuần hóa, với giá đủ để bạn sống sung túc cả đời.', 'Bạn dẫn đàn ngựa qua hẻm núi đến vùng đồng cỏ an toàn, trước khi thợ săn kịp chặn đường.'],
      ['Khế ước với Chúa Tể Rừng Sâu', 'Một con thú cổ xưa sống trong Đại Ngàn đã bắt đầu tấn công các làng ven rừng, và không ai biết vì sao.', 'Bạn vào rừng, đọc dấu vết, và tìm ra nguồn cơn: một trại khai thác gỗ trái phép đã phá hang của nó.', 'Lãnh chúa muốn bạn dụ con thú ra khỏi rừng để quân đội tiêu diệt.', 'Bạn bước vào hang của Chúa Tể Rừng Sâu, tay không, để nói chuyện với nó.'],
    ],
  },
  human_bard: {
    dilemma: 'Một lãnh chúa trả bạn để hát một bài châm biếm đối thủ chính trị của ông ta trong lễ hội. Bài hát rất hay, nhưng toàn những lời bịa đặt.',
    safe: 'Từ chối, hát bài của mình', tempt: 'Hát, vì tiền và vì bài hát hay',
    good: 'Lãnh chúa giận dữ, nhưng khán giả vẫn yêu bài của bạn. Đối thủ của ông ta gửi đến một lời cảm ơn kín đáo.', bad: 'Lãnh chúa cấm bạn hát trong lãnh địa của ông ta suốt một năm.',
    temptGood: 'Khán giả cười nghiêng ngả. Bài hát lan khắp vùng. Đối thủ của lãnh chúa thua cuộc bầu, và bạn tự hỏi mình đã làm gì.', temptBad: 'Đối thủ của lãnh chúa có mặt trong đám đông. Ông ta đứng dậy, nói rõ từng lời bịa, và cả quảng trường quay sang nhìn bạn.',
    fallout: 'Người bị bài hát năm ấy châm biếm giờ đã mất tất cả. Con gái ông ta đến tìm bạn.',
    arcs: [
      ['Bài ca của những người thợ mỏ', 'Một vụ sập mỏ chôn vùi bốn mươi thợ mỏ, và chủ mỏ muốn câu chuyện được kể như một tai nạn không ai có lỗi.', 'Bạn xuống làng mỏ, nghe những người góa phụ kể về chồng mình, từng người một.', 'Chủ mỏ đề nghị trả bạn để viết một bài ca ngợi “sự hy sinh anh dũng”, không nhắc đến những vết nứt đã được báo trước.', 'Bạn đứng giữa quảng trường làng mỏ, hát bài hát của bốn mươi người.'],
      ['Bản trường ca của lục địa', 'Các tộc của Aethelgard tổ chức một đại hội hiếm hoi, và người ta muốn một bản trường ca kể lịch sử chung của tất cả.', 'Bạn đi gặp người kể chuyện của từng tộc, nghe phiên bản của họ về cùng những cuộc chiến.', 'Mỗi tộc muốn bản trường ca kể mình là anh hùng, và họ trả tiền để được như vậy.', 'Bạn đứng trước đại hội của mọi tộc, cây đàn trong tay, và bắt đầu hát.'],
    ],
  },
};
