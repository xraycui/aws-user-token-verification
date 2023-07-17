import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3 } from 'aws-sdk';
import {AWS_S3_USER_BUCKET } from '../constants/aws-resources'

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { body } = event;
        const jsonPayload = JSON.parse(body || '');

        const deleteObjectParams = {
            Bucket: AWS_S3_USER_BUCKET,
            Key: jsonPayload.id
        };

        const s3 = new S3();
        await s3.deleteObject(deleteObjectParams).promise()

        return {
            body: `${event.body}`,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type"
            },
            statusCode: 200
        }
    
    } catch (error) {
        return {
          statusCode: 500,
          body: JSON.stringify({ message: `${error} ${event.body}`}),
        };
      }
}