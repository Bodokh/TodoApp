import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodolistService{
    getList(): Promise<Todo[]>{
        if (localStorage.getItem("todolist")){
            return Promise.resolve(JSON.parse(localStorage.getItem("todolist")) as Todo[]);
        } 
        return Promise.resolve([]);
    }
    saveList(list: Todo[]): Boolean{
        localStorage.setItem("todolist",JSON.stringify(list));
        if (localStorage.getItem("todolist") == JSON.stringify(list))
            return true;
        return false;
    }
}