document.addEventListener("DOMContentLoaded", () => {
    const chatMessages = document.querySelector(".chat-messages");
    const inputField = document.querySelector(".input-area input");
    const sendButton = document.querySelector(".input-area button");
    const presetButtons = document.querySelectorAll(".preset-questions button");

    const answers = {
      en: {
        "frontend technologies": "The wonders of frontend are such that nothing can keep us apart. I have experience using HTML, CSS, JavaScript, Bootstrap, and React.",
        "backend technologies": "Backend has been challenging to sync with frontend, but I always strive to do my best! I know the basics of PHP and lately have been focusing more on NodeJS.",
        "tools": "I know how to use Git, giving me the advantage of uploading projects to GitHub and GitLab. I enjoy using MongoDB for monitoring and building databases and have been learning to use Postman.",
        "android development": "Throughout my journey, I also learned the basics of developing Android applications using Java and working with APIs in Android Studio."
      },
      pt: {
        "tecnologias frontend": "As maravilhas que o frontend trás, não há nada que nos possa separar. Tenho experiência em usar HTML, CSS, Javascript, Bootstrap e React.",
        "tecnologias backend": "O backend tem sido uma tarefa difícil de sincronizar com o frontend, mas quero sempre dar o meu melhor! Aprendi os básicos de PHP e, ultimamente, tenho vindo a focar-me mais em NodeJS.",
        "ferramentas": "Eu sei usar o Git para fazer uploads de projetos no Github ou Gitlab. Adoro usar o MongoDB para monitorar e construir bases de dados nos meus projetos e tenho vindo a aprender a usar o Postman.",
        "desenvolvimento android": "Durante a minha jornada, também aprendi a desenvolver aplicações Android. Principalmente os basicos de Java e integrar APIs no Android Studio."
      }
    };
  
    function getCurrentLanguage() {
      return localStorage.getItem("language") || "en";
    }
  
    function addMessage(content, sender, isLoading = false) {
      const messageElement = document.createElement("div");
      messageElement.classList.add("message", sender);
  
      if (isLoading) {
        messageElement.innerHTML = `<i class="bi bi-three-dots"></i>`;
      } else {
        messageElement.textContent = content;
      }
  
      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
      return messageElement;
    }
  
    function processInput(question) {
      
      addMessage(question, "user");
      const loadingMessage = addMessage("", "bot", true);
  
      setTimeout(() => {
        
        const questionKey = question.toLowerCase();
        const currentLanguage = getCurrentLanguage();

        const answer =
          answers[currentLanguage][questionKey] ||
          (currentLanguage === "pt"
            ? "Desculpa, não entendi. Eu só consigo responder base as categorias em cima"
            : "Sorry, I didn't understand. I just can answer based in the categories above");
        
        loadingMessage.innerHTML = answer;
      }, 1000);
    }
  
    sendButton.addEventListener("click", () => {
      const userInput = inputField.value.trim();
      if (userInput !== "") {
        processInput(userInput);
        inputField.value = "";
      }
    });
  
    inputField.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
        sendButton.click();
      }
    });
  
    presetButtons.forEach((button) => {
      button.addEventListener("click", () => {
        processInput(button.textContent);
      });
    });
  });
  