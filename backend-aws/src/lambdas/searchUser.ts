export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    try {
      let result
      return {
          statusCode: 200,
          body: JSON.stringify(result)
       }
    } catch (error) {
       return {
         statusCode: 500,
         body: JSON.stringify({ message: `${error}`}),
       };
     }
}