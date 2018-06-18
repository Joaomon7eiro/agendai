import { Moment } from "moment";

export class Schedule {

  public id: string
  public telephoneClient : string
  public addressClient : string
  public districtClient : string
  public cityClient : string
  public stateClient : string

  constructor(
    public nameClient : string,
    public idClient : string,
    public nameIndependent : string,
    public categoryIndependent : string,
    public idIndependent : string,
    public telephoneIndependent : string,
    public addressIndependent : string,
    public districtIndependent : string,
    public cityIndependent : string,
    public stateIndependent : string,
    public date : string,
    public day : string,
    public time : string
  ){

  }
}
