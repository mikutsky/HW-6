//// const colorPicker = document.getElementById('color');

//// colorPicker.addEventListener('change', e => {
////   document.body.style.setProperty('--main-bg', colorPicker.value);
//// });

// const themes = {
//   white: {
//     '--box-bg': 'white',
//     '--box-text-color': 'black',
//   },
//   black: {
//     '--box-bg': 'black',
//     '--box-text-color': 'white',
//   },
// };

const themeSelect = document.getElementById("themes");
// const form = document.forms['customThemeFrom'];
// const colorInputs = document.querySelectorAll('[data-var]');
// const inputThemeName = form.elements['themeName'];

themeSelect.addEventListener("change", e => {
  const themeVariables = themes[themeSelect.value];
  Object.entries(themeVariables).forEach(([key, value]) => {
    document.body.style.setProperty(key, value);
  });
});

// form.addEventListener('submit', e => {
//   e.preventDefault();
//   const newTheme = {};
//   const newThemeName = inputThemeName.value;
//   colorInputs.forEach(input => {
//     const key = input.dataset.var;
//     const value = input.value;
//     newTheme[key] = value;
//   });

//   themes[newThemeName] = newTheme;
//   const newSelectOption = new Option(newThemeName, newThemeName);
//   themeSelect.appendChild(newSelectOption);
//   form.reset();
// });

//ДОМАШНЕЕ ЗАДАНИЕ №6
//Продолжить работу с кодом с занятия. Сделать так что бы разметка для создания
//новой темы генерировалась динамически исходя из шаблона тех переменных которые
//у нас есть. Для этого вы можете создать массив или объект с переменными которые
//у вас будут в теме и на основе него генерировать разметку, цвет по умолчанию
//в input color может быть черным..

//мой массив с полями, пошел дальше и сгенерировал тип поля, теперь можно и текстовые
//значения добавлять в стиль, как пример размер шрифта
const themeVars = {
  "--box-bg": "color",
  "--box-text-color": "color",
  "--box-font-size": "text"
};

const themes = {
  white: {
    "--box-bg": "white",
    "--box-text-color": "black"
  },
  black: {
    "--box-bg": "black",
    "--box-text-color": "white"
  }
};

function genCustomThemForm(themeVars) {
  const fragment = document.createDocumentFragment();

  const h2Title = document.createElement("h2");
  h2Title.textContent = "GENERATED FORM of Custom them";

  const divForm = document.createElement("div");
  divForm.className = "custom-theme-controls";

  const formMain = document.createElement("form");
  formMain.name = "customThemeFrom";

  const divControlName = document.createElement("div");
  divControlName.className = "controls-item";

  const inputThemeName = document.createElement("input");
  inputThemeName.type = "text";
  inputThemeName.id = "themeName";
  inputThemeName.name = "themeName";
  inputThemeName.className = "controls-item";

  fragment.appendChild(h2Title);
  fragment.appendChild(divForm);
  divForm.appendChild(formMain);
  formMain.appendChild(divControlName);
  divControlName.appendChild(inputThemeName);

  Object.entries(themeVars).forEach(([key, value]) => {
    const divControl = document.createElement("div");
    divControl.className = "controls-item";

    const labelConrol = document.createElement("label");
    labelConrol.setAttribute("for", value + key);
    labelConrol.textContent = key + " ";

    const inputControl = document.createElement("input");
    inputControl.type = value;
    inputControl.id = value + key;
    inputControl.name = key;
    inputControl.className = "controls-item";
    inputControl.dataset.var = key;

    formMain.appendChild(divControl);
    divControl.appendChild(labelConrol);
    divControl.appendChild(inputControl);
  });

  const btnSubmit = document.createElement("button");
  btnSubmit.type = "submit";
  btnSubmit.textContent = "Add custom theme";

  formMain.appendChild(btnSubmit);
  formMain.addEventListener("submit", el => {
    el.preventDefault();
    //Проверяем пустое ли поле имя
    //И не был ли создан объект с таким же именем
    //Если не делать проверку а оставить, как делали на уроке
    //темы с одинаковыми именами будут игнорироваться, при выборе.
    //будет работать только последняя
    if (!inputThemeName.value) return alert("Имя темы не заданно!");
    if (Object.keys(themes).some(el => el === inputThemeName.value))
      return alert("Тема с заданным именем уже существует!");

    const inputVar = document.querySelectorAll("[data-var]");
    const newTheme = {};
    inputVar.forEach(el => {
      newTheme[el.dataset.var] = el.value;
    });

    themes[inputThemeName.value] = newTheme;
    const newSelectOption = new Option(
      inputThemeName.value,
      inputThemeName.value
    );
    themeSelect.appendChild(newSelectOption);

    formMain.reset();
  });

  return fragment;
}

document.body.appendChild(genCustomThemForm(themeVars));
//Событие выбора нужной темы взял из урока
