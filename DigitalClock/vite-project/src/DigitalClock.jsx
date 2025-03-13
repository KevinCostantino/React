import React, { useState, useEffect } from "react";

function DigitalClock() {
    const [time, setTime] = useState(new Date());
    let resizeTimeout = null; // Controle do delay do redimensionamento

    useEffect(() => {
        // Atualiza o relógio a cada segundo
        const intervalId = setInterval(() => {
            setTime(new Date());
        }, 1000);

        // Função para pegar o nível real de zoom da página
        const getZoomLevel = () => {
            return window.visualViewport.scale || 1; // Usa visualViewport para precisão
        };

        // Ajusta o tamanho do background após a transição do zoom
        const updateBackgroundSize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                let zoom = getZoomLevel();
                let backgroundSize = 100 * zoom; // Mantém um tamanho mais proporcional
                document.body.style.backgroundSize = `${backgroundSize}%`;
            }, 300); // Aguarda 300ms após a parada do redimensionamento
        };

        // Adiciona o evento de redimensionamento
        window.addEventListener("resize", updateBackgroundSize);

        return () => {
            clearInterval(intervalId); // Limpa o intervalo do relógio
            window.removeEventListener("resize", updateBackgroundSize); // Remove o evento
        };
    }, []);

    function formatTime() {
        let hours = time.getHours();
        const minutes = time.getMinutes();
        const seconds = time.getSeconds();
        const meridiem = hours >= 12 ? "PM" : "AM";

        hours = hours % 12 || 12;

        return `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)} ${meridiem}`;
    }

    function padZero(number) {
        return (number < 10 ? "0" : "") + number;
    }

    return (
        <div className="clock-container">
            <div className="clock">
                <span>{formatTime()}</span>
            </div>
        </div>
    );
}

export default DigitalClock;
