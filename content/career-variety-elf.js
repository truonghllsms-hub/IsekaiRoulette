// Elf trades: other ways in, their own promotion trials, a second milestone, everyday scenes,
// and more quiet-year lines for lives that last centuries. See career-variety.js.
module.exports = {
  race: 'elf',
  lead: {
    teen: [
      'Vòng gỗ thứ một trăm của cây sinh mệnh mà cha mẹ trồng cho bạn đã khép. Theo lệ Đại Ngàn, đó là ngày một Elf trẻ đứng trước Hội đồng và nói mình sẽ gìn giữ điều gì.',
      'Các bậc thầy của Đại Ngàn mở cửa đón học trò, mỗi trăm năm chỉ một lần. Lũ Elf cùng lứa đã chọn xong cả; chỉ còn bạn đứng giữa khoảng rừng trống, cân nhắc.',
      'Một chiếc lá Yggdrasil rơi xuống đúng vai bạn giữa ngày lặng gió. Người già bảo đó là lúc Cây hỏi: “Ngươi sẽ làm gì với ngần ấy năm tháng?”',
      'Bạn đã học xong những bài ca vỡ lòng, tên của mọi loài cây, và lịch sử của ba kỷ nguyên. Giờ đến phần không ai dạy được: chọn một con đường để đi vài trăm năm.',
      'Một thương nhân loài người kể với bạn rằng ở tuổi bạn, ông ta đã có cháu nội. Bạn bật cười, rồi chợt thấy mình vẫn chưa bắt đầu việc gì cả.',
    ],
    adult: [
      'Elf có thừa thời gian, và chính vì thế mà dễ để nó trôi tuột. Sáng nay, bạn nhìn sương tan trên tán lá và quyết định sẽ thôi trì hoãn.',
      'Một người bạn loài người bạn quen thuở nhỏ vừa qua đời vì tuổi già. Anh ta đã kịp sống trọn một nghề; bạn thì còn chưa chọn.',
      'Hội đồng Trưởng Lão nhắc tên bạn trong buổi họp mùa: một Elf đã trưởng thành mà chưa nhận phần việc nào của rừng. Không trách cứ, chỉ nhắc. Thế cũng đủ ngượng.',
    ],
    origins: {
      bg_royal: 'Dòng máu hoàng tộc mở sẵn mọi cánh cửa, và chính vì thế Hội đồng muốn biết bạn sẽ tự chọn cánh cửa nào, thay vì để cái tên chọn hộ.',
      bg_ranger: 'Bạn lớn lên giữa mùi dầu lau cung và tiếng tù và đổi gác của doanh trại Tuần Lâm. Đội trưởng bảo đã đến lúc bạn nhận cung thật, hoặc nói rõ mình muốn một lối khác.',
      bg_exiled: 'Sanctus không phải nơi cho một Elf lớn lên, nhưng bạn đã lớn lên ở đó. Không có Hội đồng nào hỏi han; bạn phải tự hỏi mình sẽ sống bằng gì giữa loài người.',
      bg_nature: 'Bạn được nuôi bằng sương và tiếng chim, không thầy, không sách. Một ngày, rừng thôi không tự mang thức ăn đến nữa, và bạn hiểu đó là lời nhắn.',
      bg_mana: 'Ma lực kết tinh trong người bạn từ thuở lọt lòng, và ai cũng đoán trước bạn sẽ thành gì. Bạn muốn tự mình quyết định xem họ đoán có đúng không.',
      bg_war: 'Chiến hỏa lấy của bạn mọi thứ trước khi bạn kịp nhớ mặt chúng. Giờ bạn đã đủ lớn để chọn: cầm lấy thứ gì đó để bảo vệ, hoặc để xây lại.',
      bg_merchant: 'Bạn biết đếm ma tinh trước khi biết bắn cung, lớn lên trên những cỗ xe của thương đoàn. Trưởng đoàn hỏi bạn sẽ nối nghề, hay xuống xe ở bìa rừng kế tiếp.',
      bg_dark: 'Dấu ấn Hắc Nguyệt trên da khiến các bậc thầy ngần ngại nhận bạn. Bạn sẽ phải chọn một con đường và đi nó giỏi đến mức không ai còn nhìn vào dấu ấn.',
      bg_wild: 'Dòng máu lai khiến bạn lớn nhanh hơn Elf và chậm hơn mọi tộc khác. Chẳng bên nào coi bạn là người của họ, nên cái nghề sẽ phải là quê hương của bạn.',
      bg_forge: 'Bạn lớn lên bên lò rèn của tộc Dwarf, tai quen tiếng búa hơn tiếng lá. Trở về Đại Ngàn, bạn phải học lại cách làm một Elf, bắt đầu bằng một cái nghề.',
    },
  },
  jobs: {
    elf_merchant: {
      start: [
        'Bạn đổi một nắm hạt giống cây thuốc lấy con dao thép của một lái buôn loài người, và cả hai cùng nghĩ mình được hời. Một thương chủ Elf chứng kiến, mỉm cười: “Giao ước tốt nhất là giao ước cả hai bên đều vui.”',
        'Thương đoàn Sinh Mạch cần một người nhớ được giá của ba trăm loại ma thảo ở bảy khu chợ. Bạn thuộc chúng như thuộc tên các vì sao.',
      ],
      promo: [
        ['mang một giỏ ma thảo đến chợ biên giới và đổi được thứ mà Đại Ngàn thật sự cần, không phải vàng.', 'giữ trọn lời hẹn giao hàng với một làng loài người qua ba mùa, dù hai mùa trong đó mất giá.'],
        ['thương lượng với hội thương nhân Dwarf về giá ma tinh mà không để bên nào đứng dậy bỏ bàn.', 'lập sổ cho một thương đoàn nhỏ và đưa nó qua trọn một vòng mười năm không thâm hụt.'],
        ['mở một lối buôn mới qua vùng đất mà trước đó chỉ có Tuần Lâm dám đi.', 'đứng ra bảo lãnh cho một giao ước giữa hai tộc vốn không tin nhau, bằng chính danh dự của mình.'],
        ['soạn một bản giao ước mà con cháu của cả hai bên vẫn còn tôn trọng sau một trăm năm.', 'khiến ba vương quốc loài người cùng chấp nhận cân đo của Đại Ngàn làm chuẩn.'],
      ],
      arcs: [
        ['Hạt giống bị đánh tráo', 'Một lô hạt giống ma thảo bán cho loài người mọc lên toàn cỏ dại. Họ nói Elf lừa đảo.', 'Bạn lần lại đường đi của lô hàng, từ vườn ươm đến tay người mua.', 'Hạt bị tráo bởi một Elf trong thương đoàn đang nợ nần ở Sanctus. Nhận lỗi về mình thì giữ được hòa khí; tố ra thì hắn bị trục xuất khỏi rừng.', 'Sứ giả loài người đứng chờ ở bìa rừng, cùng một trăm nông dân mất trắng mùa.'],
        ['Cái giá của một cánh rừng', 'Một vương quốc đề nghị mua đứt quyền khai thác một góc Đại Ngàn, trả bằng số vàng đủ nuôi thương đoàn năm trăm năm.', 'Bạn đi bộ qua góc rừng ấy, đếm những gì đang sống ở đó.', 'Hội đồng chia rẽ. Một nửa muốn bán để lấy vàng mua hòa bình, và họ cần chữ ký của bạn.', 'Bản giao ước nằm trên bàn đá, mực đã mài, và nhà vua loài người thì không còn sống được mấy năm nữa để chờ.'],
      ],
      quiet: [
        'Bạn dành cả một mùa để nếm thử ba mươi loại mật hoa, ghi lại vị của từng triền núi.',
        'Chuyến hàng năm nay đi rồi về êm ả. Đứa bé loài người từng xin bạn kẹo ở trạm nghỉ giờ đã là chủ quán.',
        'Bạn chép lại sổ giao ước cũ sang da mới. Nhiều cái tên trong đó đã thuộc về người chết.',
        'Giá ma tinh lên rồi xuống như thủy triều. Bạn đã thôi sốt ruột vì nó từ thế kỷ trước.',
      ],
      events: [
        { r: [0, 1], t: 'Một bà lão loài người muốn đổi con gà mái duy nhất lấy thuốc ho cho cháu. Con gà không đáng một phần mười gói thuốc.', a: ['Nhận con gà, và nhờ bà nuôi hộ', 'LUCK', 4, 'Bà cụ mang trứng đến trạm mỗi mùa cho đến cuối đời. Tính ra, đó là một trong những giao ước có lãi nhất của bạn.', 'Trưởng đoàn bắt gặp và trừ gói thuốc vào phần của bạn.', { joy: 5, fame: 1 }, { wealth: -3 }], b: ['Giải thích rằng không đủ', 'Bà cụ ôm con gà về. Luật cân đo không có lỗi, bạn tự nhủ thế.', { joy: -3 }] },
        { r: [0], t: 'Một lái buôn trẻ loài người cố bán cho bạn “lá Yggdrasil thật”, rõ ràng là lá sồi phơi khô.', a: ['Mua một chiếc, rồi chỉ cho cậu ta chỗ sai', 'INT', 4, 'Cậu ta đỏ mặt tía tai, rồi phá ra cười. Bạn chỉ cho cậu ta vài thứ lá thật sự bán được, và hai mươi năm sau cậu ta vẫn là bạn hàng tốt.', 'Cậu ta tưởng bạn tin thật và đi khoe khắp chợ là đã lừa được một Elf.', { joy: 4, jobXp: 1 }, { fame: -1 }], b: ['Lắc đầu đi tiếp', 'Sẽ có người khác mua. Lá sồi phơi khô cũng chẳng hại ai.', { joy: 1 }] },
        { r: [1], t: 'Hai thương đoàn Elf cùng đến một khu chợ loài người trong một ngày, mang cùng một loại hàng. Giá sẽ sụp nếu cả hai cùng bán.', a: ['Sang lều bên kia bàn chuyện chia chợ', 'INT', 5, 'Một bên bán hôm nay, một bên bán phiên sau, và cả hai chia đều phần chênh. Trà pha xong vừa lúc thỏa thuận xong.', 'Họ nghi bạn giăng bẫy và hạ giá ngay trong đêm. Cả hai đoàn cùng lỗ.', { wealth: 5, jobXp: 1 }, { wealth: -5 }], b: ['Dọn hàng đi chợ khác', 'Thêm bốn ngày đường, nhưng không ai phải phá giá ai.', { wealth: 1 }] },
      ],
    },
    elf_ranger: {
      start: [
        'Bạn lần theo một con hươu bị thương suốt ba ngày chỉ để rút mũi tên của kẻ săn trộm ra khỏi vai nó. Đội Tuần Lâm vẫn đi sau bạn từ ngày đầu, và họ thích điều họ thấy.',
        'Mũi tên đầu tiên bạn bắn trượt đích cả sải tay, nhưng găm đúng sợi dây bẫy mà không ai khác nhìn ra. Vị đội trưởng nhặt mũi tên lên xem, rồi nhìn bạn.',
      ],
      promo: [
        ['đi trọn một vòng tuyến tuần mà không làm gãy một cành khô nào dưới chân.', 'tìm ra và gỡ sạch mười hai cái bẫy của bọn săn trộm trong một đêm.'],
        ['dẫn một đoàn hành hương loài người xuyên rừng mà không để họ nhìn thấy những gì không được phép thấy.', 'bắn rụng một quả sồi từ ngọn cây cao nhất mà không làm rơi chiếc lá bên cạnh.'],
        ['canh một tổ linh điểu suốt ba mùa cho đến khi chim non biết bay.', 'đẩy lùi một toán đốn gỗ lậu mà không ai trong số họ phải đổ máu.'],
        ['dạy trọn một lứa Ranger trẻ, và không ai trong số chúng lạc đường trong đêm thử thách.', 'vẽ lại bản đồ tuần tra của cả một vùng rừng sau trận cháy lớn.'],
      ],
      arcs: [
        ['Kẻ săn trộm tí hon', 'Bẫy thỏ xuất hiện dọc bìa rừng, vụng về, làm bằng dây giày và cành cây.', 'Bạn nằm phục một đêm và thấy kẻ đặt bẫy cao chưa tới thắt lưng bạn.', 'Đó là lũ trẻ của một làng loài người đang đói vì mất mùa. Luật rừng không phân biệt tuổi của kẻ săn trộm.', 'Trưởng làng dẫn dân ra bìa rừng, tay cầm cuốc, để xin lại lũ trẻ bạn đang giữ.'],
        ['Cây cổ thụ biết đi', 'Một cây cổ thụ nghìn năm tuổi bật rễ, lầm lũi đi về phía nam. Không Ranger nào từng thấy điều ấy.', 'Bạn đi theo nó nhiều tuần, đánh dấu con đường nó để lại.', 'Nó đang bỏ chạy khỏi thứ gì đó dưới lòng đất. Trên đường nó đi là ba ngôi làng loài người.', 'Cây cổ thụ dừng trước ngôi làng đầu tiên, và dân làng đã châm đuốc.'],
      ],
      quiet: [
        'Một mùa nữa trên tuyến tuần. Con cú ở trạm gác thứ ba đã quen bạn đến mức không buồn mở mắt.',
        'Bạn thay dây cung, như đã thay mấy chục lần. Cây cung thì vẫn là cây cung ấy.',
        'Lối mòn bạn đi mỗi ngày đã lõm xuống thành rãnh. Rêu chưa bao giờ kịp mọc lên nó.',
        'Năm nay bìa rừng yên ắng. Bạn dành những buổi chiều để học tiếng kêu của một loài chim mới di cư về.',
      ],
      events: [
        { r: [0, 1], t: 'Trên tuyến tuần, bạn gặp một đứa trẻ loài người đang trèo lên một cây thiêng để hái quả.', a: ['Gọi nó xuống, rồi hái cho nó quả ở cây khác', 'LUCK', 4, 'Thằng bé tụt xuống, mắt tròn xoe vì lần đầu thấy Elf. Nó ôm một vạt áo đầy quả dại chạy về, và từ đó lũ trẻ làng ấy không trèo cây thiêng nữa.', 'Nó giật mình tuột tay, ngã trẹo chân. Bạn phải cõng nó về tận làng và nghe mẹ nó mắng cả hai.', { joy: 5, fame: 1 }, { joy: -2 }], b: ['Bắn một mũi tên cảnh cáo vào thân cây', 'Thằng bé hét lên, nhảy xuống chạy thẳng. Làng nó sẽ kể về Elf dữ tợn thêm một đời nữa.', { jobXp: 0.5, joy: -2 }] },
        { r: [0], t: 'Một con sói già què chân cứ lẽo đẽo theo bạn dọc tuyến tuần, giữ khoảng cách đúng hai mươi bước.', a: ['Để lại cho nó một phần thịt khô mỗi tối', 'LUCK', 4, 'Đến mùa đông, nó ngủ cách lửa trại của bạn mười bước. Một đêm, chính tiếng gầm gừ của nó đánh thức bạn trước khi bọn săn trộm kịp đến gần.', 'Nó ăn thịt của bạn suốt một mùa rồi bỏ đi không ngoái lại. Sói là sói.', { joy: 4, LUCK: 1 }, { wealth: -1 }], b: ['Xua nó đi', 'Nó lùi vào bóng cây. Bạn thấy đôi mắt nó thêm vài đêm nữa, rồi thôi.', { joy: -1 }] },
        { r: [1], t: 'Một Ranger trẻ bắn hạ con nai trắng vì tưởng nó là thú thường. Cậu ta run bần bật bên cái xác.', a: ['Cùng cậu ta làm lễ tạ rừng cho đủ', 'INT', 5, 'Hai người thức trắng đêm hát bài tiễn. Sáng ra có một con nai trắng khác đứng nhìn từ xa, và cậu Ranger trẻ không bao giờ bắn vội nữa.', 'Hội đồng Tuần Rừng biết chuyện trước khi bạn kịp báo. Cả hai cùng bị phạt gác biên một mùa.', { jobXp: 1, joy: 2 }, { joy: -4 }], b: ['Báo lên Hội đồng theo đúng luật', 'Cậu ta bị tước cung ba năm. Luật là luật, và ánh mắt cậu ta nhìn bạn thì đổi khác.', { jobXp: 0.5, joy: -3 }] },
      ],
    },
    elf_spirit: {
      start: [
        'Một tinh linh gió nhỏ xíu mắc kẹt trong chiếc chuông đồng ở hiên nhà bạn. Bạn mở nắp chuông cho nó ra, và nó quấn quanh cổ tay bạn suốt ba ngày không chịu rời.',
        'Bạn trả lời một câu hỏi mà không ai trong phòng nghe thấy. Vị Tinh Linh Sư ngồi cuối bàn đặt chén trà xuống: “Ngươi vừa nói chuyện với dòng suối đấy.”',
      ],
      promo: [
        ['gọi được một tinh linh sương đến đậu trên lòng bàn tay và để nó tự rời đi.', 'ngồi im bên một ngọn lửa suốt đêm cho đến khi nó chịu nói tên mình.'],
        ['ký khế ước đầu tiên với một tinh linh mà không hứa điều gì mình không giữ được.', 'xoa dịu một tinh linh suối đang giận vì bị lấp dòng.'],
        ['cho phép ba tinh linh khác nguyên tố cùng trú trong một vòng tròn mà không đánh nhau.', 'thả tự do cho tinh linh đầu tiên của mình khi khế ước mãn hạn, dù rất muốn giữ.'],
        ['đứng làm chứng cho một khế ước giữa tinh linh cổ và cả một ngôi làng.', 'đưa một tinh linh lạc từ thành phố loài người trở về mạch nguồn của nó.'],
      ],
      arcs: [
        ['Tinh linh trong lò rèn', 'Một tinh linh lửa bị thợ rèn loài người nhốt trong lò suốt ba mươi năm. Nó đang yếu dần và bắt đầu thù hận.', 'Bạn đến xưởng rèn, giả làm khách đặt hàng, và nghe tiếng nó thì thào trong than.', 'Cả thị trấn sống nhờ cái lò ấy. Thả nó ra, bốn trăm người mất kế sinh nhai; để lại, nó sẽ chết hoặc phát nổ.', 'Lò rèn rung lên giữa đêm, và người thợ rèn già cầm búa đứng chắn trước cửa lò.'],
        ['Khế ước bị bỏ quên', 'Một tinh linh đất vẫn canh giữ một cây cầu theo khế ước ký với một Tinh Linh Sư đã chết từ bốn trăm năm trước.', 'Bạn tìm lại bản khế ước trong thư khố, chữ đã mờ quá nửa.', 'Khế ước chỉ có thể giải bởi người ký. Bạn có thể ký thay bằng tên giả, hoặc nhận lấy cả phần ràng buộc của người xưa.', 'Tinh linh đất trồi lên giữa cầu, già nua và kiệt sức, hỏi bạn có phải người nó vẫn chờ.'],
      ],
      quiet: [
        'Bạn và tinh linh gió học thuộc thói quen của nhau thêm một mùa. Nó ghét mùi hành, bạn thì ghét bị thổi tắt đèn.',
        'Có những năm chẳng tinh linh nào cần gì. Bạn ngồi bên suối và tập nghe mà không hỏi.',
        'Bạn chép lại tên thật của các tinh linh mình biết vào một cuốn sổ không ai khác đọc được.',
        'Tinh linh lửa nhỏ nhất của bạn ngủ đông trong một viên than hồng. Bạn canh cho nó khỏi tắt.',
      ],
      events: [
        { r: [0, 1], t: 'Một tinh linh nước tinh nghịch cứ lén làm ướt giường của bậc thầy bạn, và ông giao bạn giải quyết.', a: ['Hỏi xem nó muốn gì', 'INT', 4, 'Nó chỉ muốn có người hát cho nghe trước khi trời sáng. Bạn hát, hơi lạc giọng, và giường của thầy khô từ đó.', 'Nó hiểu câu hỏi thành lời mời và chuyển sang làm ướt giường của bạn.', { jobXp: 1, joy: 3 }, { joy: -3 }], b: ['Rắc muối quanh giường thầy', 'Tinh linh nước tránh xa. Nó cũng không bao giờ trả lời bạn nữa.', { jobXp: 0.5, joy: -2 }] },
        { r: [0], t: 'Lũ trẻ Elf thách bạn bảo tinh linh gió hất tung mũ của một trưởng lão đang đi ngang.', a: ['Từ chối, nhưng bảo gió thổi một vòng lá quanh lũ trẻ', 'LUCK', 4, 'Lá xoay thành một cơn lốc nhỏ làm lũ trẻ cười ngặt nghẽo. Vị trưởng lão đứng xem từ xa, và mũ ông vẫn ngay ngắn.', 'Tinh linh gió hiểu nhầm ý bạn. Chiếc mũ của trưởng lão bay lên tận ngọn cây.', { joy: 5 }, { fame: -2, joy: 2 }], b: ['Từ chối thẳng', 'Lũ trẻ chê bạn nhạt nhẽo. Tinh linh gió có vẻ cũng nghĩ thế.', { joy: -1 }] },
        { r: [1], t: 'Một nông dân loài người quỳ trước bạn, xin bạn sai tinh linh mưa cứu ruộng của ông ta. Tinh linh mưa thì không nhận lệnh của ai bao giờ.', a: ['Đưa ông ta đến tự mình xin', 'LUCK', 5, 'Ông lão đứng giữa ruộng nứt nẻ, nói với bầu trời bằng thứ tiếng quê mùa. Tinh linh mưa nghe hết, và chiều hôm đó trời đổ mưa trên đúng thửa ruộng ấy.', 'Bầu trời không trả lời. Ông lão lặng lẽ đội nón ra về.', { joy: 5, fame: 2 }, { joy: -3 }], b: ['Nói thật rằng mưa không thể sai khiến', 'Ông ta không tin, cho rằng Elf ích kỷ. Bạn không trách ông.', { joy: -2 }] },
      ],
    },
    elf_herb: {
      start: [
        'Bạn nhai nhầm một thứ lá khi còn nhỏ và ngủ li bì ba ngày. Tỉnh dậy, việc đầu tiên bạn làm là xin bà lang kể tên mọi thứ lá khác có thể làm được như thế.',
        'Khu vườn sau nhà bạn mọc tốt đến lạ, cả những loài vốn chỉ sống trên núi cao. Một thảo dược sư đi ngang dừng lại rất lâu trước hàng rào.',
      ],
      promo: [
        ['phân biệt được ba mươi loại rễ chỉ bằng mùi, trong lúc bị bịt mắt.', 'sao một mẻ lá an thần đúng lửa, không cháy một lá nào.'],
        ['chữa lành một vết thương nhiễm độc cho một Ranger mà không để lại sẹo.', 'trồng sống một cây thuốc quý ở nơi các bậc thầy bảo là không thể.'],
        ['tìm ra thuốc giải cho một loại độc chưa từng được ghi trong sách.', 'đi một vòng các làng loài người quanh rừng và dập tắt một trận dịch trẻ con.'],
        ['viết lại cuốn dược điển của Đại Ngàn, sửa những chỗ sai đã chép qua mười đời.', 'ươm thành công hạt giống của một loài cây thuốc tưởng đã tuyệt.'],
      ],
      arcs: [
        ['Phương thuốc bị cấm', 'Một bệnh nhân hấp hối cần đến loại thuốc chỉ chiết được từ nhựa của cây thiêng, thứ mà luật rừng cấm chạm vào.', 'Bạn thử mọi phương thuốc thay thế trong sách, từng cái một.', 'Không cái nào đủ. Bệnh nhân là một đứa trẻ loài người, còn cây thiêng thì sẽ đau, dù không chết.', 'Đêm xuống, bạn đứng dưới gốc cây thiêng với một con dao bạc và một cái bát.'],
        ['Khu vườn của kẻ đầu độc', 'Ba trưởng lão ngã bệnh cùng một kiểu, và mọi dấu vết đều dẫn về khu vườn của bậc thầy đã dạy bạn.', 'Bạn lặng lẽ kiểm từng luống cây trong vườn thầy, nơi mình từng học vỡ lòng.', 'Thầy bạn không đầu độc ai. Bà đang thử thuốc trên chính mình để tìm cách chữa, và đã lú lẫn đến mức trộn nhầm.', 'Hội đồng họp xét xử, và người ta gọi bạn ra làm chứng về độc dược.'],
      ],
      quiet: [
        'Bạn phơi lá suốt mùa khô và nghiền rễ suốt mùa mưa. Đôi tay bạn giờ có mùi của cả khu vườn.',
        'Cây thuốc bạn trồng từ ngày mới vào nghề vừa ra hoa lần đầu. Loài này năm mươi năm mới nở một lần.',
        'Bạn ghi thêm một dòng vào sổ: liều dùng cho loài người phải giảm một nửa, vì họ nhỏ và vội.',
        'Một mùa ít người bệnh. Bạn dành thời gian nhổ cỏ, và nếm thử vài thứ cỏ trước khi nhổ.',
      ],
      events: [
        { r: [0, 1], t: 'Bậc thầy bảo bạn nếm một chiếc lá và nói xem đó là gì. Vị nó đắng đến tê cả lưỡi.', a: ['Nếm kỹ rồi mới trả lời', 'INT', 4, 'Bạn gọi đúng tên, lại nói thêm rằng lá này hái lúc sau mưa. Bà mỉm cười: đó là điều bà chưa dạy.', 'Bạn đoán sai. Lưỡi bạn tê suốt hai ngày, đủ lâu để nhớ cả đời.', { jobXp: 1 }, { joy: -2 }], b: ['Xin được xem sách trước', 'Bà cho phép, kèm một tiếng thở dài. Bạn trả lời đúng, nhưng lưỡi bạn không học được gì.', { jobXp: 0.5 }] },
        { r: [0], t: 'Một con hươu non lết đến hàng rào vườn thuốc, mép đầy bọt: nó đã ăn phải lá độc.', a: ['Pha thuốc giải theo trí nhớ', 'INT', 5, 'Nó nôn ra, run rẩy, rồi đứng dậy được. Từ đó, cứ đến mùa xuân lại có một con hươu đứng ngoài hàng rào nhìn vào, lớn hơn một chút mỗi năm.', 'Bạn pha chậm mất một khắc. Bạn chôn nó dưới gốc cây cơm cháy.', { joy: 5, jobXp: 1 }, { joy: -4 }], b: ['Chạy đi gọi thầy', 'Bà đến kịp. Bạn đứng nhìn tay bà làm, và ghi nhớ từng động tác.', { jobXp: 0.5 }] },
        { r: [1], t: 'Một quý bà loài người trả rất hậu để bạn bào chế thuốc giữ mãi tuổi xuân. Thứ thuốc ấy không tồn tại.', a: ['Pha cho bà một thứ trà ngủ ngon và nói thật', 'LUCK', 5, 'Bà ngủ trọn đêm đầu tiên sau nhiều năm, và sáng ra trông trẻ hơn thật. Bà cười lớn khi nghe sự thật, rồi đặt thứ trà ấy đến cuối đời.', 'Bà giận dữ vì bị coi thường và rêu rao rằng thuốc Elf chỉ là trò lừa.', { wealth: 5, joy: 3 }, { fame: -2 }], b: ['Từ chối, không bán hy vọng hão', 'Bà sẽ tìm một kẻ khác chịu bán. Nhưng không phải từ vườn của bạn.', { joy: 1 }] },
      ],
    },
    elf_bard: {
      start: [
        'Bạn ngân nga khi hái quả, và cả vạt rừng lặng đi để nghe. Một Bard già bước ra từ sau gốc cây, đặt cây đàn hạc vào tay bạn: “Thử với cái này xem.”',
        'Bạn sửa một chữ trong bài ca cổ mà đám trẻ vẫn hát, vì nó nghe không xuôi. Hóa ra đó là chữ đã bị chép sai suốt ba trăm năm, và Hội Bard muốn gặp bạn.',
      ],
      promo: [
        ['hát trọn một trường ca dài ba canh giờ mà không vấp một chữ.', 'khiến một đám trẻ loài người ngồi yên đến hết bài.'],
        ['viết một bài ca về một người thường, và khiến cả làng người ấy thuộc lòng.', 'chơi đàn trong một đám tang sao cho người ta khóc được rồi nguôi được.'],
        ['đấu thơ ca với một Bard của tộc khác và khiến đối thủ tự xin học bài của mình.', 'tìm lại lời của một bài ca chỉ còn giai điệu.'],
        ['soạn bài ca ghi lại một sự kiện lớn của thời đại, đúng đến mức sử gia phải trích dẫn.', 'dạy một bài ca cho trọn một thế hệ Bard trẻ, và nghe họ hát nó hay hơn mình.'],
      ],
      arcs: [
        ['Bài ca của kẻ thua trận', 'Hội Bard chỉ lưu bài ca của bên thắng. Một cựu binh của bên thua tìm đến bạn trước khi chết, xin được kể.', 'Bạn ngồi bên giường ông nhiều đêm, ghi lại một câu chuyện khác hẳn những gì bạn từng hát.', 'Bài ca mới sẽ làm hoen danh một vị anh hùng mà cả Đại Ngàn tôn kính. Hội Bard khuyên bạn để nó chết theo ông lão.', 'Lễ tưởng niệm trận chiến năm ấy, bạn được mời hát trước tượng vị anh hùng.'],
        ['Khúc ru cho rừng', 'Cây cối ở một vạt rừng thôi không ngủ đông. Chúng sẽ kiệt sức mà chết nếu không ai ru được chúng.', 'Bạn tìm trong thư khố khúc ru cổ, và chỉ thấy một nửa.', 'Nửa còn lại nằm trong trí nhớ của một Bard đã bị trục xuất vì tội phản bội, giờ sống ở Sanctus.', 'Đêm đông chí, bạn đứng giữa vạt rừng mất ngủ, với một bài ca chắp vá.'],
      ],
      quiet: [
        'Bạn dành cả một năm cho một câu hát. Đến mùa thu, bạn bỏ nó và giữ lại đúng hai chữ.',
        'Cây đàn cần lên dây lại. Tiếng của nó đã trầm đi theo năm tháng, và bạn thích nó thế hơn.',
        'Bạn đi qua bảy ngôi làng, đổi bài ca lấy bữa tối. Có một bài mới học được từ một bà giặt đồ.',
        'Một mùa không viết được gì. Bạn nghe mưa và kiên nhẫn chờ.',
      ],
      events: [
        { r: [0, 1], t: 'Buổi diễn đầu tiên của bạn có đúng một khán giả: một ông lão Elf ngủ gật ngay từ câu thứ hai.', a: ['Hát tiếp cho trọn, như thể cả rừng đang nghe', 'LUCK', 4, 'Hết bài, ông lão mở mắt: “Câu thứ tư thừa một nhịp. Còn lại thì được.” Ông là một Bard đã về hưu từ năm trăm năm trước.', 'Ông lão ngáy to hơn tiếng đàn. Bạn hát hết bài cho lũ sóc.', { jobXp: 1, joy: 3 }, { joy: -3 }], b: ['Dừng lại, để ông ngủ', 'Bạn đắp cho ông tấm áo choàng. Một khán giả ngủ ngon cũng là một lời khen, theo cách nào đó.', { joy: 1 }] },
        { r: [0], t: 'Một chàng trai loài người nhờ bạn viết bài ca tỏ tình, và chàng ta hát dở đến mức chim bay hết.', a: ['Viết một bài chỉ cần đọc, không cần hát', 'INT', 4, 'Chàng ta đọc nó dưới cửa sổ người thương, giọng run. Mùa sau, bạn được mời hát ở đám cưới của họ.', 'Chàng ta vẫn cố hát. Cô gái đóng sập cửa sổ.', { joy: 5, wealth: 2 }, { joy: -2 }], b: ['Tự mình hát thay chàng ta từ trong bụi cây', 'Cô gái mê giọng hát ấy, rồi rất thất vọng khi biết sự thật. Chuyện này không kết thúc tốt đẹp.', { wealth: 2, joy: -2 }] },
        { r: [1], t: 'Một lãnh chúa loài người đặt bạn viết bài ca ca ngợi chiến công của ông ta. Bạn biết rõ chiến công ấy là một cuộc thảm sát.', a: ['Viết đúng sự thật bằng lời lẽ nghe như khen', 'INT', 6, 'Ông ta nghe mà mãn nguyện. Ba mươi năm sau, khi ông đã chết, người ta mới hiểu từng câu trong bài, và bài ca thành bản án.', 'Ông ta hiểu ngay từ lần nghe đầu. Bạn rời lâu đài trong đêm, không kịp lấy cây đàn.', { fame: 3, jobXp: 1 }, { wealth: -5, joy: -3 }], b: ['Từ chối đơn đặt hàng', 'Ông ta thuê một Bard khác. Bài ca ấy dở, nhưng vẫn được hát.', { joy: 1 }] },
      ],
    },
    elf_guard: {
      start: [
        'Bạn đứng chắn giữa một con lợn rừng điên và đám trẻ đang hái nấm, với một cành cây trong tay. Con lợn dừng lại. Một Hộ Vệ đã chứng kiến, và hôm sau bạn có một tấm khiên thật.',
        'Cả đêm bão, bạn ôm lấy cây non mới trồng ở quảng trường cho nó khỏi bật gốc. Sáng ra, các Hộ Vệ đi tuần thấy bạn vẫn đứng đó, ướt sũng, và cây thì còn nguyên.',
      ],
      promo: [
        ['đứng gác trọn một ngày đêm ở Cổng Rễ mà không rời mắt khỏi lối vào.', 'giữ thế khiên trước ba đòn công phá của người hướng dẫn.'],
        ['hộ tống một trưởng lão đi sứ sang đất loài người và đưa bà về không một vết xước.', 'canh giữ một mầm cây thiêng qua trọn mùa bão.'],
        ['chỉ huy một tổ gác đẩy lùi đàn ma thú mà không ai rời vị trí.', 'đứng giữa một đám đông giận dữ và cổng thư khố, không rút kiếm, cho đến khi họ giải tán.'],
        ['sắp xếp lại toàn bộ tuyến gác quanh Yggdrasil sau khi phát hiện ra kẽ hở.', 'giữ một vị trí hiểm yếu đủ lâu để cả một ngôi làng kịp lánh vào rừng sâu.'],
      ],
      arcs: [
        ['Kẻ xin vào trong đêm', 'Một người loài người bị thương gục trước Cổng Rễ lúc nửa đêm, xin được vào. Luật cấm mở cổng cho người lạ sau hoàng hôn.', 'Bạn xem vết thương qua khe cổng: đó là vết tên của chính Tuần Lâm Elf.', 'Người ấy mang tin về một cuộc tập kích sắp tới, hoặc là mồi nhử của nó. Đội trưởng của bạn đang ngủ cách đó nửa canh giờ.', 'Có tiếng vó ngựa từ phía xa, và người bị thương bắt đầu tắt thở.'],
        ['Ca gác một trăm năm', 'Một phong ấn cổ dưới rễ Yggdrasil cần một Hộ Vệ canh liên tục suốt một trăm năm. Người canh trước vừa mãn hạn.', 'Bạn xuống hầm rễ, xem căn phòng đá nơi mình có thể sẽ ở lại.', 'Người ta sẵn sàng chia ca cho mười Hộ Vệ thay phiên, nhưng phong ấn yếu đi mỗi lần đổi người.', 'Cánh cửa đá chờ khép lại, và phía trên, ánh nắng vẫn lọt qua kẽ rễ.'],
      ],
      quiet: [
        'Một trăm ca gác nữa trôi qua không có gì để kể. Với một Hộ Vệ, đó là điều tốt nhất có thể kể.',
        'Bạn thuộc từng vết nứt trên Cổng Rễ. Năm nay có thêm một vết mới, nhỏ như sợi tóc.',
        'Tân binh đến rồi thành lính cũ. Bạn vẫn đứng ở vị trí ấy, khiên tựa vào đúng chỗ lõm quen thuộc trên đất.',
        'Bạn đánh bóng bộ giáp vỏ cây. Nó đã ra thêm một vòng vân gỗ kể từ lần trước.',
      ],
      events: [
        { r: [0, 1], t: 'Giữa ca gác, một con sóc tha hạt dẻ đến giấu vào kẽ giáp của bạn, hết hạt này đến hạt khác.', a: ['Đứng yên như cây', 'STR', 4, 'Hết ca, bạn mang theo mười bảy hạt dẻ trong giáp và sự kính trọng của cả đội: không một lần nhúc nhích.', 'Một hạt lọt vào cổ áo. Bạn giật mình, và đội trưởng ghi tên bạn vào sổ.', { jobXp: 1, joy: 4 }, { joy: -2 }], b: ['Khẽ xua nó đi', 'Con sóc chuyển sang giấu hạt vào giáp của Hộ Vệ bên cạnh.', { joy: 1 }] },
        { r: [0], t: 'Một đứa trẻ Elf hỏi bạn đang canh cái gì, khi mà chẳng có ai đến bao giờ.', a: ['Kể cho nó nghe về lần có kẻ đến', 'LUCK', 4, 'Bạn kể chuyện trận vây Cổng Rễ thời ông nội nó. Nó nghe đến quên cả về, và hôm sau dắt theo năm đứa nữa.', 'Bạn kể dở quá. Nó ngáp, bảo canh gác chán thật, rồi bỏ đi.', { joy: 4, fame: 1 }, { joy: -2 }], b: ['Bảo nó đi chỗ khác chơi', 'Nó đi. Câu hỏi thì ở lại với bạn suốt ca gác.', { joy: -2 }] },
        { r: [1], t: 'Một Hộ Vệ trẻ dưới quyền bạn bỏ vị trí để chạy về thăm mẹ ốm, đúng đêm có báo động giả.', a: ['Nhận lỗi quản lý về mình, rồi xử cậu ta sau', 'INT', 5, 'Đội trưởng nhìn bạn rất lâu rồi cho qua. Cậu Hộ Vệ trẻ gác bù một trăm đêm không lời oán, và không bỏ vị trí thêm lần nào.', 'Đội trưởng phạt cả hai. Luật Hộ Vệ không có chỗ cho lòng tốt.', { fame: 1, jobXp: 1 }, { joy: -4 }], b: ['Báo cáo đúng sự việc', 'Cậu ta bị giáng xuống gác bìa rừng. Mẹ cậu ta qua đời khi cậu đang ở đó.', { joy: -4, jobXp: 0.5 }] },
      ],
    },
    elf_wood: {
      start: [
        'Bạn gọt một con chim từ cành gỗ rụng, và nó đẹp đến mức một con chim thật đậu xuống bên cạnh. Người thợ khắc của làng xem rất lâu, rồi hỏi bạn gọt bằng dao gì. Bạn chìa ra một mảnh đá.',
        'Một cây thiêng đổ trong bão, và người ta định chôn gỗ của nó. Bạn xin một mẩu, ôm nó suốt mùa đông, và đến mùa xuân thì biết nó muốn thành hình gì.',
      ],
      promo: [
        ['tạc một cái bát gỗ mỏng đến mức ánh sáng xuyên qua được.', 'ngồi ba ngày trước một khúc gỗ mà không chạm đục, cho đến khi biết nó muốn thành gì.'],
        ['khắc một cánh cửa cho nhà Hội đồng mà không dùng một cái đinh.', 'sửa một pho tượng cổ sao cho không ai chỉ ra được đâu là phần mới.'],
        ['tạc từ gỗ sét đánh một cây đàn mà Bard giỏi nhất chịu dùng.', 'dạy một cây non uốn thành hình chiếc ghế trong ba mươi năm, không cắt một nhát.'],
        ['khắc một bức phù điêu kể trọn một kỷ nguyên, đủ để người không biết chữ cũng đọc được.', 'tạc tượng một trưởng lão sao cho gia đình bà nhận ra cả ánh mắt.'],
      ],
      arcs: [
        ['Khúc gỗ không chịu thành hình', 'Hội đồng giao bạn một khúc gỗ thiêng để tạc tượng người sáng lập. Mọi nhát đục đều trượt.', 'Bạn ngủ bên khúc gỗ nhiều đêm, áp tai vào thớ.', 'Khúc gỗ muốn thành một thứ khác hẳn: một đứa trẻ vô danh. Hội đồng thì đã mời khách khứa cho lễ khánh thành.', 'Tấm vải phủ được kéo xuống trước cả Đại Ngàn.'],
        ['Chiếc quan tài cuối cùng', 'Một bậc thầy khắc gỗ sắp qua đời, xin bạn tạc cho ông chiếc quan tài, và trao cho bạn bộ đục của ông.', 'Bạn chọn gỗ, và ông từ chối mọi khúc gỗ đẹp nhất.', 'Ông muốn một chiếc quan tài thô, xấu, làm từ gỗ của cái cây ông đã đốn nhầm thời trẻ. Học trò ông coi đó là sự sỉ nhục thầy.', 'Ngày tang lễ, chiếc quan tài nằm giữa xưởng, và mọi thợ khắc của Đại Ngàn đều đến xem.'],
      ],
      quiet: [
        'Một bức tượng mất của bạn mười hai năm. Phần lớn thời gian ấy là để ngồi nhìn.',
        'Bạn mài bộ đục vào mỗi sáng. Đá mài đã mòn lõm thành hình bàn tay bạn.',
        'Vỏ bào trong xưởng dày đến mắt cá. Lũ chim sẻ đến tha về làm tổ.',
        'Bạn chờ một khúc gỗ khô hẳn. Việc ấy mất bảy năm, và không thể làm nhanh hơn.',
      ],
      events: [
        { r: [0, 1], t: 'Nhát đục của bạn trượt đi, để lại một vết sâu trên mặt pho tượng gần xong của thầy.', a: ['Thú nhận ngay và xin sửa', 'AGI', 4, 'Thầy bảo bạn tự nghĩ cách. Bạn biến vết đục thành một nếp nhăn nơi khóe mắt, và pho tượng bỗng như đang cười.', 'Bạn cố sửa và làm vết đục rộng thêm. Thầy lặng lẽ bắt đầu lại từ một khúc gỗ khác.', { jobXp: 1 }, { joy: -5 }], b: ['Lấy sáp trám lại, mong thầy không thấy', 'Thầy thấy ngay. Ông không nói gì, chỉ gỡ miếng sáp ra đặt lên bàn bạn.', { joy: -4 }] },
        { r: [0], t: 'Một bé gái loài người mang đến con ngựa gỗ gãy chân, hỏi “thợ thần tiên” có chữa được không.', a: ['Chữa, và khắc thêm cho nó một cái bờm', 'AGI', 3, 'Con ngựa giờ có bờm bay như đang phi. Cô bé giữ nó đến lúc thành bà, rồi trao lại cho cháu.', 'Gỗ của loài người giòn hơn bạn tưởng: cái chân thứ hai cũng gãy nốt.', { joy: 6 }, { joy: -3 }], b: ['Tạc cho cô bé một con mới', 'Con ngựa mới đẹp hơn nhiều. Cô bé cảm ơn, nhưng vẫn ôm khư khư con cũ.', { joy: 2 }] },
        { r: [1], t: 'Một thương nhân trả giá rất cao để mua tác phẩm bạn còn đang làm dở, và muốn lấy ngay.', a: ['Bảo ông ta quay lại sau mười năm', 'LUCK', 5, 'Ông ta cười, tưởng bạn đùa. Mười năm sau, con trai ông ta đến lấy, và trả gấp đôi vì đã nghe cha kể suốt mười năm.', 'Ông ta mua của một thợ khác. Mười năm sau, không ai đến.', { wealth: 8, fame: 1 }, { joy: -2 }], b: ['Bán luôn', 'Túi vàng nặng. Tác phẩm rời xưởng khi còn thiếu một nhát đục, và chỉ mình bạn biết.', { wealth: 5, joy: -3 }] },
      ],
    },
    elf_envoy: {
      start: [
        'Hai đứa trẻ cãi nhau về một tổ chim, và bạn phân xử sao cho cả hai cùng hài lòng mà tổ chim vẫn ở trên cây. Một Sứ giả đi ngang ghi tên bạn vào sổ tay.',
        'Bạn là Elf duy nhất trong làng chịu ngồi nghe trọn câu chuyện dài dòng của một lái buôn loài người. Hóa ra trong chuyện có tin về một cuộc chiến sắp nổ, và Hội đồng muốn biết ai đã nghe ra nó.',
      ],
      promo: [
        ['học thuộc cách chào của bảy tộc và không nhầm một lần trong buổi tiếp tân.', 'ngồi trọn một bữa tiệc Dwarf mà vẫn tỉnh táo để nhớ mọi điều được nói.'],
        ['mang một lời xin lỗi của Hội đồng đến một làng loài người và khiến họ chấp nhận.', 'dịch một bức thư đầy xúc phạm thành lời lẽ đủ để giữ hòa khí mà không nói sai sự thật.'],
        ['ngồi giữa hai phái đoàn thù địch suốt mười ngày cho đến khi họ chịu ký.', 'thuyết phục một lãnh chúa rút quân khỏi bìa rừng mà không hứa điều gì Đại Ngàn không thể cho.'],
        ['soạn một hiệp ước vẫn còn hiệu lực sau khi mọi người ký nó đã qua đời.', 'đứng ra nói thay cho một tộc nhỏ không có tiếng nói tại hội nghị các vương quốc.'],
      ],
      arcs: [
        ['Món quà bị trả lại', 'Món quà ngoại giao của Đại Ngàn gửi một vị vua loài người bị trả về, vỡ nát. Hội đồng coi đó là lời tuyên chiến.', 'Bạn đến triều đình ấy trước khi quân lệnh kịp ban ra.', 'Món quà vỡ do người đưa thư của chính Đại Ngàn làm rơi và giấu lỗi. Nhà vua thì chưa từng nhận được gì và đang giận vì bị ngó lơ.', 'Bạn đứng giữa ngai vàng và cánh cửa, với một sự thật làm mất mặt phía mình.'],
        ['Hòa ước của người sắp chết', 'Một vị vua loài người già yếu muốn ký hòa ước với Đại Ngàn trước khi chết. Thái tử của ông thì muốn chiến tranh.', 'Bạn thương thảo từng điều khoản bên giường bệnh, biết rằng mỗi ngày đều có thể là ngày cuối.', 'Thái tử đề nghị riêng: kéo dài cuộc đàm phán cho đến khi cha hắn chết, đổi lại hắn sẽ để yên một phần rừng.', 'Nhà vua cầm bút bằng bàn tay run rẩy, và thái tử đứng ngay sau ghế.'],
      ],
      quiet: [
        'Bạn dành mười năm ở một triều đình loài người. Khi bạn về, vị vua bạn quen đã thành ông của vị vua đang trị vì.',
        'Bạn học thêm một ngôn ngữ, chủ yếu để hiểu những lời chửi thề trong các cuộc đàm phán.',
        'Những bức thư đi và về chậm chạp qua các mùa. Bạn trả lời từng bức bằng nét chữ không vội.',
        'Một thập kỷ yên ả. Hiệp ước bạn soạn vẫn đứng vững, và không ai còn nhớ ai đã soạn nó.',
      ],
      events: [
        { r: [0, 1], t: 'Trong bữa tiệc ngoại giao đầu tiên, chủ nhà Dwarf đặt trước mặt bạn một vại bia to bằng đầu bạn và chờ.', a: ['Uống cạn, không chớp mắt', 'STR', 4, 'Bạn úp vại xuống bàn. Cả sảnh gầm lên tán thưởng, và từ đó các Dwarf nói chuyện với bạn như với người nhà.', 'Bạn tỉnh dậy dưới gầm bàn. Các Dwarf vẫn quý bạn, nhưng theo kiểu khác.', { fame: 2, jobXp: 1 }, { health: -4, joy: -1 }], b: ['Nhấp một ngụm cho phải phép', 'Chủ nhà hơi phật ý. Các Dwarf ghi nhận rằng Elf vẫn là Elf.', { jobXp: 0.5 }] },
        { r: [0], t: 'Vị Sứ giả bạn theo hầu lỡ lời gọi sai tên phu nhân của lãnh chúa, và cả bàn tiệc chết lặng.', a: ['Đánh đổ ly rượu của mình thật ồn ào', 'AGI', 4, 'Mọi ánh mắt đổ về phía bạn và tấm khăn trải bàn ướt sũng. Khi người hầu lau xong, không ai còn nhớ chuyện cái tên. Vị Sứ giả khẽ gật đầu với bạn.', 'Rượu bắn thẳng lên áo phu nhân. Giờ thì có hai sự cố.', { jobXp: 1, joy: 3 }, { fame: -2 }], b: ['Ngồi im, không phải việc của kẻ theo hầu', 'Sự im lặng kéo dài rất lâu. Vị Sứ giả tự gỡ được, nhưng mất nhiều công.', { joy: -2 }] },
        { r: [1], t: 'Một quan chức loài người dúi vào tay bạn một túi ngọc, “chỉ là quà gặp mặt”, ngay trước buổi đàm phán.', a: ['Nhận trước mặt mọi người, rồi sung vào quà của Đại Ngàn tặng nhà vua', 'INT', 5, 'Túi ngọc được trao lên ngai vàng kèm lời cảm ơn vị quan “đã góp phần”. Ông ta tái mặt, và suốt buổi đàm phán không dám hé răng.', 'Bạn xử lý không khéo, và tin đồn Sứ giả Elf nhận hối lộ lan nhanh hơn mọi lời giải thích.', { fame: 3, jobXp: 1 }, { fame: -3 }], b: ['Trả lại ngay, nhẹ nhàng', 'Ông ta cất túi ngọc và mỉm cười. Hai bên hiểu nhau thêm một chút, theo nghĩa không hay lắm.', { jobXp: 0.5 }] },
      ],
    },
  },
};
