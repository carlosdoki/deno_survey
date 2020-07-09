import { RouterContext, renderFileToString } from "../deps.ts";
import Survey from "../models/Surveys.ts";
import Question from "../models/Question.ts";
import { renderView } from "../helpers.ts";

class SiteController {
  async surveys(ctx: RouterContext) {
    const surveys = await Survey.findAll();
    ctx.response.body = await renderView(
      `surveys`,
      { surveys },
    );
  }
  async viewSurvey(ctx: RouterContext) {
    const id: string = ctx.params.id!;
    const survey = await Survey.findById(id);
    if (!survey) {
      ctx.response.body = await renderView(`notfound`);
      return;
    }
    const questions = await Question.findBySurvey(id);
    ctx.response.body = await renderView(`survey`, { survey, questions });
  }
}

const siteController = new SiteController();
export default siteController;
