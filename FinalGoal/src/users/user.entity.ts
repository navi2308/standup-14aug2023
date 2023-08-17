import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

// import { Exclude } from 'class-transformer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  // @Exclude()
  @Column()
  password: string;

  @Column()
  email: string;

  @Column({ default: true })
  admin: boolean;

  @AfterInsert()
  logInsert() {
    console.log(`${this.id} was inserted`);
  }
  @AfterUpdate()
  logUpdate() {
    console.log(`${this.id} was updated`);
  }
  @AfterRemove()
  logRemove() {
    console.log(`${this.id} was removed`);
  }
}
