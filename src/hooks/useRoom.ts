import { useEffect, useState } from "react"
import { database } from "../services/firebase"

type QuestionType = {
    id: string;
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
}


type firebaseQuestion = Record<string, {
    author:{
        name:string;
        avatar:string;
    }
    content:string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

export function useRoom(roomId: string){
    const [questions, setQuestions] = useState<QuestionType[]>([])
    const [title, setTitle] = useState('')


    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)
        roomRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions = databaseRoom.questions as firebaseQuestion ?? {};//usa um objeto vazio caso não encontre perguntas
            console.log(room.val())//estratégia usada no caso de sendo usado o firebase
            const parsedQuestion = Object.entries(firebaseQuestions).map(([key, value]) => {
                return{
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestion);
        })
    }, [roomId])

    return { questions, title }
}