/// <reference types="cypress" />

import { internet, lorem, name, phone } from "community-faker";
const firstName = name.firstName();
const lastName = name.lastName();
const exampleEmail = internet.exampleEmail();
const phoneNumber = phone.phoneNumber();
const subject = lorem.sentence();
const description = lorem.paragraph();

describe("Can submit message", () => {
    it("Fills in and submits message", () => {
        cy.visit("/");

        cy.get("#name").type(firstName + " " + lastName);
        cy.get("#email").type(exampleEmail);
        cy.get("#phone").type(phoneNumber);
        cy.get("#subject").type(subject);
        cy.get("#description").type(description);
        cy.get("#submitContact").click();
        cy.get('div > [style="font-weight: bold;"]').should(
            "have.text",
            subject
        );
    });

    it("Displays stubbed response", () => {
        cy.intercept("POST", "https://automationintesting.online/#/message/", {
            fixture: "message_payload.json",
        }).as("postMessage");

        cy.visit("/");

        cy.wait("@postMessage").then((interception) => {
            cy.get("#submitContact").click();
        });
    });
});
