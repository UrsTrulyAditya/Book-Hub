import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import LeftNavBar from '../LeftNavBar'
import BooksList from '../BooksList'
import FailureView from '../FailureView'
import './index.css'
// import 'react-loader-spinner/dist/loader'

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
    label: 'Want to Read',
  },
]

const apiStatusConstant = {
  initial: 'initial',
  inProgress: 'inProgress',
  success: 'success',
  failure: 'failure',
  noBooks: 'noBooks',
}

class Bookshelves extends Component {
  state = {
    apiStatus: apiStatusConstant.initial,
    booksList: [],
    bookshelfName: bookshelvesList[0].value,
    label: bookshelvesList[0].label,
    searchText: '',
    activeStatusId: bookshelvesList[0].id,
  }
  // $$$ api call section  $$$ \\

  componentDidMount() {
    this.getBookList()
  }
  // api call using url

  getBookList = async () => {
    this.setState({
      apiStatus: apiStatusConstant.inProgress,
    })
    const {bookshelfName, searchText} = this.state
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok) {
      const updatedData = data.books.map(eachItem => ({
        authorName: eachItem.author_name,
        coverPic: eachItem.cover_pic,
        id: eachItem.id,
        title: eachItem.title,
        rating: eachItem.rating,
        readStatus: eachItem.read_status,
      }))
      this.setState({
        booksList: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstant.failure,
      })
    }
  }

  // for getting search value and update in state using setState...

  onChangeSearchText = event => {
    this.setState({
      searchText: event.target.value,
    })
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.getBookList()
    }
  }

  // click event for search button

  onClickSearchText = () => this.getBookList()

  // Click event for try agin button in failure view

  onClickTryAgin = () => {
    const {searchText} = this.state
    this.getBookList()
    console.log(searchText)
  }

  // $$$ render ui section  $$$ \\

  // render left navbar display nav items like Read status

  renderBookShelvesLeftNavbar = () => {
    const {activeStatusId} = this.state
    return (
      <div className="bookshelves-left-navbar">
        <h1 className="left-navbar-heading">Bookshelves</h1>
        <ul className="list-container-of-bookshelves-options">
          {bookshelvesList.map(eachItem => (
            <LeftNavBar
              filterBookDetails={eachItem}
              isActive={eachItem.id === activeStatusId}
              key={eachItem.id}
              getFilterBookDetails={this.getFilterBookDetails}
            />
          ))}
        </ul>
      </div>
    )
  }
  // updating shelfName in state using setState

  getFilterBookDetails = (value, label, id) => {
    this.setState(
      {
        bookshelfName: value,
        label,
        activeStatusId: id,
      },
      this.getBookList,
    )
  }

  // desktop search container

  renderSearchContainer = () => {
    const {searchText} = this.state
    return (
      <div className="search-icon-and-input-container">
        <input
          type="search"
          placeholder="Search"
          className="search-input"
          value={searchText}
          onKeyDown={this.onKeyDown}
          onChange={this.onChangeSearchText}
        />
        <button
          testid="searchButton"
          type="button"
          className="search-icon-container"
          value={searchText}
          onClick={this.onClickSearchText}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  // display render book list based on shelf read status

  renderBookList = () => {
    const {booksList} = this.state

    return (
      <>
        {booksList.length === 0 ? (
          this.renderNoBooksDisplay()
        ) : (
          <ul className="bookshelves-show-container">
            {booksList.map(eachItem => (
              <BooksList bookListDetails={eachItem} key={eachItem.id} />
            ))}
          </ul>
        )}
      </>
    )
  }

  // no books view

  renderFailureView = () => (
    <div className="bookshelves-failure-view-container">
      <FailureView onClickTryAgin={this.onClickTryAgin} />
    </div>
  )

  renderNoBooksDisplay = () => {
    const {searchText} = this.state
    return (
      <div className="no-books-container">
        <img
          src="https://res.cloudinary.com/saikrishnaboga-ccbp-tech/image/upload/v1644225725/Book-Hub%20/Asset_1_1no-books_ctoohj.png"
          alt="no books"
          className="no-books-image"
        />
        <p>Your search for {searchText} did not find any matches.</p>
      </div>
    )
  }

  // when fetch is processing displaying loader

  renderLoader = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  // based on fetch status displaying view using switch

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderBookList()
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  // render ui

  render() {
    const {label} = this.state
    return (
      <>
        <Header />
        <div id="bookshelves-main-container">
          <div id="bookshelves-sub-container">
            <div className="mobile-search-input-container">
              {this.renderSearchContainer()}
            </div>
            <div id="bookshelves-left-navbar">
              {this.renderBookShelvesLeftNavbar()}
            </div>
            <div id="render-book-list-container">
              <div id="search-container">
                <h1 className="search-container-heading">{label} Books</h1>
                {this.renderSearchContainer()}
              </div>
              <div id="show-books-container">
                {this.renderView()}
                <div className="footer-list">
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Bookshelves
