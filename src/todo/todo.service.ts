import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo, TodoDocument } from 'src/schemas/todo.schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {

    constructor(@InjectModel(Todo.name) private todoModel: Model<TodoDocument>) {}
    // private todos = [
    //     {
    //         id: 1,
    //         name: `Let's play`
    //     }
    // ]

    async getAllTodos(){
        return this.todoModel.find().exec();
        // return this.todos
    }

    async getOneTodo(id: string){
        const todo = await this.todoModel.findById(id).exec()
        if(todo)
            return {todo: todo, message: 'Fetched Successfully'};
        else
            return 'No Data Found for this id';
        // const todo = this.todos.find((todo) => todo.id === id)
        // if(!todo){
        //     throw new Error('todo not found');
        // }
        // return todo;
    }

    async createTodo(todo: CreateTodoDto){
        const newTodo = new this.todoModel({...todo})
        await newTodo.save();
        return {newTodo: newTodo, message: 'Added Successfully'};
        // const id = this.todos.length + 1;
        // this.todos.push({
        //     id,
        //     ...todo
        // });

        // return this.getOneTodo(id);
    }

    async updateTodo(id: string, updatedTodo: updateTodoDto){
        await this.todoModel.findByIdAndUpdate(id, updatedTodo).exec();
        const todo = await this.todoModel.findById(id);
        if(todo)
        return {todo: todo, message: 'Updated Successfully'};
        else
        return 'No Data Found for this id'
        // const index = this.todos.findIndex(todo => todo.id === id);
        // if (index === -1) throw new Error('todo not found');
        // this.todos[index] = { ...this.todos[index], ...updatedTodo };
        // return this.todos[index];
    }

    async deleteTodo(id: string){
        const todo = await this.todoModel.findById(id).exec();
        if(todo){
            await this.todoModel.findByIdAndDelete(id);
            return 'Deleted Successfully'
        }
        else{
            return 'No Data Found for this id'
        }
        // const index = this.todos.findIndex(todo => todo.id === id);
        // if (index === -1) throw new Error('todo not found');
        // const deleted = this.todos.splice(index, 1);
        // return { message: 'todo deleted', deleted };
    }
}
