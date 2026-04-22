import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  caption!: string;

  @Column()
  imageUrl!: string;

  @ManyToOne(() => User, user => user.posts)
  user!: User;

  @OneToMany('Like', 'post')
  likes!: any[];

  @OneToMany('Comment', 'post')
  comments!: any[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}