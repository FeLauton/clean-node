import { auth } from "./../middlewares/auth";
import { adaptMiddleware } from "./../adapters/express-middleware-adapter";
import { makeAuthMiddleware } from "./../factories/middlewares/auth-middleware-factory";
import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeLoadSurveysController } from "../factories/controllers/survey/load-surveys/load-surveys-controller-factory";
import { makeAddSurveyController } from "../factories/controllers/survey/add-survey/add-survey-controler-factory";
import { adminAuth } from "../middlewares/admin-auth";

export default (router: Router): void => {
  router.post("/surveys", adminAuth, adaptRoute(makeAddSurveyController()));
  router.get("/surveys", auth, adaptRoute(makeLoadSurveysController()));
};
