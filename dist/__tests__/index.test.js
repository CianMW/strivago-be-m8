"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = require("../server");
dotenv_1.default.config();
const request = (0, supertest_1.default)(server_1.server);
const validAccommodation = {
    name: "The grand hotel",
    city: "New York"
};
const testDestination = {
    name: "London"
};
let _id = null;
describe("Testing server", () => {
    beforeAll((done) => {
        // Starting the http server
        server_1.server.listen(process.env.PORT, () => {
            if (!process.env.MONGO_DB_TEST_URL) {
                throw new Error("MONGO_URL_TEST is not defined");
            }
        });
    });
    // POST /accommodation = Creat a new accomodation entry
    it("should check that the POST /accommodation endpoint creates and returns a new post "),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/accommodation").send(validAccommodation);
            expect(response.status).toBe(201);
            expect(response.body._id).toBeDefined();
            expect(response.body.name).toBeDefined();
            expect(response.body.city).toBeDefined();
            _id = response.body._id;
        });
    // POST /accommodation - INVALID DATA
    it("should check that the POST /accommodation endpoint returns 400 if data is incorrect"),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/accommodation").send({ name: "string" });
            expect(response.status).toBe(400);
        });
    //GET ALL TEST
    it("should return the full list of accommodation "), () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/accommodation");
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });
    // GET /accommodation/:id
    it("should check that the  GET /accommodation/:id endpoint returns a single accommodation by id"),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const fetchAccommodation = yield request.get("/accommodation");
            const id = fetchAccommodation.body[0]._id.toString();
            console.log(id);
            console.log(fetchAccommodation.body);
            const response = yield request.get(`/accommodation/${id}`);
            expect(response.status).toBe(201);
        });
    //accom Id does not exist 
    it("should check that the  GET /accommodation/:id endpoint returns 404 when accommodation doesn't exist"),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const fetchAccommodation = yield request.get("/accommodation");
            console.log(fetchAccommodation.body);
            const response = yield request.get(`/accommodation/111`);
            expect(response.status).toBe(404);
        });
    const editName = {
        name: "Broken Accommodation"
    };
    //PUT /accommodation/:id - VALID ID
    it("should test that the PUT /accommodation/:id endpoint edits an existing accommodation "),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const createAccommodation = yield request.post("/accommodation").send(validAccommodation);
            const id = createAccommodation.body[0]._id;
            const response = yield request.put(`/accommodation/${id}`).send(editName);
            console.log(response);
            const checkAccommodationChange = yield request.get(`/accommodation/${id}`);
            expect(response.status).toBe(201);
            expect(typeof checkAccommodationChange.body.name).toBe("string");
            expect(checkAccommodationChange.body.name).toBe("Broken Accommodation");
        });
    //PUT /accommodation/:id - INVALID ID
    it("should test that the PUT /accommodation/:id endpoint returns 404 if the accommodation does not exist "),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.put(`/accommodation/111`).send(editName);
            console.log(response);
            expect(response.status).toBe(404);
        });
    //GET /destinations
    it("should test that the GET /destinations endpoint returns a list of all available locations where there is an accommodation "),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/destinations");
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });
    //GET/destinations/:city
    it("should test that the GET /destinations/:city endpoint retrieves a list of accommodations for a specific city "),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.get("/destination/new york");
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThan(0);
        });
    // DELETE /accommodation/:id
    // # will delete an existing accommodation
    // # 204 ok
    it("should test that the DELETE /accommodation/:id endpoint returns 204 if ok"),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.delete(`/accomodation/${_id}`);
            expect(response.status).toBe(204);
            const deleteAcommodationResponse = yield request.get(`/accomodation/${_id}`);
            expect(deleteAcommodationResponse.status).toBe(404);
        });
    // # 404 if not existing
    it("should check that the DELETE /accomodation/:id returns a 404 without a valid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete(`/accomodation/111988899999999944499999`);
        expect(response.status).toBe(404);
    }));
    //----------------EXTRA---------------
    //POST /destinations - valid
    it("Should add a new destination to be chosen as a location for POSTing your hotel returns 204"),
        () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield request.post("/destinations").send(testDestination);
            const checkDestinations = yield request.get("/destinations");
            expect(response.status).toBe(204);
            expect(checkDestinations.body.length).toBeGreaterThan(0);
        });
    //POST /destinations - invalid data
    it("Should try add a new destination returns 400 if invalid data "),
        () => __awaiter(void 0, void 0, void 0, function* () {
            expect(status).toBe(204);
        });
    afterAll((done) => {
        mongoose_1.default.connection
            .dropDatabase()
            .then(() => {
            return mongoose_1.default.connection.close();
        })
            .then(() => {
            done();
        });
    });
});
/*An Accommodation entry has a name, a short description, a maxGuests number, and is located in a city.

 
Endpoints
GET /accommodation

# will return the full list of accommodation


POST /accommodation

# will add a new accommodation

# 400 if invalid data


GET /accommodation/:id

# returns an existing accommodation
# 404 if not existing


PUT /accommodation/:id

# will edit an existing accommodation
# 204 ok
# 404 if not existing

DELETE /accommodation/:id

# will delete an existing accommodation
#204 if ok
#404 if not existing


GET /destinations

# will return the list of all available locations where there is an accommodation; i.e. the list of cities, without duplicates
GET /destinations/:city

will return the list of accommodations for a specific city
Extra

Cities are now supposed to be added by request.

 

POST /destinations

# will add a new destination to be chosen as a location for POSTing your hotel
# 400 if invalid data
Mind that now POST /accommodation must reference the city by ID
GET /destinations/:city now becomes GET /destinations/:id i.e. cities are not identified anymore by their own string (like Paris) but by an ObjectID
As an extra, if you finish earlier, deploy your app to Heroku using a CI pipeline, making sure the tests are passing. */
