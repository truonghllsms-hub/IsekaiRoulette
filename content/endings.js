// More ways for a life to end, told by how it was lived: worn out by age, by hunger, by grief,
// by work, on the road, in chains; and one closing line for each trade of the five main races.
// A row is [kinds, when, text]. kinds: o = old age, h = health, v = violence. `when` keys are
// read by pickDeath in engine.js (frail, prime, poor, rich, sad, glad, work, adventure, rest,
// spouse, children, alone, party, famous, captive, free).
const K = { o: "old", h: "health", v: "violent" };
// Elves and Demons die of spent magic, not of fevers: they have their own lines below.
const CIVIL = ["human", "beastman", "dwarf"];

const shared = [
  // the body simply wears out
  ["oh", "frail", "Mùa đông năm bạn {age} tuổi dài hơn mọi năm. Bạn ngồi bên bếp lửa nghe tuyết rơi trên mái, và khi lửa tàn, bạn cũng thôi không thở nữa."],
  ["oh", "frail", "Những bậc thềm quen thuộc cứ cao dần lên theo từng năm. Năm {age} tuổi, bạn ngồi nghỉ ở bậc cuối cùng, nhìn nắng chiều một lúc lâu, rồi nhắm mắt."],
  ["oh", "frail", "Bạn đã quen đếm tuổi bằng những người mình tiễn đi. Năm {age} tuổi, đến lượt người khác đếm bạn."],
  ["oh", "frail", "Đôi tay từng làm được mọi việc giờ run khi cầm một bát canh. Bạn mỉm cười với chúng lần cuối vào năm {age} tuổi, trong một buổi sáng có sương."],
  ["oh", ["frail", "spouse"], "Bạn ra đi năm {age} tuổi, tay vẫn nằm trong tay {spouse}. Người ta kể rằng bàn tay ấy còn ấm rất lâu sau đó."],
  ["oh", ["frail", "children"], "Con cháu về đông đủ quanh giường bạn năm bạn {age} tuổi. Bạn nhìn từng gương mặt, gật đầu như đã đếm xong, rồi ngủ một giấc không dậy."],
  ["oh", ["frail", "alone"], "Không ai ở bên khi bạn nhắm mắt năm {age} tuổi. Hàng xóm chỉ để ý khi ống khói nhà bạn ba ngày liền không có khói."],
  ["oh", ["frail", "famous"], "Chuông trong vùng đổ suốt một buổi chiều khi tin bạn mất lan đi. Bạn {age} tuổi, và nhiều người chưa từng gặp bạn cũng ngả mũ."],
  ["oh", ["frail", "rich"], "Bạn mất năm {age} tuổi trên chiếc giường tốt nhất tiền có thể mua. Bản di chúc dài bốn trang, và đám tang đông hơn bạn từng nghĩ."],
  ["oh", ["frail", "glad"], "Buổi tối cuối cùng, bạn ăn hết bát súp, kể một câu chuyện cũ và cười to hơn mọi ngày. Sáng hôm sau, năm {age} tuổi, bạn không dậy nữa."],
  // hunger and cold
  ["h", "poor", "Mùa đói kéo dài hơn túi tiền của bạn. Năm {age} tuổi, bạn nhường miếng bánh cuối cùng cho một đứa trẻ lạ, rồi ngủ thiếp đi bên vệ đường."],
  ["h", "poor", "Căn phòng thuê không có củi sưởi. Cơn ho mùa đông năm bạn {age} tuổi cứ nặng dần, cho đến một đêm nó ngừng hẳn."],
  ["h", "poor", "Bạn bán dần từng món đồ để đổi lấy thuốc, rồi đến lúc chẳng còn gì để bán. Bạn mất năm {age} tuổi, nợ thầy lang ba đồng chưa trả."],
  // grief
  ["h", "sad", "Không có vết thương nào trên người bạn. Thầy thuốc chỉ lắc đầu và bảo có những người thôi sống trước khi tim ngừng đập. Bạn {age} tuổi."],
  ["h", "sad", "Bạn bỏ ăn từ mùa thu. Đến khi lá rụng hết, năm {age} tuổi, bạn cũng lặng lẽ rời đi như một chiếc lá cuối cùng."],
  ["h", "sad", "Những năm cuối, bạn ít nói dần rồi thôi hẳn. Năm {age} tuổi, người ta tìm thấy bạn ngồi nhìn ra cửa sổ, như vẫn đang chờ một ai đó."],
  // worked to the end
  ["h", ["work", "prime"], "Bạn gục xuống ngay giữa buổi làm năm {age} tuổi. Việc còn dang dở trên bàn, và phải mất ba người mới làm xong phần của bạn."],
  ["h", ["work", "prime"], "Bạn vẫn nói rằng làm xong đợt này sẽ nghỉ. Năm {age} tuổi, cơ thể quyết định thay bạn, vào một buổi tối bạn về nhà muộn hơn thường lệ."],
  ["h", ["work", "frail"], "Bạn làm việc đến tận ngày cuối cùng, năm {age} tuổi. Người ta tìm thấy bạn ở chỗ làm, đầu gục xuống như đang nghỉ một lát."],
  // wounds of the road
  ["h", "adventure", "Vết thương từ chuyến đi trước chưa bao giờ lành hẳn. Năm {age} tuổi, giữa đường đến một nơi mới, bạn dừng lại nghỉ dưới gốc cây và không đi tiếp nữa."],
  ["h", "adventure", "Cơn sốt rừng đuổi kịp bạn ở một quán trọ không ai biết tên bạn. Chủ quán chôn bạn sau vườn và cắm thanh kiếm của bạn làm bia. Bạn {age} tuổi."],
  ["h", ["adventure", "party"], "Đồng đội thay nhau cõng bạn suốt ba ngày đường, nhưng vết thương đã nhiễm độc quá sâu. Bạn mất năm {age} tuổi, trước cổng thành nửa ngày đường."],
  // too young
  ["h", null, "Cơn bệnh đến vào mùa mưa và không chịu rời đi. Bạn mất năm {age} tuổi, khi còn chưa kịp biết đời mình sẽ thành ra thế nào.", ["infant", "child", "teen"]],
  ["h", null, "Thầy lang trong vùng đến muộn hai ngày. Bạn mới {age} tuổi, và chiếc giường nhỏ từ đó để trống.", ["infant", "child", "teen"]],
  ["h", null, "Một trận dịch đi qua và mang theo những đứa trẻ yếu nhất. Năm ấy bạn {age} tuổi.", ["infant", "child", "teen"]],
  // plain illness in the middle of life
  ["h", "prime", "Một vết xước nhỏ mà bạn chẳng buồn rửa. Mười ngày sau, năm {age} tuổi, cơn sốt từ nó đưa bạn đi."],
  ["h", "prime", "Bạn ngã bệnh giữa mùa gặt và cứ nghĩ vài hôm sẽ khỏi. Năm {age} tuổi, bạn không kịp thấy mùa gặt sau."],
  ["h", "prime", "Cơn đau trong ngực đến lúc nửa đêm. Bạn định sáng mai sẽ đi tìm thầy thuốc. Bạn {age} tuổi, và buổi sáng ấy không đến."],
  ["h", ["prime", "spouse"], "{spouse} thức trắng bảy đêm bên giường bạn. Đến đêm thứ tám, năm bạn {age} tuổi, không còn gì để canh nữa."],
  // in chains
  ["h", "captive", "Xiềng xích không giết bạn, nhưng đói, lạnh và những năm không thấy mặt trời thì có. Bạn mất năm {age} tuổi, và không ai ghi lại ngày."],
  ["h", "captive", "Bạn chết năm {age} tuổi ở nơi giam giữ. Người nằm cạnh giữ lấy tấm chăn của bạn, và nhớ tên bạn lâu hơn bọn cai ngục."],
  // violence
  ["v", "adventure", "Chuyến đi ấy lẽ ra chỉ mất ba ngày. Năm {age} tuổi, bạn bước vào một nơi mà bản đồ ghi là an toàn, và bản đồ đã sai."],
  ["v", "prime", "Một cuộc cãi vã trong quán rượu, một con dao rút ra quá nhanh. Bạn {age} tuổi, và chẳng ai nhớ nổi chuyện bắt đầu từ đâu."],
  ["v", "free", "Chiến sự tràn qua vùng bạn ở vào năm bạn {age} tuổi. Bạn không thuộc phe nào, và mũi tên lạc cũng chẳng hỏi."],
  ["v", "frail", "Bọn cướp tưởng một người già thì dễ bắt nạt. Năm {age} tuổi, bạn chứng minh chúng sai với hai đứa đầu tiên, rồi mới ngã xuống."],
  ["v", "party", "Bạn ở lại chặn hậu để đồng đội kịp rút. Họ sống sót và kể chuyện về bạn suốt phần đời còn lại. Bạn {age} tuổi."],
];

const byRace = {
  human: [
    ["h", "frail", "Bảy mươi mùa gặt là quá nhiều với một con người, người ta vẫn nói thế. Năm {age} tuổi, bạn thôi đếm, giữa tiếng chuông chiều của nhà nguyện làng."],
    ["h", "prime", "Dịch ho đỏ lan từ khu chợ Sanctus ra các làng. Năm {age} tuổi, tên bạn nằm ở trang thứ ba trong sổ tử của giáo xứ."],
    ["h", "work", "Con người sống vội vì biết mình sống ngắn. Năm {age} tuổi, bạn đã vội quá mức, và trái tim bỏ cuộc trước bạn."],
    ["o", null, "Vị tu sĩ Lumina đến đọc lời nguyện cuối khi bạn {age} tuổi. Bạn ngắt lời ông để hỏi ngoài kia trời có đẹp không, rồi nhắm mắt khi nghe câu trả lời."],
    ["o", null, "Bạn mất năm {age} tuổi, vào đúng mùa lúa chín trên Đồng Bằng Thánh Quang. Đám tang phải hoãn một ngày vì cả làng còn bận gặt."],
    ["o", "children", "Đứa cháu nhỏ nhất hỏi vì sao ông bà ngủ lâu thế. Bạn {age} tuổi, và không ai trong nhà trả lời nổi câu ấy."],
    ["v", null, "Một toán lính đào ngũ đi ngang làng vào năm bạn {age} tuổi. Bạn đứng ra chắn cửa kho thóc, và chúng không thèm bảo bạn tránh ra."],
  ],
  beastman: [
    ["h", "frail", "Một Beastman già biết khi nào nên rời bầy. Năm {age} tuổi, bạn đi về phía đồi cỏ lúc trời chưa sáng, và bầy để yên cho bạn đi."],
    ["h", "prime", "Cơn sốt đầm lầy làm bộ lông bạn rụng từng mảng. Năm {age} tuổi, shaman đốt ngải suốt ba đêm, nhưng tinh linh không trả lời."],
    ["h", "work", "Thân thể á nhân chịu được nhiều hơn loài người, nên bạn cũng bắt nó chịu nhiều hơn. Năm {age} tuổi, nó đòi lại tất cả trong một lần."],
    ["o", null, "Bạn nằm xuống giữa Thảo Nguyên Gió Hú năm {age} tuổi, mũi hướng về phía gió. Cả bộ lạc tru một hồi dài, theo cách tổ tiên vẫn tiễn người già."],
    ["o", null, "Đôi tai bạn đã không còn nghe được tiếng cỏ, nhưng vẫn nghe được tiếng trống tiễn. Bạn {age} tuổi, và trống đánh cho bạn đến tận bình minh."],
    ["o", "children", "Lũ con cháu cọ trán vào trán bạn từng đứa một, theo lệ của bầy. Bạn {age} tuổi, và đứa cuối cùng chưa kịp lùi ra thì bạn đã đi."],
    ["v", null, "Bọn săn nô lệ giăng lưới ở khúc sông cạn năm bạn {age} tuổi. Bạn cắn đứt lưới cho lũ trẻ chạy thoát, còn mình thì không kịp."],
  ],
  dwarf: [
    ["h", "frail", "Phổi của một Dwarf già chứa nhiều bụi đá hơn không khí. Năm {age} tuổi, bạn ho một trận dài trong hầm, rồi ngồi xuống cạnh vỉa quặng mà mình yêu nhất."],
    ["h", "prime", "Khí độc rò ra từ một đường hầm cũ ngấm vào bạn suốt nhiều năm không ai hay. Năm {age} tuổi, râu bạn bạc trắng chỉ trong một mùa, rồi bạn nằm xuống."],
    ["h", "work", "Người ta tìm thấy bạn gục bên đe, búa vẫn còn trong tay, lò vẫn còn đỏ. Bạn {age} tuổi, và món đồ dang dở được chôn cùng bạn."],
    ["o", null, "Gia tộc khắc tên bạn lên vách Sảnh Tổ Tiên năm bạn {age} tuổi. Con rune cuối cùng trong tên bạn do chính tay bạn vẽ mẫu từ nhiều năm trước."],
    ["o", null, "Bạn uống cạn vại bia cuối, úp nó xuống bàn đá và bảo cả sảnh rằng thế là đủ. Bạn {age} tuổi, và không Dwarf nào dám cãi."],
    ["o", "children", "Bạn trao chìa khóa hầm gia tộc cho đứa con cả, dặn nó đừng bán vỉa bạc phía đông. Năm {age} tuổi, đó là lời cuối cùng của bạn."],
    ["v", null, "Hầm sập ở tầng sâu năm bạn {age} tuổi. Bạn chống cột cho mười hai thợ bò ra trước, và núi giữ bạn lại làm của riêng."],
  ],
  elf: [
    ["h", "frail", "Elf không già như loài người, chỉ có ma lực trong họ mỏng dần đi. Năm {age} tuổi, bạn mỏng đến mức nắng xuyên qua được, rồi tan vào một buổi sớm trong Đại Ngàn."],
    ["h", "prime", "Bệnh úa lá lan từ một rễ cây nhiễm tà khí và hút dần ma lực của những ai chạm vào nó. Năm {age} tuổi, tóc bạn ngả màu thu, rồi rụng như lá."],
    ["h", "sad", "Người ta gọi đó là cơn mỏi của Elf: sống quá lâu, tiễn quá nhiều người, đến khi hồn lực tự cạn. Năm {age} tuổi, bạn nằm xuống giữa rễ Yggdrasil và xin được ngủ."],
    ["h", "work", "Bạn đã rót ma lực của mình vào công việc suốt bấy nhiêu năm mà không giữ lại gì cho riêng mình. Năm {age} tuổi, giọt cuối cùng cũng rời đi."],
    ["h", "adventure", "Vùng đất chết ngoài rìa rừng uống ma lực của Elf như cát uống nước. Năm {age} tuổi, bạn đi quá xa, và không còn đủ để quay về."],
    ["h", ["frail", "spouse"], "Ma lực của bạn tắt dần như ngọn đèn cạn dầu. Năm {age} tuổi, {spouse} hát cho bạn nghe bài ca ngày cưới, và bạn ra đi ở câu cuối."],
    ["h", "poor", "Bị bỏ lại bên lề các thành phố loài người, xa mạch sống của Đại Ngàn, ma lực trong bạn khô dần. Năm {age} tuổi, nó cạn hẳn."],
    ["o", null, "Năm {age} tuổi, bạn đi về phía gốc Yggdrasil như mọi Elf đến lúc. Cây mà bạn trồng thuở nhỏ rụng hết lá trong một đêm, rồi ra hoa."],
    ["o", null, "Bạn hát bài ca cuối cùng của mình năm {age} tuổi, bằng thứ cổ ngữ mà lớp trẻ chỉ hiểu một nửa. Khi bài ca dứt, rừng im lặng rất lâu."],
    ["o", "alone", "Những người cùng lứa với bạn đã đi cả từ nhiều thế kỷ trước. Năm {age} tuổi, bạn là người cuối cùng còn nhớ tên họ, rồi không còn ai nhớ nữa."],
    ["v", null, "Lưỡi rìu của kẻ phá rừng không phân biệt thân cây với người giữ cây. Bạn {age} tuổi, và chỗ bạn ngã xuống mọc lên một vạt dương xỉ bạc."],
  ],
  demon: [
    ["h", "frail", "Lửa trong huyết quản của một Demon rồi cũng nguội. Năm {age} tuổi, sừng bạn nứt một đường dài, và bạn ngồi xuống bên Sông Tro chờ nó nguội hẳn."],
    ["h", "prime", "Một lời nguyền cũ, ai đó gieo từ thuở bạn còn trẻ, cuối cùng cũng chín. Năm {age} tuổi, nó ăn bạn từ trong ra, chậm rãi và lễ độ."],
    ["h", "sad", "Ở Ma Giới, kẻ không còn ham muốn gì thì coi như đã chết. Năm {age} tuổi, thân xác bạn chỉ làm nốt phần việc còn lại."],
    ["h", "work", "Bạn phục vụ Vực Thẳm đến giọt ma lực cuối cùng. Năm {age} tuổi, bạn hóa tro ngay tại chỗ làm, và kẻ kế nhiệm quét bạn sang một bên."],
    ["o", null, "Năm {age} tuổi, bạn tự bước xuống Tầng Tĩnh Lặng, nơi những Demon già đến để tắt. Không kẻ nào dám tiễn, vì nhìn theo là điềm gở."],
    ["o", null, "Ngọn lửa xanh trên sừng bạn lụi dần suốt một trăm ngày. Đến ngày cuối, năm bạn {age} tuổi, bọn tiểu quỷ đã chia xong phần đất của bạn."],
    ["v", null, "Một kẻ từng quỳ dưới chân bạn đợi đúng năm bạn {age} tuổi mới ra tay. Ở Ma Giới, người ta gọi đó là sự kiên nhẫn đáng kính."],
  ],
  goblin: [
    ["h", null, "Bụng bạn trống đã năm ngày khi cơn rét về. Năm {age} tuổi, bạn cuộn tròn trong góc hang, và sáng ra bầy chia nhau cái áo của bạn."],
    ["h", null, "Bạn ăn nhầm một cây nấm mà đứa nào trong bầy cũng biết là độc. Bạn {age} tuổi, và không đứa nào kịp nhắc."],
    ["o", null, "Sống đến {age} tuổi, bạn là Goblin già nhất mà bầy từng thấy. Lũ nhỏ cãi nhau xem có nên chôn bạn không, vì chưa ai từng chôn một Goblin chết già."],
  ],
  kobold: [
    ["h", null, "Hơi lưu huỳnh trong hầm ngấm vào vảy bạn từng ngày. Năm {age} tuổi, bạn ngủ gục bên đống quặng và không ai gọi dậy được nữa."],
    ["h", null, "Mùa lạnh năm bạn {age} tuổi, hang không đủ ấm cho tất cả. Bạn nằm ở vòng ngoài cùng, như mọi Kobold yếu nhất."],
    ["o", null, "Bạn {age} tuổi, già đến mức vảy chuyển màu xám. Bầy đặt bạn nằm cạnh quả trứng mới nhất, để hơi ấm cuối cùng của bạn không bị phí."],
  ],
  orc: [
    ["h", null, "Một Orc chết trên giường là chuyện không ai muốn kể. Năm {age} tuổi, bạn lết ra khỏi lều, cầm lấy cây rìu, và chết đứng dưới mưa."],
    ["h", null, "Vết thương cũ mưng mủ đến lần thứ ba. Năm {age} tuổi, bạn không cho pháp sư chạm vào, và gầm lên bài chiến ca cho đến khi hết hơi."],
    ["o", null, "Năm {age} tuổi, bạn chia vũ khí cho lũ trẻ rồi đi một mình về phía núi. Bộ lạc đốt lửa ba đêm, và không ai được phép đi tìm."],
  ],
  lizardman: [
    ["h", null, "Mùa khô kéo dài làm đầm cạn đến đáy. Năm {age} tuổi, vảy bạn nứt nẻ, và bạn vùi mình xuống lớp bùn cuối cùng để không bao giờ trồi lên."],
    ["h", null, "Một loại nấm đầm lầy mọc dưới lớp vảy bạn. Năm {age} tuổi, tư tế bảo đó là ý của Mẹ Bùn, và bạn không cãi."],
    ["o", null, "Bạn {age} tuổi khi bơi ra giữa đầm lần cuối. Mặt nước khép lại rất êm, đúng như cách một Lizardman già muốn ra đi."],
  ],
  minotaur: [
    ["h", null, "Cặp sừng đã quá nặng với cái cổ già. Năm {age} tuổi, bạn tựa đầu vào vách mê cung, thở ra một hơi dài làm bụi bay khắp hành lang."],
    ["h", null, "Cơn giận từng nuôi sống bạn giờ đốt bạn từ bên trong. Năm {age} tuổi, tim bạn nổ tung giữa một tiếng rống."],
    ["o", null, "Năm {age} tuổi, bạn đi vào nhánh sâu nhất của mê cung, nơi các Minotaur già vẫn đến. Tiếng móng guốc xa dần, rồi chỉ còn tiếng đá."],
  ],
  troll: [
    ["h", null, "Da thịt Troll tự lành, nhưng không lành được cái đói của một mùa đông không khách qua cầu. Bạn {age} tuổi khi nằm xuống dưới gầm cầu."],
    ["h", null, "Vết thương của bạn thôi không liền lại nữa. Với một Troll, đó là dấu hiệu duy nhất cần biết. Bạn {age} tuổi."],
    ["o", null, "Năm {age} tuổi, bạn ngồi xuống bên sườn đồi và ngủ. Rêu phủ lên rất nhanh, và giờ lũ trẻ trong làng vẫn trèo lên tảng đá có hình cái mũi."],
  ],
  slime: [
    ["h", null, "Lõi của bạn đục dần sau quá nhiều lần tan rồi tụ. Năm {age} tuổi, nó nứt một tiếng rất khẽ, và bạn thấm xuống nền hang."],
    ["o", null, "Sau {age} năm, bạn không còn giữ nổi hình dạng. Bạn tan thành một vũng nước trong, và sáng hôm sau có rêu mọc quanh mép."],
  ],
  vampire: [
    ["h", null, "Bạn để cơn khát kéo dài quá lâu, vì kiêu hãnh hoặc vì chán. Năm thứ {age}, bạn khô lại thành tro trong chính cỗ quan tài của mình."],
    ["h", null, "Dòng máu bất tử cũng có ngày loãng. Năm thứ {age}, gương mặt mấy trăm năm không đổi của bạn già đi trong một đêm, rồi vỡ như sứ."],
    ["o", null, "Năm thứ {age}, bạn mở toang rèm cửa và ngồi xuống ghế đợi bình minh. Người hầu kể rằng bạn đã mỉm cười khi tia nắng đầu tiên chạm tới."],
  ],
  dragon: [
    ["h", null, "Ngọn lửa trong ngực bạn lụi dần qua nhiều thế kỷ. Năm thứ {age}, hơi thở cuối cùng của bạn chỉ còn là một làn khói ấm."],
    ["o", null, "Năm thứ {age}, bạn cuộn mình quanh kho báu và nhắm mắt. Trăm năm sau, người ta sẽ tưởng bạn là một ngọn đồi."],
  ],
  high_demon: [
    ["h", null, "Quyền năng không có đáy, nhưng cái bình chứa nó thì có. Năm thứ {age}, hình hài bạn rạn vỡ, và Vực Thẳm lấy lại thứ đã cho bạn mượn."],
    ["o", null, "Năm thứ {age}, bạn chán. Với một Thượng Ma, thế là đủ để tan thành bóng tối và không buồn tụ lại nữa."],
  ],
};

// one closing line for a life spent in each trade (old age, or a body worn out at the end)
const byJob = {
  human_swordsman: "Thanh kiếm treo trên tường đã lâu không rời vỏ. Năm {age} tuổi, bạn nhờ người hạ nó xuống, đặt ngang đùi, và ngủ thiếp đi với bàn tay trên chuôi.",
  human_mage: "Ngọn đèn mana trên bàn bạn cháy suốt đêm cuối cùng mà không ai châm. Bạn {age} tuổi, cuốn sổ ghi chép còn mở ở một trang chưa viết xong.",
  human_assassin: "Một sát thủ hiếm khi chết già. Năm {age} tuổi, bạn làm được điều đó, trong một căn phòng có ba lối thoát mà bạn không còn cần đến.",
  human_priest: "Bạn đọc lời nguyện tối như mọi ngày suốt bấy nhiêu năm. Năm {age} tuổi, giọng bạn nhỏ dần ở câu cuối, và nến trong nhà nguyện tự tắt.",
  human_merchant: "Bạn kiểm sổ lần cuối năm {age} tuổi, gạch một đường dưới cột lãi, gấp sổ lại và bảo người làm rằng mai không cần mở cửa sớm.",
  human_smith: "Lò rèn nguội lần đầu tiên sau bao nhiêu năm vào ngày bạn mất, năm {age} tuổi. Học trò của bạn nhóm lại nó ngay hôm sau, như bạn dặn.",
  human_ranger: "Bạn đi vào rừng năm {age} tuổi mà không mang cung. Người ta tìm thấy bạn ngồi tựa gốc sồi già, một con hươu nằm ngủ cách đó vài bước.",
  human_gladiator: "Khán đài đã quên tên bạn từ lâu, nhưng cát thì không. Năm {age} tuổi, bạn mất trong căn phòng nhìn xuống đấu trường, tay nắm một vốc cát đỏ.",
  human_paladin: "Bạn xin được mặc giáp lần cuối năm {age} tuổi. Hai kỵ sĩ trẻ phải đỡ bạn đứng, và bạn chết đứng như thế, mặt hướng về phía biên giới.",
  human_scholar: "Thủ thư Tháp Ngà tìm thấy bạn năm {age} tuổi giữa một vòng sách mở. Cuốn trên tay bạn được đánh dấu ở trang cuối cùng.",
  human_farmer: "Bạn mất năm {age} tuổi vào cuối vụ gặt, sau khi tự tay bó lượm lúa cuối cùng. Thửa ruộng năm sau được mùa hơn mọi năm.",
  human_tamer: "Năm {age} tuổi, bạn nằm xuống giữa bầy thú của mình. Chúng nằm quanh bạn suốt ba ngày và không cho ai lại gần.",
  human_bard: "Bạn hát bài cuối cùng năm {age} tuổi trong một quán trọ nhỏ, cho bảy người khách. Dây đàn đứt đúng nốt cuối, và bạn cười, rồi cúi đầu chào.",
  human_mercenary: "Lính đánh thuê thường không sống đủ lâu để tiêu hết tiền. Năm {age} tuổi, bạn chết trên giường, với túi bạc cuối cùng để lại cho chủ quán trọ.",
  bm_berserker: "Cơn cuồng nộ đã rời bỏ bạn từ nhiều mùa trước. Năm {age} tuổi, bạn chết trong yên lặng, điều mà chưa ai từng nghĩ một Berserker làm được.",
  bm_hunter: "Bạn đặt cây cung xuống bãi cỏ nơi mình hạ con mồi đầu tiên. Năm {age} tuổi, bạn nằm cạnh nó, và đàn nai đi ngang qua không hề sợ.",
  bm_gladiator: "Vết sẹo của trăm trận đấu đau cùng một lúc vào đêm cuối. Năm {age} tuổi, bạn chết tự do, và đó là chiến thắng duy nhất bạn từng cần.",
  bm_scout: "Bạn leo lên mỏm đá cao nhất lần cuối năm {age} tuổi, nhìn khắp Thảo Nguyên như vẫn nhìn suốt đời, rồi nhắm đôi mắt từng thấy xa hơn cả bầy.",
  bm_shaman: "Gió đổi chiều ba lần trong đêm bạn mất, năm {age} tuổi. Các shaman trẻ nói đó là tinh linh đến đón một người quen cũ.",
  bm_merc: "Huy hiệu Sói Bạc của bạn đã mòn nhẵn. Năm {age} tuổi, bạn trả nó lại cho Thương hội, uống một vò rượu với lũ lính mới, và không dậy vào sáng hôm sau.",
  bm_leather: "Tấm da cuối cùng bạn thuộc vẫn còn căng trên khung. Bạn {age} tuổi, và người ta may nó thành tấm phủ cho chính bạn.",
  bm_herder: "Đàn thú tự về chuồng vào buổi chiều bạn mất, năm {age} tuổi. Con đầu đàn đứng trước lều bạn đến sáng.",
  bm_thief: "Bạn chết năm {age} tuổi trên một chiếc giường không phải của mình, trong một căn nhà không ai biết bạn có chìa khóa. Kẻ trộm nào cũng mơ được thế.",
  bm_mage: "Những con rune bạn khắc quanh lều sáng lên một lần cuối rồi tắt hẳn. Bạn {age} tuổi, và đá vẫn còn ấm đến sáng hôm sau.",
  bm_courier: "Lá thư cuối cùng bạn giao là thư của chính mình. Năm {age} tuổi, bạn đặt nó lên bàn trạm, tháo đôi giày đã chạy mòn, và ngồi xuống nghỉ mãi mãi.",
  elf_merchant: "Bạn khép giao ước cuối cùng năm {age} tuổi, công bằng như mọi giao ước trước nó. Thương đoàn dừng lại một mùa để để tang.",
  elf_ranger: "Bạn treo cây cung lên một cành Yggdrasil năm {age} tuổi. Mũi tên cuối cùng bạn bắn đi, người ta bảo đến giờ vẫn chưa rơi xuống.",
  elf_spirit: "Các tinh linh từng ký khế ước với bạn đến đủ cả vào năm bạn {age} tuổi. Gió, nước và lửa cùng lặng đi một nhịp khi bạn nhắm mắt.",
  elf_herb: "Khu vườn thuốc của bạn nở hoa trái mùa vào ngày bạn mất, năm {age} tuổi. Học trò của bạn không nỡ hái một bông nào.",
  elf_bard: "Bài ca cuối cùng của bạn dài ba ngày ba đêm. Năm {age} tuổi, bạn hát hết câu chót, đặt cây đàn xuống cỏ, và để rừng hát nốt phần còn lại.",
  elf_guard: "Bạn đứng gác ca cuối năm {age} tuổi. Khi người thay ca đến, bạn vẫn đứng đó, tay tựa trên khiên, và đã thôi không còn thở.",
  elf_wood: "Bức tượng cuối cùng bạn tạc là một cánh cửa khép hờ. Năm {age} tuổi, bạn đặt đục xuống cạnh nó, và người ta bảo bạn đã đi qua.",
  elf_envoy: "Bạn mất năm {age} tuổi giữa một kỳ hòa đàm. Hai phe hoãn họp ba ngày để tiễn bạn, và đó là lần đầu họ đồng ý với nhau điều gì.",
  demon_dk: "Bộ giáp đen của bạn đứng một mình trong sảnh sau khi bạn hóa tro, năm {age} tuổi. Không kẻ nào trong Quân đoàn dám dọn nó đi.",
  demon_wl: "Lời nguyền cuối cùng bạn viết là dành cho chính mình: được yên. Năm {age} tuổi, nó ứng nghiệm.",
  demon_bu: "Bạn ký văn bản cuối cùng năm {age} tuổi: lệnh bổ nhiệm kẻ kế nhiệm. Rồi bạn đặt bút xuống, và sổ sách Ma Giới lần đầu tiên chậm một ngày.",
  demon_me: "Bạn bán món hàng cuối cùng năm {age} tuổi với giá lỗ, lần đầu tiên trong đời. Kẻ mua kể lại rằng bạn đã cười suốt cuộc mặc cả.",
  demon_bs: "Lò Hỏa Ngục của bạn nguội đi vào năm bạn {age} tuổi. Thanh ma khí cuối cùng còn nằm trên đe, và không ai rút nổi nó ra.",
  demon_bh: "Bạn gạch cái tên cuối cùng khỏi danh sách năm {age} tuổi, rồi nhận ra tờ giấy đã trống. Thợ săn nào rồi cũng đến lúc hết con mồi.",
  demon_spy: "Bạn chết năm {age} tuổi dưới một cái tên vay mượn, giữa những người khóc thương một kẻ không có thật. Đó là vai diễn trọn vẹn nhất của bạn.",
  dwarf_runesmith: "Con rune cuối cùng bạn khắc là tên mình, lên chính cây búa đã theo bạn cả đời. Năm {age} tuổi, nó sáng lên một lần rồi tắt cùng bạn.",
  dwarf_miner: "Bạn xin được xuống hầm lần cuối năm {age} tuổi. Bạn áp tai vào vách đá, gật đầu như vừa nghe một lời chào, và ngồi xuống cạnh nó.",
  dwarf_shield: "Chiếc khiên của bạn được dựng ở cổng núi sau khi bạn mất, năm {age} tuổi. Lính trẻ đi qua vẫn gõ vào nó một cái lấy may.",
  dwarf_brew: "Thùng bia cuối cùng bạn ủ được khui trong đám tang của chính bạn, năm bạn {age} tuổi. Cả sảnh đồng ý đó là mẻ ngon nhất.",
  dwarf_eng: "Cỗ máy cuối cùng của bạn vẫn chạy khi bạn nằm xuống, năm {age} tuổi. Không ai biết nó dùng để làm gì, và không ai dám tắt.",
  dwarf_carver: "Bạn tạc xong bia mộ của chính mình từ mười năm trước, chỉ để trống con số cuối. Năm {age} tuổi, học trò bạn khắc nốt nó.",
  dwarf_merchant: "Viên đá cuối cùng bạn thẩm định năm {age} tuổi là một viên sỏi cháu bạn nhặt được. Bạn phán nó vô giá, và đó là lần duy nhất bạn định giá sai có chủ ý.",
  dwarf_guard: "Bạn nghe tiếng tù và đổi gác lần cuối năm {age} tuổi, từ giường bệnh. Bạn vẫn đáp lại bằng hiệu lệnh cũ, rất khẽ.",
  dwarf_hunter: "Tấm bản đồ kho báu cuối cùng của bạn dẫn về chính căn nhà của mình. Năm {age} tuổi, bạn gấp nó lại, cười khùng khục, và thôi không đi nữa.",
};

// closing lines on the Life Card. `when` is read by summary() in engine.js.
const epitaphs = [
  { when: "old", text: "Bạn đi hết con đường dài nhất mà một kiếp cho phép. Không phải ai cũng được thấy đoạn cuối của nó." },
  { when: "old", text: "Thời gian lấy lại mọi thứ đã cho bạn mượn, từng thứ một, và bạn trả đủ cả." },
  { when: "violent", text: "Đời bạn kết thúc giữa chừng một câu. Những ai còn sống sẽ phải tự đoán phần còn lại." },
  { when: "violent", text: "Bạn không được chọn cách ra đi. Nhưng cách bạn sống thì là của bạn." },
  { when: "rich", text: "Bạn để lại nhiều vàng hơn mình mang theo được. Kiếp nào cũng thế cả." },
  { when: "poor", text: "Bạn đến tay trắng và đi tay trắng. Ở giữa hai lần ấy, bạn đã sống." },
  { when: "famous", text: "Tên bạn sẽ còn được nhắc ở những nơi bạn chưa từng đặt chân tới." },
  { when: "famous", text: "Người ta sẽ kể chuyện về bạn, và thêm thắt đôi chút. Bạn sẽ không phiền đâu." },
  { when: "unknown", text: "Không cuốn sử nào chép tên bạn. Nhưng thế giới này đã đổi khác đi một chút vì có bạn." },
  { when: "master", text: "Bạn đã đi đến tận cùng nghề của mình. Từ đây trở đi, kẻ đến sau sẽ đo mình bằng bạn." },
  { when: "master", text: "Có những đôi tay làm một việc suốt đời cho đến khi việc ấy mang tên họ. Tay bạn là đôi tay như thế." },
  { when: "jobless", text: "Bạn chưa từng thuộc về một nghề nào, một hội nào. Bạn chỉ thuộc về những ngày mình đã sống." },
  { when: "party", text: "Bạn đã có những người sẵn sàng đứng chắn trước mình. Hiếm ai có được chừng ấy." },
  { when: "glad", text: "Bạn đã cười nhiều hơn khóc. Tính ra, đó là một kiếp lời to." },
  { when: "sad", text: "Kiếp này nặng hơn phần bạn đáng phải mang. Mong kiếp sau nhẹ gánh hơn." },
  { when: ["spouse", "children"], text: "Một mái nhà, một người để về, vài đứa trẻ gọi tên bạn. Bạn đã xây được cả một thế giới nhỏ." },
  { when: ["alone", "old"], text: "Bạn sống lâu hơn tất cả những ai từng biết mình thời trẻ. Sống lâu cũng có cái giá của nó." },
  { races: ["human"], text: "Một kiếp người ngắn ngủi, vừa đủ để phạm sai lầm, sửa một nửa trong số đó, và thương vài người." },
  { races: ["human"], text: "Các tộc khác gọi loài người là phù du. Bạn đã chứng minh phù du cũng để lại dấu trên mặt nước." },
  { races: ["beastman"], text: "Bầy sẽ tru tên bạn thêm một mùa trăng nữa. Rồi cỏ mọc lại, như cỏ vẫn mọc." },
  { races: ["beastman"], text: "Bạn sống bằng bản năng và chết với lòng kiêu hãnh. Thảo Nguyên không đòi gì hơn ở con cái nó." },
  { races: ["dwarf"], text: "Đá nhớ lâu hơn người. Những gì tay bạn làm ra sẽ còn nằm trong lòng núi khi tên bạn đã mòn." },
  { races: ["dwarf"], text: "Một vại bia được úp xuống trong Sảnh Tổ Tiên. Đêm nay, cả gia tộc sẽ kể chuyện về bạn, và nói quá lên một chút." },
  { races: ["elf"], text: "Đại Ngàn thêm một vòng gỗ mới, và trong vòng gỗ ấy có những năm tháng của bạn." },
  { races: ["elf"], text: "Bạn đã thấy những đế chế loài người mọc lên rồi đổ xuống. Cuối cùng, bạn cũng chỉ là một mùa lá của Yggdrasil." },
  { races: ["demon"], text: "Vực Thẳm không thương tiếc ai. Nhưng nó ghi sổ, và tên bạn nằm ở một trang không dễ xé." },
  { races: ["demon"], text: "Bạn sinh ra từ lửa và trở về với tro. Giữa hai thứ ấy, bạn đã cháy theo cách của mình." },
  { races: ["lizardman"], text: "Đầm lầy nhận lại bạn, như nhận lại mọi đứa con của bùn." },
  { races: ["minotaur"], text: "Mê cung thêm một lối rẽ mang tên bạn." },
  { races: ["troll"], text: "Một tảng đá mới bên đường. Lữ khách sẽ ngồi nghỉ trên bạn và không bao giờ biết." },
  { races: ["goblin"], text: "Bầy sẽ quên bạn trước mùa trăng tới. Nhưng hôm nay, có một đứa nhỏ giữ lại con dao của bạn." },
  { races: ["kobold"], text: "Một vảy xám được đặt lên đống quặng của bầy. Đó là tất cả, và với một Kobold, thế là nhiều." },
];

function install(data) {
  let n = 0;
  const add = (races, row, extra) => {
    const [kinds, when, text, stages] = row;
    const list = kinds.split("").map((k) => K[k]);
    data.deaths.push(Object.assign({ id: `end_${++n}`, kind: list[0], kinds: list, races, text }, when ? { when } : {}, stages ? { stages } : {}, extra || {}));
  };
  for (const row of shared) add(CIVIL, row);
  for (const [race, rows] of Object.entries(byRace)) for (const row of rows) add([race], row);
  for (const [job, text] of Object.entries(byJob)) {
    const j = data.jobs.find((x) => x.id === job);
    if (!j) continue;
    add(j.races, ["oh", "frail", text], { require: { job, jobRank: 1 } });
  }
  for (const e of epitaphs) data.epitaphs.push(e);
}

module.exports = { install, shared, byRace, byJob, epitaphs };
