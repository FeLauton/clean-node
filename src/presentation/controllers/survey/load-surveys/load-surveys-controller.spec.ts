import {
  noContent,
  ok,
  serverError,
} from "./../../../helpers/http/http-helpers";
import { LoadSurveysController } from "./load-surveys-controller";
import { SurveyModel } from "../../../../domain/models/survey";
import { LoadSurveys } from "./load-surveys-controller-protocols";
import MockDate from "mockdate";

const makeFakeSurveys = (): SurveyModel[] => [
  {
    id: "any_id",
    question: "any_question",
    answers: [
      {
        image: "any_image",
        answer: "any_answer",
      },
    ],
    date: new Date(),
  },
  {
    id: "other_id",
    question: "other_question",
    answers: [
      {
        image: "other_image",
        answer: "other_answer",
      },
    ],
    date: new Date(),
  },
];

const makeLoadSurveys = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return new Promise<SurveyModel[]>((resolve) =>
        resolve(makeFakeSurveys())
      );
    }
  }
  return new LoadSurveyStub();
};

interface SutTypes {
  sut: LoadSurveysController;
  loadSurveyStub: LoadSurveys;
}

const makeSut = (): SutTypes => {
  const loadSurveyStub = makeLoadSurveys();
  const sut = new LoadSurveysController(loadSurveyStub);
  return {
    sut,
    loadSurveyStub,
  };
};

describe("LoadSurvey Controller", () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });
  afterAll(() => {
    MockDate.reset();
  });

  test("Should calls LoadSurveys", async () => {
    const { sut, loadSurveyStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyStub, "load");
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  test("Should return 200 on success", async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(ok(makeFakeSurveys()));
  });

  test("Should return 204 if LoadSurveys returns empty", async () => {
    const { sut, loadSurveyStub } = makeSut();
    jest
      .spyOn(loadSurveyStub, "load")
      .mockReturnValueOnce(new Promise((resolve) => resolve([])));
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(noContent());
  });

  test("Should return 500 if LoadSurveys throws", async () => {
    const { sut, loadSurveyStub } = makeSut();
    jest
      .spyOn(loadSurveyStub, "load")
      .mockReturnValueOnce(
        new Promise((resolve, reject) => reject(new Error()))
      );
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
