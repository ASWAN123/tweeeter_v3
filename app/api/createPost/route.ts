import { NextRequest, NextResponse } from 'next/server';


export async function POST(req : NextRequest , res : NextResponse) {
    const data  = req.json()
    console.log(data) 


}