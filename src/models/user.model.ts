export class User {

    public $key: string

    constructor(
      public name : string,
      public email : string,
      public password : string,
      public telephone : string,
      public photo: string
    ){

    }
}
