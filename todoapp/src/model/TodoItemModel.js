let todoIdx = 0;

export class TodoItemModel {
  /**
   * @param {string} title Todo アイテムのタイトル
   * @param {boolean} completed Todo アイテムが完了済みなら true、
   * そうでない場合は false
   */
  constructor({ title, completed }) {
    // idは自動的に連番になり、それぞれのインスタンスごとに異なるものとする
    this.id = todoIdx++;
    this.title = title;
    this.completed = completed;
  }
}
