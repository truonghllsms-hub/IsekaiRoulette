// What happens after the big choices of a long life: chains that follow a decision already taken in a
// trade's storyline (content/expansions/career-*.json), across generations, with their consequences.
// Each scene needs the flag of the road it continues and the scene before it, long enough ago
// (require.after). Installed by tools/load.js. Written for Dragon, High Demon, Slime, Vampire,
// Elf at rest, and short chains for Goblin and Kobold trades.

const C = (label, text, effects, extra) => Object.assign({ label, text, effects: effects || {} }, extra || {});
const K = (label, stat, target, ok, bad, okFx, badFx, extra) => Object.assign({ label, check: { stat, target }, success: { text: ok, effects: okFx || {} }, fail: { text: bad, effects: badFx || {} } }, extra || {});

// a scene of a chain: race, trade, flags it needs, the scene it follows and how many years after
function S(id, race, job, flags, after, years, text, choices, extra) {
  const require = Object.assign({ free: true }, job ? { job } : {}, flags && flags.length ? { flags } : {}, after ? { after: { event: after, years } } : {});
  return Object.assign({ id, _file: 'sagas', pack: true, races: [race], weight: 24, require, text, choices }, extra || {});
}

const events = [
  // ---------- Dragon · War Dragon: the line of Heroes ----------
  S('saga_drw_sword', 'dragon', 'dragon_war', ['drw_hero_line'], 'drw_hero_grandson', 150,
    'Thanh thánh kiếm của dòng Dũng Giả bị đánh cắp. Kẻ trộm định bán nó cho một giáo phái thờ Rồng, những kẻ tin rằng kiếm của Dũng Giả nằm trong hang bạn thì thế gian sẽ thái bình. Hậu duệ đời thứ tư của cậu bé mười chín tuổi năm xưa đến cửa hang, xin bạn giúp.',
    [K('Tự mình đòi lại thanh kiếm, trao tận tay cô', 'STR', 9, 'Giáo phái tan tác khi bạn đáp xuống đền của chúng. Bạn đặt thanh kiếm vào tay cô gái, chuôi hướng về phía cô, như cách người ta trả vũ khí cho kẻ ngang hàng.', 'Thanh kiếm gãy làm đôi trong trận hỗn chiến. Bạn mang về hai mảnh, và cô gái nhìn chúng rất lâu.', { fame: 10, flags: ['drw_saga_sword_returned'] }, { joy: -8, flags: ['drw_saga_sword_broken'] }),
     C('Để dòng họ ấy tự giành lại', 'Bạn chỉ cho cô đường đến đền giáo phái và không bay theo. Ba tháng sau cô trở về, máu me và một mình, với thanh kiếm trên lưng. Từ đó dòng họ ấy kể rằng họ không cần Rồng.', { joy: 3, flags: ['drw_saga_sword_earned'] }),
     C('Giữ thanh kiếm trong kho báu của mình', 'Giáo phái dâng kiếm cho bạn, và bạn nhận. Cô gái đứng ngoài cửa hang ba ngày rồi bỏ đi. Dòng Dũng Giả từ nay không còn kiếm, chỉ còn mối hận.', { wealth: 20, joy: -5, flags: ['drw_saga_sword_kept'] })]),
  S('saga_drw_refuser', 'dragon', 'dragon_war', ['drw_path_hero'], 'saga_drw_sword', 100,
    'Một Dũng Giả mới được Giáo hội phong, nhưng anh ta đứng trước quảng trường Sanctus và từ chối thảo phạt bạn: "Rồng ấy đã tha tổ tiên tôi ba lần." Giáo hội tuyên anh ta là dị giáo và treo thưởng lấy đầu.',
    [C('Cho anh ta trú trong lãnh địa của mình', 'Anh ta sống những năm cuối đời dưới chân núi bạn, dạy lũ trẻ trong làng đánh kiếm. Giáo hội không dám vào, và gọi ngọn núi là núi của kẻ phản đạo.', { fame: 6, joy: 6, flags: ['drw_saga_refuser_sheltered'] }),
     K('Dàn một trận đấu giả để Giáo hội giữ thể diện', 'INT', 9, 'Cả Sanctus thấy Dũng Giả "suýt thắng" rồi bị bạn đánh văng xuống sông. Giáo hội tha cho anh ta vì đã cố hết sức. Chỉ hai người biết sự thật.', 'Một thầy tu thấy bạn dừng đòn giữa chừng. Lời đồn về Rồng và Dũng Giả thông đồng lan nhanh hơn cả lệnh truy nã.', { fame: 4, flags: ['drw_saga_refuser_staged'] }, { fame: -6 }),
     C('Bảo anh ta quay về: chuyện này không phải của bạn', 'Anh ta quay về Sanctus, và bị thiêu trên quảng trường mùa xuân năm ấy. Tro của anh ta được gửi đến chân núi bạn, không kèm lời nhắn nào.', { joy: -10, flags: ['drw_saga_refuser_lost'] })]),
  S('saga_drw_turned', 'dragon', 'dragon_war', ['drw_path_hero'], 'saga_drw_refuser', 200,
    'Người dẫn đạo quân thảo phạt lần này là hậu duệ của một đứa trẻ bạn từng cứu khỏi đám cháy trong cuộc chiến năm xưa. Gia đình ấy đã kể câu chuyện khác đi qua từng đời, và trong phiên bản cuối, chính bạn là kẻ phóng hỏa.',
    [C('Bay đến gặp hắn một mình, kể lại sự thật', 'Hắn nghe đến cuối, rồi bảo rằng hắn không thể tin một con Rồng. Nhưng đạo quân của hắn dừng lại trước chân núi, và không tiến thêm.', { fame: 4, flags: ['drw_saga_truth_told'] }, { require: { flags: ['drw_saga_refuser_sheltered'] } }),
     K('Đánh lui đạo quân mà không giết ai', 'STR', 10, 'Bạn quật đổ cờ, phá trại, thổi bay giáo mác, và để mọi người sống. Hắn rút quân, bối rối vì bạn không giống câu chuyện hắn được kể.', 'Không giết ai là khó hơn bạn tưởng. Vài người chết dưới đá lở, và câu chuyện của dòng họ ấy giờ có thêm bằng chứng.', { fame: 6 }, { fame: -6, joy: -6 }),
     C('Để hắn tin điều hắn muốn tin', 'Bạn rút sâu vào núi. Đạo quân đốt rừng, khắc tên chiến thắng lên đá và ra về. Lịch sử giờ ghi rằng bạn đã bị đánh đuổi.', { joy: -4 })]),

  // ---------- Dragon · War Dragon: the Peace Dragon ----------
  S('saga_drw_city', 'dragon', 'dragon_war', ['drw_path_peace'], 'drw_peace_border', 300,
    'Ngôi làng bên con sông biên giới mà bạn bảo hộ năm xưa giờ đã thành một thành phố có tường đá. Họ khắc hình bạn lên cổng, và hội đồng thành phố xin bạn đặt tên cho nó.',
    [C('Đặt cho nó tên của con sông, không phải tên mình', 'Thành phố mang tên con sông. Bạn nghĩ đó là cách để họ nhớ mình sống được nhờ hòa ước, không nhờ một con Rồng.', { fame: 5, flags: ['drw_saga_city_river'] }),
     C('Để họ gọi theo tên bạn', 'Thành phố mang tên bạn. Những đứa trẻ sinh ra ở đó lớn lên tin rằng mình được Rồng chọn.', { fame: 10, flags: ['drw_saga_city_named'] }),
     C('Từ chối, bảo họ tự chọn', 'Họ cãi nhau ba năm, rồi chọn một cái tên chẳng ai thích. Nhưng là tên do chính họ chọn.', { joy: 3, flags: ['drw_saga_city_free'] })]),
  S('saga_drw_war_in_name', 'dragon', 'dragon_war', ['drw_path_peace'], 'saga_drw_city', 150,
    'Thành phố dưới sự bảo hộ của bạn tuyên chiến với thành bên cạnh, và cờ của họ mang hình bạn. Sứ giả thành bị đánh đến cầu cứu: họ đang bị tàn sát nhân danh con Rồng của hòa bình.',
    [K('Đáp xuống giữa hai đạo quân, giật cờ của chính thành mình', 'STR', 9, 'Bạn xé lá cờ mang hình mình trước mặt cả hai bên. Chiến tranh dừng trong một buổi chiều, và thành phố của bạn không bao giờ tha thứ cho bạn hoàn toàn.', 'Lá cờ cháy, nhưng trận đánh đã bắt đầu. Bạn chỉ kịp cứu một nửa số người.', { fame: 6, joy: -3, flags: ['drw_saga_banner_torn'] }, { fame: 2, joy: -8 }),
     C('Rút lại lời bảo hộ với thành phố ấy', 'Bạn bay đi giữa lễ hội mùa của họ. Không có Rồng sau lưng, cuộc chiến chết yểu trong một tháng. Thành phố ghét bạn suốt một thế kỷ.', { joy: -4, flags: ['drw_saga_protection_withdrawn'] }),
     C('Không can thiệp: lời thề là bảo vệ, không phải phán xử', 'Thành phố của bạn thắng. Thành bên kia giờ là một khu phố. Bạn đã giữ đúng lời, và không thích chính mình hơn chút nào.', { wealth: 10, joy: -8 })]),
  S('saga_drw_self_rule', 'dragon', 'dragon_war', ['drw_path_peace'], 'saga_drw_war_in_name', 200,
    'Dân thành phố bỏ phiếu: họ muốn tự cai quản, không cần Rồng bảo hộ nữa. Một phe nhỏ vẫn trung thành với bạn và xin bạn ở lại bằng vũ lực.',
    [C('Chấp nhận, bay đi trong lễ chia tay', 'Họ tổ chức một lễ tiễn biệt lớn nhất lịch sử thành phố. Bạn bay đi, và lần đầu tiên sau ba trăm năm, thành phố ngủ mà không có bóng bạn trên tường.', { joy: 10, fame: 6, flags: ['drw_saga_city_let_go'] }),
     C('Ở lại theo lời phe trung thành', 'Bạn ở lại. Thành phố chia đôi, rồi đánh nhau, và cả hai phe đều nhân danh bạn.', { fame: -6, joy: -10 }),
     C('Ra đi, nhưng để lại một lời hứa: gọi thì sẽ đến', 'Họ khắc lời hứa lên cổng thành. Một trăm năm sau, có một đứa trẻ đọc nó và hỏi lời hứa ấy của ai.', { joy: 6, flags: ['drw_saga_city_promise'] })]),

  // ---------- Dragon · Sage Dragon: teacher of mortals ----------
  S('saga_drs_misquote', 'dragon', 'dragon_sage', ['drs2_path_mortal'], 'drs2_mortal_student', 200,
    'Học trò của học trò bạn giờ giảng dạy khắp Tháp Ngà. Bạn nghe lỏm một buổi giảng và nhận ra lời mình dạy đã bị truyền sai: điều bạn nói là một câu hỏi, giờ họ dạy như một chân lý.',
    [K('Xuất hiện tại Tháp Ngà và sửa lại', 'INT', 9, 'Cả giảng đường lặng đi khi bạn chậm rãi đọc lại câu hỏi gốc. Vài học giả tức giận, nhưng lớp trẻ thì ghi chép không sót chữ nào.', 'Họ không tin đó là bạn. Một học giả còn bảo bạn hiểu sai chính lời mình.', { fame: 6, flags: ['drs2_saga_corrected'] }, { joy: -6 }),
     C('Để lời dạy sai sống tiếp: nó đã thành của họ', 'Bạn bay về. Có lẽ một chân lý sai mà khiến người ta tìm tòi còn hơn một câu hỏi đúng mà chẳng ai đọc.', { joy: 2, flags: ['drs2_saga_let_be'] }),
     C('Viết lại toàn bộ lời dạy thành sách, ký tên mình', 'Cuốn sách được chép lại hàng trăm bản. Lần này người ta cãi nhau về cách hiểu nó, và bạn thấy thế là đúng.', { fame: 4, INT: 1, flags: ['drs2_saga_book'] })]),
  S('saga_drs_relic', 'dragon', 'dragon_sage', ['drs2_path_mortal'], 'saga_drs_misquote', 150,
    'Chiếc vảy bạn để lại cho cô bé mười tuổi năm xưa đã thành vật thiêng của một giáo phái. Họ quỳ trước nó, và cấm tín đồ đặt câu hỏi.',
    [C('Đến xin lại chiếc vảy', 'Họ không nhận ra bạn, và đuổi bạn ra như kẻ báng bổ. Bạn để họ làm thế. Một con Rồng đứng ngoài cửa đền của chính vảy mình là chuyện đáng cười hơn đáng giận.', { joy: 2 }),
     K('Đặt một câu hỏi trước toàn bộ giáo phái', 'INT', 10, 'Câu hỏi của bạn chia giáo phái làm đôi. Nửa ra đi tìm câu trả lời; nửa ở lại thờ chiếc vảy. Bạn coi đó là một chiến thắng.', 'Họ nghe câu hỏi như một lời tiên tri và quỳ rạp xuống. Bạn vừa thành thần của họ.', { fame: 4, flags: ['drs2_saga_cult_split'] }, { fame: 6, joy: -6, flags: ['drs2_saga_worshipped'] })]),
  S('saga_drs_bias', 'dragon', 'dragon_sage', ['drs2_path_mortal'], 'saga_drs_relic', 200,
    'Một nhóm sử gia trẻ so ký ức của bạn với ghi chép của ba vương quốc, và công bố rằng lịch sử bạn kể có phần thiên lệch: bạn nhớ rõ những người bạn quý và quên những người bạn ghét.',
    [C('Thừa nhận, và nhờ họ ghi lại cả hai phía', 'Cuốn sử mới có tên bạn và tên của ba sử gia trẻ. Đó là cuốn sách đầu tiên bạn đứng tên chung.', { joy: 6, fame: 4, flags: ['drs2_saga_history_shared'] }),
     K('Tranh luận lại từng điểm', 'INT', 10, 'Bạn thắng phần lớn các điểm, và thua ba. Ba điểm ấy là những điều bạn đã cố quên suốt hai nghìn năm.', 'Họ có bằng chứng tốt hơn trí nhớ của bạn. Bạn bay về, lần đầu tiên không chắc về chính mình.', { INT: 1 }, { joy: -6 })]),

  // ---------- Dragon · Hoard Dragon ----------
  S('saga_drh_heir_war', 'dragon', 'dragon_hoard', ['drh_path_tribute'], 'drh_tribute_king', 300,
    'Vương quốc cống nạp cho bạn đã đổi bảy đời vua. Vị vua thứ tám mang cống phẩm gấp ba, kèm một lời xin: bạn hãy bảo hộ cuộc chinh phạt của hắn, vì giao ước cũ nói bạn bảo vệ vương quốc "khỏi mọi kẻ thù".',
    [C('Từ chối: giao ước là bảo vệ, không phải chinh phạt', 'Hắn rút lại phần cống phẩm dôi ra. Phần cũ vẫn nộp đủ, đúng hạn, như thể không có gì xảy ra.', { fame: 4, flags: ['drh_saga_refused_conquest'] }),
     C('Nhận phần cống phẩm, theo hắn ra trận', 'Vương quốc mở rộng gấp đôi trong một mùa. Kho của bạn cũng thế. Những vương quốc bị chinh phạt giờ cũng phải cống nạp cho bạn, và họ không có lựa chọn.', { wealth: 30, fame: -6, flags: ['drh_saga_conquest'] }),
     K('Đặt lại giao ước, ghi rõ từng chữ', 'INT', 9, 'Giao ước mới dài gấp ba, và không còn chữ "mọi". Vị vua ký, hơi tiếc, và bạn biết vua đời sau sẽ tìm kẽ hở mới.', 'Hắn tìm ra kẽ hở ngay trong bản mới. Luật sư loài người, bạn nhận ra, nguy hiểm hơn Dũng Giả.', { wealth: 10 }, { joy: -4 })]),
  S('saga_drh_spoon', 'dragon', 'dragon_hoard', ['drh_path_memory'], 'drh_memory_trinket', 200,
    'Cháu chắt của bà lão năm xưa leo lên núi. Gia đình họ giờ giàu có, và muốn chuộc lại chiếc thìa gỗ của cụ tổ để đặt trong từ đường. Họ mang theo một rương vàng.',
    [C('Trả lại chiếc thìa, không lấy vàng', 'Họ khóc khi cầm chiếc thìa. Bạn đặt vào chỗ trống trong kho một viên đá nhặt bên đường, để nhớ rằng chỗ ấy từng có một thứ quý.', { joy: 8, flags: ['drh_saga_spoon_home'] }),
     C('Nhận vàng, trả thìa', 'Rương vàng nằm trong kho, sáng hơn chiếc thìa nhiều. Bạn vẫn hay nhìn vào chỗ chiếc thìa từng nằm.', { wealth: 20 }),
     C('Giữ chiếc thìa: bà đã trao nó cho bạn', 'Họ ra về, giận dữ. Bạn biết mình đúng, và vẫn thấy không hoàn toàn đúng.', { joy: -3 })]),
  S('saga_drh_curse', 'dragon', 'dragon_hoard', ['drh_gold_statue'], 'drh_gold_cursed', 200,
    'Lời nguyền trong bức tượng Huyết Kim đã lan sang cả kho báu: đồng vàng nào nằm cạnh nó lâu đều bắt đầu thì thầm. Một tu sĩ già lên núi, đề nghị gỡ lời nguyền, đổi lấy chính bức tượng.',
    [C('Đưa bức tượng cho ông ta', 'Kho báu im lặng trở lại. Bạn ngủ ngon lần đầu tiên sau hai thế kỷ, và chỉ hơi nhớ những lời thì thầm.', { joy: 8, wealth: -10 }),
     K('Tự gỡ lời nguyền bằng lửa của mình', 'STR', 10, 'Bức tượng chảy thành một vũng vàng đỏ, và lời nguyền bốc hơi cùng nó. Kho báu của bạn nhỏ đi một chút và yên tĩnh hơn nhiều.', 'Lửa chỉ làm lời nguyền giận dữ hơn. Giờ nó thì thầm cả trong giấc mơ của bạn.', { wealth: -5, joy: 6 }, { joy: -10, health: -10 }),
     C('Giữ cả bức tượng lẫn lời nguyền', 'Bạn nằm trên đống vàng biết nói. Lâu dần, bạn bắt đầu trả lời chúng.', { wealth: 10, joy: -8 })]),

  // ---------- High Demon · Abyssal Lord of the lowly ----------
  S('saga_hdl_freed', 'high_demon', 'hd_lord', ['hdl_path_people'], 'hdl_people_tax', 100,
    'Những kẻ bạn giải phóng khỏi thuế máu giờ đã đủ mạnh để tranh nhau quyền lực. Ba thủ lĩnh của dân thường cùng đến ngai, mỗi kẻ đòi được làm tiếng nói của tất cả.',
    [C('Lập hội đồng ba người, không ai đứng trên ai', 'Hội đồng cãi nhau mỗi ngày, và không ai chết. Ở Vực Thẳm, đó là một phép lạ.', { fame: 6, flags: ['hdl_saga_council'] }),
     K('Chọn kẻ giỏi nhất, trao cho hắn quyền', 'INT', 9, 'Kẻ bạn chọn cai quản tốt hơn bạn mong. Hai kẻ còn lại rời lãnh địa, và gieo lời đồn ở khắp nơi.', 'Kẻ bạn chọn dùng quyền mới để trả thù hai kẻ kia. Bạn vừa tạo ra một lãnh chúa nhỏ.', { fame: 4 }, { fame: -4, joy: -6 }),
     C('Để họ tự giải quyết', 'Họ giải quyết bằng máu. Kẻ sống sót quỳ trước bạn, và bạn nhận ra mình đã thấy cảnh này rồi, dưới chế độ cũ.', { joy: -8 })]),
  S('saga_hdl_treasury', 'high_demon', 'hd_lord', ['hdl_path_people'], 'saga_hdl_freed', 100,
    'Không còn thuế máu, ngân khố lãnh địa cạn dần. Quân đội chưa được trả lương ba tháng, tường thành nứt không ai sửa, và các lãnh chúa láng giềng đang đếm ngày.',
    [C('Bán kho báu riêng của mình để nuôi lãnh địa', 'Ngai của bạn giờ chỉ là một chiếc ghế đá trơn. Lính được trả lương, và họ biết lương ấy từ đâu ra.', { wealth: -25, fame: 8, flags: ['hdl_saga_sold_hoard'] }),
     K('Mở thương lộ với Ma Giới tầng trên', 'INT', 10, 'Thương lộ đầu tiên của Vực Thẳm không chở nô lệ. Ngân khố đầy dần, chậm, và sạch.', 'Thương lộ bị cướp ngay chuyến đầu. Các lãnh chúa láng giềng cười to đến mức bạn nghe thấy từ xa.', { wealth: 15, flags: ['hdl_saga_trade'] }, { wealth: -10 }),
     C('Khôi phục một phần thuế, bằng vàng chứ không bằng máu', 'Dân chúng chấp nhận, càu nhàu. Một số kẻ coi đó là lời hứa bị phá vỡ.', { wealth: 10, joy: -3 })]),
  S('saga_hdl_restore', 'high_demon', 'hd_lord', ['hdl_path_people'], 'saga_hdl_treasury', 150,
    'Những thuộc hạ lâu năm nhất của bạn quỳ trước ngai, xin khôi phục chế độ cũ. Họ không ác; họ chỉ già, và nhớ cái thời mọi thứ có trật tự, dù là trật tự của máu.',
    [C('Từ chối, và cho họ nghỉ hưu trong danh dự', 'Họ rời triều đình với đất đai và tước hiệu. Vài người khóc. Bạn không chắc họ khóc vì thua hay vì nhẹ nhõm.', { fame: 4, joy: 3 }),
     K('Thuyết phục họ bằng những gì lãnh địa đã đạt được', 'INT', 10, 'Bạn đưa họ đi một vòng lãnh địa. Đến làng thứ ba, lão thuộc hạ già nhất dừng lại trước một đứa trẻ Imp đang đọc sách, và không nói gì nữa.', 'Họ thấy những gì bạn thấy, và vẫn muốn chế độ cũ. Có những trái tim không đổi được.', { fame: 6, flags: ['hdl_saga_old_guard_won'] }, { joy: -6 }),
     C('Đồng ý một nửa: khôi phục nghi lễ, không khôi phục thuế', 'Lễ nghi cũ trở lại, máu thì không. Các thuộc hạ già hài lòng. Dân chúng không hiểu vì sao mỗi năm lại phải quỳ một lần.', { joy: 2 })]),

  // ---------- High Demon · Legion General ----------
  S('saga_hdg_disobey', 'high_demon', 'hd_general', ['hdg_path_legion'], 'hdg_legion_wounded', 100,
    'Tướng giỏi nhất dưới quyền bạn bất tuân lệnh rút quân để quay lại cứu một tiểu đoàn bị vây. Hắn cứu được họ, và mất một nửa quân của chính mình. Cả Quân đoàn chờ xem bạn xử thế nào.',
    [C('Thăng chức cho hắn trước toàn quân', 'Quân đoàn reo hò. Từ đó, mọi tướng đều biết bạn trọng mạng lính hơn mệnh lệnh, và vài kẻ sẽ lợi dụng điều đó.', { fame: 6, flags: ['hdg_saga_disobey_rewarded'] }),
     C('Phạt hắn theo quân luật, rồi đích thân đến thăm', 'Hắn chịu phạt không một lời. Đêm ấy, bạn ngồi với hắn bên đống lửa, và hai bên hiểu nhau mà không cần nói.', { fame: 3, joy: 3 }),
     K('Tước quân hàm, giữ hắn làm cố vấn', 'INT', 9, 'Không còn quân hàm, hắn được tự do nói thật. Hắn trở thành người duy nhất dám cãi bạn, và đúng nhiều hơn sai.', 'Hắn coi đó là sỉ nhục, và rời Quân đoàn trong đêm.', { INT: 1 }, { joy: -6 })]),
  S('saga_hdg_veterans', 'high_demon', 'hd_general', ['hdg_path_legion'], 'saga_hdg_disobey', 100,
    'Hòa bình đến, và Quân đoàn trở về. Những cựu binh không biết làm gì với đôi tay mình: kẻ uống rượu, kẻ đánh nhau, kẻ ngồi nhìn tường cả ngày. Một làng biên giới xin bạn kéo họ đi chỗ khác.',
    [C('Giao cho họ đắp đê, dựng cầu cho các làng', 'Lính cũ cầm xẻng vụng về hơn cầm giáo. Nhưng đến mùa lũ thứ hai, họ tự hào về con đê hơn bất cứ chiến thắng nào.', { fame: 6, flags: ['hdg_saga_veterans_built'] }),
     C('Lập một trại cho họ ở với nhau', 'Họ ở cùng nhau, kể lại những trận cũ, và không làm hại ai. Họ cũng không bao giờ trở thành gì khác ngoài lính.', { joy: 2 }),
     K('Ngồi nghe từng người một', 'INT', 10, 'Bạn mất một năm cho việc ấy. Đến cuối năm, phân nửa đã tìm được việc, và phân nửa kia ít nhất biết có người nghe mình.', 'Có những vết thương không ai nghe hết được. Bạn bỏ dở giữa chừng.', { fame: 4, joy: 4 }, { joy: -4 })]),
  S('saga_hdg_successor', 'high_demon', 'hd_general', ['hdg_path_legion'], 'saga_hdg_veterans', 150,
    'Quân đoàn giờ trung thành với một tướng trẻ do chính bạn dạy dỗ, hơn là với bạn. Không ai nói ra, nhưng khi hắn ra lệnh thì quân chạy nhanh hơn.',
    [C('Trao quân lệnh cho hắn, lui về làm cố vấn', 'Lễ trao quyền diễn ra trên chính bãi tập bạn từng huấn luyện hắn. Quân đoàn hô tên hắn, rồi hô tên bạn, to hơn một chút.', { fame: 8, joy: 6, flags: ['hdg_saga_handed_over'] }),
     K('Thử lòng hắn bằng một mệnh lệnh khó', 'INT', 10, 'Hắn làm đúng lệnh, dù không đồng ý, và nói thẳng với bạn điều đó. Bạn biết mình đã dạy đúng người.', 'Hắn làm đúng lệnh, và chưa bao giờ tha thứ cho bạn vì đã thử hắn.', { fame: 4 }, { joy: -6 }),
     C('Giữ quân lệnh, đưa hắn ra biên giới xa', 'Quân đoàn hiểu bạn đang làm gì. Họ vẫn tuân lệnh, chậm hơn một chút.', { fame: -4, joy: -4 })]),

  // ---------- High Demon · Dark Archmage ----------
  S('saga_hda_law_blocks', 'high_demon', 'hd_archmage', ['hda_path_law'], 'hda_law_council', 100,
    'Một đứa trẻ Imp rơi vào khe nứt Vực Thẳm. Muốn cứu, phải dùng đúng thứ cấm thuật mà chính luật của bạn đã cấm, và Hội đồng đang nhìn.',
    [C('Dùng cấm thuật, rồi tự nộp mình cho Hội đồng', 'Đứa trẻ sống. Bạn đứng trước Hội đồng và đọc to điều luật mình vừa vi phạm, rồi đề nghị sửa nó.', { fame: 8, flags: ['hda_saga_broke_own_law'] }),
     K('Tìm cách cứu mà không phạm luật', 'INT', 11, 'Mất ba ngày và một ma trận chưa ai từng vẽ. Đứa trẻ sống, và luật vẫn còn nguyên.', 'Ba ngày là quá lâu. Luật vẫn nguyên, và đứa trẻ thì không.', { INT: 1, fame: 4 }, { joy: -12 }),
     C('Giữ luật: luật chỉ có giá khi không có ngoại lệ', 'Đứa trẻ không được cứu. Luật của bạn vẫn đứng vững, và từ đó người ta tuân theo nó vì sợ chứ không vì tin.', { joy: -10 })]),
  S('saga_hda_surpassed', 'high_demon', 'hd_archmage', ['hda_path_teach'], 'hda_teach_first', 150,
    'Học trò của bạn đã vượt thầy. Nó tìm ra một chú thuật bạn chưa từng nghĩ tới, và đang bán nó cho các lãnh chúa làm vũ khí.',
    [K('Đối chất với nó trước toàn bộ học viện', 'INT', 10, 'Nó cãi lại bằng chính lời bạn từng dạy: tri thức không có chủ. Rồi nó im lặng rất lâu, và rút chú thuật khỏi chợ.', 'Nó thắng cuộc tranh luận. Cả học viện thấy điều đó.', { fame: 6, flags: ['hda_saga_student_stopped'] }, { fame: -4, joy: -6 }),
     C('Tạo ra chú thuật hóa giải và trao miễn phí cho mọi người', 'Vũ khí của nó vô dụng sau một mùa. Nó gửi cho bạn một lá thư chỉ có một dòng: "Thầy vẫn hơn con."', { fame: 8, INT: 1 }),
     C('Để nó tự học bài học của mình', 'Một lãnh chúa dùng chú thuật ấy san phẳng một thành phố. Học trò của bạn đến gõ cửa lúc nửa đêm, và lần này nó cần một người thầy.', { joy: -8, flags: ['hda_saga_student_returned'] })]),

  // ---------- Slime · Mimic ----------
  S('saga_slx_mistaken', 'slime', 'slime_mimic', ['slx_path_mask'], 'slx_mask_market', 10,
    'Bạn mượn dáng một bà lão bán hoa ở chợ, người đã mất từ mùa trước mà bạn không biết. Một cậu bé chạy đến ôm chầm lấy bạn, khóc gọi "bà ơi".',
    [C('Ôm lại cậu bé, giữ dáng bà lão thêm một lúc', 'Cậu bé dắt bạn về nhà. Bạn ngồi đó cả buổi chiều, ăn bát canh không có vị gì với bạn, và lắng nghe một gia đình kể chuyện về người bà của họ.', { joy: 6, flags: ['slx_saga_grandmother'] }),
     C('Lặng lẽ đổi dáng khi cậu bé chớp mắt', 'Cậu bé đứng giữa chợ, tay ôm khoảng không. Bạn nhìn từ một góc tường, dưới dáng một chiếc giỏ.', { joy: -6 }),
     K('Nói thật với cậu bé, bằng giọng của bà', 'LUCK', 7, 'Cậu bé nghe hết, rồi gật đầu: "Bà ấy cũng hay kể chuyện kỳ lạ." Từ đó, mỗi phiên chợ, cậu để dành cho bạn một bông hoa.', 'Cậu bé hét lên và chạy mất. Cả chợ đổ ra tìm con quái vật đội lốt người.', { joy: 8, flags: ['slx_saga_boy_knows'] }, { health: -10 })]),
  S('saga_slx_promise', 'slime', 'slime_mimic', ['slx_saga_grandmother'], 'saga_slx_mistaken', 5,
    'Gia đình kia vẫn gọi bạn là bà. Hôm nay cô con gái kể rằng bà đã hứa sẽ đến dự đám cưới của cô vào mùa xuân. Cô nhìn bạn, chờ đợi.',
    [C('Đến dự đám cưới dưới dáng bà', 'Bạn ngồi hàng ghế đầu, mặc chiếc áo bà để lại. Cô dâu khóc khi ôm bạn, và bạn cố hết sức để không chảy ra thành bùn.', { joy: 10, flags: ['slx_saga_wedding'] }),
     C('Viết một lá thư bằng nét chữ của bà, rồi biến mất', 'Lá thư được đọc to trong đám cưới. Không ai biết bà viết nó lúc nào, và họ quyết định không cần biết.', { joy: 4 })]),
  S('saga_slx_recognized', 'slime', 'slime_mimic', [], 'slx_c2_crossroads', 40,
    'Bạn đã đổi hình hàng trăm lần. Hôm nay, một người lạ dừng lại trước mặt bạn, đang mang dáng một con mèo hoang, và gọi đúng cái tên mà Corin từng đặt cho bạn.',
    [C('Đi theo người lạ', 'Đó là con gái của Corin. Cha cô đã kể về một chiếc rương biết đi, và dạy cô cách nhận ra bạn: "Nó luôn đứng hơi lệch về bên trái." Bạn không hề biết mình có thói quen ấy.', { joy: 10, flags: ['slx_saga_found_kin'] }, { require: { flags: ['slx_met_corin'] } }),
     C('Chạy trốn', 'Bạn biến vào một khe tường. Ai đó vẫn nhận ra mình dưới mọi lốt, và điều đó đáng sợ hơn bất cứ thợ săn nào.', { joy: -4 }),
     K('Đổi sang một dáng khác ngay trước mặt họ', 'AGI', 6, 'Người lạ bật cười: "Vẫn đứng lệch bên trái." Họ biết bạn, dù bạn là ai.', 'Bạn đổi vụng, nửa mèo nửa bùn. Người lạ giật mình bỏ đi.', { joy: 4 }, { joy: -3 })], { require: { job: 'slime_mimic', free: true, after: { event: 'slx_c2_crossroads', years: 40 } } }),

  // ---------- Slime · Pet ----------
  S('saga_slt_grown', 'slime', 'slime_pet', ['slt_path_guard'], 'slt_guard_wolf', 25,
    'Lia đã lớn, có chồng và một đứa con gái nhỏ. Cô ngồi xuống cạnh bạn, ấp úng: chồng cô sợ Slime, và đứa bé thì cứ muốn nếm thử bạn.',
    [C('Rời nhà Lia, nhưng ở lại trong làng', 'Bạn sống dưới gốc cây đầu làng. Mỗi sáng, Lia đi ngang và để lại một lát bánh mì. Đứa bé lớn lên gọi bạn là "cục bùn của mẹ".', { joy: 4, flags: ['slt_saga_nearby'] }),
     K('Ở lại, và tập cho đứa bé đừng nếm mình', 'LUCK', 7, 'Đứa bé học rất nhanh. Chồng Lia vẫn sợ, nhưng một đêm anh thấy bạn nằm chắn trước nôi khi có con rắn bò vào, và từ đó anh chào bạn mỗi sáng.', 'Đứa bé nếm thật. Không sao cả, nhưng chồng Lia không bao giờ tha thứ.', { joy: 8, flags: ['slt_saga_family'] }, { joy: -8 }),
     C('Ra đi hẳn, để cô có cuộc đời của mình', 'Bạn đi khi trời chưa sáng. Lia không kịp chào. Nhiều năm sau, bạn nghe tin cô vẫn để một bát nước trước cửa mỗi đêm.', { joy: -6, flags: ['slt_saga_left'] })]),
  S('saga_slt_disagree', 'slime', 'slime_pet', ['slt_path_guard'], 'saga_slt_grown', 10,
    'Con gái Lia giờ đã mười lăm tuổi và muốn theo đoàn buôn đi xa. Bạn chặn cửa, vì đường ấy có cướp. Cô bé hét lên rằng bạn không phải cha mẹ cô, và cô không cần ai bảo vệ.',
    [C('Tránh đường, rồi lặng lẽ đi theo đoàn buôn', 'Bạn bám dưới gầm xe suốt chuyến đi. Cô bé không bao giờ biết vì sao bọn cướp đêm ấy bỏ chạy.', { joy: 4 }),
     C('Tránh đường, và thật sự để cô đi', 'Cô bé trở về sau một năm, gầy đi, cứng cáp hơn, với một vết sẹo và rất nhiều chuyện để kể. Cô kể cho bạn trước tiên.', { joy: 8, flags: ['slt_saga_let_go'] }),
     C('Giữ nguyên chỗ chặn cửa', 'Cô ở lại, giận bạn ba năm. Đoàn buôn năm ấy bị cướp sạch. Cô không bao giờ nhắc lại chuyện đó, và bạn cũng không.', { joy: -4 })], { require: { job: 'slime_pet', free: true, after: { event: 'saga_slt_grown', years: 10 }, notFlags: ['slt_saga_left'] } }),
  S('saga_slt_memories', 'slime', 'slime_pet', ['slt_path_mind'], 'slt_mind_first', 20,
    'Sau bao năm bọc lấy tay người chủ, ký ức của ông ta đã lẫn vào bạn. Bạn mơ thấy tuổi thơ của ông, nhớ mùi bếp của mẹ ông, và đôi khi giật mình vì không chắc ký ức nào là của mình.',
    [K('Tách ký ức của ông ra, cất vào một góc lõi', 'INT', 8, 'Việc ấy mất cả một mùa. Giờ bạn biết ranh giới của mình, và giữ ký ức của ông như giữ một món quà.', 'Bạn tách nhầm. Một vài ký ức của chính bạn đi theo, và không trở lại.', { INT: 1, joy: 4, flags: ['slt_saga_kept_self'] }, { joy: -6 }),
     C('Để chúng hòa vào nhau', 'Bạn thôi tách bạch. Khi ông qua đời, một phần ông vẫn còn sống trong bạn, và bạn kể cho cháu ông những chuyện mà chính ông đã quên.', { joy: 6, flags: ['slt_saga_merged'] }),
     C('Thôi chạm vào người khác', 'Bạn không bao giờ bọc tay ai nữa. Bạn ít hiểu người hơn, và chắc chắn hơn về mình.', { joy: -3 })]),

  // ---------- Slime · the change of form, before and after ----------
  S('saga_slime_guide', 'slime', null, [], null, 0,
    'Một Slime già, đã từng biến đổi rồi tự rã về dạng cũ, sống trong một hốc đá ở đáy hang. Lũ Slime trẻ đồn rằng nó biết vì sao các lần biến đổi thất bại.',
    [K('Đến học, và chịu nghe nó chê', 'INT', 6, 'Nó chỉ cho bạn những chỗ lõi hay vỡ, và cách để chúng nghỉ giữa hai lần thử. Lần biến đổi tới của bạn sẽ không giống những lần trước.', 'Nó chỉ bảo bạn còn quá non, rồi ngủ tiếp. Bạn ngồi chờ ba mùa.', { INT: 1, flags: ['slime_saga_guided'] }, { joy: -3 }),
     C('Mang đến nó vật liệu, đổi lấy một lời khuyên', 'Nó nhận nắm tinh thể, rồi nói đúng một câu: "Đừng biến đổi để thoát khỏi mình." Bạn nghĩ về câu ấy rất lâu.', { flags: ['slime_saga_guided'] })],
    { stages: ['adult', 'middle'], require: { free: true, form: 'none' }, weight: 18 }),
  S('saga_slime_after', 'slime', null, [], null, 0,
    'Bạn đã quen với hình dạng mới, nhưng thế giới thì chưa. Lũ Slime cũ trong hang tránh bạn, và những sinh vật từng là kẻ săn giờ nhìn bạn với ánh mắt khác.',
    [C('Quay về hang cũ, ở với những kẻ từng quen', 'Phải mất nhiều năm. Rồi một ngày, một con Slime nhỏ bò lại gần, chạm vào bạn, và thấy rằng bạn vẫn ấm như xưa.', { joy: 8 }),
     C('Đi tìm những kẻ cùng dạng với mình', 'Bạn tìm thấy một nhóm nhỏ ở tầng sâu. Họ không hỏi bạn từng là gì. Bạn thấy nhẹ nhõm, và hơi nhớ những kẻ từng hỏi.', { joy: 4, fame: 2 })],
    { stages: ['middle', 'ancient'], require: { free: true, form: 'any' }, weight: 16 }),

  // ---------- Vampire · Hidden One: the merchant who is his own son ----------
  S('saga_vpx_papers', 'vampire', 'vampire_hidden', ['vpx_path_merchant'], 'vpx_merchant_heir', 20,
    'Để "người thừa kế" của bạn có thể ký giấy tờ, cần một bản khai sinh, một nhân chứng, và một người mẹ không ai thấy bao giờ. Lão thư lại của phường biết làm tất cả, với giá phải chăng và một câu hỏi không nên hỏi.',
    [C('Trả tiền, không trả lời câu hỏi', 'Giấy tờ hoàn hảo. Lão thư lại giữ một bản sao, phòng khi cần, và bạn biết điều đó.', { wealth: -10, flags: ['vpx_saga_clerk_knows'] }),
     K('Tự làm giấy tờ, bằng nét chữ của mười người khác nhau', 'INT', 9, 'Không ai ngờ được. Đêm ấy bạn ngồi nhìn chữ ký của người mẹ hư cấu, và đặt cho bà một cái tên đẹp.', 'Một con dấu sai năm. Bạn phải đốt cả bộ và làm lại, lần này với lão thư lại.', { INT: 1, flags: ['vpx_saga_papers_own'] }, { wealth: -15, flags: ['vpx_saga_clerk_knows'] })]),
  S('saga_vpx_suspect', 'vampire', 'vampire_hidden', ['vpx_path_merchant'], 'saga_vpx_papers', 25,
    'Bà góa bán bánh ở đầu phố đã già. Bà nhìn "người thừa kế" rất lâu, rồi nói rằng cậu giống cha cậu như đúc, giống đến cả nốt ruồi sau tai. Bà cười, nhưng mắt thì không.',
    [C('Ngồi xuống uống trà với bà, kể chuyện "cha mình"', 'Bạn kể về chính mình bằng ngôi thứ ba suốt một buổi chiều. Bà nghe, gật đầu, và khi bạn về, bà bảo: "Cha cậu là người tốt. Cậu cũng vậy."', { joy: 6, flags: ['vpx_saga_widow_knows'] }),
     K('Che nốt ruồi, đổi cách đi đứng', 'AGI', 8, 'Một năm sau, bà gặp bạn ngoài chợ mà không nhận ra. Bạn thấy nhẹ nhõm, rồi thấy buồn.', 'Bà thấy bạn tập dáng đi trong ngõ. Bà không nói gì, chỉ thôi chào bạn từ hôm ấy.', { joy: -2 }, { joy: -6 }),
     C('Rời khỏi thành phố một thời gian', 'Bạn đi mười năm. Khi về, bà đã mất. Người ta nói những ngày cuối bà hay hỏi về cha con nhà thương nhân.', { joy: -6 })]),
  S('saga_vpx_real_heir', 'vampire', 'vampire_hidden', ['vpx_path_merchant'], 'saga_vpx_suspect', 20,
    'Một thanh niên đến cửa hiệu, cầm theo một lá thư cũ: hắn là cháu thật của người thương nhân mà bạn mượn tên, từ một nhánh họ thất lạc. Theo luật, gia sản thuộc về hắn. Hắn chưa biết người đứng trước mặt là ai.',
    [C('Trao gia sản cho hắn, rời đi với cái tên khác', 'Bạn ký giấy chuyển nhượng bằng chữ ký đã dùng suốt năm mươi năm. Hắn cảm ơn "người anh họ" rối rít. Bạn bước ra đường, không tên, không nhà, và nhẹ đến kỳ lạ.', { wealth: -30, joy: 8, flags: ['vpx_saga_gave_all'] }),
     K('Nhận hắn làm người cùng làm ăn', 'INT', 9, 'Hắn học nghề nhanh, và không bao giờ hỏi vì sao người anh họ chỉ làm việc ban đêm. Mười năm sau, hắn là người thừa kế thật, do chính bạn dạy.', 'Hắn tò mò hơn bạn tưởng. Một đêm hắn mở cửa hầm, và bạn phải chọn giữa giết hắn và chạy trốn. Bạn chạy.', { wealth: 10, joy: 6, flags: ['vpx_saga_true_heir'] }, { wealth: -25, joy: -8 }),
     C('Giữ gia sản, giữ bí mật: lá thư có thể là giả', 'Bạn thuê luật sư, và thắng. Hắn rời thành phố trắng tay. Bạn biết lá thư là thật.', { wealth: 10, joy: -10 })]),

  // ---------- Vampire · Blood Mage who heals ----------
  S('saga_vpm_bound', 'vampire', 'vampire_mage', ['vpm_cure_child'], 'vpm_cure_child', 15,
    'Đứa trẻ bạn cứu bằng huyết thuật năm ấy đã lớn, và khỏe mạnh, trừ một điều: mỗi mùa trăng, nó lại cần một giọt máu của bạn, nếu không sẽ sốt đến mê sảng.',
    [K('Tìm cách cắt đứt sự lệ thuộc', 'INT', 10, 'Mất ba năm và một phần ma lực của chính bạn. Giờ nó tự do, và lần đầu tiên nó đến thăm vì muốn chứ không vì cần.', 'Mỗi lần thử, cơn sốt nặng hơn. Bạn đành tiếp tục cho máu, và tự hỏi mình đã cứu nó hay trói nó.', { joy: 8, flags: ['vpm_saga_freed'] }, { joy: -6, flags: ['vpm_saga_bound'] }),
     C('Tiếp tục cho máu, không nói với nó lý do', 'Nó lớn lên tin rằng mình mắc một chứng bệnh lạ, và có một ân nhân tốt bụng.', { flags: ['vpm_saga_bound'] }),
     C('Nói thật với nó', 'Nó im lặng rất lâu, rồi hỏi: "Vậy con là gì?" Bạn không có câu trả lời.', { joy: -4, flags: ['vpm_saga_bound', 'vpm_saga_told'] })]),
  S('saga_vpm_church', 'vampire', 'vampire_mage', ['vpm_path_cure'], 'saga_vpm_bound', 10,
    'Giáo hội bắt đầu truy xét những người bệnh khỏi bất thường trong vùng. Một bà mẹ bị tra hỏi đã khai ra cánh cửa lâu đài của bạn, và giờ chính bà bị giam vì "giao du với tà vật".',
    [K('Đột nhập ngục, đưa bà ra trong đêm', 'AGI', 9, 'Bà về đến nhà trước bình minh. Giáo hội tìm thấy song sắt bị bẻ cong, và một giọt máu không bao giờ khô.', 'Bạn đưa được bà ra, nhưng bị thấy mặt. Lâu đài của bạn có thêm một lệnh truy nã.', { fame: 4, flags: ['vpm_saga_rescue'] }, { fame: -4, health: -15 }),
     C('Tự đến trình diện để đổi lấy bà', 'Họ thả bà, và giam bạn trong một hầm có cửa sổ quay về hướng đông. Bạn thoát ra sau ba ngày, bỏng nửa người.', { health: -25, fame: 6 }),
     C('Đóng cửa lâu đài, thôi chữa bệnh', 'Bà được thả sau một năm, khi Giáo hội chán. Không ai còn gõ cửa lâu đài bạn nữa, kể cả những người sắp chết.', { joy: -10 })]),
  S('saga_vpm_hunter', 'vampire', 'vampire_mage', ['vpm_path_cure'], 'saga_vpm_church', 15,
    'Người được khiêng đến cửa lâu đài lúc nửa đêm là một thợ săn Vampire, bụng rách vì móng vuốt ma thú. Đồng đội hắn không biết đây là đâu. Nếu bạn chữa, hắn sẽ thấy mặt bạn khi tỉnh dậy.',
    [C('Chữa cho hắn', 'Hắn tỉnh dậy, nhìn bạn, nhìn những vết kim trên tay mình, và hiểu. Hắn không nói gì, chỉ để lại cây cọc bạc trên bàn khi ra về.', { joy: 6, fame: 4, flags: ['vpm_saga_hunter_spared'] }),
     K('Chữa trong lúc hắn mê man, xóa ký ức đêm ấy', 'INT', 10, 'Hắn tỉnh dậy ở quán trọ, không nhớ gì, với vết thương đã liền. Hắn sẽ tiếp tục săn đồng loại của bạn.', 'Ký ức không bị xóa sạch. Hắn mơ thấy mặt bạn mỗi đêm, và bắt đầu đi tìm.', { flags: ['vpm_saga_hunter_forgot'] }, { joy: -6 }),
     C('Đóng cửa, để đồng đội hắn mang hắn đi', 'Bạn nghe tiếng họ khiêng hắn xuống đồi. Sáng hôm sau, chuông nhà thờ làng dưới gõ tiễn một người.', { joy: -10 })]),

  // ---------- Vampire · Night Noble ----------
  S('saga_vpn_portrait', 'vampire', 'vampire_noble', ['vpn_mortal_portrait'], 'vpn_mortal_friend', 80,
    'Bức chân dung người họa sĩ vẽ bạn năm xưa được trưng ở bảo tàng thành phố, dưới tên "Quý bà vô danh". Một cô bé đứng trước tranh rất lâu, rồi quay lại nhìn bạn, đang đứng ngay phía sau.',
    [C('Mỉm cười, và đi khỏi', 'Cô bé kéo tay mẹ, chỉ về phía bạn, nhưng bạn đã khuất sau hàng cột. Bức tranh giờ có một truyền thuyết mới.', { joy: 3 }),
     C('Kể cho cô bé về người họa sĩ', 'Bạn kể về một chàng trai nghèo vẽ bằng than vì không đủ tiền mua sơn. Cô bé hỏi bạn có phải là người trong tranh không. Bạn bảo người trong tranh là bà của mình.', { joy: 8, flags: ['vpn_saga_story_told'] })]),
];

// ---------- Elf at rest: a life after renown ----------
const elfRest = [
  S('saga_elf_rest_student', 'elf', null, [], null, 0,
    'Một Elf trẻ tìm đến nơi bạn an dưỡng, mang theo cuốn sổ chép tay những gì người ta kể về bạn. Nó muốn học, và nó đã đi bộ ba năm để đến đây.',
    [C('Nhận nó, dạy những gì không có trong sổ', 'Nó ở lại một thế kỷ. Khi nó đi, cuốn sổ dày gấp ba, và nửa sau là những điều bạn chưa bao giờ kể cho ai.', { joy: 8, fame: 4 }),
     C('Bảo nó về: bạn đang nghỉ', 'Nó cúi đầu và đi. Nhiều năm sau, bạn nghe tên nó trong một bài ca, và người ta hát rằng nó tự học.', { joy: -2 })],
    { focus: ['rest'], stages: ['middle', 'elder'], weight: 14 }),
  S('saga_elf_rest_village', 'elf', null, [], null, 0,
    'Làng Elf nơi bạn an dưỡng mở hội mùa. Họ mời bạn ngồi ghế danh dự, và bạn nhận ra mình không biết tên ai trong số những người đang cười nói quanh mình.',
    [C('Đi từng bàn, hỏi tên từng người', 'Đến cuối buổi hội, bạn nhớ được ba mươi cái tên, và có ba mươi người nhớ bạn là kẻ đã hỏi.', { joy: 8 }),
     C('Ngồi yên ở ghế danh dự', 'Người ta kính cẩn với bạn suốt buổi. Bạn thấy mình như một bức tượng được mời đến dự tiệc.', { joy: -3 })],
    { focus: ['rest'], stages: ['adult', 'middle', 'elder'], weight: 12 }),
  S('saga_elf_rest_forest', 'elf', null, [], null, 0,
    'Khu rừng bạn biết từ thuở nhỏ đã đổi khác: dòng suối dời sang phía đông, cây sồi mẹ đã đổ, và một con đường của loài người cắt ngang bìa rừng.',
    [C('Đi lại từng lối cũ, ghi nhớ những gì đã mất', 'Bạn vẽ lại khu rừng như bạn nhớ, rồi vẽ nó như bây giờ, và treo hai tấm cạnh nhau. Lũ trẻ trong làng xem chúng như xem hai thế giới.', { joy: 4, INT: 1 }),
     C('Trồng lại cây sồi ở chỗ cũ', 'Cây sẽ cao bằng cây mẹ khi bạn đã rất già. Bạn trồng nó không phải cho mình.', { joy: 6 })],
    { focus: ['rest'], stages: ['middle', 'elder'], weight: 12 }),
  S('saga_elf_rest_letter', 'elf', null, [], null, 0,
    'Một lá thư đến tay bạn sau ba trăm năm thất lạc trong kho một trạm thư loài người. Người viết đã mất từ lâu. Trong thư, họ xin lỗi vì một chuyện bạn đã quên.',
    [C('Đến thăm mộ người viết', 'Ngôi mộ đã lún gần ngang mặt đất. Bạn đặt lá thư xuống và nói rằng mình đã tha thứ, dù không còn nhớ chuyện gì cần tha thứ.', { joy: 6 }),
     C('Cố nhớ lại chuyện cũ', 'Bạn nhớ ra, sau ba ngày. Đó là một chuyện rất nhỏ, và người ấy đã mang nó theo cả đời.', { joy: -2, INT: 1 })],
    { focus: ['rest'], stages: ['middle', 'elder'], weight: 10 }),
];

// ---------- Goblin and Kobold: short chains in a short life ----------
const shortChains = [
  S('saga_gob_tinker_1', 'goblin', 'goblin_tinker', [], null, 0,
    'Bạn lén theo dõi một thợ máy loài người sửa cối xay nước ở bìa rừng. Ông ta làm rơi một bánh răng, và bạn nhặt được.',
    [C('Trả lại bánh răng cho ông', 'Ông ta giật mình, rồi bật cười, và ném cho bạn một chiếc cờ lê cũ. Từ hôm đó, ông để phần bạn những con ốc thừa ở gốc cây.', { joy: 6, flags: ['gob_saga_met_smith'] }),
     C('Giữ bánh răng, tháo ra xem', 'Bạn hiểu được cách nó ăn khớp với nhau. Lần đầu tiên, bạn thấy một thứ được làm ra cẩn thận.', { INT: 1, flags: ['gob_saga_gear'] })],
    { weight: 30 }),
  S('saga_gob_tinker_2', 'goblin', 'goblin_tinker', ['gob_saga_met_smith'], 'saga_gob_tinker_1', 1,
    'Người thợ máy giao cho bạn sửa một chiếc đồng hồ nhỏ, món quà của vợ ông. Đó là lần đầu có người tin giao cho bạn một thứ quý.',
    [K('Sửa thật cẩn thận', 'INT', 5, 'Chiếc đồng hồ chạy lại. Ông ta nhìn bạn rất lâu, như nhìn một đứa học trò.', 'Bạn làm gãy kim. Ông thở dài, nhưng vẫn để phần bạn những con ốc.', { jobXp: 1, joy: 6, flags: ['gob_saga_fixed_clock'] }, { joy: -4 }),
     C('Học cách nó chạy rồi mới trả', 'Bạn trả lại chiếc đồng hồ chậm ba ngày, nhưng đã hiểu hết bên trong. Bạn bắt đầu vẽ những cỗ máy của riêng mình.', { INT: 1, flags: ['gob_saga_fixed_clock'] })]),
  S('saga_gob_tinker_3', 'goblin', 'goblin_tinker', ['gob_saga_fixed_clock'], 'saga_gob_tinker_2', 1,
    'Tù trưởng bắt bạn chế một cỗ máy phá cổng. Bạn làm được, theo đúng những gì người thợ máy dạy. Đêm nay bầy sẽ dùng nó đánh vào làng của chính ông.',
    [K('Lén làm hỏng cỗ máy trước trận', 'AGI', 6, 'Cỗ máy kẹt ngay trước cổng làng. Bầy rút về tay trắng, và Tù trưởng đánh bạn một trận. Bạn không hối hận.', 'Tù trưởng bắt quả tang. Bạn bị treo ngược ở cửa hang hai ngày.', { joy: 6, flags: ['gob_saga_saved_village'] }, { health: -20, joy: -6 }),
     C('Chạy trước đến báo cho ông', 'Ông kịp đưa vợ con lên đồi. Ông nhìn bạn, một con Goblin thở hồng hộc, và không biết nên cảm ơn hay sợ.', { joy: 4, flags: ['gob_saga_saved_village'] }),
     C('Để mọi chuyện xảy ra', 'Cổng làng vỡ. Sáng hôm sau, bạn tìm thấy chiếc cờ lê cũ giữa đống tro.', { joy: -10 })]),
  S('saga_kob_miner_1', 'kobold', 'kobold_miner', [], null, 0,
    'Hầm sập giữa ca. Một thợ đào cùng tổ bị kẹt dưới đá, chỉ còn thò ra cái đuôi.',
    [K('Đào bới bằng tay để cứu', 'STR', 5, 'Bạn kéo được nó ra, móng tay rướm máu. Nó tên Snik, và nó nợ bạn một mạng.', 'Bạn đào đến kiệt sức. Người khác kéo được Snik ra, nhưng nó nhớ ai đã đào trước tiên.', { joy: 6, flags: ['kob_saga_saved_snik'] }, { health: -8, flags: ['kob_saga_saved_snik'] }),
     C('Chạy ra gọi người', 'Mọi người kéo được nó ra. Không ai nhớ ai đã gọi.', { joy: 1 })],
    { weight: 30 }),
  S('saga_kob_miner_2', 'kobold', 'kobold_miner', ['kob_saga_saved_snik'], 'saga_kob_miner_1', 1,
    'Snik được cất nhắc làm tổ trưởng. Ngày đầu tiên, nó gọi bạn ra trước cả tổ và chia cho bạn phần quặng lớn nhất.',
    [C('Nhận, và cảm ơn nó', 'Cả tổ nhìn bạn như nhìn kẻ được ưu ái. Bạn bắt đầu ăn một mình.', { wealth: 6, joy: -2, flags: ['kob_saga_favored'] }),
     C('Từ chối, đòi chia đều', 'Snik bối rối, rồi chia đều. Cả tổ nể bạn. Snik thì không chắc phải nghĩ gì.', { joy: 4, fame: 2 })]),
  S('saga_kob_miner_3', 'kobold', 'kobold_miner', ['kob_saga_saved_snik'], 'saga_kob_miner_2', 1,
    'Lãnh chúa Rồng đòi quặng gấp đôi. Snik ra lệnh cho bạn đào vào vách phía tây, chỗ ai cũng biết là sắp sập. Nó nói nhỏ: "Chỉ có mày tao tin được."',
    [K('Đào, nhưng chống trần thật kỹ', 'STR', 6, 'Bạn mang về đủ quặng, và cả tổ còn nguyên. Snik ôm bạn, run rẩy. Lần này, nó là kẻ nợ.', 'Vách sập. Bạn thoát ra được, mất một cánh tay vảy.', { jobXp: 1, joy: 6 }, { health: -25 }),
     C('Từ chối, nhắc nó nhớ ai đã cứu nó', 'Snik im lặng rất lâu, rồi tự xuống đào. Nó không trở lên.', { joy: -12 }),
     C('Rủ cả tổ cùng từ chối', 'Cả tổ đứng sau bạn. Lãnh chúa Rồng đến tận hầm, nhìn cả tổ, rồi bỏ đi. Snik không bao giờ ra lệnh như thế nữa.', { joy: 8, fame: 4 })]),
];

function install(data) {
  data.events.push(...events, ...elfRest, ...shortChains);
}

module.exports = { install, events, elfRest, shortChains };
