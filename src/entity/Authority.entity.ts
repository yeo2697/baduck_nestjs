import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthority } from "./userAuthority.entity";

@Entity({ name: 'authority' })
export class Authority {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, unique: true})
    authority_name: string;

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
    @OneToMany( () => UserAuthority, userAuthority => userAuthority.authority, { nullable: true, eager: true } )
    authority_users: UserAuthority [];
}