// Variety for the trades of the five main races, so two lives in one trade do not read alike:
// other ways into the trade (start), other promotion trials (promo), a second trial for each of the
// two milestones (arcs), everyday scenes between promotions (events), and how each race and each
// birth comes to the choice of a trade (lead). Written per race in content/career-variety-<race>.js.
//
// A trade:  { start:[text,…], promo:[rank1,rank2,rank3,rank4], arcs:[milestone 2, milestone 4],
//             quiet:[text,…],
//             events:[ { r:[minRank,maxRank], t:text, a:[label,stat,target,success,fail,okFx,failFx], b:[label,text,fx], c:[…] } ] }
// An arc is [title, premise, scene 1, scene 2, scene 3], like content/careers.js.
const files = ['human', 'beastman', 'elf', 'demon', 'dwarf'].map((r) => require(`./career-variety-${r}`));
const jobs = Object.assign({}, ...files.map((f) => f.jobs));
const leads = Object.assign({}, ...files.map((f) => ({ [f.race]: f.lead })));

// How the three scenes of a milestone are worded, by the gift the trade leans on.
const WORDS = {
  STR: {
    go: 'Xắn tay vào, lấy sức mình mở đường', goOk: 'Bạn dồn sức vào đúng chỗ, và chặng đầu của “{t}” lùi lại sau lưng.', goOk2: 'Bạn nghiến răng làm đến cùng, và việc khó nhất đã qua.', goBad: 'Bạn dốc sức sai chỗ, trầy trật một hồi lâu mới gỡ ra được.',
    safe: 'Đi đường vòng, tốn kém hơn nhưng chắc chân', safeText: 'Bạn chấp nhận mất thêm thời gian và của cải để đi lối ít hiểm nguy hơn.',
    last: 'Dốc toàn lực cho đòn quyết định', lastOk: 'Mọi thứ bạn rèn được trong nghề {job} dồn cả vào khoảnh khắc này, và nó vừa đủ.', lastBad: 'Sức bạn cạn trước khi việc xong. Bạn đành dừng lại và nhận lấy tổn thất.',
    retreat: 'Lui lại khi còn đứng vững', retreatText: 'Bạn lui về, giữ sức cho một ngày khác. Không ai trách, nhưng bạn tự biết.',
    keep: 'Giữ lời, chọn lối nặng nhọc hơn', keepOk: 'Bạn giữ được điều đã hứa và vẫn tìm ra lối đi, dù phải đổ nhiều mồ hôi hơn dự tính.', keepBad: 'Giữ lời không làm việc dễ đi. Bạn trả giá bằng thương tích và tiền bạc, nhưng không phải cúi mặt.',
    bend: 'Làm theo cách nhanh hơn, mặc kệ cái giá', bendOk: 'Việc xong sớm. Nhưng bạn biết mình vừa để lại một món nợ sẽ có ngày bị đòi.', bendBad: 'Lối tắt sụp ngay dưới chân, kéo theo cả sức lực lẫn tiếng tăm của bạn.',
  },
  INT: {
    go: 'Ngồi xuống xem xét kỹ trước khi động tay', goOk: 'Bạn nhìn ra mấu chốt mà người khác bỏ sót, và chặng đầu của “{t}” được gỡ xong.', goOk2: 'Bạn tìm được lời giải gọn hơn mọi người tưởng.', goBad: 'Bạn tính sai một bước, phải làm lại từ đầu và tốn kha khá công sức.',
    safe: 'Nhờ người rành hơn, trả công sòng phẳng', safeText: 'Bạn bỏ tiền mời người có kinh nghiệm cùng làm. Chậm và tốn, nhưng không hỏng việc.',
    last: 'Đặt cược vào lời giải của chính mình', lastOk: 'Suy tính của bạn đúng đến từng chi tiết. Những năm trong nghề {job} đã không uổng.', lastBad: 'Có một điều bạn không lường tới, và chỉ một điều ấy là đủ. Bạn phải dừng lại, nhận lấy tổn thất.',
    retreat: 'Dừng tay khi chưa quá muộn', retreatText: 'Bạn gấp sổ lại. Có những bài toán nên để dành cho một ngày mình giỏi hơn.',
    keep: 'Làm cho đúng, dù lâu và khó', keepOk: 'Bạn không cắt bớt bước nào, và kết quả đứng vững trước mọi lời bắt bẻ.', keepBad: 'Làm đúng thì chậm. Bạn mất nhiều hơn dự tính, đổi lại không ai chê được nửa lời.',
    bend: 'Lách qua kẽ hở cho xong việc', bendOk: 'Kẽ hở ấy có thật, và bạn lọt qua. Chỉ mong sau này không ai lần lại đường cũ.', bendBad: 'Kẽ hở hóa ra là cái bẫy. Bạn mất cả của lẫn tiếng.',
  },
  AGI: {
    go: 'Đi trước một bước, dò đường bằng chính mình', goOk: 'Bạn lướt qua chỗ hiểm trước khi nó kịp thành chuyện, và chặng đầu của “{t}” đã xong.', goOk2: 'Bạn nhanh hơn rắc rối đúng một nhịp, và thế là đủ.', goBad: 'Bạn chậm mất một nhịp, phải trả giá bằng vài vết xước và nửa ngày công.',
    safe: 'Chờ thời cơ tốt hơn, dù tốn thêm ngày giờ', safeText: 'Bạn nằm im chờ đến lúc thuận lợi. Mất thời gian và lộ phí, nhưng không mất mạng.',
    last: 'Chớp lấy khoảnh khắc duy nhất', lastOk: 'Chỉ có một nhịp thở để ra tay, và bạn không bỏ lỡ. Nghề {job} đã dạy bạn điều đó.', lastBad: 'Khoảnh khắc trôi qua nhanh hơn tay bạn. Việc hỏng, và bạn phải rút với thương tích.',
    retreat: 'Lẩn đi trước khi bị dồn vào góc', retreatText: 'Bạn biến mất đúng lúc. Biết khi nào nên lui cũng là một phần của nghề.',
    keep: 'Không đi lối tắt bẩn, chấp nhận hiểm hơn', keepOk: 'Bạn chọn lối khó mà sạch, và đôi chân đưa bạn qua được.', keepBad: 'Lối sạch thì dài và lộ. Bạn dính đòn, tốn của, nhưng không phải ngoái lại sau lưng.',
    bend: 'Mượn tay kẻ khác, không hỏi họ là ai', bendOk: 'Có kẻ mở sẵn cửa cho bạn. Một ngày nào đó, hắn sẽ đến đòi công.', bendBad: 'Kẻ mở cửa cho bạn cũng là kẻ báo cho lính gác. Bạn mất nhiều hơn những gì định lấy.',
  },
  LUCK: {
    go: 'Tin vào linh cảm và bắt tay làm', goOk: 'Linh cảm dẫn bạn đi đúng lối, và chặng đầu của “{t}” trôi qua nhẹ hơn bạn dám mong.', goOk2: 'Mọi thứ khớp vào nhau như có ai sắp sẵn.', goBad: 'Linh cảm lần này dẫn bạn đi một vòng rất xa. Bạn mệt nhoài mới quay lại được chỗ cũ.',
    safe: 'Không đánh cược, làm từng bước chắc chắn', safeText: 'Bạn làm theo cách chậm mà chắc. Tốn thêm công và của, nhưng không phải trông vào vận may.',
    last: 'Đặt hết vào một lần', lastOk: 'Vận may chỉ đến với kẻ đã chuẩn bị đủ lâu. Những năm trong nghề {job} của bạn chính là sự chuẩn bị ấy.', lastBad: 'Lần này vận may ngoảnh mặt. Bạn dừng lại giữa chừng, với nhiều thứ đã mất.',
    retreat: 'Thôi, không thử vận may thêm nữa', retreatText: 'Bạn rút tay lại. Kẻ sống lâu trong nghề là kẻ biết lúc nào không nên gieo xúc xắc.',
    keep: 'Giữ lòng ngay thẳng, mặc cho thiệt thòi', keepOk: 'Bạn làm điều phải, và lần này điều phải cũng là điều may.', keepBad: 'Ngay thẳng không phải lúc nào cũng được đền đáp. Bạn chịu thiệt, nhưng ngủ yên.',
    bend: 'Nói khéo một lời không hẳn là thật', bendOk: 'Người ta tin lời bạn. Giờ thì bạn phải nhớ kỹ mình đã nói gì.', bendBad: 'Lời nói dối vỡ ra sớm hơn bạn tưởng, và mang theo cả uy tín của bạn.',
  },
};
// The same scenes worded for what a trade actually does. A set only needs the lines it changes;
// the rest falls back to the wording of the trade's gift above.
const FAMILY = {
  // Dragons and High Demons do not roll up their sleeves: they move lands, oaths and ages
  epic: {
    finale: 'Cả vùng đất nín thở. Chặng cuối của “{t}” sẽ được định đoạt bằng chính quyền năng của bạn.',
    go: 'Phô bày quyền năng, buộc cả vùng phải nhìn lên', goOk: 'Bóng của bạn phủ xuống, và mọi thứ bên dưới tự xếp lại theo ý bạn. Chặng đầu của “{t}” khép lại không cần đến một lời.', goBad: 'Quyền năng tuôn ra quá tay, để lại một vùng đất cháy sém và nhiều kẻ thù hơn cần thiết.',
    safe: 'Sai kẻ dưới trướng đi trước, trả bằng kho báu', safeText: 'Bạn để những kẻ phụng sự mình dò đường. Kho báu vơi đi một ít, đổi lại bạn không phải lộ diện.',
    keep: 'Giữ lời thề xưa, dù phải trả bằng lãnh địa', keepOk: 'Bạn giữ trọn lời đã thề từ kỷ nguyên trước. Các tộc nhỏ ghi nhớ điều đó lâu hơn tuổi thọ của họ.', keepBad: 'Giữ lời khiến bạn mất một phần lãnh địa và máu của chính mình. Lời thề thì vẫn nguyên.',
    bend: 'Nhận giao kèo, để kẻ khác gánh hậu quả', bendOk: 'Giao kèo có hiệu lực. Vài thế kỷ nữa, sẽ có kẻ đến nhắc bạn về cái giá.', bendBad: 'Kẻ đưa ra giao kèo chỉ chờ bạn gật đầu. Bạn mất cả kho báu lẫn uy danh.',
    last: 'Dốc trọn quyền năng của một {job}', lastBad: 'Ngay cả quyền năng của bạn cũng có giới hạn. Bạn lui về hang ổ, liếm vết thương suốt nhiều mùa.',
    retreat: 'Rút về lãnh địa, để thời gian trả lời', retreatText: 'Bạn khép cánh lại. Với kẻ sống qua các kỷ nguyên, chờ đợi cũng là một nước cờ.',
  },
  courier: {
    finale: 'Chặng cuối của “{t}”: người nhận đã ở rất gần, và những kẻ muốn chặn bạn cũng vậy.',
    go: 'Tự chạy trước một lượt để thuộc đường', goOk: 'Bạn thuộc từng khúc quanh, từng chỗ lính gác hay ngủ gật. Chặng đầu của “{t}” nằm gọn trong đôi chân bạn.', goBad: 'Bạn chạy nhầm vào một lối cụt, mất nửa ngày và suýt mất luôn túi thư.',
    safe: 'Đổi sang tuyến dài hơn nhưng vắng lính', safeText: 'Tuyến vòng tốn thêm hai ngày và một đôi giày. Bù lại, không ai hỏi bạn mang gì.',
    keep: 'Giữ kín niêm phong, tự tìm lối khác', keepOk: 'Dấu sáp còn nguyên, và không ai phải trả giá cho đường đi của bạn. Chỉ có đôi chân là rớm máu.', keepBad: 'Bạn giữ được niêm phong nhưng dính tên ở vai và mất sạch lộ phí.',
    bend: 'Đi lối tắt, mặc kệ nó làm lộ ai', bendOk: 'Thư đến sớm nửa ngày. Còn những người bị lối tắt ấy làm lộ, bạn cố không nghĩ tới.', bendBad: 'Lối tắt có kẻ phục sẵn. Bạn mất thời gian, mất máu, và mất cả tiếng là người đưa thư không bao giờ lộ đường.',
    last: 'Lao qua chặng cuối, trao tận tay người nhận', lastBad: 'Bạn bị chặn ngay trước đích. Thư không đến nơi, và bạn phải mang tin ấy quay về.',
    retreat: 'Giấu thư, quay về báo trạm', retreatText: 'Bạn chôn túi thư dưới một gốc cây đã đánh dấu rồi quay lại. Thư chậm còn hơn thư mất.',
  },
  merchant: {
    finale: 'Mọi con số của “{t}” đã nằm trên bàn. Chỉ còn một lần đặt bút.',
    go: 'Tự mình đi xem hàng, hỏi giá từng nơi', goOk: 'Bạn nắm được giá thật ở cả ba chợ trước khi ai kịp nâng nó lên. Chặng đầu của “{t}” có lãi ngay từ lúc chưa bán.', goBad: 'Bạn tin nhầm một lời báo giá, và chênh lệch ấy ăn vào vốn.',
    safe: 'Thuê người môi giới, chia bớt phần lời', safeText: 'Người môi giới lo phần rủi ro và cầm đi một phần lời. Sổ sách của bạn vẫn sạch.',
    keep: 'Giữ đúng giao kèo đã ký, dù thiệt', keepOk: 'Bạn giao đủ, đúng hẹn, đúng giá cũ. Chuyến này lỗ, nhưng chữ ký của bạn từ nay có giá hơn vàng.', keepBad: 'Giữ lời khiến bạn bán dưới giá vốn và phải vay để xoay vòng.',
    bend: 'Ép giá khi đối phương đang túng', bendOk: 'Bạn mua được với giá rẻ mạt. Người bán nhớ mặt bạn, và không phải theo nghĩa tốt.', bendBad: 'Kẻ bị ép giá tìm được người mua khác vào phút chót. Bạn mất mối, mất tiếng và mất cả tiền cọc.',
    last: 'Đặt toàn bộ vốn vào thương vụ', lastBad: 'Thương vụ đổ. Bạn gỡ lại được một phần vốn và một bài học đắt.',
    retreat: 'Rút vốn, chịu mất tiền cọc', retreatText: 'Bạn rút khỏi bàn, để lại tiền cọc. Người buôn sống lâu là người biết lúc nào nên thôi.',
  },
  smith: {
    finale: 'Món đồ của “{t}” nằm trên bàn thợ, chỉ còn công đoạn cuối. Một nhát sai là làm lại từ đầu.',
    go: 'Tự tay làm thử một mẫu trước', goOk: 'Mẫu thử cho bạn biết vật liệu chịu được đến đâu. Chặng đầu của “{t}” xong mà không phí một thỏi nào.', goBad: 'Mẫu thử hỏng, kéo theo nửa mẻ vật liệu tốt.',
    safe: 'Dùng vật liệu đắt hơn cho chắc', safeText: 'Vật liệu loại nhất bù cho mọi sai sót nhỏ. Túi tiền của bạn thì không được bù.',
    keep: 'Làm đúng cách của nghề, không bớt công đoạn', keepOk: 'Bạn làm đủ từng công đoạn dù không ai kiểm. Món đồ sẽ còn dùng được khi người đặt nó đã thành ông bà.', keepBad: 'Làm kỹ khiến bạn trễ hẹn và phải đền. Món đồ thì không chê được.',
    bend: 'Bớt một công đoạn mà khách không nhìn ra', bendOk: 'Khách không nhìn ra. Bạn thì biết chính xác nó sẽ hỏng ở đâu, và vào khoảng năm nào.', bendBad: 'Chỗ làm ẩu lộ ra ngay lúc thử. Bạn mất vật liệu, mất khách, và mất mặt với cả phường.',
    last: 'Dồn hết tay nghề vào công đoạn cuối', lastBad: 'Tay bạn run đúng lúc không được phép run. Món đồ hỏng, và bạn phải đền vật liệu.',
    retreat: 'Trả lại đơn hàng, đền tiền cọc', retreatText: 'Bạn nhận rằng việc này vượt tay nghề hiện giờ của mình. Trả đơn thì mất tiền, làm hỏng thì mất nghề.',
  },
  mage: {
    finale: 'Vòng tròn cuối cùng của “{t}” đã vẽ xong. Chỉ còn việc bước vào giữa và niệm.',
    go: 'Dò dòng mana trước khi niệm bất cứ điều gì', goOk: 'Bạn tìm thấy nút thắt của dòng mana trước khi nó tìm thấy bạn. Chặng đầu của “{t}” được gỡ bằng một câu chú ngắn.', goBad: 'Dòng mana quật ngược, đốt mất một phần sức và vài món pháp cụ.',
    safe: 'Dùng pháp cụ thay cho sức mình', safeText: 'Tinh thể mana cháy hết thay cho bạn. Tốn kém, nhưng tâm trí bạn còn nguyên.',
    keep: 'Chỉ dùng phép mình hiểu đến tận gốc', keepOk: 'Bạn đi đường dài của phép chính thống, và nó giữ được. Không có gì phải trả lại cho bóng tối.', keepBad: 'Phép chính thống chậm và ngốn sức. Bạn kiệt quệ, pháp cụ vỡ, nhưng không nợ thứ gì không tên.',
    last: 'Niệm trọn câu chú, không dừng giữa chừng', lastBad: 'Câu chú vỡ ở âm tiết cuối. Bạn bị hất khỏi vòng tròn, và việc dang dở.',
    retreat: 'Xóa vòng tròn, không niệm nữa', retreatText: 'Bạn lấy chân xóa nét phấn cuối cùng. Có những cánh cửa nên để đóng.',
  },
  shaman: {
    finale: 'Lửa lễ đã nhóm, cả bầy ngồi thành vòng. Chặng cuối của “{t}” là lúc tổ tiên trả lời, hoặc im lặng.',
    go: 'Ngồi nghe trước khi cất lời xin', goOk: 'Bạn nghe ra điều các tinh linh muốn trước khi dâng lễ. Chặng đầu của “{t}” qua đi trong tiếng trống êm.', goBad: 'Bạn nghe nhầm ý tinh linh, và lễ vật đầu tiên bị khước từ.',
    safe: 'Dâng lễ vật hậu hơn để xin đường yên', safeText: 'Lễ vật lớn làm các tinh linh dịu lại. Kho của bộ lạc thì vơi đi trông thấy.',
    keep: 'Nói đúng lời tổ tiên phán, dù không ai muốn nghe', keepOk: 'Bạn truyền lại nguyên văn, không thêm bớt. Người ta giận bạn một mùa và tin bạn cả đời.', keepBad: 'Lời thật khiến bạn bị đuổi khỏi vòng lửa một thời gian, tay trắng.',
    bend: 'Nói điều người ta muốn nghe, nhân danh tổ tiên', bendOk: 'Cả bầy hài lòng. Chỉ có chiếc trống của bạn là lệch nhịp từ đêm ấy.', bendBad: 'Điềm báo trái ngược đến ngay mùa sau. Không ai còn tin lời bạn truyền.',
    last: 'Bước vào vòng lửa, gọi tên tổ tiên', lastBad: 'Không ai trả lời. Bạn ngồi lại giữa đám tro với một cơ thể kiệt quệ.',
    retreat: 'Dập lửa lễ, hẹn mùa trăng sau', retreatText: 'Bạn nói với cả bầy rằng đêm nay tổ tiên không đến. Không phải ai cũng tin.',
  },
  assassin: {
    finale: 'Mọi lối vào ra của “{t}” đã nằm trong đầu bạn. Đêm nay chỉ có một cơ hội.',
    go: 'Theo dõi mục tiêu vài ngày trước đã', goOk: 'Bạn thuộc giờ giấc của mục tiêu hơn cả chính hắn. Chặng đầu của “{t}” xong mà không ai biết bạn từng ở đó.', goBad: 'Một tên gác nhớ mặt bạn. Bạn phải đổi chỗ trú và mất mấy ngày nằm im.',
    safe: 'Mua tin từ kẻ trong cuộc', safeText: 'Tin tức đáng tin luôn đắt. Bạn trả tiền, và đổi lại không phải tự leo qua bức tường nào.',
    keep: 'Không động đến người ngoài cuộc', keepOk: 'Bạn chọn lối khó, và không ai ngoài mục tiêu phải mất gì. Giới ngầm gọi đó là làm việc sạch.', keepBad: 'Tránh người vô can khiến bạn lộ hành tung, dính đòn và mất đồ nghề.',
    bend: 'Đổ dấu vết sang một kẻ thế thân', bendOk: 'Một kẻ khác bị bắt thay bạn. Bạn biết tên hắn, và sẽ còn nhớ lâu.', bendBad: 'Kẻ thế thân khai ra đủ để người ta lần đến bạn. Bạn mất nhiều hơn một cái tên giả.',
    last: 'Ra tay trong đúng một nhịp thở', lastBad: 'Nhịp thở ấy trôi qua khi tay bạn còn chưa tới nơi. Bạn rút lui với thương tích.',
    retreat: 'Lẩn vào bóng tối, bỏ việc', retreatText: 'Bạn biến mất trước khi kịp bị thấy. Việc hỏng, nhưng tên bạn vẫn chưa nằm trên tấm bảng nào.',
  },
  ranger: {
    finale: 'Dấu vết của “{t}” dẫn đến đây. Gió đang thuận, và sẽ không thuận lâu.',
    go: 'Lần theo dấu vết, không để gió mang mùi mình đi', goOk: 'Bạn đọc được từ dấu chân cả cân nặng lẫn tâm trạng của thứ để lại nó. Chặng đầu của “{t}” khép lại trong im lặng.', goBad: 'Bạn mất dấu ở bờ suối, phải vòng lại nửa ngày và rách một ống tay.',
    safe: 'Đặt bẫy và chờ, dù tốn thêm ngày', safeText: 'Bạn giăng bẫy rồi nằm chờ. Lương khô vơi đi, nhưng bạn không phải bước vào tầm vuốt của thứ gì.',
    keep: 'Giữ luật của rừng, không lấy quá phần mình', keepOk: 'Bạn chỉ lấy đúng thứ cần lấy. Khu rừng, theo cách của nó, có vẻ ghi nhận điều đó.', keepBad: 'Giữ luật rừng khiến bạn về tay trắng, người đầy vết xước.',
    bend: 'Dùng cách bị cấm cho nhanh', bendOk: 'Bả độc và lửa làm xong việc trong một đêm. Mùa sau, vạt rừng ấy không còn tiếng chim.', bendBad: 'Lửa lan ngoài ý muốn. Bạn mất đồ nghề, và các thợ săn khác thôi không chào bạn.',
    last: 'Giương cung, chờ đúng khoảnh khắc', lastBad: 'Mũi tên lệch nửa gang tay. Thứ bạn săn đã biết mặt bạn, và bạn phải lùi.',
    retreat: 'Hạ cung, rút khỏi vùng này', retreatText: 'Bạn lùi ra theo đúng lối đã vào. Rừng vẫn còn đó cho một mùa khác.',
  },
  tamer: {
    finale: 'Con vật của “{t}” đứng cách bạn vài bước, chưa quyết định sẽ tin hay sẽ vồ.',
    go: 'Ở cạnh bầy thú vài ngày, không làm gì cả', goOk: 'Đến ngày thứ ba, chúng thôi dựng lông khi bạn đến gần. Chặng đầu của “{t}” được giải quyết bằng sự kiên nhẫn.', goBad: 'Một con hoảng lên, cả bầy chạy tán loạn. Bạn mất mấy ngày gom lại, kèm một vết đá.',
    safe: 'Dùng mồi ngon và dây chắc', safeText: 'Mồi và dây làm việc thay lòng tin. Tốn kém hơn, và con thú không quên cái dây.',
    keep: 'Không dùng roi, chờ nó tự tin mình', keepOk: 'Nó tự bước đến, chậm, và dụi đầu vào tay bạn. Thứ lòng tin ấy không roi nào mua được.', keepBad: 'Chờ lòng tin thì lâu. Bạn mất mùa, mất tiền, và được vài vết cắn làm kỷ niệm.',
    bend: 'Bẻ gãy ý chí của nó cho xong việc', bendOk: 'Con thú vâng lời. Trong mắt nó, có thứ gì đó đã tắt.', bendBad: 'Con thú bị dồn ép vùng lên. Bạn bị thương, và tiếng xấu đi trước bạn đến các chuồng trại.',
    last: 'Bước lại gần, chìa tay không', lastBad: 'Nó chọn không tin. Bạn lùi ra với một vết thương và một bầy thú hoảng loạn.',
    retreat: 'Thả nó đi, không ép nữa', retreatText: 'Bạn mở cổng chuồng. Có những con vật không sinh ra để thuộc về ai.',
  },
  bard: {
    finale: 'Đám đông của “{t}” đã ngồi kín chỗ. Chỉ còn chờ nốt nhạc đầu tiên.',
    go: 'Đi hỏi chuyện từng người trước khi viết', goOk: 'Bạn gom được những chi tiết mà không ai nghĩ là đáng kể. Chặng đầu của “{t}” đã có sẵn điệp khúc.', goBad: 'Người ta kể cho bạn toàn chuyện sai. Bạn phải bỏ nguyên bản nháp đầu.',
    safe: 'Mượn một giai điệu cũ ai cũng thuộc', safeText: 'Giai điệu quen làm khán giả dễ chịu ngay từ câu đầu. Nó không phải của bạn, và bạn phải trả tiền rượu cho người viết ra nó.',
    keep: 'Hát đúng sự thật, dù người trả tiền không thích', keepOk: 'Bạn hát điều đã thấy. Người trả tiền cau mày, còn đám đông thì thuộc bài hát ngay trong đêm.', keepBad: 'Sự thật khiến bạn bị quỵt tiền công và ăn một trận đòn sau quán.',
    bend: 'Sửa lời cho vừa tai kẻ trả tiền', bendOk: 'Túi tiền đầy. Bài hát thì bạn không muốn hát lại lần thứ hai.', bendBad: 'Đám đông nhận ra lời ca đã bị mua. Họ ném đủ thứ lên sân khấu, trừ tiền.',
    last: 'Bước lên, hát bằng tất cả những gì mình có', lastBad: 'Giọng bạn vỡ giữa chừng. Đám đông tản đi trước khi bài hát kết thúc.',
    retreat: 'Cất đàn, không diễn đêm nay', retreatText: 'Bạn cúi chào và xin lỗi. Một buổi diễn bỏ dở vẫn hơn một bài hát hỏng.',
  },
  scholar: {
    finale: 'Mọi tài liệu của “{t}” đã xếp thành chồng. Chỉ còn việc đứng lên và nói ra kết luận.',
    go: 'Tra tận nguồn gốc từng tài liệu', goOk: 'Bạn tìm ra bản gốc dưới ba lớp sao chép sai. Chặng đầu của “{t}” có chân đứng vững.', goBad: 'Bạn tin một bản chép lỗi và phải viết lại từ đầu.',
    safe: 'Nhờ một người thạo hơn đọc cùng', safeText: 'Người thạo việc đòi thù lao xứng đáng, và đổi lại không để bạn mắc lỗi của kẻ mới.',
    keep: 'Công bố đúng điều tìm thấy', keepOk: 'Bạn viết ra điều tài liệu nói, không hơn không kém. Vài người mất ngủ vì nó, nhưng không ai bác được.', keepBad: 'Nói thật khiến bạn mất chỗ làm một thời gian và phải bán bớt sách.',
    bend: 'Lược đi đoạn làm phật lòng kẻ có quyền', bendOk: 'Bản thảo được in ngay. Đoạn bị lược nằm trong ngăn kéo của bạn, và trong đầu bạn.', bendBad: 'Có người tìm ra đoạn bị lược và công bố trước. Tên bạn giờ đứng cạnh chữ “che giấu”.',
    last: 'Đứng lên bảo vệ kết luận của mình', lastBad: 'Một câu hỏi bạn không lường tới làm sụp cả lập luận. Bạn rời bục trong im lặng.',
    retreat: 'Xin hoãn, chưa công bố', retreatText: 'Bạn gấp bản thảo lại. Một kết luận non thì hại hơn không có kết luận.',
  },
  farmer: {
    finale: 'Trời của “{t}” đã chuyển màu. Việc phải xong trước khi nó đổ xuống.',
    go: 'Ra tận ruộng xem đất, xem trời', goOk: 'Bạn bốc đất lên ngửi và biết phải làm gì. Chặng đầu của “{t}” xong trước bữa trưa.', goBad: 'Bạn đoán sai con nước, mất công một buổi và ít hạt giống.',
    safe: 'Gọi cả xóm làm cùng, đổi công sau', safeText: 'Mười đôi tay làm nhanh hơn một. Bạn sẽ trả công bằng những buổi làm cho nhà người khác.',
    keep: 'Chia đều cho cả làng, kể cả nhà khó', keepOk: 'Không nhà nào thiếu phần. Mùa sau, cả làng có mặt ngoài ruộng nhà bạn mà không cần gọi.', keepBad: 'Chia đều khiến phần nhà bạn mỏng đi, và bạn làm quá sức để bù.',
    bend: 'Lo cho ruộng nhà mình trước đã', bendOk: 'Ruộng nhà bạn được mùa. Ánh mắt hàng xóm ở chợ thì không còn như cũ.', bendBad: 'Nước tràn từ ruộng người khác sang ruộng bạn. Mất mùa, và không ai sang giúp.',
    last: 'Làm cật lực cho kịp trời', lastBad: 'Trời đổ xuống trước khi bạn xong. Một phần công sức trôi theo nước.',
    retreat: 'Thôi, giữ sức cho vụ sau', retreatText: 'Bạn buông cuốc. Đất còn đó, năm sau lại gieo.',
  },
};
FAMILY.priest = FAMILY.shaman;
FAMILY.miner = FAMILY.farmer;
FAMILY.cave_scholar = FAMILY.scholar;
const FINALE = {
  STR: 'Mọi thứ dồn về chặng cuối của “{t}”. Từ đây chỉ còn sức và gan.',
  INT: 'Chặng cuối của “{t}” không còn chỗ cho phép thử. Mọi tính toán phải đúng ngay lần này.',
  AGI: 'Chặng cuối của “{t}” chỉ mở ra trong chốc lát. Chậm một nhịp là hết.',
  LUCK: 'Chặng cuối của “{t}” đã ở trước mặt, và lần này không ai gieo xúc xắc thay bạn.',
};
// Decisions written for one quest alone (keyed by quest id): they replace the family wording.
const QUEST = {
  career_dragon_war_r2: {
    go: 'Bay ngược bão để thuộc từng luồng gió phương bắc', goOk: 'Bạn thuộc bầu trời phương bắc như thuộc vảy trên mình. Kẻ thách đấu sẽ phải đánh trên sân của bạn.', goBad: 'Một luồng gió xoáy quật bạn vào vách băng. Bạn phải nằm dưỡng cánh trước ngày đấu.',
    keep: 'Đuổi gã pháp sư đi: trận này chỉ có vuốt và lửa', keepOk: 'Bạn đốt cuộn bùa ngay trước mặt hắn. Tin ấy bay khắp phương bắc trước cả trận đấu, và nhiều Rồng đến xem chỉ vì thế.', keepBad: 'Từ chối bùa chú khiến bạn bước vào trận mà không có lợi thế nào, và trả giá bằng vảy và máu.',
    bend: 'Nhận lời nguyền, miễn là thắng', bendOk: 'Đối thủ chậm đi đúng nửa nhịp cánh, vừa đủ. Bạn thắng, và gã pháp sư giờ biết một điều về bạn.', bendBad: 'Lời nguyền bị phát giác giữa trận. Bạn mất nhiều hơn một trận đấu: bạn mất tiếng là kẻ đánh công bằng.',
  },
  career_dragon_war_r4: {
    go: 'Bay đến từng hang ổ, gọi các Rồng bằng tên thật', goOk: 'Kẻ thù cũ cũng bay đến khi nghe bạn gọi. Chưa bao giờ bầu trời có nhiều cánh đến thế.', goBad: 'Nửa số Rồng không đáp lời, và một kẻ còn đòi bạn trả món nợ cũ bằng máu.',
    keep: 'Khước từ: thế giới này không phải của nó để nuốt', keepOk: 'Bạn gầm lời khước từ vào mặt Cổ Thần. Các tộc bên dưới sẽ không bao giờ biết mình vừa được chọn.', keepBad: 'Cổ Thần trừng phạt lời khước từ. Lãnh địa của bạn cháy một nửa, nhưng bầy Rồng vẫn ở sau lưng bạn.',
    bend: 'Nhận lời, cứu lấy tộc Rồng', bendOk: 'Tộc Rồng được tha. Bạn sẽ còn nghe tiếng thế giới bên dưới rất lâu sau khi nó im.', bendBad: 'Cổ Thần không giữ lời với kẻ chịu quỳ. Bạn mất cả danh dự lẫn thứ định đổi lấy.',
  },
  career_dragon_hoard_r2: {
    go: 'Tự tay đào từng kho báu bị lãng quên', goOk: 'Đồng vàng đầu tiên bạn nhặt được nằm dưới một ngai đá vỡ. Bạn nhớ rõ từng đồng sau nó.', goBad: 'Một kho báu có chủ, và chủ nó còn sống. Bạn bay về với vài vết thương.',
    keep: 'Từ chối: vàng xin được không phải vàng của Rồng', keepOk: 'Rồng già nhìn bạn rất lâu, rồi cụp cánh chào như chào kẻ ngang hàng.', keepBad: 'Đống vàng của bạn vẫn nhỏ, và Rồng già không quên kẻ dám từ chối mình.',
    bend: 'Nhận phần vàng, cúi đầu một lần', bendOk: 'Hang của bạn sáng lên ngay trong đêm. Mỗi lần Rồng già gọi, bạn phải đến.', bendBad: 'Rồng già đòi lại cả vốn lẫn lời, kèm theo sự phục tùng bạn đã hứa.',
  },
  career_dragon_hoard_r4: {
    go: 'Lặn vào dung nham theo dấu khắc cổ', goOk: 'Dưới ba tầng dung nham, bạn thấy cánh cửa đá mà chỉ vuốt Rồng mới mở được.', goBad: 'Núi lửa trở mình. Bạn thoát ra với lớp vảy cháy sém.',
    keep: 'Một mình lấy kho báu, để cổng Vực Thẳm đóng', keepOk: 'Bạn mang kho báu ra bằng chính sức mình. Cánh cổng dưới chân núi vẫn ngủ yên.', keepBad: 'Không có Ma Vương trợ lực, bạn mất nửa kho báu cho dung nham.',
    bend: 'Chia đôi với Ma Vương, mở cổng cho hắn', bendOk: 'Một nửa kho báu là của bạn. Thứ bước ra từ cánh cổng thì là việc của các kỷ nguyên sau.', bendBad: 'Ma Vương lấy cả kho báu lẫn cánh cổng. Bạn chỉ còn lại tiếng xấu.',
  },
  career_dragon_sage_r2: {
    go: 'Nằm yên suy nghĩ, mặc cho các triều đại đổi thay', goOk: 'Sau một trăm năm, câu hỏi tự vỡ ra như một quả trứng. Bạn thấy thứ nằm bên trong.', goBad: 'Một trăm năm trôi qua, và bạn nhận ra mình đã nghĩ sai từ câu đầu.',
    keep: 'Tự tìm câu trả lời, giữ bí mật của loài Rồng', keepOk: 'Câu trả lời đến chậm, nhưng nó là của bạn, và bí mật của Rồng vẫn nằm trong vảy.', keepBad: 'Tự tìm lấy khiến bạn kiệt sức suốt nhiều thập kỷ.',
    bend: 'Đổi một bí mật của Rồng lấy câu trả lời', bendOk: 'Bạn có câu trả lời ngay hôm đó. Ma Vương thì có một bí mật mà không Rồng nào được phép cho đi.', bendBad: 'Câu trả lời của Ma Vương sai một nửa, có chủ ý. Bí mật thì đã trao rồi.',
  },
  career_dragon_sage_r4: {
    go: 'Nhìn vào sao trời, Hư Vô và tim núi lửa', goOk: 'Ba nơi ấy cùng lặp lại một nhịp. Bạn bắt đầu đếm được nó.', goBad: 'Hư Vô nhìn lại bạn. Bạn mất một quãng ký ức để rút mắt ra.',
    keep: 'Không mở cửa: tự suy ra bằng trí mình', keepOk: 'Bạn dựng lại pháp tắc từ những mảnh nhỏ, mất năm trăm năm, và không nợ Hư Vô điều gì.', keepBad: 'Đường dài bào mòn bạn. Vảy bạn bạc đi trước tuổi.',
    bend: 'Hé cửa cho Hư Vô, chỉ một khe', bendOk: 'Bạn thấy pháp tắc trong một cái chớp mắt. Khe cửa thì không khép lại được hẳn.', bendBad: 'Thứ lọt qua khe cửa lấy của bạn nhiều hơn nó cho.',
  },
  career_bm_courier_r2: {
    go: 'Nằm sát vách đá, đếm nhịp đổi gác', goOk: 'Bạn thuộc từng nhịp đổi gác. Giữa hai toán tuần có đúng một quãng đủ cho một người chạy.', goBad: 'Một con chó của trạm gác đánh hơi thấy bạn. Bạn phải vòng lại, mất nửa đêm.',
    keep: 'Bỏ lối tắt, không để lộ nơi người tị nạn trốn', keepOk: 'Bạn chạy lối vòng qua khe núi. Thư đến trễ nửa canh giờ, còn những người trong hang không bao giờ biết có người đã chạy ngang.', keepBad: 'Lối vòng nằm trong tầm tên. Bạn tới nơi với một mũi tên ở đùi.',
    bend: 'Chạy lối tắt cho kịp, mặc cho họ bị lộ', bendOk: 'Thư đến kịp, đồn tiền tiêu rút an toàn. Sáng hôm sau, bạn nghe tin quân tuần đã lùng đến cái hang ấy.', bendBad: 'Quân tuần bám theo bạn qua lối tắt. Cả bạn lẫn người tị nạn cùng lộ.',
  },
  career_bm_courier_r4: {
    go: 'So ấn tín, nhận mặt kẻ bám đuôi ở trạm', goOk: 'Bạn nhận ra kẻ theo dõi qua đôi giày quá sạch của hắn, và đổi lượt chạy mà hắn không hay.', goBad: 'Bạn nhận nhầm người. Kẻ theo dõi thật đã biết bạn đi hướng nào.',
    keep: 'Giữ nguyên mật ước, chấp nhận bị săn', keepOk: 'Bạn chạy ba ngày không ngủ với bọn sát thủ sau lưng, và niêm phong vẫn nguyên khi đến tay người ký.', keepBad: 'Bạn giữ được mật ước, đổi bằng hai vết dao và con đường về bị cắt.',
    bend: 'Đưa bản giả cho sát thủ, cứu lấy mạng mình', bendOk: 'Bọn sát thủ cầm bản giả bỏ đi. Hai thế lực sẽ đặt bút ký trong khi kẻ thứ ba đã biết mình bị lừa.', bendBad: 'Chúng nhận ra bản giả ngay tại chỗ. Bạn mất cả mật ước lẫn danh dự của người đưa thư.',
  },
  career_bm_courier_r2b: {
    go: 'Hỏi thăm các cụ già, lần theo lối mòn cũ', goOk: 'Một bà cụ nhớ ra tên làng, và chỉ cho bạn con đường đã bị cỏ nuốt.', goBad: 'Bạn đi lạc sang một thung lũng khác và mất ba ngày.',
    keep: 'Đi nốt năm ngày đường, dù không ai trả công', keepOk: 'Bạn tìm thấy người nhận trong trại tị nạn. Bà đọc lá thư ba năm tuổi và khóc như vừa nhận hôm qua.', keepBad: 'Năm ngày đường ngốn sạch lương khô và làm bạn lỡ hai chuyến có tiền.',
    bend: 'Ghi “không tìm thấy người nhận” rồi quay về', bendOk: 'Sổ trạm khép lại gọn gàng. Lá thư nằm lại đáy túi, và đôi khi bạn vẫn nghĩ đến nó.', bendBad: 'Trạm trưởng biết bạn chưa hề đến trại tị nạn. Người đưa thư bỏ thư thì không còn gì để tự hào.',
  },
  career_bm_courier_r4b: {
    go: 'Chạy suốt đêm, không dừng ở trạm nào', goOk: 'Bạn bỏ qua ba trạm nghỉ. Khi trời hửng sáng, doanh trại đã ở trong tầm mắt.', goBad: 'Bạn vấp ngã trong bóng tối, trẹo chân, và phải chạy tiếp bằng cơn đau.',
    keep: 'Từ chối giao thư: thư chỉ đến tay người nhận', keepOk: 'Bạn nhìn thẳng vào viên sĩ quan và nhắc lại luật của người đưa thư. Hắn không dám rút kiếm trước mặt lính.', keepBad: 'Hắn cho lính đánh bạn một trận rồi mới để đi. Thư vẫn nằm trong áo bạn.',
    bend: 'Giao thư ân xá cho hắn để được đi tiếp', bendOk: 'Bạn được đi. Lá thư ân xá thì không bao giờ đến nơi, và bạn biết rõ điều đó ngay khi buông tay.', bendBad: 'Hắn giữ luôn cả bạn lại “để hỏi vài câu”. Trống pháp trường điểm khi bạn còn ngồi trong lều hắn.',
  },
};
// what the last scene of a milestone looks like when the script only wrote how it ends
const SCENE_LIKE = /^Bạn (bước vào|chờ|đứng trước|đứng chắn|đứng giữa|đối mặt|đối diện|phải|cần)|\?$|đang chờ|trước mặt|sắp /;
function stepWords(j, family, title, questId) {
  const epic = (j.races || []).some((r) => r === 'dragon' || r === 'high_demon');
  const set = Object.assign({ finale: FINALE[j.stat] || FINALE.INT }, WORDS[j.stat] || WORDS.INT, epic ? FAMILY.epic : FAMILY[family] || {}, QUEST[questId] || {});
  const out = {};
  for (const k of Object.keys(set)) out[k] = set[k].replace('{t}', title).replace('{job}', j.name);
  return out;
}

const PREFIX = 'Thử thách để trở thành {next}: ';
function install(data, list) {
  for (const j of list) {
    const x = jobs[j.id];
    if (!x) continue;
    const races = j.races;
    if (x.start) j.startAlt = [j.start, ...x.start];
    // long lives spend many quiet years at work: more lines so they do not come round so soon
    if (x.quiet) j.quiet = [...(j.quiet || []), ...x.quiet];
    if (x.promo) {
      // a trade whose trials were written for it keeps them beside the new ones; a trade that only had
      // the shared wording of its kind (craft, commerce, legacy) gets its own
      const own = j.promo[0].startsWith(PREFIX);
      const full = (v) => (v.includes('{next}') ? v : PREFIX + v);
      j.promoAlt = j.promo.map((t, i) => (x.promo[i] ? (own ? [t, ...[].concat(x.promo[i]).map(full)] : [].concat(x.promo[i]).map(full)) : [t]));
    }
    (x.events || []).forEach((e, n) => {
      const [min, max] = e.r || [0];
      const choice = (row, plain) => {
        if (!row) return null;
        if (plain) return { label: row[0], text: row[1], effects: row[2] || { joy: 2 } };
        return { label: row[0], check: { stat: row[1], target: row[2] }, success: { text: row[3], effects: row[5] || { jobXp: 1, fame: 1 } }, fail: { text: row[4], effects: row[6] || { joy: -4 } } };
      };
      const isCheck = (row) => row && typeof row[2] === 'number';
      data.events.push({
        id: `jx_${j.id}_${n + 1}`, _file: 'career-variety', pack: true, races, weight: e.w || 14,
        require: Object.assign({ job: j.id, free: true }, min ? { jobRank: min } : {}, max != null ? { jobRankMax: max } : {}),
        ...(e.stages ? { stages: e.stages } : {}), ...(e.eras ? { eras: e.eras } : {}),
        text: e.t,
        choices: [e.a, e.b, e.c].filter(Boolean).map((row) => choice(row, !isCheck(row))),
      });
    });
  }
  // how each race, and each birth, comes to the choice of a trade
  data.systems.race = data.systems.race || {};
  for (const [race, lead] of Object.entries(leads)) {
    if (!lead) continue;
    const cur = data.systems.race[race] = data.systems.race[race] || {};
    const base = cur.jobSelect || data.systems.jobSelect;
    // a birth is named with or without its race in front (human_bg_farmer, bm_bg_nomad)
    const known = new Set(data.origins.map((o) => o.id));
    const own = Object.entries(lead.origins || {}).map(([id, text]) => `(${known.has(id) ? id : `${race}_${id}`}) ${text}`);
    cur.jobSelect = Object.assign({}, base, { teen: [...lead.teen, ...own], adult: [...lead.adult, ...own] });
  }
}

module.exports = { jobs, leads, stepWords, install, SCENE_LIKE };
