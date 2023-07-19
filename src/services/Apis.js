import { commonrequest } from "./ApiCall";
import {BACKEND_URL} from "./helper";
let token = localStorage.getItem("userdbtoken");


export const registerfunction = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/login`,data)
}

export const userdata = async(data)=>{
    return await commonrequest("GET",`${BACKEND_URL}/admin/userlist`,data,token)
}

export const block = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/blockuser`,data,token)
}

export const category = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/packagecategory`,data,token)
}

export const categorylist=async(data)=>{
    return await commonrequest("GET",`${BACKEND_URL}/admin/categorylist`,data,token)
}

export const addPackageItem = async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/addpackageitem`,data,token)
}
export const deletecategory = async(data)=>{
    return await commonrequest("DELETE",`${BACKEND_URL}/admin/deletecategory`,data,token) 
}

export const Packagelist = async(data)=>{
    return await commonrequest("GET",`${BACKEND_URL}/admin/getpackagelist`,data,token) 
}

export const deletePackage = async(data)=>{
    return await commonrequest("DELETE",`${BACKEND_URL}/admin/deletepackage`,data,token) 
}

export const getcustomecategory = async(data)=>{
return await commonrequest("GET",`${BACKEND_URL}/admin/customecategory`,data,token) 
}

export const addCustomeItem=async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/addcustomeitem`,data,token) 
}

export const getCustomData=async(data)=>{
return await commonrequest("GET",`${BACKEND_URL}/admin/customlist`,data,token) 
}

export const EditcustomeItems= async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/editcustomlist`,data,token) 
}

export const EditcustomeList= async(data)=>{
    return await commonrequest("PUT",`${BACKEND_URL}/admin/editcustomItem`,data,token) 
}

export const getPackagesItems= async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/getpackageitems`,data,token) 
}

export const EditPackage=async(data)=>{
    return await commonrequest("PUT",`${BACKEND_URL}/admin/Editpackage`,data,token) 
}

export const deleteCustomeitem=async(data)=>{
return await commonrequest("DELETE",`${BACKEND_URL}/admin/deleteCustomitem`,data,token) 
}

export const orderlist=async(data)=>{
    return await commonrequest("GET",`${BACKEND_URL}/admin/orderlist`,data,token) 
}

export const orderedviews=async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/orderitemviews`,data,token)   
}
export const changeorderstatus=async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/changeorderstatus`,data,token)   
}

export const getpackagecategory=async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/getcategorypackage`,data,token)   
}
export const Editcategory=async(data)=>{
    return await commonrequest("PUT",`${BACKEND_URL}/admin/editcategorypackage`,data,token)   
}

export const GetUserDetails=async(data)=>{
    return await commonrequest("POST",`${BACKEND_URL}/admin/getuserdetails`,data,token)
}