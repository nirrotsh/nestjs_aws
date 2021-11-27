import {Handler} from 'aws-lambda'

interface MyRequestBody {
  firstName: string;
  lastName: string;
}

interface MyEvent {
  body: MyRequestBody;
}

interface MyResponseBody {
  greeting: string;
}

interface MyResponseHeaders {
  "Content-Type": string;
}

//Export is just for testing purposes
export interface MyHttpResponse {
  statusCode: number;
  headers: MyResponseHeaders;
  body: string;
}

type MyHandler = Handler<MyEvent, MyHttpResponse>

export const handler : MyHandler = async (event) => {
  const resp : MyHttpResponse = {
    statusCode: 200,
    headers : {"Content-Type": "application/json"},
    body: JSON.stringify( {greeting: greet(event.body.firstName, event.body.lastName) })
  };
  return resp;
}

const greet = (firstName : string, lastName : string) => {
    return `Greeing ${firstName} ${lastName}; Live long and prosper 🖖`;
}