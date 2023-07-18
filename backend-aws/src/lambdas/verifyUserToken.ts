import { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { S3, StepFunctions } from 'aws-sdk';
import {AWS_S3_USER_BUCKET, AWS_STEP_FUNCTION_VERIFY_TOKEN } from '../constants/aws-resources'

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
      let result: Boolean;
        const { body } = event;
        const jsonPayload = JSON.parse(body || '');
        const {id, firstName , lastName, token } = jsonPayload
        const stepFunctions = new StepFunctions();
        const stateMachineArn = AWS_STEP_FUNCTION_VERIFY_TOKEN;   
        const input = { id, firstName, lastName, token};

        const params = {
          stateMachineArn: stateMachineArn,
          input: JSON.stringify(input)
        };

        stepFunctions.startExecution(params, (err, data) => {
          if (err) {
            console.error('Failed to start Step Function execution:', err);
          } else {
            console.log('Step Function execution started:', data);
          }
          return {
            statusCode: 200,
            body: JSON.stringify(result)
          }
    
        }) 
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ message: `${error} ${event.body}`}),
      };
    }

}