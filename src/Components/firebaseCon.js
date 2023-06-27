import React,{useState,useEffect} from 'react'
import { collection, addDoc,getDocs,doc,setDoc,getDoc} from "firebase/firestore";
import { db } from '../firebase/firebase';
import {signInWithEmailAndPassword,getAuth} from "firebase/auth";
import {users} from "./Data"

function Todo() {
    const [todo, setTodo] = useState("")
   
    const [todos, setTodos] = useState([]);
 
    const fetchPost = async () => {
       
        await getDocs(collection(db, "countrylist"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => {return doc.data() })
               if(newData[0].country){
                for (const product of newData[0].country) {
                    if (product.hasOwnProperty("name") && product["name"]==="India") {
                     console.log("true",)
                    }
            }}})
               
                
               
                     
  
       

    }
    

   const addDocument=async()=>{
    try{
  const result=await getDoc(doc(db,"healthcare","specalists"))
  if(result.exists){
    const data =result.data().users;
 
  }
     
}catch(e){
    console.log("object",e)
}
   }

   const auth=getAuth()
 
    const addTodo = async (e) => {
        e.preventDefault();  
       
        try {
            const docRef = await addDoc(collection(db, "countrylist"), {
              country:"sds",    
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }
    useEffect(()=>{
        const email="panwarakhil1811@gmail.com";
        const password="Akhil@1811";
        signInWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...

console.log("object")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("error succesfull",errorCode,errorMessage)
          });
        })
        useEffect(()=>{
            fetchPost();
        }, [])
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
                            onChange={(e)=>setTodo(e.target.value)}
                        />
                    </div>
   
                    <div className="btn-container">
                        <button
                            type="submit"
                            className="btn"
                            onClick={addDocument}
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
