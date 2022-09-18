import { Field, ObjectType } from '@nestjs/graphql'
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Photo } from './Photo'

// TypeORM Entity Model Configuration for Table Exchanges

@ObjectType()
@Entity('Exchanges')
export class Exchange {

    @Field()
    @PrimaryGeneratedColumn('uuid', {
        name: 'id_ex',
        primaryKeyConstraintName: 'pk_exchange'
    })
    id: string

    @Field()
    @Column('varchar', {
        name: 'user_name',
        length: 100,
        nullable: false
    })
    username: string

    @Field()
    @Column('varchar', {
        name: 'contact',
        length: 20,
        nullable: false
    })
    contact: string

    @Field()
    @Column('varchar', {
        name: 'title',
        length: 100,
        nullable: false
    })
    title: string

    @Field()
    @Column('text', {
        name: 'search_for',
        nullable: false
    })
    searchFor: string

    @Field()
    @Column('time with time zone', {
        name: 'created_at',
        default: new Date()
    })
    createdAt: Date

    @Field()
    @Column('time with time zone', {
        name: 'updated_at',
        default: new Date()
    })
    updatedAt: Date

    @Field()
    @Column('char', {
        name: 'is_active',
        length: 1,
        default: 'Y'
    })
    isActive: string

    @Field(type => [Photo])
    @OneToMany(() => Photo, photo => photo.owner, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    photos: Photo[]

}
