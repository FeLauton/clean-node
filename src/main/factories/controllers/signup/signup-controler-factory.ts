import { SignUpController } from "../../../../presentation/controllers/signup/signup-controller";
import { Controller } from "../../../../presentation/protocols";
import { makeSignUpValidation } from "./signup-validation-factory";
import { makeDbAuthenticationFactory } from "../../usecases/authentication/db-authentication-factory";
import { makeDbAddAccountFactory } from "../../usecases/add-account/db-add-account-factory";
import { makeLogControllerDecorator } from "../../decorators/log-controller-decorator-factory";

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccountFactory(),
    makeSignUpValidation(),
    makeDbAuthenticationFactory()
  );
  return makeLogControllerDecorator(controller);
};
