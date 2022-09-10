// Criando as váriaveis que utilizaremos
const optionsSimple = document.querySelector('.optSimple');
const optionsDbShadow = document.querySelector('.optDouble');
const square = document.querySelector('.square');
const checkInset = document.querySelector('#inset');
const checkInset2 = document.querySelector('#inset2');
const checkDouble = document.querySelector('#db-box-shadow');
const copyCss = document.querySelector('.cssText');
const btnCopy = document.querySelector('.btn-copy');
const controls = document.querySelector('.opt-square');
const checkBorder = document.querySelector('#border');

//Aciona a função HandleChange sempre que alterar as opções
controls.addEventListener('input', handleChange);
optionsSimple.addEventListener('input', handleChange);
optionsDbShadow.addEventListener('input', handleChange);
checkDouble.addEventListener('input', addSecondShadow);

//Criei um objeto com os valores necessários para gerar o box-shadow, sendo double ou não.
let shadowProperties = {
  inset: '',
  offsetX: '0',
  offsetY: '0',
  blur: '10px',
  spread: '8px',
  color: '#000000',
  inset2: 'inset',
  offsetX2: '0',
  offsetY2: '0',
  blur2: '8px',
  spread2: '6px',
  color2: '#ff0000',
};

//criei um segundo objeto com as demais propriedades do quadrado
let squareProperties = {
  width: '200px',
  height: '200px',
  backgroundColor: '#f9f9f9',
  borderRadius: '0',
  borderWidth: '2px',
  borderColor: '#ff0000',
  borderType: 'solid',
  border: '',
};

//Pré-configura o box-shadow(apenas para visualizar o box-shadow logo na primeira visualização)
simpleShadow();

//Objeto com todas as funções que irão receber os valores dos inputs e passar para as propriedades do objeto shadowProperties
const handleStyle = {
  offsetX(value) {
    shadowProperties.offsetX = value + 'px';
  },
  offsetY(value) {
    shadowProperties.offsetY = value + 'px';
  },
  blur(value) {
    shadowProperties.blur = value + 'px';
  },
  spread(value) {
    shadowProperties.spread = value + 'px';
  },
  color(value) {
    shadowProperties.color = value;
  },
  inset(value) {
    checkInset.checked
      ? (shadowProperties.inset = value)
      : (shadowProperties.inset = '');
  },
  offsetX2(value) {
    shadowProperties.offsetX2 = value + 'px';
  },
  offsetY2(value) {
    shadowProperties.offsetY2 = value + 'px';
  },
  blur2(value) {
    shadowProperties.blur2 = value + 'px';
  },
  spread2(value) {
    shadowProperties.spread2 = value + 'px';
  },
  color2(value) {
    shadowProperties.color2 = value;
  },
  inset2(value) {
    checkInset2.checked
      ? (shadowProperties.inset2 = value)
      : (shadowProperties.inset2 = '');
  },
  backgroundColor(value) {
    squareProperties.backgroundColor = value;
  },
  height(value) {
    squareProperties.height = value + 'px';
  },
  width(value) {
    squareProperties.width = value + 'px';
  },
  borderRadius(value) {
    squareProperties.borderRadius = value + '%';
  },
  borderWidth(value) {
    squareProperties.borderWidth = value + 'px';
  },
  borderColor(value) {
    squareProperties.borderColor = value;
  },
  borderType(value) {
    squareProperties.borderType = value;
  },
  borderNone(value) {
    checkBorder.checked
      ? (squareProperties.border = `${squareProperties.borderWidth} ${squareProperties.borderType} ${squareProperties.borderColor}`)
      : (squareProperties.border = value);
  },
};

function addSecondShadow() {
  checkDouble.checked ? dbShadow() : simpleShadow();
}

//função que é acionada no evento, pega os nomes e valores dos inputs, envia para o Objeto handleStyle.
function handleChange(event) {
  const name = event.target.name;
  const value = event.target.value;

  if (checkDouble.checked) {
    //caso o usuário ative o double shadow
    handleStyle[name](value);
    dbShadow();
  } else {
    //caso seja shadow simples
    handleStyle[name](value);
    simpleShadow();
  }
  btnCopy.ariaLabel = 'Copy To Clipboard';
  btnCopy.children[0].src = './assets/svg/copy-add-24-filled.svg';
}

function dbShadow() {
  const cssText = `box-shadow: ${shadowProperties.inset} ${shadowProperties.offsetX} ${shadowProperties.offsetY} ${shadowProperties.blur} ${shadowProperties.spread} ${shadowProperties.color}, ${shadowProperties.inset2} ${shadowProperties.offsetX2} ${shadowProperties.offsetY2} ${shadowProperties.blur2} ${shadowProperties.spread2} ${shadowProperties.color2};`;
  const styleSquare = `width: ${squareProperties.width};
                       height: ${squareProperties.height};
                       background-color: ${squareProperties.backgroundColor};
                       border-radius: ${squareProperties.borderRadius};                                
                      `;
  let border = '';
  if (checkBorder.checked) {
    border = `border: ${squareProperties.borderWidth} ${squareProperties.borderType} ${squareProperties.borderColor};`;
  } else {
    border = squareProperties.border;
  }
  square.style = cssText + styleSquare + border;
  copyCss.innerHTML = `${cssText}<br>
                       -webkit-${cssText}<br>
                       -moz-${cssText}<br>
                       ${styleSquare}`;
}
function simpleShadow() {
  const cssText = `box-shadow: ${shadowProperties.inset} ${shadowProperties.offsetX} ${shadowProperties.offsetY} ${shadowProperties.blur} ${shadowProperties.spread} ${shadowProperties.color};`;
  const styleSquare = `width: ${squareProperties.width};
                       height: ${squareProperties.height};
                       background-color: ${squareProperties.backgroundColor};
                       border-radius: ${squareProperties.borderRadius};                              
                      `;
  let border = '';
  if (checkBorder.checked) {
    border = `border: ${squareProperties.borderWidth} ${squareProperties.borderType} ${squareProperties.borderColor};`;
  } else {
    border = squareProperties.border;
  }
  square.style = cssText + styleSquare + border;
  copyCss.innerHTML = `${cssText}<br>
                        -webkit-${cssText}<br>
                        -moz-${cssText}<br>
                        ${styleSquare.replace(/;/g, '; <br>')}
                        ${border}`;
}

//função de copiar o texto css
btnCopy.addEventListener('click', function (event) {
  event.preventDefault();
  btnCopy.ariaLabel = 'Copiado';
  event.target.src = './assets/svg/ok.svg';
  navigator.clipboard.writeText(copyCss.innerText);
});

//fazendo a ligação entre os valores dos inputs range e number
const [inputNumbers, inputsRanges] = [
  document.querySelectorAll('input[type="number"]'),
  document.querySelectorAll('input[type="range"]'),
];

for (const ranges of inputsRanges) {
  ranges.addEventListener('input', function () {
    inputNumbers[this.getAttribute('target')].value = this.value;
  });
}
for (const numbers of inputNumbers) {
  numbers.addEventListener('input', function () {
    inputsRanges[this.getAttribute('target')].value = this.value;
  });
}
