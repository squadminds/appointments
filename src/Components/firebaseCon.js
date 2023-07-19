import React,{useState,useEffect} from 'react'
import { collection, add,addDoc,getDocs,doc,setDoc,getDoc,where} from "firebase/firestore";
import { db } from '../firebase/firebase';
import {signInWithEmailAndPassword,getAuth} from "firebase/auth";
import {users} from "./Data"

import  data from "./contents/CountryCodes.json"

function Todo() {
//     const [todo, setTodo] = useState("")
   
//     const [todos, setTodos] = useState([]);
 
//     const fetchPost = async () => {
       
//         await getDocs(collection(db, "countrylist"))
//             .then((querySnapshot)=>{               
//                 const newData = querySnapshot.docs
//                     .map((doc) => {return doc.data() })
//                if(newData[0].country){
//                 for (const product of newData[0].country) {
//                     if (product.hasOwnProperty("name") && product["name"]==="India") {
//                      console.log("true",)
//                     }
//             }}})
               
                
               
                     
  
       

//     }
    

//    const addDocument=async()=>{
//     try{
//   const result=await getDoc(doc(db,"healthcare","specalists"))
//   if(result.exists){
//     const data =result.data().users;
 
//   }
     
// }catch(e){
//     console.log("object",e)
// }
//    }

//    const auth=getAuth()
 
    const addTodo = async () => {
       try{
data.forEach((val)=>{
  addDoc(collection(db,"countries"),{...val}).then((docRef)=>{
 console.log('Document written with ID: ', docRef.id)  }
)})
       }catch(e){
console.log("object",e)
       }







//       const snapshotRef= await getDocs(collection(db,"healthcare"))



//    if(!snapshotRef.empty){
//                     snapshotRef.docs.map((doc) => (console.log({
//                         id: doc.id,
//                         data: doc.data(),
//                     })))
               
//    }
            
//               } catch (error) {
//                 console.error('Error fetching document:', error);
//               }
        
    }
//     useEffect(()=>{
//         const email="panwarakhil1811@gmail.com";
//         const password="Akhil@1811";
//         signInWithEmailAndPassword(auth, email, password)
//           .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             // ...

// console.log("object")
//           })
//           .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             console.log("error succesfull",errorCode,errorMessage)
//           });
//         })
//         useEffect(()=>{
//             fetchPost();
//         }, [])
    return (
        <section className="todo-container">
            <div className="todo">
                <h1 className="header">
                    Todo-App
                </h1>
   
                <div>
   
                    <div>
                        <input
                            type="text"
                            placeholder="What do you have to do today?"
                            onChange={""}
                        />
                    </div>
   
                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={(e)=>addTodo()}
                        >
                            Submit
                        </button>
                    </div>
   
                </div>
   
                <div className="todo-content">
                    ...
                </div>
            </div>
        </section>
    )
}

export default Todo
