import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { updateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService){}

    @Get()
    getAllTodos(){
        return this.todoService.getAllTodos()
    }

    @Get(':id')
    getOneTodo(@Param('id') id: string){
        try {
            return this.todoService.getOneTodo(id)
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    createTodo(@Body() todo: CreateTodoDto){
        // console.log(typeof todo.name);
        // console.log(todo.name);
        
        return this.todoService.createTodo(todo)
    }

    @Patch(':id')
    updateTodo(@Param('id') id: string, @Body() updatedTodo: updateTodoDto){
        try {
            return this.todoService.updateTodo(id, updatedTodo);
        } catch (error) {
            throw new NotFoundException(error.message);        
        }
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string){
        try {
            return this.todoService.deleteTodo(id);
        } catch (error) {
            throw new NotFoundException(error.message);        
        }
    }
}
