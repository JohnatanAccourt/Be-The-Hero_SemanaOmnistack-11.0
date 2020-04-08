import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { FiArrowLeft } from 'react-icons/fi';
import './styles.css';
import logoimg from '../../assets/logo.svg'; 
import api from '../../services/api';

export default function Register() {
    const history = useHistory();

    const [name, setName] = useState(''); //Primeiro parâmetro é o valor, o segundo a funcão pra atualizar o valor
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUF] = useState('');

    async function handleRegister(e){
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };
        try{
            const response = await api.post('ongs', data) 
            //primeiro parâmetro é nome da rota o segundo é o queremos enviar no caso o objeto "data" 
            // sempre que usar o await é necessário colocar o async antes da função (await aguardar finalizar o insert)
    
            alert(`Seu ID de acesso: ${response.data.id}`) 
            //EC6 é usado crase para concatenar, reponse é a variavel que retornamos propriamente a resposta, data é o objeto e o id é o que retornou como resposta para exibirmos ao user

            history.push('/')
            //history.push vai levar o user no caso para a home ou de acordo com a rota que definirmos após de executar o alert acima
        } catch (err){
            alert('erro no cadastro, tente novamente')
        }
        
    }
    return( 
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoimg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                    
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar para o Login
                    </Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} //"e" é o parâmetro que é recebido
                     />

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                      />

                    <input 
                        placeholder="WhatsApp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} 
                    />
                    
                    <div className="input-group">
                        <input 
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} 
                        />
                        <input 
                            placeholder="UF"  
                            style={{ width:80 }}
                            value={uf}
                            onChange={e => setUF(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit" >Cadastrar</button>
                </form>
            </div>
        </div>
    )
}