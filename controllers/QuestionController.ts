import { RouterContext } from "../deps.ts";
import BaseSurveyController from "./BaseSurveyController.ts";
import Question from "../models/Question.ts";

class QuestionController extends BaseSurveyController {
  async getBySurvey(ctx: RouterContext) {
    const surveyId: string = ctx.params.surveyId!;
    const survey = await this.findSurveyOrFail(surveyId, ctx);
    if (survey) {
      const questions = await Question.findBySurvey(surveyId);
      ctx.response.body = questions;
    }
  }
  async getSingle(ctx: RouterContext) {}
  async create(ctx: RouterContext) {}
  async update(ctx: RouterContext) {}
  async delete(ctx: RouterContext) {}
}

const questionController = new QuestionController();
export default questionController;
