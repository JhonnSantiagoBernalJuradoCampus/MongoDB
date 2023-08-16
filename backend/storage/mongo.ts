export class Error {
  constructor(data:Partial<Error>){
    Object.assign(this,data);
  }
}