const fs = require('fs');
const path = require('path');

const HISTORY_FILE_PATH = path.join(__dirname, '../../HISTORY.md');

const getISTDateTime = () => {
  const date = new Date();
  const options = {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };
  return date.toLocaleString('en-IN', options);
};

const logHistory = async ({ agentName, taskTitle, prompt, responseSummary, status }) => {
  try {
    const entry = `
---

Date & Time: ${getISTDateTime()}
Agent Name: ${agentName}
Task Title: ${taskTitle}
Prompt: ${prompt}
Response Summary: ${responseSummary}
Status: ${status}

---

`;

    await fs.promises.appendFile(HISTORY_FILE_PATH, entry, 'utf8');
  } catch (error) {
    console.error('Failed to log history:', error);
  }
};

module.exports = logHistory;
