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
        cy.visit("");
        cy.get("#name").type(firstName + " " + lastName);
        cy.get("#email").type(exampleEmail);
        cy.get("#phone").type(phoneNumber);
        cy.get("#subject").type(subject);
        cy.get("#description").type(description);
    });
});
