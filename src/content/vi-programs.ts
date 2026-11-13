import { draft } from "./review";
import { aesPrograms, combinedPlans, programsCopy, regimens, type Program, type Regimen } from "./programs";

/*
 * Vietnamese programs, combined plans and SkinCeuticals regimens (November 2026). Same structure, order, product
 * names and prices as `programs.ts`; only the words change. Unreviewed: a fluent clinician must check the wording and
 * the clinic must approve it before launch. Treatment and product brand names stay in English, as on the clinic menu.
 */

export const viProgramsCopy: typeof programsCopy = {
  aesEyebrow: draft("Chương trình"),
  aesTitle: draft("Các liệu trình kết hợp với nhau."),
  aesLead: draft(
    "Phần lớn kế hoạch kết hợp một liệu trình có tác dụng nhanh hơn với một liệu trình chậm hơn và một quy trình chăm sóc da, theo thứ tự nhất định. Buổi tư vấn sẽ điều chỉnh các bước cho bạn, và chương trình được báo giá bằng văn bản thành một tổng số. Mỗi phần cũng có thể làm riêng.",
  ),
  forLabel: draft("Dành cho"),
  lengthLabel: draft("Thời gian"),
  priceNote: draft("Báo giá bằng văn bản tại buổi tư vấn miễn phí"),
  book: draft("Hỏi về chương trình này"),
  reason: (t: string) => (/^Chương trình/i.test(t) ? t : draft(`Chương trình ${t}`)),
  eventLink: draft("Lên kế hoạch từ ngày sự kiện"),
  routine: (t: string) => draft(`Chăm sóc tại nhà: ${t}`),
  combinedEyebrow: draft("Kế hoạch kết hợp"),
  combinedTitle: draft("Bắt đầu từ một câu hỏi y khoa."),
  combinedLead: draft(
    "Bác sĩ, xét nghiệm máu, truyền dịch và thẩm mỹ dùng chung một hồ sơ, nên kế hoạch có thể bắt đầu bằng việc tìm nguyên nhân. Phần được OHIP chi trả vẫn do OHIP chi trả và không bao giờ nằm trong giá trọn gói.",
  ),
  startLabel: draft("Bắt đầu với"),
  thenLabel: draft("Sau đó, tự trả, có báo giá bằng văn bản trước"),
  upkeepLabel: draft("Duy trì"),
  regEyebrow: draft("Quy trình SkinCeuticals"),
  regTitle: draft("Chăm sóc da tại nhà."),
  regLead: draft(
    "Mỗi kế hoạch đều có quy trình chăm sóc tại nhà. Đây là gợi ý ban đầu; y tá sẽ điều chỉnh theo làn da của bạn tại buổi tư vấn. Giá theo giá bán lẻ đề nghị của SkinCeuticals, chưa gồm HST.",
  ),
  regTotal: draft("Tổng cộng, chưa gồm HST"),
  regAm: draft("Buổi sáng"),
  regPm: draft("Buổi tối"),
  regPmNone: draft("Sữa rửa mặt và kem dưỡng bạn đang dùng."),
  regOrder: draft("Thứ tự sử dụng"),
  regPairs: draft("Thường đi kèm với"),
  regHow: draft("Các sản phẩm phối hợp thế nào"),
  roles: {
    "gentle-cleanser": draft("Sữa rửa mặt. Làm sạch dầu, trang điểm và kem chống nắng mà không làm khô da."),
    "simply-clean": draft("Sữa rửa mặt. Làm sạch da sau một ngày."),
    "soothing-cleanser": draft("Sữa rửa mặt dịu nhẹ cho da dễ rát."),
    "lha-cleansing-gel": draft("Gel rửa mặt có acid nhẹ cho lỗ chân lông."),
    "ce-ferulic": draft("Serum vitamin C. Chống oxy hóa, thoa dưới kem chống nắng."),
    "phloretin-cf": draft("Serum vitamin C. Chống oxy hóa cho da không đều màu."),
    "silymarin-cf": draft("Serum vitamin C dành cho da dầu."),
    "serum-10-aox": draft("Serum vitamin C nồng độ thấp cho da nhạy cảm."),
    "tnxa-shot": draft("Serum làm đều màu da. Tranexamic acid cho đốm nâu."),
    "retinol-03": draft("Retinol, một dạng vitamin A, nồng độ cho người mới. Chỉ dùng buổi tối."),
    "lha-serum": draft("Serum lỗ chân lông. Acid nhẹ giúp lỗ chân lông thông thoáng."),
    "phyto-corrective-gel": draft("Gel làm dịu từ thực vật, cho da đỏ."),
    "hydrating-b5-gel": draft("Gel cấp ẩm có vitamin B5. Giữ nước cho da."),
    "epidermal-repair": draft("Kem dưỡng. Làm dịu và bảo vệ da khi đang lành."),
    "physical-fusion": draft("Kem chống nắng khoáng SPF 50, có màu nhẹ."),
    "sheer-physical": draft("Kem chống nắng khoáng SPF 50, hoàn thiện lì."),
    "clear-daily-soothing": draft("Kem chống nắng SPF 50 nhẹ cho da nhạy cảm."),
  } as Record<string, string>,
  seeAll: draft("Xem tất cả sản phẩm (tiếng Anh)"),
  regNote: draft("Chúng tôi bán các sản phẩm này và có lợi nhuận từ việc bán. Bạn không bao giờ phải mua sản phẩm để được điều trị."),
};

const prog: Record<string, Omit<Program, "k" | "color">> = {
  glass: {
    t: draft("Da căng bóng (Glass skin)"),
    forWhom: draft("Da xỉn màu, màu da không đều, lỗ chân lông"),
    steps: [draft("Bắt đầu với HydraFacial"), draft("Glass facial ba lần, xen kẽ với PicoSure ba lần"), draft("Quy trình sắc tố và màu da tại nhà")],
    length: draft("Khoảng 12 tuần"),
  },
  eyes: {
    t: draft("Làm tươi vùng mắt"),
    forWhom: draft("Nếp nhăn, vùng trũng và da mí mắt"),
    steps: [draft("Thuốc giãn cơ cho nếp nhăn ở đuôi mắt"), draft("PRF hai lần cho vùng dưới mắt"), draft("Điều trị plasma mí mắt hai lần, nếu phù hợp")],
    length: draft("Khoảng 12 đến 16 tuần"),
  },
  jaw: {
    t: draft("Đường hàm và mặt dưới"),
    forWhom: draft("Đường nét khuôn mặt, da bắt đầu chùng, cơ hàm to"),
    steps: [draft("Thuốc giãn cơ cho cơ hàm, nếu bạn muốn"), draft("Filler cằm hoặc hàm, sau đó chất kích thích sinh học (biostimulator)"), draft("Săn chắc da bằng RF ba lần")],
    length: draft("Khoảng 12 tuần"),
  },
  scars: {
    t: draft("Chương trình sẹo mụn"),
    forWhom: draft("Sẹo mụn lõm"),
    steps: [draft("Điều trị mụn đang có trước, tại Y khoa gia đình (OHIP)"), draft("CO₂ phân đoạn hai hoặc ba lần, mỗi lần kèm một Exosome facial"), draft("PRP cho mặt và bộ phục hồi da")],
    length: draft("Khoảng 16 đến 24 tuần"),
  },
  redness: {
    t: draft("Đỏ da và rosacea"),
    forWhom: draft("Đỏ bừng mặt và mạch máu nhỏ"),
    steps: [draft("Điều trị y khoa trước, tại Y khoa gia đình (OHIP)"), draft("Clarity II ba lần"), draft("HydraFacial và quy trình cho da đỏ tại nhà")],
    length: draft("Khoảng 12 tuần"),
  },
  hair: {
    t: draft("Phục hồi tóc"),
    forWhom: draft("Tóc thưa"),
    steps: [draft("Khám bác sĩ và xét nghiệm máu trước (OHIP)"), draft("Truyền sắt nếu ferritin thấp"), draft("PRP da đầu mỗi tháng một lần, trong bốn tháng, sau đó mỗi 3 đến 6 tháng")],
    length: draft("Khoảng 16 tuần, sau đó duy trì"),
  },
  event: {
    t: draft("Chuẩn bị cho sự kiện"),
    forWhom: draft("Đám cưới hoặc sự kiện khoảng 6 tuần nữa"),
    steps: [draft("HydraFacial ở mốc 6 tuần"), draft("Thuốc giãn cơ ở mốc 3 đến 4 tuần"), draft("Glass facial trong tuần cuối; không laser trong 2 tuần cuối")],
    length: draft("6 tuần"),
  },
  yearly: {
    t: draft("Lão hóa khỏe, cả năm"),
    forWhom: draft("Thói quen ổn định, lâu dài"),
    steps: [draft("Thuốc giãn cơ mỗi 3 đến 4 tháng"), draft("HydraFacial mỗi mùa và Baby CO₂ mỗi năm một lần"), draft("Chất kích thích sinh học mỗi năm và quy trình chống lão hóa tại nhà")],
    length: draft("12 tháng"),
  },
};

export const viAesPrograms: Program[] = aesPrograms.map((p) => ({ ...p, ...prog[p.k] }));

const comb: Record<string, Pick<(typeof combinedPlans)[number], "t" | "start" | "then" | "upkeep">> = {
  hair: {
    t: draft("Phục hồi tóc toàn diện"),
    start: draft("Khám bác sĩ và xét nghiệm máu (OHIP)"),
    then: draft("Truyền sắt nếu ferritin thấp, PRP da đầu mỗi tháng một lần, trong bốn tháng, truyền Biotin mỗi tháng nếu bạn muốn"),
    upkeep: draft("PRP mỗi 3 đến 6 tháng; kiểm tra lại ferritin"),
  },
  tired: {
    t: draft("Lúc nào cũng mệt"),
    start: draft("Khám bác sĩ và xét nghiệm máu (OHIP)"),
    then: draft("Truyền sắt nếu thiếu sắt, tiêm B12 hoặc vitamin D nếu thiếu, nếu không thì truyền Foundation định kỳ"),
    upkeep: draft("Truyền dịch hoặc tiêm mỗi tháng; xét nghiệm máu hằng năm"),
  },
  skin: {
    t: draft("Làn da từ bên trong"),
    start: draft("Tư vấn thẩm mỹ và chụp ảnh"),
    then: draft("Chương trình Da căng bóng, kèm truyền Antioxidant mỗi tháng"),
    upkeep: draft("HydraFacial và truyền Antioxidant mỗi tháng; một quy trình SkinCeuticals"),
  },
  event: {
    t: draft("Chuẩn bị sự kiện, kèm truyền dịch"),
    start: draft("Tư vấn 6 đến 8 tuần trước"),
    then: draft("Chương trình Chuẩn bị cho sự kiện và truyền Hydration một hoặc hai ngày trước"),
    upkeep: draft("Không cần, hoặc gói thành viên"),
  },
  active: {
    t: draft("Vận động và hồi phục"),
    start: draft("Đánh giá phục hồi chức năng"),
    then: draft("Vật lý trị liệu hoặc chỉnh hình cột sống, truyền Hydration sau khi tập và tiêm Amino blend quanh các sự kiện thể thao"),
    upkeep: draft("Xoa bóp 25 hoặc 55 phút, mỗi tháng"),
  },
};

const viToLabel: Record<string, string> = {
  hair: draft("Đặt lịch khám bác sĩ"),
  tired: draft("Đặt lịch khám bác sĩ"),
  skin: draft("Đặt lịch tư vấn miễn phí"),
  event: draft("Đặt lịch tư vấn miễn phí"),
  active: draft("Đặt lịch đánh giá phục hồi"),
};

export const viCombinedPlans = combinedPlans.map((p) => ({ ...p, ...comb[p.k], toLabel: viToLabel[p.k], to: `${p.to}&lang=vi` }));

const reg: Record<string, Pick<Regimen, "t" | "why" | "how" | "pairs" | "note">> = {
  starter: {
    t: draft("Bắt đầu"),
    why: draft("Mới chăm sóc da? Hãy bắt đầu từ đây. Hai bước mỗi sáng, buổi tối không cần thêm gì mới."),
    how: draft("Serum thoa trước lên da sạch để thấm vào. Kem chống nắng thoa lên trên để bảo vệ da khỏi ánh nắng cả ngày. Nếu chỉ giữ một bước, hãy giữ kem chống nắng."),
    pairs: draft("Mọi kế hoạch đầu tiên") },
  pigment: {
    t: draft("Sắc tố và màu da"),
    why: draft("Cho đốm nâu, mảng sậm hoặc màu da không đều, kể cả sau laser hoặc peel."),
    how: draft("Rửa mặt nhẹ nhàng giúp serum thấm tốt. Serum vitamin C chống oxy hóa, còn serum làm đều màu da tác động lên đốm nâu, sáng và tối. Kem chống nắng quan trọng nhất ở đây, vì ánh nắng có thể làm đốm sậm lại."),
    pairs: draft("Da căng bóng, PicoSure, peel") },
  aging: {
    t: draft("Nếp nhăn và lão hóa"),
    why: draft("Cho nếp nhăn nhỏ và da kém săn chắc. Buổi sáng bảo vệ, buổi tối tái tạo."),
    how: draft("Buổi sáng: rửa mặt, serum vitamin C, rồi kem chống nắng. Buổi tối: rửa mặt, rồi retinol, một dạng vitamin A làm việc khi bạn ngủ. Lúc đầu retinol có thể làm da khô hoặc ửng hồng, nên dùng từ từ và luôn thoa kem chống nắng vào hôm sau."),
    pairs: draft("Thuốc giãn cơ, Lão hóa khỏe, Baby CO₂"), note: draft("Bắt đầu retinol 2 hoặc 3 tối mỗi tuần, rồi tăng dần nếu da quen.") },
  acne: {
    t: draft("Da dầu, dễ nổi mụn"),
    why: draft("Cho da dầu, mụn đầu đen và mụn viêm."),
    how: draft("Sữa rửa mặt và serum buổi tối có acid nhẹ giúp làm sạch dầu trong lỗ chân lông. Serum vitamin C buổi sáng dành cho da dầu, và kem chống nắng nhẹ bảo vệ mà không bết. Vài tuần đầu da có thể hơi khô. Báo y tá nếu da bị rát."),
    pairs: draft("Chương trình sẹo mụn, Clarity II") },
  redness: {
    t: draft("Da đỏ và nhạy cảm"),
    why: draft("Cho da hay ửng đỏ, dễ rát hoặc dễ kích ứng với sản phẩm mới."),
    how: draft("Mọi bước đều dịu nhẹ. Sữa rửa mặt êm, serum vitamin C nồng độ thấp, rồi gel làm dịu, sáng và tối. Kem chống nắng nhẹ hoàn tất buổi sáng, vì nắng và nóng có thể làm da đỏ lên."),
    pairs: draft("Chương trình đỏ da và rosacea") },
  recovery: {
    t: draft("Bộ phục hồi da"),
    why: draft("Cho những ngày và tuần sau laser, plasma hoặc peel, khi da đang lành."),
    how: draft("Rửa mặt nhẹ nhàng, rồi thoa gel làm dịu và gel cấp ẩm giữ nước cho da. Buổi tối, kem dưỡng bảo vệ da trong lúc lành. Kem chống nắng khoáng thoa mỗi sáng, vì da đang lành dễ bị cháy nắng hơn. Y tá sẽ cho bạn biết khi nào quay lại quy trình thường ngày."),
    pairs: draft("Sau CO₂, plasma, PicoSure hoặc peel") },
};

export const viRegimens: Regimen[] = regimens.map((r) => ({ ...r, ...reg[r.k] }));
