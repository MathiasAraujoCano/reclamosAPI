import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reclamo } from "./reclamo.entity";

@Entity({name: 'fileCsv'})
export class FileCsv {

    @PrimaryGeneratedColumn() 
    id: number;

    @Column('text')
    name: string;

    @OneToOne(
        () => Reclamo,
        ( product ) => product.detalle_compra,
        { onDelete: 'CASCADE'}
    )
    reclamo: Reclamo;
}