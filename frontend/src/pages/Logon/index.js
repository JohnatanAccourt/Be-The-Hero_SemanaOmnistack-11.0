import React, {  useState } from 'react';
import { Link, useHistory } from 'react-router-dom'; 
import { FiLogIn } from 'react-icons/fi';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoimg from '../../assets/logo.svg';
import api from '../../services/api';

export default function Logon(){
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try{
            const response = await api.post('sessions', { id }); // ele vai buscar em sessions o id correspondente ao que o user inseriu no campo

            // console.log(response.data.name)

            //localStorage vai armazenar ao navegador
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        } catch (err){
            alert('Falha no login, tente novamente.')
        }

    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoimg} alt="Be The Hero"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>

                    {/* antes:
                    <a href="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </a> */}

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        Não tenho cadastro
                    </Link>
                 </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    )
}