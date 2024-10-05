"use client"

import Head from "next/head"
import {useRouter} from "next/navigation"
import {useState} from "react"
import { doLogin } from "@/services/web3Service"
export default function Home() {
  const{push} = useRouter()

  const [message, setMessage] = useState()

  function bntLoginClick(){
    setMessage("Conectando a carteira, aguarde...")
    doLogin()
      .then(account => push("/bet"))
      .catch(err => {
        console.error(err)
        setMessage(err.message)
      })
  }


  return (
    <>
      <Head>
        <title> BetCandidate | Login </title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <div className="container px-4 py-5">
        <div className="row flex-lg-row-reverse align-center g-5 py-5">
          <div className="col-6">
            <img src="https://classic.exame.com/wp-content/uploads/2024/09/000_36FN8ZD.jpg?quality=70&strip=info" className="d-block mx-lg-auto img-fluid" width="700" height="500"/>
          </div>
          <div className="col-6">
            <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
            <p className="lead">Aposta on-Chain nas eleições americanas.</p>
            <p className="lead">Autentique com sua carteira e deixe a sua resposta para a próxima disputa.</p>
            <div className="d-flex flex-column justify-content-start" >
              <button type="button" className="btn btn-primary btn-lg px-4" onClick={bntLoginClick} style={{width: "80%"}}> 
                <img src="/metamask.svg" width={64} className="me-3"/>
                  Conectar a Metamask
              </button>
              <p className="message mt-2">{message}</p>
            </div>

          </div>
        </div>
        <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
          <p className="col4 mb-0 text-body-secondary">
            &copy; 2024 BetCandidate. Todos os direitos reservados.
          </p>
          <ul className="nav col-4 justfy-content-end">
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">Home</a>
            </li>
            <li className="nav-item">
              <a href="/" className="nav-link px-2 text-body-secondary">About</a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  );
}
