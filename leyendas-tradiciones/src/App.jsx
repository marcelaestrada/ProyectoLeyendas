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

// Modal
Modal.setAppElement('#root');

const App = () => {
  const [levels, setLevels] = useState([
    { id: 1, name: 'Nivel 1', locked: false },
    { id: 2, name: 'Nivel 2', locked: true },
    { id: 3, name: 'Nivel 3', locked: true },
  ]);

  const [puntuacion, setPuntuacion] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const [options, setOptions] = useState([]);

  const aumentarPuntuacion = () => {
    setPuntuacion(puntuacion + 5);
  };

  // Modal y modelo ChatGPT
  const openModal = async (imageId, level) => {
    try {
      const response = await generarCompletacion(imageId);
  
      if (response && response.text) {
        const textogenerado = response.text;
        setSelectedLevel(level);
        setModalIsOpen(true);
        console.log(textogenerado);
  
        const resultado = separarTexto(textogenerado);
        console.log(resultado)

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

  // Niveles
  const completeLevel = () => {
    const updatedLevels = levels.map((level) =>
      level.id === selectedLevel.id
        ? { ...level, locked: false }
        : level
    );
    setLevels(updatedLevels);
    closeModal();
  };

  // Personaje seleccionado
  const handleCharacterSelect = (characterName) => {
    setSelectedCharacter(characterName);
  };

  // Separacion del texto 
  function separarTexto(response) {
    if (response && response.text) {
      const textoCompleto = response.text;
      
      const introduccionRegex = /(.+?)\nOpción 1: /;
      const introduccionMatch = textoCompleto.match(introduccionRegex);
  
      if (introduccionMatch) {
        const introduccion = introduccionMatch[1].trim();
  
        const opcion1YDescripcion = textoCompleto.split('Opción 2: ');
  
        if (opcion1YDescripcion.length === 2) {
          const opcion1 = opcion1YDescripcion[0].trim();
          const opcion2YDescripcion = opcion1YDescripcion[1].split('ENDING ENDING ENDING');
  
          if (opcion2YDescripcion.length === 2) {
            const descripcionOpcion1 = opcion2YDescripcion[0].trim();
            const opcion2Datos = opcion2YDescripcion[1].trim().split('Opción 2: ');
  
            let descripcionOpcion2 = '';
            let opcion2 = 'Opción 2';
  
            if (opcion2Datos.length === 2) {
              opcion2 = opcion2Datos[0].trim();
              descripcionOpcion2 = opcion2Datos[1].trim();
            }
  
            return {
              introduccion: introduccion,
              /*opcion1: opcion1,
              descripcionOpcion1: descripcionOpcion1,
              opcion2: opcion2,
              descripcionOpcion2: descripcionOpcion2*/
            };
          }
        } else {
          return {
            introduccion: introduccion,
            opcion1: '',
            descripcionOpcion1: '',
            opcion2: 'Opción 2',
            descripcionOpcion2: ''
          };
        }
      }
    }
  
    return null;
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
        <h2>{selectedLevel && selectedLevel.name}</h2>
        {selectedLevel && selectedLevel.locked ? (
          <p>Este nivel está bloqueado.</p>
        ) : (
          <button onClick={completeLevel}>Opcion 1</button>
        )}
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
