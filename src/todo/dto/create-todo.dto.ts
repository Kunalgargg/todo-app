import { IsString, IsBoolean } from "class-validator"

export class CreateTodoDto {
    // @Type(() => String)
    // @Type(() => Number)
    @IsString()
    name: string

    @IsBoolean()
    taskCompleted: boolean
}