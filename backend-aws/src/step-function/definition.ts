export const definitionJson = {
  "StartAt": "retrieveUser",
  "States": {
    "retrieveUser": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "OutputPath": "$.Payload",
      "Parameters": {
        "Payload.$": "$",
        "FunctionName": "arn:aws:lambda:us-east-1:446650953357:function:BackendAwsStack-getUserB196FDAE-fh5DmGBpLJXf:$LATEST"
      },
      "Retry": [
        {
          "ErrorEquals": [
            "Lambda.ServiceException",
            "Lambda.AWSLambdaException",
            "Lambda.SdkClientException",
            "Lambda.TooManyRequestsException"
          ],
          "IntervalSeconds": 2,
          "MaxAttempts": 6,
          "BackoffRate": 2
        }
      ],
      "Next": "Found"
    },
    "Found": {
      "Type": "Choice",
      "Choices": [
        {
          "Variable": "$.response",
          "StringEquals": "OK",
          "Next": "verifyUserToken"
        }
      ],
      "Default": "Fail"
    },
    "verifyUserToken": {
      "Type": "Task",
      "Resource": "arn:aws:states:::lambda:invoke",
      "OutputPath": "$.Payload",
      "Parameters": {
        "Payload.$": "$",
        "FunctionName": "arn:aws:lambda:us-east-1:446650953357:function:BackendAwsStack-verifyUserTokenE8BE21CF-4vQt4R9nc9DQ:$LATEST"
      },
      "Retry": [
        {
          "ErrorEquals": [
            "Lambda.ServiceException",
            "Lambda.AWSLambdaException",
            "Lambda.SdkClientException",
            "Lambda.TooManyRequestsException"
          ],
          "IntervalSeconds": 2,
          "MaxAttempts": 6,
          "BackoffRate": 2
        }
      ],
      "Next": "Verified"
    },
    "Verified": {
      "Type": "Choice",
      "Choices": [
        {
          "Not": {
            "Variable": "$.response",
            "StringEquals": "OK"
          },
          "Next": "Success"
        }
      ],
      "Default": "Fail"
    },
    "Success": {
      "Type": "Succeed"
    },
    "Fail": {
      "Type": "Fail"
    }
  }
}