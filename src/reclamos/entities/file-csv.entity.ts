import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reclamo } from "./reclamo.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'fileCsv'})
export class FileCsv {

    @ApiProperty()
    @PrimaryGeneratedColumn() 
    id: number;

    @ApiProperty()
    @Column('text')
    name: string;

    @OneToOne(
        () => Reclamo,
        ( product ) => product.detalle_compra,
        { onDelete: 'CASCADE'}
    )
    reclamo: Reclamo;
}