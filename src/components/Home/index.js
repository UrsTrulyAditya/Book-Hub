import {Component} from 'react'
import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import ReactSlick from '../ReactSlick'
import ReactSlickMobile from '../ReactSlickMobile'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Home extends Component {
  state = {
    booksList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      headers: {Authorization: `Bearer ${jwtToken}`},

      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(book => ({
        title: book.title,
        authorName: book.author_name,
        id: book.id,
        coverPic: book.cover_pic,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderBooksList = () => {
    const {booksList} = this.state

    return (
      <>
        <Header />

        <div className="home-content">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>

          <p className="home-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>
          <div className="sliderBox web">
            <ReactSlick className="web-slick" booksList={booksList} />
          </div>
          <div className="sliderBox mobile ">
            <ReactSlickMobile className="mobile-slick" booksList={booksList} />
          </div>
        </div>
      </>
    )
  }

  FailureView = () => {
    const tryAgain = () => {
      this.getBooks()
    }

    return (
      <>
        <Header />

        <div className="home-content">
          <h1 className="home-heading">Find Your Next Favorite Books?</h1>

          <p className="home-description">
            You are in the right place. Tell us what titles or genres you have
            enjoyed in the past, and we will give you surprisingly insightful
            recommendations.
          </p>

          <div className="failureBox">
            <img
              src="https://res.cloudinary.com/daari0y7l/image/upload/v1644245963/Group_7522_1_jplhku.png"
              alt="failure view"
              className=" register-prime-image failImg"
            />
            <p className="fail">Something went wrong. Please try again</p>
            <button
              type="button"
              className="shop-now-button"
              onClick={tryAgain}
            >
              Try Again
            </button>
          </div>
        </div>

        <Footer />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksList()
      case apiStatusConstants.failure:
        return this.FailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default Home
