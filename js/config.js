/* ================================================================
   🔧 CONFIG.JS
   แก้ที่นี่อย่างเดียว — แยกเป็นส่วนๆ หาง่าย
   ================================================================ */
const C = {


  /* ──────────────────────────────
     👤  โปรไฟล์
  ────────────────────────────── */
  name:      "BLAHEXM",
  bio:       "NO BIO YET",
  avatarUrl: "https://img2.pic.in.th/642388454_18080909531578593_3604.png",        // URL รูป — ปล่อยว่าง = ดึงจาก Discord อัตโนมัติ
  footerText:"blahexm · WITH AI 2026",


  /* ──────────────────────────────
     ✅  Badge
     false | "shield" | "check" | "star"
     "bolt" | "crown" | "diamond"
     "fire" | "custom"
  ────────────────────────────── */
  badge:       "crown",
  badgeCustom: "⚡",    // ใช้เมื่อ badge: "custom"


  /* ──────────────────────────────
     🟢  สถานะ
     ถ้ามี discordId → ดึงจาก Discord อัตโนมัติ
     ถ้า Discord ไม่ตอบ → ใช้ manualStatus
     ถ้าไม่ต้องการลิงก์ Discord → ลบ discordId ออก (ใส่ "")
  ────────────────────────────── */
  discordId:        "", // 576653002924883978
  manualStatus:     "idle",   // "online" | "idle" | "dnd" | "offline"
  manualStatusText: "copy & paste then successfull",         // เช่น "coding 💻" — ปล่อยว่าง = ใช้ default


  /* ──────────────────────────────
     🎨  ธีมสี
     crimson | rose | orange | amber | gold | yellow
     caramel | gingerbread | mocha | silver | mint | cobalt | violet
  ────────────────────────────── */
  theme: "cobalt",


  /* ──────────────────────────────
     🔗  โซเชียล
     on:    true = แสดง / false = ซ่อน
     label: ชื่อที่อยากแสดงบนปุ่ม
  ────────────────────────────── */
  socials: [
    { id:"discord",   on:false,  url:"https://discord.gg/yourserver",         label:"Discord"   },
    { id:"instagram", on:true, url:"https://www.instagram.com/hematlgists/",         label:"@hematlgists" },
    { id:"tiktok",    on:false, url:"https://tiktok.com/@yourname",           label:"@yourname" },
    { id:"youtube",   on:false, url:"https://youtube.com/@yourname",          label:"YouTube"   },
    { id:"github",    on:false, url:"https://github.com/yourname",            label:"yourname"  },
    { id:"twitter",   on:false, url:"https://twitter.com/yourname",           label:"@yourname" },
    { id:"steam",     on:false, url:"https://steamcommunity.com/id/yourname", label:"Steam"     },
    { id:"twitch",    on:false, url:"https://twitch.tv/yourname",             label:"Twitch"    },
  ],


  /* ──────────────────────────────
     🎵  เพลงประกอบ (หน้าหลัก)
     on:     true/false
     url:    URL หรือ path .mp3
  ────────────────────────────── */
  music: {
    on:     true,
    url:    "https://files.catbox.moe/le31j0.mp3",
    title:  "T!NE - เผลอยิ้ม",
    artist: "",
  },


  /* ──────────────────────────────
     🎧  เพลงโปรด (หน้าหลัง)
     ใส่แค่ลิงก์ — ระบบจัดการเอง
     Spotify: https://open.spotify.com/track/xxx
              https://open.spotify.com/album/xxx
              https://open.spotify.com/playlist/xxx
     YouTube: https://youtu.be/xxx
              https://youtube.com/watch?v=xxx
  ────────────────────────────── */
  favMusic: [
     "https://open.spotify.com/track/1EXw7rqJcFIvMtj4Q8fhKw?si=laPSvDCxTTWQOK_DAjaaQA",
      "https://open.spotify.com/track/4xOFLtbauANPP5wXKwzApD?si=loI_IZExT3-2HvHmORU1eQ",
  ],


};
