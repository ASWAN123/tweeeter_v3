import { NextRequest, NextResponse } from 'next/server';
import { hash} from "bcrypt" ;
import { db } from '@/app/lib/db';


export async function POST(req : NextRequest , res : NextResponse) {
  let body  = await  req.json()
  let { email  ,  username   , password   } = body

  // check if email already exist
  let checkEmailExist = await  db.user.findUnique({
    where : { email  : email }
  })

  if(checkEmailExist){
    return NextResponse.json(  {"error" : 'Email already used'  } ,  {status:400} )
  }

  // check if  username  already  exist
  let checkUsernameExist = await  db.user.findUnique({
    where : { username  : username }
  })

  if(checkUsernameExist){
    return NextResponse.json(  {"error" : 'username already used'  } ,  {status:400} )
  } 


  // encoding  password  
  let  hashPassword  = await  hash(password ,  10)

  /// you are  here  keep moving  from this  point 
  try {
    
    let addNewUser = await  db.user.create({
      data : {...body , password: hashPassword ,  "bio": "" ,  "avatar" : ""}
    })
    return NextResponse.json(  {"user" : addNewUser  } ,  {status:201} )
    console.log(addNewUser)
    
  } catch (error) {
    console.error(error)
     return NextResponse.json(  {"Error" : 'Internal Serverorororor Erorr' } ,  {status:500} )
  }

  


}