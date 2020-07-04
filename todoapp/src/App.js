import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { element, render } from "./view/html-util.js";

export class App {
  constructor() {
    // 1. TodoList の初期化
    this.todoListModel = new TodoListModel();
  }

  mount() {
    const formElement = document.querySelector("#js-form");
    const inputElement = document.querySelector("#js-form-input");
    const containerElement = document.querySelector("#js-todo-list");
    const todoItemCounterElement = document.querySelector("#js-todo-count");
    // 2. TodoListModel の状態が更新されたら表示を更新する
    this.todoListModel.onChange(() => {
      // Todo リストをまとめる List 要素
      const todoListElement = element`<ul />`;
      // それぞれの TodoItem 要素を todoListElement 以下へ追加する
      const todoItems = this.todoListModel.getTodoItems();
      todoItems.forEach((item) => {
        const todoItemElement = item.completed
          ? element`<li>
          <input type="checkbox" class="checkbox" checked><s>${item.title}</s></input>
          </li>`
          : element`<li>
          <input type="checkbox" class="checkbox">${item.title}</input>
          </li>`;
        todoListElement.appendChild(todoItemElement);
      });
      // containerElement の中身を todoListElement で上書きする
      render(todoListElement, containerElement);

      // アイテム数の表示を更新
      todoItemCounterElement.textContent = `Todo アイテム数: ${this.todoListModel.getTotalCount()}`;
    });

    // 3. フォームを送信したら、新しい TodoItemModel を追加する
    formElement.addEventListener("submit", (event) => {
      // submit イベントの本来の動作を止める
      // -> preventDefault をしない場合はページがリロードされる
      event.preventDefault(); // そんなオプションが…

      this.todoListModel.addTodo(
        new TodoItemModel({
          title: inputElement.value,
          completed: false,
        })
      );
      inputElement.value = "";
    });
  }
}
