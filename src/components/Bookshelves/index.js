import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import FilterBooks from '../FilterBooks'

import './index.css'
import BookCard from '../BookCard'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want To Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class BookShelves extends Component {
  state = {
    booksList: [],
    apiStatus: apiStatusConstants.initial,

    bookshelfName: bookshelvesList[0].value,
    searchText: '',
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {bookshelfName, searchText} = this.state

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.books.map(book => ({
        title: book.title,
        readStatus: book.read_status,
        authorName: book.author_name,
        id: book.id,
        coverPic: book.cover_pic,
        rating: book.rating,
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

  changeShelf = bookshelfName => {
    this.setState({bookshelfName}, this.getBooks)
  }

  enterSearchInput = () => {
    this.getBooks()
  }

  changeSearchInput = searchText => {
    this.setState({searchText})
  }

  clickButton = bookshelfName => {
    this.setState({bookshelfName})
  }

  renderFailureView = () => {
    const tryAgain = () => {
      this.getBooks()
    }
    return (
      <div className="products-error-view-container">
        <img
          src="https://res.cloudinary.com/daari0y7l/image/upload/v1644386102/Group_jbeil9.png"
          alt="failure view"
          className="products-failure-img"
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

  renderBooksListView = () => {
    const {booksList, bookshelfName, searchText} = this.state
    const shouldShowBooksList = booksList.length > 0

    return shouldShowBooksList ? (
      <div>
        <Header />
        <div className="all-products-container">
          <FilterBooks
            searchText={searchText}
            bookshelvesList={bookshelvesList}
            changeSearchInput={this.changeSearchInput}
            enterSearchInput={this.enterSearchInput}
            bookshelfName={bookshelfName}
            changeShelf={this.changeShelf}
          />
          <div className="booksBox">
            <h1> {bookshelfName} Books </h1>

            <ul className="products-list">
              {booksList.map(book => (
                <BookCard
                  bookshelvesList={bookshelvesList}
                  clickButton={this.clickButton}
                  bookData={book}
                  key={book.id}
                />
              ))}
            </ul>
          </div>
        </div>

        <Footer />
      </div>
    ) : (
      <div className="no-products-view">
        <img
          src="https://res.cloudinary.com/daari0y7l/image/upload/v1644386102/Group_jbeil9.png"
          className="no-products-img"
          alt="no books"
        />

        <p className="no-products-description">
          Your search for {searchText} did not find any matches.
        </p>
      </div>
    )
  }

  renderLoadingView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderAllBooks = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderBooksListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div className="all-products-section">{this.renderAllBooks()}</div>
  }
}

export default BookShelves
