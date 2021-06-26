import { useHistory } from 'react-router-dom'

import ilustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIcoImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent } from 'react'
import { useState } from 'react'
import { database } from '../services/firebase'

export function Home(){
    const history = useHistory();
    const { user, signInGooogle } = useAuth()
    const [roomCode, setRoomCode] = useState('');
    async function handleCreateRoom(){
        if (!user){//se o susuário nao estiver autenticado, ele chama para autenticação
            await signInGooogle()
        }
        
        history.push('/rooms/new')
    }
 
    async function hadleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if (roomCode.trim() ===''){
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get(); 
        if (!roomRef.exists()){
            alert('Room does not exists.');
            return;
        }
        
        history.push(`/rooms/${roomCode}`);
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
                    <button onClick={handleCreateRoom}className="create-room">
                        <img src={ googleIcoImg } alt="Logo do google" />
                        Crie sua sala com o google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={ hadleJoinRoom } action="">
                        <input 
                        type="text" 
                        placeholder="Digite o código da sala"
                        onChange={event => setRoomCode(event.target.value)}
                        value={ roomCode }
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}