
export const SUCCESS_MESSAGE = "SUCESS";
export const REQUIRED_MESSAGE = "FULFILL REQUIRED FIELDS!";

export const UNKNOWN_MESSAGE = "FAILURE IS UNKNOWN!";

export const NOTIFICATION_IMAGE: NotificationClass[] =[
  {
    type:"SUCCESS_MESSAGE",
    message:"SUCESS",
    icon:"https://cdn1.iconfinder.com/data/icons/color-bold-style/21/34-512.png"
  },
  {
    type:"REQUIRED_MESSAGE",
    message:"FULFILL REQUIRED FIELDS!",
    icon:"https://cdn1.iconfinder.com/data/icons/sales-and-shopping/32/exclamation_mark_point_web_ecommerce-1024.png"
  },
  {
    type:"UNKNOWN_MESSAGE",
    message:"FAILURE IS UNKNOWN!",
    icon:"https://cdn1.iconfinder.com/data/icons/warnings-and-dangers/400/Warning-14-512.png"
  }

];

interface NotificationClass {
  type: string;
  message: string;
  icon:string
}
