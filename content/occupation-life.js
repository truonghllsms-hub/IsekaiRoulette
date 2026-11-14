// Occupational scenes and first commissions. World crises remain possible, but a profession
// does not silently become a mine worker, sword fighter or subordinate employee in another trade.
const C = (label, text, effects = {}) => ({label,text,effects});
const K = (label, stat, target, good, bad, gain = {}, loss = {joy:-3}) => ({label,check:{stat,target},success:{text:good,effects:gain},fail:{text:bad,effects:loss}});
const priest = [
 ['name_book',0,1,'Người thư lại giao bạn chép sổ rửa tội. Một bà mẹ không biết chữ chỉ vào dòng tên con mình bị ghi sai và sợ đứa trẻ sẽ không được nhận.',C('Đọc lại từng tên cho gia đình xác nhận','Bạn chép chậm hơn những người khác. Cuối buổi, không ai phải mang về một cái tên không thuộc về con mình.',{jobXp:1,joy:3}),C('Sửa tên trước mặt bà, nhờ người giữ sổ cùng ký','Bà gấp tờ chứng nhận vào khăn sạch. Chữ ký thứ hai khiến lần sửa này không bị xóa mất.',{joy:2})],
 ['empty_bench',0,4,'Một người từng đến nhà nguyện mỗi sáng không xuất hiện suốt tuần. Người giữ cửa nói ông không còn tiền dâng lễ nên ngại đến.',C('Mang bữa ăn tới và mời ông về, không nhắc chuyện tiền','Ông ngồi ở chiếc ghế cũ vào sáng hôm sau. Bạn nhận ra việc giữ cửa mở cũng cần có người làm.',{wealth:-2,joy:4}),C('Công bố rằng dự lễ không cần dâng tiền','Người giữ hòm công đức không vui. Hàng ghế cuối đầy hơn từ buổi lễ kế tiếp.',{fame:2,joy:3})],
 ['night_bell',0,1,'Nửa đêm có người đập cửa nhà nguyện. Một bà đỡ mang theo đứa trẻ tím tái; tu sĩ trưởng đang ở giáo xứ bên kia sông.',K('Giữ ấm, khai thông hơi thở rồi mới cầu nguyện','INT',4,'Đứa trẻ bật khóc. Bạn ngồi bệt xuống nền đá, lần đầu thấy tiếng khóc đáng mừng đến vậy.','Đứa trẻ chưa tỉnh. Bạn đánh chuông gọi người lớn đến giúp, thay vì cố một phép mình chưa hiểu.',{joy:6,jobXp:1}),C('Đánh chuông gọi bà đỡ và người có kinh nghiệm','Bạn giữ đèn cho bà đỡ làm việc. Tên bạn không được nhắc trong lời cảm ơn, nhưng đứa trẻ sống.',{joy:3})],
 ['confession',0,2,'Một người làm bánh thú nhận đã trộn bột hỏng vào bánh phát cho dân nghèo. Ông xin bạn giữ kín, rồi đặt tiền lên bàn.',C('Giữ kín tên ông, buộc ông thu hồi bánh và báo người bệnh','Bạn đi từng nhà cùng ông. Lời xưng tội được giữ, còn những người đã ăn bánh được chữa kịp.',{joy:3,fame:2}),C('Trả tiền lại, nhờ tu sĩ trưởng giám sát việc bồi hoàn','Ông phải bán chiếc xe chở bánh để mua thuốc. Từ đó, ông không nhìn bạn khi dự lễ.',{joy:-1,jobXp:1})],
 ['bread',0,3,'Kho bánh phát chẩn chỉ đủ một nửa hàng người trước cửa. Viên quản kho muốn ưu tiên những nhà đóng góp nhiều nhất.',C('Chia phần nhỏ hơn, ưu tiên trẻ nhỏ và người yếu','Nhiều người ra về vẫn đói. Ít nhất không ai phải nhìn người khác ôm cả giỏ bánh đi qua.',{joy:2,fame:2}),K('Đi xin thêm lương thực từ các cửa hiệu','LUCK',5,'Ba chủ tiệm đem tới cả những ổ bánh chưa kịp nguội. Bạn nhớ tên họ để trả ơn bằng công việc.','Bạn chỉ xin được ít cám. Bạn ở lại nấu cháo đến khi người cuối cùng nhận được bát.',{joy:5,jobXp:1},{wealth:-3})],
 ['witness',1,3,'Người trông nghĩa địa muốn bạn ký rằng một người vô gia cư chết vì dịch. Bạn khám thi thể và thấy dấu trói ở cổ tay.',C('Ghi đúng những gì mình thấy và giữ một bản sao','Người trông nghĩa địa không còn chào bạn. Gia đình người chết có một tờ giấy để bắt đầu đòi công lý.',{fame:3,jobXp:1}),C('Mời một tu sĩ khác cùng kiểm tra trước khi ký','Hai chữ ký đặt cạnh nhau. Bạn không phải gánh lời khai một mình.',{joy:2})],
 ['well',1,3,'Dân làng xin bạn trừ quỷ trong giếng. Người múc nước đầu tiên nôn ra máu, nhưng quanh miệng giếng không có dấu tà thuật.',K('Kiểm tra nguồn nước trước khi làm lễ','INT',5,'Bạn tìm thấy xác thú mắc trong mạch ngầm. Làm sạch giếng cứu được nhiều người hơn bài trừ tà hôm ấy.','Bạn không tìm ra nguồn bẩn. Bạn cho ngừng dùng giếng và dẫn dân đến nguồn khác trong khi chờ người chữa bệnh.',{fame:3,jobXp:1},{wealth:-4}),C('Tổ chức chở nước sạch và mời thầy thuốc','Tiếng đồn quỷ ám chưa hết. Số người đổ bệnh thì dừng lại.',{wealth:-4,joy:4})],
 ['refuge',1,4,'Lính tuần yêu cầu nhà nguyện giao một gia đình tị nạn không có giấy thông hành. Người mẹ đang sốt, hai đứa trẻ nấp dưới ghế.',C('Viện luật nơi trú ẩn, xin thời hạn chữa bệnh','Bạn ghi tên người phụ trách lính tuần vào sổ tiếp nhận. Họ đồng ý chờ, khó chịu vì lần này có bằng chứng.',{fame:2,joy:3}),K('Đứng ra bảo lãnh và hoàn tất giấy tờ cho họ','INT',6,'Bạn đi hết ba cửa công đường. Gia đình ấy rời nhà nguyện bằng cửa chính.','Đơn bị trả lại. Bạn vẫn nuôi họ trong nhà nguyện thêm một tuần, bằng phần ăn của mình.',{jobXp:1,joy:5},{wealth:-6,joy:-2})],
 ['vigil',0,4,'Một người hấp hối hỏi bạn có chắc bên kia cái chết là ánh sáng. Lần đầu tiên bạn không tìm thấy câu trả lời trong kinh sách.',C('Nói rằng mình không biết chắc, nhưng sẽ ở lại','Người ấy nắm tay bạn đến cuối. Gia đình không hỏi bạn đã đọc bài kinh nào.',{joy:3,INT:1}),C('Đọc bài kinh người ấy từng thuộc thuở nhỏ','Môi họ mấp máy theo bạn được hai câu. Bạn đọc chậm lại.',{joy:2})],
 ['pilgrims',2,4,'Đoàn hành hương xin bạn chữa cho từng người trước khi lên đường. Một thương nhân đề nghị bán nước đã được bạn ban phước với giá gấp mười.',C('Tách lời cầu nguyện khỏi việc bán thuốc','Bạn cho kiểm tra từng bình nước, viết rõ thứ nào chỉ là nước sạch. Nhà nguyện mất một khoản dâng cúng lớn.',{wealth:-5,fame:3}),C('Tổ chức khám miễn phí, nhờ thầy thuốc đứng cùng','Hàng người đi chậm hơn. Những ca cần thuốc thật không còn bị đẩy lên đường với một bình nước.',{jobXp:1,joy:4})],
 ['accounts',3,4,'Bạn đã có quyền coi sổ giáo xứ. Khoản tiền ghi là sửa mái nhà nguyện lại xuất hiện trong sổ tiệc của một vị chức sắc.',C('Đối chiếu biên nhận trước hội đồng giáo xứ','Cuộc họp kéo dài đến sáng. Mái nhà được sửa, còn chỗ ngồi cạnh bạn trong những bữa tiệc để trống.',{fame:4,joy:-1}),K('Buộc người giữ sổ hoàn trả trước khi công bố','INT',8,'Tiền về đủ. Bạn giao sổ cho hai người cùng giữ, để lời hứa không thay thế được việc kiểm tra.','Ông ta giấu mất chứng từ. Bạn phải dùng bản sao để đưa vụ việc ra hội đồng.',{jobXp:2,fame:3},{joy:-4})],
 ['apprentice',3,4,'Một học việc làm phép chữa lành quá sức rồi ngã quỵ. Người quản lễ bảo hãy cho cậu lên bục để dân chúng thấy giáo xứ có phép màu.',C('Cho học việc nghỉ, tự giải thích với dân chúng','Không có phép màu hôm ấy. Có một người trẻ còn đủ sức học tiếp vào ngày mai.',{joy:4,jobXp:1}),C('Đổi buổi biểu diễn thành buổi dạy sơ cứu','Dân chúng tập băng bó cho nhau bằng những dải vải cũ. Người quản lễ thất vọng, bà đỡ thì vui.',{fame:3,joy:3})],
 ['war_infirmary',1,4,'Thương binh của hai phía được đưa tới cùng sân nhà nguyện. Viên đội trưởng muốn đuổi tù binh ra để dành chỗ cho lính mình.',C('Xếp người theo mức nguy kịch, không theo cờ áo','Bạn yêu cầu mọi vũ khí để ngoài cửa. Viên đội trưởng ở lại khiêng cáng, miễn cưỡng nhưng không cản nữa.',{fame:3,joy:3}),K('Dựng thêm trạm cứu thương và chia người chăm sóc','INT',7,'Cả hai sân đều có đèn. Đêm ấy bạn đọc ít kinh hơn, thay nhiều băng hơn.','Trạm mới thiếu vải sạch. Bạn cắt áo lễ thành băng trước mắt những người đang chờ.',{jobXp:2,joy:4},{wealth:-6,joy:-2})],
 ['retreat',2,4,'Một người từng được bạn cứu đến xin phép bỏ dòng tu. Người quản lễ gọi đó là vô ơn và muốn giữ lại giấy thông hành của anh.',C('Trả giấy, hỏi anh muốn sống thế nào','Anh muốn về chăm mẹ. Bạn viết thư giới thiệu việc làm, không viết lời buộc tội.',{joy:4}),C('Mời anh ở thêm một đêm để nói chuyện cho trọn','Sáng hôm sau anh vẫn đi. Lần này, mọi người tiễn anh bằng một bữa cơm.',{joy:3})],
];
const other = [
 ['human_farmer','water_turn','Con mương đầu xóm cạn. Nhà đầu nguồn chặn nước tưới rau, còn ruộng lúa phía dưới bắt đầu nứt.',C('Lập lượt mở cống, đứng ra giữ đúng giờ','Bạn có mặt ở cống lúc nửa đêm. Sau ba lượt, người đầu xóm giao chìa khóa cho người cuối xóm giữ.',{joy:3,jobXp:1}),C('Đào mương phụ cùng các nhà cuối dòng','Một tuần cuốc đất đổi lấy một dòng nước không phải đi xin.',{wealth:-4,jobXp:1})],
 ['human_farmer','seed_debt','Người hàng xóm xin vay giống, nhưng mùa trước anh chưa trả. Con anh đứng sau lưng, ôm chiếc bao rỗng.',C('Cho vay giống, hẹn trả bằng công gặt','Anh đến ruộng bạn từ tờ mờ sáng ngày gặt. Đứa trẻ đem theo cơm.',{wealth:-3,joy:4}),C('Cùng anh gieo trên một khoảnh ruộng chung','Hai nhà ghi phần góp lên thanh tre. Mùa tới sẽ có chuyện để cùng chờ.',{jobXp:1,joy:2})],
 ['human_smith','cart_axle','Một người chở lương thực đến xưởng với trục xe gãy. Ông chỉ đủ tiền trả vật liệu, còn gạo phải tới làng trước đêm.',C('Sửa lấy công bằng một bao gạo nhỏ','Xe lăn khỏi xưởng khi mặt trời xuống. Tuần sau, cả làng biết chỗ tìm bạn.',{fame:2,jobXp:1}),K('Làm mối nối tạm, chỉ rõ quãng đường được đi','INT',5,'Bạn đánh dấu chỗ nối bằng sơn đỏ và viết giấy dặn người thợ ở trạm kế.','Mối nối chưa chắc. Bạn giữ xe lại, nhờ người đổi chuyến hàng thay vì liều cho đi.',{jobXp:1},{wealth:-3})],
 ['human_smith','old_tool','Một người thợ già đem chiếc kéo cắt vải đã dùng bốn mươi năm tới xưởng. Lưỡi kéo mòn quá, nhưng ông không muốn thay.',C('Rèn lại lưỡi, giữ nguyên tay cầm','Ông nhận ra vết lõm ngón tay trên cán và thở phào. Bạn không khắc tên mình lên món sửa ấy.',{joy:3,jobXp:1}),C('Làm một chiếc mới, giữ chiếc cũ làm mẫu','Ông tập với chiếc mới cả buổi trong xưởng bạn, rồi mang cả hai về.',{wealth:-2,joy:2})],
 ['human_merchant','false_weight','Người phụ quầy chỉnh quả cân để mỗi lượt bớt đi một ít hàng. Cuối ngày số tiền lẻ đủ trả tiền thuê kho.',C('Trả phần thiếu và cho cân lại trước khách','Hàng người chờ dài thêm. Người phụ quầy phải đứng giải thích cùng bạn.',{wealth:-5,fame:3}),C('Thay cân, mở sổ cho khách kiểm tra','Khách khó tính quay lại đầu tiên. Lần này bà đem theo người hàng xóm.',{jobXp:1,joy:2})],
 ['human_merchant','late_invoice','Một đoàn xe mắc ở bến lũ. Khách giữ bản giao kèo có phạt trễ, còn người đánh xe xin bạn đừng bắt họ liều qua sông.',C('Báo trễ và nhận khoản phạt','Xe về ba ngày sau, người còn đủ. Bạn sửa điều khoản mùa lũ trong hợp đồng kế tiếp.',{wealth:-6,joy:3}),K('Tìm kho gần bến, đổi hàng với bạn buôn địa phương','INT',6,'Khách nhận hàng đúng hẹn. Đoàn xe ở lại bến cho tới khi nước rút.','Kho gần bến đã hết hàng. Bạn quay lại nhận phạt thay vì đổ lỗi cho người đánh xe.',{wealth:5,jobXp:1},{wealth:-6})],
 ['human_scholar','wrong_map','Người đưa thư trở về chỉ vào bản đồ bạn chép: cây cầu đánh dấu trên đó đã sập từ mùa trước.',C('Sửa mọi bản sao, ghi ngày kiểm chứng','Bạn đi từng cửa hiệu sách. Một lỗi nhỏ được sửa trước khi thành một đoàn người đi lạc.',{wealth:-3,jobXp:1}),C('Mời người đưa thư cùng biên soạn lại tuyến đường','Tên người đưa thư được in cạnh tên bạn. Ông đọc nó rất lâu.',{fame:2,joy:3})],
 ['human_scholar','missing_credit','Một học trò đưa bạn bản thảo. Phát hiện quan trọng nhất của cậu đã nằm trong bài giảng của người hướng dẫn, không có tên cậu.',C('Giữ bản thảo gốc và yêu cầu ghi nguồn','Cuộc tranh luận không vui vẻ. Trong bản in mới, tên học trò xuất hiện ở trang đầu.',{fame:2,jobXp:1}),C('Giúp học trò công bố bằng chứng độc lập','Cậu tự đứng trình bày lần đầu, run giọng nhưng không phải mượn tên ai.',{joy:4})],
 ['human_bard','funeral_song','Gia đình một người gác cổng nhờ bạn hát trong tang lễ. Bài chiến ca quen thuộc không có câu nào nói về người mở cửa lúc trời chưa sáng.',C('Viết bài hát từ lời kể của gia đình','Bạn hát về chùm chìa khóa và đôi giày luôn ướt. Họ nhận ra người thân trong từng câu.',{joy:4,jobXp:1}),C('Mời những người từng được ông giúp cùng hát','Nhiều người hát sai nhịp. Không ai muốn dừng lại giữa bài.',{fame:2,joy:3})],
 ['human_tamer','animal_refusal','Con thú lâu năm của bạn không chịu vào chuồng biểu diễn. Nó đứng chắn trước một con non vừa bị tách mẹ.',C('Dừng buổi diễn, đưa mẹ con nó về cùng nhau','Khán giả đòi lại tiền. Con thú già chịu bước theo bạn khi con non đã đi cạnh mẹ.',{wealth:-4,joy:4,jobXp:1}),C('Đổi buổi diễn thành buổi chăm sóc thú non','Lũ trẻ tập đặt bát nước xuống thật chậm. Lần này, không con thú nào phải nhảy qua vòng lửa.',{joy:3})],
 ['elf_herb','shared_remedy','Một người hái thuốc Human xin công thức hạ sốt. Trưởng vườn không muốn một bài thuốc của Đại Ngàn rơi ra ngoài rừng.',C('Chia cách dùng an toàn, giữ lại phần chưa kiểm chứng','Người ấy chép cả điều cấm kỵ trước khi chép liều thuốc. Đó là học trò đầu tiên không có tai nhọn của vườn.',{joy:4,jobXp:1}),C('Đi cùng họ chữa một mùa bệnh rồi mới quyết định','Bạn thấy họ sửa liều theo tuổi bệnh nhân, không theo lời đồn. Niềm tin tới chậm, nhưng có căn cứ.',{fame:2,jobXp:1})],
 ['elf_envoy','translation','Bản hòa ước dịch sang tiếng Human bỏ mất một từ chỉ nghĩa vụ bảo vệ nguồn nước. Sứ giả bên kia đã sắp đặt ấn.',C('Dừng ký, giải thích khác biệt trước cả hai bên','Buổi lễ hoãn đến chiều. Lần ký thứ hai ít hoa hơn và rõ nghĩa hơn.',{jobXp:1,fame:2}),C('Thêm bản đồ nguồn nước và phụ lục có chữ ký chung','Từ khó được biến thành dòng suối có tên trên giấy. Hai bên có thứ cụ thể để giữ lời.',{joy:3})],
 ['dwarf_runesmith','door_rune','Một gia đình mang phiến rune cửa hỏng tới xưởng. Người cha muốn tăng sức khóa, người con gái nói cửa từng nhốt cô bên trong khi cháy.',C('Khắc cơ chế mở từ trong trước khi tăng sức khóa','Bạn thử nó bằng tay không. Người con gái là người đầu tiên mở cánh cửa đã sửa.',{jobXp:1,joy:4}),C('Đổi sang rune báo động, không trói người trong nhà','Ổ khóa bớt mạnh, tiếng báo vang hơn. Cả gia đình cùng học cách tắt nó.',{fame:2})],
 ['demon_bu','missing_name','Trong sổ cấp lương của Quân đoàn có tên một lính đã chết. Phần lương ấy vẫn được lĩnh; ở trang sau là đơn xin trợ cấp của mẹ hắn bị từ chối.',C('Đối chiếu người lĩnh tiền và chuyển khoản trợ cấp đúng tên','Bạn có thêm một kẻ ghét trong nha môn. Bà mẹ có tiền mua thuốc, không biết ai đã sửa sổ.',{jobXp:1,joy:3}),K('Đưa bằng chứng qua hai cấp ký để không ai xóa được','INT',6,'Dấu niêm phong thứ hai khiến người giữ kho không thể giả vờ chưa thấy.','Đơn bị giữ lại. Bạn chép thêm một bản trước khi ra khỏi phòng.',{fame:3,jobXp:1},{joy:-3})],
 ['bm_shaman','silent_spirit','Một gia đình đem đứa trẻ không nói được đến, đòi bạn đuổi linh dữ. Đứa trẻ chăm chú nhìn môi người mẹ thay vì nghe tiếng gọi.',C('Kiểm tra thính giác trước khi làm lễ','Bạn gõ trống sau lưng rồi trước mặt nó. Cả nhà hiểu ra, và bắt đầu học những dấu tay đầu tiên.',{jobXp:1,joy:4}),C('Mời người chữa bệnh, ở lại giúp gia đình giao tiếp','Bạn đặt chiếc trống xuống nền để đứa trẻ cảm nhận nhịp. Nó mỉm cười mà không cần nghe.',{joy:3})],
];

// These are authored occupational claims, not keywords guessed from a mention of war or a weapon.
const WORK_FAMILIES = {
 human_work_accident:['miner'], human_work_overtime:['smith','merchant','administrator'], human_work_found_gem:['smith','merchant'], human_work_sabotage:['smith','farmer','tamer'],
 human_work_strike:['smith','miner'], human_work_promotion:['administrator'], human_work_retirement:['smith','miner'],
 bm_work_boss_exploit:['smith'], bm_work_windfall:['smith','merchant'], bm_work_rival_sabotage:['smith','merchant'], bm_work_strike:['smith'],
 bm_work_ally_help:['smith','merchant','courier'],
 elf_work_strike:['farmer','priest'], elf_work_accident:['smith'], elf_work_masterpiece:['smith'],
 dwarf_work_1:['smith','miner','merchant'], dwarf_work_2:['smith'], dwarf_work_3:['smith'], dwarf_work_4:['smith'], dwarf_work_5:['smith','miner'],
 demon_work_cheat:['smith'], demon_work_treasure:['miner'], demon_work_accident:['miner'], demon_work_fired:['smith','miner'],
};
function install(data) {
 for(const [id,families] of Object.entries(WORK_FAMILIES)){
  const e=data.events.find(e=>e.id===id);if(!e)continue;
  const jobs=data.jobs.filter(j=>families.includes(j.family)&&j.races?.some(r=>e.races.includes(r))).map(j=>j.id);
  e.require={...e.require,any:[{job:'none'},...(jobs.length?[{job:jobs}]:[])]};
 }
 const exact={dwarf_work_1:['dwarf_miner','dwarf_merchant','dwarf_runesmith'],dwarf_work_2:['dwarf_runesmith','dwarf_eng'],dwarf_work_3:['dwarf_carver','dwarf_runesmith'],dwarf_work_4:['dwarf_runesmith','dwarf_eng'],dwarf_work_5:['dwarf_miner','dwarf_runesmith','dwarf_eng','dwarf_carver']};
 for(const [id,jobs]of Object.entries(exact)){const e=data.events.find(e=>e.id===id);if(e)e.require.any=[{job:'none'},{job:jobs}];}
 for(const id of ['human_work_overtime','human_work_promotion','human_work_retirement','bm_work_boss_exploit','bm_work_windfall','demon_work_fired']){
  const e=data.events.find(e=>e.id===id);if(e?.require?.any?.[1])e.require.any[1].jobRankMax=1;
 }
 const forge=data.events.find(e=>e.id==='demon_work_cheat');if(forge)forge.text=forge.text.replace('Sau một tháng lột da hàng ngàn con sói địa ngục','Sau một tháng phân loại phế liệu và nhóm lò rèn');
 // Hand-gathering sap and tending herbs are trades, not what every Elf does for a living.
 const herb=data.events.find(e=>e.id==='elf_work_strike');if(herb)herb.require.any=[{job:'none'},{job:'elf_herb'}];
 const sap=data.events.find(e=>e.id==='elf_work_accident');if(sap)sap.require.any=[{job:'none'},{job:'elf_wood'}];
 for(const [key,min,max,text,a,b] of priest){
  data.events.push({id:`occupation_priest_${key}`,_file:'occupation-life',pack:true,races:['human'],weight:28,stages:['teen','adult','middle','elder'],require:{job:'human_priest',free:true,jobRank:min,jobRankMax:max},text,choices:[a,b],...(key==='war_infirmary'?{eras:['holy_war','demon_lord']}:{} )});
 }
 for(const [job,key,text,a,b]of other){const j=data.jobs.find(j=>j.id===job);data.events.push({id:`occupation_${job}_${key}`,_file:'occupation-life',pack:true,races:j.races,weight:25,stages:['teen','adult','middle','elder','ancient'],require:{job,free:true},text,choices:[a,b]});}
 installCommissions(data);
 installSupport(data);
}

function installCommissions(data){
 const places={human:['Sanctus','nhà nguyện khu Nam','trạm Dawnbreak','bà đỡ'],beastman:['Thảo Nguyên','lều chữa thương','cột tin của bộ lạc','người giữ dược thảo'],elf:['Đại Ngàn','vườn thuốc bìa rừng','trạm Dawnbreak dưới tán cây','người hái thuốc'],dwarf:['Dãy Núi Răng Cưa','trạm nghỉ ở Cổng Sắt','bàn ghi việc của phường','người giữ kho']};
 for(const [race,[place,clinic,board,keeper]]of Object.entries(places)){
  const org=data.orgs.find(o=>o.races?.includes(race)&&!o.auto);if(!org)continue;
  const jobs=data.jobs.filter(j=>j.races?.includes(race)&&j.combat===false),all=jobs.map(j=>j.id);
  const medical=jobs.filter(j=>['priest','shaman'].includes(j.family)||j.id==='elf_herb').map(j=>j.id);
  const craft=jobs.filter(j=>['smith','miner'].includes(j.family)).map(j=>j.id);
  const record=jobs.filter(j=>['scholar','administrator','merchant','bard'].includes(j.family)||/envoy/.test(j.id)).map(j=>j.id);
  const entries=[
   ['supplies','Chuyến tiếp tế đầu tiên',all,`Một xe băng sạch và lương khô đang đợi ở ${board}. ${keeper} cần người kiểm hàng rồi đưa đến ${clinic}, không phải đi săn quái.`,
    `Tại ${place}, phiếu ghi mười hai túi nhưng trên xe chỉ có mười một.`,C('Kiểm lại với người giao, ghi rõ phần còn thiếu','Người giao tìm thấy túi cuối còn ở dưới ghế. Cả hai ký lại phiếu.',{joy:1}),
    `Đến ${clinic}, trời đã tối. Người trực muốn ký nhận ngay mà chưa đếm hàng.`,C('Cùng người trực đếm rồi mới ký','Từng túi được đặt lên kệ. Bạn trở về với biên nhận đủ tên người giao lẫn người nhận.',{joy:2})],
   ['aid','Một ca trực ở trạm cứu thương',medical,`${clinic} thiếu người. Hội cần một người biết chăm sóc bệnh nhân tới giúp ${keeper} trong một ca trực.`,
    'Một người bị thương muốn được chữa trước vì có nhiều tiền; bên cạnh là người đang khó thở.',C('Ưu tiên người khó thở, nhờ người còn khỏe giữ đèn','Bạn làm rõ thứ tự ngay từ đầu. Không ai được mua chỗ trước người nguy kịch.',{joy:2}),
    'Cuối ca, người bệnh xin mang thuốc về nhưng không biết đọc tờ hướng dẫn.',C('Đánh dấu liều bằng vạch và nhờ họ làm lại trước mặt mình','Họ làm đúng từng bước. Lần này lời dặn đã tới người cần nó.',{joy:3})],
   ['repair','Đèn ở lối sơ tán',craft,`Đèn tại lối ra ${clinic} đã hỏng. ${board} treo giấy nhờ một người thợ sửa trước mùa mưa.`,
    'Một giá đèn gãy vì ốc bị rỉ. Chủ trạm đề nghị buộc tạm cho xong.',C('Thay chốt chịu lực trước khi lắp đèn','Giá đèn đứng vững khi người trực thử kéo xuống. Bạn giữ lại chốt rỉ để họ thấy nguyên nhân.',{joy:1}),
    'Đèn sáng trở lại, nhưng công tắc ở quá cao với trẻ nhỏ.',C('Hạ dây kéo, thử cả khi trời tối','Người trực tự mở được lối ra khi bạn che hết đèn ngoài. Việc sửa được bàn giao sau lần thử ấy.',{joy:2})],
   ['record','Tờ biên nhận thất lạc',record,`Một người chở thuốc ở ${place} bị giữ tiền vì mất biên nhận. Hội nhờ bạn đối chiếu sổ tại ${clinic}.`,
    'Sổ kho đã ghi nhận hàng, nhưng tên người giao viết sai một chữ.',C('Đối chiếu giờ giao và chữ ký người trực','Hai sổ ghi cùng một giờ. Bạn khoanh chỗ sai và nhờ người trực xác nhận.',{joy:1}),
    'Người giữ tiền muốn trừ phí vì đã phải tìm lại hồ sơ.',C('Ghi rõ lỗi sổ sách, yêu cầu thanh toán đủ','Người chở thuốc cầm tiền về. Bạn để lại bản sửa có chữ ký ở cả hai bên.',{joy:2})],
  ];
  for(const [key,name,fit,intro,t1,c1,t2,c2]of entries){if(!fit.length)continue;data.quests.push({id:`service_${race}_${key}`,org:org.id,name,intro,hint:'Công việc hỗ trợ tại địa phương, không yêu cầu giết quái.',repeat:false,minRank:0,require:{job:fit,free:true},steps:[{text:t1,choices:[c1,{label:'Xin người phụ trách hướng dẫn lại',text:'Bạn nhờ người có trách nhiệm cùng kiểm tra, không ký khi chưa hiểu.',effects:{wealth:-1}}]},{text:t2,choices:[c2,{label:'Bàn giao cho người có kinh nghiệm, ghi phần mình chưa làm',text:'Người tiếp nhận có đủ thông tin để làm nốt. Bạn không nhận công phần việc chưa hoàn tất.',effects:{joy:-1}}]}],complete:`${board} ghi nhận công việc đã hoàn tất. Đây là thành tích của một người biết giữ trách nhiệm, dù không mang chiến lợi phẩm về.`,failText:'Bạn báo lại phần chưa làm được để hội tìm người tiếp nhận.',reward:{wealth:5,fame:2,guildPts:2}});}
 }
}

// New support options keep the original chapter flags, so saving people is a real way through
// the group's story. A priest need not swing a sword to earn the team's trust.
function installSupport(data){
 const civil=data.jobs.filter(j=>j.combat===false).map(j=>j.id);
 const heal=data.jobs.filter(j=>['priest','shaman'].includes(j.family)||j.id==='elf_herb').map(j=>j.id);
 const scenes={
  human_party_party_a_1:['Dựng chỗ trú, băng bó và giữ đường lui cho cả đội','Bạn kéo Kael khỏi bẫy, ép vải lên vết thương và gọi Lyra chiếu sáng cửa hang. Grom chặn đợt truy đuổi cuối; cả đội rút theo dấu đèn của bạn.','Chuyển đèn và báo lối thoát, để Grom chặn phía sau'],
  human_party_party_b_1:['Lập điểm cứu thương sau hàng khiên','Bạn kiểm tra người bị thương, đánh dấu lối khiêng cáng và nhờ Elara giữ phép cho người nguy kịch. Đội tiến được vì biết sẽ có người đưa họ về.','Kiểm tra tiếp tế và đánh dấu đường rút'],
  human_party_party_c_1:['Giữ người bị thương tỉnh táo để họ có thể rút lui','Bạn giữ mạch thở cho người bị thương, ra hiệu dừng khiêng lúc họ sốc. Đội rút được với đủ người.','Lo dây kéo, cáng và đường thoát thay vì đánh giáp lá cà'],
  human_party_party_d_1:['Đề nghị cứu người và mở đường rút thay vì tàn sát','Bạn giữ khoảng trống cho người bị thương thoát khỏi giao tranh. Moros không gọi đó là chiến thắng, nhưng Nightwalkers còn đủ người để đi tiếp.','Dẫn người không chiến đấu ra khỏi nơi phục kích'],
  human_party_party_e_1:['Giải tơ bằng nước và ổn định hơi thở cho Arthur','Bạn ngăn Arthur vùng vẫy, làm ướt lớp tơ quanh mặt để cậu thở. Brunt kéo cậu khỏi tầm nhện trong khi bạn giữ lối về.','Chuyển dây và đèn cho Brunt đưa Arthur ra'],
  human_party_party_f_1:['Giữ trạm cứu thương ngoài tầm phá của Rồng Đất','Bạn chuẩn bị cáng và giữ người hậu cần khỏi vùng sạt lở. Ignis trở về thấy mọi người đã được kiểm tra, không ai bị bỏ lại sau đoàn.','Đánh dấu vùng sạt lở và dẫn đoàn hậu cần tránh xa'],
 };
 for(const [id,[label,text,logistics]]of Object.entries(scenes)){
  const e=data.events.find(e=>e.id===id);if(!e)continue;
  const outcome=e.choices[0].success||e.choices[0];
  const flags=(outcome.effects?.flags||[]).slice();
  // A retreating support crew still advances the chapter, with less renown than its battle victory.
  e.choices.unshift({...C(label,text,{joy:3,fame:3,flags}),require:{job:heal}},
   {...C(logistics,'Bạn chia đồ mang, giữ lối trở về và gọi người có sức chiến đấu đứng đúng chỗ. Khi cả đội kiểm lại người ngoài vùng nguy hiểm, không thiếu một ai.',{joy:2,fame:2,flags}),require:{job:civil.filter(j=>!heal.includes(j))}});
 }
 const crises={
  human_party_party_a_4:['Dùng phép bảo hộ giữ Kael đủ lâu để Grom kéo ra','Bạn không đỡ chiếc chùy bằng tay. Màn bảo hộ làm lệch nó một nhịp; Grom kéo Kael khỏi tầm đập, còn bạn ép băng lên cánh tay rách của anh.','Phép vỡ quá sớm. Grom đỡ thay để cứu Kael và mất khả năng chiến đấu vì chấn thương ở tay.','Ném dây kéo Kael khỏi tầm chùy'],
  human_party_party_b_3:['Nhờ Elara gọi tên Aldric, dựng màn chắn quanh Boran','Bạn giữ khoảng cách và nhắc Elara nói về những người đang còn sống. Aldric dừng kiếm khi nghe đúng tên Boran, rồi quỳ xuống trong cơn run.','Aldric phá được màn chắn trước khi tỉnh lại. Boran mất một cánh tay và rời tổ đội.','Kéo Boran ra sau hàng cột, gọi Elara đánh thức Aldric'],
  human_party_party_e_3:['Phối hợp với Celine tạo vùng trú, giữ Arthur tỉnh táo','Celine dẫn nước qua màn chắn của bạn để hạ nhiệt. Brunt kéo Arthur vào vùng trú; từ đó cả đội phối hợp đánh lui Rồng, thay vì lao vào một mình.','Màn trú bị lửa xuyên thủng. Bạn bỏng nặng khi đưa Arthur ra, và Brunt phải kéo cả hai khỏi sườn núi.','Dùng địa hình và dây kéo đưa Arthur tới chỗ Celine'],
  human_party_party_f_3:['Dẫn ma lực của Vera để giữ sức cho Ignis','Bạn điều hòa luồng phép của Vera, dành sức chữa trị đúng lúc Ignis hụt hơi. Hai người hoàn tất đòn hợp bích; bạn giữ họ còn sống để trở về.','Bạn không giữ nổi luồng phép. Ignis dùng phần sinh lực cuối để chặn Ma Tướng và ngã xuống; bạn chỉ kịp đưa Vera ra.','Giữ đường tiếp tế ma tinh và lối rút cho Ignis cùng Vera'],
 };
 for(const [id,[label,good,bad,logistics]]of Object.entries(crises)){
  const e=data.events.find(e=>e.id===id);if(!e)continue;
  const first=e.choices[0],ok={...(first.success?.effects||{})},loss={...(first.fail?.effects||{})};
  delete ok.STR;delete ok.AGI;ok.fame=Math.min(ok.fame||3,8);
  const healer=K(label,'INT',9,good,bad,ok,loss);healer.require={job:heal};
  const helperBad={human_party_party_a_4:'Bạn kéo Kael chậm một nhịp. Grom phải đỡ chiếc chùy bằng tay và mất khả năng chiến đấu vì chấn thương.',human_party_party_b_3:'Bạn không kịp kéo Boran khỏi đường kiếm. Anh mất một cánh tay và rời tổ đội sau trận ấy.',human_party_party_e_3:'Dây trượt khỏi chỗ buộc. Lửa quét qua khi bạn đưa Arthur xuống; Brunt phải cứu cả hai.',human_party_party_f_3:'Tiếp tế không đến kịp. Ignis đốt phần sinh lực cuối để chặn Ma Tướng và ngã xuống; bạn chỉ kịp đưa Vera ra.'};
  const helper=K(logistics,'AGI',9,good,helperBad[id],ok,loss);helper.require={job:civil.filter(j=>!heal.includes(j))};
  // Logistics is physical positioning and supplies, not an unexplained spell cast by an artisan.
  helper.success.text='Bạn giữ đúng vị trí đã thống nhất, chuyển dây, đèn và dụng cụ cho người cần, rồi dẫn người bị thương ra. Đồng đội có sức chiến đấu giải quyết mối nguy; cả đội sống sót nhờ không bỏ trống phần hậu cần.';
  e.choices.unshift(healer,helper);
 }
}
module.exports={install,WORK_FAMILIES};
