// Each Slime trade's own everyday dilemma, its aftermath and its two promotion trials
// (ranks 2 and 4). Arc: [title, intro, survey step, temptation step, final step].
module.exports = {
  slime_metal: {
    dilemma: 'Một đứa trẻ thợ rèn đánh rơi chiếc búa của cha nó xuống khe đá. Bạn có thể nuốt nó, như mọi miếng sắt khác.',
    safe: 'Đẩy chiếc búa trả lại', tempt: 'Nuốt, sắt là sắt',
    good: 'Đứa trẻ nhặt búa, nhìn bạn, và để lại một chiếc đinh như lời cảm ơn.', bad: 'Đứa trẻ thấy bạn, hét lên, và cả làng kéo đến với đuốc.',
    temptGood: 'Sắt tốt. Bạn cứng thêm một chút. Đứa trẻ khóc suốt đường về.', temptBad: 'Chiếc búa có rune khắc. Nó làm bạn đau bụng ba ngày.',
    fallout: 'Người thợ rèn trong làng đặt một cái bẫy sắt cạnh khe đá. Hoặc một đống đinh cũ. Tùy chuyện năm ấy.',
    arcs: [
      ['Mỏ sắt bỏ hoang', 'Một mỏ sắt bỏ hoang đầy quặng vụn, và một bầy Slime khác cũng đang nhắm tới.', 'Bạn bò quanh mỏ, nếm từng vỉa quặng.', 'Một Slime lớn đề nghị cả hai cùng ăn bầy nhỏ hơn.', 'Bạn chia mỏ với bầy nhỏ, và ăn đủ để cứng lên một bậc.'],
      ['Lò lửa của núi', 'Lửa trong lòng núi đủ nóng để tôi bạn thành thép thật.', 'Bạn bò xuống gần dung nham, từng chút một.', 'Một pháp sư đề nghị dùng phép bảo vệ bạn, đổi lấy một nửa cơ thể bạn.', 'Bạn tự bước vào lửa, và bước ra sáng như bạc.'],
    ],
  },
  slime_magic: {
    dilemma: 'Một học viên Tháp Ngà bị thương trong rừng, ma lực cạn kiệt. Bạn có thể truyền mana cho cậu, nhưng sẽ nhỏ lại một nửa.',
    safe: 'Truyền mana cho cậu', tempt: 'Hấp thụ chút mana còn lại của cậu',
    good: 'Cậu tỉnh dậy, thấy một Slime nhỏ xíu phát sáng yếu ớt bên cạnh. Cậu mang bạn về Tháp, chăm cho bạn lớn lại.', bad: 'Cậu tỉnh dậy, hoảng sợ, và chạy mất. Bạn nhỏ lại một nửa, một mình.',
    temptGood: 'Bạn lớn thêm. Cậu ngủ thiếp đi, và tỉnh dậy sau ba ngày, không nhớ gì.', temptBad: 'Cậu không tỉnh dậy nữa.',
    fallout: 'Tháp Ngà cử người đi tìm một Slime phát sáng trong rừng.',
    arcs: [
      ['Giao điểm Leyline', 'Một giao điểm Leyline mới mở ra, và mọi sinh vật ma thuật kéo đến.', 'Bạn bò quanh giao điểm, cảm nhận dòng chảy.', 'Một con Rồng con đề nghị đuổi hết kẻ khác đi, chia đôi.', 'Bạn để mọi sinh vật uống, mỗi kẻ một ít, và giao điểm không cạn.'],
      ['Câu thần chú vĩ đại', 'Bạn muốn phát ra một câu thần chú mà chưa Slime nào làm được.', 'Bạn đọc mọi cuốn sách phép bạn từng ăn.', 'Một giọng nói từ Vực Thẳm đề nghị dạy bạn câu thần chú ấy.', 'Bạn tự tìm ra nó, và bầu trời sáng lên một khoảnh khắc.'],
    ],
  },
  slime_poison: {
    dilemma: 'Một con suối bị nhiễm độc từ xác thú chết. Bạn có thể ăn sạch chất độc, hoặc để nó lan ra, làm đầm lầy rộng hơn.',
    safe: 'Ăn sạch chất độc', tempt: 'Để nó lan',
    good: 'Con suối trong lại. Một đàn nai quay lại uống nước.', bad: 'Chất độc quá nhiều. Bạn ốm một mùa.',
    temptGood: 'Đầm lầy rộng thêm. Nhiều chỗ cho Slime độc hơn.', temptBad: 'Làng dưới suối mất ba đứa trẻ. Họ đốt bìa đầm.',
    fallout: 'Dân làng dưới suối bắt đầu để ý đến đầm lầy.',
    arcs: [
      ['Mùa tảo độc', 'Tảo độc màu tím bùng phát trên Sông Bùn Nhão, giết sạch cá.', 'Bạn nếm từng vũng nước, tìm nguồn gốc.', 'Một ma đạo sĩ đề nghị mua hết tảo độc để làm vũ khí.', 'Bạn ăn sạch nguồn tảo, và con sông sống lại.'],
      ['Độc của Đầm Lầy Tử Khí', 'Khí Miasma từ sâu trong đầm tràn ra, đe dọa cả Thảo Nguyên.', 'Bạn lặn xuống đáy đầm, tìm nơi khí bốc lên.', 'Hắc Nguyệt Hội muốn bạn để khí lan ra.', 'Bạn bịt nguồn khí bằng chính cơ thể mình, và giữ nó ở đó.'],
    ],
  },
  slime_mimic: {
    dilemma: 'Một đứa trẻ lạc vào hầm ngục, khóc, và ngồi lên bạn, đang giả làm chiếc ghế đá.',
    safe: 'Giữ yên, để nó nghỉ', tempt: 'Ăn',
    good: 'Nó ngủ thiếp đi trên bạn. Sáng ra, bạn giả làm một con đường mòn dẫn nó ra cửa hầm.', bad: 'Nó ngủ quá lâu. Mạo hiểm giả tìm thấy nó, và tìm thấy cả bạn.',
    temptGood: 'Bạn no. Không ai biết. Bạn không ăn được gì trong một tuần sau đó.', temptBad: 'Mẹ nó tìm đến. Bà mang theo đuốc, và bà biết mình đang tìm gì.',
    fallout: 'Tin đồn về chiếc ghế đá biết dẫn đường lan khắp các quán rượu.',
    arcs: [
      ['Phòng kho báu giả', 'Một đội mạo hiểm giả lớn kéo vào hầm, và bạn phải giữ phòng kho báu thật.', 'Bạn giả làm mười chiếc rương khác nhau, luyện từng cái.', 'Một Mimic khác đề nghị cùng ăn cả đội.', 'Bạn dẫn họ đến phòng kho báu giả đầy sỏi, và họ bỏ về.'],
      ['Gương mặt thật', 'Bạn muốn giả làm một người, đủ hoàn hảo để đi qua cổng thành.', 'Bạn quan sát người qua lại suốt một mùa.', 'Một gián điệp đề nghị dạy bạn, đổi lấy việc giả làm một vị quan.', 'Bạn đi qua cổng thành, mua một ổ bánh, và đi về. Không ai biết.'],
    ],
  },
  slime_pet: {
    dilemma: 'Một con thú xiếc khác bị đánh vì diễn hỏng. Bạn có thể nhận lỗi về mình, vì Slime chịu đòn tốt hơn.',
    safe: 'Nhận lỗi thay nó', tempt: 'Giữ im lặng',
    good: 'Roi đánh vào bạn, bật ra. Không đau lắm. Con thú kia nằm cạnh lồng bạn đêm ấy.', bad: 'Người quản đoàn không tin, và đánh cả hai.',
    temptGood: 'Con thú bị đánh, nhưng không nặng. Nó không nhìn bạn suốt một tuần.', temptBad: 'Nó bị đánh nặng. Nó không diễn được nữa, và bị bán.',
    fallout: 'Những con thú trong đoàn bắt đầu tụ quanh lồng bạn mỗi đêm.',
    arcs: [
      ['Tiết mục mới', 'Đoàn xiếc sắp đến thành phố lớn, và cần một tiết mục chưa ai thấy.', 'Bạn thử nặn mọi hình dạng, tìm thứ khán giả chưa từng thấy.', 'Người quản đoàn muốn bạn diễn với lửa thật.', 'Bạn nặn mình thành một cầu vồng bằng nước và ánh đèn, và khán giả lặng người.'],
      ['Đêm diễn cuối mùa', 'Đêm diễn cuối mùa, cả thành phố đến xem.', 'Bạn tập cùng mọi con thú trong đoàn.', 'Một đoàn đối thủ đề nghị mua bạn với giá cao.', 'Cả đoàn diễn cùng nhau, và bạn là sợi dây nối mọi tiết mục.'],
    ],
  },
};
