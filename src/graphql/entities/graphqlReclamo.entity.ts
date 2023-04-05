import { ObjectType, Field, ID } from '@nestjs/graphql';
import { User } from 'src/auth/entities/user.entity';
import { FileCsv } from 'src/reclamos/entities/file-csv.entity';

import { Column, Entity, Index, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';


@Entity({ name: 'reclamos' })
@ObjectType()
export class GraphQLReclamos {

  @PrimaryGeneratedColumn('uuid')
  @Field( () => ID )
  id: string;

  @Column()
  @Field( () => String )
  numeroReclamo: string;

  @Column({
    type: 'text'
  })
  @Field( () => String )
  titulo: string;

  @Column()
  @Field( () => String )
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


  @ManyToOne( () => User, user => user.reclamo, { nullable: false, lazy: true } )
  @Index('userId-index')
  user: User
}