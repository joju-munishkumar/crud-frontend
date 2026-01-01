import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'
import {toast} from 'react-toastify'


const CRUD = () => {
  let [count, setCount] = useState(0)

    // STATES create user form 
    let [userData,setuserData]= useState({
        name :'',
        email : '',
        password : ''
    })

    //update form state
    let [newData,setnewData]= useState({
        name :'',
        email : '',
        password : ''
    })



    // DATA FETCH AND SEND TO UPDATE FORM STATE 
    let [updateData,setupdateData]= useState({})

    // SHOW DATA IN TABLE STATE 
    let [showData , setShowData] =  useState([])



// Data Create Handler 
 let submitHandle = async (e)=>{
    e.preventDefault()
    console.log(userData)
try{
        const api =await axios.post("http://localhost:4000/create",userData)
        console.log(api)
        toast.success("successfully created")
       console.log(api.data)
            setTimeout(() => {
                setuserData({name:'',email:'',password:''})
                showHandler()
            }, 1000);
        
}catch(err){
        console.log(err,"catch is running")
        toast.error(err.response.data.message)
        
    }
    }


    //Show Data Handler 
let showHandler = async ()=>{
  let data =await axios.get("http://localhost:4000/showusers")
//   console.log(data.data)
  setShowData(data.data)
 
  
}

// DELETE DATA HANDLER 
let deleteHandler = async (id)=>{
   let ID = id 
   
    try{

            let data = await axios.delete(`http://localhost:4000/deleteusers/${ID}`)
            console.log(data.data.message)

            showHandler()
            

    
    }catch(err){

        console.log("error in deletehandler function api")
    }

}


//UPDATE HANDLER
// Update Data Fetch Hanlder 
let updateFetch = async (e)=>{
    setupdateData(e)
    let {name , email, password} = e
    setnewData({name:name, email:email, password:password})
    console.log(newData, "new data ")
    console.log(updateData)
}



let updateHandler = async (e) => {
    e.preventDefault(); // Form ko reload hone se rokein

    // 1. Check karein ki koi user ID selected hai bhi ya nahin
    if (!updateData._id) {
        console.log("No user selected to update.");
        alert("Pehle table se ek user select karein.");
        return; 
    }

    try {
        // 2. 'http' (na ki https) aur 'updateData._id' (na ki e._id) ka istemaal karein
        const api = await axios.put(
            `http://localhost:4000/update/${updateData._id}`, // YEH FIX HAI
            newData // Yeh aapke form ka data hai (jo sahi hai)
        );

        console.log(api.data.message || "User updated successfully!");

        // 3. Success ke baad, table ko refresh karein aur form clear karein
        showHandler();
        setnewData({ name: '', email: '', password: '' });
        setupdateData({}); // Selected user ko bhi clear kar dein

    } catch (err) {
        // Error ko a_chhe se handle karein
        console.log("Error in updateHandler:", err.response?.data?.message || err.message);
    }
}

useEffect(()=>{
    showHandler()
},[])


   
return (
    
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen font-sans">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-8 border-b-2 pb-4">
        User Management (Static Layout)
      </h1>
      <button onClick={showHandler}>Show users</button>

     
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* LEFT FORM  */}
        <div className="md:col-span-1 p-6 bg-white shadow-md rounded-lg border-l-4 border-green-500 h-fit">
          <h2 className="text-xl font-semibold mb-5 text-green-700">
            ➕ Create User
          </h2>
          

          {/* FORM STARTS FROM HERE  */}
          <form className="space-y-3" onSubmit={submitHandle}>
            <input
              type="text"
              placeholder="Name"
              name='name'
              onChange={(e)=>setuserData({...userData,name:e.target.value})}
              value={userData.name}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
            />
            
            <input
              type="email"
              name='email'
              placeholder="Email"
              onChange={(e)=>setuserData({...userData, email:e.target.value})}
              value={userData.email}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"/>
            


            <input
              type="password"
              name='password'
              placeholder="Password"
              onChange={(e)=>setuserData({...userData, password:e.target.value})}
              value={userData.password}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-green-500 focus:border-green-500"
            />
           
            
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
            >
              Create
            </button>
          </form>
        </div>




{/* ALL USERS DETAILS SHOW HERE  */}

        {/* CENTER TABLE  */}
        <div className="md:col-span-2 p-6 bg-white shadow-md rounded-lg overflow-x-auto border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-5 text-blue-700">
            📋 User List
          </h2>
          
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-500 text-white">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">Sr.no</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">Name</th>
                <th className="px-4 py-2 text-left text-xs font-medium uppercase">Email</th>
                <th className="px-4 py-2 text-center text-xs font-medium uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {/* Dummy Row 1 */}
           
    {
  showData.length > 0 ? (
    
    showData.map((item, idx) => (
      <tr key={item._id}>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{idx+1}</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-800">{item.name}hey</td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{item.email}hy</td>
        <td className="px-4 py-3 whitespace-nowrap text-center text-sm space-x-2">
          <button className="text-yellow-600 hover:text-yellow-800 bg-yellow-100 px-2 py-1 rounded"
           onClick={() => updateFetch(item)}
          >
            Update
          </button>
          <button 
            className="text-red-600 hover:text-red-800 bg-red-100 px-2 py-1 rounded" 
            onClick={() => deleteHandler(item._id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  ) : (
   
    <tr>
      <td colSpan="3" className="text-center py-4 text-gray-500">
        No Data Yet
      </td>
    </tr>
  )
}
              {/* ... Aur rows yahan aayenge (logic se) ... */}
            </tbody>
          </table>
          <p className="mt-4 text-sm text-gray-400">
            *Table rows will be generated using map/logic.
          </p>
        </div>






        {/* RIGHT FROM  */}
        <div className="md:col-span-1 p-6 bg-white shadow-md rounded-lg border-l-4 border-yellow-500 h-fit">
          <h2 className="text-xl font-semibold mb-5 text-yellow-700">
            📝 Update User
          </h2>
          
          <form className="space-y-3" onSubmit={updateHandler}>
            <p className="text-sm text-gray-500 italic mb-3">
                (Select user to edit)
            </p>
            <input
              type="text"
              placeholder="Name (Selected)"
              value={newData.name} // Static placeholder value
              onChange={(e)=>setnewData({...newData,name:e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
            />
            <input
              type="email"
              placeholder="Email (Selected)"
              value={newData.email} // Static placeholder value
              onChange={(e)=>setnewData({...newData,email:e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-yellow-500 focus:border-yellow-500 bg-yellow-50"
            />
            <input
              type="password"
              placeholder="New Password (Optional)"
              value={newData.password}
              onChange={(e)=>setnewData({...newData,password:e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-yellow-500 focus:border-yellow-500"
            />
            
            <button
              type="submit"
              className="w-full py-2 bg-yellow-600 text-white font-medium rounded hover:bg-yellow-700 transition"
              
            >
              Save Changes
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}



export default CRUD
