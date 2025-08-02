const {Hamza} = require('../TalkDrove/Hamza');

Hamza({nomCom : "returns" , categorie : "General", alias: ["החזרות", "מדיניות-החזרה"]},async (dest , zk , commandeOptions)=>{
  const {ms, repondre, arg} = commandeOptions;
  
  let returnsText = "";
  returnsText += `🔄 *מדיניות החזרות והחלפות* 🔄\n\n`;
  returnsText += `📅 *תקופת החזרה:* 30 יום מיום הקנייה\n\n`;
  returnsText += `✅ *תנאי החזרה:*\n`;
  returnsText += `• המוצר חייב להיות במצב מקורי\n`;
  returnsText += `• אריזה מקורית ותווית\n`;
  returnsText += `• ללא שימוש או נזק\n`;
  returnsText += `• קבלה או הוכחת רכישה\n\n`;
  returnsText += `💰 *החזר כספי:*\n`;
  returnsText += `• החזר מלא תוך 7-14 ימי עסקים\n`;
  returnsText += `• החזר לאמצעי התשלום המקורי\n\n`;
  returnsText += `🔄 *החלפות:*\n`;
  returnsText += `• החלפה חינמית במקרה של פגם\n`;
  returnsText += `• החלפת מידה/צבע (בכפוף למלאי)\n\n`;
  returnsText += `❌ *מוצרים ללא החזרה:*\n`;
  returnsText += `• מוצרי היגיינה אישית\n`;
  returnsText += `• תכשיטים מותאמים אישית\n`;
  returnsText += `• מוצרי מזון ושתייה\n\n`;
  returnsText += `📞 *יצירת קשר:*\n`;
  returnsText += `לפרטים נוספים השתמש בפקודה: .contact\n\n`;
  returnsText += `🌟 *BYTE-MD - שירות לקוחות מעולה* 🌟`;

  zk.sendMessage(dest, {
    text: returnsText,
  }, {
    quoted: ms,
  });
});