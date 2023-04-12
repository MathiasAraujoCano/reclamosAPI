import { ArgsType, Field } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

@ArgsType()
export class SearchArgs {

    @ApiProperty({
        description: 'busca las palabras claves en el titulo y/o problema'
    })
    @Field( () => String, { nullable: true } )
    @IsOptional()
    @IsString()
    search?: string;

}