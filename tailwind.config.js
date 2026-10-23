/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // سیستم رنگ اصلی: زرد کرمی (رنگ hero برند) + سفید گرم + تقریباً مشکی گرم
        butter: {
          DEFAULT: "#F4D35E", // زرد کرمی اصلی
          deep: "#E5BD3A", // کمی تیره‌تر، برای hover
          soft: "#FBE891", // کمی روشن‌تر، برای سطح ثانویه
          tint: "#FEF6D3", // بسیار روشن، تقریباً cream، برای انتقال بین بخش‌ها
        },
        cream: "#FBEFE3", // surface کرمی گرم
        ink: {
          DEFAULT: "#241C15", // تقریباً مشکی گرم (هرگز مشکی خالص استفاده نشود)
          secondary: "#5A5147",
          tertiary: "#88837C",
        },
        // رنگ‌های تأکیدی تزئینی (Memphis pop palette، با مقدار بسیار کم)
        coral: "#E07A5F", // قرمز مرجانی — تزئین اصلی
        teal: "#1B4B5A", // teal تیره — گاهی برای تضاد
        pop: "#FF4D74", // صورتی — هشدار/تأکید
      },
      fontFamily: {
        // متن بدنه: لاتین Plus Jakarta + فارسی Vazirmatn
        sans: [
          '"Plus Jakarta Sans"',
          '"Vazirmatn"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Tahoma"',
          "system-ui",
          "sans-serif",
        ],
        // عنوان Display: برای حروف چینی Smiley Sans (محدود به CJK با unicode-range)، لاتین Plus Jakarta، فارسی Vazirmatn
        // مرورگر خودکار بر اساس unicode کاراکتر فونت را انتخاب می‌کند: چینی ← Smiley Sans، انگلیسی/اعداد ← Plus Jakarta، فارسی ← Vazirmatn
        display: [
          '"Smiley Sans"',
          '"Plus Jakarta Sans"',
          '"Vazirmatn"',
          "-apple-system",
          "BlinkMacSystemFont",
          '"Tahoma"',
          "system-ui",
          "sans-serif",
        ],
        serif: ["Newsreader", "Georgia", '"Times New Roman"', "serif"],
        mono: [
          '"Geist Mono"',
          '"SF Mono"',
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      fontSize: {
        // عنوان‌ها: line-height نباید خیلی کم باشد (ارتفاع دیداری حروف فارسی و چینی نزدیک 1em است)
        // letter-spacing فشرده اما نه اغراق‌آمیز (فاصله منفی حروف را به هم می‌چسباند و اتصال حروف فارسی را خراب می‌کند)
        "display-2xl": [
          "clamp(3.25rem, 8vw, 7.25rem)",
          {
            lineHeight: "1.02",
            letterSpacing: "-0.02em",
            fontWeight: "800",
          },
        ],
        "display-xl": [
          "clamp(2.5rem, 5.5vw, 4.5rem)",
          {
            lineHeight: "1.06",
            letterSpacing: "-0.015em",
            fontWeight: "800",
          },
        ],
        "display-lg": [
          "clamp(2rem, 3.8vw, 3rem)",
          {
            lineHeight: "1.12",
            letterSpacing: "-0.01em",
            fontWeight: "700",
          },
        ],
        eyebrow: [
          "0.75rem",
          {
            lineHeight: "1.2",
            letterSpacing: "0.18em",
            fontWeight: "600",
          },
        ],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        // امضای Mailchimp "stamp" سایه —— offset، بدون blur، مشکی
        stamp: "4px 4px 0 0 #241C15",
        "stamp-lg": "6px 6px 0 0 #241C15",
        "stamp-xl": "8px 8px 0 0 #241C15",
        "stamp-hover": "10px 10px 0 0 #241C15",
        // سایه نرم (حالت شناور، گرم)
        soft: "0 4px 12px rgba(36, 28, 21, 0.08)",
        "soft-lg": "0 12px 32px rgba(36, 28, 21, 0.12)",
      },
      transitionTimingFunction: {
        // منحنی فنری، حس پرش کوچک در hover
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
        600: "600ms",
      },
      animation: {
        "spin-slow": "spinSlow 16s linear infinite",
        "spin-rev": "spinRev 22s linear infinite",
        wiggle: "wiggle 4s ease-in-out infinite",
        "float-y": "floatY 6s ease-in-out infinite",
        "float-y-sm": "floatYSm 4.5s ease-in-out infinite",
        "float-y-md": "floatYMd 5.5s ease-in-out infinite",
        "sway-leaf": "sway 3.6s ease-in-out infinite",
        "pulse-bulb": "pulseBulb 2.6s ease-in-out infinite",
        twinkle: "twinkle 2.2s ease-in-out infinite",
        breath: "breath 4.5s ease-in-out infinite",
        // انیمیشن‌های ورود
        "enter-pop": "enterPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "enter-up": "enterUp 0.85s cubic-bezier(0.22, 1, 0.36, 1) both",
        "enter-down": "enterDown 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "enter-spin":
          "enterSpin 1s cubic-bezier(0.34, 1.56, 0.64, 1) both",
        "enter-fade": "enterFade 1.2s ease-out both",
        // تئاتر رشد Manifesto (چرخه ۸ ثانیه‌ای)
        "m-seed": "mSeed 8s ease-in-out infinite",
        "m-sprout": "mSprout 8s ease-in-out infinite",
        "m-young": "mYoung 8s ease-in-out infinite",
        "m-tree": "mTree 8s ease-in-out infinite",
        "m-can": "mCan 8s ease-in-out infinite",
        "m-drops": "mDrops 8s linear infinite",
        "m-spark": "mSpark 8s ease-out infinite",
        // صحنه جشن CTA
        wave: "wave 6s ease-in-out infinite",
        "star-pulse": "starPulse 5s ease-in-out infinite",
        "dot-pulse": "dotPulse 2.5s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        floatY: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        floatYSm: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
        floatYMd: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        sway: {
          "0%, 100%": { transform: "rotate(-9deg)" },
          "50%": { transform: "rotate(9deg)" },
        },
        spinSlow: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        spinRev: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(-360deg)" },
        },
        pulseBulb: {
          "0%, 100%": {
            transform: "scale(1)",
            filter: "brightness(1) drop-shadow(0 0 0 rgba(244,211,94,0))",
          },
          "50%": {
            transform: "scale(1.07)",
            filter:
              "brightness(1.15) drop-shadow(0 0 16px rgba(244,211,94,0.55))",
          },
        },
        twinkle: {
          "0%, 100%": {
            opacity: "0.45",
            transform: "scale(0.82) rotate(0deg)",
          },
          "50%": { opacity: "1", transform: "scale(1.15) rotate(35deg)" },
        },
        breath: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        // ─── keyframes ورود ───
        enterPop: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "60%": { opacity: "1", transform: "scale(1.12)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        enterUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(50px) scale(0.7)",
          },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        enterDown: {
          "0%": {
            opacity: "0",
            transform: "translateY(-50px) scale(0.6)",
          },
          "70%": {
            opacity: "1",
            transform: "translateY(8px) scale(1.05)",
          },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        enterSpin: {
          "0%": {
            opacity: "0",
            transform: "scale(0) rotate(-180deg)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) rotate(0deg)",
          },
        },
        enterFade: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // ─── keyframes تئاتر رشد Manifesto (دوره ۱۲ ثانیه‌ای) ───
        mSeed: {
          "0%": { opacity: "1", transform: "scale(1)" },
          "26%, 30%": {
            opacity: "1",
            transform: "scale(1.04) translateY(-2px)",
          },
          "33%": { opacity: "0", transform: "scale(1.06)" },
          "92%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        mSprout: {
          "0%, 30%": { opacity: "0", transform: "scale(0.4)" },
          "34%": { opacity: "1", transform: "scale(1.15)" },
          "38%, 46%": { opacity: "1", transform: "scale(1)" },
          "50%, 100%": { opacity: "0", transform: "scale(1)" },
        },
        mYoung: {
          "0%, 47%": { opacity: "0", transform: "scale(0.6)" },
          "51%": { opacity: "1", transform: "scale(1.12)" },
          "54%, 60%": { opacity: "1", transform: "scale(1)" },
          "63%, 100%": { opacity: "0", transform: "scale(1)" },
        },
        mTree: {
          "0%, 62%": { opacity: "0", transform: "scale(0.6)" },
          "66%": { opacity: "1", transform: "scale(1.1)" },
          "70%, 88%": { opacity: "1", transform: "scale(1)" },
          "92%": { opacity: "0", transform: "scale(0.85)" },
          "100%": { opacity: "0", transform: "scale(0.6)" },
        },
        mCan: {
          "0%, 8%": {
            opacity: "0",
            transform:
              "translateX(85%) translateY(-25%) rotate(35deg) scaleX(-1)",
          },
          "14%": {
            opacity: "1",
            transform:
              "translateX(15%) translateY(-8%) rotate(5deg) scaleX(-1)",
          },
          "20%, 28%": {
            opacity: "1",
            transform:
              "translateX(0%) translateY(0%) rotate(-18deg) scaleX(-1)",
          },
          "32%": {
            opacity: "1",
            transform:
              "translateX(15%) translateY(-8%) rotate(5deg) scaleX(-1)",
          },
          "38%, 100%": {
            opacity: "0",
            transform:
              "translateX(85%) translateY(-25%) rotate(35deg) scaleX(-1)",
          },
        },
        mDrops: {
          "0%, 18%": {
            opacity: "0",
            transform: "translateY(-15px) scale(0.6)",
          },
          "22%": { opacity: "1", transform: "translateY(0px) scale(1.05)" },
          "26%": { opacity: "1", transform: "translateY(30px) scale(1)" },
          "30%": { opacity: "1", transform: "translateY(60px) scale(0.95)" },
          "34%, 100%": {
            opacity: "0",
            transform: "translateY(90px) scale(0.75)",
          },
        },
        mSpark: {
          "0%, 62%": { opacity: "0", transform: "scale(0.4)" },
          "66%": { opacity: "1", transform: "scale(1.3)" },
          "72%": { opacity: "0.85", transform: "scale(1.05)" },
          "85%": { opacity: "0.55", transform: "scale(1)" },
          "92%, 100%": { opacity: "0", transform: "scale(0.5)" },
        },
        // ─── keyframes صحنه جشن CTA ───
        // شخصیت اصلی گاهی دست تکان می‌دهد (۹۰٪ ثابت، ۱۰٪ چند لرزش)
        wave: {
          "0%, 70%, 100%": { transform: "rotate(0deg)" },
          "74%": { transform: "rotate(-5deg)" },
          "78%": { transform: "rotate(6deg)" },
          "82%": { transform: "rotate(-4deg)" },
          "86%": { transform: "rotate(3deg)" },
          "92%": { transform: "rotate(0deg)" },
        },
        // ستاره بزرگ نفس می‌کشد + تاب و چرخش
        starPulse: {
          "0%, 100%": { transform: "rotate(-6deg) scale(1)" },
          "25%": { transform: "rotate(4deg) scale(1.06)" },
          "50%": { transform: "rotate(8deg) scale(1)" },
          "75%": { transform: "rotate(-2deg) scale(1.04)" },
        },
        // نقطه سبز scale + opacity pulse
        dotPulse: {
          "0%, 100%": { opacity: "0.7", transform: "scale(0.88)" },
          "50%": { opacity: "1", transform: "scale(1.18)" },
        },
      },
    },
  },
  plugins: [],
};
