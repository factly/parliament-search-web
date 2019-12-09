export interface typeQuestionBox{
    QID : number, 
    questionBy : typeQuestionBy[], 
    subject : string ,
    ministry : string, 
    date :  string,
    type : string
}
export interface typeTermConstituency{
    constituency : {
        CID : number,
        name : string
    }
}
export interface typeMemberTerms{
    constituency : {
        CID : number,
        name : string,
        from? : string,
        to? : string
    },
    party : {
        PID : number,
        name : string
    }, 
    house: string
    session: number
};

export interface typePartyMember{
    MID : number,
    name : string,
    terms : typeTermConstituency[]
}
export interface typeConstituencyMember{
    MID : number,
    name : string,
    terms : {
        party : {
            PID : number,
            name : string
        }
        session : number
    }[]
}

export interface typeQuestionBy{
    MID : number,
    name : string
}

export interface typeMemberData {
    MID: number,
    name: string, 
    gender: string,
    dob? : string,
    marital_status?: string,
    sons?: number,
    daughters?: number,
    email?: string[],
    phone?: string[],
    education?: string,
    expertise?: string[],
    profession?: string[],
    terms?: typeMemberTerms[],
    popularQuestionIds? : number[]
};

export interface typeQuestionData{
    QID: number,
    subject: string,
    type: string,
    question: string,
    questionBy: typeQuestionBy[],
    answer: string,
    ministry: string,
    date: string
};

export interface typePartyData {
    PID : number,
    name : string,
    abbr : string,
    members : typePartyMember[]
};

export interface typeConstituencyData {
    CID : number,
    name : string,
    state : string,
    from? : string,
    to? : string,
    popularQuestionIds? : number[],
    members : typeConstituencyMember
}

export interface typeMemberObject {
    [index : number] : typeMemberData
}

export interface typeConstituencyObject {
    [index : number] : typeConstituencyData
}

export interface typeQuestionObject {
    [index : number] : typeQuestionData
};

export interface typePartyObject {
    [index : number] : typePartyData
}
