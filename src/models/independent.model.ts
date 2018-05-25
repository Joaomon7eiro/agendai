export class Independent {

  public $key: string

  constructor(
    public name : string,
    public description : string,
    public cost : number,
    public telephone : string,
    public imageSrc: string,
    public rating : number,
    public days : string,
    public startTime: string,
    public endTime: number,
    public category: number
  ){

  }
}
