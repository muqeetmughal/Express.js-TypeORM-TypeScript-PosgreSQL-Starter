// src/entities/BaseEntity.ts

import { BaseEntity as TypeORMBaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class BaseEntityClass extends TypeORMBaseEntity {

    @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)' })
    created_at: Date;

    @UpdateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' })
    updated_at: Date;
}
