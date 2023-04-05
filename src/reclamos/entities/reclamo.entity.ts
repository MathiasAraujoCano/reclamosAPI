import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FileCsv } from './file-csv.entity';
import { ProductImage } from './product-image.entity';


@Entity({ name: 'reclamos' })
export class Reclamo {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  numeroReclamo: string;

  @Column({
    type: 'text'
  })
  titulo: string;

  @Column()
  problema: string;

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