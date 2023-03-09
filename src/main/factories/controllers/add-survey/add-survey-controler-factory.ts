import { Controller } from "../../../../presentation/protocols";
import { makeAddSurveyValidation } from "./add-survey-validation-factory";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";
import { AddSurveyController } from "../../../../presentation/controllers/survey/add-survey/add-survey-controller";
import { makeDbAddSurveyFactory } from "../../usecases/add-survey/db-add-survey-factory";

export const makeSurveyController = (): Controller => {
  const controller = new AddSurveyController(
    makeAddSurveyValidation(),
    makeDbAddSurveyFactory()
  );
  return makeLogControllerDecorator(controller);
};
