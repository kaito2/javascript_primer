import { element } from "./view/html-util.js";

console.log("App.js: loaded");
export class App {
  constructor() {
    console.log("App initialized");
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCounterElement = document.querySelector("#js-todo-count");
    // Todo アイテム数
    let todoItemCount = 0;

    formElement.addEventListener("submit", (event) => {
      // submit イベントの本来の動作を止める
      // -> preventDefault をしない場合はページがリロードされる
      event.preventDefault(); // そんなオプションが…

      // 追加する Todo アイテムの要素(li 要素)を作成する
      const todoItemElement = element`<li>${inputElement.value}</li>`;

      // Todo アイテムを container に追加する
      containerElement.appendChild(todoItemElement);

      // Todo アイテム数を +1 し、表示されているテキストを更新する
      todoItemCount += 1;
      todoItemCounterElement.textContent = `Todo アイテム数: ${todoItemCount}`;

      // 入力欄を空文字列にしてリセット
      inputElement.value = "";
    });
  }
}
