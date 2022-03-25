import React, {
  useEffect,
  //  useState
} from 'react'
// import {
// collection,
// doc,
// setDoc,
// getDocs,
// getDoc,
// query,
// where
// } from 'firebase/firestore'
// import { db } from '../../../firebase'

export default function SingleGuide() {
  // const [arr, setArr] = useState([])
  // const getDummies = async () => {
  //   const querySnapshot = await getDocs(collection(db, 'gods'))
  //   let arr1 = []

  //   querySnapshot.forEach((doc) => {
  //     arr1.push(doc.data())
  //   })

  //   setArr(arr1)
  // }

  useEffect(() => {
    // getDummies()
  }, [])

  // return !arr.length ? (
  //   <div>
  //     <p>nothing to see here</p>
  //   </div>
  // ) : (
  //   <div>
  //     {arr.map((check, idx) => (
  //       <ul key={idx}>
  //         <li>{check.name}</li>
  //         <li>{check.status}</li>
  //       </ul>
  //     ))}
  //   </div>
  // )
  return <div> test</div>
}
