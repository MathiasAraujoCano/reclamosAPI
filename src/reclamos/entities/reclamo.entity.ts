import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FileCsv } from './file-csv.entity';
import { ProductImage } from './product-image.entity';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: 'reclamos' })
export class Reclamo {

  @ApiProperty({
    example: '505066f2-bae9-4afb-935e-8e5c2ca3ccff',
    description: 'Reclamo ID',
    uniqueItems: true
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '3cc5dffc-eb1b-4b43-81e7-f9a0977eba91',
    description: 'Numero de Reclamo',
    uniqueItems: true
  })
  @Column()
  numeroReclamo: string;

  @ApiProperty({
    example: 'falla',
    description: 'titulo del reclamo',
  })
  @Column({
    type: 'text'
  })
  titulo: string;

  @ApiProperty({
    example: 'no enciende',
    description: 'problema',
  })
  @Column()
  problema: string;

  @ApiProperty({
    example: 'archivo csv',
    description: 'detalle de compra',
    uniqueItems: true
  })
  @OneToOne(
    () => FileCsv,
    { 
        cascade: true,
        eager: true     
    },
    )
    @JoinColumn()
    detalle_compra?: FileCsv;

  @OneToOne(
    () => ProductImage,
    { 
        cascade: true,
        eager: true     
    },
    )
    @JoinColumn()
    imagen?: ProductImage;


    @ManyToOne( () => User, user => user.reclamo, { nullable: false, lazy: true } )
    @Index('userId-index')
    user: User;
}