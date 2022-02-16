import {Link} from 'react-router-dom'

import {BsFillStarFill} from 'react-icons/bs'
import './index.css'

const BookCard = props => {
  const {bookData} = props
  const {title, authorName, coverPic, rating, readStatus, id} = bookData

  return (
    <li className="product-item" key={id}>
      <Link to={`/books/${id}`} className="link-item">
        <img src={coverPic} alt={title} className="thumbnail" />
        <img
          src={coverPic}
          alt={title}
          className="thumbnail thumbnail-mobile"
        />

        <div key={id} className="bookBox">
          <h1 className="title">{title}</h1>
          <p className="brand">by {authorName}</p>
          <p className="brand">
            Avg Rating <BsFillStarFill className="gold" /> {rating}
          </p>

          <p className="brand">
            Status:
            <p type="button" className="status-btn">
              {readStatus}
            </p>
          </p>
        </div>
      </Link>
    </li>
  )
}
export default BookCard
