import { Injectable } from "@nestjs/common";
import { Authority } from "src/entity/Authority.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class AuthorityRepository extends Repository <Authority> {
    constructor(dataSource: DataSource) {
        super(Authority, dataSource.createEntityManager());
    }

    public async findByAuthoirtyName (authorityName: string) {
        return await this.createQueryBuilder('authority')
            .where(`authority.authority_name = :authorityName`, { authorityName })
            .getOne();
    }
}