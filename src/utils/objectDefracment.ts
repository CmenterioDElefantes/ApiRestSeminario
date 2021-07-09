const v8 = require('v8');

export default function objectDefracment(obj: any): any{
  if(typeof obj !== 'object')
    obj = JSON.parse(obj);
  // if ( Object.keys(obj).length === 0)
  //   return {};
  // var newObj: any = {};
  // for(var i=0 ;i < Object.keys(obj).length; i++){
  //   if((typeof obj[Object.keys(obj)[i]]) === 'object')
  //     newObj[Object.keys(obj)[i]] = objectDefracment(obj[Object.keys(obj)[i]]);
  //   else
  //     newObj[Object.keys(obj)[i]] = obj[Object.keys(obj)[i]];
  // }
  return {... obj};
};