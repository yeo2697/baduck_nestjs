import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'qwer123',
    database: 'baduck_nestjs',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // entities: [__dirname + '/src/entity/*.entity{.ts,.js}'],
    synchronize: true, // 개발 환경에서는 true, 프로덕션 환경에서는 false로 설정하는 것이 좋습니다.
};

export default typeORMConfig;