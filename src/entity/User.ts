import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsEmail, IsPhoneNumber, IsBoolean } from 'class-validator';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    @IsEmail()
    email: string;

    @Column({ type: 'varchar', length: 15, unique: true })
    @IsPhoneNumber('PK')
    phone_number: string;

    @Column({ type: 'varchar', length: 255 })
    @IsString()
    password: string;

    @Column({ type: 'boolean', default: true })
    @IsBoolean()
    is_active: boolean;

    @Column({ type: 'boolean', default: false })
    @IsBoolean()
    is_superuser: boolean;
}
