import { Component, OnInit, ViewContainerRef, Input, ViewChild } from '@angular/core';
import { Todo } from '../todo';
import { TodolistService } from '../todolist.service';
import { ToastsManager, ToastOptions } from 'ng2-toastr/ng2-toastr';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

@Component({
  selector: 'todo-list',
  templateUrl: './todolist.component.html',
  providers: [TodolistService, ToastsManager]
})
export class ListComponent {
  todolist: Todo[];
  @Input()
  newItem: string;
  response: Boolean;
  selectedItem: Todo;
  checkedItem: Todo;
  editMode: boolean;

  @ViewChild('editModal')
  editModal: ModalComponent;

  constructor(
    private todolistService: TodolistService,
    private toastr: ToastsManager,
    public vRef: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vRef);
  }
  checkItem(todoitem): void {
    todoitem.isComplete = !todoitem.isComplete;
    this.saveAction(false);
  }

  openModal() {
    this.editModal.open();
  }

  editItem(todoitem: Todo): void {
    this.selectedItem = todoitem;
    if (this.selectedItem)
      this.editModal.open();
  }

  saveAndClose() {
    this.saveAction(true);
    this.editModal.close();
  }
  revertAndClose() {
    this.getTodoList();
    this.editModal.close();
  }
  showSuccess() {
    this.toastr.success('Todo list saved.', 'Success!');
  }

  showWarning() {
    this.toastr.warning('Todo task is empty.', 'Warning!');
  }
  showGenericError() {
    this.toastr.error('Unknown error occured.', 'Error!');
  }
  getTodoList(): void {
    this.todolistService.getList().then(todolist => this.todolist = todolist);
  }
  ngOnInit(): void {
    this.getTodoList();
    this.response = false;
  }
  deleteItem(item: Todo): void {
    var index = this.todolist.indexOf(item);
    if (index > -1) {
      this.todolist.splice(index, 1);
      this.saveAction(true);
    } else {
      this.showGenericError();
    }
  }

  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.addNewAction();
    }
  }

  addNewAction(): void {
    if (this.newItem) {
      var newTodo = new Todo();
      newTodo.dateAdded = new Date();
      newTodo.content = this.newItem;
      newTodo.isComplete = false;
      this.todolist.push(newTodo);
      this.newItem = "";
      this.saveAction(true);
    }
    else {
      this.showWarning();
    }
  }
  saveAction(toToast: Boolean): void {
    this.todolist.sort(function (a: Todo, b: Todo) {
      return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime()
    });
    this.response = this.todolistService.saveList(this.todolist);
    if (this.response == true && toToast)
      this.showSuccess();
  }
}
