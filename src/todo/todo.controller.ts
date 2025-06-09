import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { TodoService } from './todo.service';
import { todoDto } from './dto/todo.dto';

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
            return this.todoService.getOneTodo(+id)
        } catch (error) {
            throw new NotFoundException(error.message);
        }
    }

    @Post()
    createTodo(@Body() todo: todoDto){
        return this.todoService.createTodo(todo)
    }

    @Put(':id')
    updateTodo(@Param('id') id: string, @Body() updatedTodo: todoDto){
        try {
            return this.todoService.updateTodo(+id, updatedTodo);
        } catch (error) {
            throw new NotFoundException(error.message);        
        }
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string){
        try {
            return this.todoService.deleteTodo(+id);
        } catch (error) {
            throw new NotFoundException(error.message);        
        }
    }
}
