/* ================================================================
   🔧 CONFIG.JS — แก้ที่นี่อย่างเดียว
   ================================================================ */
const C = {

  /* 👤 โปรไฟล์ */
  name:      "HIM",
  bio:       "NO BIO YET",
  avatarUrl: "https://img2.pic.in.th/642388454_18080909531578593_3604.png",
  footerText:"blahexm · WITH AI 2026",

  /* ✅ Badge: false | "shield" | "check" | "star" | "bolt" | "crown" | "diamond" | "fire" | "custom" */
  badge:       "crown",
  badgeCustom: "⚡",

  /* 🟢 สถานะ Discord */
  discordId:        "",
  manualStatus:     "idle",
  manualStatusText: "copy & paste then successfull",

  /* 🔒 Finance PIN — เปลี่ยนได้ที่นี่ */
  financePin: "blahexm",

  /* 🎨 ธีมเริ่มต้น (จะถูก override ถ้าเคยเลือกในเว็บแล้ว)
     crimson | rose | orange | amber | gold | yellow
     mint | cobalt | violet | silver | mocha */
  theme: "rose",

  /* 🔗 โซเชียล */
  socials: [
    { id:"discord",   on:false, url:"https://discord.gg/yourserver",          label:"Discord"      },
    { id:"instagram", on:true,  url:"https://www.instagram.com/hematlgists/", label:"@hematlgists" },
    { id:"tiktok",    on:false, url:"https://tiktok.com/@yourname",           label:"@yourname"    },
    { id:"youtube",   on:false, url:"https://youtube.com/@yourname",          label:"YouTube"      },
    { id:"github",    on:false, url:"https://github.com/yourname",            label:"yourname"     },
    { id:"twitter",   on:false, url:"https://twitter.com/yourname",           label:"@yourname"    },
    { id:"steam",     on:false, url:"https://steamcommunity.com/id/yourname", label:"Steam"        },
    { id:"twitch",    on:false, url:"https://twitch.tv/yourname",             label:"Twitch"       },
  ],

  /* 🎵 เพลงประกอบ */
  music: {
    on:     true,
    url:    "https://files.catbox.moe/le31j0.mp3",
    title:  "T!NE - เผลอยิ้ม",
    artist: "",
  },

  /* 🎧 เพลงโปรด */
  favMusic: [
    "https://open.spotify.com/track/1EXw7rqJcFIvMtj4Q8fhKw?si=laPSvDCxTTWQOK_DAjaaQA",
    "https://open.spotify.com/track/4xOFLtbauANPP5wXKwzApD?si=loI_IZExT3-2HvHmORU1eQ",
  ],
};