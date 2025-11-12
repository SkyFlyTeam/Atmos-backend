const axios = require('axios');
const fs = require('fs');

// Configurações
const JIRA_URL = process.env.JIRA_URL;
const JIRA_USERNAME = process.env.JIRA_USERNAME;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const HEADERS = {
  'Authorization': `Basic ${Buffer.from(`${JIRA_USERNAME}:${JIRA_API_TOKEN}`).toString('base64')}`,
  'Content-Type': 'application/json',
};

// Função para pegar o tempo de transição no Jira
const getTransitionTimes = async (issueKey) => {
  try {
    const response = await axios.get(`${JIRA_URL}/rest/api/3/issue/${issueKey}/transitions`, { headers: HEADERS });
    const transitions = response.data.transitions;

    let timeToPR = null;
    let timeToDone = null;

    // Procura por transições específicas
    transitions.forEach((transition) => {
      const timestamp = new Date(transition.created).toISOString();
      if (transition.name === 'PR' && !timeToPR) {
        timeToPR = timestamp;
      }
      if (transition.name === 'Concluído' && !timeToDone) {
        timeToDone = timestamp;
      }
    });

    return { timeToPR, timeToDone };
  } catch (error) {
    console.error(`Erro ao consultar o Jira: ${error}`);
  }
};

// Pega a lista de issues ou PRs
const issues = ['AT-49', 'AT-50', 'AT-51', 'AT-48', 'AT-52', 'AT-53', 'AT-54', 'AT-55', 'AT-64', 'AT-65', 'AT-66', 'AT-68', 'AT-69', 'AT-70', 'AT-71', 'AT-74','AT-75']; 

const collectData = async () => {
  let reportData = '';

  for (const issue of issues) {
    const times = await getTransitionTimes(issue);
    reportData += `## ${issue}\n`;
    reportData += `- Tempo para mudança para 'PR': ${times.timeToPR}\n`;
    reportData += `- Tempo para 'Concluído': ${times.timeToDone}\n\n`;
  }
  
  fs.writeFileSync('docs/metrics/jira-transition-report.md', reportData);
};

collectData();
