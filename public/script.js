
const $ = (selector) => document.querySelector(selector);

const form = $("#letter-form");

if (form) {
  const fields = {
    type: $("#letter-type"),
    sender: $("#sender"),
    receiver: $("#receiver"),
    title: $("#letter-title"),
    message: $("#message"),
    paperStyle: $("#paper-style"),
    fontStyle: $("#font-style"),
    textColor: $("#text-color"),
    
borderStyle: $("#border-style"),
borderColor: $("#border-color"),
borderWidth: $("#border-width"),
cornerStyle: $("#corner-style"),
shadowStyle: $("#shadow-style"),
decorationStyle: $("#decoration-style"),
fontSize: $("#font-size"),
lineHeight: $("#line-height")

  };

  const preview = {
    paper: $("#letter-preview"),
    sender: $("#preview-sender"),
    receiver: $("#preview-to"),
    title: $("#preview-title"),
    message: $("#preview-message"),
    count: $("#char-count"),
    colorValue: $("#color-value"),
    error: $("#form-error")
  };

  const typeTitles = {
    love: "نامه عاشقانه",
    classic: "نامه کلاسیک",
    gift: "هدیه و تبریک",
    invite: "دعوت‌نامه",
    thanks: "نامه تشکر",
    apology: "نامه عذرخواهی"
  };

  // ===== قالب‌های آماده ABT Letter =====

const readyTemplates = {
  love: {
    type: "love",
    title: "چند حرف از دلم",
    message:
      "سلام عزیزم،\n\nبعضی حرف‌ها را نمی‌شود ساده گفت؛ باید آن‌ها را نوشت تا از دل به دل برسند. خواستم بدانی که حضورت برایم ارزشمند است و خاطره‌های خوبمان را دوست دارم.\n\nامیدوارم روزهای قشنگی پیش رو داشته باشی.",
    paper: "pink",
    font: "handwritten",
    color: "#743B50",
    border: "heart"
  },

  birthday: {
    type: "gift",
    title: "تولدت مبارک!",
    message:
      "سلام!\n\nتولدت مبارک! 🎂\n\nامیدوارم سال جدید زندگی‌ات پر از شادی، سلامتی، موفقیت و اتفاق‌های قشنگ باشد. آرزو می‌کنم به هدف‌هایی که در ذهن داری برسی و همیشه دلت شاد باشد.\n\nبهترین‌ها را برایت آرزو می‌کنم!",
    paper: "cream",
    font: "vazirmatn",
    color: "#75451D",
    border: "gold"
  },

  thanks: {
    type: "thanks",
    title: "از تو ممنونم",
    message:
      "سلام دوست خوبم،\n\nخواستم از تو بابت تمام محبت‌ها و کمک‌هایت تشکر کنم. شاید گفتن یک تشکر ساده کافی نباشد، اما واقعاً قدردان کاری هستم که برایم انجام دادی.\n\nامیدوارم بتوانم روزی محبتت را جبران کنم.",
    paper: "white",
    font: "vazirmatn",
    color: "#34465A",
    border: "classic"
  },

  apology: {
    type: "apology",
    title: "ببخش اگر ناراحتت کردم",
    message:
      "سلام،\n\nمی‌خواهم بابت اتفاقی که افتاد از تو عذرخواهی کنم. اگر حرف یا رفتارم باعث ناراحتی‌ات شد، واقعاً متأسفم.\n\nبرای احساساتت ارزش قائلم و دوست دارم بتوانیم با آرامش درباره آن صحبت کنیم.",
    paper: "vintage",
    font: "serif",
    color: "#594538",
    border: "solid"
  },

  invite: {
    type: "invite",
    title: "دعوت‌نامه",
    message:
      "سلام و عرض ادب،\n\nباعث خوشحالی من است که از تو برای حضور در یک دورهمی صمیمی دعوت کنم.\n\nزمان: [زمان برگزاری]\nمکان: [محل برگزاری]\n\nامیدوارم بتوانی در کنار ما باشی و لحظات خوبی را با هم بگذرانیم.",
    paper: "cream",
    font: "vazirmatn",
    color: "#51412F",
    border: "gold"
  },

  classic: {
    type: "classic",
    title: "نامه‌ای دوستانه",
    message:
      "سلام و وقت بخیر،\n\nامیدوارم حالت خوب باشد و روزهای خوبی را سپری کنی. خواستم چند خطی برایت بنویسم و احوالت را بپرسم.\n\nامیدوارم به‌زودی فرصت گفت‌وگوی بیشتری داشته باشیم.\n\nبا آرزوی بهترین‌ها",
    paper: "cream",
    font: "serif",
    color: "#40352F",
    border: "classic"
  }
};

const templateStatus = document.querySelector(".template-status");
const templateCards = document.querySelectorAll(".template-card");

const templateDecorationMap = {
  heart: "heart",
  gold: "gold",
  classic: "classic",
  solid: "classic"
};

templateCards.forEach((card) => {
  card.addEventListener("click", () => {
    const template = readyTemplates[card.dataset.template];

    if (!template) return;

    // تغییر نوع و محتوای نامه
    fields.type.value = template.type;
    fields.title.value = template.title;
    fields.message.value = template.message;

    // تغییر ظاهر پیشنهادی
    fields.paperStyle.value = template.paper;
    fields.fontStyle.value = template.font;
    fields.textColor.value = template.color;

    // هماهنگ کردن قاب و تزئینات
    if (fields.borderStyle) {
      fields.borderStyle.value = "solid";
    }

    if (fields.borderColor) {
      fields.borderColor.value = "#b68b55";
    }

    if (fields.decorationStyle) {
      fields.decorationStyle.value =
        templateDecorationMap[template.border] || "classic";
    }

    // مشخص کردن کارت انتخاب‌شده
    templateCards.forEach((item) => {
      const selected = item === card;

      item.classList.toggle("is-selected", selected);
      item.setAttribute("aria-pressed", String(selected));
    });

    // نمایش پیام انتخاب
    if (templateStatus) {
      templateStatus.textContent =
        `قالب «${card.querySelector("strong").textContent}» انتخاب شد. می‌توانی متن و ظاهر آن را تغییر بدهی.`;
    }

    // به‌روزرسانی پیش‌نمایش و شمارنده
    updatePreview();

    fields.message.dispatchEvent(new Event("input", { bubbles: true }));
  });
});

// وضعیت اولیه کارت‌ها
templateCards.forEach((card) => {
  card.setAttribute("aria-pressed", "false");
});

  function updatePreview() {
    preview.sender.textContent = fields.sender.value.trim() || "نام فرستنده";
    preview.receiver.textContent = fields.receiver.value.trim()
      ? `برای ${fields.receiver.value.trim()}`
      : "برای گیرنده عزیز";

    preview.title.textContent =
      fields.title.value.trim() || typeTitles[fields.type.value];

    preview.message.textContent =
      fields.message.value || "متن نامه‌ات اینجا نمایش داده می‌شود...";

    preview.count.textContent = fields.message.value.length;

    preview.paper.classList.remove(
  "cream", "white", "vintage", "pink", "dark",
  "royal", "romantic", "minimal", "persian","blackgold", "antique", "iranian", "floral",
"silver", "luxury", "lavender",
  "font-serif", "font-handwritten", "font-nastaliq", "font-amiri"
);

    preview.paper.classList.add(fields.paperStyle.value);

    const fontClasses = {
  serif: "font-serif",
  handwritten: "font-handwritten",
  nastaliq: "font-nastaliq",
  amiri: "font-amiri"
};

const selectedFontClass = fontClasses[fields.fontStyle.value];

if (selectedFontClass) {
  preview.paper.classList.add(selectedFontClass);
}

    if (fields.fontStyle.value === "serif") {
      preview.paper.classList.add("font-serif");
    }

    if (fields.fontStyle.value === "handwritten") {
      preview.paper.classList.add("font-handwritten");
    }

    preview.paper.style.setProperty("--paper-ink", fields.textColor.value);
    preview.colorValue.textContent = fields.textColor.value.toUpperCase();

    
const paper = preview.paper;

const borderStyles = ["none", "solid", "double", "dashed", "dotted", "ornate"];
const cornerValues = {
  sharp: "0px",
  soft: "12px",
  round: "28px"
};
const shadowValues = {
  none: "none",
  soft: "0 8px 24px rgba(0,0,0,.08)",
  strong: "0 12px 32px rgba(0,0,0,.2)"
};
const decorationSymbols = {
  classic: "✦",
  heart: "♥",
  flower: "❀",
  gold: "✧",
  none: ""
};

const safeBorder = borderStyles.includes(fields.borderStyle.value)
  ? fields.borderStyle.value : "solid";

paper.classList.toggle("custom-border-none", safeBorder === "none");
paper.classList.toggle("custom-border-ornate", safeBorder === "ornate");

paper.style.setProperty("--custom-border-style",
  safeBorder === "ornate" || safeBorder === "none" ? "solid" : safeBorder);
paper.style.setProperty("--custom-border-color", fields.borderColor.value);
paper.style.setProperty("--custom-border-width", `${fields.borderWidth.value}px`);
paper.style.setProperty("--custom-radius", cornerValues[fields.cornerStyle.value] || "12px");
paper.style.setProperty("--custom-shadow", shadowValues[fields.shadowStyle.value] || shadowValues.soft);
paper.style.setProperty("--custom-font-size", `${fields.fontSize.value}px`);
paper.style.setProperty("--custom-line-height", (Number(fields.lineHeight.value) / 10).toString());

const topDecoration = paper.querySelector(".preview-top-decoration");
const bottomDecoration = paper.querySelector(".preview-bottom-decoration");
const symbol = decorationSymbols[fields.decorationStyle.value] ?? "✦";

if (topDecoration) topDecoration.textContent = symbol;
if (bottomDecoration) bottomDecoration.textContent = symbol;

$("#border-width-value").textContent = `${fields.borderWidth.value} پیکسل`;
$("#font-size-value").textContent = `${fields.fontSize.value} پیکسل`;
$("#line-height-value").textContent = (Number(fields.lineHeight.value) / 10).toFixed(1);


  }

Object.values(fields).filter(Boolean).forEach((field) => {
  field.addEventListener("input", updatePreview);
  field.addEventListener("change", updatePreview);
});

$("#reset-customization").addEventListener("click", () => {
  fields.borderStyle.value = "solid";
  fields.borderColor.value = "#b68b55";
  fields.borderWidth.value = "2";
  fields.cornerStyle.value = "soft";
  fields.shadowStyle.value = "soft";
  fields.decorationStyle.value = "classic";
  fields.fontSize.value = "17";
  fields.lineHeight.value = "21";
  updatePreview();
});


  // خواندن نوع نامه انتخاب‌شده از لینک صفحه اصلی
  const params = new URLSearchParams(window.location.search);
  const requestedType = params.get("type");

  if (requestedType && Object.hasOwn(typeTitles, requestedType)) {
    fields.type.value = requestedType;
  }

  fields.type.addEventListener("change", () => {
    const selectedTitle = typeTitles[fields.type.value];
    const currentTitle = fields.title.value.trim();

    if (!currentTitle || Object.values(typeTitles).includes(currentTitle)) {
      fields.title.value = selectedTitle;
    }

    updatePreview();
  });

  // فعلاً فرم فقط اعتبارسنجی و پیش‌نمایش دارد.
  
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  preview.error.hidden = true;

  if (!form.reportValidity()) return;

  if (!fields.sender.value.trim() || !fields.receiver.value.trim()) {
    preview.error.textContent = "نام فرستنده و گیرنده را وارد کن.";
    preview.error.hidden = false;
    return;
  }

  if (!fields.message.value.trim()) {
    preview.error.textContent = "متن نامه نمی‌تواند خالی باشد.";
    preview.error.hidden = false;
    return;
  }

  const submitButton = form.querySelector('[type="submit"]');
  submitButton.disabled = true;
  submitButton.textContent = "در حال ذخیره نامه...";

  try {
    const response = await fetch("/api/letters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        type: fields.type.value,
        sender: fields.sender.value.trim(),
        receiver: fields.receiver.value.trim(),
        title: fields.title.value.trim(),
        message: fields.message.value,
        paperStyle: fields.paperStyle.value,
        fontStyle: fields.fontStyle.value,
        textColor: fields.textColor.value,
        borderStyle: fields.borderStyle.value,
borderColor: fields.borderColor.value,
borderWidth: Number(fields.borderWidth.value),
cornerStyle: fields.cornerStyle.value,
shadowStyle: fields.shadowStyle.value,
decorationStyle: fields.decorationStyle.value,
fontSize: Number(fields.fontSize.value),
lineHeight: Number(fields.lineHeight.value)

      })
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || "ساخت نامه ناموفق بود.");
    }

    const letterUrl = new URL(result.url, window.location.origin).href;

    preview.error.replaceChildren();
    preview.error.className = "form-error form-success";
    preview.error.hidden = false;

    const successText = document.createElement("p");
    successText.textContent = "نامه با موفقیت ذخیره شد! لینک اختصاصی تو:";

    const link = document.createElement("a");
    link.href = letterUrl;
    link.textContent = letterUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "created-letter-link";

    const copyButton = document.createElement("button");
    copyButton.type = "button";
    copyButton.className = "copy-created-link";
    copyButton.textContent = "کپی لینک";

    copyButton.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(letterUrl);
        copyButton.textContent = "کپی شد ✓";
      } catch {
        copyButton.textContent = "کپی خودکار ممکن نیست؛ لینک را انتخاب کن.";
      }
    });

    preview.error.append(successText, link, copyButton);

  } catch (error) {
    preview.error.className = "form-error";
    preview.error.textContent =
      error.message || "ارتباط با سرور برقرار نشد.";
    preview.error.hidden = false;
  } finally {
    submitButton.disabled = false;
    submitButton.innerHTML = 'آماده‌سازی نامه <span>←</span>';
  }
});

  updatePreview();
}



/* ===== Display a shared letter ===== */

if (document.body.classList.contains("received-letter-page")) {
  const loading = document.querySelector("#letter-loading");
  const result = document.querySelector("#letter-result");
  const errorBox = document.querySelector("#letter-error");
  const errorMessage = document.querySelector("#letter-error-message");

  const openButton = document.querySelector("#open-letter");
  const openingHint = document.querySelector("#opening-hint");
  const paper = document.querySelector("#received-paper");
  const actions = document.querySelector("#received-actions");

  let currentLetterUrl = "";
  let hasOpened = false;

  function showError(message) {
    loading.hidden = true;
    result.hidden = true;
    errorMessage.textContent = message;
    errorBox.hidden = false;
  }

  async function loadLetter() {
    const parts = window.location.pathname.split("/").filter(Boolean);
    const id = parts[parts.length - 1];

    if (!id || !/^[a-f0-9]{32}$/.test(id)) {
      showError("لینک نامه معتبر نیست.");
      return;
    }

    try {
      const response = await fetch(
        `/api/letters/${encodeURIComponent(id)}`,
        { cache: "no-store" }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        showError(data.message || "نامه در دسترس نیست.");
        return;
      }

      const letter = data.letter;

      // تمام محتوای واردشده توسط کاربر به‌صورت متن نمایش داده می‌شود.
      document.querySelector("#received-greeting").textContent =
        `یک نامه برای ${letter.receiver}`;

      document.querySelector("#received-to").textContent =
        `برای ${letter.receiver}`;

      document.querySelector("#received-title").textContent =
        letter.title || "چند حرف از دل";

      document.querySelector("#received-message").textContent =
        letter.message;

      document.querySelector("#received-sender").textContent =
        letter.sender;

      
      // ظاهر اختصاصی هر نوع نامه
      const letterTypeClasses = [
        "love",
        "classic",
        "gift",
        "invite",
        "thanks",
        "apology"
      ];

      paper.classList.remove(
        ...letterTypeClasses.map(type => `letter-type-${type}`)
      );

      if (letterTypeClasses.includes(letter.type)) {
        paper.classList.add(`letter-type-${letter.type}`);
      }

     

      // قالب‌های مجاز نامه
      const paperStyles = [
        "cream",
        "white",
        "vintage",
        "pink",
        "dark",
        "royal",
        "romantic",
        "blackgold",
        "minimal",
        "persian",
        "antique",
        "iranian",
        "floral",
        "silver",
        "luxury",
        "lavender"
      ];

      // حذف کلاس‌های قبلی قالب
      paper.classList.remove(...paperStyles);

      // اعمال قالب انتخاب‌شده
      const selectedPaperStyle = paperStyles.includes(letter.paperStyle)
        ? letter.paperStyle
        : "cream";

      paper.classList.add(selectedPaperStyle);

      // فونت‌های مجاز
      const fontClasses = {
        serif: "font-serif",
        handwritten: "font-handwritten",
        nastaliq: "font-nastaliq",
        amiri: "font-amiri"
      };

      // حذف تمام فونت‌های قبلی
      paper.classList.remove(
        "font-serif",
        "font-handwritten",
        "font-nastaliq",
        "font-amiri"
      );

      // اعمال فونت ذخیره‌شده
      const selectedFontClass = fontClasses[letter.fontStyle];

      if (selectedFontClass) {
        paper.classList.add(selectedFontClass);
      }



if (selectedFontClass) {
  paper.classList.add(selectedFontClass);
}


      paper.style.setProperty("--received-ink", letter.textColor);

      // اعمال رنگ انتخاب‌شده توسط فرستنده
      
const designedColorThemes = [
  "royal",
  "romantic",
  "blackgold",
  "antique",
  "iranian",
  "floral",
  "silver",
  "luxury",
  "lavender"
];

if (!designedColorThemes.includes(selectedPaperStyle)) {
  paper.style.color = /^#[0-9a-fA-F]{6}$/.test(letter.textColor || "")
    ? letter.textColor
    : "#333333";
} else {
  paper.style.removeProperty("color");
}

      
      // اعمال تنظیمات ظاهری ذخیره‌شده در نامه
      const allowedBorders = ["none", "solid", "double", "dashed", "dotted", "ornate"];
      const allowedCorners = ["sharp", "soft", "round"];
      const allowedShadows = ["none", "soft", "strong"];
      const allowedDecorations = ["classic", "heart", "flower", "gold", "none"];

      const border = allowedBorders.includes(letter.borderStyle)
        ? letter.borderStyle
        : "solid";

      const cornerMap = {
        sharp: "0px",
        soft: "12px",
        round: "28px"
      };

      const shadowMap = {
        none: "none",
        soft: "0 8px 24px rgba(0,0,0,.08)",
        strong: "0 12px 32px rgba(0,0,0,.2)"
      };

      const symbolMap = {
        classic: "✦",
        heart: "♥",
        flower: "❀",
        gold: "✧",
        none: ""
      };

      paper.classList.toggle("custom-border-none", border === "none");
      paper.classList.toggle("custom-border-ornate", border === "ornate");

      paper.style.setProperty(
        "--custom-border-style",
        border === "ornate" || border === "none" ? "solid" : border
      );

      paper.style.setProperty(
        "--custom-border-color",
        /^#[0-9a-fA-F]{6}$/.test(letter.borderColor || "")
          ? letter.borderColor
          : "#b68b55"
      );

      const width = Number.isInteger(letter.borderWidth) &&
        letter.borderWidth >= 1 && letter.borderWidth <= 8
        ? letter.borderWidth
        : 2;

      const fontSize = Number.isInteger(letter.fontSize) &&
        letter.fontSize >= 14 && letter.fontSize <= 24
        ? letter.fontSize
        : 17;

      const lineHeight = Number.isInteger(letter.lineHeight) &&
        letter.lineHeight >= 15 && letter.lineHeight <= 25
        ? letter.lineHeight
        : 21;

      paper.style.setProperty("--custom-border-width", `${width}px`);
      paper.style.setProperty(
        "--custom-radius",
        cornerMap[allowedCorners.includes(letter.cornerStyle) ? letter.cornerStyle : "soft"]
      );
      paper.style.setProperty(
        "--custom-shadow",
        shadowMap[allowedShadows.includes(letter.shadowStyle) ? letter.shadowStyle : "soft"]
      );
      paper.style.setProperty("--custom-font-size", `${fontSize}px`);
      paper.style.setProperty("--custom-line-height", String(lineHeight / 10));

      const decoration = allowedDecorations.includes(letter.decorationStyle)
        ? symbolMap[letter.decorationStyle]
        : symbolMap.classic;

      paper.querySelectorAll(".received-paper-decoration").forEach((element) => {
        element.textContent = decoration;
        element.classList.toggle("is-hidden", !decoration);
        element.classList.add("custom-decoration");
      });


      document.title = `${letter.title || "نامه‌ای برای تو"} | ABT Letter`;

      currentLetterUrl = window.location.href;

      loading.hidden = true;
      result.hidden = false;

    } catch {
      showError("ارتباط با سرور برقرار نشد. اتصال اینترنت را بررسی کن.");
    }
  }

  openButton.addEventListener("click", () => {
    if (hasOpened) return;
    hasOpened = true;

    openButton.classList.add("is-open");
    openButton.disabled = true;
    openingHint.textContent = "نامه‌ات در حال باز شدن است...";

    window.setTimeout(() => {
      openButton.hidden = true;
      openingHint.hidden = true;

      paper.hidden = false;
      actions.hidden = false;

      
      // نمایش نرم و مرحله‌ای محتوای نامه
      requestAnimationFrame(() => {
        paper.classList.add("is-revealed");
      });


      paper.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });
    }, 750);
  });

  document.querySelector("#copy-letter-link").addEventListener(
    "click",
    async () => {
      const status = document.querySelector("#copy-status");

      try {
        await navigator.clipboard.writeText(currentLetterUrl);
        status.textContent = "لینک نامه کپی شد!";
      } catch {
        status.textContent = "کپی خودکار ممکن نیست؛ لینک را از نوار آدرس مرورگر کپی کن.";
      }
    }
  );

  loadLetter();
}

