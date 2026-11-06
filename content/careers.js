// Authored professional conflicts and three-step milestones. [[patron]] is
// localized by the loader; rank numbers shown to players start at one.
module.exports = {
  families: {
    warrior: {
      jobs: ['warrior','swordsman','berserker','gladiator','merc','mercenary','shield','guard','guardian','sentinel','general','war','bridge'],
      dilemma: 'Vết thương cũ lại đau đúng lúc một đối thủ bị thương xin hoãn cuộc đấu. Người chỉ huy muốn bạn giành chiến thắng ngay, bất kể danh dự.',
      safe: 'Cho đối thủ thời gian hồi sức, chịu mất tiền thưởng', tempt: 'Ép cơ thể quá sức để kết thúc cuộc đấu',
      good: 'Bạn giữ được danh dự và học cách chiến thắng bằng kỹ thuật thay vì sức liều.', bad: 'Bạn bảo toàn đối thủ nhưng mất khoản thưởng đã hứa.',
      temptGood: 'Bạn thắng trận, song cơn đau nhắc rằng cơ thể không phải thứ bất hoại.', temptBad: 'Cơ thể bị tổn thương nặng. Dù hồi phục phần nào, sức mạnh đã mất không tự trở về.', loss: {health:-20,STR:-1},
      fallout: 'Chấn thương và những lời đồn về trận đấu kéo theo một thách thức từ đồng đội cũ. Họ biết rõ điểm yếu của bạn.',
      arcs: [
        ['Lời thề ở chiến tuyến','Đoàn hộ tống mắc kẹt giữa hai chiến tuyến và cần một người chịu trách nhiệm đưa họ về.', 'Bạn khảo sát lối rút trong khi đối phương thăm dò phòng tuyến.', 'Cấp trên ra lệnh bỏ lại người bị thương để giữ đội hình. Một con đường vòng chậm hơn có thể cứu họ.', 'Bạn phải giữ lối rút mở cho đến khi người cuối cùng vượt qua.'],
        ['Cuộc đấu với người đồng đội cũ','Một người từng cùng chiến tuyến nay dẫn lực lượng đối địch. Cuộc chạm trán sẽ quyết định danh dự của cả hai.', 'Bạn tìm hiểu cách tác chiến mới của người đồng đội năm xưa.', 'Một mật lệnh yêu cầu dùng con tin để ép đối phương đầu hàng. Bạn phải chọn cách giành lợi thế.', 'Hai người đối diện tại nơi từng cùng nhau lập lời thề. Bạn quyết định trận chiến bằng bản lĩnh đã tích lũy.']
      ]
    },
    mage: {
      jobs:['mage','wl','archmage','sage','magic','spirit'],
      dilemma:'Một ma thư cổ hứa hẹn tăng quyền năng tức thì. Mỗi lần mở nó, bạn lại nghe giọng mình gọi tên từ một tương lai không tồn tại.',
      safe:'Phong ấn ma thư, tự kiểm chứng từng công thức', tempt:'Đốt thọ nguyên để đọc trang cấm',
      good:'Bạn tìm được sai lệch trong trận pháp mà không phải trả bằng những năm cuối đời.',bad:'Phép thử thất bại; bạn phải nghỉ dưỡng vì ma lực phản phệ.',temptGood:'Tri thức tràn vào tâm trí, đổi lại là một phần thọ nguyên bị thiêu rụi.',temptBad:'Ma thư nuốt lấy năng lượng sống. Quyền năng thu được không bù nổi cái giá đã trả.',loss:{health:-20,lifeCost:6},temptEffects:{lifeCost:3},
      fallout:'Những người từng nghiên cứu ma thư nhận ra dấu ấn cấm thuật trên bạn. Họ muốn chiếm lấy tri thức, hoặc bịt miệng người biết quá nhiều.',
      arcs:[
        ['Mảnh vỡ Thần Khí','[[patron]] phát hiện một mảnh Thần Khí đang làm rối loạn mạch ma lực quanh di tích.', 'Bạn đối chiếu những ký tự vỡ để tìm điểm neo của kết giới.', 'Một lối tắt dùng sinh lực thay cho năng lượng phong ấn. Con đường nghiên cứu chậm hơn vẫn còn mở.', 'Bạn tái lập trận pháp và tách mảnh Thần Khí khỏi nguồn ma lực đang bạo tẩu.'],
        ['Bí mật di tích cổ','Tranh chấp giữa các học phái đẩy một di tích vừa thức tỉnh tới bờ sụp đổ.', 'Bạn lần theo dấu sửa chữa trong bản đồ để tìm học phái đã che giấu dữ liệu.', 'Hội đồng muốn chiếm độc quyền tri thức. Bạn phải chọn bảo toàn nghiên cứu hay công bố sai phạm.', 'Bạn mở lõi di tích trước khi dòng ma lực nghiền nát những người còn mắc kẹt bên trong.']
      ]
    },
    assassin:{
      jobs:['assassin','rogue','spy','thief','stalker','blade'],
      dilemma:'Hợp đồng mới trả rất hậu. Nhưng bằng chứng cho thấy mục tiêu đang che chở người tị nạn, còn bên thuê muốn xóa dấu vết tham nhũng.',
      safe:'Bảo vệ mục tiêu và giữ lại chứng cứ',tempt:'Nhận tiền, hoàn thành hợp đồng bất chấp sự thật',
      good:'Bạn đưa mục tiêu thoát thân và giữ được chứng cứ, nhưng tổ chức đã ghi tên bạn vào danh sách cần xử lý.',bad:'Bạn để lộ đường rút và phải chịu thương tích khi che chắn cho mục tiêu.',temptGood:'Tiền được trả đủ. Những người từng được mục tiêu che chở giờ phải tự tìm đường sống.',temptBad:'Bên thuê xóa luôn nhân chứng cuối cùng là bạn; cuộc phục kích khiến bạn trọng thương.',loss:{health:-35},falloutOn:'integrity',
      fallout:'[[patron]] cử đội thanh trừng tới. Chúng biết mật hiệu, đường rút và thói quen của bạn.',
      arcs:[
        ['Kẻ phản đồ trong mạng lưới','Một danh sách mật mã bị đánh cắp. [[patron]] muốn bạn tìm ra kẻ phản đồ trước khi các đầu mối bị thủ tiêu.', 'Bạn lần theo những dấu liên lạc giả để khoanh vùng kẻ tuồn mật mã.', 'Người bị buộc tội đưa ra chứng cứ rằng chính cấp trên đã bán đứng mạng lưới. Bạn phải quyết định tin ai.', 'Bạn đột nhập nơi giao dịch để lấy danh sách gốc và đối mặt người đã dựng nên vụ phản bội.'],
        ['Tên cuối cùng trong sổ đen','Mệnh lệnh mới mang chính mật danh của bạn. Muốn sống, bạn phải giành quyền kiểm soát sổ đen của tổ chức.', 'Bạn đổi đường liên lạc và truy nguồn lệnh ám sát.', 'Một người quen đề nghị bán đứng đồng đội để đổi lấy miễn trừ. Một kế hoạch nguy hiểm hơn có thể đưa tất cả thoát ra.', 'Bạn vượt qua vòng canh cuối cùng và quyết định số phận cuốn sổ có thể chôn vùi cả mạng lưới.']
      ]
    },
    priest:{
      jobs:['priest','cleric','shaman'],
      dilemma:'Người bệnh xếp hàng trước cửa nơi hành lễ. Kho thuốc gần cạn, trong khi người giữ kho đòi dành phần tốt nhất cho nhà tài trợ giàu có.',
      safe:'Chia thuốc theo mức nguy kịch, công khai sổ kho',tempt:'Ưu tiên người trả nhiều tiền để bổ sung ngân quỹ',
      good:'Bạn cứu được những người nguy kịch và buộc người giữ kho giải trình.',bad:'Bạn đã cố cứu quá nhiều người trong một đêm; sức lực suy kiệt.',temptGood:'Ngân quỹ tăng, nhưng những người nghèo bỏ về trong im lặng.',temptBad:'Dịch bệnh lan qua khu chờ. Tiền trong tay không thể thay thế những liều thuốc đến muộn.',loss:{health:-20,joy:-15},falloutOn:'integrity',
      fallout:'Những người bị phơi bày sai phạm tìm cách tước quyền hành lễ của bạn. Lời đồn khiến người bệnh bắt đầu nghi ngờ người từng cứu mình.',
      arcs:[
        ['Những liều thuốc cuối cùng','[[patron]] giao bạn ngăn một ổ dịch trước khi các tuyến tiếp tế bị phong tỏa.', 'Bạn phân loại triệu chứng và truy nguồn nước gây bệnh.', 'Kho dự trữ chỉ đủ cho một nhóm bệnh nhân. Bạn phải tổ chức cứu chữa và tìm cách thay thế số thuốc thiếu.', 'Bạn dẫn đợt chữa trị quyết định giữa lúc dịch bệnh đạt đỉnh.'],
        ['Niềm tin trước công đường','Sổ thu chi của nơi hành lễ hé lộ việc biển thủ tiền cứu tế. Những người có quyền muốn bạn im lặng.', 'Bạn thu thập chứng từ và bảo vệ người làm chứng.', 'Một chức vị cao được đưa ra để đổi lấy sự im lặng. Bạn cân nhắc cái giá của lời khai.', 'Bạn đưa chứng cứ ra trước cộng đồng và giữ vững niềm tin khi những người quyền lực phản công.']
      ]
    },
    merchant:{
      jobs:['merchant','bu','secretary','hoard','lord','overseer'],
      dilemma:'Một hợp đồng lớn chỉ cần ký ngay. Phần chữ nhỏ trao cho chủ nợ quyền tịch thu toàn bộ hàng hóa nếu chuyến hàng chậm một ngày.',
      safe:'Đàm phán lại điều khoản và giảm quy mô chuyến hàng',tempt:'Vay nóng để ôm trọn lợi nhuận',good:'Bạn khóa được lỗ hổng hợp đồng và giữ dòng vốn trong tầm kiểm soát.',bad:'Đối tác rút lui. Bạn mất tiền chuẩn bị nhưng tránh được món nợ vượt khả năng.',temptGood:'Kho hàng đầy lên bằng tiền vay. Ngày đáo hạn đã được đánh dấu đỏ.',temptBad:'Chuyến hàng bị cướp. Chủ nợ siết tài sản, đẩy bạn sát bờ phá sản.',loss:{wealth:-50,joy:-15},
      fallout:'Chủ nợ mang hợp đồng tới đòi hàng thế chấp. Đối thủ đang chờ mua lại toàn bộ cơ nghiệp với giá rẻ mạt.',
      arcs:[
        ['Tuyến hàng đầu tiên','Bạn được đề nghị tổ chức một tuyến giao thương mới, vượt qua vùng mà các đoàn hàng trước đều chịu lỗ.', 'Bạn khảo sát nguồn cung, nơi nghỉ và những khoản phí bị che giấu.', 'Một trạm thu phí muốn nhận tiền ngoài sổ sách. Bạn chọn mua đường đi hay xây một tuyến minh bạch.', 'Bạn đưa chuyến hàng đầu tiên qua điểm nghẽn trước khi vốn lưu động cạn sạch.'],
        ['Thương lộ xuyên lục địa','Cơ hội lập tuyến thương lộ độc quyền xuất hiện, nhưng nhiều phe đều muốn kiểm soát các cửa ngõ.', 'Bạn kết nối các đầu mối và kiểm tra năng lực của từng đối tác.', 'Đề nghị độc quyền kèm điều khoản bóp nghẹt những người buôn nhỏ. Bạn phải tự đặt giới hạn cho tham vọng.', 'Bạn hoàn tất đoàn hàng liên lục địa và thương lượng hiệp ước định đoạt tương lai tuyến đường.']
      ]
    },
    smith:{
      jobs:['smith','bs','runesmith','leather','carver','wood','eng','tinker','metal','brew'],
      dilemma:'Đơn đặt hàng giáp hộ tống sắp đến hạn. Một lô vật liệu rẻ có thể giúp bạn giao đủ số lượng, nhưng vết nứt sẽ chỉ lộ ra khi người mặc chịu đòn.',
      safe:'Loại bỏ vật liệu lỗi và chịu giao hàng chậm',tempt:'Che vết nứt, nhận đủ tiền đúng hạn',good:'Bạn thay vật liệu và chứng minh chất lượng bằng một phép thử công khai.',bad:'Bạn mất khoản phạt chậm tiến độ, đổi lại không ai phải mang sản phẩm lỗi ra trận.',temptGood:'Bạn thu đủ tiền, nhưng chất lượng món hàng đã trở thành món nợ chưa trả.',temptBad:'Sản phẩm vỡ trong phép thử. Uy tín và tiền bồi thường cùng rơi khỏi tay bạn.',loss:{wealth:-25,fame:-10},
      fallout:'Khách hàng cũ quay lại với món đồ hỏng và một yêu cầu bồi thường. Phường nghề chuẩn bị mở cuộc kiểm tra.',
      arcs:[
        ['Dấu chứng chất lượng','Một đơn hàng thử nghiệm sẽ quyết định việc sản phẩm của bạn có được công nhận hay không.', 'Bạn kiểm tra nguyên liệu và phát hiện sự khác biệt giữa mẫu thử với lô hàng thật.', 'Đối thủ đề nghị đổi một ít chất lượng lấy tiến độ để cùng chia tiền thưởng.', 'Bạn hoàn thiện sản phẩm và đưa nó qua phép kiểm định không thể gian lận.'],
        ['Công trình để lại tên tuổi','[[patron]] cần một công trình có thể đứng vững trước tai họa sắp tới. Bạn được giao chịu trách nhiệm kỹ thuật.', 'Bạn tìm vật liệu hiếm và tính lại cấu trúc chịu lực.', 'Người tài trợ muốn cắt phần bảo hộ để tăng quy mô. Bạn phải bảo vệ thiết kế trước áp lực lợi nhuận.', 'Bạn đưa công trình vào phép thử cuối cùng dưới điều kiện khắc nghiệt nhất.']
      ]
    },
    farmer:{
      jobs:['farmer','herb'],
      dilemma:'Hạn hán làm nguồn nước chung gần cạn. Mở cống riêng lúc nửa đêm có thể cứu vụ mùa của bạn, nhưng phần ruộng phía hạ lưu sẽ chết khô.',
      safe:'Chia lịch tưới và thử giống chịu hạn',tempt:'Chiếm nước trước khi người khác phát hiện',good:'Bạn giữ được một phần vụ mùa và khiến các hộ chấp nhận lịch tưới chung.',bad:'Giống mới không kịp bén rễ; bạn chịu mất mùa thay vì đẩy thiệt hại sang người khác.',temptGood:'Kho lương của bạn còn đầy, trong khi ruộng hạ lưu nứt toác.',temptBad:'Tranh chấp nước bùng thành phá hoại. Cả hệ thống dẫn nước bị đập vỡ.',loss:{wealth:-30,health:-10},
      fallout:'Những hộ bị mất nước kéo tới đòi bồi thường. Sâu bệnh vừa xuất hiện ở phần ruộng bỏ khô, đe dọa cả vùng.',
      arcs:[
        ['Cứu vụ mùa hạn','Một mùa hạn đẩy vùng canh tác tới bờ đói kém. Bạn phải chứng minh một cách gieo trồng mới có thể nuôi sống cộng đồng.', 'Bạn khảo sát đất và tìm nguyên nhân khiến cây chết dù vẫn được tưới.', 'Một giống cho năng suất cao có nguy cơ mang sâu bệnh. Bạn cân nhắc thử nghiệm hay bảo toàn số hạt giống cuối.', 'Bạn dẫn đợt gieo trồng quyết định trước khi mùa mưa kết thúc.'],
        ['Kho lương qua mùa chiến loạn','Mùa chiến loạn sắp tới khiến mọi đoàn quân đều tìm cách mua hoặc cướp lương thực của vùng.', 'Bạn kiểm kê kho, sửa đường vận chuyển và tìm chỗ cất giống dự phòng.', 'Một phe đề nghị trả giá cao để độc chiếm kho lương, khiến dân cư mất phần dự trữ.', 'Bạn bảo vệ và phân phối vụ thu hoạch đủ để vùng vượt qua mùa phong tỏa.']
      ]
    },
    ranger:{
      jobs:['ranger','hunter','scout','trapper','sniffer','bh'],
      dilemma:'Dấu chân dẫn tới một con thú đang nuôi con. Tiền thưởng cho bộ da rất cao, nhưng bẫy của thợ săn khác đã làm đường rừng trở nên nguy hiểm.',
      safe:'Gỡ bẫy, đánh dấu vùng sinh sản để tránh săn quá mức',tempt:'Tranh tiền thưởng bằng một cuộc săn gấp',good:'Bạn tìm được đường an toàn và khiến những người đi sau tránh khỏi bẫy.',bad:'Bạn bị thương khi gỡ một chiếc bẫy giấu dưới lá.',temptGood:'Bạn mang chiến lợi phẩm về, song cuộc săn làm hệ sinh thái mất cân bằng.',temptBad:'Bẫy của người khác khép lại trên đường truy đuổi; bạn phải bỏ chiến lợi phẩm để thoát.',loss:{health:-25,AGI:-1},
      fallout:'Dấu thú dẫn ngược về khu dân cư. Những con vật mất lãnh thổ đang tìm thức ăn ở nơi không ai muốn chúng xuất hiện.',
      arcs:[
        ['Con đường qua rừng cấm','Một đoàn người cần vượt khu rừng mà dấu mốc đã bị xóa sạch.', 'Bạn nhận diện dấu chân giả và đánh dấu những điểm có thể phục kích.', 'Lối ngắn đi qua vùng sinh sản; lối vòng tốn thêm thời gian và lương thực.', 'Bạn dẫn đoàn qua đoạn đường cuối trước khi kẻ săn đuổi bắt kịp.'],
        ['Dấu vết của kẻ săn huyền thoại','Một sinh vật chưa từng bị theo dấu đang đẩy cả vùng vào hoảng loạn.', 'Bạn phân biệt những lời đồn với vết tích thật để tìm quy luật xuất hiện.', 'Nhà tài trợ muốn dùng mồi sống. Bạn tìm một cách dẫn dụ khác trước khi họ hành động.', 'Bạn chặn được sinh vật tại địa hình do chính mình chuẩn bị.']
      ]
    },
    paladin:{
      jobs:['paladin','dk'],
      dilemma:'Lệnh truy quét gọi cả một khu dân cư là dị giáo. Bằng chứng duy nhất là lời cáo buộc của người đang muốn chiếm đất của họ.',
      safe:'Điều tra cáo buộc trước khi tuốt vũ khí',tempt:'Thi hành mệnh lệnh để bảo toàn chức vị',good:'Bạn vạch ra lời khai giả và bảo vệ người vô tội.',bad:'Việc trì hoãn khiến bạn bị khiển trách và mất nguồn tiếp tế.',temptGood:'Bạn được thưởng vì phục tùng. Những ngôi nhà trống khiến chiến thắng trở nên nặng nề.',temptBad:'Những người bị dồn ép chống trả; cuộc truy quét biến thành một thảm họa.',loss:{health:-25,joy:-20},falloutOn:'integrity',
      fallout:'Người ra lệnh cũ cáo buộc bạn bất tuân. Đồng đội phải chọn đứng cạnh bạn hay đứng cạnh cấp trên.',
      arcs:[
        ['Lời thề và mệnh lệnh','Một chiến dịch đặt lời thề bảo hộ của bạn đối nghịch với mệnh lệnh cấp trên.', 'Bạn thu thập lời chứng từ những người bị quy tội.', 'Cấp trên muốn một bản thú tội nhanh hơn là sự thật. Bạn phải lựa chọn điều mình phụng sự.', 'Bạn đứng ra bảo vệ kết luận trước cuộc xét xử công khai.'],
        ['Ngọn cờ không phục tùng','Cả một đơn vị đang chờ bạn quyết định có tuân theo mệnh lệnh gây thảm sát hay không.', 'Bạn tìm cách đưa dân cư ra khỏi khu vực tác chiến.', 'Một cơ hội lập công đòi bỏ mặc đoàn sơ tán. Lời thề cũ lại trở về.', 'Bạn giữ vị trí cuối cùng và chịu trách nhiệm cho quyết định dưới ngọn cờ của mình.']
      ]
    },
    scholar:{
      jobs:['scholar','awakened','familiar','envoy'],
      dilemma:'Một bản thảo cổ phủ nhận học thuyết của người đang tài trợ cho bạn. Công bố nó có thể cứu nhiều nghiên cứu khỏi sai lầm, cũng có thể chấm dứt sự nghiệp.',
      safe:'Đối chiếu chứng cứ và công bố dữ liệu gốc',tempt:'Sửa kết luận để giữ nguồn tài trợ',good:'Công trình được kiểm chứng và những người nghiên cứu khác tìm đến hợp tác.',bad:'Chứng cứ chưa đủ; bạn mất nguồn tài trợ trong lúc tiếp tục đối chiếu.',temptGood:'Khoản tài trợ được gia hạn, đổi lại là một kết luận mà chính bạn không còn tin.',temptBad:'Người khác phát hiện dữ liệu bị sửa. Uy tín học thuật sụp đổ.',loss:{fame:-20,wealth:-15},
      fallout:'Một người phản biện yêu cầu kiểm tra bản gốc. Những dấu sửa trong tài liệu trở thành tâm điểm tranh luận.',
      arcs:[
        ['Bản thảo bị xóa tên','Một bản thảo không còn tên tác giả có thể thay đổi kiến thức về thời đại cũ.', 'Bạn ghép các đoạn rời và xác định niên đại thật của tài liệu.', 'Người tài trợ muốn nhận công thay tác giả đã khuất. Bạn phải chọn cách ghi lại phát hiện.', 'Bạn bảo vệ kết luận trước những học giả có lý do để phản đối nó.'],
        ['Thư viện trước đại hỏa','Kho tri thức lớn nhất vùng đứng trước nguy cơ bị thiêu hủy bởi xung đột giữa các phe.', 'Bạn lập danh mục những bản duy nhất và tổ chức việc sao lưu.', 'Không thể mang đi tất cả; bạn phải đặt tiêu chí bảo tồn thay vì cứu những thứ bán được giá nhất.', 'Bạn đưa phần tri thức còn lại qua cuộc phong tỏa và khôi phục kho lưu trữ.']
      ]
    },
    tamer:{
      jobs:['tamer','herder','rider','pet','egg'],
      dilemma:'Một sinh vật được giao cho bạn thuần dưỡng đang hoảng loạn vì vết thương cũ. Người mua đòi dùng cưỡng chế để có kết quả nhanh.',
      safe:'Chữa vết thương và xây lại sự tin cậy',tempt:'Ép phục tùng để giao đúng hạn',good:'Sinh vật tự nguyện làm theo tín hiệu đầu tiên, không còn cần dây trói.',bad:'Bạn chịu thương tích khi tiếp cận quá sớm, nhưng không khiến nó sợ hãi thêm.',temptGood:'Bạn giao được sinh vật đúng hẹn; sự phục tùng che giấu nỗi sợ chưa biến mất.',temptBad:'Hoảng loạn bùng thành chống trả. Dây trói đứt trước khi buổi kiểm tra kết thúc.',loss:{health:-30,joy:-10},
      fallout:'Nỗi sợ cũ khiến sinh vật phản ứng dữ dội giữa đám đông. Người từng mua nó đòi bạn chịu trách nhiệm.',
      arcs:[
        ['Khế ước của sự tin cậy','Bạn nhận trách nhiệm giúp một sinh vật chưa từng tin người vượt qua nỗi sợ.', 'Bạn quan sát phản ứng để tìm điều gợi lại ký ức bị săn đuổi.', 'Một phương pháp cưỡng chế có thể cho kết quả ngay. Con đường tự nguyện đòi hỏi kiên nhẫn.', 'Bạn thử sự phối hợp trong một tình huống thực sự nguy hiểm.'],
        ['Đàn thú qua vùng cháy','Một đàn sinh vật phải được đưa qua khu vực sắp bị chiến hỏa nuốt chửng.', 'Bạn tìm đường đi không khiến cả đàn hoảng loạn.', 'Một nhóm muốn bỏ lại những cá thể chậm nhất để bảo toàn phần còn lại.', 'Bạn giữ đội hình cho đến khi cả đàn vượt qua ranh giới an toàn.']
      ]
    },
    bard:{
      jobs:['bard','trickster'],
      dilemma:'Một câu chuyện bạn sắp kể có thể khơi lại hy vọng, nhưng người trả tiền muốn biến nó thành lời vu cáo một cộng đồng yếu thế.',
      safe:'Giữ sự thật dù mất người bảo trợ',tempt:'Đổi lời để nhận thù lao cao hơn',good:'Câu chuyện được truyền đi vì chạm đúng những điều người nghe đã trải qua.',bad:'Buổi diễn bị cản trở; bạn ra về mà không nhận được thù lao.',temptGood:'Bạn nhận một túi tiền nặng, cùng sự nghi kỵ của những người bị lời ca làm tổn thương.',temptBad:'Người nghe phát hiện điều bịa đặt. Danh tiếng mất nhanh hơn tiền công kiếm được.',loss:{fame:-20,joy:-10},falloutOn:'compromise',
      fallout:'Một người trong câu chuyện bị bóp méo tìm tới, mang theo chứng cứ và yêu cầu bạn đính chính trước công chúng.',
      arcs:[
        ['Khúc hát qua biên giới','Một thông điệp cần tới nơi mà lời nói bình thường không thể vượt qua các phe thù địch.', 'Bạn tìm biểu tượng và câu chuyện mà cả hai bên cùng hiểu.', 'Người bảo trợ muốn chèn lời tuyên truyền vào thông điệp hòa giải.', 'Bạn trình bày thông điệp trước những người sẵn sàng quay lưng với nhau.'],
        ['Bản trường ca của thời đại','Một biến cố lớn cần được ghi lại trước khi người chiến thắng viết lại mọi lời chứng.', 'Bạn tìm những người sống sót và đối chiếu các lời kể.', 'Một phe đề nghị xóa tên người đã chống lại họ để đổi lấy quyền lưu truyền tác phẩm.', 'Bạn công bố bản trường ca và bảo vệ những lời chứng đã lựa chọn giữ lại.']
      ]
    },
    miner:{
      jobs:['miner','custodian'],
      dilemma:'Một khoang nguyên liệu mới vừa lộ ra dấu bất ổn. Người quản việc muốn tiếp tục khai thác trước khi giá thị trường hạ xuống.',
      safe:'Dừng công việc để kiểm tra và gia cố',tempt:'Tăng sản lượng bất chấp cảnh báo',good:'Bạn phát hiện điểm nguy hiểm trước khi có người bị kẹt bên trong.',bad:'Ca làm bị hủy và tiền công giảm, nhưng khu vực đã được giữ an toàn.',temptGood:'Nguyên liệu được đưa ra nhanh. Những vết bất ổn vẫn lan rộng trong im lặng.',temptBad:'Sự cố cuốn đi phần lớn sản lượng và khiến bạn trọng thương.',loss:{health:-35,wealth:-15},
      fallout:'Khu khai thác cũ xuất hiện dấu sụp đổ và rò rỉ. Những người còn làm việc ở đó cần được đưa ra.',
      arcs:[
        ['Mạch tài nguyên bị khóa','Một nguồn nguyên liệu quan trọng bị phong tỏa vì tai nạn chưa rõ nguyên nhân.', 'Bạn khảo sát các dấu nứt và kiểm tra nơi từng xảy ra sự cố.', 'Người quản việc muốn bỏ qua một nhánh chưa được kiểm định để nhanh chóng khôi phục sản lượng.', 'Bạn mở lại nguồn tài nguyên bằng một quy trình có thể bảo vệ những người làm việc cùng mình.'],
        ['Những người dưới tầng sâu','Một đoàn khai thác bị cắt khỏi đường trở về trong vùng nguyên liệu cực kỳ nguy hiểm.', 'Bạn xác định vị trí đoàn và điểm có thể mở đường cứu hộ.', 'Lối ngắn cứu người nhanh hơn nhưng có nguy cơ làm sập toàn bộ khu vực.', 'Bạn giữ đường cứu hộ ổn định cho đến khi người cuối cùng ra ngoài.']
      ]
    }
  },
  overrides: {
    human_gladiator: {
      dilemma:'Người quản đấu đưa bạn một kịch bản dàn xếp: trận này phải có người chết để bán đủ vé. Đối thủ đứng bên kia sân là người từng chia nước cho bạn trong phòng chờ.',
      safe:'Phá kịch bản, giữ mạng đối thủ',tempt:'Đánh đến chết để lấy lòng người tổ chức',
      good:'Bạn biến trận đấu thành một cuộc so tài thật sự và cả hai cùng rời sân còn sống.',bad:'Người quản đấu cắt tiền thưởng vì bạn không làm theo kịch bản.',temptGood:'Khán đài gào tên bạn. Sau cánh cổng, chỗ ngồi của đối thủ đã trống.',temptBad:'Bạn bị cuốn vào một đòn phản công tuyệt vọng. Cơ thể sẽ còn mang hậu quả của trận đấu này.',
      fallout:'Người quản đấu muốn dùng những bí mật hậu trường để buộc bạn tham gia một trận dàn xếp khác.',
      arcs:[
        ['Vòng đấu không có kịch bản','Một giải đấu mới hứa quyền thi đấu độc lập cho người vượt qua vòng tuyển chọn.', 'Bạn tìm hiểu lối đánh của đối thủ thay vì nghe những lời mách nước có trả tiền.', 'Người tổ chức đề nghị bạn giả thua để đổi lấy suất thi đấu vòng sau.', 'Bạn bước vào trận quyết định mà không có ai viết sẵn kết quả.'],
        ['Nhà vô địch và cánh cổng','Danh hiệu nhà vô địch đi kèm quyền quyết định số phận một nhóm võ sĩ đang bị trói trong hợp đồng bất công.', 'Bạn thu thập các điều khoản hợp đồng và tìm người chịu đứng ra làm chứng.', 'Một khoản tiền lớn được đưa ra nếu bạn bỏ qua những võ sĩ không còn bán được vé.', 'Bạn bảo vệ danh hiệu trước người được cử tới để giữ nguyên trật tự đấu trường.']
      ]
    },
    human_mercenary: {
      dilemma:'Đoàn chủ thuê yêu cầu rút khỏi một ngôi làng vừa bị tập kích. Hợp đồng bảo vệ hàng hóa, không bảo vệ dân làng; tiếng cầu cứu vẫn vọng từ phía sau.',
      safe:'Tổ chức cứu dân dù phải mất tiền hợp đồng',tempt:'Bỏ lại ngôi làng, đưa hàng đi đúng hẹn',
      good:'Bạn mở được một đường sơ tán, đổi lấy việc không nhận đủ thù lao.',bad:'Cuộc cứu hộ khiến bạn bị thương và đoàn chủ từ chối trả phần công còn lại.',temptGood:'Tiền được trả đúng hạn. Những người đi cùng tránh nhắc tới ngôi làng đã bỏ lại.',temptBad:'Đoàn hàng vẫn bị phục kích sau khi mất chỗ trú. Không ai ở ngôi làng cũ còn sẵn lòng giúp bạn.',loss:{health:-25,wealth:-20},
      fallout:'Người sống sót của chuyến hộ tống cũ tìm tới đòi bạn giải thích điều đã xảy ra với ngôi làng.',
      arcs:[
        ['Hợp đồng qua vùng phong tỏa','Một hợp đồng hộ tống yêu cầu đưa người và vật tư qua vùng mà cả hai phe đều cấm lưu thông.', 'Bạn kiểm tra đường đi và phân biệt trạm kiểm soát thật với những kẻ giả danh.', 'Người trả tiền muốn bỏ lại một nhóm người làm chậm đoàn.', 'Bạn giữ đoàn nguyên vẹn qua đợt truy kích cuối cùng.'],
        ['Điều lệ của đoàn tự do','Bạn có cơ hội đặt ra điều lệ cho một đoàn đánh thuê đủ lớn để tự chọn những hợp đồng sẽ nhận.', 'Bạn thương lượng nghĩa vụ, quyền lợi và phần bồi thường cho người bị thương.', 'Một khách hàng lớn đòi quyền sai khiến đoàn bất kể người vô tội sẽ chịu hậu quả gì.', 'Bạn dẫn đoàn thực hiện hợp đồng đầu tiên theo điều lệ do chính mình bảo vệ.']
      ]
    }
  },
  patrons:{human_mage:'Tháp Ngà',human_scholar:'Tháp Ngà',human_assassin:'Umbra Guild',human_priest:'Giáo hội Lumina',human_smith:'Phường thợ rèn',human_farmer:'Hội nông dân',human_merchant:'Thương hội'},
};

const corrections = require('./career-corrections');
Object.assign(module.exports.families,corrections.families);
module.exports.jobFamilies=corrections.jobFamilies;
Object.assign(module.exports.overrides,corrections.overrides);
