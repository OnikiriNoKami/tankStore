import { useEffect, useState } from "react"

const useArrayEquals = (firstArray, secondArray) =>{
    const [equal, setEqual] = useState(false)
    const [first, setFirst] = useState('')
    const [second, setSecond] = useState('')

    useEffect(()=>{
        setFirst(JSON.stringify(firstArray.length!==0&&firstArray.slice().sort((a,b)=>{
            if(a.id < b.id){
                return -1
            } else {
                return 1
            }
        })))
        setSecond(JSON.stringify(secondArray.length!==0&&secondArray.slice().sort((a,b)=>{
            if(a.id < b.id){
                return -1
            } else {
                return 1
            }
        })))
    }, [firstArray, secondArray])

    useEffect(()=>{
        if(first===second){
            
            setEqual(true)
        } else {
            setEqual(false)
        }
    }, [first, second])

    return {
        equal
    }
}

export default useArrayEquals