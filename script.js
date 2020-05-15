window.onload = function () {

  var alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h',
        'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's',
        't', 'u', 'v', 'w', 'x', 'y', 'z'];
  
  var categories;         // Array of topics
  var chosenCategory;     // Selected catagory
  var getHint ;          // Word getHint
  var word ;              // Selected word
  var guess ;             // Geuss
  var geusses = [ ];      // Stored geusses
  var lives ;             // Lives
  var counter ;           // Count correct geusses
  var space;              // Number of spaces in word '-'

  // Get elements
  var showLives = document.getElementById("mylives");
  var showCatagory = document.getElementById("scatagory");
  var getHint = document.getElementById("hint");
  var showClue = document.getElementById("clue");



  // create alphabet ul
  var buttons = function () {
    myButtons = document.getElementById('buttons');
    letters = document.createElement('ul');

    for (var i = 0; i < alphabet.length; i++) {
      letters.id = 'alphabet';
      list = document.createElement('li');
      list.id = 'letter';
      list.innerHTML = alphabet[i];
      check();
      myButtons.appendChild(letters);
      letters.appendChild(list);
    }
  }
    
  
  // Select Catagory
  var selectCat = function () {
    if (chosenCategory === categories[0]) {
      catagoryName.innerHTML = "La categoría es 'la familia'";
    } else if (chosenCategory === categories[1]) {
      catagoryName.innerHTML = "La categoría es 'partes de mi cuerpo'";
    } else if (chosenCategory === categories[2]) {
      catagoryName.innerHTML = "La categoría es 'colores'";
    }
  }

  // Create geusses ul
   result = function () {
    wordHolder = document.getElementById('hold');
    correct = document.createElement('ul');

    for (var i = 0; i < word.length; i++) {
      correct.setAttribute('id', 'my-word');
      guess = document.createElement('li');
      guess.setAttribute('class', 'guess');
      if (word[i] === "-") {
        guess.innerHTML = "-";
        space = 1;
      } else {
        guess.innerHTML = "_";
      }

      geusses.push(guess);
      wordHolder.appendChild(correct);
      correct.appendChild(guess);
    }
  }
  
  // Show lives
   comments = function () {
    showLives.innerHTML = "Tienes " + lives + " vidas";
    if (lives < 1) {
      showLives.innerHTML = "Juego Terminado";
    }
    for (var i = 0; i < geusses.length; i++) {
      if (counter + space === geusses.length) {
        showLives.innerHTML = "¡Ganaste!";
      }
    }
  }

      // Animate man
  var animate = function () {
    var drawMe = lives ;
    drawArray[drawMe]();
  }

  
   // Hangman
  canvas =  function(){

    myStickman = document.getElementById("stickman");
    context = myStickman.getContext('2d');
    context.beginPath();
    context.strokeStyle = "#fff";
    context.lineWidth = 2;
  };
  
    head = function(){
      myStickman = document.getElementById("stickman");
      context = myStickman.getContext('2d');
      context.beginPath();
      context.arc(60, 25, 10, 0, Math.PI*2, true);
      context.stroke();
    }
    
  draw = function($pathFromx, $pathFromy, $pathTox, $pathToy) {
    
    context.moveTo($pathFromx, $pathFromy);
    context.lineTo($pathTox, $pathToy);
    context.stroke(); 
}

   frame1 = function() {
     draw (0, 150, 150, 150);
   };
   
   frame2 = function() {
     draw (10, 0, 10, 600);
   };
  
   frame3 = function() {
     draw (0, 5, 70, 5);
   };
  
   frame4 = function() {
     draw (60, 5, 60, 15);
   };
  
   torso = function() {
     draw (60, 36, 60, 70);
   };
  
   rightArm = function() {
     draw (60, 46, 100, 50);
   };
  
   leftArm = function() {
     draw (60, 46, 20, 50);
   };
  
   rightLeg = function() {
     draw (60, 70, 100, 100);
   };
  
   leftLeg = function() {
     draw (60, 70, 20, 100);
   };
  
  drawArray = [rightLeg, leftLeg, rightArm, leftArm,  torso,  head, frame4, frame3, frame2, frame1]; 


  // OnClick Function
   check = function () {
    list.onclick = function () {
      var geuss = (this.innerHTML);
      this.setAttribute("class", "active");
      this.onclick = null;
      for (var i = 0; i < word.length; i++) {
        if (word[i] === geuss) {
          geusses[i].innerHTML = geuss;
          counter += 1;
        } 
      }
      var j = (word.indexOf(geuss));
      if (j === -1) {
        lives -= 1;
        comments();
        animate();
      } else {
        comments();
      }
    }
  }
  
    
  // Play
  play = function () {
    categories = [
        ["padre", "madre", "hermano", "hermana", "suegro", "suegra", "esposo", "esposa", "abuelo", "abuela", "hijo", "hija", "nieto", "nieta", "tio", "tia", "primo", "prima", "sobrino", "sabrina", "padrino", "madrina"],
        ["el brazo", "la espalda", "el cerebro", "el pecho", "las nalgas", "la pantorrilla", "el oido", "la oreja", "el codo", "el ojo", "el dedo", "el pie", "el pelo", "la mano", "la cabeza", "el corazon", "la cadera", "la rodilla", "la pierna", "el higado", "la boca", "el cuello", "la nariz", "el hombro", "la piel", "el estomago", "la garganta", "el dedo del pie", "la lengua", "el diente", "la pija", "la conchita"],
        ["anaranjado", "amarillo", "azul", "rojo", "verde", "negro", "marron", "cafe,", "morado", "blanco"]
    ];

    chosenCategory = categories[Math.floor(Math.random() * categories.length)];
    word = chosenCategory[Math.floor(Math.random() * chosenCategory.length)];
    word = word.replace(/\s/g, "-");
    console.log(word);
    buttons();

    geusses = [ ];
    lives = 10;
    counter = 0;
    space = 0;
    result();
    comments();
    selectCat();
    canvas();
  }

  play();
  
  // Hint

    hint.onclick = function() {

      hints = [
        ["Laya inútil sobre el bien para nada", "la fábrica de bebés", "¿No soy un hombre y un _________?", "En un convento", "Lo odiarás y desarrollarás problemas con papá", "Complejo de Edipo", "Querrás divorciarte de él por mí", "¿Por qué dijo que sí?", "asilo de ancianos", "En alto riesgo de COVID", "Un accidente de condón", "Ahora te tiene por 18 años y probablemente no sea tuyo", "El extraño y espeluznante", "El que tiene pechos grandes por los que tenías sentimientos confusos", "Nunca te gustó realmente esa.", "Te metiste en un cobertizo una vez.", "Don Corleone", "¡Abajo el matriarcado!"],
        ["Tienes dos de ellas y si no eres inofensivo", "Una santa por detrás", "Tienes uno grande si tu mente es hermosa", "Suerte que mis pechos sean pequeños, Y nos los confundas con montañas", "Me gustan las _____ grandes y no puedo mentir", "Para aquellos que son buenos para andar en bicicleta y dan a luz vacas bebé", "Susurra nada dulce en______", " Susurra nada dulce en______", " el hueso gracioso", " las ventanas al alma", " uno en el rosa, uno en el hedor", " siempre está en tu boca", " la forma de identificar tu ADN si terminas en una zanja", " Qué cabe en el guante de OJ?", " ¿Eres bueno dándolo?", " solo late para ti", " Ellas no mienten", " Subirse a ellas", "Dos o cuatro, no me importa", " Para el alcohol", "Para el alcohol", "Larga, como la de una jirafa", "Enorme, como la de un elefante", " Tomar el peso del mundo", " Para hacer cuero", " Está lleno de comida chatarra", " La residencia de las niñas perdidas", "No los pises por favor", " Tienes que ser muy bueno con eso para entenderme", "Por favor no use estos", "¿Conoces a Marcelo?", "Desearías que fuera tan apretado"],
        ["Como la cara malvada de Trump", "Cuando tienes ictericia", "Como tus lindos ojos...", "Como el cabello en llamas de quien atormenta tus sueños", "Como los valles de Gales", "Como tu malvado corazón helado", "Como una gran caca de la que estás particularmente orgulloso", "Espresso...", "Una especie de toronja", "El color favorito de Hamid", "Como leche"]
    ];

    var catagoryIndex = categories.indexOf(chosenCategory);
    var hintIndex = chosenCategory.indexOf(word);
    showClue.innerHTML = "Clue: - " +  hints [catagoryIndex][hintIndex];
  };

   // Reset

  document.getElementById('reset').onclick = function() {
    correct.parentNode.removeChild(correct);
    letters.parentNode.removeChild(letters);
    showClue.innerHTML = "";
    context.clearRect(0, 0, 400, 400);
    play();
  }
}