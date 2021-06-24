import { useState } from "react";

type ButtonProps = {
    children?: string;//o ? torna o parametro opcional
}//exemplo de uso da propriedade children com a seguinte declaração
//function Button(props: ButtonProps){
// return(<button>{props.children || 'Defaut'}</button>)}

export function Button(){
    //let counter = 0; - o react não vai pegar a mudança da variavel
    const [counter, setCounter] = useState(0)//ele só vai alterar os dados visualmente quando for uma constante e não variável 

    function increment(){
        setCounter(counter + 1);//estou alterando o valor através da propriedade set retornada pelo useState pois toda constante é imutável, sendo atribuído um novo valor a ela quando se quer 'alterar' seu valor
    }
    
    return(
        <button onClick={increment}>
            {counter}
        </button>
    )
}