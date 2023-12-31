import React, { useState } from 'react';
import './App.css';
import Modal from 'react-modal';
import { generarCompletacion } from './Finetune.jsx';

// Personajes
import BoyImage from './img/Boy.png'; 
import GirlImage from './img/Girl.png'; 
import Cadejo from './characters/El Cadejo.png'
import Sombreron from './characters/El Sombreron.png'
import Win from './characters/El Win.png'
import Llorona from './characters/La Llorona.png'
import Siguanaba from './characters/La Siguanaba.png'
import Tatuana from './characters/La Tatuana.png'
import Antorchas from './characters/Antorchas.png'
import FiestaPatronal from './characters/Fiesta patronal.png'
import Punta from './characters/Punta.png'

var turnos = 0;
var character = "";

// Modal
Modal.setAppElement('#root');

const App = () => {

  const [puntuacion, setPuntuacion] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  var [intro, setIntro] = useState(0);
  var [opcion1, setOpcion1] = useState(null);
  var [opcion2, setOpcion2] = useState(null);

  // Modal y modelo ChatGPT
  const openModal = async (imageId, level) => {
    try {
      var response = "";
      character = imageId.split("Start ")[1];
      console.log(character);

      do {
        response = await generarCompletacion(imageId);
      } while (!(response.includes("Opción 1") && response.includes("Opción 2") && response.includes("END")));

      if (response) {
        setModalIsOpen(true);
  
        setIntro(getIntro(response));
        setOpcion1(getOpcion1(response));
        setOpcion2(getOpcion2(response));
        turnos = turnos + 1;

      } else {
        console.error('La respuesta de generarCompletacion no es válida');
      }
    } catch (error) {
      console.error('Error al llamar a generarCompletacion:', error);
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const aumentarPuntuacion = () => {
    setPuntuacion(puntuacion + 5);
  };

  // Personaje seleccionado
  const handleCharacterSelect = (characterName) => {
    setSelectedCharacter(characterName);
  };

  // Separacion del texto 
    function getIntro(text) {
    const option1Index = text.indexOf("Opción 1");
  
    if (option1Index !== -1) {
      const textBeforeOption1 = text.substring(0, option1Index);
      return textBeforeOption1;
    } else {
      return "La frase 'Opción 1' no se encuentra en el texto.";
    }
  }

  function getOpcion1(text) {
    const option1Index = text.indexOf("Opción 1");
    const option2Index = text.indexOf("Opción 2");
  
    if (option1Index !== -1 && option2Index !== -1) {
      const textBetweenOptions = text.substring(option1Index + 8, option2Index);
      return textBetweenOptions;
    } else {
      return "No se encontraron ambas frases 'Opción 1' y 'Opción 2' en el texto.";
    }
  }

  function getOpcion2(texto) {
    const posicionOpcion2 = texto.indexOf('Opción 2');
  
    if (posicionOpcion2 === -1) {
      return null;
    }
  
    const textoDespuesOpcion2 = texto.substring(posicionOpcion2 + 'Opción 2'.length);
  
    const posicionEnd = textoDespuesOpcion2.indexOf('END');
  
    if (posicionEnd === -1) {
      return null;
    }
  
    return textoDespuesOpcion2.substring(0, posicionEnd);
  }  

  // Obtener siguientes opciones
  async function handleButtonClick(event) {
    const button = event.target;
    const presionado = button.getAttribute("data-id");
    var response = "";
    
    if(turnos<10){
      do {
        response = await generarCompletacion("Dame un texto corto de la historia y dos opciones diferentes para continuar la historia si eligieron la opcion " + String(presionado));
      } while (!(response.includes("Opción 1") && response.includes("Opción 2") && response.includes("END")));
  
      setIntro(getIntro(response));
      setOpcion1(getOpcion1(response));
      setOpcion2(getOpcion2(response));
      turnos = turnos + 1;
    } else {
      do {
        response = await generarCompletacion("Dame un final para la historia de " + character);
      } while (!(response.includes("Opción 1") && response.includes("Opción 2") && response.includes("END")));

      setIntro(response);
      setOpcion1(getOpcion1(response));
      setOpcion2(getOpcion2(response));
      turnos = 0;
      character = "";
      aumentarPuntuacion();
    }
  }

  return (
    <div className="App">
      <div className='App-header'>
        <h1>Guatemala y sus misterios</h1>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className="modal"
          overlayClassName="overlay"
          shouldCloseOnOverlayClick={false}
        >
          <p>Turno: {turnos}</p>
          <textarea
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
            className='textarea-custom'
          />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <button className="custom-button" data-id={opcion1} onClick={handleButtonClick}>Opcion 1{opcion1}</button>
          <button className="custom-button" data-id={opcion2} onClick={handleButtonClick}>Opcion 2{opcion2}</button>
          <button onClick={closeModal}>Cerrar</button>
        </Modal>
        <div className="geometric-shape" style={{ top: '50px', left: '20px'}}></div>
        <div className="geometric-shape" style={{ top: '80px', left: '100px' }}></div>
      </div>
      <br></br>
      <div className='puntuacion'>
        <h1>Selecciona tu campeon:</h1>
      </div>
      <br></br>
      <div className="centered-container">
        <div className="image-box" onClick={() => handleCharacterSelect('amiguito')}>
          <img src={BoyImage} alt="Boy" />
          {selectedCharacter === 'amiguito' && <p> Zomberto </p>}
        </div>
        <div className="image-box" onClick={() => handleCharacterSelect('amiguita')}>
          <img src={GirlImage} alt="Girl" />
          {selectedCharacter === 'amiguita' && <p> Zombirela </p>}
        </div>
      </div>
      <br></br>
      <br></br>
      <div className='puntuacion'>
        <h1>P u n t u a c i ó n : {puntuacion}</h1>
      </div>
      <div className="grid-container">
      {Array.from({ length: 16 * 9 }).map((_, index) => (
        <div key={index} className="grid-item">
          { index === 1 || index === 163 || index === 169? (
            <div className='regalito'>
              <img src={Sombreron} alt="Sombreron" onClick={() => openModal("Start El Sombreron","1")}/>
            </div>
          ) : index === 7 ? (
            <div className='regalito'>
              <img src={Llorona} alt="Llorona" onClick={() => openModal("Start La Llorona","2")}/>
            </div>
          ) : index === 31 ? (
            <div className='regalito'>
              <img src={Siguanaba} alt="Siguanaba" onClick={() => openModal("Start La Siguanaba","3")}/>
            </div>
          ) : index === 55 ? (
            <div className='regalito'>
              <img src={Cadejo} alt="Cadejo" onClick={() => openModal("Start El Cadejo","4")}/>
            </div>
          ) : index === 61 ? (
            <div className='regalito'>
              <img src={Win} alt="Win" onClick={() => openModal("Start El Win","5")}/>
            </div>
          ) : index === 85 ? (
            <div className='regalito'>
              <img src={Tatuana} alt="Tatuana" onClick={() => openModal("Start La Tatuana","6")}/>
            </div>
          ) : index === 109 ? (
            <div className='regalito'>
              <img src={Antorchas} alt="Antorchas" onClick={() => openModal("Start Antorchas","7")}/>
            </div>
          ) : index === 115 ? (
            <div className='regalito'>
              <img src={FiestaPatronal} alt="FiestaPatronal" onClick={() => openModal("Start Fiesta Patronal","8")}/>
            </div>
          ) : index === 139 ? (
            <div className='regalito'>
              <img src={Punta} alt="Punta" onClick={() => openModal("Start Punta","9")}/>
            </div>
          ) : index % 9 === 0 || (index + 1) % 9 === 0  ? (
            <h1> </h1>
          ) : (index > 1 && index < 7) || (index > 27 && index < 35) || (index > 55 && index < 61) || (index > 81 && index < 89) || (index > 109 && index < 115) || (index > 135 && index < 143) || (index > 163 && index < 169) || index === 16 || index === 25 || index === 37 || index === 46 || index === 70 || index === 79 || index === 91 || index === 100 || index === 124 || index === 133 || index === 145 || index === 154 ? (
            <div className='puntos'>
              <h1>●</h1>
            </div>
          ) :
          (
            <h1> </h1>
          )}
        </div>
      ))}
      </div>
      
      <br></br>
      <br></br>
    </div>
  );
};

export default App;
