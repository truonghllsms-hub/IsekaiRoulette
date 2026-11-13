// What ties a life together between its big scenes: the birth that opens a trade, the quiet years of
// an apprentice and of a master, the trial written for the trade, the guild as each people knows it,
// the war that reaches a workshop, and the death that comes at work. Installed by tools/load.js.

// ---- a birth opens the trades it grew up beside (added to each trade's alt.anyFlags) ----
const originTrades = {
  // Beastman
  bm_thief: ['stray_cat', 'sewer_rat'],
  bm_scout: ['born_to_fly', 'rabbit_hole'],
  bm_mage: ['fox_trickster', 'dark_moon_mark', 'taboo_hybrid'],
  bm_berserker: ['tiger_pride', 'alpha_blood', 'hibernation_born'],
  bm_hunter: ['tiger_pride', 'swamp_resist'],
  bm_merc: ['guard_dog', 'alpha_blood', 'half_human'],
  bm_leather: ['forge_adopted'],
  bm_shaman: ['lumina_blessed', 'swamp_resist', 'fox_trickster'],
  bm_herder: ['guard_dog', 'hibernation_born'],
  bm_courier: ['born_to_fly', 'rabbit_hole', 'half_human'],
  bm_gladiator: ['taboo_hybrid'],
  // Human
  human_bard: ['poor'], human_assassin: ['poor', 'cultist_kin'], human_farmer: ['refugee', 'peasant'], human_mercenary: ['refugee'],
  human_mage: ['cultist_kin'], human_swordsman: ['bastard_blood'], human_paladin: ['bastard_blood'], human_tamer: ['peasant'],
  // Dwarf, Demon, Elf
  dwarf_guard: ['an_dien_thanh_quang'], dwarf_carver: ['an_dien_thanh_quang'], dwarf_hunter: ['dau_an_hac_am', 'tinh_ban_cua_rung'], dwarf_runesmith: ['dau_an_hac_am'], dwarf_brew: ['tinh_ban_cua_rung'],
  demon_wl: ['con_cua_vuc'], demon_dk: ['con_cua_vuc'], demon_spy: ['ke_thu_thanh_quang'], demon_bh: ['ke_thu_thanh_quang'],
  elf_merchant: ['exiled'], elf_envoy: ['exiled'], elf_spirit: ['dark_mark'], elf_herb: ['dark_mark'], elf_ranger: ['wild_halfblood'], elf_bard: ['wild_halfblood'],
  // the others
  goblin_scout: ['hated'], slime_metal: ['royal_slime'], kobold_priest: ['abyssal_sacrificial'], orc_berserker: ['royal_blood'], orc_rider: ['royal_blood'],
  minotaur_shaman: ['ash_born'], troll_bridge: ['ice_troll'], troll_merc: ['scarred'],
  dragon_hoard: ['pure_dragon'], dragon_war: ['chained_beast', 'proud'], dragon_sage: ['outcast', 'frost_heart'],
  hd_archmage: ['gm_hd_mirror_start', 'gm_hd_god_start'], hd_general: ['gm_hd_chaos_start'], hd_lord: ['gm_hd_parasite_start'],
};

// ---- promotion trials for the trades that still only had the shared wording of their kind ----
const P = 'Thử thách để trở thành {next}: ';
const promo = {
  dragon_hoard: ['tự tay lấy về món báu vật đầu tiên mà không thiêu rụi ngôi làng giữ nó.', 'giữ trọn kho báu qua một mùa có ba toán trộm và một Rồng láng giềng dòm ngó.', 'đòi lại một món báu vật bị đánh cắp từ kho của một vương quốc, và để vương quốc ấy còn đứng vững.', 'định giá cả kho báu của mình, rồi cho đi món quý nhất mà không hối tiếc.'],
  dragon_war: ['thắng trận không chiến đầu tiên trước một Wyvern đầu đàn.', 'giữ một ngọn đèo trước cả một đạo quân trong ba ngày mà không rời vị trí.', 'đánh bại một Rồng trưởng thành hơn mình, và để nó sống.', 'kết thúc một cuộc chiến của loài người chỉ bằng việc đáp xuống giữa hai đạo quân.'],
  dragon_sage: ['đọc hết thư khố của một tòa tháp bỏ hoang mà không làm cháy một trang.', 'trả lời ba câu hỏi của một Hiền giả loài người, và hỏi lại một câu khiến ông ta mất ngủ.', 'nhớ lại chính xác một sự kiện từ ba kỷ nguyên trước mà mọi sử sách đã chép sai.', 'dạy một học trò phàm nhân đến khi nó dám cãi lại mình và cãi đúng.'],
  hd_general: ['khiến một quân đoàn tiểu quỷ vô kỷ luật hành quân thẳng hàng trong một đêm.', 'thắng một trận mà không mất quá một phần mười quân.', 'bẻ gãy một cuộc nổi loạn của các Ma Tướng mà không phải giết kẻ cầm đầu.', 'dẫn Quân đoàn qua cổng Vực Thẳm rồi đưa đủ quân trở về.'],
  hd_archmage: ['đặt tên cho một chú thuật chưa ai gọi được tên.', 'giữ một khe nứt Vực Thẳm mở đúng một trăm nhịp thở, không hơn không kém.', 'tháo một lời nguyền do chính tay một Cổ Thần đặt.', 'viết thêm một trang vào Hắc Thư, và trang ấy không tự bốc cháy.'],
  hd_lord: ['thu phục lãnh địa đầu tiên mà không đổ máu kẻ đáng lẽ sẽ là bề tôi.', 'ngồi qua một mùa yến tiệc của triều đình Vực Thẳm mà không bị đầu độc.', 'khiến hai Lãnh chúa thù địch cùng quỳ trước ngai của mình.', 'từ chối một khế ước của Ma Vương và vẫn giữ được lãnh địa.'],
  vampire_noble: ['tổ chức dạ tiệc đầu tiên mà không vị khách nào nhận ra chủ nhà không soi gương được.', 'giữ lãnh địa qua một mùa Thợ Săn lùng sục mà không mất một bề tôi.', 'thắng một ván cờ quyền lực trong Huyết Hội đồng chỉ bằng thư từ.', 'khiến một vị vua loài người ký hiệp ước với gia tộc mà không biết mình ký với ai.'],
  vampire_blade: ['hạ một Thợ Săn tập sự trong bóng tối mà không để lại vết răng.', 'đấu trọn một đêm với ba kiếm sĩ huyết tộc, không lùi khỏi vòng tròn.', 'bảo vệ gia chủ qua một vụ ám sát giữa ban ngày.', 'thách đấu Huyết Kiếm trưởng lão và khiến ông ta phải rút kiếm thật.'],
  vampire_mage: ['dùng một giọt máu của chính mình thắp sáng cả đại sảnh.', 'đọc ký ức từ một vết máu khô ba trăm năm tuổi.', 'dệt một màn sương che cả lâu đài khỏi mắt Giáo hội trong một mùa.', 'cắt một huyết ước mà chính Chân Tổ đã ký.'],
  vampire_hunter: ['theo dấu một con mồi qua ba thành phố mà không uống một giọt máu dọc đường.', 'săn một kẻ phản tộc và mang hắn về còn sống cho Huyết Hội đồng xét xử.', 'hạ một Thợ Săn lừng danh ngay trong nhà nguyện của hắn.', 'lần ra kẻ đã bán nơi ẩn náu của gia tộc cho Giáo hội.'],
  vampire_hidden: ['sống trọn một năm giữa loài người mà không ai trong xóm nghi ngờ.', 'giữ một công việc ban đêm suốt mười năm mà chủ không hỏi vì sao bạn không già.', 'dự đám tang của chính cái tên giả cũ của mình, rồi bắt đầu một cái tên mới.', 'cứu một người phàm biết bí mật của bạn mà không phải biến họ thành đồng loại.'],
  goblin_tinker: ['chế một cái bẫy sập từ đống sắt vụn mà không sập trúng chính mình.', 'sửa cỗ nỏ của bầy trước buổi cướp, và nó bắn đúng hướng.', 'làm ra một thứ biết nổ theo ý muốn, không phải theo ý nó.', 'dựng một cỗ máy khiến cả Hobgoblin cũng phải đứng nhìn.'],
  orc_smith: ['rèn một lưỡi rìu không mẻ sau khi chém vào đá.', 'trang bị đủ cho một toán cướp trước mùa chinh chiến.', 'nung lại thanh đao gãy của Tù trưởng trước mặt cả bộ lạc.', 'rèn một vũ khí được đặt tên và được hát trong chiến ca.'],
  slime_metal: ['tiêu hóa trọn một thỏi sắt mà không làm rỉ lõi.', 'cứng lại đủ để đỡ một nhát kiếm của mạo hiểm giả.', 'nuốt một món ma khí mà giữ được ý chí của mình.', 'đúc chính thân mình thành một hình dạng chưa Slime nào giữ nổi.'],
};

// ---- the quiet years, by standing: [apprentice lines, master lines] (the trade's own lines stay for the middle) ----
const quiet = {
  human_swordsman: [['Cả năm bạn chỉ được cầm kiếm gỗ, và quét sân võ đường nhiều hơn là tập.', 'Sư huynh sai bạn đi mua rượu, xách nước, lau kiếm. Bạn tập lén sau giờ tắt đèn.', 'Tay bạn phồng rồi chai, chai rồi lại phồng. Chưa ai gọi bạn bằng tên.'], ['Võ đường giờ treo tên bạn trên cổng. Bạn nhận ra mình nói nhiều hơn là rút kiếm.', 'Lũ học trò trẻ nhìn bạn như nhìn một bức tượng. Bạn nhớ cái thời còn có người dám đánh ngã mình.', 'Những đối thủ xứng tầm đã chết hoặc đã già. Bạn tập một mình trong sân lúc rạng sáng.']],
  human_mage: [['Bạn chép lại vòng tròn căn bản đến lần thứ một nghìn. Thầy vẫn bảo chưa tròn.', 'Việc của học đồ là mài mực, quét tro và không chạm vào thứ gì đang phát sáng.', 'Bạn ngủ gục trên sách trong thư viện lạnh, mơ thấy chữ bò khỏi trang giấy.'], ['Học trò xếp hàng trước cửa phòng bạn. Bạn chợt nhận ra mình đã thành kẻ khó tính như thầy mình xưa.', 'Bạn hiểu nhiều hơn bao giờ hết, và có ít người để nói cùng hơn bao giờ hết.', 'Tay bạn bắt đầu run khi vẽ những nét mảnh. Bạn giấu điều đó sau ống tay áo rộng.']],
  human_assassin: [['Hội chỉ giao bạn những việc không ai muốn: canh cửa, đưa tin, lau máu.', 'Bạn học cách đứng yên suốt đêm trong mưa mà không được phép hỏi vì sao.', 'Chưa ai trong hội biết tên bạn, và người ta bảo thế là tốt.'], ['Giờ người khác ra tay thay bạn. Bạn chỉ chọn tên và ký sổ.', 'Lớp trẻ trong hội sợ bạn. Không ai còn dám ngồi cùng bàn rượu.', 'Bạn ngủ quay mặt ra cửa đã bao nhiêu năm, và bắt đầu thấy mỏi.']],
  human_priest: [['Bạn thắp nến, lau ghế và đọc kinh sớm cho một nhà nguyện trống.', 'Tu sĩ trưởng chỉ giao bạn việc chôn người nghèo và rửa bát.', 'Bạn thuộc kinh nhưng chưa hiểu, và mỗi sáng vẫn đọc như thể đã hiểu.'], ['Người ta hôn tay bạn và gọi bạn bằng danh xưng dài. Bạn nhớ những ngày chỉ là một tu sĩ quét sân.', 'Bạn ban phước cho hàng trăm người mỗi tuần, và hiếm khi có ai hỏi bạn có mệt không.', 'Đức tin của bạn giờ lặng lẽ hơn, ít lời hơn. Bạn không chắc đó là sâu sắc hay chỉ là tuổi già.']],
  human_merchant: [['Bạn gánh hàng đi bộ từ chợ này sang chợ khác, lãi vừa đủ một bữa tối.', 'Khách mặc cả với bạn như mặc cả với trẻ con. Bạn học cách mỉm cười.', 'Trời mưa suốt phiên chợ, và bạn ôm đống hàng ướt ngồi dưới mái hiên nhà người ta.'], ['Giờ bạn có người ghi sổ, người đếm tiền, người đi đường thay. Bạn nhớ mùi của những phiên chợ.', 'Ai đến gặp bạn cũng cần vay hoặc cần bán. Lâu rồi không ai chỉ đến uống trà.', 'Bạn tính xem cơ nghiệp này sẽ về tay ai, và không tìm được cái tên nào yên tâm.']],
  human_smith: [['Cả năm bạn chỉ đạp bễ và quét xỉ. Thợ cả chưa cho bạn chạm vào búa lớn.', 'Bạn rèn đinh, rèn mãi đinh, rèn hàng nghìn cái đinh.', 'Tàn lửa đốt thủng áo bạn từng lỗ. Bạn chưa đủ tiền mua tạp dề da.'], ['Thợ trẻ làm phần nặng, còn bạn chỉ gõ nhát cuối. Người ta vẫn trả tiền cho cái tên của bạn.', 'Vai bạn đau mỗi sáng trời trở lạnh. Bạn không nói với ai trong xưởng.', 'Bạn dạy lũ học trò mọi thứ, trừ cái cách nghe thép ngân. Thứ đó không dạy được.']],
  human_ranger: [['Bạn xách đồ cho đội tuần và nhóm lửa trại. Cung thì chỉ được lau.', 'Ba tháng liền bạn chỉ học nhận dấu chân, và vẫn nhầm cáo với chó hoang.', 'Muỗi rừng, vắt và những đêm canh lửa không ai nói chuyện.'], ['Bạn không cần nhìn dấu vết nữa, khu rừng tự kể cho bạn. Chỉ có đầu gối là không nghe lời.', 'Lớp trẻ đi tuần thay bạn. Bạn ngồi ở chòi gác, đoán thời tiết qua khớp xương.', 'Bạn thuộc từng gốc cây trong rừng, và nhận ra chẳng có ai để để lại điều đó.']],
  human_gladiator: [['Bạn đấu mở màn cho những trận không ai xem, ăn cháo loãng và ngủ trên rơm.', 'Cai chuồng gọi bạn bằng số. Bạn chưa đủ thắng để có tên.', 'Mỗi tối bạn tự khâu vết thương bằng chỉ gai, vì thầy thuốc chỉ dành cho kẻ có giá.'], ['Khán đài gào tên bạn, còn bạn đếm xem mình còn lại bao nhiêu trận trong người.', 'Vết thương cũ đau trước cả khi tiếng cồng vang. Bạn học cách thắng nhanh.', 'Lũ đấu sĩ trẻ nhìn bạn như nhìn tấm bia cần hạ. Không ai trong số chúng là bạn.']],
  human_paladin: [['Bạn đánh bóng giáp cho kỵ sĩ mình hầu, dắt ngựa và ngủ ngoài chuồng.', 'Lời thề thì đã thuộc, còn thanh kiếm thật thì chưa được chạm.', 'Diễu hành dưới nắng với bộ giáp mượn rộng thùng thình, bạn cố không ngất.'], ['Dưới quyền bạn là cả một đoàn kỵ sĩ, và mỗi mệnh lệnh giờ có giá bằng mạng người.', 'Bạn ký thư chia buồn nhiều hơn là rút kiếm.', 'Bộ giáp nặng hơn theo từng năm. Bạn vẫn mặc nó thẳng lưng trước mặt lính trẻ.']],
  human_scholar: [['Bạn chép thuê từng trang cho các giáo sư, và chưa ai hỏi ý kiến bạn về bất cứ điều gì.', 'Việc của trợ lý là bưng sách, pha mực và im lặng trong các buổi tranh luận.', 'Bạn sống bằng bánh mì khô trong căn gác xép đầy sách mượn.'], ['Sách của bạn nằm trên kệ của mọi thư viện. Bạn bắt đầu ngờ vài điều mình viết hồi trẻ.', 'Học trò trích dẫn bạn để cãi nhau. Bạn không còn chắc mình từng có ý đó.', 'Mắt bạn mờ dần. Bạn nhờ người trẻ đọc to, và ngủ gật giữa chừng.']],
  human_farmer: [['Bạn cày thuê trên ruộng người khác, trả tô xong chỉ còn đủ giống cho vụ sau.', 'Tay bạn chưa quen cuốc, lưng chưa quen cúi. Người làng cười hiền mà không nói.', 'Một năm mất mùa, bạn ăn cháo rau và học cách nhìn trời.'], ['Ruộng bạn giờ có người làm thay. Bạn vẫn dậy trước gà gáy theo thói quen.', 'Cả làng đến hỏi bạn khi nào nên gieo. Bạn nhìn trời rất lâu rồi mới trả lời.', 'Bạn tính chuyện chia đất cho con cháu, và sợ chúng bán nó đi.']],
  human_tamer: [['Bạn dọn chuồng, xách nước và bị cắn nhiều hơn là được vuốt ve con nào.', 'Lũ thú chưa coi bạn là gì cả. Con dê già vẫn húc bạn mỗi sáng.', 'Tay bạn đầy vết cào chưa kịp lành. Bạn bôi mỡ và làm tiếp.'], ['Bầy thú nghe bạn chỉ bằng một cái nhìn. Bạn bắt đầu lo ai sẽ chăm chúng sau này.', 'Con thú theo bạn lâu nhất đã già. Bạn đi chậm lại cho vừa bước nó.', 'Người ta đến xem bạn như xem một phép lạ. Bạn chỉ muốn ngồi yên với bầy thú.']],
  human_bard: [['Bạn hát ở góc phố cho cái mũ trống, và học được rằng mưa không trả tiền.', 'Chủ quán cho bạn hát đổi bữa súp, với điều kiện không hát bài buồn.', 'Bạn chỉ thuộc sáu bài, và hát đi hát lại cả sáu.'], ['Người ta hát bài của bạn mà không biết ai viết. Bạn thấy thế cũng hay.', 'Giọng bạn không còn lên nổi nốt cao ngày trẻ. Bạn viết lại bài cho vừa giọng mình.', 'Đoàn hát của bạn đông đủ, ồn ào. Sau buổi diễn, bạn vẫn ngồi lại một mình với cây đàn.']],
  human_mercenary: [['Tân binh thì gác đêm, đào hố xí và lĩnh lương sau cùng.', 'Giáo của bạn là giáo mượn, giáp là giáp vá. Bạn đứng hàng đầu vì lính mới luôn đứng hàng đầu.', 'Bạn học cách ngủ đứng, và không hỏi hợp đồng ghi gì.'], ['Giờ bạn là người ký hợp đồng, và là người viết thư cho vợ con những kẻ không về.', 'Bạn nhớ mặt từng người đã ngã xuống dưới cờ của mình. Danh sách ấy dài hơn sổ lương.', 'Thanh gươm vẫn sắc, nhưng bạn đã chọn trận cẩn thận hơn nhiều so với thời trẻ.']],
  bm_berserker: [['Bạn chưa điều khiển được cơn cuồng. Sau mỗi buổi tập, người ta phải trói bạn vào cột.', 'Chiến binh lớn bắt bạn vác rìu cho họ và đứng ngoài vòng lửa.', 'Bạn tỉnh dậy với máu trên tay, không nhớ là của ai. Shaman nhìn bạn mà lắc đầu.'], ['Cơn cuồng giờ nghe lời bạn, và bạn thấy sợ ngày nó thôi không đến nữa.', 'Lũ trẻ kể chuyện về bạn bên lửa. Bạn ngồi xa hơn, vì không đứa nào dám lại gần.', 'Thân thể bạn đầy sẹo đến mức không còn chỗ cho vết mới. Mỗi sáng nó đau một kiểu khác.']],
  bm_hunter: [['Bạn chỉ được vác thịt về trại và nhặt lại tên cho thợ săn lớn.', 'Bẫy của bạn trống trơn suốt một mùa trăng. Bầy vẫn chia phần cho bạn, và điều đó làm bạn ngượng.', 'Bạn nằm rình cả ngày để rồi hắt hơi đúng lúc. Người hướng dẫn chỉ thở dài.'], ['Bạn không cần đuổi theo con mồi nữa, chỉ ngồi đúng chỗ và đợi. Tuổi già dạy bạn điều đó.', 'Cả bộ lạc ăn theo những gì bạn chỉ. Một mùa săn hỏng sẽ là lỗi của bạn.', 'Mắt bạn không còn thấy xa như trước. Bạn săn bằng trí nhớ về những lối mòn.']],
  bm_gladiator: [['Bạn là kẻ bị ném ra trước để làm nóng khán đài. Chưa ai đặt cược vào bạn.', 'Xích ở cổ chân cọ vào da đến chảy máu. Cai chuồng bảo rồi sẽ quen.', 'Bạn ăn sau, ngủ ở góc chuồng lạnh nhất và học cách không nhìn vào mắt ai.'], ['Khán đài hô tên bạn. Bạn đếm từng trận, vì mỗi trận có thể là trận cuối.', 'Những kẻ cùng chuồng với bạn ngày đầu không còn ai. Bạn là kẻ sống sót duy nhất và không thấy tự hào.', 'Chủ đấu trường mỉm cười với bạn như với một món tài sản quý. Bạn vẫn nhớ cái xích.']],
  bm_scout: [['Bạn gác vòng ngoài, nơi lạnh nhất, và chưa được giao tin gì quan trọng.', 'Trinh sát lớn bắt bạn đếm dấu chân cả ngày, rồi xóa đi bắt đếm lại.', 'Bạn chạy lạc hai lần trong một tuần trăng. Cả trại gọi bạn là Kẻ Vòng Quanh.'], ['Cả đạo quân đi theo đôi mắt của bạn. Bạn không còn được phép nhìn nhầm.', 'Bạn biết quá nhiều lối đi bí mật. Ban đêm bạn tự hỏi ai sẽ nhớ chúng khi mình mất.', 'Chân bạn chậm rồi. Bạn dạy lũ trẻ chạy và ở lại trại đọc tin chúng mang về.']],
  bm_shaman: [['Bạn nhặt xương, phơi ngải và gõ trống nhịp cho vị shaman già. Chưa tinh linh nào đáp lời bạn.', 'Bạn ngồi nghe gió cả đêm và chỉ nghe thấy gió.', 'Người ta còn gọi bạn là thằng nhỏ giữ trống.'], ['Bạn nghe được tổ tiên rõ hơn nghe người sống. Điều đó khiến bạn ít nói dần.', 'Mọi quyết định lớn của bộ lạc đều chờ lời bạn. Bạn thèm được sai một lần mà không ai chết.', 'Tinh linh đến dễ hơn mỗi năm. Bạn hiểu đó là vì mình đang đến gần chúng.']],
  bm_merc: [['Lính á nhân mới thì gác chuồng ngựa và lĩnh nửa lương loài người.', 'Bạn chưa có huy hiệu, chỉ có một cây giáo mượn và cái tên bị gọi sai.', 'Đêm nào bạn cũng gác ca cuối, ca mà không ai muốn.'], ['Huy hiệu bạc trên ngực bạn đã mòn. Lính trẻ đứng nghiêm khi bạn đi qua.', 'Bạn thuộc mọi con đường của Thương hội, và mọi nấm mộ dọc theo chúng.', 'Bạn chọn hợp đồng kỹ hơn, vì giờ bạn biết giá của từng tên lính.']],
  bm_leather: [['Bạn nạo mỡ, ngâm da và mang mùi hố thuộc về đến tận chỗ ngủ.', 'Thợ cả chưa cho bạn cầm kim, chỉ cho cầm nạo.', 'Tay bạn nứt nẻ vì nước vôi. Lũ trẻ trong trại bịt mũi khi bạn đi qua.'], ['Người ta đi ba ngày đường để đặt một bộ giáp của bạn. Bạn chỉ còn nhận những đơn mình muốn.', 'Mắt bạn mỏi khi xỏ kim. Bạn để học trò khâu đường thẳng, còn mình khâu đường cong.', 'Những bộ giáp đầu tiên bạn làm giờ đã theo chủ xuống mộ. Bạn nhớ từng bộ.']],
  bm_herder: [['Bạn chăn lũ dê con, lũ khó bảo nhất, và đếm thiếu một con mỗi tối.', 'Người chăn lớn chỉ giao bạn việc xúc phân và gánh nước.', 'Đàn thú chưa nghe tiếng huýt của bạn. Bạn chạy theo chúng đến rạc cả chân.'], ['Đàn thú của ba bộ lạc đi theo tiếng huýt của bạn. Bạn không còn được phép ốm.', 'Bạn nhớ tên từng con đầu đàn qua mấy đời. Tên người thì bắt đầu quên.', 'Con thú già nhất trong đàn bằng tuổi bạn tính theo cách của nó. Hai đứa đi chậm cùng nhau.']],
  bm_thief: [['Bạn chỉ được canh đầu ngõ và ăn phần chia sau cùng.', 'Ngón tay bạn còn vụng. Bạn bị bắt quả tang hai lần và ăn đòn cả hai.', 'Bạn ngủ dưới gầm cầu, đếm những đồng xu lẻ và học thuộc giờ đổi gác.'], ['Giờ người khác trộm thay bạn và nộp phần. Bạn nhớ cái run của những đêm tự tay làm.', 'Cả khu ngầm biết mặt bạn, nghĩa là bạn không còn trốn được vào đâu.', 'Bạn giàu hơn bao giờ hết, và không tin nổi một ai ngồi cùng bàn.']],
  bm_mage: [['Bạn chép rune lên cát, vì đá thì chưa được phép chạm.', 'Lũ trẻ loài người vẫn cười khi bạn nói mình học phép. Bạn tập trong im lặng.', 'Con rune đầu tiên của bạn làm cháy lông tay. Bạn giấu vết bỏng và thử lại.'], ['Rune của bạn giữ ấm cho cả trại qua mùa đông. Không ai còn nhớ thời người ta cười bạn.', 'Pháp sư loài người đến xin chép rune của bạn. Bạn cho, và thấy lạ vì mình không còn giận.', 'Bạn khắc chậm hơn, sâu hơn. Mỗi con rune giờ như một lá thư gửi người đến sau.']],
  bm_courier: [['Bạn chạy những tuyến ngắn nhất, mang những lá thư không ai vội.', 'Trạm trưởng trừ lương bạn vì đến trễ nửa canh giờ. Bạn chưa thuộc đường tắt nào.', 'Chân bạn phồng rộp đến mức phải quấn giẻ mà chạy.'], ['Thư quan trọng nhất của cả vùng chỉ giao cho bạn. Bạn chưa từng để mất một phong nào và sợ lần đầu tiên.', 'Bạn thuộc mọi con đường, và biết những con đường nào đã không còn làng ở cuối.', 'Chân bạn đã chậm. Bạn vẽ lại bản đồ tuyến cho lũ trẻ, ghi cả những chỗ có nước uống.']],
  elf_merchant: [['Bạn đếm hạt giống và ghi sổ cho thương chủ, chưa được tự mình mặc cả.', 'Người ta giao bạn canh xe hàng trong khi cuộc thương lượng diễn ra bên trong.'], ['Chữ ký của bạn đủ để một thương đoàn lên đường. Bạn ký ít dần đi.', 'Bạn đã buôn bán với ông, cha và con của cùng một nhà loài người. Đứa cháu bây giờ gọi bạn là cụ.']],
  elf_ranger: [['Bạn đi cuối đội tuần, xóa dấu chân cho những người đi trước.', 'Mười năm đầu bạn chỉ được canh một gốc cây. Bạn thuộc từng chiếc lá của nó.'], ['Cả tuyến tuần đi theo lịch bạn đặt. Bạn nhớ những Ranger đã dạy mình, giờ chỉ còn là tên trên vỏ cây.', 'Bạn bắn ít dần và nhìn nhiều hơn. Khu rừng không cần bạn chứng tỏ gì nữa.']],
  elf_spirit: [['Chưa tinh linh nào chịu đáp lời bạn. Bạn ngồi bên suối suốt một mùa chỉ để tập im lặng.', 'Bậc thầy giao bạn quét lá quanh vòng tròn và không được bước vào trong.'], ['Các tinh linh đến với bạn như đến với người quen cũ. Bạn lo cho chúng khi mình không còn.', 'Bạn nói chuyện với gió nhiều hơn với Elf. Lớp trẻ thấy bạn xa cách.']],
  elf_herb: [['Bạn nhổ cỏ và tưới luống suốt mười năm trước khi được hái một chiếc lá thuốc.', 'Bậc thầy bắt bạn nếm từng thứ lá đắng. Lưỡi bạn tê cả mùa.'], ['Khu vườn của bạn chữa bệnh cho cả một vùng. Bạn lo không ai nhớ hết những gì mọc trong đó.', 'Bạn đã thấy nhiều thế hệ người bệnh đến rồi đi. Thuốc chữa được nhiều thứ, trừ thời gian.']],
  elf_bard: [['Bạn chỉ được lên dây đàn cho các Bard lớn và ngồi nghe từ sau cánh gà.', 'Bài ca đầu tiên bạn viết bị thầy trả lại với một dòng: “Sống thêm trăm năm nữa rồi viết.”'], ['Bài ca của bạn được dạy cho trẻ nhỏ. Bạn nghe chúng hát sai vài chữ và không sửa.', 'Bạn nhớ những bài ca mà không Elf nào khác còn thuộc. Chúng sẽ đi cùng bạn.']],
  elf_guard: [['Bạn gác ca đêm ở cổng phụ, nơi chỉ có sóc và sương đi qua.', 'Tấm khiên tập còn quá nặng. Bạn đứng thế thủ đến khi tay tê dại.'], ['Lịch gác của cả Cổng Rễ do bạn xếp. Bạn vẫn giữ cho mình ca lạnh nhất.', 'Bạn đã đứng ở cổng này lâu hơn tuổi của vài vương quốc loài người.']],
  elf_wood: [['Bạn quét vỏ bào và mài đục cho thầy. Gỗ thiêng thì chưa được chạm.', 'Mười năm đầu bạn chỉ gọt thìa gỗ, và thầy bẻ gãy gần hết.'], ['Một tác phẩm của bạn giờ được giữ trong sảnh Hội đồng. Bạn chỉ thấy những chỗ mình làm chưa tới.', 'Tay bạn vẫn vững, nhưng bạn chọn gỗ chậm hơn, như chọn lời để nói lần cuối.']],
  elf_envoy: [['Bạn mang cặp, rót trà và ghi chép cho vị Sứ giả, không được mở miệng trong các cuộc họp.', 'Bạn học thuộc tước hiệu của ba trăm quý tộc loài người, và họ thì cứ chết đi thay tên.'], ['Các vương quốc xin ý kiến bạn trước khi ký. Bạn biết quá rõ mỗi lời mình nói nặng bao nhiêu.', 'Những người từng ngồi đối diện bạn ở bàn đàm phán giờ chỉ còn trong sử sách. Bạn nhớ giọng của họ.']],
  demon_dk: [['Tân binh thì đánh bóng giáp cho lính cũ và lĩnh đòn thay chúng.', 'Bạn đi bộ sau đoàn kỵ sĩ, nuốt bụi tro của chiến thú.'], ['Cả một cánh quân chờ lệnh bạn. Bạn nhớ rõ từng kẻ mình đã ra lệnh cho đi chết.', 'Bộ giáp đen nặng dần theo năm tháng. Bạn không cởi nó trước mặt ai.']],
  demon_wl: [['Bạn quét tro vòng triệu hồi và cho lũ tiểu quỷ ăn. Sách cấm thì khóa kín.', 'Thầy lấy của bạn một giọt máu mỗi tuần để làm mực, và không giải thích.'], ['Bạn biết tên thật của nhiều thứ không nên được gọi. Bạn ngủ ít dần.', 'Học trò sợ bạn hơn sợ những thứ bạn triệu hồi.']],
  demon_bu: [['Bạn chép sổ thuế từ tối đến sáng dưới ánh đèn mỡ, và bị trừ lương vì một vết mực.', 'Quan trên sai bạn mang trà, mang roi và mang tiếng thay hắn.'], ['Mọi tờ sắc lệnh của Ma Giới đi qua bàn bạn. Bạn biết ai nợ ai và nợ cái gì.', 'Bạn đã phục vụ nhiều đời chủ đến mức không ai còn nhớ bạn đến từ phe nào.']],
  demon_me: [['Bạn bán hàng rong ở rìa chợ Tro, nơi lính tuần đá sạp như đá sỏi.', 'Lãi của cả ngày đủ mua nửa cái bánh tro. Bạn vẫn đếm lại hai lần.'], ['Nửa chợ đen nợ bạn. Bạn không còn nhớ lần cuối mình tự tay bán một món.', 'Bạn giàu đến mức phải thuê kẻ nếm thức ăn thay mình.']],
  demon_bs: [['Bạn kéo bễ đến bỏng tay, và chưa được nhìn vào lò chính.', 'Thợ cả ném vào bạn những mẻ thép hỏng thay cho lời dạy.'], ['Vũ khí mang dấu của bạn được truyền qua ba đời chủ. Bạn nhớ từng thanh.', 'Lửa không còn làm bỏng tay bạn. Bạn hơi nhớ cảm giác ấy.']],
  demon_bh: [['Bạn chỉ được giao những con mồi không đáng tiền: kẻ trộm gà, lính đào ngũ đói lả.', 'Thợ săn lớn lấy công của bạn và để lại cho bạn phần đi bộ.'], ['Tên bạn trên một lệnh truy nã đủ khiến con mồi tự ra đầu thú.', 'Bạn nhận ra mình đã bắt gần hết những kẻ đáng bắt. Phần còn lại chỉ là những kẻ khốn khổ.']],
  demon_spy: [['Bạn tập nói giọng loài người trước gương hàng tháng trời, và vẫn bị lộ ở chữ “r”.', 'Nhiệm vụ đầu chỉ là ngồi ở quán nước đếm lính. Bạn đếm sai hai lần.'], ['Bạn đã sống dưới cái tên này lâu đến mức quên mất mình sinh ngày nào thật.', 'Ma Giới tin báo cáo của bạn hơn tin tướng lĩnh. Bạn tự hỏi mình còn trung thành với bên nào.']],
  dwarf_runesmith: [['Bạn đạp bễ và mài đục cho thầy. Cổ tự thì mới được chép lên tro.', 'Một trăm cái đinh mỗi ngày, mỗi cái một con rune, và thầy vứt đi chín mươi.'], ['Rune của bạn được chép vào thư khố gia tộc. Bạn lo lớp trẻ chỉ chép mà không hiểu.', 'Búa của bạn chậm hơn xưa, nhưng mỗi nhát đều rơi đúng chỗ.']],
  dwarf_miner: [['Bạn đẩy xe goòng và xúc đá vụn. Cuốc chim thì chưa đến lượt.', 'Thợ cả bắt bạn xách đèn đi trước, vì đứa mới luôn đi trước.'], ['Cả mỏ đào theo hướng bạn chỉ. Một lần chỉ sai là cả tổ không về.', 'Phổi bạn nặng bụi đá. Bạn vẫn xuống hầm, chậm hơn, và nghỉ ở mỗi tầng.']],
  dwarf_shield: [['Tân binh đứng hàng sau, đỡ lưng cho lính cũ và vác khiên dự phòng.', 'Bạn tập đứng tấn với khiên đá đến khi chân run như lá.'], ['Hàng khiên xếp theo lệnh bạn. Bạn biết tên mẹ của từng đứa đứng trong hàng.', 'Vai bạn không còn nâng khiên qua đầu được nữa. Bạn giấu điều đó sau giọng hô lớn.']],
  dwarf_brew: [['Bạn cọ thùng, xúc lúa mạch và chưa được nếm mẻ nào ngon.', 'Thợ cả đổ mẻ bia đầu tiên của bạn xuống cống mà không nói vì sao.'], ['Bia của bạn được rót trong mọi lễ lớn của thành trì. Bạn uống ít dần, nếm nhiều hơn.', 'Bạn giữ một công thức chưa viết ra, và chưa chọn được ai để nói.']],
  dwarf_eng: [['Bạn tra dầu, siết ốc và chui vào những chỗ máy mà thợ lớn không chui vừa.', 'Bản vẽ đầu tiên của bạn bị thợ cả dùng để lau tay.'], ['Máy của bạn chạy trong mọi tầng mỏ. Bạn nghe tiếng chúng như người khác nghe tiếng con mình.', 'Tay bạn run khi cầm thước nhỏ. Bạn đọc số cho học trò vẽ.']],
  dwarf_carver: [['Bạn đục đá thô, mang đá và ăn bụi đá. Mặt tượng thì chưa được chạm.', 'Thầy bắt bạn khắc cùng một chữ suốt một mùa đông.'], ['Tượng của bạn đứng trong Sảnh Tổ Tiên. Bạn đi ngang và chỉ thấy lỗi.', 'Bạn chọn đá cho chính bia mộ của mình và để nó trong góc xưởng.']],
  dwarf_merchant: [['Bạn bày hàng ở góc sảnh tối nhất, và bị lừa mua một nắm thủy tinh.', 'Thương gia lớn sai bạn chạy vặt, đổi lại cho nhìn ông ta soi ngọc.'], ['Giá ngọc của cả Dãy Núi đợi lời bạn. Bạn nói ít đi.', 'Bạn đã định giá mọi thứ, trừ những gì mình đánh đổi để ngồi ở quầy này.']],
  dwarf_guard: [['Lính mới gác tháp gió, nơi râu đóng băng trước khi hết ca.', 'Bạn thuộc lòng hiệu lệnh tù và, và vẫn thổi sai một lần giữa đêm.'], ['Cả cửa ải theo lịch gác của bạn. Bạn vẫn tự đi kiểm tra từng chòi lúc nửa đêm.', 'Đầu gối bạn kêu trên mỗi bậc tháp. Bạn leo chậm và không để lính trẻ đỡ.']],
  dwarf_hunter: [['Bạn xách đuốc và vác ba lô cho đội, được chia phần sau cùng.', 'Hầm đầu tiên bạn tự xuống chỉ có nước và dơi.'], ['Bản đồ của bạn được bán bằng vàng. Bạn giữ lại tấm quý nhất không bán.', 'Bạn đếm lại sẹo và nhận ra mình đã hết muốn xuống thêm một tầng nào nữa. Rồi vẫn xuống.']],
};

// ---- a death that comes at work (violent ends while holding the trade) ----
const workDeaths = {
  human_swordsman: 'Năm {age} tuổi, bạn gặp một lưỡi kiếm nhanh hơn mình nửa nhịp. Bạn kịp nhận ra thế kiếm ấy trước khi ngã xuống: thế kiếm của chính võ đường mình.',
  human_mage: 'Vòng tròn vỡ ở nét cuối. Năm {age} tuổi, thứ bạn gọi lên không chịu quay về, và căn phòng trên tháp chỉ còn lại một vệt cháy hình người.',
  human_assassin: 'Mục tiêu đêm ấy đã chờ sẵn. Năm {age} tuổi, bạn chết trên một mái nhà Sanctus, và sáng ra Umbra gạch tên bạn bằng một nét mực mảnh.',
  human_priest: 'Bạn ở lại với người bệnh khi mọi tu sĩ khác đã đi. Năm {age} tuổi, cơn dịch lấy cả bạn, và làng chôn bạn dưới gốc cây trước nhà nguyện.',
  human_merchant: 'Bọn cướp đường không cần hàng, chúng cần người biết mặt chúng im lặng. Năm {age} tuổi, đoàn xe của bạn về đến chợ mà không có chủ.',
  human_smith: 'Mẻ thép nổ khi bạn tôi nó trong thứ dầu lạ khách mang đến. Năm {age} tuổi, lò rèn cháy suốt đêm, và người ta chỉ tìm thấy cây búa.',
  human_ranger: 'Con ma thú bạn bám theo ba ngày hóa ra cũng đang bám theo bạn. Năm {age} tuổi, rừng giữ bạn lại, và đội tuần chỉ tìm thấy cây cung cắm thẳng xuống đất.',
  human_gladiator: 'Năm {age} tuổi, bạn ngã xuống trên cát đỏ Huyết Sa giữa tiếng gào của ba vạn người. Khán đài reo đến khản giọng rồi quên tên bạn trước trận kế.',
  human_paladin: 'Bạn giữ cổng làng cho đến khi người cuối cùng chạy thoát. Năm {age} tuổi, người ta tìm thấy bạn vẫn quỳ một gối, tay tựa trên khiên.',
  human_scholar: 'Cuốn sách bạn mở ra không muốn bị đọc. Năm {age} tuổi, thủ thư tìm thấy bạn gục trên bàn, và mọi trang ghi chép đều trắng trơn.',
  human_farmer: 'Lính đói của cả hai phe đều đi qua ruộng bạn. Năm {age} tuổi, bạn chết bên bờ ruộng khi cố giữ lại bao thóc giống cuối cùng.',
  human_tamer: 'Con thú mới về chưa kịp tin ai. Năm {age} tuổi, bạn bước vào chuồng nó một bước quá sớm, và bầy thú cũ tru suốt đêm ấy.',
  human_bard: 'Bài hát của bạn chạm đến sai người. Năm {age} tuổi, bạn bị đâm trong một con hẻm sau quán, cây đàn vỡ dưới gót giày ai đó.',
  human_mercenary: 'Hợp đồng ghi “giữ vị trí đến cùng”. Năm {age} tuổi, bạn làm đúng từng chữ, và chủ thuê không bao giờ phải trả nốt nửa tiền còn lại.',
  bm_berserker: 'Cơn cuồng đưa bạn vào quá sâu giữa hàng quân địch. Năm {age} tuổi, bạn ngã xuống giữa một vòng xác, và phải mười mũi giáo mới giữ được bạn nằm yên.',
  bm_hunter: 'Con Behemoth quay đầu nhanh hơn một thứ to như thế đáng lẽ quay được. Năm {age} tuổi, Thảo Nguyên nhận lại người thợ săn của nó.',
  bm_gladiator: 'Năm {age} tuổi, bạn gục trên cát Huyết Sa, chân vẫn còn dấu xích. Khán đài quay ngón tay cái xuống trước khi bạn kịp ngẩng lên.',
  bm_scout: 'Bạn thấy đạo quân địch trước tiên, và chúng thấy bạn ngay sau đó. Năm {age} tuổi, bạn kịp thả con chim đưa tin trước khi mũi tên tới.',
  bm_shaman: 'Tinh linh bạn gọi đêm ấy không phải tinh linh. Năm {age} tuổi, vòng lửa tắt phụt, và sáng ra chỉ còn chiếc trống rách nằm giữa tro.',
  bm_merc: 'Đoàn xe bị phục kích ở đèo Răng Cưa. Năm {age} tuổi, bạn ngã xuống cạnh cỗ xe mình nhận tiền để giữ, và giữ nó đến hơi cuối.',
  bm_leather: 'Tấm da ma thú bạn nhận thuộc còn giữ độc của chủ nó. Năm {age} tuổi, cơn sốt đến trong một đêm, và tấm da nằm lại trên khung, dang dở.',
  bm_herder: 'Bầy sói đói xuống núi vào đêm tuyết lớn. Năm {age} tuổi, bạn đứng giữa chúng và đàn thú với một cây gậy, và đàn thú về chuồng đủ cả.',
  bm_thief: 'Căn nhà đêm ấy có một cái bẫy mà bạn chưa từng thấy. Năm {age} tuổi, lính gác tìm thấy bạn lúc sáng, tay vẫn nắm chặt một món không đáng tiền.',
  bm_mage: 'Con rune bạn khắc để giữ lửa đã giữ quá nhiều. Năm {age} tuổi, tảng đá nổ tung, và cả trại thấy một cột sáng ở nơi lều bạn từng đứng.',
  bm_courier: 'Chúng chặn bạn ở khúc đèo hẹp. Năm {age} tuổi, bạn nuốt lá thư trước khi ngã xuống, và người ta tìm thấy bạn vẫn hướng mặt về phía trạm kế.',
  elf_merchant: 'Bọn cướp thương lộ không biết phân biệt ma thảo với cỏ. Năm {age} tuổi, bạn chết bên xe hàng, và chúng đổ thứ quý nhất xuống suối.',
  elf_ranger: 'Bọn đốn gỗ lậu đông hơn tên trong ống của bạn. Năm {age} tuổi, bạn ngã xuống dưới gốc cây mình canh, và nó vẫn đứng.',
  elf_spirit: 'Tinh linh cổ mà bạn đánh thức không nhớ gì về khế ước. Năm {age} tuổi, nó lấy lại tất cả ma lực từng cho Elf mượn, bắt đầu từ bạn.',
  elf_herb: 'Bạn thử phương thuốc mới trên chính mình như mọi lần. Năm {age} tuổi, lần này liều đã sai, và học trò tìm thấy cuốn sổ ghi đến dòng cuối.',
  elf_bard: 'Bài ca của bạn kể một sự thật mà lãnh chúa không muốn ai nhớ. Năm {age} tuổi, bạn không về sau buổi diễn ở lâu đài.',
  elf_guard: 'Năm {age} tuổi, bạn ngã xuống ở Cổng Rễ với bảy vết thương phía trước và không vết nào sau lưng. Cổng vẫn đóng.',
  elf_wood: 'Cành cây thiêng gãy xuống khi bạn đang chọn gỗ dưới tán nó. Năm {age} tuổi, người ta bảo Cây đã tự chọn lấy người thợ của mình.',
  elf_envoy: 'Lá cờ sứ giả không cản được một mũi tên giữa cuộc đàm phán. Năm {age} tuổi, bạn chết trên bàn hòa đàm, và chiến tranh bắt đầu từ đó.',
  demon_dk: 'Năm {age} tuổi, bạn dẫn đợt xung phong cuối cùng vào hàng giáo Thánh Kỵ Sĩ. Chiến thú của bạn quay về trại với bộ yên trống.',
  demon_wl: 'Thứ trong vòng triệu hồi biết tên thật của bạn trước khi bạn biết tên nó. Năm {age} tuổi, nó bước ra, còn bạn bước vào thay.',
  demon_bu: 'Triều đình đổi chủ trong một đêm, và tên bạn nằm trên tờ danh sách sai. Năm {age} tuổi, bạn bị xử ngay trên bậc thềm nha môn.',
  demon_me: 'Món hàng cấm bạn giữ hộ đáng giá hơn mạng bạn. Năm {age} tuổi, người ta tìm thấy sạp của bạn trống trơn, còn bạn nằm dưới quầy.',
  demon_bs: 'Thanh ma khí chưa nguội đã đòi máu, và người gần nhất là kẻ rèn ra nó. Năm {age} tuổi, lò Hỏa Ngục có thêm một tiếng thét.',
  demon_bh: 'Con mồi cuối cùng giỏi nghề này hơn bạn. Năm {age} tuổi, cái bẫy bạn giăng sập xuống chính mình, và hắn lĩnh tiền thưởng treo trên đầu bạn.',
  demon_spy: 'Một câu trả lời sai về tên thánh của mẹ. Năm {age} tuổi, bạn bị thiêu trên quảng trường Sanctus dưới cái tên giả, và không ai ở Ma Giới nhận xác.',
  dwarf_runesmith: 'Hai con rune đối nghịch chạm nhau trên đe. Năm {age} tuổi, xưởng rèn sáng lòa một chớp, và cây búa của bạn găm vào trần đá.',
  dwarf_miner: 'Trần hầm tầng sâu sập không một tiếng báo trước. Năm {age} tuổi, núi giữ bạn lại, và tổ thợ gõ mã tiễn lên vách suốt ba ngày.',
  dwarf_shield: 'Hàng khiên vỡ ở mọi chỗ trừ chỗ bạn đứng. Năm {age} tuổi, bạn ngã xuống cuối cùng, và kẻ địch phải bước qua bạn mới qua được cổng.',
  dwarf_brew: 'Thùng ủ thứ rượu thử nghiệm nổ tung giữa hầm. Năm {age} tuổi, bạn ra đi trong mùi lúa mạch, và cả sảnh nâng vại tiễn một thợ nấu chết đúng nghề.',
  dwarf_eng: 'Nồi hơi không chờ bạn siết xong con ốc cuối. Năm {age} tuổi, cỗ máy lớn nhất bạn từng dựng mang bạn theo.',
  dwarf_carver: 'Khối đá mười tấn trượt khỏi giàn tời. Năm {age} tuổi, bạn nằm lại dưới chính pho tượng mình chưa kịp tạc mặt.',
  dwarf_merchant: 'Viên ngọc bạn mang trong ngực áo đáng giá một mạng người, và có kẻ đã tính đúng như thế. Năm {age} tuổi, bạn không về đến quầy.',
  dwarf_guard: 'Năm {age} tuổi, bạn thổi hồi tù và báo động cuối cùng từ tháp gió rồi ngã xuống cạnh nó. Cả cửa ải kịp đóng cổng.',
  dwarf_hunter: 'Cái rương thứ ba trong căn phòng ấy là Mimic. Năm {age} tuổi, tấm bản đồ của bạn có thêm một dấu thập do người đến sau vẽ.',
};

// ---- the adventurers' guild as each people meets it ----
const guilds = {
  bm_guild: {
    join: ['Chi hội Dawnbreak ở rìa Thảo Nguyên chỉ là một cái lều da lớn và một cột treo móng vuốt. Gã tiếp tân loài người ngần ngừ một nhịp trước khi đưa bạn tấm thẻ đồng hạng F.', 'Bạn ấn dấu vuốt vào sổ bộ thay cho chữ ký. Tấm thẻ hạng F nhỏ xíu trong bàn tay á nhân, nhưng nó nói rằng từ nay bạn được trả công như mọi kẻ khác.'],
    board: ['Tấm bảng nhiệm vụ đóng trên cột lều, giấy da phần phật trong gió Thảo Nguyên. Vài tờ có ghi thêm: “không nhận á nhân”. Vài tờ khác thì chỉ á nhân mới dám nhận.', 'Tiếp tân đẩy cho bạn một xấp việc: “Mũi của ngươi thính hơn bọn ta. Mấy việc này hợp đấy.”', 'Lũ mạo hiểm giả loài người tránh ra khi bạn bước tới bảng. Nhiệm vụ thì không kén người nhận.'],
    failText: 'Bạn trở về chi hội với cái đuôi cụp. Nhiệm vụ thất bại, và sẽ có kẻ nói rằng lẽ ra không nên giao việc cho á nhân.',
    joinMoment: 'Ấn dấu vuốt vào sổ bộ Dawnbreak ở rìa Thảo Nguyên',
  },
  dwarf_guild: {
    join: ['Sảnh Dawnbreak của Dãy Núi Răng Cưa đục thẳng vào vách đá, cạnh quán bia. Lão tiếp tân Dwarf cân thử cánh tay bạn rồi mới chịu đưa tấm thẻ đồng hạng F.', 'Tên bạn được khắc, chứ không viết, lên phiến đá sổ bộ. Dwarf không tin thứ gì viết bằng mực.'],
    board: ['Nhiệm vụ ở đây khắc trên thẻ đá treo móc sắt. Thẻ nào còn bụi là việc khó chưa ai dám gỡ.', 'Lão tiếp tân gõ vại bia xuống bàn: “Hầm sâu, đường xa, trả bằng vàng thật. Lấy hay không?”', 'Tiếng búa từ xưởng bên vọng sang làm rung cả hàng thẻ nhiệm vụ. Bạn đọc chúng giữa hai nhịp búa.'],
    failText: 'Bạn về sảnh tay trắng. Lão tiếp tân lẳng lặng treo lại thẻ nhiệm vụ lên móc, và không rót bia cho bạn.',
    joinMoment: 'Khắc tên lên sổ đá của Dawnbreak tại Răng Cưa',
  },
  elf_guild: {
    join: ['Trạm Dawnbreak ở bìa Đại Ngàn là một căn nhà gỗ của loài người, vội vã và ồn ào. Cô tiếp tân nhìn đôi tai bạn hơi lâu rồi đưa tấm thẻ đồng hạng F như đưa cho một vị khách lạ.', 'Bạn viết tên mình bằng chữ loài người, lần đầu tiên. Tấm thẻ hạng F sẽ mòn trước khi bạn kịp già đi.'],
    board: ['Bảng nhiệm vụ đầy những việc gấp gáp của loài người: trong ba ngày, trước mùa gặt, nội đêm nay. Bạn đọc chúng với sự kiên nhẫn của kẻ sống nghìn năm.', 'Cô tiếp tân đã già đi trông thấy kể từ lần trước bạn đến. Xấp nhiệm vụ cô đưa thì vẫn thế.', 'Một tờ yêu cầu đã ngả vàng trên bảng từ đời tiếp tân trước. Không ai nhận, và nó vẫn chờ.'],
    failText: 'Bạn trở lại trạm tay không. Với loài người, thất bại là chuyện của hôm nay; với bạn, nó sẽ còn được nhớ rất lâu.',
    joinMoment: 'Ghi tên bằng chữ loài người tại trạm Dawnbreak bìa Đại Ngàn',
  },
};

// ---- older death lines told in the same quiet voice as the rest ----
const deathRewrites = {
  violent_hero: 'Một mạo hiểm giả trẻ đi ngang qua, cần chứng tỏ điều gì đó với đồng đội. Bạn là thứ gần nhất trong tầm kiếm.',
  old_goblin: 'Bạn chết già ở tuổi {age}. Trong hang không ai biết phải làm gì với một Goblin chết già, vì chưa từng có.',
  goblin_death_adventurer: 'Năm {age} tuổi, một mạo hiểm giả tập sự chém bạn để lấy đôi tai đổi thưởng. Hắn run tay, và phải chém đến nhát thứ hai.',
  goblin_death_trap: 'Năm {age} tuổi, bạn giẫm phải cái bẫy sắt rỉ do chính mình đặt đêm trước. Bầy tìm thấy bạn lúc sáng và lặng lẽ gỡ lấy cái bẫy.',
  goblin_death_boss: 'Ở tuổi {age}, Tù trưởng đẩy bạn ra trước con Minotaur để cả bầy kịp chạy. Bạn là đứa đứng gần hắn nhất.',
  kobold_death_adventurer: 'Năm {age} tuổi, một mạo hiểm giả mới vào nghề đâm bạn ở rìa Rừng Tân Thủ. Với hắn đó là buổi tập đầu tiên; với bạn là tất cả.',
  kobold_death_collapse: 'Năm {age} tuổi, trần hầm sập xuống đúng chỗ bạn đào. Tổ thợ không dừng tay: ở mỏ, chuyện ấy vẫn xảy ra mỗi tuần trăng.',
  kobold_death_trap: 'Ở tuổi {age}, trí nhớ đã lẫn, bạn bước vào đúng cái bẫy mình gài tháng trước. Cả hang nghe tiếng nổ và hiểu.',
  kobold_death_old: 'Tuổi {age}, bạn nhắm mắt bên chiếc cuốc chim đã mòn vẹt. Ba phần tư lứa của bạn không sống được đến tuổi này.',
  dragon_death_poison: 'Ở tuổi {age}, bạn chết trong giấc ngủ vì thứ độc một kẻ trộm kiên nhẫn đã tẩm vào vàng suốt trăm năm. Hắn không sống để thấy, cháu chắt hắn thì có.',
  troll_death_choke: 'Ở tuổi {age}, cơn đói khiến bạn nuốt thứ không nên nuốt. Thân thể tự lành được mọi vết thương, trừ một cổ họng đã nghẹn kín.',
  troll_troll_death_starve: 'Ở tuổi {age}, bạn mắc kẹt trong một hẻm núi quá hẹp so với thân mình. Không ai nghe thấy, và cơn đói làm nốt phần còn lại.',
  orc_death_old_shame: 'Sống đến {age} tuổi, bạn chết trên giường, không tiếng gươm đao đưa tiễn. Với một Orc, đó là cái chết người ta không hát về.',
  vampire_death_sun: 'Bạn tính sai giờ và bình minh đuổi kịp giữa đường về. Ở tuổi {age}, sau ngần ấy thế kỷ cẩn trọng, chỉ một lần chậm chân là đủ.',
  slime_death_frozen: 'Mùa đông dưới hầm ngục đóng băng bạn ở tuổi {age}. Một bước chân vô ý của kẻ qua đường kết thúc phần còn lại.',
};

// ---- war and dark years reach the trades that carry no weapon ----
const CIVIL = {
  human: { soldier: 'human_mercenary', trades: ['human_farmer', 'human_merchant', 'human_smith', 'human_bard', 'human_scholar', 'human_tamer', 'human_priest'], craft: ['human_smith', 'human_farmer', 'human_merchant'] },
  beastman: { soldier: 'bm_merc', trades: ['bm_leather', 'bm_herder', 'bm_shaman', 'bm_courier', 'bm_mage'], craft: ['bm_leather', 'bm_herder'] },
  dwarf: { soldier: 'dwarf_shield', trades: ['dwarf_runesmith', 'dwarf_miner', 'dwarf_brew', 'dwarf_eng', 'dwarf_carver', 'dwarf_merchant'], craft: ['dwarf_runesmith', 'dwarf_brew', 'dwarf_eng', 'dwarf_miner'] },
  elf: { soldier: 'elf_guard', trades: ['elf_merchant', 'elf_herb', 'elf_bard', 'elf_wood', 'elf_envoy', 'elf_spirit'], craft: ['elf_herb', 'elf_wood', 'elf_merchant'] },
  demon: { soldier: 'demon_dk', trades: ['demon_bu', 'demon_me', 'demon_bs', 'demon_wl'], craft: ['demon_bs', 'demon_me'] },
};
const DRAFT = {
  human: ['Trống trưng binh nổi lên ở quảng trường. Viên sĩ quan đọc tên từng nhà, và tên bạn nằm trong sổ: mỗi phường nghề phải nộp một người cầm giáo ra Tuyến Đầu.', 'Xin miễn vì đang nuôi cả nhà bằng nghề', 'Viên sĩ quan nghe hết, gạch tên bạn và ghi sang một khoản thuế chiến tranh. Bạn ở lại với nghề, nghèo đi trông thấy.', 'Lời xin bị gạt đi. Bạn ở lại được, nhưng lính đến lấy gần hết những gì trong nhà gọi là “đóng góp”.', 'Nhận giáo, lên đường ra Tuyến Đầu', 'Bạn cất đồ nghề vào hòm, khóa lại, và nhận một cây giáo cùng tấm áo vải dày. Nghề cũ sẽ phải chờ, nếu bạn còn về.', 'Bỏ tiền thuê người đi thay', 'Một gã lính đánh thuê nhận túi bạc và cái tên của bạn. Bạn mua được sự yên ổn bằng gần hết của để dành.'],
  beastman: ['Sứ giả của liên minh bộ lạc cắm một ngọn giáo đỏ giữa trại: mỗi lều phải góp một chiến binh cho mùa chinh chiến. Lều của bạn chỉ có bạn đủ tuổi.', 'Xin ở lại vì bầy cần người làm nghề', 'Trưởng lão cân nhắc, rồi cho bạn ở lại. Đổi lại, phần thịt mùa đông của lều bạn bị cắt cho lính.', 'Trưởng lão không nghe. Bạn ở lại được, nhưng cả trại nhìn bạn như kẻ trốn giáo.', 'Rút ngọn giáo đỏ, đi theo đoàn quân', 'Bạn trao đồ nghề cho đứa nhỏ trong lều và cầm lấy ngọn giáo. Thương hội Sói Bạc trả công cho bất cứ á nhân nào chịu đứng hàng đầu.', 'Nộp gia súc và da thuộc thay người', 'Đoàn quân dắt đi nửa số bạn có. Bạn giữ được mạng và cái nghề, không giữ được gì nhiều hơn.'],
  dwarf: ['Tù và chiến tranh thổi từ Cổng Sắt. Hội đồng ra lệnh mỗi phường thợ cử một người vào hàng khiên, và phường của bạn rút thăm trúng tên bạn.', 'Xin Hội đồng cho ở lại xưởng', 'Hội đồng chấp thuận, với điều kiện xưởng của bạn làm không công cho quân đội đến hết chiến sự.', 'Hội đồng bác đơn. Bạn ở lại được nhờ một lời nói đỡ, và nợ gia tộc ấy một món lớn.', 'Nhận khiên, vào hàng quân', 'Bạn treo tạp dề lên móc, cầm lấy tấm khiên có huy hiệu gia tộc. Lò của bạn sẽ nguội cho đến ngày bạn về.', 'Nộp vàng thế thân theo luật cũ', 'Luật Dwarf cho phép nộp vàng thay máu. Bạn đếm ra gần hết vốn liếng, và không ai chê trách.'],
  elf: ['Ma tộc đã đến sát bìa rừng. Hội đồng Trưởng Lão kêu gọi mỗi dòng họ cử một người ra Cổng Rễ, và ánh mắt cả họ dừng lại ở bạn.', 'Xin tiếp tục phụng sự rừng bằng nghề của mình', 'Hội đồng gật đầu, rồi giao cho bạn gấp đôi phần việc để nuôi những người ra trận.', 'Không ai ép, nhưng cũng không ai còn mời bạn dự hội mùa. Sự im lặng của Elf kéo dài rất lâu.', 'Nhận khiên, ra Cổng Rễ', 'Bạn gói đồ nghề trong lá khô, cất vào hốc cây, và nhận tấm khiên vỏ cây ngàn tuổi. Elf không vội, nhưng chiến tranh thì có.', 'Dâng ma tinh và thuốc men thay người', 'Bạn dâng gần hết kho của mình cho Hộ Vệ. Hội đồng ghi nhận, và bạn bắt đầu lại từ đầu.'],
  demon: ['Hiệu lệnh của Ma Vương đốt đỏ bầu trời Vực Thẳm: mọi Demon không mang vũ khí phải trình diện Quân đoàn. Viên quan tuyển quân đã đứng trước cửa.', 'Chứng minh mình có ích hơn khi ở hậu phương', 'Viên quan tính toán rồi cho bạn ở lại, miễn là nộp đủ phần cung ứng gấp ba cho Quân đoàn.', 'Hắn không tin. Bạn thoát được nhờ đút lót, và mất nhiều hơn dự tính.', 'Mặc giáp đen, nhập Quân đoàn', 'Bạn bỏ lại sổ sách và sạp hàng, nhận một bộ giáp chưa vừa người. Ở Ma Giới, từ chối Ma Vương hiếm khi là một lựa chọn.', 'Mua một tấm thẻ miễn dịch ở chợ đen', 'Tấm thẻ là thật, giá của nó cũng thật. Bạn gần như trắng tay, nhưng còn nguyên sừng.'],
};
const REQUISITION = {
  human: ['Quân nhu đến tận nơi bạn làm việc với một tờ lệnh đóng dấu đỏ: xưởng, kho và hàng hóa của bạn được trưng dụng cho chiến tranh, trả bằng giấy hẹn.', 'Giao nộp, giữ lấy giấy hẹn', 'Bạn nhìn lính khuân đi những gì mình gây dựng. Tờ giấy hẹn nằm trong ngăn kéo, có lẽ mãi mãi.', 'Giấu đi một nửa trước khi họ kiểm kê', 'Viên quân nhu đếm qua loa rồi đi. Phần giấu được đủ để bạn không phải bắt đầu lại từ số không.', 'Viên quân nhu biết đếm. Bạn mất cả phần giấu lẫn một khoản phạt.'],
  beastman: ['Đoàn quân của liên minh dừng ở trại và chỉ tay vào những gì bạn có: da thuộc, gia súc, lương khô. “Chiến binh cần hơn ngươi.”', 'Giao cho họ', 'Họ lấy gần hết. Trưởng lão hứa sẽ nhớ công lều bạn khi chia chiến lợi phẩm, nếu có chiến lợi phẩm.', 'Lùa bớt gia súc vào khe núi trong đêm', 'Sáng ra đoàn quân chỉ thấy một bầy gầy guộc. Phần bạn giấu được nuôi cả lều qua mùa đông.', 'Trinh sát của đoàn quân lần ra khe núi. Họ lấy tất cả, và trói bạn một đêm cho biết lệ.'],
  dwarf: ['Hội đồng niêm phong xưởng của bạn bằng sáp đỏ: từ hôm nay mọi lò, mọi kho, mọi thợ đều làm cho chiến tranh.', 'Mở xưởng cho quân đội', 'Xưởng của bạn rèn giáo thay vì thứ nó vẫn làm. Không có lãi, chỉ có danh dự và một tờ biên nhận.', 'Giữ lại lô hàng tốt nhất dưới hầm', 'Lô hàng nằm yên dưới ba lớp đá. Khi chiến sự qua đi, nó sẽ là vốn để bạn đứng dậy.', 'Thanh tra của Hội đồng gõ vào nền và nghe tiếng rỗng. Bạn mất lô hàng và mất mặt với cả phường.'],
  elf: ['Hộ Vệ đến xin, theo cách Elf xin: không từ chối được. Vườn, kho và tay nghề của bạn từ nay phục vụ Cổng Rễ.', 'Dâng tất cả cho rừng', 'Những gì bạn chăm bẵm hàng trăm năm đi ra tiền tuyến trong một mùa. Rừng còn, bạn tự nhủ, thì sẽ trồng lại được.', 'Giữ lại hạt giống và mẫu vật quý nhất', 'Bạn giấu chúng trong một hốc cây chỉ mình biết. Chiến tranh nào rồi cũng hết; giống cây thì không tự mọc lại.', 'Một Hộ Vệ trẻ tìm thấy hốc cây. Không ai phạt bạn, và ánh mắt họ còn nặng hơn hình phạt.'],
  demon: ['Quân đoàn đóng dấu sắt nung lên cửa sạp của bạn: mọi thứ bên trong giờ thuộc về Ma Vương, kể cả sổ nợ.', 'Giao nộp không một lời', 'Chúng dọn sạch trong một canh giờ. Bạn còn lại cái sạp trống và cái đầu trên cổ.', 'Tuồn hàng quý sang chợ đen trước một đêm', 'Hàng đi trót lọt. Khi chiến tranh qua, bạn sẽ là một trong số ít kẻ còn vốn.', 'Kẻ nhận hàng bán đứng bạn. Quân đoàn lấy cả hàng lẫn một ngón tay của bạn.'],
};

function install(data) {
  const job = (id) => data.jobs.find((j) => j.id === id);
  for (const [id, flags] of Object.entries(originTrades)) {
    const j = job(id);
    if (!j) continue;
    j.alt = Object.assign({ hint: 'có xuất thân / dấu ấn phù hợp' }, j.alt, { anyFlags: [...new Set([...((j.alt && j.alt.anyFlags) || []), ...flags])] });
  }
  for (const [id, lines] of Object.entries(promo)) {
    const j = job(id);
    if (!j) continue;
    j.promoAlt = j.promo.map((t, i) => (lines[i] ? [P + lines[i]] : [t]));
  }
  // a trade whose own trials replace the shared wording shows them wherever its trials are read
  for (const j of data.jobs) if (j.promoAlt && j.promoAlt.every((list) => list.length && !list.includes(j.promo[j.promoAlt.indexOf(list)]))) j.promo = j.promoAlt.map((list) => list[0]);
  for (const [id, [low, high]] of Object.entries(quiet)) { const j = job(id); if (j) j.quietByRank = { low, high }; }
  let n = 0;
  for (const [id, text] of Object.entries(workDeaths)) {
    const j = job(id);
    if (j) data.deaths.push({ id: `end_work_${++n}`, kind: 'violent', kinds: ['violent'], races: j.races, text, require: { job: id }, weight: 3 });
  }
  for (const [id, copy] of Object.entries(guilds)) {
    const o = data.orgs.find((x) => x.id === id);
    if (!o) continue;
    o.join = copy.join; o.failText = copy.failText; o.joinMoment = copy.joinMoment;
    o.board = Object.assign({}, o.board, { text: copy.board });
  }
  for (const d of data.deaths) if (deathRewrites[d.id]) d.text = deathRewrites[d.id];
  for (const [race, cfg] of Object.entries(CIVIL)) {
    const d = DRAFT[race], r = REQUISITION[race];
    data.events.push({
      id: `era_draft_${race}`, _file: 'life-texture', pack: true, races: [race], eras: ['holy_war', 'demon_lord'], stages: ['adult', 'middle'], weight: 30,
      require: { job: cfg.trades, free: true }, text: d[0],
      choices: [
        { label: d[1], check: { stat: 'INT', target: 6 }, success: { text: d[2], effects: { wealth: -10, joy: -3 } }, fail: { text: d[3], effects: { wealth: -20, joy: -8, fame: -2 } } },
        { label: d[4], text: d[5], effects: { setJob: cfg.soldier, joy: -5, fame: 3 }, moment: 'Bỏ nghề cũ, cầm vũ khí khi chiến tranh gọi tên' },
        { label: d[6], require: { wealth: 25 }, showLocked: true, text: d[7], effects: { wealth: -25 } },
      ],
    });
    data.events.push({
      id: `era_requisition_${race}`, _file: 'life-texture', pack: true, races: [race], eras: ['holy_war', 'dark_age', 'demon_lord'], stages: ['adult', 'middle', 'elder'], weight: 24,
      require: { job: cfg.craft, free: true, jobRank: 1 }, text: r[0],
      choices: [
        { label: r[1], text: r[2], effects: { wealth: -18, fame: 3, joy: -6 } },
        { label: r[3], check: { stat: 'LUCK', target: 6 }, success: { text: r[4], effects: { wealth: -6, joy: 2 } }, fail: { text: r[5], effects: { wealth: -26, fame: -3, joy: -8 } } },
      ],
    });
  }
}

module.exports = { install, originTrades, promo, quiet, workDeaths, guilds, deathRewrites };
