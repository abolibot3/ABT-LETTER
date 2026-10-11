
const express = require("express");
const path = require("path");
const fs = require("fs/promises");
const crypto = require("crypto");

const app = express();
const PORT = process.env.PORT || 3000;

const PUBLIC_DIR = path.join(__dirname, "public");
const DATABASE_DIR = path.join(__dirname, "database");
const DATABASE_FILE = path.join(DATABASE_DIR, "letters.json");

const LETTER_TYPES = [
  "love",
  "classic",
  "gift",
  "invite",
  "thanks",
  "apology"
];


const PAPER_STYLES = [
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



const FONT_STYLES = [
  "vazirmatn",
  "serif",
  "handwritten",
  "nastaliq",
  "amiri"
];


app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));

// ساخت دیتابیس اولیه در صورت نبودن فایل
async function initializeDatabase() {
  await fs.mkdir(DATABASE_DIR, { recursive: true });

  try {
    await fs.access(DATABASE_FILE);
  } catch {
    await fs.writeFile(DATABASE_FILE, "[]", "utf8");
  }
}

async function readLetters() {
  const content = await fs.readFile(DATABASE_FILE, "utf8");
  const letters = JSON.parse(content);

  if (!Array.isArray(letters)) {
    throw new Error("Invalid database format");
  }

  return letters;
}

// صف نوشتن برای جلوگیری از تداخل نوشتن‌های هم‌زمان
let writeQueue = Promise.resolve();

function saveLetters(letters) {
  const operation = writeQueue.then(async () => {
    const temporaryFile = DATABASE_FILE + ".tmp";

    await fs.writeFile(
      temporaryFile,
      JSON.stringify(letters, null, 2),
      "utf8"
    );

    await fs.rename(temporaryFile, DATABASE_FILE);
  });

  writeQueue = operation.catch(() => {});
  return operation;
}

// محدودیت ساده درخواست‌ها برای API ساخت نامه
const requestCounts = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 10;

app.use("/api/letters", (req, res, next) => {
  if (req.method !== "POST") {
    return next();
  }

  const now = Date.now();
  const key = req.ip;
  let record = requestCounts.get(key);

  if (!record || now - record.start >= WINDOW_MS) {
    record = { start: now, count: 0 };
  }

  record.count++;
  requestCounts.set(key, record);

  if (record.count > MAX_REQUESTS) {
    return res.status(429).json({
      success: false,
      message: "درخواست‌های زیادی فرستاده‌ای. کمی بعد دوباره امتحان کن."
    });
  }

  next();
});

// بررسی سلامت سرور
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ABT Letter server is running!"
  });
});


const BORDER_STYLES = ["none", "solid", "double", "dashed", "dotted", "ornate"];
const CORNER_STYLES = ["sharp", "soft", "round"];
const SHADOW_STYLES = ["none", "soft", "strong"];
const DECORATION_STYLES = ["classic", "heart", "flower", "gold", "none"];


// ساخت نامه
app.post("/api/letters", async (req, res, next) => {
  try {
    const body = req.body;

    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return res.status(400).json({
        success: false,
        message: "اطلاعات ارسالی معتبر نیست."
      });
    }

const {
  type,
  sender,
  receiver,
  title = "",
  message,
  paperStyle,
  fontStyle,
  textColor,
  borderStyle = "solid",
  borderColor = "#b68b55",
  borderWidth = 2,
  cornerStyle = "soft",
  shadowStyle = "soft",
  decorationStyle = "classic",
  fontSize = 17,
  lineHeight = 21
} = body;


    if (
      typeof type !== "string" ||
      !LETTER_TYPES.includes(type)
    ) {
      return res.status(400).json({
        success: false,
        message: "نوع نامه معتبر نیست."
      });
    }

    if (
      typeof sender !== "string" ||
      typeof receiver !== "string" ||
      !sender.trim() ||
      !receiver.trim() ||
      sender.trim().length > 60 ||
      receiver.trim().length > 60
    ) {
      return res.status(400).json({
        success: false,
        message: "نام فرستنده یا گیرنده معتبر نیست."
      });
    }

    if (
      typeof title !== "string" ||
      title.length > 100
    ) {
      return res.status(400).json({
        success: false,
        message: "عنوان نامه حداکثر باید ۱۰۰ کاراکتر باشد."
      });
    }

    if (
      typeof message !== "string" ||
      !message.trim() ||
      message.length > 5000
    ) {
      return res.status(400).json({
        success: false,
        message: "متن نامه باید بین ۱ تا ۵۰۰۰ کاراکتر باشد."
      });
    }

    if (!PAPER_STYLES.includes(paperStyle)) {
      return res.status(400).json({
        success: false,
        message: "سبک کاغذ معتبر نیست."
      });
    }

    if (!FONT_STYLES.includes(fontStyle)) {
      return res.status(400).json({
        success: false,
        message: "فونت انتخابی معتبر نیست."
      });
    }

    if (
      typeof textColor !== "string" ||
      !/^#[0-9a-fA-F]{6}$/.test(textColor)
    ) {
      return res.status(400).json({
        success: false,
        message: "رنگ متن معتبر نیست."
      });
    }

    
if (
  !BORDER_STYLES.includes(borderStyle) ||
  !CORNER_STYLES.includes(cornerStyle) ||
  !SHADOW_STYLES.includes(shadowStyle) ||
  !DECORATION_STYLES.includes(decorationStyle) ||
  typeof borderColor !== "string" ||
  !/^#[0-9a-fA-F]{6}$/.test(borderColor) ||
  !Number.isInteger(borderWidth) || borderWidth < 1 || borderWidth > 8 ||
  !Number.isInteger(fontSize) || fontSize < 14 || fontSize > 24 ||
  !Number.isInteger(lineHeight) || lineHeight < 15 || lineHeight > 25
) {
  return res.status(400).json({
    success: false,
    message: "یکی از تنظیمات ظاهری نامه معتبر نیست."
  });
}


    const letters = await readLetters();

    const letter = {
      id: crypto.randomBytes(16).toString("hex"),
      type,
      sender: sender.trim(),
      receiver: receiver.trim(),
      title: title.trim(),
      message,
      
paperStyle,
fontStyle,
textColor,
borderStyle,
borderColor,
borderWidth,
cornerStyle,
shadowStyle,
decorationStyle,
fontSize,
lineHeight,
createdAt: new Date().toISOString()

    };

    letters.push(letter);
    await saveLetters(letters);

    res.status(201).json({
      success: true,
      message: "نامه با موفقیت ساخته شد.",
      id: letter.id,
      url: `/letter/${letter.id}`
    });
  } catch (error) {
    next(error);
  }
});

// دریافت نامه با شناسه اختصاصی
app.get("/api/letters/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!/^[a-f0-9]{32}$/.test(id)) {
      return res.status(400).json({
        success: false,
        message: "شناسه نامه معتبر نیست."
      });
    }

    const letters = await readLetters();
    const letter = letters.find((item) => item.id === id);

    if (!letter) {
      return res.status(404).json({
        success: false,
        message: "این نامه پیدا نشد یا دیگر در دسترس نیست."
      });
    }

    res.set("Cache-Control", "no-store");
    res.json({ success: true, letter });
  } catch (error) {
    next(error);
  }
});

// صفحه نمایش نامه
app.get("/letter/:id", (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, "letter.html"));
});

// فایل‌های فرانت‌اند
app.use(express.static(PUBLIC_DIR));

// مدیریت خطاها
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof SyntaxError && err.status === 400) {
    return res.status(400).json({
      success: false,
      message: "اطلاعات ارسالی JSON معتبر نیست."
    });
  }

  console.error("Server error:", err.message);

  res.status(500).json({
    success: false,
    message: "خطایی در سرور رخ داده است."
  });
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`ABT Letter is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Could not initialize database:", error);
    process.exit(1);
  });
