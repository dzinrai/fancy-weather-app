const root = document.querySelector(':root');
const darkHolder = document.createElement('span');
darkHolder.classList.add('hidden');
darkHolder.classList.add('rootDark');
document.body.append(darkHolder);
const cssVariables = ['--themeColor', '--stageColor', '--offStageColor', '--btnBack', 
'--btnColor', '--btnShadow','--btnActive','--borderColor','--inputColor',
'--inputBack', '--errorColor'];
const rootLightStyles = getComputedStyle(root);
const rootDarkStyles = getComputedStyle(darkHolder);
const dark = { name: 'dark' };
const light = { name: 'light' };
cssVariables.forEach((variable) => {
    dark[variable] = rootDarkStyles.getPropertyValue(variable);
    light[variable] = rootLightStyles.getPropertyValue(variable);
});

function setTheme(theme_) {
    [...Object.keys(theme_)].slice(1).forEach((color) => {
        root.style.setProperty(color, theme_[color]);
    });
    return theme_;
}

export {dark, light, setTheme};
