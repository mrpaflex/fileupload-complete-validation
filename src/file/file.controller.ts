import { BadRequestException, Controller, FileTypeValidator, HttpException, MaxFileSizeValidator, ParseFilePipe, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { error } from 'console';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('file')
export class FileController {

    @Post('upload')
    @UseInterceptors(FilesInterceptor('file', 3, {
        storage: diskStorage({
            destination: './src/fileuploaded',
            filename: (req, file, cb)=>{
                const name = file.originalname.split('.')[0];
                const randomNumberAddToName = Math.round(Math.random() * 40);
                const fileExt = extname(file.originalname);
                const newfilename = name+''+randomNumberAddToName+''+fileExt;

                cb(null, newfilename);
               console.log(newfilename);
            }
        }),

        fileFilter: (req, file, cb) =>{
            if (!file.originalname.match(/\.(PNG|png|jpeg|JEPG|jpg|JPG|mp4|MP4|PDF|pdf)$/ )) {
                return cb(null,  false);
            }
            cb(null, true);  
        },
    limits:{
        fileSize: 1000000,///filesize of 1mb
    } 
    }))
    getfile(@UploadedFile(

    ) fieldname: Express.Multer.File){
        
        if (!fieldname) {
            throw new BadRequestException('this file is not supported');
        }
       console.log(fieldname);
       return `file ${fieldname.filename} successfully uploaded `;
    }
}
