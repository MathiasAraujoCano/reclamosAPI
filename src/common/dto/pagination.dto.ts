import { ArgsType, Field, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

@ArgsType()
export class PaginationArgs {

    @ApiProperty({
        default: 10,
        description: 'cuantas filas tu quieres ver'
    })
    @Field( () => Int, { nullable: true })
    @IsOptional()
    @IsPositive()
    @Type( () => Number)       
    limit?: number = 10;

    @ApiProperty({
        default: 0,
        description: 'cuantas filas tu quieres saltearte'
    })
    @Field( () => Int, { nullable: true })
    @IsOptional()
    @Min(0)  
    @Type( () => Number)
    offset?: number = 0;
}