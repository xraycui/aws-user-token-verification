import * as cdk from 'aws-cdk-lib';
import { ApiGateway } from './ApiGateway'
import { Lambda } from './Lambda'
import { Construct } from 'constructs';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as iam from 'aws-cdk-lib/aws-iam';

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
    const verifyUserTokenLambda = new Lambda(this, 'verifyUserToken')
    const definition = require('../src/step-function/definition')

    const role = new iam.Role(this, 'VerifyTokenStateMachineRole', {
      assumedBy: new iam.ServicePrincipal('states.amazonaws.com'),
    });

    const verifyTokenStateMachine = new stepfunctions.StateMachine(this, 'VerifyTokenStateMachine', {
      definitionBody: stepfunctions.DefinitionBody.fromChainable(definition),
      role: role,
    });
  }
}
