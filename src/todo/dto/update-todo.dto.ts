import { IsString, IsBoolean, IsOptional } from "class-validator"

export class updateTodoDto {
    
    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsBoolean()
    taskCompleted?: boolean
}