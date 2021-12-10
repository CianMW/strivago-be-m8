import supertest from "supertest";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { server } from "../server";
import { IAccommodation } from "../interfaces/IAccommodation";
import {IDestination} from "../interfaces/IDestination"

dotenv.config();

const request = supertest(server);


const validAccommodation : IAccommodation = {
    name: "The grand hotel",
    city: "New York" 
}

const testDestination: IDestination = {
    name: "London"
}

let _id: string| null = null

describe("Testing server", () => {
  beforeAll((done) => {
    // Starting the http server
    server.listen(process.env.PORT, () => {
      if (!process.env.MONGO_DB_TEST_URL) {
        throw new Error("MONGO_URL_TEST is not defined");
      }
    });
  });


 // POST /accommodation = Creat a new accomodation entry
  it(
    "should check that the POST /accommodation endpoint creates and returns a new post "
  ,
    async () => {
        const response = await request.post("/accommodation").send(validAccommodation);

        expect(response.status).toBe(201)
        expect(response.body._id).toBeDefined()
        expect(response.body.name).toBeDefined()
        expect(response.body.city).toBeDefined()

        _id = response.body._id
    });
    // POST /accommodation - INVALID DATA
  it(
    "should check that the POST /accommodation endpoint returns 400 if data is incorrect"
  ,
    async () => {
        const response = await request.post("/accommodation").send({name:"string"});

        expect(response.status).toBe(400)

    });


  //GET ALL TEST
  it("should return the full list of accommodation ", async () => {
    const response = await request.get("/accommodation");
    expect(response.status).toBe(200)
    expect(response.body.length).toBeGreaterThan(0)

  });

  // GET /accommodation/:id
  it(
    "should check that the  GET /accommodation/:id endpoint returns a single accommodation by id"
  ,
    async () => {
        const fetchAccommodation = await request.get("/accommodation");
        const id = fetchAccommodation.body[0]._id.toString()
        console.log(id)
        console.log(fetchAccommodation.body)
        const response = await request.get(`/accommodation/${id}`)
        expect(response.status).toBe(201)
    });

    //accom Id does not exist 
  it(
    "should check that the  GET /accommodation/:id endpoint returns 404 when accommodation doesn't exist"
  ,
    async () => {
        const fetchAccommodation = await request.get("/accommodation");
        console.log(fetchAccommodation.body)
        const response = await request.get(`/accommodation/111`)
        expect(response.status).toBe(404)

    });
    
    const editName = {
        name: "Broken Accommodation"
    }


  //PUT /accommodation/:id - VALID ID
  it(
    "should test that the PUT /accommodation/:id endpoint edits an existing accommodation "
  ,
    async () => {
        const createAccommodation = await request.post("/accommodation").send(validAccommodation)
        const id = createAccommodation.body[0]._id
        const response = await request.put(`/accommodation/${id}`).send(editName)

        console.log(response)
        
        const checkAccommodationChange = await request.get(`/accommodation/${id}`)

        expect(response.status).toBe(201);
        expect(typeof checkAccommodationChange.body.name).toBe("string");
        expect(checkAccommodationChange.body.name).toBe("Broken Accommodation");        
        

    });

    //PUT /accommodation/:id - INVALID ID
  it(
    "should test that the PUT /accommodation/:id endpoint returns 404 if the accommodation does not exist "
  ,
    async () => {
        const response = await request.put(`/accommodation/111`).send(editName)
        console.log(response)
  
          expect(response.status).toBe(404);

    });





    //GET /destinations
  it(
    "should test that the GET /destinations endpoint returns a list of all available locations where there is an accommodation "
  ,
    async () => {
        const response = await request.get("/destinations")
        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    });

//GET/destinations/:city
it(
    "should test that the GET /destinations/:city endpoint retrieves a list of accommodations for a specific city "
  ,
    async () => {
        const response = await request.get("/destination/new york")

        expect(response.status).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    });

// DELETE /accommodation/:id

// # will delete an existing accommodation

// # 204 ok
        it( "should test that the DELETE /accommodation/:id endpoint returns 204 if ok",
        async () => { 
        const response = await request.delete(`/accomodation/${_id}`);
        expect(response.status).toBe(204);
        
        const deleteAcommodationResponse = await request.get(`/accomodation/${_id}`);
        expect(deleteAcommodationResponse.status).toBe(404);
    });
    
    // # 404 if not existing
it("should check that the DELETE /accomodation/:id returns a 404 without a valid id", async () => {
        const response = await request.delete(`/accomodation/111988899999999944499999`);

        expect(response.status).toBe(404);
    })
    


//----------------EXTRA---------------
    //POST /destinations - valid
it( "Should add a new destination to be chosen as a location for POSTing your hotel returns 204" ,
    async () => { 
        const response = await request.post("/destinations").send(testDestination)
        const checkDestinations = await request.get("/destinations")
        expect(response.status).toBe(204)  
        expect(checkDestinations.body.length).toBeGreaterThan(0)  
    });

    //POST /destinations - invalid data
it( "Should try add a new destination returns 400 if invalid data ",
    async () => { 
        expect(status).toBe(204)  
    });

  afterAll((done) => {
    mongoose.connection
      .dropDatabase()
      .then(() => {
        return mongoose.connection.close();
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
