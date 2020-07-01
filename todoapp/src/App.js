console.log("App.js: loaded");
export class App {
  constructor() {
    console.log("App initialized");
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    formElement.addEventListener("submit", (event) => {
      // submit イベントの本来の動作を止める
      // -> preventDefault をしない場合はページがリロードされる
      event.preventDefault(); // そんなオプションが…
      console.log(`入力欄の値: ${inputElement.value}`);
    });
  }
}
