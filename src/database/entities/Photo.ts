import { Field, ObjectType } from "@nestjs/graphql"
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm"
import { Exchange } from "./Exchange"

@ObjectType()
@Entity('Photos')
export class Photo {

    @Field()
    @PrimaryColumn('varchar', {
        name: 'photo_name',
        nullable: false
    })
    name: string

    @Field()
    @ManyToOne(() => Exchange, exchange => exchange.photos, {
        onDelete: 'CASCADE'
    })
    @JoinColumn({
        name: 'owner',
        referencedColumnName: 'id',
        foreignKeyConstraintName: 'fk_exchange_photo'
    })
    owner: string

}
