import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import LoginScreen from './screens/LoginScreen'
import DashboardScreen from './screens/DashboardScreen'
import TransactionsScreen from './screens/TransactionsScreen'

const App = () => {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Route path='/' component={LoginScreen}  exact/>
          <Route path='/dashboard' component={DashboardScreen} />
          <Route path='/client/:id/:name' component={TransactionsScreen} exact />
        </Container>
      </main>
    </Router>
  )
}

export default App