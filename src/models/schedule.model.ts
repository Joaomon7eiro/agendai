export class Schedule {

  public id: string

  constructor(
    public name : string,
    public date : Date,
    public day : string,
    public time : string,
    public photo: string
  ){

  }
}
