export interface typeQuestionBox {
  QID: number;
  questionBy: typeQuestionBy[];
  subject: string;
  ministry: string;
  date: string;
  type: string;
}
export interface typeTermGeography {
  geography: {
    GID: number;
    name: string;
    state: string;
    parent: {
      name: string;
    };
  };
}
export interface typeMemberTerms {
  geography: {
    GID: number;
    name: string;
    parent: {
      name: string;
    };
  };
  party: {
    PID: number;
    name: string;
    abbr: string;
  };
  house: {
    name: string;
  };
  session: number;
}

export interface typePartyMember {
  MID: number;
  name: string;
  terms: typeTermGeography[];
}
export interface typeGeographyMember {
  MID: number;
  name: string;
  terms: {
    party: {
      PID: number;
      name: string;
      abbr: string;
    };
    session: number;
    house: {
      name: string;
    };
  }[];
}

export interface typeQuestionBy {
  MID: number;
  name: string;
}

export interface typeMemberData {
  MID: number;
  name: string;
  gender: string;
  dob?: string;
  marital_status?: string;
  birth_place?: string;
  sons?: number;
  daughters?: number;
  email?: string[];
  phone?: string[];
  education?: string;
  expertise?: string[];
  profession?: string[];
  terms?: typeMemberTerms[];
  popularQuestionIds?: number[];
}

export interface typeQuestionData {
  QID: number;
  subject: string;
  type: string;
  question: string;
  questionBy: typeQuestionBy[];
  answer: string;
  ministry: string;
  date: string;
}

export interface typePartyData {
  PID: number;
  name: string;
  abbr: string;
  total: number;
  members: typePartyMember[];
}

export interface typeGeographyData {
  GID: number;
  name: string;
  parent: {
    name: string;
  };
  from?: string;
  to?: string;
  popularQuestionIds?: number[];
  members: typeGeographyMember[];
}

export interface typeMemberObject {
  [index: number]: typeMemberData;
}

export interface typeGeographyObject {
  [index: number]: typeGeographyData;
}

export interface typeQuestionObject {
  [index: number]: typeQuestionData;
}

export interface typePartyObject {
  [index: number]: typePartyData;
}
