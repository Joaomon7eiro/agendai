import { Moment } from "moment";

export class Schedule {

  public id: string

  constructor(
    public nameClient : string,
    public nameIndependent : string,
    public idIndependent : string,
    public date : string,
    public day : string,
    public time : string
  ){

  }
}
