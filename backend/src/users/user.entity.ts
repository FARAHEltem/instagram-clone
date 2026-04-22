import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Post } from '../posts/post.entity';
import { Follow } from '../follows/follow.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  username!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ select: false })
  password!: string;

  @Column({ nullable: true })
  bio?: string;

  @Column({ nullable: true })
  profilePicture?: string;

  @Column({ default: false })
  isPrivate!: boolean;

  @OneToMany(() => Post, (post: Post) => post.user)
  posts!: Post[];

  @OneToMany(() => Follow, (follow: Follow) => follow.follower)
  following!: Follow[];

  @OneToMany(() => Follow, (follow: Follow) => follow.following)
  followers!: Follow[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
