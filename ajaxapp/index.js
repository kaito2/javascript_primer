async function main() {
  try {
    const userId = getUserId();
    const userInfo = await fetchUserInfo(userId); // userId は HTML から取得
    const view = createView(userInfo);
    displayView(view);
  } catch (error) {
    console.error(`エラーが発生しました: (${error})`);
  }
}

function getUserId() {
  const value = document.getElementById("userId").value;
  return encodeURIComponent(value);
}

async function fetchUserInfo(userId) {
  response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(userId)}`
  );
  // エラーレスポンスが返されたことを検知する
  if (!response.ok) {
    throw new Error(`${response.status}: ${response.statusText}`);
  } else {
    return response.json();
  }
}

function createView(userInfo) {
  // HTML の組み立て
  return escapeHTML`
  <h4>${userInfo.name} (@${userInfo.login})</h4>
  <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
  <dl>
    <dt>Location</dt>
    <dd>${userInfo.location}</dd>
    <dt>Repositories</dt>
    <dd>${userInfo.public_repos}</dd>
  </dl>
  `;
}

function displayView(view) {
  const result = document.getElementById("result");
  result.innerHTML = view;
}

function escapeSpecialChars(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/;/g, "&#039");
}

function escapeHTML(strings, ...values) {
  console.log(`strings: ${strings}`);
  console.log(`values: ${values}`);
  return strings.reduce((result, str, i) => {
    const value = values[i - 1];
    if (typeof value === "string") {
      return result + escapeSpecialChars(value) + str;
    } else {
      return result + String(value) + str;
    }
  });
}
