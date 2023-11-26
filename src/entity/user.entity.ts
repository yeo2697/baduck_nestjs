import { IsEmail, IsMobilePhone, Max, Min } from "class-validator";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserAuthority } from "./userAuthority.entity";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    user_name: string;

    @Column({ nullable: false, unique: true })
    @IsEmail()
    user_email: string;

    @Column({ nullable: false, unique: true })
    user_nickname: string;

    @Column({ nullable: false })
    password: string;

    @Column({nullable: false})
    @IsMobilePhone("ko-KR")
    mobile_phone: string;

    @Column({ nullable: false })
    address: string;

    @Column({ nullable: false })
    @Min(1900)
    birth_year: number;

    @Column({ nullable: false })
    @Min(1) @Max(12)
    birth_month: number;

    @Column({ nullable: false })
    @Min(1) @Max(31)
    birth_day: number;

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
    @OneToMany( () => UserAuthority, userAuthority => userAuthority.user, {nullable: true, eager: true})
    user_authorities: UserAuthority[];
}