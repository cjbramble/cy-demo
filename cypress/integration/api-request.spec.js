/// <reference types="cypress" />

describe("Can interact with API", () => {
    it("GET returns successful status code", () => {
        cy.request("GET", "/").then(({ status }) => {
            expect(status).to.eq(200);
        });
    });

    it("can POST a message", () => {
        cy.request("POST", "/message/", {
            messageid: 2,
            name: "Delia Wehner",
            email: "Barry.Rau@example.com",
            phone: "(206) 725-0396",
            subject: "Saepe sapiente dolor non eius nihil ducimus aut est.",
            description:
                "Consectetur vitae repellendus officia molestiae aut. Voluptatum accusantium praesentium ut. Nisi iure voluptates. Dolor minima corrupti recusandae.",
        })
            .then(({ status }) => {
                expect(status).to.eq(201);
            })
            .then(({ body }) => {
                expect(body.email).to.contain("Barry.Rau@example.com"); // can validate any of the items from the body
            });
    });

    it("can POST with a different format", () => {
        cy.request({
            method: "POST",
            url: "/message/",
            body: {
                messageid: 2,
                name: "Delia Wehner",
                email: "Barry.Rau@example.com",
                phone: "(206) 725-0396",
                subject: "Saepe sapiente dolor non eius nihil ducimus aut est.",
                description:
                    "Consectetur vitae repellendus officia molestiae aut. Voluptatum accusantium praesentium ut. Nisi iure voluptates. Dolor minima corrupti recusandae.",
            },
        })
            .then(({ status }) => {
                expect(status).to.eq(201);
            })
            .then(({ body }) => {
                expect(body).to.have.property("name", "Delia Wehner"); // can validate in different ways
            });
    });

    it("bad requests are not accepted", () => {
        cy.request({
            failOnStatusCode: false, // to validate failtures
            method: "POST",
            url: "/message/",
            body: {
                messageid: 2,
                namer: "Delia Wehner",
                email: "Barry.Rau@example.com",
                phone: "(206) 725-0396",
                subject: "Saepe sapiente dolor non eius nihil ducimus aut est.",
                description:
                    "Consectetur vitae repellendus officia molestiae aut. Voluptatum accusantium praesentium ut. Nisi iure voluptates. Dolor minima corrupti recusandae.",
            },
        })
            .then(({ status }) => {
                expect(status).to.eq(400);
            })
            .then(({ body }) => {
                expect(body).to.have.property("error", "BAD_REQUEST");
            });
    });
});
