import * as cdk from 'aws-cdk-lib';
import { ApiGateway } from './ApiGateway'
import { Lambda } from './Lambda'
import { Construct } from 'constructs';

export class BackendAwsStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
   
    const api = new ApiGateway(this);

    const createUserLambda = new Lambda(this, 'createUser')
    const getUserLambda = new Lambda(this, 'getUser')
    const updateUserLambda = new Lambda(this, 'updateUser')
    const deleteUserLambda = new Lambda(this, 'deleteUser')
    
    api.addIntegration('POST', '/post', createUserLambda)
    api.addIntegration('GET', '/get', getUserLambda)
    api.addIntegration('PUT', '/update', updateUserLambda)
    api.addIntegration('DELETE', '/delete', deleteUserLambda)

    // step function

  }
}
