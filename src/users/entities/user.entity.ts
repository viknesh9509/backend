import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    fullName: string;

    @Column()
    score: number;

    @Column({ nullable: true })
    profilePicture?: string;

    @Column({ nullable: true })
    bio?: string;

    @Column({ nullable: true })
    createdAt?: Date;

    @Column({ nullable: true })
    updatedAt?: Date;
}
