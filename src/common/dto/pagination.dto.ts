import { ArgsType, Field, Int } from "@nestjs/graphql";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Min } from "class-validator";

@ArgsType()
export class PaginationArgs {

    @Field( () => Int, { nullable: true })
    @IsOptional()
    @IsPositive()
    @Type( () => Number)       
    limit?: number = 10;

    @Field( () => Int, { nullable: true })
    @IsOptional()
    @Min(0)  
    @Type( () => Number)
    offset?: number = 0;
}