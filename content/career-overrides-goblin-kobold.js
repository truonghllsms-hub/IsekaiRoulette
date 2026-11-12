// Each Goblin and Kobold trade's own everyday dilemma and aftermath, plus promotion trials where the
// trade had none. Merged into existing overrides (kobold_overseer keeps its own trials).
// Arc: [title, intro, survey step, temptation step, final step].
module.exports = {
  goblin_warrior: {
    dilemma: 'Bầy bắt được một Goblin lạc từ bầy khác. Chief muốn nó làm mồi nhử trong trận cướp tới. Nó còn nhỏ hơn bạn.',
    safe: 'Đề nghị nhận nó vào bầy', tempt: 'Để Chief quyết',
    good: 'Chief càu nhàu, nhưng thêm một miệng ăn cũng là thêm một cây dao. Nó theo bạn như cái bóng.', bad: 'Chief nổi giận, bắt bạn làm mồi nhử thay. Bạn sống, nhờ chạy nhanh.',
    temptGood: 'Nó làm mồi nhử, và nó chạy nhanh hơn ai hết. Nó sống. Từ đó nó không bao giờ nhìn bạn nữa.', temptBad: 'Nó làm mồi nhử. Nó không về.',
    fallout: 'Bầy cũ của đứa Goblin lạc tìm đến hang, hỏi xem nó ở đâu.',
    arcs: [
      ['Trận cướp đoàn xe muối', 'Một đoàn xe muối đi qua bìa rừng, và Chief giao bạn dẫn nửa bầy.', 'Bạn đếm lính canh, đếm Goblin, đếm đường chạy.', 'Một đứa đề nghị đốt cả đoàn xe cho vui.', 'Bạn lấy đủ muối cho bầy cả mùa đông, và không đứa nào chết.'],
      ['Ngai đá của hang', 'Chief chết. Ba kẻ tranh ngai, và bạn là một trong số đó.', 'Bạn hỏi từng Goblin xem chúng muốn gì.', 'Một kẻ đề nghị bạn đầu độc hai đứa còn lại.', 'Bạn thắng bằng thách đấu công khai, và chia thịt cho cả bầy đêm ấy.'],
    ],
  },
  goblin_scout: {
    dilemma: 'Bạn phát hiện một trại Human chỉ có đàn bà và trẻ con. Nếu báo về, bầy sẽ cướp. Nếu không, bầy sẽ đói thêm vài ngày.',
    safe: 'Báo là không có gì', tempt: 'Báo đúng sự thật',
    good: 'Bầy đi săn chỗ khác, và tìm được một đàn dê lạc. Không ai biết bạn đã nói dối.', bad: 'Bầy đói ba ngày, và Chief bắt đầu nghi bạn.',
    temptGood: 'Bầy cướp được bánh mì và gà, không ai bị thương. Bạn không đi cùng.', temptBad: 'Đàn ông trong trại về sớm. Trận cướp thành trận thảm sát, của cả hai bên.',
    fallout: 'Một toán lính Human đi khắp bìa rừng, hỏi tung tích của bầy Goblin đã cướp trại năm ấy.',
    arcs: [
      ['Bản đồ của bìa rừng', 'Chief muốn một tấm bản đồ mọi làng quanh hang.', 'Bạn đi ba ngày ba đêm, vẽ bằng than lên vỏ cây.', 'Một kẻ đề nghị bán bản đồ cho bầy khác.', 'Tấm bản đồ treo trong hang, và bầy không bao giờ lạc đường nữa.'],
      ['Mắt của bầy', 'Một đạo quân lớn đang đến gần, và không ai biết nó từ đâu.', 'Bạn bò sát đến trại địch, đếm từng lều.', 'Đạo quân đề nghị trả vàng nếu bạn chỉ đường đến hang.', 'Bạn chạy về kịp, và cả bầy dời hang trong đêm.'],
    ],
  },
  goblin_shaman: {
    dilemma: 'Chief bị bệnh. Hắn bắt bạn chữa, nhưng bạn biết bệnh của hắn không chữa được. Nếu hắn chết, bạn sẽ bị đổ tội.',
    safe: 'Nói thật với hắn', tempt: 'Hứa sẽ chữa khỏi',
    good: 'Hắn im lặng rất lâu, rồi gọi kẻ kế vị đến, và nói với cả bầy rằng không ai được động vào bạn khi hắn chết.', bad: 'Hắn nổi giận, đuổi bạn ra khỏi hang. Bạn sống ở bìa rừng cho đến khi hắn chết.',
    temptGood: 'Hắn chết trong giấc ngủ, mỉm cười, tin rằng mình sẽ khỏi. Bầy không đổ tội cho bạn.', temptBad: 'Hắn chết. Bầy treo bạn ngược ba ngày.',
    fallout: 'Chief mới hỏi bạn: lần trước, ngươi đã nói thật hay nói dối?',
    arcs: [
      ['Đêm gọi mưa', 'Hạn hán kéo dài, và cả bầy chờ bạn gọi mưa.', 'Bạn đọc mây, đọc gió, đọc cả cách lũ ếch kêu.', 'Một kẻ đề nghị bạn đổ tội hạn hán cho một Goblin già.', 'Bạn gọi được mưa, hoặc mưa tự đến, và không ai bị đổ tội.'],
      ['Giọng nói từ Vực Thẳm', 'Giọng nói trong giấc mơ đòi một lễ hiến tế để ban sức mạnh cho cả bầy.', 'Bạn tìm hiểu nó qua những cuộn da cổ.', 'Giọng nói hứa bầy sẽ không bao giờ đói nữa.', 'Bạn phá vỡ mối liên kết bằng máu của chính mình, và giọng nói im bặt.'],
    ],
  },
  goblin_tinker: {
    dilemma: 'Chief muốn bạn làm một quả bom đủ to để phá cổng một làng Human. Bạn biết quả bom ấy có thể nổ cả trong tay đứa ném.',
    safe: 'Làm bom nhỏ hơn, an toàn hơn', tempt: 'Làm đúng như Chief muốn',
    good: 'Quả bom nhỏ chỉ làm thủng một lỗ trên cổng. Đủ để chui qua. Không ai mất tay.', bad: 'Quả bom nhỏ không làm cổng suy suyển. Chief ném nó vào bạn. Nó cũng không làm bạn suy suyển.',
    temptGood: 'Cổng nổ tung. Bầy tràn vào. Đứa ném bom mất hai ngón tay, nhưng nó tự hào.', temptBad: 'Bom nổ sớm. Đứa ném bom không còn đứng dậy.',
    fallout: 'Một Goblin cụt tay đến xưởng của bạn, đặt làm một bàn tay giả.',
    arcs: [
      ['Con Nhện Máy đầu tiên', 'Chief muốn một cỗ máy giữ cửa hang khi cả bầy đi cướp.', 'Bạn nhặt nhạnh giáo gãy, bánh xe, dây thừng.', 'Một kẻ đề nghị gắn bom vào nó cho chắc.', 'Con Nhện Máy đứng ở cửa hang, đuổi được hai con sói và một Thánh Kỵ Sĩ lạc đường.'],
      ['Cối xay của hang', 'Bạn muốn làm một cỗ máy xay hạt để bầy không phải ăn sống.', 'Bạn học từ chiếc cối xay nước của làng Human.', 'Chief muốn biến nó thành máy ném đá.', 'Cối xay quay, và bầy ăn bánh lần đầu tiên.'],
    ],
  },
  goblin_rider: {
    dilemma: 'Con sói của bạn cắn chết một Goblin con trong lúc đói. Luật bầy: giết con sói.',
    safe: 'Nhận lỗi thay nó, chịu phạt', tempt: 'Để bầy thi hành luật',
    good: 'Bạn bị treo ngược ba ngày, nhịn đói. Con sói nằm dưới chân bạn suốt ba ngày, không ăn.', bad: 'Bầy không chấp nhận. Con sói bị giết. Bạn bị treo ngược.',
    temptGood: 'Bầy giết con sói. Mẹ của Goblin con gật đầu với bạn. Bạn chọn một con sói khác, nhỏ hơn.', temptBad: 'Bạn không nhìn được. Bạn bỏ hang một mùa.',
    fallout: 'Lũ sói trong chuồng bắt đầu gầm gừ mỗi khi bạn đi qua.',
    arcs: [
      ['Cuộc đua qua khe núi', 'Bầy tổ chức cuộc đua sói, kẻ thắng dẫn đội kỵ sói.', 'Bạn chạy thử đường đua mỗi đêm.', 'Một kẻ đề nghị bỏ gai vào máng ăn của sói đối thủ.', 'Bạn thắng bằng con sói nhỏ nhất bầy.'],
      ['Bầy sói hoang', 'Một bầy sói hoang lớn đe dọa hang, và chỉ kỵ sói mới đuổi được chúng.', 'Bạn theo dấu bầy sói hoang, học cách chúng săn.', 'Chief muốn đầu độc cả bầy.', 'Bạn dẫn bầy sói hoang đi nơi khác, và vài con theo bạn về.'],
    ],
  },
  kobold_miner: {
    dilemma: 'Đốc công ra lệnh đào xuyên qua một vách đá đang rỉ nước. Bạn ngửi thấy mùi nước ngầm đằng sau.',
    safe: 'Từ chối, báo nguy hiểm', tempt: 'Đào theo lệnh',
    good: 'Đốc công chửi bạn, rồi cho người kiểm tra. Vách đá vỡ ra một dòng nước, nhưng không ai ở đó. Cả tổ sống.', bad: 'Đốc công phạt bạn nhịn đói, và cho người khác đào. May mà vách đá giữ được.',
    temptGood: 'Bạn đào cẩn thận, từng lớp. Nước rỉ ra, nhưng không vỡ. Đủ chỉ tiêu.', temptBad: 'Vách vỡ. Nước tràn vào hầm. Ba thợ đào không kịp chạy.',
    fallout: 'Thợ đào trong tổ bắt đầu hỏi bạn trước khi đào vào bất kỳ vách nào.',
    arcs: [
      ['Vỉa quặng của mùa đông', 'Tổ đào cần một vỉa quặng mới trước mùa đông, nếu không sẽ không đủ để đổi thức ăn.', 'Bạn gõ từng vách, nghe từng tiếng vọng.', 'Một thợ đào đề nghị đào trộm sang hầm của tổ bên cạnh.', 'Bạn tìm ra vỉa Tinh Bạc nhỏ trong vách mà không ai để ý.'],
      ['Hầm của Rồng', 'Lãnh chúa rồng muốn một hầm mới, sâu hơn mọi hầm.', 'Bạn đào từng tấc, chống từng đoạn.', 'Đốc công muốn bỏ qua chống trần để đào nhanh hơn.', 'Hầm sâu nhất được hoàn thành, và không ai chết.'],
    ],
  },
  kobold_trapper: {
    dilemma: 'Bẫy của bạn bắt được một Kobold của tổ đối địch, đang đi trộm nấm. Luật tổ: bẫy bắt được gì, tổ giữ cái đó.',
    safe: 'Thả nó về', tempt: 'Giữ nó làm thợ đào',
    good: 'Nó chạy về, và tổ đối địch thôi trộm nấm. Không ai biết vì sao.', bad: 'Nó chạy về, rồi dẫn cả tổ đối địch quay lại trộm nhiều hơn.',
    temptGood: 'Nó đào chăm chỉ, và quên dần tổ cũ.', temptBad: 'Tổ đối địch đến đòi người, và hai tổ đánh nhau.',
    fallout: 'Tổ đối địch đặt bẫy quanh hang của bạn, giống hệt cách bạn đặt.',
    arcs: [
      ['Mê cung bẫy', 'Một đội mạo hiểm giả sắp đến, và tổ cần một mê cung bẫy bảo vệ ổ trứng.', 'Bạn vẽ sơ đồ mọi lối đi.', 'Một kẻ đề nghị dùng bẫy độc chết người.', 'Mê cung khiến đội mạo hiểm giả lạc hai ngày và bỏ về, không ai chết.'],
      ['Con thú dưới đáy hầm', 'Một con quái vật khổng lồ đang ăn thịt thợ đào trong hầm sâu.', 'Bạn lần theo dấu nó, đo bước chân nó.', 'Lãnh chúa muốn dùng thợ đào làm mồi.', 'Bạn bẫy được nó bằng một con dê, và cả tổ có thịt ăn một tháng.'],
    ],
  },
  kobold_sniffer: {
    dilemma: 'Mũi bạn bắt được mùi một vỉa Huyết Kim lớn, nằm ngay dưới ổ trứng của tổ. Đào lên thì phải dời ổ.',
    safe: 'Giữ bí mật', tempt: 'Báo cho lãnh chúa',
    good: 'Ổ trứng yên ổn. Vỉa Huyết Kim nằm đó, chờ đến khi lứa trứng nở hết.', bad: 'Một Kobold khác đánh hơi ra, và báo trước bạn. Lãnh chúa không vui vì bạn im lặng.',
    temptGood: 'Ổ trứng được dời cẩn thận. Vỉa Huyết Kim làm cả tổ giàu lên.', temptBad: 'Ổ trứng bị dời vội. Một nửa lứa trứng không nở.',
    fallout: 'Các bà mẹ Kobold biết chuyện, và bắt đầu nhìn bạn khác đi.',
    arcs: [
      ['Mạch nước ngầm', 'Tổ cạn nước, và chỉ mũi của bạn có thể tìm ra mạch mới.', 'Bạn đánh hơi khắp các hầm cũ.', 'Một tổ khác đề nghị bán nước với giá cắt cổ.', 'Bạn tìm ra mạch nước ngầm, và cả tổ không phải trả giá cho ai.'],
      ['Mùi của Rồng', 'Lãnh chúa muốn biết có Rồng thật ngủ dưới núi không.', 'Bạn đánh hơi xuống những tầng sâu nhất.', 'Một đội mạo hiểm giả trả vàng để biết Rồng ở đâu.', 'Bạn tìm thấy hơi ấm của Rồng, và giữ bí mật ấy cho riêng tổ.'],
    ],
  },
  kobold_priest: {
    dilemma: 'Tổ đói. Kho lễ vật dâng Rồng đầy nấm khô và thịt sấy. Luật đền: không ai được động vào.',
    safe: 'Mở kho cho tổ ăn', tempt: 'Giữ kho cho Rồng',
    good: 'Tổ ăn no. Bạn quỳ trước tượng Rồng cả đêm. Không có điềm xấu nào xảy ra.', bad: 'Tổ ăn no, nhưng các thầy tế khác tố bạn báng bổ, và tước áo lễ của bạn một mùa.',
    temptGood: 'Tổ đói, nhưng đức tin vững hơn. Mùa sau, một vỉa quặng mới được tìm thấy, và tổ tin đó là phần thưởng của Rồng.', temptBad: 'Ba Kobold chết đói. Mẹ của chúng không bao giờ đến đền nữa.',
    fallout: 'Một Kobold trẻ hỏi bạn: Rồng muốn chúng ta sống hay muốn chúng ta đói?',
    arcs: [
      ['Lễ tạ ơn mùa quặng', 'Tổ tìm được vỉa quặng lớn, và cần một buổi lễ tạ ơn Rồng.', 'Bạn chuẩn bị bài giảng, lễ vật, và hương khói.', 'Lãnh chúa muốn bạn tuyên bố vỉa quặng là món quà dành riêng cho hắn.', 'Bạn tuyên bố vỉa quặng là món quà cho cả tổ, và lãnh chúa không dám cãi Rồng.'],
      ['Tiếng gọi từ Đảo Tro Tàn', 'Một con Rồng thật bay qua, và cả tổ muốn đi theo nó.', 'Bạn cầu nguyện, đọc điềm, và hỏi những thầy tế già.', 'Hắc Nguyệt Hội đề nghị dẫn đường, đổi lấy đức tin của tổ.', 'Bạn giữ tổ ở lại, và giảng rằng Rồng sống trong núi chứ không ở cuối một chuyến đi.'],
    ],
  },
  kobold_overseer: {
    dilemma: 'Lãnh chúa rồng muốn bạn chọn ra năm thợ đào yếu nhất để đổi lấy một xe lương thực từ bọn buôn nô lệ.',
    safe: 'Từ chối, tìm cách khác', tempt: 'Chọn năm đứa',
    good: 'Bạn đề nghị đổi một vỉa quặng cũ thay cho người. Lãnh chúa đồng ý, miễn cưỡng.', bad: 'Lãnh chúa nổi giận, giảm khẩu phần của cả hầm một tháng.',
    temptGood: 'Năm thợ đào đi. Cả hầm ăn no. Không ai nhắc đến năm cái tên ấy.', temptBad: 'Thợ đào biết chuyện. Đêm ấy, họ đập vỡ chiếc roi của bạn.',
    fallout: 'Một trong năm thợ đào năm ấy trốn về được, và đứng ở cửa hầm nhìn bạn.',
  },
};
