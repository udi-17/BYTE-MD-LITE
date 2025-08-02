const {Hamza} = require('../TalkDrove/Hamza');

Hamza({nomCom : "contact" , categorie : "General", alias: ["צור-קשר", "יצירת-קשר", "קשר"]},async (dest , zk , commandeOptions)=>{
  const {ms, repondre, arg} = commandeOptions;
  
  let contactText = "";
  contactText += `📞 *צור קשר איתנו* 📞\n\n`;
  contactText += `🏢 *פרטי החברה:*\n`;
  contactText += `📍 כתובת: רחוב הטכנולוגיה 123, תל אביב\n`;
  contactText += `📞 טלפון: 03-1234567\n`;
  contactText += `📱 נייד: 050-1234567\n`;
  contactText += `📧 אימייל: info@bytemd.co.il\n\n`;
  contactText += `🕐 *שעות פעילות:*\n`;
  contactText += `ראשון-חמישי: 09:00-18:00\n`;
  contactText += `יום שישי: 09:00-13:00\n`;
  contactText += `שבת: סגור\n\n`;
  contactText += `💬 *תמיכה טכנית:*\n`;
  contactText += `WhatsApp: wa.me/972501234567\n`;
  contactText += `Telegram: @ByteMDSupport\n\n`;
  contactText += `🌐 *רשתות חברתיות:*\n`;
  contactText += `🔗 אתר: www.bytemd.co.il\n`;
  contactText += `📘 Facebook: fb.com/ByteMD\n`;
  contactText += `📷 Instagram: @ByteMD_IL\n\n`;
  contactText += `❓ *שאלות נפוצות:*\n`;
  contactText += `• מדיניות החזרות: השתמש ב .returns\n`;
  contactText += `• מידע על המוצרים: .info\n`;
  contactText += `• מעקב הזמנה: .track [מספר הזמנה]\n\n`;
  contactText += `📧 *צור קשר ישיר:*\n`;
  contactText += `לשאלות מיוחדות או בקשות, שלח הודעה עם:\n`;
  contactText += `.message [הנושא] - [ההודעה שלך]\n\n`;
  contactText += `🚀 *BYTE-MD - כאן בשבילך 24/7* 🚀`;

  zk.sendMessage(dest, {
    text: contactText,
  }, {
    quoted: ms,
  });
});

// פקודה נוספת לשליחת הודעה ישירה
Hamza({nomCom : "message" , categorie : "General", alias: ["הודעה", "שלח-הודעה"]},async (dest , zk , commandeOptions)=>{
  const {ms, repondre, arg} = commandeOptions;
  
  if (!arg || arg.length === 0) {
    return repondre("🔍 *איך להשתמש:*\n.message [נושא] - [ההודעה שלך]\n\n*דוגמה:*\n.message תמיכה - יש לי בעיה עם ההזמנה");
  }
  
  const fullMessage = arg.join(' ');
  const messageParts = fullMessage.split(' - ');
  
  if (messageParts.length < 2) {
    return repondre("❌ *פורמט שגוי!*\n\nצריך להפריד בין הנושא להודעה עם ' - '\n\n*דוגמה:*\n.message תמיכה - יש לי בעיה עם ההזמנה");
  }
  
  const subject = messageParts[0];
  const message = messageParts[1];
  
  let responseText = "";
  responseText += `✅ *ההודעה נשלחה בהצלחה!*\n\n`;
  responseText += `📋 *פרטי ההודעה:*\n`;
  responseText += `• נושא: ${subject}\n`;
  responseText += `• הודעה: ${message}\n`;
  responseText += `• זמן שליחה: ${new Date().toLocaleString('he-IL')}\n\n`;
  responseText += `⏰ *זמן תגובה צפוי:* 2-4 שעות\n`;
  responseText += `📞 לעניין דחוף: 050-1234567\n\n`;
  responseText += `🙏 תודה שפנית אלינו!`;
  
  repondre(responseText);
});