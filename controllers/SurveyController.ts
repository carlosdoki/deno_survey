import { RouterContext } from "../deps.ts";
import Survey from "../models/Surveys.ts";
import BaseSurveyController from "./BaseSurveyController.ts";

class SurveyController extends BaseSurveyController {
  async getAllForUser(ctx: RouterContext) {
    const surveys = await Survey.findByUser("1");
    ctx.response.body = surveys;
  }
  async getSingle(ctx: RouterContext) {
    const id = ctx.params.id!;
    const survey = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      ctx.response.body = survey;
    }
  }
  async create(ctx: RouterContext) {
    const {
      value: { name, description },
    } = await ctx.request.body();
    const survey = new Survey("1", name, description);
    await survey.create();
    ctx.response.status = 201;
    ctx.response.body = survey;
  }
  async update(ctx: RouterContext) {
    const id = ctx.params.id!;
    const survey = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      const {
        value: { name, description },
      } = await ctx.request.body();
      await survey.update({ name, description });
      ctx.response.body = survey;
    }
  }
  async delete(ctx: RouterContext) {
    const id = ctx.params.id!;
    const survey = await this.findSurveyOrFail(id, ctx);
    if (survey) {
      await survey.delete();
      ctx.response.status = 204;
    }
  }
}

const surveyController = new SurveyController();
export default surveyController;
