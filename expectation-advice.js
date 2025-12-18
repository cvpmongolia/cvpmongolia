// ============================================
// EXPECTATION ADVICE LOGIC
// ============================================

// Helper function to colorize timeframe mentions
function colorizeTimeframes(text) {
  // Replace timeframe mentions with colored spans
  return text
    .replace(/Weekly/gi, '<span style="color: #e0a802ff; font-weight: 600;">Weekly</span>')
    .replace(/\+3/gi, '<span style="color: #e0a802ff; font-weight: 600;">+3</span>')
    .replace(/\+4/gi, '<span style="color: #9c9b96ff; font-weight: 600;">+4</span>')
    .replace(/Daily/gi, '<span style="color: #AB47BC; font-weight: 600;">Daily</span>')
    .replace(/H4/g, '<span style="color: #43A047; font-weight: 600;">H4</span>')
    .replace(/H1/g, '<span style="color: #E53935; font-weight: 600;">H1</span>')
    // Also handle combined mentions
    .replace(/H1\(H4\)/g, '<span style="color: #E53935; font-weight: 600;">H1</span>(<span style="color: #43A047; font-weight: 600;">H4</span>)');
}

function generateAdvice(answers) {
  const advice = {
    priority1: [], // Blue boxes - Big TF advice
    priority2: []  // Yellow boxes - Main TF advice
  };

  const { q1, q2, q3, q4 } = answers;

  // ============================================
  // PRIORITY 1 - BIG TF ADVICE (BLUE BOXES)
  // ============================================

  // Q2=yes: Daily TF obstacle
  if (q2) {
    advice.priority1.push({
      title: 'Daily TF - Том TF-ийн савалт',
      content: `Daily TF маань илүү том TF-ийн lvl(1)/zone(2) руу орж ирсэн учир Daily TF-ийн зүг чиг ямар байхаас хамааралгүй ойрын хугацаанд Daily TF савалт руу орж Flat үүснэ гэсэн хүлээлттэй арилжина уу. Тэр нь Daily TF-ийн lvl-үүд, zone(2)-ууд ерөнхий хүлээлтийн хэмжээнд шууд break орохгүй гэж тооцоолоод арилжаа хийх хэрэгтэй гэсэн үг. Break орж магадгүй гэж бодох биш break орохгүй байх гэж бодож арилжаагаа хийнэ. Тухайн логикийн дагуу том TF болох +4/+3 дээр, өөр дээр нь lvl ба zone-ын Reaction ороод зах зээл аль нэг тийш болох хүртэл арилжина.`
    });
  }

  // Q1=yes && Q3=yes: Weekly + Daily aligned
  if (q1 && q3) {
    advice.priority1.push({
      title: 'Weekly + Daily TF зүг чиг тодорхой',
      content: `Weekly, Daily TF хоёулаа тодорхой ба саад болох зүйлс байхгүй, хоорондоо огтлолцсон зүйл байхгүй болсон бол +2 Daily TF-ийн зүг чиг дагуу (1 болзлыг эс тооцвол) тайван ажиллаж болно.
      
<strong>Болзол:</strong> Эсрэг талын бүх W1, D1 lvl(1)-үүд, эсвэл Zone(2)-ыг эхний удаагийн дайралтаар шууд Break хийхгүй гэсэн тооцоотойгоор lvl-ийн цаана Position-оо хаах. Үүнд 2 дахь дайралтаар тулж очихдоо хүчтэй дайраад очсон тохиолдолд Break хийх хувийн тогтолцоо өндөртэй гэж үзнэ.`
    });
  }

  // Q1=yes && Q3=no: Daily lvl break resistance
  if (q1 && !q3) {
    advice.priority1.push({
      title: 'Daily TF - Break-ийн эсэргүүцэл',
      content: `Daily TF-ийн бүх lvl-үүд Break орж магадгүй гэж бодох биш, орон ортол Break орохгүй байх гэж бодож арилжаагаа хийнэ. Break орсны дараа зүг чигийн дагуу дагаад арилжих хэрэгтэй.`
    });
  }

  // Q1=no: Weekly TF unclear
  if (!q1) {
    advice.priority1.push({
      title: 'Weekly TF - Зүг чиг тодорхойгүй',
      content: `+2 болох Daily TF дээр үүссэн бүх lvl-үүд ба zone-ууд ерөнхий хүлээлтийн хэмжээнд шууд Break орохгүй гэж тооцоолоод арилжаа хийх хэрэгтэй. Break орж магадгүй биш Break орохгүй байх гэж бодож арилжаагаа хийнэ. Тэр нь ерөнхий хүлээлтийн хэмжээнд хамгийн ихдээ DayTrade хийх хэрэгтэй гэсэн үг. Ямар нэгэн +2 TF lvl-ийг Break хийгээд Daily Cluster хаагдаад тогтсны дараа, дараагийн саад болох +3/+2 TF хүртэл асуудалгүй Swing авч болно.`
    });
  }

  // Q1=no && Q3=no: Daily TF Break resistance
  if (!q1 && !q3) {
    advice.priority1.push({
      title: 'Daily TF - Break орохыг хүлээх',
      content: `<strong>+2 Daily TF-ийн lvl-ийг daily TF-ийн Цохилтын эсвэл Түлхэлтийн кластераар Break орох хүртэл арилжаа хийх заавар:</strong>

1. Арилжаагаа хийхдээ зөвхөн H1(H4) TF-ийн lvl-ээс авна. Эсвэл H1(H4) TF-ийн reaction орсны дараа зүг чигийн дагуу жижиг TF/цаг дээр дагаж орж болно.

2. H1(H4) TF-ийн lvl-ээс арилжаагаа авахдаа хамгийн ихдээ Daily lvl хүртэл явуулаад, юунд ч найдахгүйгээр Position-оо шууд хаах тооцоотойгоор арилжина. Тэр нь Scalp-аас эхлээд SessionTrade ба хамгийн ихдээ DayTrade арилжааний логикоор арилжаагаа хийж тооцоолох.

<strong>Хамгийн ихдээ гэж тооцогдох lvl-үүд:</strong>
• Daily TF дээрх анхны Buyer/Seller
• D1, D2, D3, D4 lvl-үүд
• Daily TF-ийн Zone/Бүс`
    });
  }

  // ============================================
  // PRIORITY 2 - MAIN TF ADVICE (YELLOW BOXES)
  // ============================================

  // Q1=yes && Q3=no && Q4=yes
  if (q1 && !q3 && q4) {
    advice.priority2.push({
      title: 'Үндсэн H1(H4) зүг чиг тодорхой - DayTrade зөвшөөрөгдсөн',
      content: `+1TF H1(H4) хүлээлт тодорхой байгаа учир эсрэг талын WBP lvl(1), Zone(2), эсвэл WBP lvl байхгүй тохиолдолд анхны Buyer/Seller-ийн lvl-ийг эхний удаагийн дайралтаар шууд Break хийхгүй гэсэн тооцоотойгоор lvl-ийн цаана Position-оо хаах. Үүнд 2 дахь дайралтаар тулж очихдоо хүчтэй дайраад очсон тохиолдолд Break хийх хувийн тогтолцоо өндөртэй гэж үзнэ.

Арилжаа хийхдээ хамгийн ихдээ +2 Daily TF-ийн lvl хүртэл явна гэж тооцоолох хэрэгтэй.

<strong>Хамгийн ихдээ гэж тооцогдох lvl-үүд:</strong>
• Daily TF дээрх анхны Buyer/Seller
• D1, D2, D3, D4 lvl-үүд
• Daily TF-ийн Zone/Бүс

Scalp, SessionTrade-ээс гадна DayTrade хийж болно гэсэн үг. <strong>Swing арилжаа хийх хориотой.</strong> DayTrade арилжаануудыг зөвхөн тухайн тикерийн +1 буюу гол TF-д тооцогдох H1(H4)-ийн lvl-ийн manipulation-ээс авах ба reaction орсны дараа M5(M10) TF-үүд дээрээс дагаж орж болно.

H1(H4) явсаар байгаад +2 Daily TF-ийн Break-ууд орон зүг чиг тодорхойлогдоод ирвэл ерөнхий хүлээлтийг дахин гаргана уу.`
    });
  }

  // Q1=yes && Q3=no && Q4=no
  if (q1 && !q3 && !q4) {
    advice.priority2.push({
      title: 'Үндсэн H1(H4) тодорхойгүй - Зөвхөн Scalp/SessionTrade зөвшөөрөгдсөн (Break-ийн эсэргүүцэл)',
      content: `H1(H4) бүх lvl-үүд ерөнхий хүлээлтийн хэмжээнд Break орж магадгүй гэж бодох биш Break орохгүй байх гэж бодож арилжаагаа хийнэ. Энэ нь саад болох эсрэг тоглогчийн lvl(1), zone(2) эсвэл эсрэг тоглогчийн профайл(3) хүртэл Scalp эсвэл SessionTrade арилжаа хийх хэрэгтэй. <strong>DayTrade, Swing арилжаа хийх хориотой.</strong>

Арилжаа хийхдээ зөвхөн H1(H4) TF-ийн lvl дээрх reaction-аас арилжаа хийнэ. Тэр нь M5(M10) ерөнхий manipulation сигналыг авч болох ба M5(M10) TF дээр дагаж орох боломжуудыг ашиглана.

Хэрэв H1(H4) TF дээр зүг чиг тодорхой болсон ба ямар нэгэн lvl H1(H4) TF-ийн хэмжээнд break орсон бол ерөнхий хүлээлтийг дахин гаргана уу.`
    });
  }

  // Q1=yes && Q3=yes && Q4=yes
  if (q1 && q3 && q4) {
    advice.priority2.push({
      title: 'Бүх TF зүг чиг тодорхой - Swing зөвшөөрөгдсөн',
      content: `Scalp, SessionTrade арилжаанаас гадна <strong>DayTrade, Swing арилжаануудыг авах боломж гарч ирнэ.</strong>

+1TF H1(H4) хүлээлт тодорхой байгаа учир эсрэг талын WBP lvl(1), Zone(2), эсвэл WBP lvl байхгүй тохиолдолд анхны Buyer/Seller-ийн lvl-ийг эхний удаагийн дайралтаар шууд Break хийхгүй гэсэн тооцоотойгоор lvl-ийн цаана Position-оо хаах. Үүнд 2 дахь дайралтаар тулж очихдоо хүчтэй дайраад очсон тохиолдолд Break хийх хувийн тогтолцоо өндөртэй гэж үзнэ.

DayTrade, Swing арилжаануудыг зөвхөн Daily TF дагуу ба H1(H4) дээр зүг чиг тодорхойлогдсон эсвэл дор хаяж lvl-ийн Break орсон бол авч болно. DayTrade, Swing арилжаануудыг зөвхөн тухайн тикерийн +1 буюу гол TF-д тооцогдох H1(H4)-ийн lvl-ийн manipulation-ээс авах хэрэгтэй.

<strong>Swing хөдөлгөөний потенциал:</strong>
Хамгийн түрүүнд +2 Daily TF ба түүний дараа +3 Weekly TF-ийн reaction-аас авах. Swing арилжаагаа +3 Weekly TF ба +2 Daily TF lvl дээр manipulation сигнал орсны дараа +1 H1(H4) TF-аас дагуулж авч байгаа бол Swing арилжааны логикийн хувьд хамгийн зөв ба хувийн тогтолцоо маш өндөртэй.

Хэрэв аль нэг TF-ийн зүг чиг тодорхойгүй болж эхэлсэн бол ерөнхий хүлээлтийг дахин гаргана уу.`
    });
  }

  // Q1=yes && Q3=yes && Q4=no
  if (q1 && q3 && !q4) {
    advice.priority2.push({
      title: 'Үндсэн H1(H4) зүг чиг тодорхойгүй - Зөвхөн Scalp/SessionTrade зөвшөөрөгдсөн (Break-ийн эсэргүүцэл)',
      content: `H1(H4) бүх lvl-үүд ерөнхий хүлээлтийн хэмжээнд Break орж магадгүй гэж бодох биш Break орохгүй байх гэж бодож арилжаагаа хийнэ. Энэ нь саад болох эсрэг тоглогчийн lvl(1), zone(2) эсвэл эсрэг тоглогчийн профайл(3) хүртэл Scalp эсвэл SessionTrade арилжаа хийх хэрэгтэй. <strong>DayTrade, Swing арилжаа хийх хориотой.</strong>

Арилжаа хийхдээ зөвхөн H1(H4) TF-ийн lvl дээрх reaction-аас арилжаа хийнэ. Тэр нь M5(M10) ерөнхий manipulation сигналыг авч болох ба M5(M10) TF дээр дагаж орох боломжуудыг ашиглана.

Хэрэв H1(H4) TF дээр зүг чиг тодорхой болсон ба ямар нэгэн lvl H1(H4) TF-ийн хэмжээнд break орсон бол ерөнхий хүлээлтийг дахин гаргана уу.`
    });
  }

  // Q1=no && Q3=no && Q4=yes
  if (!q1 && !q3 && q4) {
    advice.priority2.push({
      title: 'Үндсэн H1(H4) зүг чиг тодорхой - DayTrade зөвшөөрөгдсөн',
      content: `+1 TF дээр буюу H1(H4)-ийн зүг чиг тодорхой эсвэл дор хаяж тухайн TF-ийн хэмжээнд lvl-ийн Break орж, блокын гаралтын санаачилга үүссэн гэж үзээд энэ тохиолдолд Scalp, SessionTrade арилжаанаас гадна <strong>DayTrade арилжаа авах боломжтой болно.</strong>

DayTrade арилжааг хамгийн ихдээ Daily lvl хүртэл барьж болно. Хамгийн ихдээ гэж тооцогдох lvl-ийг дээрх тайлбараас харна уу. DayTrade арилжаануудыг зөвхөн тухайн тикерийн +1 буюу гол TF-Д тооцогдох H1(H4)-ийн lvl-ийн manipulation-ээс авах ба reaction орсны дараа M5(M10) TF-үүд дээрээс дагаж орж болно. <strong>Swing барих хэвээрээ хориотой.</strong>

Хэрэв H1(H4)-ийн lvl дээр Break орсноос болж шинээр гарч ирсэн санаачилгын өргөтгөл явагдснаар +1 TF-ийн зүг чиг тодорхойлогдоод Daily TF дээр Break орсон бол ерөнхий хүлээлтийг дахин гаргана уу.`
    });
  }

  // Q1=no && Q3=no && Q4=no
  if (!q1 && !q3 && !q4) {
    advice.priority2.push({
      title: 'Үндсэн H1(H4) зүг чиг тодорхойгүй - Зөвхөн Scalp/SessionTrade зөвшөөрөгдсөн',
      content: `H1(H4) бүх lvl-үүд ерөнхий хүлээлтийн хэмжээнд Break орж магадгүй гэж бодох биш Break орохгүй байх гэж бодож position-оо lvl-ийн цаана хааж арилжаагаа хийнэ. Энэ нь саад болох эсрэг тоглогчийн lvl(1), zone(2) эсвэл эсрэг тоглогчийн профайл(3) хүртэл Scalp эсвэл SessionTrade арилжаа хийх хэрэгтэй. <strong>DayTrade, Swing арилжаа хийх хориотой.</strong>

Арилжаа хийхдээ зөвхөн H1(H4) TF-ийн lvl дээрх reaction-аас арилжаа хийнэ. Тэр нь M5(M10) ерөнхий manipulation сигналыг авч болох ба M5(M10) TF дээр дагаж орох боломжуудыг ашиглана.

Хэрэв H1(H4) TF дээр зүг чиг тодорхой болсон ба ямар нэгэн lvl H1(H4) TF-ийн хэмжээнд break орсон бол ерөнхий хүлээлтийг дахин гаргана уу.`
    });
  }

  // Q1=no && Q3=yes && Q4=yes
  if (!q1 && q3 && q4) {
    advice.priority2.push({
      title: 'Үндсэн H1(H4) зүг чиг тодорхой - Swing зөвшөөрөгдсөн (Daily break)',
      content: `Daily TF зүг чигийн асуудал байхгүй ба lvl-ийн Break орсон учир Break орсон зүг рүү дараагийн саад болох lvl/zone хүртэл <strong>Scalp, SessionTrade, DayTrade-ээс гадна хөдөлгөөний потенциал байвал Swing авч болно.</strong>

+1TF H1(H4) хүлээлт мөн тодорхой байгаа учир эсрэг талын WBP lvl(1), Zone(2), эсвэл WBP lvl байхгүй тохиолдолд анхны Buyer/Seller-ийн lvl-ийг эхний удаагийн дайралтаар шууд Break хийхгүй гэсэн тооцоотойгоор lvl-ийн цаана Position-оо хаах. Үүнд 2 дахь дайралтаар тулж очихдоо хүчтэй дайраад очсон тохиолдолд Break хийх хувийн тогтолцоо өндөртэй гэж үзнэ.

DayTrade, Swing арилжаануудыг зөвхөн Daily TF дагуу ба H1(H4) дээр зүг чиг тодорхойлогдсон эсвэл дор хаяж lvl-ийн Break орсон бол авч болно. DayTrade, Swing арилжаануудыг зөвхөн тухайн тикерийн +1 буюу гол TF-д тооцогдох H1(H4)-ийн lvl-ийн manipulation-ээс авах хэрэгтэй.

<strong>Swing хөдөлгөөний потенциал:</strong>
Хамгийн түрүүнд +2 Daily TF ба түүний дараа +3 Weekly TF-ийн reaction-аас авах. Swing арилжаагаа +3 Weekly TF ба +2 Daily TF lvl дээр manipulation сигнал орсны дараа +1 H1(H4) TF-аас дагуулж авч байгаа бол Swing арилжааны логикийн хувьд хамгийн зөв ба хувийн тогтолцоо маш өндөртэй.

Хэрэв аль нэг TF-ийн зүг чиг тодорхойгүй болж эхэлсэн бол ерөнхий хүлээлтийг дахин гаргана уу.`
    });
  }

  // Q1=no && Q3=yes && Q4=no
  if (!q1 && q3 && !q4) {
    advice.priority2.push({
      title: 'Үндсэн H1(H4) зүг чиг тодорхойгүй - Зөвхөн Scalp/SessionTrade зөвшөөрөгдсөн',
      content: `H1(H4) бүх lvl-үүд ерөнхий хүлээлтийн хэмжээнд Break орж магадгүй гэж бодох биш Break орохгүй байх гэж бодож position-оо lvl-ийн цаана хааж арилжаагаа хийнэ. Энэ нь саад болох эсрэг тоглогчийн lvl(1), zone(2) эсвэл эсрэг тоглогчийн профайл(3) хүртэл Scalp эсвэл SessionTrade арилжаа хийх хэрэгтэй. <strong>DayTrade, Swing арилжаа хийх хориотой.</strong>

Арилжаа хийхдээ зөвхөн H1(H4) TF-ийн lvl дээрх reaction-аас арилжаа хийнэ. Тэр нь M5(M10) ерөнхий manipulation сигналыг авч болох ба M5(M10) TF дээр дагаж орох боломжуудыг ашиглана.

Хэрэв H1(H4) TF дээр зүг чиг тодорхой болсон ба ямар нэгэн lvl H1(H4) TF-ийн хэмжээнд break орсон бол ерөнхий хүлээлтийг дахин гаргана уу.`
    });
  }

  return advice;
}

