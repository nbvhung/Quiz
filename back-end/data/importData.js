// data/import.js
import mysql from "mysql2/promise";
import fs from "fs";

async function importData() {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "quiz",
    password: "s30082005",
    database: "quiz_app"
  });

  const data = JSON.parse(fs.readFileSync("./data/data.json", "utf-8"));

  console.log("🔄 Importing users...");
  for (const user of data.users) {
    await db.query(
      "INSERT INTO users (id, fullName, email, password, token) VALUES (?, ?, ?, ?, ?)",
      [user.id, user.fullName, user.email, user.password, user.token]
    );
  }

  console.log("🔄 Importing topics...");
  for (const topic of data.topics) {
    await db.query("INSERT INTO topics (id, name) VALUES (?, ?)", [
      topic.id,
      topic.name
    ]);
  }

  console.log("🔄 Importing questions...");
  for (const q of data.questions) {
    await db.query(
      "INSERT INTO questions (id, topicId, question, answers, correctAnswer) VALUES (?, ?, ?, ?, ?)",
      [
        q.id,
        q.topicId,
        q.question,
        JSON.stringify(q.answers),
        q.correctAnswer
      ]
    );
  }

  console.log("🔄 Importing answer history...");
  for (const group of data.answers) {
    for (const item of group.answers) {
      await db.query(
        "INSERT INTO answers (userId, topicId, questionId, answer) VALUES (?, ?, ?, ?)",
        [group.userId, group.topicId, item.questionId, item.answer]
      );
    }
  }

  console.log("✅ DONE! All data imported successfully.");
  process.exit();
}

importData();
