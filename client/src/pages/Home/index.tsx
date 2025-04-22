import Header from '../../components/Header'
import { Fragment } from 'react'
import Books from '../../components/Books'

export default function Home() {
  return (
    <>
      <Fragment>
        <Header />
        <Books />
      </Fragment>
    </>
  )
}
