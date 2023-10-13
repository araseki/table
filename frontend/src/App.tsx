import './App.css'
import TableList from './pages/TableList'

function App() {
  return (
<TableList
  columnKeyList={["email", "id", "password"]}
  rowDataList={[
    { email: "robotama@gmail.com", id: 1, password: "robotama" },
    { email: "robotama@gmail.com", id: 2, password: "robotama2" },
    { email: "robotama@gmail.com", id: 3, password: "robotama3" },
  ]}
/>  )
}

export default App
