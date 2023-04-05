import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';


@Injectable()
export class AwsService {

  private s3: S3;

  constructor(){
    this.s3 = new S3({
      region: 'us-east-1'
    })
  }

  uploadFileToS3(file: any): Promise<S3.ManagedUpload.SendData> {
    const params = {
      Bucket: process.env.MY_BUCKET,
      Key: uuid(),
      Body: file.buffer
    };
    return this.s3.upload(params).promise();
  }

}
