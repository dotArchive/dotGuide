import React, { useEffect, useState } from 'react'
import {
  collection,
  doc,
  // setDoc,
  getDocs,
  // getDoc,
  // query,
  // where
} from 'firebase/firestore'
import { db } from '../../../firebase'

export default function SingleGuide() {
  const [arr, setArr] = useState([])
  const getDummies = async () => {
    const querySnapshot = await getDocs(collection(db, 'gods'))
    let arr1 = []
    // console.log('All Docs', querySnapshot.docs);
    querySnapshot.forEach((doc) => {
      arr1.push(doc.data())
    })
    console.log('this is arr1', arr1)
    setArr(arr1)
  }
  useEffect(() => {
    console.log('before setArr', arr)
    getDummies()
  }, [])
  // const [arr2, setArr2] = useState([])
  // const gods = collection(db, 'gods')

  // const setDummy = async () => {
  //   await setDoc(doc(db, 'gods', 'Christian'), {
  //     name: 'Jesus',
  //     status: 'okay',
  //   })
  // }
  // setDummy()

  // const getDummy = async () => {
  //   let arr
  //   const dummyRef = doc(db, 'cities', 'NYC')
  //   const querySnapshot = await getDoc(dummyRef)
  //   // console.log('Single Doc ID:', querySnapshot.id)
  //   arr.push(querySnapshot.data())
  // }
  // getDummies()
  // getDummy()

  return !arr.length ? (
    <div>
      <p>nothing to see here</p>
    </div>
  ) : (
    <div>
      {arr.map((check, idx) => (
        <ul key={idx}>
          <li>{check.name}</li>
          <li>{check.status}</li>
        </ul>
      ))}
    </div>
  )
}
