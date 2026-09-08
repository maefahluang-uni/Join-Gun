# JoinGun — เอกสารเตรียมส่ง W5

โครงสร้างนี้จัดตามคำสั่งส่งอาจารย์และสไลด์ W2–W4: ใช้ `.docs/` (มีจุดนำหน้า) สำหรับเอกสารทำงาน และ `rule.md` ที่ราก repo ส่วน `เอกสาร/` เก็บต้นฉบับและสไลด์อ้างอิง

## ไฟล์ปัจจุบัน

```text
joingun/
├── README.md
├── rule.md
├── .docs/
│   ├── 01-requirements/
│   │   ├── backlog.md
│   │   └── 01-spec/
│   │       ├── 20260908-01-joingun.md
│   │       └── 20260908-02-legal-traceability.md
│   └── 02-design/
│       ├── feature-list.md
│       ├── user-journey.md
│       └── design-system.md
└── เอกสาร/
    └── เอกสารต้นฉบับและสไลด์ W2–W4
```

วันที่ในชื่อ spec เป็นวันที่จัดสำเนาเข้าโครงสร้างนี้ ไม่ใช่วันที่สร้างต้นฉบับ ให้แก้ฉบับทำงานใน `.docs/` และ `rule.md` ต่อจากนี้; ต้นฉบับใน `เอกสาร/` เก็บไว้เทียบที่มา

## รายการส่งอาจารย์และสถานะ

| รายการ | ตำแหน่ง | สถานะปัจจุบัน |
| --- | --- | --- |
| Updated Proposal: problem statement + target users | เสนอให้ใช้ `.docs/00-proposal/proposal.md` และส่งออก PDF หากต้องการ | มีเพียง [proposal ต้นฉบับ](เอกสาร/proposal.pdf); ยังไม่ได้อัปเดต และยังมีช่องข้อมูลทีม/วิธีทำงาน/กำหนดการ/อ้างอิงที่ไม่ครบ |
| Product Backlog | [backlog.md](.docs/01-requirements/backlog.md) | ถอด 22 รายการจาก PDF พร้อม Trace และรายการช่องว่าง; ยังไม่ใช่ฉบับผ่าน audit |
| Requirement Spec รวม Legal Requirements | [Spec](.docs/01-requirements/01-spec/20260908-01-joingun.md) | คัดลอกเนื้อหาเดิมครบ 5 ส่วน มี F/NFR/LR แต่ยังต้องปิดช่องว่างการ trace |
| W2 Compliance | [rule.md](rule.md) และ [Legal traceability](.docs/01-requirements/01-spec/20260908-02-legal-traceability.md) | คัดลอกกฎเดิมและเพิ่มตารางเชื่อม LR1–LR5; ระบุข้อที่ยังไม่ครอบคลุมไว้แล้ว |
| Feature list | [feature-list.md](.docs/02-design/feature-list.md) | มี 7 บรรทัด เลือก core เดียว |
| User journey | [user-journey.md](.docs/02-design/user-journey.md) | มี happy path 5 ขั้นตอน: เข้าร่วมกิจกรรมจากฟีด |
| Design system | [design-system.md](.docs/02-design/design-system.md) | มี tokens และ component rules; สี/ฟอนต์เป็นข้อเสนอ ยังไม่มีภาพ UI อ้างอิงของทีม |
| Prototype | `.docs/02-design/prototype.md` และ `.docs/02-design/prototype/index.html` | ยังไม่ได้สร้าง |
| 4 diagrams | `.docs/02-design/diagrams.md` พร้อม source ใน `.docs/02-design/diagrams/` | ยังไม่ได้สร้าง |

คำสั่งอาจารย์ไม่ได้กำหนด path ของ Proposal: `00-proposal/` เป็นข้อเสนอจัดเก็บ ส่วน path ของ backlog, design และตำแหน่ง root ของ rule มีระบุในคำสั่ง/สไลด์

## โครงสร้างสำหรับงานถัดไป (ยังไม่มีไฟล์เหล่านี้)

```text
.docs/
├── 00-proposal/
│   └── proposal.md
└── 02-design/
    ├── prototype.md       # สรุปหน้าจอ วิธีเปิด และสิ่งที่ทดลองกด
    ├── prototype/
    │   ├── index.html     # ต้นแบบคลิกได้
    │   └── assets/        # CSS/JS/ภาพ เมื่อจำเป็น
    ├── diagrams.md        # รวม D1–D4 และคำอธิบาย
    └── diagrams/          # source ที่แก้ไขได้ เช่น .drawio หรือ .puml
```

`prototype.md` และ `prototype/` ใช้ร่วมกันได้: W4 หน้า 3 ระบุเอกสารอธิบาย ส่วนหน้า 16 ระบุโฟลเดอร์ HTML ต้นแบบ การเลือกชื่อ `index.html`, `assets/` และโฟลเดอร์ source diagrams เป็นแนวทางจัดเก็บของโปรเจกต์นี้

Prototype ให้ยึด journey และ design-system เดิม: หน้าฟีดพร้อมตัวกรอง → รายละเอียดกิจกรรม → ยืนยันและแสดงผลสำเร็จ ใช้ 3 หน้าหลักร่วมกับแผงยืนยันได้ ไม่จำเป็นต้องสร้าง 5 หน้าเพียงเพราะ journey มี 5 ขั้นตอน ต้องเป็น mobile-first, เนื้อหาไม่เกิน 480px และปุ่มกดได้สะดวก

แผนภาพต้องมี D1 System Context, D2 Use Case หรือ User Story Map, D3 Architecture และ D4 Activity หรือ Sequence โดยใช้ core workflow และชื่อ actor เดียวกับเอกสารออกแบบ D3 ต้องสอดคล้องกับ tech stack ที่ทีมระบุจริงใน Proposal ซึ่งต้นฉบับยังไม่กำหนด

## สิ่งที่ต้องทำก่อนส่งขึ้น repo

1. อัปเดต Proposal จากข้อมูลจริงของทีม โดยเฉพาะ problem statement, target users และ tech stack ที่ใช้ทำ D3
2. เชื่อม pain/evidence จริง → F/NFR/LR → backlog; เติม story การ join/leave ที่ยังไม่มี F แยก และปรับ priority ที่ไม่ตรงกัน โดยไม่แต่งหลักฐานการสัมภาษณ์
3. ปิดช่องว่างใน Legal traceability โดยเฉพาะหลักฐาน consent และการแยกหัวข้อ ETA/จริยธรรม AI ใน rule เดิม
4. สร้าง prototype และ D1–D4 แล้วตรวจว่าทุกชิ้นเล่า workflow เดียวกันและอ้าง token เดียวกัน
5. เชื่อม Git repository ที่ทีมใช้ ตรวจไฟล์ที่จะ commit แล้ว commit/push; ใช้ remote `origin` ที่ `https://github.com/maefahluang-uni/Join-Gun.git` และ branch `main` สำหรับเอกสารชุดนี้

W3 ยังระบุงานเครื่องมือประกอบ: `CLAUDE.md`, `.claude/agents/requirement-writer.md`, skill `.claude/skills/audit-backlog/SKILL.md` และโครงสร้าง log `.docs/05-log/` (หน้า 15, 22) ซึ่งยังไม่พบในชุดไฟล์นี้ ต้องตรวจงานที่ทีมอาจทำไว้ใน repo เดิม ไม่สร้างไฟล์เปล่าหรืออ้างว่ารัน audit แล้ว ส่วนรายการส่ง 4 ข้อล่าสุดไม่ได้เรียกชื่อไฟล์เครื่องมือเหล่านี้โดยตรง

## อ้างอิงโครงสร้าง

- [W2](<เอกสาร/Week 2 — AI Ethics, PDPA & IT Law — 1305493.pdf>) หน้า 17, 19–21: rule ที่ root และการนำกฎไปเป็น LR/backlog
- [W3](<เอกสาร/Week 3 — Requirements → Backlog with AI Agents & Skills — 1305493.pdf>) หน้า 9–11, 15, 22: traceability, spec 5 ส่วน, path และงานที่ต้องอยู่บน GitHub
- [W4](<เอกสาร/W4 — Design with Agents — Case Study — 1305493.pdf>) หน้า 3–4, 7, 15–19: design folder, core workflow เดียว, prototype และ D1–D4
