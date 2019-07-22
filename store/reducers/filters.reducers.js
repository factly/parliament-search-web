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

export function filters(state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}