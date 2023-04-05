import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Reclamo } from "./reclamo.entity";

@Entity({name: 'product_imagen'})
export class ProductImage {

    @PrimaryGeneratedColumn() 
    id: number;

    @Column('text')
    url: string;

    @OneToOne(
        () => Reclamo,
        ( product ) => product.imagen,
        { onDelete: 'CASCADE'}
    )
    reclamo: Reclamo;
}