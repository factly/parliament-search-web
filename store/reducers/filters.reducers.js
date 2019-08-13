import { filtersConstants } from '../constants';

const initialState = {};
initialState['topics'] = [
  {
    name: "Agriculture",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  },{
    name: "Art & Culture",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  },{
    name: "Commerce",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/banking_0.png?itok=uTYj50ur"
  },{
    name: "Mining",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/industries.png?itok=WgX-EftK"
  },{
    name: "Parliamentary Affairs",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  },{
    name: "Water & Sanitation",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/irregation.png?itok=4qhp3OE3"
  },{
    name: "Information & Communications",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/law-order.png?itok=F0przl3c"
  },{
    name: "Defence",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  },{
    name: "Economy",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/banking_0.png?itok=uTYj50ur"
  },{
    name: "Education & Skilling",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Environment & Forest",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Water Resources",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Finance",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Food",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Foreign Affairs",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Governance & Administration",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Health & Family Welfare",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Home Affairs, Law & Order",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Housing",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  },{
    name: "Industries",
    src: "https://www.data.telangana.gov.in/sites/default/files/styles/topic_icons/public/agriculture.png?itok=ztWqb-2Y"
  
  }
]

initialState['parties'] = [
  {id: 1, name: "BJP"}, 
  {id: 2, name: "INC"}, 
  {id: 3, name: "TMC"}, 
  {id: 4, name: "CPI"},
  {id: 5, name: "CPI(M)"},
  {id: 6, name: "NCP"},
  {id: 7, name: "NPP"},
  {id: 8, name: "AIFB"}, 
  {id: 9, name: "AAP"},
  {id: 10, name: "AIADMK"},
  {id: 11, name: "AIFB"},
  {id: 12, name: "AIMIM"},
  {id: 13, name: "AINRC"},
  {id: 14, name: "AIUDF"},
  {id: 15, name: "AJSU"},
  {id: 16, name: "AGP"},
  {id: 17, name: "BJD"},
  {id: 18,name: "BPF"},
  {id: 19 ,name: "DMDK"},
  {id: 20 ,name: "DMK"},
  {id: 21 ,name: "GFP"},
  {id: 22 ,name: "HSPDP"},
  {id: 23 ,name: "INLD"},
  {id: 24 ,name: "IUML"},
  {id: 25 ,name: "IPFT"},
  {id: 26 ,name: "JKNC"},
  {id: 27 ,name: "JKNPP"},
  {id: 28, name: "JKPDP"},
  {id: 29, name: "JCC"},
  {id: 30, name: "JD(S)"},
  {id: 31, name: "JD(U)"},
  {id: 32, name: "JMM"},
  {id: 33, name: "JVM(P)"},
  {id: 34, name: "KC(M)"},
  {id: 35, name: "LJP"},
  {id: 36, name: "MNS"},
  {id: 37, name: "MGP"},
  {id: 38, name: "MNF"},
  {id: 39, name: "MPC"},
  {id: 40, name: "NPF"},
  {id: 41, name: "NDPP"},
  {id: 42, name: "PMK"},
  {id: 43, name: "PDA"},
  {id: 44, name: "PDF"},
  {id: 45, name: "PPA"},
  {id: 46, name: "RJD"},
  {id: 47, name: "RLD"},
  {id: 48, name: "RLP"},
  {id: 49, name: "RLSP"},
  {id: 50, name: "RSP"},
  {id: 51, name: "SP"},
  {id: 52, name: "SAD"},
  {id: 53, name: "SS"},
  {id: 54, name: "SDF"},
  {id: 55, name: "SKM"},
  {id: 56, name: "TRS"},
  {id: 57, name: "TDP"},
  {id: 58, name: "UDP"},
  {id: 59, name: "YSRCP"},
  {id: 60, name: "ZNP"},
]

initialState['states'] = [ 
  {id: 1, name: "Andhra Pradesh"},
  {id: 2, name: "Arunachal Pradesh"},
  {id: 3, name: "Assam"},
  {id: 4, name: "Bihar"},
  {id: 5, name: "J & K"},
  {id: 6, name: "Chhattisgarh"},
  {id: 7, name: "Goa"},
  {id: 8, name: "Gujarat"},
  {id: 9, name: "Haryana"},
  {id: 10, name: "Himachal Pradesh"},
  {id: 11, name: "Jharkhand"},
  {id: 12, name: "Karnataka"},
  {id: 13, name: "Kerala"},
  {id: 14, name: "Madhya Pradesh"},
  {id: 15, name: "Maharashtra"},
  {id: 16, name: "Manipur"},
  {id: 17, name: "Meghalaya"},
  {id: 18, name: "Mizoram"},
  {id: 19, name: "Nagaland"},
  {id: 20, name: "Odisha"},
  {id: 21, name: "Punjab"},
  {id: 22, name: "Rajasthan"},
  {id: 23, name: "Sikkim"},
  {id: 24, name: "Tamil Nadu"},
  {id: 25, name: "Telangana"},
  {id: 26, name: "Tripura"},
  {id: 27, name: "Uttar Pradesh"},
  {id: 28, name: "Uttarakhand"},
  {id: 29, name: "West Bengal"},
]

initialState['education'] = [
  {id: 1, name: "Under Metric"},
  {id: 2, name: "Matriculate"},
  {id: 3, name: "Inter mediate"},
  {id: 4, name: "Graduation"},
  {id: 5, name: "Post Graduation"},
  {id: 6, name: "Doctrate"},
] 

initialState['genders'] = [
  {id: "all", name: "ALL"}, 
  {id: "male", name: "MALE"}, 
  {id: "female", name: "FEMALE"}
]

initialState['marital'] = [
  {id: 1, name: "Single"},
  {id: 2, name: "Married"},
  {id: 3, name: "Widowed"},
  {id: 4, name: "Divorced"}
]

export function filters(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}