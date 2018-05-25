export class Schedule {

  public $key: string

  constructor(
    public name : string,
    public date : string,
    public day : string,
    public time : string,
    public photo: string
  ){

  }
}
