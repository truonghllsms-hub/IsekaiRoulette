// What a long life meets more than once is told as a return, not as the same page read again.
// `again` maps the option taken the time before (a, b, c — in the order the choices are written) to the
// opening of the 2nd and 3rd meeting; `any` is used when no option was recorded. `maxTimes` caps a life.
// Installed by tools/load.js after the epoch events exist.

// The epoch chronicles shared by Dragon, High Demon and Vampire: a = held the line at a cost,
// b = forced the outcome, c = stepped back and let the age decide.
const epoch = {
  successor: {
    a: ['Người thừa kế năm xưa đã già, và đứa cháu của họ đứng ở cửa lãnh địa. Nó lớn lên nhờ kho lương bạn mở ra năm ấy, và giờ đến xin chính bạn một điều khó hơn: được tự cai quản.', 'Dòng họ ấy đã ba đời giữ lời thề với bạn. Lần này họ không xin gì cả. Họ đến để trả lại lời thề, vì không còn ai trong nhà nhớ nó bắt đầu từ đâu.'],
    b: ['Người thừa kế bạn ép quỳ năm ấy đã chết trong tủi nhục. Con trai của hắn đến, cúi đầu thấp hơn cả cha mình, và bạn đọc được trong mắt nó một mối hận được nuôi cẩn thận.', 'Lời thề bạn ép buộc vẫn còn hiệu lực, nhưng chẳng ai tin nó nữa. Người thừa kế mới quỳ xuống theo nghi lễ, và cả triều thần nhìn ra cửa sổ.'],
    c: ['Lần trước bạn để họ tự quyết, và họ đã chọn sai. Người thừa kế mới mang đến một vùng đất tan hoang và câu hỏi: lần này bạn có còn đứng ngoài không?', 'Không ai còn nhớ lãnh địa từng có chủ nhân. Một người thừa kế trẻ tình cờ đọc được tên bạn trong kho lưu trữ, và đến hỏi xem chuyện ấy có thật không.'],
  },
  frontier: {
    a: ['Ranh giới bạn định lại năm xưa đã thành một con đường buôn. Hai bên giờ tranh nhau quyền thu thuế trên đó, và cả hai đều viện tên bạn.', 'Những cột mốc bạn cắm đã mọc rêu, rồi bị dời đi từng tấc một. Bạn bay ngang và nhận ra biên giới đã lệch hẳn sang một bên, lặng lẽ như một lời nói dối được lặp lại đủ lâu.'],
    b: ['Vùng đất bạn chiếm năm ấy vẫn mang tên bạn trên bản đồ, nhưng dân ở đó chưa từng gọi tên ấy. Một cuộc nổi dậy đang nhóm, và lá cờ của nó vẽ hình bạn bị xiềng.', 'Phía bị thua năm xưa đã gây dựng lại. Họ không đòi đất nữa; họ đòi bạn thừa nhận rằng đã có lúc mình sai.'],
    c: ['Lần trước bạn đứng ngoài, và hai bên đã chia nhau vùng đất bằng một cuộc chiến. Giờ con cháu của họ lại đứng đúng chỗ tấm bia cũ, với những thanh kiếm mới.', 'Không ai còn chờ bạn phân xử. Hai vương quốc đã tự ký một hòa ước, và họ mời bạn đến chỉ để làm chứng.'],
  },
  famine: {
    a: ['Những hạt giống bạn cứu năm đói kém đã thành cánh đồng trải tới chân trời. Một vùng đất khác đang đói, và họ đã nghe kể về con Rồng từng mở kho.', 'Vùng đất ấy giàu lên nhờ kho lương của bạn, rồi giàu đến mức quên mất. Năm nay mất mùa, và họ đến xin lần nữa, lần này kèm theo một hợp đồng.'],
    b: ['Bạn ép cống nạp trong năm đói, và vùng ấy đã chết một nửa. Nửa còn lại vẫn nộp đủ, đúng hạn, không bao giờ trễ một ngày. Bạn thấy thứ đó còn lạnh hơn lòng căm hận.', 'Năm nay lại mất mùa. Không sứ giả nào đến xin cả. Họ đã học được rằng xin bạn thì vô ích.'],
    c: ['Lần trước bạn để họ tự xoay xở. Họ đã sống được, nghèo hơn nhưng tự chủ, và lần này họ đến để chia cho bạn một phần mùa màng chứ không phải để xin.', 'Họ tự qua được mùa đói năm ấy và lập một kho chung không cần đến bạn. Kho ấy giờ cũng đang cạn.'],
  },
  vault: {
    a: ['Bảo vật bạn trả về cho ký ức chung đã thành một biểu tượng. Có kẻ muốn lấy nó làm cờ cho một cuộc chiến, và hắn tin rằng bạn sẽ đứng về phía mình.', 'Người canh kho mới, hậu duệ của người cũ, đến báo rằng bảo vật đã bị đánh cắp. Kẻ trộm để lại một lời nhắn gửi đích danh bạn.'],
    b: ['Bí mật trong bảo vật bạn giữ riêng giờ đã thành lời đồn. Mỗi thế hệ lại có một kẻ đến hang ổ, tin rằng bạn đang giấu vũ khí có thể diệt cả loài Rồng.', 'Một học giả trẻ ghép lại được nửa bí mật mà bạn đã chôn. Nửa còn lại ở trong tay bạn, và cô ta biết điều đó.'],
    c: ['Bảo vật bạn để lại đã qua tay ba triều đại. Triều đại thứ tư đang dùng nó để chứng minh mình là chính thống, và câu chuyện họ kể về nó sai gần hết.', 'Không ai giữ bảo vật ấy nữa. Nó nằm trong một cửa tiệm đồ cổ, giá bằng một con ngựa.'],
  },
  champion: {
    a: ['Dũng Giả lần trước bị chặn ngoài khu dân cư đã kể lại với con cháu rằng bạn không giết ai không cần giết. Người đến lần này mang thanh kiếm ấy, nhưng hạ nó xuống khi đứng trước bạn.', 'Thanh kiếm của dòng Dũng Giả lại xuất hiện. Lần này người cầm nó không thách đấu; cô ta đến để hỏi vì sao tổ tiên mình còn sống sau khi gặp bạn.'],
    b: ['Biểu tượng bạn phá năm ấy đã được dựng lại, to hơn, sáng hơn, và giờ được rước theo mọi đạo quân thảo phạt. Bạn đã tạo ra chính thứ mình định xóa.', 'Kẻ đến lần này không mang kiếm. Hắn mang danh sách những người đã chết khi bạn phá biểu tượng năm xưa, đọc to từng tên một.'],
    c: ['Lần trước bạn đứng ngoài, và Dũng Giả ấy đã thắng một trận không phải của mình. Người kế tục giờ tin rằng bạn đã sợ.', 'Không còn Dũng Giả nào đến nữa. Thay vào đó, một nhà thờ dựng tượng kẻ đã "đánh đuổi" bạn, và bạn không nhớ nổi mình từng bị đánh đuổi.'],
  },
  crusade: {
    a: ['Đường tiếp tế bạn cắt năm xưa giờ là một thị trấn. Dân ở đó coi bạn là thánh bảo hộ, và một đạo quân mới đang đến để thiêu nó vì chính lý do ấy.', 'Đạo quân qua đèo lần này chỉ là một nhóm lính già. Họ là những người sống sót sau lần bạn chặn đường, và họ đến để xin được đi qua về quê.'],
    b: ['Lần trước bạn đánh tan đạo quân, và con đèo vẫn còn đầy xương. Đạo quân mới dừng lại trước bãi xương ấy rất lâu trước khi tiến lên.', 'Những người sống sót năm xưa đã lập một dòng tu chỉ nhằm một việc: chống lại bạn. Họ kiên nhẫn hơn mọi đạo quân.'],
    c: ['Bạn để đạo quân năm ấy đi qua, và nó đã chiếm cả vùng thung lũng. Giờ chính vương triều ấy xin bạn đứng chắn đèo cho họ.', 'Con đèo đã có một pháo đài do loài người xây, không cần đến bạn. Lính gác ở đó không biết rằng ngọn núi phía sau có chủ.'],
  },
  awakening: {
    a: ['Thành trì bạn buộc dừng nghi thức năm xưa đã giữ lời. Nhưng một phe trong thành tin rằng bạn chỉ trì hoãn chứ không ngăn được, và họ bắt đầu lại trong bí mật.', 'Phong ấn cũ yên ổn. Người canh giữ nó mời bạn đến xem lại lần cuối trước khi trao trách nhiệm cho một thế hệ chưa từng thấy bạn.'],
    b: ['Thành trì bạn san phẳng năm ấy vẫn là đống đổ nát. Những người sống quanh đó kể cho con cháu về ngày bầu trời giáng xuống, và phong ấn dưới đống đá lại đang rung.', 'Bạn nghiền nát nguồn tai họa cùng một phần thành trì. Phần còn lại giờ là một thành phố nhỏ, và tiếng chuông báo nạn lần này là của chính họ gọi bạn.'],
    c: ['Lần trước bạn để họ tự giải quyết. Phong ấn đã vỡ một nửa, và thứ bên dưới học được tên bạn trong lúc thoát ra.', 'Họ tự đóng được phong ấn, trả bằng nhiều mạng người. Tiếng chuông lần này không gọi bạn; nó tiễn những người đã chết.'],
  },
  godfeud: {
    a: ['Giới hạn bạn dựng giữa các thực thể cổ đã đứng vững nhiều thế kỷ. Giờ một trong hai bên gửi sứ giả đến, không để đánh, mà để mặc cả về chính giới hạn ấy.', 'Vết nứt cũ đã liền. Ở chỗ ấy mọc lên một khu rừng lạ, và những người sống trong đó thờ bạn như kẻ đã khâu lại bầu trời.'],
    b: ['Chỗ đứng bạn giành được giữa các thực thể cổ có giá: vùng đất bị xé rách năm xưa vẫn chưa lành. Một thực thể khác đánh hơi thấy chỗ yếu ấy.', 'Thực thể bạn đánh lui đã trở lại, không còn giận dữ, chỉ còn kiên nhẫn. Nó nhắc bạn rằng mình có nhiều thời gian hơn bạn.'],
    c: ['Bạn đứng ngoài cuộc chiến của các thực thể cổ, và ba vương quốc đã thành chiến trường. Những kẻ sống sót không quên ai đã có thể ngăn mà không ngăn.', 'Cuộc chiến cũ tự kết thúc theo cách của nó. Một vết nứt mới mở ra, và lần này các thực thể cổ hỏi ý bạn trước.'],
  },
  core: {
    a: ['Lõi ma lực bạn hòa nhịp năm xưa vẫn đập đều. Những vùng đất nó nuôi đã đông dân hơn, và họ bắt đầu đào sâu để tìm nguồn của sự trù phú.', 'Nhịp đập dưới nền đá lại đổi. Lần này nó không gọi bạn; nó đang yếu đi, và bạn là kẻ duy nhất còn nhớ nó từng khỏe thế nào.'],
    b: ['Lõi ma lực bạn hút cạn một nửa đã để lại một vùng đất chết. Giờ một nhịp đập mới vang lên ở nơi khác, và những kẻ sống quanh đó đã nghe kể về vùng đất chết kia.', 'Quyền năng bạn lấy năm ấy vẫn còn trong người. Thứ bạn để lại là khoảng trống, và trong khoảng trống ấy có gì đó đã bắt đầu tự sinh ra.'],
    c: ['Lần trước bạn để lõi ma lực yên. Một vương quốc loài người đã tìm thấy nó, và giờ ma lực của nó đang chạy qua những cỗ máy bạn chưa từng thấy.', 'Lõi ma lực tự ổn định sau nhiều thế kỷ. Nhưng những sinh vật mọc lên quanh nó không giống bất cứ thứ gì bạn từng biết.'],
  },
  archive: {
    a: ['Ký ức bạn khôi phục năm xưa đã vào sách giáo khoa, rồi bị viết lại hai lần. Một bia ký mới được đào lên, và lần này nó nói rằng chính bạn mới là kẻ nói dối.', 'Người ta lập một thư viện quanh tấm bia bạn từng giải nghĩa. Người giữ thư viện xin bạn đọc lại nó một lần nữa, vì họ sợ mình đã hiểu sai.'],
    b: ['Bí thuật bạn giữ riêng năm ấy đã thất truyền khắp thế gian, trừ trong trí nhớ của bạn. Một học giả loài người tìm đến hang ổ, mang theo những mảnh vụn ghép được, và xin phần còn lại.', 'Không ai còn biết lịch sử thật ngoài bạn. Một vương triều đang dựa vào phiên bản sai để biện minh cho chiến tranh.'],
    c: ['Bạn để người đời tự viết lịch sử, và họ đã viết một câu chuyện trong đó bạn là quái vật. Một bia ký mới hé lộ rằng họ biết đó không phải sự thật.', 'Những ghi chép năm xưa đã mục. Lịch sử giờ chỉ là lời kể, và lời kể nào cũng có tên bạn ở một vai khác.'],
  },
  astral: {
    a: ['Những điểm neo bạn gia cố năm xưa vẫn giữ, nhưng bầu trời đã quen với chúng và đang tìm cách khác để lệch đi.', 'Một nhà thiên văn loài người vẽ được bản đồ các điểm neo của bạn, và gọi chúng là "những cái đinh của Chúa". Hắn muốn biết ai đã đóng chúng.'],
    b: ['Pháp tắc bạn bẻ cong năm ấy đã để lại một vết. Mỗi mùa hè, sao rơi đúng chỗ ấy, và người ta dựng đền ở đó.', 'Quyền năng bạn lấy từ triều ma lực đã khiến một vùng trời tối hẳn. Ở bên dưới, có những người chưa từng thấy sao.'],
    c: ['Lần trước bạn để mặc, và sự cân bằng đã tự tìm điểm mới, thấp hơn và lạnh hơn. Những mùa đông giờ dài thêm một tháng.', 'Bầu trời đã ổn định theo cách của nó. Những đường sáng sai vị trí giờ có tên, có truyền thuyết, và có cả những người sinh ra dưới chúng.'],
  },
  seed: {
    a: ['Những người bạn trao quyền gìn giữ năm ấy đã thành một hội. Hội ấy giờ chia rẽ, mỗi phe đều tin mình hiểu đúng ý bạn.', 'Hạt giống bạn chia cho nhiều người đã mọc thành nhiều thứ khác nhau. Có thứ nuôi sống cả thành phố, có thứ thành vũ khí.'],
    b: ['Quyền năng bạn giữ cho riêng mình năm ấy vẫn chưa ai chạm tới được. Những kẻ thèm muốn nó đã đổi từ cướp sang cầu xin, rồi sang thờ phụng.', 'Bạn gieo hạt giống cho riêng mình, và nó đã lớn trong bạn. Lần này nó bắt đầu đòi hỏi.'],
    c: ['Bạn không gieo gì cả, và một kẻ khác đã gieo thay. Thời đại mới mang dấu ấn của hắn, không phải của bạn.', 'Thế hệ năm ấy đã tự tìm ra hạt giống của riêng mình. Họ mang nó đến cho bạn xem, như học trò mang bài làm đến cho thầy.'],
  },
};

// The generations a Dwarf, Demon or Elf outlives: a = told the story and shared the charge, b = kept it alone.
const generation = {
  heirs: { a: ['Đứa trẻ năm ấy nhận tín vật từ tay bạn đã thành người già. Cháu nó mang tín vật trở lại, và lần này nó không hỏi vì sao bạn còn ở đây; nó hỏi bạn có muốn nó giữ tiếp không.'], b: ['Bạn giữ di sản một mình, và dòng họ kia đã quên dần. Người đến lần này chỉ biết họ của mình từng gắn với một cái tên nào đó trong sổ cũ.'] },
  kingdom: { a: ['Vương quốc bạn kể chuyện cho sứ giả nghe năm xưa đã sụp. Sứ giả của triều đại mới lại đến, và mang theo cuốn sử ghi lời kể của bạn như một nguồn tư liệu.'], b: ['Một vương quốc nữa đổi cờ. Bạn đã thôi ghi nhớ tên các triều đại; bạn chỉ còn nhớ những người tử tế trong số họ.'] },
  craft: { a: ['Thế hệ bạn trao công trình năm ấy đã hoàn tất nó, theo một cách bạn không ngờ. Họ mời bạn đến xem, và lo lắng chờ bạn nói một lời.'], b: ['Bạn giữ công trình cho riêng mình, và nó vẫn dang dở. Lũ trẻ trong vùng giờ gọi nó là "cái nhà của người không bao giờ xong".'] },
  memory: { a: ['Kỷ vật bạn để lại năm xưa giờ được giữ trong một ngôi nhà nhỏ, có người lau chùi mỗi tuần. Họ không biết nó từng của ai, nhưng biết nó quan trọng.'], b: ['Bạn giữ kỷ vật cuối cùng cho riêng mình. Nơi quen thuộc giờ đã thành một con đường lát đá, và chỉ còn bạn biết bên dưới từng có gì.'] },
};

// Trying a change of form again is not sitting the same test again.
const RETRY = {
  slime: ['Lõi của bạn còn hằn vết nứt từ lần biến đổi trước. Lần này bạn không lao vào ngay: bạn ngâm mình trong mạch nước khoáng suốt một mùa cho lõi liền lại, rồi mới thử lại, theo một cách khác.', 'Bạn đã thất bại ở đúng chỗ này hai lần. Lần này bạn nuốt trước một mảnh vỏ của chính lần hỏng trước, để cơ thể nhớ chỗ nào đã vỡ.', 'Không còn đủ vật liệu như lần đầu. Bạn phải biến đổi bằng những gì gom được trong hang, ít hơn, kém hơn, và bạn biết rõ điều đó.'],
  orc: ['Vết bỏng từ cơn bão lần trước vẫn còn trên ngực bạn. Lần này shaman già không để bạn đứng giữa trời: lão bắt bạn uống thứ thuốc đắng và chờ sét đánh đúng lúc.', 'Bộ lạc đã thấy bạn ngã hai lần. Lần này không ai reo hò; họ chỉ đứng xa mà nhìn, chờ xem bạn ngã hay đứng.', 'Cơ thể bạn nhớ cơn đau. Lần này bạn không gồng: bạn để năng lượng chảy qua như nước qua đá, theo cách một Orc già đã chỉ.'],
  goblin: ['Lần biến đổi trước suýt xé bạn làm đôi. Lần này bạn ăn no hơn, ngủ đủ hơn, và lén lấy thêm một miếng thịt của Tù trưởng trước khi thử.', 'Cả bầy nhớ lần trước bạn gào thế nào. Lần này bạn trốn vào sâu trong hang mà thử, một mình.'],
  kobold: ['Vảy bạn vẫn còn bong từng mảng từ lần trước. Lần này bạn nằm cạnh lò lưu huỳnh cả tuần cho vảy cứng lại rồi mới thử.', 'Bạn biết lần này là lần cuối mình còn đủ sức. Bạn chọn đúng đêm tổ đào ngủ say, để không ai thấy nếu bạn ngã.'],
  lizardman: ['Lớp vảy cũ vẫn chưa lột hết từ lần trước. Lần này bạn ngâm mình trong bùn nóng ba ngày cho vảy mềm rồi mới bước vào nghi lễ.', 'Tư tế đã thấy bạn thất bại. Lần này bà ta không đọc kinh cho bạn; bà bảo bạn tự đọc.'],
  minotaur: ['Sừng bạn còn nứt từ nghi lễ trước. Lần này bạn bó nó bằng đai đồng, và đi vào mê cung bằng một lối khác.', 'Lần này bạn không mang theo vũ khí. Lần trước bạn thua chính vì tin vào nó.'],
  troll: ['Da bạn còn lốm đốm vệt đá từ lần trước, những chỗ chưa kịp lành. Lần này bạn ăn đủ nấm đá rồi mới ngồi vào vòng.', 'Bạn quên mất mình đã thử bao nhiêu lần. Nhưng cơ thể thì nhớ, và lần này nó chậm lại đúng chỗ đã vỡ.'],
  vampire: ['Lần nghi thức trước đã đốt cạn nửa máu dự trữ của bạn. Lần này bạn chờ tròn trăm năm, tích đủ máu từ những người tình nguyện, rồi mới thắp nến.', 'Trưởng lão đã thấy bạn thất bại, và lần này ông ta đứng trong vòng tròn cùng bạn.'],
  dragon: ['Vảy ở ngực bạn chưa mọc lại sau lần thăng hoa trước. Lần này bạn nằm trên long mạch đủ một thế kỷ trước khi thử.', 'Lần này bạn không bay lên đỉnh núi. Bạn xuống lòng núi lửa, nơi lần trước bạn đã sợ.'],
  high_demon: ['Chân danh của bạn còn rạn từ lần trước. Lần này bạn tự khắc lại từng nét trước khi để Vực Thẳm nhìn vào nó.', 'Lần này bạn không gọi Vực Thẳm. Bạn đi xuống nó.'],
};

// Quiet years of an Elf at rest, and of the endless lives, beyond the few lines they had.
const restElf = [
  'Bạn trồng một cây sồi non trước hiên, và ngồi xem nó cao ngang vai mình.',
  'Một con chim sẻ làm tổ trên vai tượng gỗ bạn tạc từ thời còn trẻ. Bạn đợi lứa chim non rời tổ rồi mới phủi bụi cho pho tượng.',
  'Bạn học lại một bài hát ru mà mẹ từng hát, và nhận ra mình đã quên câu thứ ba.',
  'Bạn dọn lại căn phòng của một người bạn loài người đã mất từ lâu. Đồ đạc vẫn nằm đúng chỗ cũ, chỉ có lớp bụi là mới.',
  'Bạn đọc lại những bức thư cũ, và ngạc nhiên vì nét chữ của chính mình hồi trẻ vội vã đến thế.',
  'Một mùa mưa dài. Bạn ngồi đếm vòng nước loang trên mặt hồ, và lần đầu tiên sau nhiều thế kỷ không thấy mình cần làm gì cả.',
  'Lũ trẻ Elf trong làng xin bạn kể chuyện. Bạn kể chuyện có thật, và chúng tưởng là truyền thuyết.',
  'Bạn đi dọc suối đến tận chỗ nó đổ vào sông, việc bạn định làm từ ba trăm năm trước.',
];
const trainElf = [
  'Bạn tập bắn trong mưa suốt một mùa, cho đến khi tiếng mưa thôi làm bạn lệch tay.',
  'Một Elf trẻ xin tập cùng bạn mỗi sáng. Đến mùa thứ ba, nó bắn trúng một mũi tên bạn bắn trượt.',
  'Bạn tập đứng yên trên một cành cây mảnh suốt một ngày, rồi một tuần, rồi một mùa.',
  'Bạn học lại thế kiếm từ một cuốn sách loài người viết về chính tộc Elf, và thấy họ hiểu sai gần hết.',
  'Đôi tay vẫn nhanh như thời trẻ, nhưng bạn bắt đầu tập chậm lại, để thấy những gì ngày trước mình bỏ qua.',
];
const deepExtra = {
  dragon: ['Một ngôi làng mọc lên dưới chân núi bạn nằm. Lũ trẻ ở đó đặt tên cho ngọn núi, mà không biết nó đang thở.', 'Bạn mơ thấy những Rồng cùng thời đã khuất, và tỉnh dậy thấy mình đã ngủ qua một triều đại.', 'Một người chăn dê lạc vào hang và ngủ quên dựa lưng vào bạn suốt đêm. Hắn không bao giờ biết.'],
  high_demon: ['Những Ma Tướng từng quỳ trước bạn đã có con cháu quỳ trước người khác. Bạn nhìn từ xa và không can thiệp.', 'Bạn đổi tên mình một lần nữa, vì cái tên cũ đã thành lời nguyền trong miệng phàm nhân.', 'Vực Thẳm sâu thêm một tầng. Bạn xuống xem, và không thấy gì đáng để ở lại.'],
};

function install(data) {
  const picks = ['a', 'b', 'c', 'd'];
  for (const e of data.events) {
    const m = /^epoch_(dragon|high_demon|vampire)_(\w+)$/.exec(e.id);
    const g = /^generation_(dwarf|demon|elf)_(\w+)$/.exec(e.id);
    const lines = m ? epoch[m[2]] : g ? generation[g[2]] : null;
    if (!lines) continue;
    (e.choices || []).forEach((ch, i) => { ch.pick = picks[i]; });
    e.again = lines;
    e.maxTimes = 3;
  }
  for (const e of data.events) {
    if (e.once !== false || !/_evo_/.test(e.id)) continue;
    const race = (e.races || [])[0];
    if (RETRY[race]) e.again = { any: RETRY[race] };
  }
  // a Dragon's egg and a High Demon's emanation are rare, and each is remembered when it comes again
  const egg = data.events.find((e) => e.id === 'epoch_dragon_mating_egg');
  if (egg) { egg.maxTimes = 3; egg.again = { any: ['Một Rồng khác, con của quả trứng năm xưa, giờ đã đủ lớn để tự tìm bạn đời. Nó đến hỏi ý bạn trước, như cách người ta hỏi ý một bậc trưởng lão.', 'Long mạch nơi bạn từng ấp trứng giờ đã nguội. Một Rồng cùng huyết mạch đề nghị một long mạch mới, xa hơn, và bạn biết đây có lẽ là lần cuối.'] }; }
  const em = data.events.find((e) => e.id === 'epoch_high_demon_emanation');
  if (em) { em.maxTimes = 3; em.again = { any: ['Phân thân năm xưa đã có ý chí riêng, và nó không luôn đồng ý với bạn. Giờ chân danh của bạn lại đủ ổn định để tách thêm một phần nữa.', 'Những phân thân trước đã đi những con đường bạn không chọn. Lần này, trước khi tách, bạn tự hỏi mình muốn để lại điều gì trong nó.'] }; }
  // the work dilemmas of a trade come back at most twice: after that, the trade's own story carries the years
  for (const e of data.events) if (/^professional_.+_(dilemma|fallout)$/.test(e.id)) e.maxTimes = 2;
  const train = data.focusRace && data.focusRace.elf && data.focusRace.elf.train;
  if (train && train.quiet && train.quiet.default) train.quiet.default.push(...trainElf);
  const rest = data.focusRace && data.focusRace.elf && data.focusRace.elf.rest;
  if (rest && rest.quiet && rest.quiet.default) rest.quiet.default.push(...restElf);
}

module.exports = { install, epoch, generation, RETRY };
