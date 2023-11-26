import { DataSource, Repository } from "typeorm";
import { User } from 'src/entity/user.entity'
import { Injectable } from "@nestjs/common";

const table: string = 'users';

@Injectable()
export class UserRepository extends Repository <User> {
    constructor(dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    /**
     * Method
     */
    public async findUserByUserEmailAndDeletdDate(userEmail: string, deletedDate: Date) {
        return await this.createQueryBuilder('user')
            // .select()
            // .from(User, 'user')
            .where(`user.user_email = :userEmail`, { userEmail })
            .andWhere(`user.deleted_date IS NULL`)
            .leftJoinAndSelect(`user.user_authorities`, 'ua')
            .getOne();
    }

    public async findUserByUserEmail(userEmail: string) {
        return await this.createQueryBuilder('user')
            // .select()
            // .from(User, 'user')
            .where(`user.user_email = :userEmail`, { userEmail })
            .andWhere(`user.deleted_date IS NULL`)
            .leftJoinAndSelect(`user.user_authorities`, 'ua')
            .leftJoinAndSelect(`ua.authority`, `auth`)
            .getOne();
    }
}