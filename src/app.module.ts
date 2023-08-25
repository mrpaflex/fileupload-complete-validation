import { Module } from '@nestjs/common';
import { FileController } from './file/file.controller';



@Module({
  imports: [],
  controllers: [FileController],
})
export class AppModule {}
