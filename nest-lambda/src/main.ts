import { NestFactory } from '@nestjs/core';
import { AppModule} from './app.module';
import { AppService } from './app.service'

/* This is just a sample for a generic API Gateway handler,
   for a full list of sanples see:
   https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/aws-lambda/test 
   ------------------------------------------------------------------*/
import {Handler, Context, Callback} from 'aws-lambda'

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

let appContext;
const init = async()=>{
  return appContext = await NestFactory.createApplicationContext(AppModule, {logger: ['error']});
}
const executeInit = init();

export const handler : MyHandler = async (event) => {
  await executeInit;
  const appService = appContext.get(AppService);
  const resp : MyHttpResponse = {
    statusCode: 200,
    headers : {"Content-Type": "application/json"},
    body: JSON.stringify( {greeting: appService.greet(event.body.firstName, event.body.lastName) })
  };
  return resp;
}
