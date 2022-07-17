export interface ApiInterface {
  status: 'success' | 'fail';
  statusCode: number;
  responseMessage: string;
  data?: any;
}
