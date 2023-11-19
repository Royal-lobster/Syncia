/**
 * The list of PII Redaction policies to enable.
 * See [PII redaction]{@link https://www.assemblyai.com/docs/Models/pii_redaction} for more details.
 */
export const PiiPolicy = {
    /**
     * Medical process, including treatments, procedures, and tests (e.g., heart surgery, CT scan)
     */
    MedicalProcess: "medical_process",
    /**
     * Name of a medical condition, disease, syndrome, deficit, or disorder (e.g., chronic fatigue syndrome, arrhythmia, depression)
     */
    MedicalCondition: "medical_condition",
    /**
     * Blood type (e.g., O-, AB positive)
     */
    BloodType: "blood_type",
    /**
     * Medications, vitamins, or supplements (e.g., Advil, Acetaminophen, Panadol)
     */
    Drug: "drug",
    /**
     * Bodily injury (e.g., I broke my arm, I have a sprained wrist)
     */
    Injury: "injury",
    /**
     * A "lazy" rule that will redact any sequence of numbers equal to or greater than 2
     */
    NumberSequence: "number_sequence",
    /**
     * Email address (e.g., support@assemblyai.com)
     */
    EmailAddress: "email_address",
    /**
     * Date of Birth (e.g., Date of Birth: March 7,1961)
     */
    DateOfBirth: "date_of_birth",
    /**
     * Telephone or fax number
     */
    PhoneNumber: "phone_number",
    /**
     * Social Security Number or equivalent
     */
    UsSocialSecurityNumber: "us_social_security_number",
    /**
     * Credit card number
     */
    CreditCardNumber: "credit_card_number",
    /**
     * Expiration date of a credit card
     */
    CreditCardExpiration: "credit_card_expiration",
    /**
     * Credit card verification code (e.g., CVV: 080)
     */
    CreditCardCvv: "credit_card_cvv",
    /**
     * Specific calendar date (e.g., December 18)
     */
    Date: "date",
    /**
     * Terms indicating nationality, ethnicity, or race (e.g., American, Asian, Caucasian)
     */
    Nationality: "nationality",
    /**
     * Name of an event or holiday (e.g., Olympics, Yom Kippur)
     */
    Event: "event",
    /**
     * Name of a natural language (e.g., Spanish, French)
     */
    Language: "language",
    /**
     * Any Location reference including mailing address, postal code, city, state, province, or country
     */
    Location: "location",
    /**
     * Name and/or amount of currency (e.g., 15 pesos, $94.50)
     */
    MoneyAmount: "money_amount",
    /**
     * Name of a person (e.g., Bob, Doug Jones)
     */
    PersonName: "person_name",
    /**
     * Number associated with an age (e.g., 27, 75)
     */
    PersonAge: "person_age",
    /**
     * Name of an organization (e.g., CNN, McDonalds, University of Alaska)
     */
    Organization: "organization",
    /**
     * Terms referring to a political party, movement, or ideology (e.g., Republican, Liberal)
     */
    PoliticalAffiliation: "political_affiliation",
    /**
     * Job title or profession (e.g., professor, actors, engineer, CPA)
     */
    Occupation: "occupation",
    /**
     * Terms indicating religious affiliation (e.g., Hindu, Catholic)
     */
    Religion: "religion",
    /**
     * Driver’s license number (e.g., DL# 356933-540)
     */
    DriversLicense: "drivers_license",
    /**
     * Banking information, including account and routing numbers
     */
    BankingInformation: "banking_information",
};
export const EntityType = {
    BloodType: "Blood type (e.g., O-, AB positive)",
    CreditCardCvv: "Credit card verification code (e.g., CVV: 080)",
    CreditCardExpiration: "Expiration date of a credit card",
    CreditCardNumber: "Credit card number",
    Date: "Specific calendar date (e.g., December 18)",
    DateOfBirth: "Date of Birth (e.g., Date of Birth: March 7, 1961)",
    Drug: "Medications, vitamins, or supplements (e.g., Advil, Acetaminophen, Panadol)",
    Event: "Name of an event or holiday (e.g., Olympics, Yom Kippur)",
    EmailAddress: "Email address (e.g., support@assemblyai.com)",
    Injury: "Bodily injury (e.g., I broke my arm, I have a sprained wrist)",
    Language: "Name of a natural language (e.g., Spanish, French)",
    Location: "Any location reference including mailing address, postal code, city, state, province, or country",
    MedicalCondition: "Name of a medical condition, disease, syndrome, deficit, or disorder (e.g., chronic fatigue syndrome, arrhythmia, depression)",
    MedicalProcess: "Medical process, including treatments, procedures, and tests (e.g., heart surgery, CT scan)",
    MoneyAmount: "Name and/or amount of currency (e.g., 15 pesos, $94.50)",
    Nationality: "Terms indicating nationality, ethnicity, or race (e.g., American, Asian, Caucasian)",
    Occupation: "Job title or profession (e.g., professor, actors, engineer, CPA)",
    Organization: "Name of an organization (e.g., CNN, McDonalds, University of Alaska)",
    PersonAge: "Number associated with an age (e.g., 27, 75)",
    PersonName: "Name of a person (e.g., Bob, Doug Jones)",
    PhoneNumber: "Telephone or fax number",
    PoliticalAffiliation: "Terms referring to a political party, movement, or ideology (e.g., Republican, Liberal)",
    Religion: "Terms indicating religious affiliation (e.g., Hindu, Catholic)",
    UsSocialSecurityNumber: "Social Security Number or equivalent",
    DriversLicense: "Driver's license number (e.g., DL #356933-540)",
    BankingInformation: "Banking information, including account and routing numbers",
};
/**
 * The format of the subtitles.
 */
export const SubtitleFormat = {
    Srt: "srt",
    Vtt: "vtt",
};
