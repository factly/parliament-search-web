export interface marks{
    value : number,
    label : string
  }
export interface typeMarks {
    marksAge : marks[],
    marksTerm : marks[]
}
export type typeSelected = {
    [key: string]: any ;
}
export type typeFilter= {
    [key: string]: any ;
}
export interface typeQuery {
    q: any;
    states: any;
    education: any;
    parties: any;
    marital: any;
    age: any;
    sort: any;
    terms: any;
    type : any;
    gender : any;
    } 
export interface typeState {
    q: string;
    states: number[] ;
    education: number[];
    parties: number[];
    marital: number[];
    age: number[];
    sort: string;
    terms: number;
    type : number[];
    gender : number[];
} 
export interface typeQuerySelected {
    q: string | undefined;
    states: string[] | undefined ;
    education: string[] | undefined;
    parties: string[] | undefined;
    marital: string[]| undefined;
    age: number[] | undefined;
    sort: string | undefined;
    terms: number | undefined;
    type : string[] | undefined;
    gender : string[] | undefined;
}