import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Authority } from "./Authority.entity";
import { User } from "./user.entity";

@Entity({ name: 'user_authority' })
export class UserAuthority {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ nullable: false })
    // user_id: number;

    // @Column({ nullable: false })
    // authority_id: number;

    @Column({ default: true, nullable: false })
    enabled: boolean;

    @Column({ type: 'date', nullable: false })
    created_date: Date;

    @Column({ 
        type: 'timestamp with time zone',
        default: () => 'CURRENT_TIMESTAMP'
     })
    updated_date: Date;

    @Column({ type: 'date', default: null })
    deleted_date: Date;

    /**
     * Associate
     */
    @ManyToOne( () => User, user => user.user_authorities, { nullable: true, eager: false } )
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne( () => Authority, authority => authority.authority_users, { nullable: true, eager: false } )
    @JoinColumn( { name: 'authority_id' } )
    authority: Authority;
}