import axios from 'axios'
import React from 'react'
import { render } from 'react-dom'

class App extends React.Component {
  constructor() {
    super()
    this.state = { Debt: [] }
  }

  debtList(list) {
    const debtList = list.map((debt, index) => {
      return (
        <tr>
          <td className='border px-4 py-2'>{debt.User} </td>
          <td className='border px-4 py-2'>{debt.Price}</td>
        </tr>
      )
    })

    return (
      <table className='table-auto'>
        <thead>
          <tr>
          <th className='px-4 py-2'>User</th>
          <th className='px-4 py-2'>Price</th>
          </tr>
        </thead>
        <tbody>{debtList}</tbody>
      </table>
    )
  }

  render() {
    console.log(this.state.debt)
    return (
      <div>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={this.getJson}
        >
          Get Json
        </button>
        {this.debtList(this.state.Debt)}
      </div>
    )
  }

  getJson = () => {
    const url="https://asia-northeast1-cyph-264010.cloudfunctions.net/api/debt";
    // const url = 'http://localhost:5011/cyph-264010/asia-northeast1/api/debt'
    axios.get(url).then((res) => {
      this.setState(res.data)
      console.log(res.data)
    })
  }
}

export default App
