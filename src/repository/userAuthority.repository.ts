import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { UserAuthority } from "src/entity/userAuthority.entity";

@Injectable()
export class UserAuthorityRepository extends Repository <UserAuthority> {
    constructor(dataSource: DataSource) {
        super(UserAuthority, dataSource.createEntityManager());
    }
}