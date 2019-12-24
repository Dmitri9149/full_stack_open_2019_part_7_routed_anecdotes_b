import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Route, Link, Redirect, withRouter
} from 'react-router-dom'

import { Container } from 'semantic-ui-react'
import { Table } from 'semantic-ui-react'
import { Form, Button, Message } from 'semantic-ui-react'



const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped celled>
      <Table.Body>
        {anecdotes.map(anecdote =>
          <Table.Row key={anecdote.id}>
            <Table.Cell>
              <Link to = {`/anecdotes/${anecdote.id}`}>
                {anecdote.content}
              </Link>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  </div>
)



const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -sovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNewNoHistory = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0 
    })
    props.history.push('/')
  }


  return (
    <div>
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>content</label>
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>author</label>
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Field>
        <Form.Field>
          <label>url for more info</label>
          <input name='info' value={info} onChange={(e) => setInfo(e.target.value)} />
        </Form.Field>
        <Button type = 'submit'>create</Button>
      </Form>
    </div>
  )

}

const CreateNew = withRouter(CreateNewNoHistory)


const Anecdote = ({anecdote}) => {
  return(
  <div>
    <h2>{anecdote.content}</h2>
    <div>{anecdote.votes}</div>
  </div>
  )
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification (`A new anecdote ${anecdote.content} created`)
    setTimeout (()=> {setNotification('')}, 10000)
  }

  const anecdoteById = (id) => {
    return(
      anecdotes.find(a => a.id === id) 
    )
  }

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const padding = { padding: 5 }


  return (
    <Container>
      {(notification && 
        <Message success>
          {notification}
        </Message>
      )}

    <div>
      <h1>Software anecdotes</h1>
      <div>
        {notification}
      </div>
      <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">anecdotes</Link>
            <Link style={padding} to="/create">create new</Link>
            <Link style={padding} to="/about">about</Link>
          </div>
          <Route exact path="/" render={() => <AnecdoteList anecdotes = {anecdotes}/>} />
          <Route exact path="/create" render={() => {
            return(
              <div>
                <CreateNew addNew = {addNew}/>
              </div>
            )}
            }/>
          <Route exact path="/about" render={() => <About />} />
          <Route exact path = "/anecdotes/:id" render= {({match})=> 
            <Anecdote anecdote = {anecdoteById(match.params.id)} />
          } />

        </div>
      </Router>
    </div>      
      <Footer />
    </div>
    </Container>
  )
}

export default App;