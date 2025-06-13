import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TodoDocument = Todo & Document;

@Schema()
export class Todo {
    @Prop({required: true})
    name: string

    @Prop({default: false})
    taskCompleted: boolean

}

export const TodoSchema = SchemaFactory.createForClass(Todo);