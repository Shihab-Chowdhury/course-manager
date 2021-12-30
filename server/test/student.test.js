import { expect } from "chai";
import request from "supertest";
// import { seedtudents } from "../../server/src/seed/student.seed.js";
import {app} from "../app.js";
import { closeMockConnection, connectToMockMongoDB } from "./dbcon.test.js";


describe("Student: /api/student", () => {
    const prefix = '/api/student';
    before(async (done) => {
        try {
            // console.log(app._router);
            connectToMockMongoDB();
            // seed database
            //  seedtudents();
            done();
        } catch (error) {
            done(error);
        }
    });

    after((done) => {
        try {
            closeMockConnection();
            done();

        } catch (error) {
            done(error);
        }

    });
    describe("Create Student: /api/student", () => {
    it('Create new Student', (done) => {
        request(app)
            .post(`${prefix}/create`)
            .type('json')
            .send({
                "name": "Sanjana kabir",
                "dob": "1996-07-11",
                "gender": "Female",
                "phone": "01433442666",
                "department": "EEE",
                "courses": [

        {"name": "Analytic and Vector Geometry",
         "code": "MAT122",
         "department": "Mathematics and Natural Sciences",
         "faculty": "Khosh Mohammad"
        },

        {"name": "Basic",
         "code": "CSE110",
         "department": "Computer Science",
         "faculty": "Martin Luther King"
         }
         
    ]
            }).then((res) => {
               
                expect(res.status).to.eq(201);
                
                done();


            }).catch((error) => done(error));
    });
});

    describe('Get Students: GET /search  /search:id', () => {
        it('can get all students', (done) => {
            request(app)
                .get(`${prefix}/search`)
                .type('json')
                .then((res) => {
                    expect(res.status).to.eq(200);
                    //   console.log(res);

                    done();
                }).catch((error) => {
                    done(error)
                });
        });
        it('can get student by id ', (done) => {
            request(app)
                .get(`${prefix}/search/61cd5d452699aec9985669c8`)
                .type('json')
                .then((res) => {
                    expect(res.status).to.eq(200);
                    //    console.log(res);

                    done();
                }).catch((error) => {
                    done(error)
                });
        });

        
    
    });
    describe('Add Courses to student by id', () => {
        it('Add courses', (done) => {
            request(app)
                .get(`${prefix}/addCourses/61cd5d452699aec9985669c8`)
                .type('json')
                .send({
                    "courses": [

                        {
                         "name": "C Programming Language",
                         "code": "CSE100",
                         "department": "Computer Science and Engineering",
                         "faculty": "Elon Musk"
                        }
                    
                    ]
                })
                .then((res) => {
                    expect(res.status).to.eq(404);
                    //    console.log(res);

                    done();
                }).catch((error) => {
                    done(error)
                });
        });

    });


});