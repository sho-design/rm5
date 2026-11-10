import { draft } from "./review";

/**
 * Vietnamese pages (November 2026). Every string is new and unreviewed: a fluent clinician must check the medical
 * wording, and the clinic must approve it, before launch (RM-HB-COMMS applies in Vietnamese too: plain, warm, no
 * superlatives, no outcome claims, sentence case). Facts come from the approved English pages; nothing new is added.
 * Addressed as "bạn" throughout; the reviewer may prefer "quý vị" for older readers.
 */

export const viChrome = {
  skip: draft("Đến nội dung chính"),
  nav: [
    { t: draft("Trang chủ"), k: "home" },
    { t: draft("Bệnh nhân mới"), k: "register" },
    { t: draft("Truyền sắt"), k: "iron" },
    { t: draft("Liên hệ"), k: "contact" },
  ] as const,
  navLabel: draft("Các trang tiếng Việt"),
  book: draft("Đặt lịch hẹn"),
  english: "English",
  englishLabel: "Read this page in English",
  emergency: draft("Cấp cứu: gọi 911"),
  footerLead: draft("Phòng khám đa khoa do bác sĩ dẫn dắt tại Thornhill. Chăm sóc bằng tiếng Anh và tiếng Việt."),
  footerAll: draft("Các trang khác hiện chỉ có tiếng Anh."),
  footerAllLink: draft("Xem toàn bộ trang web (tiếng Anh) ›"),
  disclaimer: draft("Thông tin trên trang này chỉ để tham khảo và không thay thế lời khuyên y khoa. Restoration Medical nằm trên vùng đất truyền thống của các dân tộc Anishinaabe, Haudenosaunee và Wendat, và vùng đất theo hiệp ước của Mississaugas of the Credit."),
  hoursTitle: draft("Giờ mở cửa tại Thornhill"),
  address: draft("700 Centre St (bên trong Walmart), Thornhill, ON L4J 0A7"),
  directions: draft("Chỉ đường ›"),
  hours: [
    [draft("Thứ Hai, thứ Tư, thứ Năm"), draft("9 giờ sáng đến 4 giờ chiều")],
    [draft("Thứ Ba"), draft("3 giờ chiều đến 9 giờ tối")],
    [draft("Thứ Bảy"), draft("8 giờ sáng đến 4 giờ chiều")],
    [draft("Chủ Nhật"), draft("8 giờ sáng đến 2 giờ chiều")],
    [draft("Thứ Sáu"), draft("Nghỉ")],
  ] as [string, string][],
  phoneLabel: draft("Điện thoại"),
  faxLabel: "Fax",
  emailLabel: "Email",
  /** The online forms are in English for now. Built on the approved FAQ line about Vietnamese. */
  formsNote: draft("Mẫu đặt hẹn và đăng ký trực tuyến hiện bằng tiếng Anh. Bạn có thể chọn Tiếng Việt làm ngôn ngữ ưu tiên trong mẫu, hoặc gọi 905-709-3222 và xin nói chuyện bằng tiếng Việt."),
  orCall: draft("hoặc gọi 905-709-3222"),
  readMoreEn: draft("Đọc thêm (tiếng Anh) ›"),
  seeMore: draft("Xem thêm ›"),
  /** Shorter than "Đọc thêm (tiếng Anh) ›": the services lead already says the other pages are in English. */
  seeMoreEn: draft("Xem thêm (EN) ›"),
};

export const viHome = {
  title: draft("Restoration Medical, phòng khám nói tiếng Việt tại Thornhill"),
  description: draft("Y khoa gia đình, điều trị đau, truyền sắt, thẩm mỹ y khoa và phục hồi chức năng tại Thornhill. Cả hai bác sĩ và nhiều nhân viên nói tiếng Việt. Gọi 905-709-3222."),
  eyebrow: draft("Chăm sóc bằng tiếng Việt"),
  h1: draft("Bác sĩ nói tiếng Việt, ngay tại Thornhill."),
  lead: draft("Restoration Medical là phòng khám do bác sĩ dẫn dắt: y khoa gia đình, điều trị đau, truyền dịch, thẩm mỹ y khoa và phục hồi chức năng. Cả hai bác sĩ và nhiều nhân viên nói tiếng Việt."),
  cta2: draft("Gọi 905-709-3222"),
  pills: [draft("Hai bác sĩ nói tiếng Việt"), draft("Xét nghiệm máu tại chỗ"), draft("Mở tối thứ Ba và cuối tuần")],
  imgAlt: draft("Một gia đình nhiều thế hệ đi dạo trong công viên"),
  servicesTitle: draft("Chúng tôi có thể giúp gì."),
  servicesLead: draft("Năm dịch vụ dưới một mái nhà, dùng chung một hồ sơ bệnh án. Trang chi tiết hiện bằng tiếng Anh, trừ trang truyền sắt."),
  services: [
    { k: "family", t: draft("Y khoa gia đình"), d: draft("Khám tổng quát, bệnh mãn tính như huyết áp cao và tiểu đường, trẻ em, sức khỏe phụ nữ và nam giới. OHIP chi trả."), to: "family" },
    { k: "pain", t: draft("Trung tâm điều trị đau"), d: draft("Tiêm phong bế thần kinh, tiêm điểm đau và tiêm khớp do bác sĩ thực hiện, có siêu âm hướng dẫn. OHIP chi trả khi có giấy giới thiệu của bác sĩ. Chưa có giấy giới thiệu? Bác sĩ gia đình của chúng tôi có thể khám và giới thiệu bạn ngay tại phòng khám."), to: "pain" },
    { k: "infusion", t: draft("Truyền dịch và truyền sắt"), d: draft("Truyền sắt cho người thiếu sắt, truyền dịch vitamin và tiêm vitamin như B12."), to: "viIron" },
    { k: "aesthetics", t: draft("Thẩm mỹ y khoa"), d: draft("Tư vấn, tiêm thẩm mỹ, chăm sóc da và laser, sau khi được đánh giá kỹ."), to: "aesthetics" },
    { k: "rehab", t: draft("Phục hồi chức năng"), d: draft("Vật lý trị liệu, nắn chỉnh cột sống, xoa bóp trị liệu và vận động trị liệu."), to: "rehab" },
  ],
  whyTitle: draft("Nói chuyện bằng ngôn ngữ của bạn."),
  why: [
    { t: draft("Từ lúc đặt hẹn đến khi tái khám"), d: draft("Lễ tân, điều dưỡng và bác sĩ đều có thể nói chuyện trực tiếp với bạn bằng tiếng Việt.") },
    { t: draft("Xét nghiệm máu ngay tại phòng khám"), d: draft("Lấy máu tại chỗ, không cần đi nơi khác.") },
    { t: draft("Siêu âm cầm tay không dây"), d: draft("Bác sĩ dùng máy siêu âm cầm tay Clarius để hướng dẫn mũi tiêm khi cần.") },
    { t: draft("Ngày sức khỏe phụ nữ"), d: draft("Chủ Nhật cuối cùng mỗi tháng, 8 giờ sáng đến 2 giờ chiều, xét nghiệm với điều dưỡng. Tất cả điều dưỡng của chúng tôi là nữ."), link: draft("Đặt chỗ (mẫu đơn tiếng Anh) ›"), to: "/book?service=family&visit=womensday&lang=vi" },
  ],
  doctorsTitle: draft("Bác sĩ của chúng tôi"),
  doctors: [
    { n: "Dr. Johnny Nguyen", r: draft("Giám đốc y khoa") },
    { n: "Dr. Joseph Truong", r: draft("Bác sĩ") },
  ],
  doctorsNote: draft("Cả hai bác sĩ đều nói tiếng Anh và tiếng Việt."),
  bandTitle: draft("Bạn là bệnh nhân mới?"),
  bandSub: draft("Đăng ký với bác sĩ gia đình. Chúng tôi xác nhận trong vòng 2 ngày làm việc."),
  bandCta: draft("Đăng ký bệnh nhân mới"),
};

export const viRegister = {
  title: draft("Đăng ký bệnh nhân mới"),
  description: draft("Đăng ký với bác sĩ gia đình nói tiếng Việt tại Restoration Medical, Thornhill. Chúng tôi xác nhận trong vòng 2 ngày làm việc."),
  eyebrow: draft("Bệnh nhân mới"),
  h1: draft("Đăng ký với bác sĩ gia đình."),
  lead: draft("Chỉ mất khoảng hai phút. Chúng tôi xác nhận trong vòng 2 ngày làm việc, rồi hẹn lần khám đầu tiên với bạn: một buổi hẹn dài hơn để bác sĩ hiểu về bạn."),
  cta: draft("Mở mẫu đăng ký"),
  imgAlt: draft("Bác sĩ trò chuyện với bệnh nhân trong phòng khám"),
  stepsTitle: draft("Các bước."),
  steps: [
    { t: draft("Điền mẫu đăng ký"), d: draft("Mẫu trực tuyến bằng tiếng Anh, có chỗ chọn Tiếng Việt làm ngôn ngữ ưu tiên. Hoặc gọi chúng tôi, nhân viên nói tiếng Việt sẽ giúp bạn.") },
    { t: draft("Chúng tôi liên lạc lại"), d: draft("Trong vòng 2 ngày làm việc để xác nhận.") },
    { t: draft("Lần khám đầu tiên"), d: draft("Một buổi hẹn dài hơn để bác sĩ tìm hiểu sức khỏe và tiền sử của bạn.") },
  ],
  bringTitle: draft("Mang theo khi đến khám"),
  bring: [draft("Thẻ sức khỏe Ontario"), draft("Danh sách thuốc bạn đang dùng, hoặc mang theo hộp thuốc"), draft("Kết quả xét nghiệm hoặc giấy tờ y tế cũ, nếu có")],
  costTitle: draft("Chi phí"),
  cost: [
    { k: draft("Có thẻ OHIP"), v: draft("Khám bác sĩ được OHIP chi trả") },
    { k: draft("Không có OHIP"), v: draft("$100 cộng HST cho mỗi lần khám bác sĩ, có biên lai") },
    { k: draft("Thẻ tỉnh bang khác"), v: draft("Có thể được thanh toán liên tỉnh. Chúng tôi xác nhận trước buổi khám.") },
  ],
  bandTitle: draft("Bạn có câu hỏi trước khi đăng ký?"),
  bandSub: draft("Gọi chúng tôi và xin nói chuyện bằng tiếng Việt."),
  bandCta: draft("Gọi 905-709-3222"),
};

export const viIron = {
  title: draft("Truyền sắt tại Thornhill"),
  description: draft("Đánh giá thiếu sắt và truyền sắt tại Restoration Medical, Thornhill, bằng tiếng Việt. Đánh giá và xét nghiệm máu do OHIP chi trả."),
  eyebrow: draft("Truyền sắt"),
  h1: draft("Lúc nào cũng mệt? Thiếu sắt có thể là lý do."),
  lead: draft("Bắt đầu bằng một buổi đánh giá sắt với bác sĩ. Buổi đánh giá và xét nghiệm máu được OHIP chi trả. Nếu cần truyền sắt, bác sĩ sẽ lên kế hoạch cùng bạn."),
  cta: draft("Đặt hẹn đánh giá sắt"),
  imgAlt: draft("Điều dưỡng chuẩn bị truyền sắt cho bệnh nhân"),
  pills: [draft("Đánh giá do OHIP chi trả"), draft("Mỗi lần truyền khoảng 3 giờ")],
  stepsTitle: draft("Từ đánh giá đến truyền sắt."),
  steps: [
    { t: draft("Đánh giá và xét nghiệm máu"), d: draft("Với bác sĩ, vào bất kỳ ngày nào phòng khám mở cửa. OHIP chi trả.") },
    { t: draft("Kế hoạch của bạn"), d: draft("Thường là 3 lần truyền, đôi khi 1 hoặc 2 lần, theo chỉ định của bác sĩ.") },
    { t: draft("Ngày truyền"), d: draft("Mỗi lần khoảng 3 giờ, vào thứ Ba, thứ Bảy và Chủ Nhật.") },
  ],
  priceTitle: draft("Chi phí mỗi lần truyền."),
  priceLead: draft("Phí tự trả, có biên lai. Buổi đánh giá và xét nghiệm máu do OHIP chi trả."),
  prices: [
    { t: draft("Venofer (sắt sucrose) 300 mg"), d: draft("Do phòng khám cung cấp. Loại được dùng nhiều nhất."), p: "$400" },
    { t: draft("Monoferric 500 mg"), d: draft("Do phòng khám cung cấp."), p: "$550" },
    { t: draft("Chỉ phí truyền"), d: draft("Khi bạn mang theo sắt của mình."), p: "$250" },
  ],
  perVisit: draft("mỗi lần"),
  timesTitle: draft("Giờ bắt đầu muộn nhất"),
  times: [
    { k: draft("Thứ Ba"), v: draft("6:30 tối") },
    { k: draft("Thứ Bảy"), v: draft("1 giờ chiều") },
    { k: draft("Chủ Nhật"), v: draft("11 giờ sáng") },
  ],
  bandTitle: draft("Bắt đầu bằng một buổi đánh giá sắt."),
  bandSub: draft("Bác sĩ xem xét triệu chứng và kết quả xét nghiệm máu, rồi cùng bạn quyết định bước tiếp theo."),
};

export const viContact = {
  title: draft("Liên hệ"),
  description: draft("Liên hệ Restoration Medical, Thornhill, bằng tiếng Việt. Gọi 905-709-3222, fax 905-761-7306 hoặc email contact@restorationmedical.ca."),
  eyebrow: draft("Liên hệ"),
  h1: draft("Liên hệ với chúng tôi."),
  lead: draft("Gọi điện và xin nói chuyện bằng tiếng Việt. Chúng tôi trả lời trong giờ mở cửa."),
  callSub: draft("Xin nói tiếng Việt"),
  emailSub: draft("Không gửi thông tin y tế qua email"),
  faxSub: draft("Cho bác sĩ và nhà thuốc"),
  visitTitle: draft("Đến phòng khám"),
  visitNote: draft("Phòng khám nằm bên trong Walmart, có bãi đậu xe miễn phí."),
  emergencyTitle: draft("Trường hợp khẩn cấp"),
  emergency: draft("Nếu là trường hợp khẩn cấp, hãy gọi 911 hoặc đến phòng cấp cứu gần nhất. Để được tư vấn sức khỏe bất cứ lúc nào, ngày hay đêm, gọi Health811 ở số 811."),
  mapleTitle: draft("Maple, sắp mở cửa"),
  maple: draft("2620 Rutherford Rd, Unit 105 đến 107, Maple, ON L4K 0H1. Chưa có ngày mở cửa."),
};
