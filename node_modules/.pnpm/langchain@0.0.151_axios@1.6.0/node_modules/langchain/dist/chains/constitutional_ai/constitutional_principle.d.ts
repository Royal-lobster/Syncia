import { SerializedConstitutionalPrinciple } from "../serde.js";
/**
 * Class representing a constitutional principle with critique request,
 * revision request, and name properties.
 */
export declare class ConstitutionalPrinciple {
    critiqueRequest: string;
    revisionRequest: string;
    name: string;
    constructor({ critiqueRequest, revisionRequest, name, }: {
        critiqueRequest: string;
        revisionRequest: string;
        name?: string;
    });
    serialize(): SerializedConstitutionalPrinciple;
}
export declare const PRINCIPLES: {
    [key: string]: ConstitutionalPrinciple;
};
