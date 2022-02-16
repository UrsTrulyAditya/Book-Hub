import {BsSearch} from 'react-icons/bs'

import './index.css'

const FilterBooks = props => {
  const renderBooksList = () => {
    const {bookshelvesList} = props

    return bookshelvesList.map(shelf => {
      const {changeShelf, bookshelfName} = props
      const onClickShelfItem = () => changeShelf(shelf.value)

      return (
        <li
          className="category-item"
          key={bookshelfName.id}
          onClick={onClickShelfItem}
        >
          <button type="button" className=" blue-btn mobile-btn">
            {shelf.label}
          </button>
        </li>
      )
    })
  }

  const renderBooks = () => (
    <>
      <h1 className="category-heading">Bookshelves</h1>
      <ul className="categories-list">{renderBooksList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const buttonClick = () => {
    const {enterSearchInput} = props

    enterSearchInput()
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchText} = props
    return (
      <div className="search-input-container">
        <input
          value={searchText}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <button type="button" testid="searchButton" onClick={buttonClick}>
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="filters-group-container web">
        {renderSearchInput()}
        {renderBooks()}
      </div>
      <div className="filters-group-container-mobile">
        {renderSearchInput()}
        {renderBooks()}
      </div>
    </>
  )
}

export default FilterBooks
