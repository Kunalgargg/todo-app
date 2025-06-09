import { Injectable } from '@nestjs/common';
import { todoDto } from './dto/todo.dto';

@Injectable()
export class TodoService {

    private todos = [
        {
            id: 1,
            name: `Let's play`
        }
    ]

    getAllTodos(){
        return this.todos
    }

    getOneTodo(id: number){
        const todo = this.todos.find((todo) => todo.id === id)

        if(!todo){
            throw new Error('todo not found');
        }

        return todo;
    }

    createTodo(todo: todoDto){
        const id = this.todos.length + 1;
        this.todos.push({
            id,
            ...todo
        });

        return this.getOneTodo(id);
    }

    updateTodo(id: number, updatedTodo: todoDto){
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) throw new Error('todo not found');
        this.todos[index] = { ...this.todos[index], ...updatedTodo };
        return this.todos[index];
    }

    deleteTodo(id: number){
        const index = this.todos.findIndex(todo => todo.id === id);
        if (index === -1) throw new Error('todo not found');
        const deleted = this.todos.splice(index, 1);
        return { message: 'todo deleted', deleted };
    }
}
