
const size = {
    mobile: '400px',
    tablet: '767px', 
    desktop: '768px'
};

const theme = {
    mainColor: '#F3F3F3',
    mobile: `(max-width: ${size.mobile})`, 
    tablet: `(max-width: ${size.tablet})`, 
    desktop : `(min-width: ${size.desktop})`
}
export default theme