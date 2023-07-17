# Description 
Current this project implements 2 use cases
    . Usecase 1: CRUD user prifile : UI(reactJS) -> API Gateway -> Lambdas -> S3
    . Usecase 2: Search and verify user token workflow: AWS Step Function -> Lambdas -> S3

# Floder Structure
    - root
        README.md
        - backend-aws 
            - lib 
                - backend-aws-stack.ts (provision apigw/lambda/stepfunction)
            - src/lambds 
            - src/stepFunction
                - definition.ts (define verifyUserTokenStateMachine)
        - front-reatjs
            - src/components (reusable component)
            - src/pages 
# Status
    - Usecase 1: 
        - Coding (done)
        - Debuging (wip)
        - Unit test (not start yet)
        - Automation test (not start yet)
    - Usecase 2:
        - Coding (wip)
    - CI/CD (not start yet)
