import { Collection } from "mongodb";
import { MongoHelper } from "../helpers/mongo-helpers";
import { SurveyMongoRepository } from "./survey-mongo-repository";

let surveyCollection: Collection;

describe("Survey Mongo Repository", () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });
  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection("surveys");
    await surveyCollection.deleteMany({});
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository();
  };

  test("Should return an 204 on SurveyMongo Repository success", async () => {
    const sut = makeSut();
    await sut.add({
      question: "any_question",
      answers: [
        { image: "any_image", answer: "any_answer" },
        { answer: "other_answer" },
      ],
    });
    const survey = await surveyCollection.findOne({ question: "any_question" });
    expect(survey).toBeTruthy();
  });
});