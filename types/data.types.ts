export interface TypeQuestionBox {
  QID: number;
  questionBy: TypeQuestionBy[];
  subject: string;
  ministry: string;
  date: string;
  type: string;
}
export interface TypeTermGeography {
  geography: {
    GID: number;
    name: string;
    state: string;
    parent: {
      name: string;
    };
  };
}
export interface TypeMemberTerms {
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

export interface TypePartyMembe {
  MID: number;
  name: string;
  terms: TypeTermGeography[];
}
export interface TypeGeographyMember {
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

export interface TypeQuestionBy {
  MID: number;
  name: string;
}

export interface TypeMemberData {
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
  terms?: TypeMemberTerms[];
  popularQuestionIds?: number[];
}

export interface TypeQuestionData {
  QID: number;
  subject: string;
  type: string;
  question: string;
  questionBy: TypeQuestionBy[];
  answer: string;
  ministry: string;
  date: string;
}

export interface TypePartyData {
  PID: number;
  name: string;
  abbr: string;
  total: number;
  members: TypePartyMembe[];
}

export interface TypeGeographyData {
  GID: number;
  name: string;
  parent: {
    name: string;
  };
  from?: string;
  to?: string;
  popularQuestionIds?: number[];
  members: TypeGeographyMember[];
}

export interface TypeMemberObject {
  [index: number]: TypeMemberData;
}

export interface TypeGeographyObject {
  [index: number]: TypeGeographyData;
}

export interface TypeQuestionObject {
  [index: number]: TypeQuestionData;
}

export interface TypePartyObject {
  [index: number]: TypePartyData;
}
