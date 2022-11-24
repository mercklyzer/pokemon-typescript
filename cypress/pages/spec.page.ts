/// <reference types="cypress" />
//@ts-nocheck
//@ts-ignore

class SpecPage {
    elements: {
        date: () => cy.get(':nth-child(6) > :nth-child(1) > #contents > :nth-child(3) > #content > .ytd-rich-item-renderer > #dismissible > #details > #meta > .grid > #metadata > #metadata-line > :nth-child(3)')
    };

    validateDate(){
        this.elements.date().should('exist');
    }
}