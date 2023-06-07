import { SingtelTbl } from 'my-lib';

function App() {
  const onClick = () => {
    console.log('Clicked')
  }
  const tableData = [
    { header1: "Value 1", header2: "Value 2", header3: "Value 3" },
    { header1: "Value 4", header2: "Value 5", header3: "Value 6" },
    { header1: "Value 7", header2: "Value 8", header3: "Value 9" },
    { header1: "Value 10", header2: "Value 11", header3: "Value 12" },
    { header1: "Value 13", header2: "Value 14", header3: "Value 15" },
    { header1: "Value 16", header2: "Value 17", header3: "Value 18" },
    { header1: "Value 19", header2: "Value 20", header3: "Value 21" },
    { header1: "Value 22", header2: "Value 23", header3: "Value 24" },
    { header1: "Value 25", header2: "Value 26", header3: "Value 27" },
    { header1: "Value 28", header2: "Value 29", header3: "Value 30" },
  ];


  return (
    <>
      <div>
        {/* <MyButton onClick={onClick}>Click here!</MyButton> */}
        <SingtelTbl data={tableData} />;
      </div>

    </>
  )
}

export default App
