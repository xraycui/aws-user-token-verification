import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3 } from 'aws-sdk';
import {AWS_S3_USER_BUCKET } from '../constants/aws-resources'

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
      try {
         interface User {
            firstName: string;
            lastName: string;
          }
         const { body } = event;
         const jsonPayload = JSON.parse(body || '');
         const { firstName , lastName } = jsonPayload

         const s3 = new S3();
         const data = await s3.listObjectsV2({Bucket: AWS_S3_USER_BUCKET,}).promise()

         const objectPromises = data.Contents?.map(async (content) => {
            const getObjectParams = {
              Bucket: AWS_S3_USER_BUCKET,
              Key: content.Key || '',
            };
      
            const objectData = await s3.getObject(getObjectParams).promise();
            const object: User = JSON.parse(objectData.Body?.toString() || '');
      
            if (object[firstName] === firstName && object[lastName] === lastName) {
              return object;
            }
      
            return null;
          });

         const objects = await Promise.all(objectPromises || []);
         const filteredObjects = objects.filter((object) => object !== null) as User[];

         if (filteredObjects.length > 0) {
            return {
               statusCode: 200,
               headers: {
                   "Access-Control-Allow-Origin": "*",
                   "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
                   "Access-Control-Allow-Headers": "Content-Type"
               },
               body: JSON.stringify(filteredObjects[0]) 
            }
         }
         return {
            statusCode: 200,
            body: JSON.stringify({ message: 'There is no data found'})
         }
      } catch (error) {
         return {
           statusCode: 500,
           body: JSON.stringify({ message: `${error} ${event.body}`}),
         };
       }
}