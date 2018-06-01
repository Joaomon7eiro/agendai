
export class User {

    public id: string
    public independent : boolean
    constructor(
      public name : string,
      public email : string,
      public password : string,
      public telephone : string,
      public photo: string
    ){

    }
}
