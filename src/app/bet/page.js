"use client";

import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDispute, placeBet, claimPrize } from "@/services/web3Service";
import Web3 from "web3";

export default function Bet() {
    const { push } = useRouter();
    const [message, setMessage] = useState("");
    const [dispute, setDispute] = useState({
        candidate1: "loading...",
        candidate2: "loading...",
        image1: "Kamala.jpg",
        image2: "Trump.jpg",
        total1: 0,
        total2: 0,
        winner: 0,
    });

    useEffect(() => {
        if (!localStorage.getItem("wallet")) return push("/");
        setMessage("obtendo dados da disputa...");
        getDispute()
            .then(dispute => {
                setDispute(dispute);
                setMessage("");
            })
            .catch(error => {
                setMessage(error.message || "Ocorreu um erro ao carregar os dados.");
                console.error(error);
            });
    }, [push]); 

    function processBet(candidate) {
        setMessage("conectando a MetaMask...");
        const amount = prompt("Quantia em POL para apostar:", "1");
        placeBet(candidate, amount)
            .then(() => {
                alert("Aposta recebida com sucesso! Pode demorar 1 minuto para que apareça no sistema.");
                setMessage("");
            })
            .catch(err => {
                setMessage(err.message || "Ocorreu um erro ao processar a aposta.");
                console.error(err);
            });
    }
    function Claim(){
      setMessage("conectando a MetaMask...");
        claimPrize()
            .then(() => {
                alert("Prêmio coletado com sucesso! Pode demorar 1 minuto para que apareça na sua carteira");
                setMessage("");
            })
            .catch(err => {
                setMessage(err.message || "Ocorreu um erro ao processar a aposta.");
                console.error(err);
            });
    }

    return (
        <>
            <Head>
                <title>BetCandidate | Bet</title>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <div className="container px-4 py-5">
                <div className="row flex-lg-row-reverse align-center">
                    <h1 className="display-5 fw-bold text-body-emphasis lh-1 mb-3">BetCandidate</h1>
                    <p className="lead">Aposta on-Chain nas eleições americanas.</p>
                    {
                      dispute.winner == 0
                        ?<p className="lead">Válido até o dia da eleição.</p>
                        :<p className="lead">Apostas encerradas. solicite seu premio a baixo</p>
                    }
                    
                </div>
                <div className="row flex-lg-row-reverse align-center g-1 py-5">
                    <div className="col "></div>
                    {
                      dispute.winner == 0 || dispute.winner == 1
                        ? <div className="col">
                          <h3 className="mt-2 d-block mx-auto" style={{ width: 250 }}>
                              {dispute.candidate1}
                          </h3>
                          <img src={dispute.image1} className="d-block mx-auto img-fluid rounded" style={{ width: 250 }} />
                          {
                            dispute.winner == 1
                              ?<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={Claim}>Pegar meu prêmio</button>
                              :<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => processBet(1)}>Apostar em Trump</button>
                          }
                          
                          <span className="badge text-bg-secondary d-block mx-auto" style={{ width: 250 }}>{Web3.utils.fromWei(dispute.total1, "ether")} POL Apostados</span>
                        </div>
                        :<></>
                    }
                    {
                      dispute.winner == 0 || dispute.winner == 2
                        ?<div className="col">
                          <h3 className="mt-2 d-block mx-auto" style={{ width: 250 }}>
                              {dispute.candidate2}
                          </h3>
                          <img src={dispute.image2} className="d-block mx-auto img-fluid rounded" width={250} />
                          {
                            dispute.winner == 2
                            ?<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={Claim}>Pegar meu prêmio</button>
                            :<button className="btn btn-primary p-3 my-2 d-block mx-auto" style={{ width: 250 }} onClick={() => processBet(2)}>Apostar em Kamala</button>
                          }
                          <span className="badge text-bg-secondary d-block mx-auto" style={{ width: 250 }}>{Web3.utils.fromWei(dispute.total2, "ether")} POL Apostados</span>
                        </div>
                        :<></>
                    }
                    
                </div>
                <div className="row align-items-center">
                    <p className="message">{message}</p>
                </div>
                <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                    <p className="col4 mb-0 text-body-secondary">
                        &copy; 2024 BetCandidate. Todos os direitos reservados.
                    </p>
                    <ul className="nav col-4 justify-content-end">
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
