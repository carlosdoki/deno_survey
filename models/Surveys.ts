import { surveyCollection } from "../mongo.ts";
import BaseModel from "./BaseModel.ts";

export default class Survey extends BaseModel {
  public id: string = "";

  constructor(
    public userId: string,
    public name: string,
    public description: string,
  ) {
    super();
  }

  static async findByUser(userId: string): Promise<Survey[]> {
    const survey = await surveyCollection.find({ userId });
    return survey.map((survey: any) => Survey.prepare(survey));
  }

  static async findById(id: string): Promise<Survey | null> {
    const survey = await surveyCollection.findOne({ _id: { $oid: id } });

    if (!survey) {
      return null;
    }
    return Survey.prepare(survey);
  }

  async create() {
    delete this.id;
    const { $oid } = await surveyCollection.insertOne(this);
    this.id = $oid;
    return this;
  }

  protected static prepare(data: any): Survey {
    data = BaseModel.prepare(data);
    const survey = new Survey(data.userId, data.name, data.description);
    survey.id = data.id;
    return survey;
  }
}
