import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { ArgsType, Field, Int } from 'type-graphql';

@ArgsType()
export class PaginatedArgs {
  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください' })
  @IsInt({ message: 'ページ番号わ整数で入力してください' })
  readonly page?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1, { message: 'ページ番号わ$constraint1以上で入力してください' })
  @Max(200, { message: 'ページ番号わ$constraint1以下で入力してください' })
  @IsInt({ message: 'ページ番号わ整数で入力してください' })
  readonly limit?: number;

  get currentPage() {
    return this.page || 1;
  }

  get skip() {
    return this.take * (this.currentPage - 1);
  }

  get take() {
    return this.limit || 20;
  }
}
