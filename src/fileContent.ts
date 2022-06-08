const createTsxBuffer = (compName: string) => {
  const tsxContent = `const ${compName} = () => {
    return <div>${compName}</div>
  }
  export default ${compName}
  `;
  return Buffer.from(tsxContent);
};

const createTsBuffer = (compName: string) => {
  const tsContent = `export { default } from './${compName}'`;
  return Buffer.from(tsContent);
};

const createLessBuffer = () => {
  const lessContent = `.container{
    width:100%;
  }`;
  return Buffer.from(lessContent);
};

module.exports = {
  createTsxBuffer,
  createTsBuffer,
  createLessBuffer,
};
