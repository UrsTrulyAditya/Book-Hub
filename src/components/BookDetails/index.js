import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsFillStarFill} from 'react-icons/bs'

import Header from '../Header'

import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookDetails extends Component {
  state = {
    bookData: {},

    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getBookData()
  }

  getFormattedData = data => ({
    authorName: data.book_details.author_name,
    aboutBook: data.book_details.about_book,
    aboutAuthor: data.book_details.about_author,
    id: data.book_details.id,
    coverPic: data.book_details.cover_pic,

    rating: data.book_details.rating,
    title: data.book_details.title,
    readStatus: data.book_details.read_status,
  })

  getBookData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = this.getFormattedData(fetchedData)

      this.setState({
        bookData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  FailureView = () => {
    const tryAgain = () => {
      this.getBookData()
    }
    return (
      <div className="products-error-view-container">
        <img
          src="https://res.cloudinary.com/daari0y7l/image/upload/v1644150332/Group_7522_tmqbhp.png"
          alt="failure view"
          className="failure-view-image"
        />
        <h1 className="product-failure-heading-text">
          Oops! Something Went Wrong
        </h1>
        <p className="products-failure-description">
          Something went wrong. Please try again
        </p>

        <button type="button" onClick={tryAgain}>
          Try Again
        </button>
      </div>
    )
  }

  renderBookDetailsView = () => {
    const {bookData} = this.state
    const {
      authorName,
      aboutBook,
      aboutAuthor,
      coverPic,
      rating,
      title,
      readStatus,
    } = bookData

    return (
      <div className="box">
        <div className="boxContainer">
          <div className="picAndTitle">
            <img src={coverPic} alt={title} className="image" />
            <img src={coverPic} alt={title} className="image-mobile" />
            <div className="titlesBox">
              <h1 className="titleHeading">{title}</h1>

              <p className="author"> {authorName}</p>

              <p className="author">
                Avg Rating <BsFillStarFill className="gold" /> {rating}
              </p>
              <div>
                <p className="author">
                  Status: <p className="status">{readStatus} </p>
                </p>
              </div>
            </div>
          </div>

          <div>
            <hr className="horizontal-line" />
            <h1 className="authorHeading">About Author</h1>
            <p>
              {aboutAuthor} About Author <br />
            </p>
            <h1 className="authorHeading">About Book</h1>
            <p> {aboutBook} </p>
          </div>
        </div>
      </div>
    )
  }

  renderBookDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBookDetailsView()
      case apiStatusConstants.failure:
        return this.FailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="product-item-details-container">
          {this.renderBookDetails()}
        </div>
        <Footer />
      </>
    )
  }
}

export default BookDetails
