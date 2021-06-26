import { Link, useHistory } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

export function NewRoom(){
    const { user } = useAuth();

    const history = useHistory()
    const [newRoom, setNewRoom] = useState('');
    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault(); //evitando que o html tenha seu comportamento padrão


        if (newRoom.trim() === ''){
            return;//ele retorna caso o usuário não tenha digitado nada
        }
        const roomRef = database.ref('rooms');//referencia para o banco de dados

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
            
        })//jogano uma nova sala no banco de dados
        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id='page-auth'>
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={ logoImg } alt="letmeask" />
                    <h2>Criar uma nova sala</h2>
                    
                    <form onSubmit={handleCreateRoom} action="">
                        <input 
                        type="text" 
                        placeholder="Nome da sala"
                        onChange={event => setNewRoom(event.target.value)}
                        value={newRoom}
                        />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?<Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}