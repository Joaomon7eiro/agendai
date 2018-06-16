
export class User {

    public id: string
    public independent : boolean
    constructor(
      public name : string,
      public address : string,
      public district : string,
      public city : string,
      public state : string,
      public email : string,
      public password : string,
      public telephone : string,
      public photo: string
    ){

    }
}
